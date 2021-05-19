## std::conditional
```
// 别名
template< bool B, class T, class F >
using conditional_t = typename conditional<B,T,F>::type;




int main() 
{
    typedef std::conditional<true, int, double>::type Type1;
    typedef std::conditional<false, int, double>::type Type2;
    typedef std::conditional<sizeof(int) >= sizeof(double), int, double>::type Type3;
 
    std::cout << typeid(Type1).name() << '\n';
    std::cout << typeid(Type2).name() << '\n';
    std::cout << typeid(Type3).name() << '\n';
}
```


## enable_if
### SFINAE
SFINAE是英文Substitution failure is not an error的缩写，意思是匹配失败不是错误
SFINAE 应用最为广泛的场景是C++中的 std::enable_if。
在对一个函数调用进行模板推导时，编译器会尝试推导所有的候选函数（重载函数，模板，但是普通函数的优先级要高），以确保得到一个最完美的匹配。
也就是说在推导的过程中，如果出现了无效的模板参数，则会将该候选函数从重载决议集合中删除，只要最终得到了一个 perfect match ，编译就不会报错。
比如：
```
long multiply(int i, int j) { return i * j; }
 
template <class T>
typename T::multiplication_result multiply(T t1, T t2)
{
    return t1 * t2;
}
 
int main(void)
{
    multiply(4, 5);
}
```
main 函数调用 multiply 会使编译器会尽可能去匹配所有候选函数，虽然第一个 multiply 函数明显是较优的匹配，但是为了得到一个最精确的匹配，编译器依然会尝试去匹配剩下的候选函数，此时就会去推导 第二个multiply函数，中间在参数推导的过程中出现了一个无效的类型 int::multiplication_result ，但是因为 SFINAE 原则并不会报错。


比如：
```
struct Test {
    typedef int foo;
};


template <typename T> 
void f(typename T::foo) {} // Definition #1


template <typename T> 
void f(T) {}               // Definition #2


int main() {
    f<Test>(10); // Call #1.
    f<int>(10);  // Call #2. Without error (even though there is no int::foo) thanks to SFINAE.
}
```
当调用`f<int>(10)`时，由于推导模板函数过程中可以找到一个正确的版本（ Definition #2 ），所以即时int::foo（ Definition #1）是一个语法错误，也没有关系。




### std::enable_if<>的实现机制如下代码所示：
```
template<bool Cond, typename T = void> struct enable_if {};
 
template<typename T> struct enable_if<true, T> { typedef T type; };
```
基本原理是SFINAE。只有当第一个参数是true的时候才有type，否则就会发生Substitution Failure，这个时候模版实例化就会失败，也就不会产生任何代码。
在 condition 为真的时候，由于偏特化机制，第二个结构体模板明显是一个更好的匹配，所以 std::enable_if<>::type 就是有效的。
当 condition 为假的时候，只有第一个结构体模板能够匹配，所以std::enable_if<>::type 是无效的，会被丢弃，编译器会报错：error: no type named ‘type’ in ‘struct std::enable_if<false, bool>。


### 典型应用
```
#include <iostream>
#include <type_traits>
 


template < class T,
           class = typename std::enable_if<std::is_integral<T>::value>::type>
bool is_even (T i) {return !bool(i%2);}
/*
这两种写法也可以 
std::enable_if_t<std::is_integral<T>::value, int>> 

std::enable_if_t<std::is_integral<T>::value>> 
*/
int main() {  
  double i = 1;    // code does not compile if type of i is not integral
  std::cout << std::boolalpha;
  // 实例化的时候，enable_if发现不是int类型，就会报error: no type named ‘type’ in ‘struct std::enable_if<false, bool>,从而达到限制类型的效果。
  std::cout << "i is even: " << is_even(i) << std::endl;
  return 0;
}
```


## 可变参数模板
```
template<typename T>
ostream &print(ostream &os, const T &t)
{
    return os << t; // no separator after the last element in the pack
}


template <typename T, typename... Args>
ostream &print(ostream &os, const T &t, const Args&... rest)
{
    os << t << ", ";           // print the first argument
    return print(os, rest...); // recursive call; print the other arguments
}
 
int main() {
    print(std::cout,"abc",123,456);
  
    return 0;
}


//C++17版本的
template <typename ...Args>
    constexpr void print(Args&& ...args) {
        // 包扩展，效果是对每个参数都调用前边的语句

        ((std::cout << args << '\n'), ...);
        //或者   ( ...,  (std::cout << args << '\n'));

    }


// 其他包扩展的例子
template <typename... Args>
ostream &errorMsg(ostream &os, const Args&... rest)
{
    // print(os, debug_rep(a1), debug_rep(a2), ..., debug_rep(an)
    return print(os, debug_rep(rest)...);
}
```



