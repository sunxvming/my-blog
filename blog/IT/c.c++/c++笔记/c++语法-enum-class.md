## enum由来：
在enum没出现之前，enum的功能则需要需要一系列的#define来完成，而enum则完成了这一系列#define的“打包收集”，即：
```
enum Color {black, white, red};

#define black 0
#define white 1
#define red 2
```
也正是如此，对于两个不一样的枚举体，它们即使枚举体的名字不同，里面的内容也不能重名。如：
```
enum Direction {TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT};
// error!
enum WindowsCorner {TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT};
```


##  C++惯用法之enum class

在Effective modern C++中Item 10: Prefer scoped enums to unscoped enum，调到要用有范围的enum class代替无范围的enum。

例如：
```
enum Shape {circle,retangle};
auto circle = 10;  // error
```
上述错误是因为两个circle在同一范围。对于enum等价

```
#define circle 0
#define retangle 1
```
因此后面再去定义circle就会出错。
所以不管枚举名是否一样,里面的成员只要有一致的,就会出问题。例如：

```
enum A {a,b};
enum B {c,a};
```
a出现两次,在enum B的a处报错。

根据前面我们知道,enum名在范围方面没有什么作用,因此我们想到了namespace,如下例子:
```
// 在创建枚举时，将它们放在名称空间中，以便可以使用有意义的名称访问它们:
namespace EntityType {enum Enum {
        Ground = 0,
        Human,
        Aerial,
        Total
    };
}


void foo(EntityType::Enum entityType)
{
    if (entityType == EntityType::Ground) {
        /*code*/
    }
}
```

但是不断的使用命名空间,势必太繁琐,而且如果我不想使用namespace,要达到这样的效果,便会变得不安全,也没有约束。
因此在c++11后,引入enum class。它解决了为enum成员定义类型、类型安全、约束等问题。回到上述例子：

```
// enum class
enum class EntityType {
    Ground = 0,
    Human,
    Aerial,
    Total
};

void foo(EntityType entityType)
{
    if (entityType == EntityType::Ground) {
        /*code*/
    }
}
```


## enum的基础类型
枚举通常用某种整数类型表示，这个类型被称为枚举的**基础类型**。
基础类型默认是int，也可以显式的指定：
```
#include <iostream>
#include <string>
enum class Color:int {red,green,blue};
enum class Font:char {normal,bold};
int main()
{

    Color c;
    std::cout<<sizeof(c)<<std::endl;  //输出为  4

    Font f;
    std::cout<<sizeof(f)<<std::endl;  //输出为  1
}
```