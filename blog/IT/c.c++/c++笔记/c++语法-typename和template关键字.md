## typename
```
struct X { typedef int       foo;       }; 
struct Y { static  int const foo = 123; }; 


// T::foo的可能是一个类型，也可能是一个变量，这个就存在歧义了
// 可以认为 int * x； 一个变量定义
// 也可以认为 123 * x； 一个乘法表达式
template<class T> void f_tmpl () { T::foo * x; }
```
c++中这种情况被称为dependent names，


```
template<typename T>
struct MyType {
  using iterator = ...;         //c++中这叫做alias template
  ...
};
template<typename T>
using MyTypeIterator = typename MyType<T>::iterator;       // typename必须有
MyTypeIterator<int> pos;
```
上面的注释说明了：typename MyType<T>::iterator里的typename是必须的，因为这里的typename代表后面紧跟的是一个定义在类内的类型，否则，iterator会被当成一个静态变量或者枚举.