## 1. 可调用对象
可调用对象有一下几种定义：
* 是一个函数指针
*  lambda表达式
* 是一个具有operator()成员函数的类的对象，函数对象
* 一个类成员函数指针；


C++中可调用对象的虽然都有一个比较统一的**操作形式**，但是**定义方法**五花八门，这样就导致使用统一的方式**保存**可调用对象或者**传递**可调用对象时，会十分繁琐。C++11中提供了std::function和std::bind统一了可调用对象的各种操作。


不同类型可能具有相同的调用形式，如：
```cpp
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
```cpp
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
可将std::bind函数看作一个**通用的函数适配器**，它接受一个可调用对象，生成一个新的可调用对象来“适应”原对象的参数列表。
**输入**是一个可调用对象，**输出**是一个变了参数个数新的可调用对象

除非需要与旧代码（如 C++03）兼容，否则总是优先使用 Lambda。std::bind 在现代 C++ 中已基本被 Lambda 取代，仅偶尔在极深度的泛型元编程中配合 std::placeholders 使用

### 1. 固定部分参数

**需求**：有一个 `add(a,b)` 函数，固定第一个参数为 10，生成新函数 `add10(b)`。

```cpp
// 使用 std::bind
auto add10 = std::bind(add, 10, std::placeholders::_1);
int result = add10(5);  // 15

// 使用 Lambda（推荐）
auto add10_lambda = [](int b) { return add(10, b); };
// 或者通用版（如果绑定多个参数）
auto add10_lambda2 = [](auto&&... args) { return add(10, std::forward<decltype(args)>(args)...); };
int result2 = add10_lambda(5);   // 15
```

> **Lambda 优势**：清晰直观，无占位符的晦涩语法。

### 2. 参数重排序

**需求**：`add(a,b)` 变成新函数，调用时参数顺序反转（`add(b,a)`）。

```cpp
// 使用 std::bind
auto rev = std::bind(add, std::placeholders::_2, std::placeholders::_1);
int r = rev(1, 2);  // add(2,1) = 3

// 使用 Lambda
auto rev_lambda = [](int a, int b) { return add(b, a); };
int r2 = rev_lambda(1, 2);  // 3
```

> **Lambda 优势**：参数顺序一目了然。

### 3. 绑定成员函数

**需求**：将对象的成员函数包装成普通函数对象（第一个参数为对象本身）。

```cpp
struct Foo { int mul(int a, int b) const { return a * b; } };
Foo foo;

// 使用 std::bind
auto bind_mul = std::bind(&Foo::mul, &foo, 3, std::placeholders::_1);
int r = bind_mul(4);  // 3*4 = 12

// 使用 Lambda（推荐）
auto lambda_mul = [&foo](int b) { return foo.mul(3, b); };
int r2 = lambda_mul(4);  // 12
```