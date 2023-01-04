## 1. 可调用对象
可调用对象有一下几种定义：
* 是一个函数指针
*  lambda表达式
* 是一个具有operator()成员函数的类的对象；
* 可被转换成函数指针的类对象；
* 一个类成员函数指针；


C++中可调用对象的虽然都有一个比较统一的**操作形式**，但是**定义方法**五花八门，这样就导致使用统一的方式**保存**可调用对象或者**传递**可调用对象时，会十分繁琐。C++11中提供了std::function和std::bind统一了可调用对象的各种操作。


不同类型可能具有相同的调用形式，如：
```
// 普通函数
int add(int a, int b){return a+b;} 


// lambda表达式
auto mod = [](int a, int b){ return a % b;}


// 函数对象类
struct divide{
    int operator()(int denominator, int divisor){
        return denominator/divisor;
    }
};
```
上述三种可调用对象虽然类型不同，但是共享了一种调用形式：
```
int(int ,int)
```
std::function就可以将上述类型保存起来，如下：
```
std::function<int(int ,int)> a = add; 
std::function<int(int ,int)> b = mod ; 
std::function<int(int ,int)> c = divide(); 
```
## 2. std::function
std::function 是一个**可调用对象包装器，是一个类模板**，它可以用统一的方式处理函数、函数对象、函数指针，并允许保存和延迟它们的执行。
```
template< class R, class... Args >
class function<R(Args...)>;
```
std::function可以取代**函数指针的作用**，因为它可以**延迟函数的执行**，特别适合作为**回调函数**使用。它比普通函数指针更加的灵活和便利。

## 3. std::bind
可将std::bind函数看作一个**通用的函数适配器**，它接受一个可调用对象，生成一个新的可调用对象来**“适应”原对象的参数列表**。


std::bind将可调用对象与其参数一起进行绑定，绑定后的结果可以使用std::function保存。std::bind主要有以下两个作用：
* 将可调用对象和其参数绑定成一个防函数；
* 只绑定部分参数，减少可调用对象传入的参数。

### 3.1 std::bind绑定普通函数
```
double my_divide (double x, double y) {return x/y;}
auto fn_half = std::bind (my_divide,_1,2);
std::cout << fn_half(10) << '\n'; // 5
```
bind的第一个参数是函数名，普通函数做实参时，会隐式转换成函数指针。因此`std::bind (my_divide,_1,2)`等价于`std::bind (&my_divide,_1,2)；`
`_1`表示占位符，，`2`表示被绑定的参数
占位符表示新的函数对象中参数的位置，在调用新的函数对象时会调用bind的可调用对象，然后占位符就会传递给旧的可调用对象。

### 3.2 std::bind绑定一个成员函数
```
struct Foo {
    void print_sum(int n1, int n2)
    {
        std::cout << n1+n2 << '\n';
    }
    int data = 10;
};
int main() 
{
    Foo foo;
    auto f = std::bind(&Foo::print_sum, &foo, 95, std::placeholders::_1);
    f(5); // 100
}
```
bind绑定类成员函数时，第一个参数表示对象的成员函数的指针，第二个参数表示对象的地址。
必须显示的指定&Foo::print_sum，因为编译器不会将对象的成员函数隐式转换成函数指针，所以必须在Foo::print_sum前添加&；
使用对象成员函数的指针时，必须要知道该指针属于哪个对象，因此第二个参数为对象的地址 &foo；

### 3.3 绑定一个引用参数
默认情况下，bind的那些不是占位符的参数被**拷贝**到bind返回的可调用对象中。但是，与lambda类似，有时：1. 对有些绑定的参数希望以**引用**的方式传递，2. 或是要绑定参数的类型**无法拷贝**。

```
#include <iostream>
#include <functional>
#include <vector>
#include <algorithm>
#include <sstream>
using namespace std::placeholders;
using namespace std;


ostream & print(ostream &os, const string& s, char c)
{
    os << s << c;
    return os;
}


int main()
{
    vector<string> words{"helo", "world", "this", "is", "C++11"};
    ostringstream os;
    char c = ' ';
    for_each(words.begin(), words.end(), 
                   [&os, c](const string & s){os << s << c;} );
    cout << os.str() << endl;


    ostringstream os1;
    // ostream不能拷贝，若希望传递给bind一个对象，
    // 而不拷贝它，就必须使用标准库提供的ref函数
    for_each(words.begin(), words.end(),
                   bind(print, ref(os1), _1, c));
    cout << os1.str() << endl;
}
```
## 4. 指向成员函数的指针
通过下面的例子，熟悉一下指向成员函数的指针的定义方法。
```
#include <iostream>
struct Foo {
    int value;
    void f() { std::cout << "f(" << this->value << ")\n"; }
    void g() { std::cout << "g(" << this->value << ")\n"; }
};
void apply(Foo* foo1, Foo* foo2, void (Foo::*fun)()) {
    (foo1->*fun)(); // call fun on the object foo1
    (foo2->*fun)(); // call fun on the object foo2
}
int main() {
    Foo foo1{1};
    Foo foo2{2};
    apply(&foo1, &foo2, &Foo::f);
    apply(&foo1, &foo2, &Foo::g);
}
```
成员函数指针的定义：`void (Foo::*fun)()`
调用时传递的实参: `&Foo::f；`
fun为类成员函数指针，所以调用是要通过解引用的方式获取成员函数`*fun`,即`(foo1->*fun)()`;



