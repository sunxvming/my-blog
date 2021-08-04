## 模板类型判断

### std::is_same 判断类型是否一致
位于头文件`<type_traits>`中
通过std::is_same即可判断两个类型是否一样，特别在模板里面，在不清楚模板的参数时，此功能可以对一些特定的参数类型进行特殊的处理。

```
std::is_same<int, int32_t>::value   // true
std::is_same<int, int64_t>::value   // false
```

`std::is_same`对int和const int\int &\const int&等都是区别对待的，但在写模板函数时，经常会强制指定常引用进行传参，以免进行数据拷贝，这时候is_same就做出了不相等的判断，但是有时候其实我们还是希望TYPE和const TYPE& 是能认为是一样的，这时就需要`std::decay`进行退化处理

### std::decay 退化类型的修饰
`std::decay`就是对一个类型进行退化处理，他的实现如下:

```
template< class T >
struct decay {
private:
    typedef typename std::remove_reference<T>::type U;
public:
    typedef typename std::conditional< 
        std::is_array<U>::value,
        typename std::remove_extent<U>::type*,
        typename std::conditional< 
            std::is_function<U>::value,
            typename std::add_pointer<U>::type,
            typename std::remove_cv<U>::type
        >::type
    >::type type;
};
```
看着比较抽象，其实就是把各种引用啊什么的修饰去掉，把cosnt int&退化为int，这样就能通过`std::is_same`正确识别出加了引用的类型了


### is_xxx
其中的模板参数即为要判断的类型
```
// 假设T是一个模板参数，即template<typename T>
static_assert(
    is_integral<T>::value, "int");
static_assert(
    is_pointer<T>::value, "ptr");
static_assert(
    is_default_constructible<T>::value, "constructible");
```

## std::conditional
根据情况判断选择的模板类型,相当于一个**模板类型的三元操作符**
```
#include <iostream>
#include <type_traits>
#include <typeinfo>

int main()
{
    typedef typename std::conditional<true, int, double>::type Type1;
    typedef typename std::conditional<false, int, double>::type Type2;
    typedef typename std::conditional<sizeof(int) == sizeof(double), int, double>::type Type3;

    std::cout << typeid(Type1).name() << std::endl;
    std::cout << typeid(Type2).name() << std::endl;
    std::cout << typeid(Type3).name() << std::endl;

    Type1 a = 3.1;
    Type2 b = 4.2;
    std::cout << a +  b << std::endl;
}
// execute out
i
d
d
7.2
```

## enable_if
### SFINAE
SFINAE是英文Substitution failure is not an error的缩写，意思是**匹配失败不是错误**
SFINAE 应用最为广泛的场景是C++中的 std::enable_if。
在对一个函数调用进行模板推导时，编译器会尝试推导所有的候选函数（重载函数，模板，但是普通函数的优先级要高），以确保得到一个**最完美的匹配**。
也就是说在推导的过程中，如果出现了无效的模板参数，则会将该候选函数从**重载决议集合**中删除，只要最终得到了一个 perfect match ，编译就不会报错。
比如：
```
long multiply(int i, int j) { return i * j; }

template <class T>
typename T::multiplication_result multiply(T t1, T t2)
{
    return t1 * t2;
}

int main(void)
{
    multiply(4, 5);
}
```
main 函数调用 multiply 会使编译器会尽可能去匹配所有候选函数，虽然第一个 multiply 函数明显是较优的匹配，但是为了得到一个最精确的匹配，编译器依然会尝试去匹配剩下的候选函数，此时就会去推导 第二个multiply函数，中间在参数推导的过程中出现了一个**无效的类型** `int::multiplication_result` ，但是因为 SFINAE 原则并不会报错。


比如：
```
struct Test {
    typedef int foo;
};


template <typename T>
void f(typename T::foo) {} // Definition #1


template <typename T>
void f(T) {}               // Definition #2


int main() {
    f<Test>(10); // Call #1.
    f<int>(10);  // Call #2. Without error (even though there is no int::foo) thanks to SFINAE.
}
```
当调用`f<int>(10)`时，由于推导模板函数过程中可以找到一个正确的版本（Definition #2），所以即使int::foo（ Definition #1）是一个语法错误，也没有关系。



### std::enable_if<>的实现机制如下代码所示：
```
template<bool Cond, typename T = void> struct enable_if {};

template<typename T> struct enable_if<true, T> { typedef T type; };
```
基本原理是SFINAE。**只有当第一个参数是true的时候才有type**，否则就会发生Substitution Failure，这个时候模版实例化就会失败，也就不会产生任何代码。
在 condition 为真的时候，由于**偏特化机制**，第二个结构体模板明显是一个更好的匹配，所以 std::enable_if<>::type 就是有效的。
当 condition 为假的时候，只有第一个结构体模板能够匹配，所以std::enable_if<>::type 是无效的，会被丢弃，编译器会报错：error: no type named ‘type’ in ‘struct std::enable_if<false, bool>。


### 典型应用
1.限制模板的类型
```
#include <iostream>
#include <type_traits>

template < class T,
           class = typename std::enable_if<std::is_integral<T>::value>::type>
bool is_even (T i) {return !bool(i%2);}
/*
上面的class = typename std::enable_if<std::is_integral<T>::value>::type>可以替换成如下两种写法：
std::enable_if_t<std::is_integral<T>::value, int>>
std::enable_if_t<std::is_integral<T>::value>>
*/

int main() {
  double i = 1;    // code does not compile if type of i is not integral
  std::cout << std::boolalpha;
  // 实例化的时候，enable_if发现不是int类型，就会报error: no type named ‘type’ in ‘struct std::enable_if<false, bool>,从而达到限制类型的效果。
  std::cout << "i is even: " << is_even(i) << std::endl;
  return 0;
}
```


## 可变参数模板
```
// 相当于一个递归基
template<typename T>
ostream &print(ostream &os, const T &t)
{
    return os << t; // no separator after the last element in the pack
}


template <typename T, typename... Args>
ostream &print(ostream &os, const T &t, const Args&... rest)
{
    os << t << ", ";           // print the first argument
    return print(os, rest...); // recursive call; print the other arguments
}

int main() {
    print(std::cout,"abc",123,456);

    return 0;
}


//C++17的更方便的写法
template <typename ...Args>
    constexpr void print(Args&& ...args) {
        // 包扩展，效果是对每个参数都调用前边的语句
        ((std::cout << args << '\n'), ...);
        //或者  (..., (std::cout << args << '\n'));

    }

// 其他包扩展的例子
template <typename... Args>
ostream &errorMsg(ostream &os, const Args&... rest)
{
    // print(os, debug_rep(a1), debug_rep(a2), ..., debug_rep(an)
    return print(os, debug_rep(rest)...);
}
```



