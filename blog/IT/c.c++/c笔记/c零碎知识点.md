`__typeof__()`并且`__typeof()`是C语言的编译器专用扩展，因为标准C不包含这样的运算符。标准C要求编译器用双下划线前缀语言扩展（这也是为什么你不应该为自己的函数，变量等做这些）







C++ 程序员偏向于使用 for(;;) 结构来表示一个无限循环。


### vs中查看string的中文字
在获取包含中文变量的时候，查看std::string字符串变量，提示；字符串中的字符无效
变量后加,s8 即可


### vs设置Windows SDK
```
#include <WinSock2.h>

```
vs中显示winsock2.h 找不到，于是搜索了下发现在
![](https://sunxvming.com/imgs/fa0dc94f-7b4b-44b8-ab25-04cef657d891.png)
 于是更改了下Windows sdk就好了
![](https://sunxvming.com/imgs/2cb8774d-20b1-4a5b-9db3-e24b80b4b498.png)
 




### VS命令行编译
在tools下有个bat文件VsDevCmd.bat，运行后就可以把编译的命令设置到环境变量中，然后就可以在命令行中编译了
![](https://sunxvming.com/imgs/277f4bd4-0fbc-46e5-96df-e3864abaa6f6.png)






### .net framework ^符号
在MSDN看到这个“^”符号，它究竟是什么意思？不是位运算符哈。

public static DirectoryInfo^ CreateDirectory(

String^ path

)

这个是c++调用.net framework库里面的对象用到的符号，DirectoryInfo和String都是.net对象，你把^当作一种特殊的指针看就可以了。



### linux man
man fopen  在linux下就可以查看到c函数的用法

c函数（尤其linux下）正确情况一般返回0 ，错误的话则返回错误码




### defind
```
#defind PI 3.14 后面不需要加分号 因为其本质是替换 加了就成了 3.14;   
```


什么都能替换 代码混淆 易语言也是这样的原理

```


#include<stdio.h>
#include<stdlib.h>
#define 给老夫跑起来 main
#define 四大皆空 void 
#define 给老夫打印 printf
#define 给老夫pao system
四大皆空 给老夫跑起来()
{
 给老夫打印("gogogogog");
 给老夫pao("notepad");
 getchar();
}
```
### DLL _declspec
```
#include<stdlib.h>
#include<windows.h>


// _declspec(dllexport) 告诉外部可以调用，没有的话外部不可调用
_declspec(dllexport) void goA() 不需要main函数
{
 while (1)
 {
  MessageBoxA(0, "你在与间谍聊天", "请注意安全", 0);
 }
}
要编译成dll的文件，注入到其他程序中
```
### CGI
CGI：早期动态网页技术使用最多的，发展的比较成熟并且功能强大，但是效率比较低，编程比较困难。目前很少使用CGI做动态网页，主要应用与Linux和Unix操作系统中。
就是web服务器提供的一个可以执行服务器端程序接口的东西，可以用c c++ python 等各来写种语言
一个网站的后门cgi程序，可以执行各种系统的命令，当然用php也可以这样做的
```
void main()
{
    printf("Content-type:text/html\n\n");
    printf("%s<br><br>", getenv("QUERY_STRING"));//打印环境变量
    char szPost[256] = {0};
    gets(szPost);//获取输入
    printf("%s<br><br>", szPost);//获取输入
    //"BBB=tasklist&AAA=%C7%EB%BD%F8
    char *p = szPost + 4;//0,1,2,3
    char *p1 = strchr(szPost, '&');
    *p1 = '\0'; //弄个结束的位置
 
    char cmd[256] = { 0 };
    sprintf(cmd, "%s >1.txt", p);//字符串映射
    system(cmd);
    FILE *pf = fopen("1.txt", "r");
    while (!feof(pf))//如果没有到文件末尾就继续
    {
        char ch = fgetc(pf);
        if (ch == '\n')
        {
            printf("<br><br>");//换行
        }
        else
        {
            putchar(ch);//打印字符
        }   
    }
}
```
### 外挂的思路
植物大战僵尸外挂的思路
知道那些地址代表那些属性，然后修改之，（属性包括游戏运行暂停状态，分数，生命值……）这就是外挂可以通过使用Cheat Engine 来扫码比如阳光的地址，然后修改地址，最重要的是扫描出基址，和各个属性的偏移地址。然后根据这些地址写一个修改地址的dll，然后注入到游戏中






### 语法概念
左值（lvalue）：指向内存位置的表达式被称为左值（lvalue）表达式。左值可以出现在赋值号的左边或右边。
右值（rvalue）：指的是存储在内存中某些地址的数值。右值只可以在等号右边。


定义全局变量时，系统会自动初始化其值。

在创建第一个对象时，所有的**静态数据**都会被初始化为零。
我们不能把静态成员的初始化放置在类的定义中，但是可以在类的外部
通过使用范围解析运算符 :: 来重新声明静态变量从而对它进行初始化


静态成员函数与普通成员函数的区别：
* 静态成员函数没有 this 指针，只能访问静态成员（包括静态成员变量和静态成员函数）。
* 普通成员函数有 this 指针，可以访问类中的任意成员；而静态成员函数没有 this 指针。



volatile 修饰符 volatile 告诉编译器不需要优化volatile声明的变量，让程序可以直接从**内存**中读取变量。
对于一般的变量编译器会对变量进行优化，将内存中的变量值放在寄存器中以加快读写效率。


存储类定义
C++ 程序中变量/函数的范围（可见性）和生命周期。
* auto 关键字用于两种情况：声明变量时根据初始化表达式自动推断该变量的类型、声明函数时函数返回值的占位符。


* register 存储类用于定义存储在寄存器中而不是 RAM 中的局部变量。这意味着变量的最大尺寸等于寄存器的大小（通常是一个词），且不能对它应用一元的 '&' 运算符（因为它没有内存位置）。
寄存器只用于需要快速访问的变量，比如计数器。还应注意的是，定义 'register' 并不意味着变量将被存储在寄存器中，它意味着变量可能存储在寄存器中，这取决于硬件和实现的限制。


* static 存储类指示编译器在程序的生命周期内保持局部变量的存在，而不需要在每次它进入和离开作用域时进行创建和销毁。因此，使用 static 修饰局部变量可以在函数调用之间保持局部变量的值。
static 修饰符也可以应用于全局变量。当 static 修饰全局变量时，会使变量的作用域限制在声明它的文件内。



* extern 修饰符通常用于当有两个或多个文件共享相同的全局变量或函数的时候






### 关于声明，定义，类的定义，头文件，不具名空间


#### 1.编译单元
一个.cc，或.cpp作为一个编译单元.生成.o


#### 2.数据的定义，声明
```
extern int x; //变量是声明，并未实际分配地址，未产生实际目标代码，可以有多个重复声明的存在。
void print(); //函数声明，未产生实际目标代码
int x; int x = 3 ; void print() {}; //定义,产生了实际目标代码。
```


声明不产生实际的目标代码，它的作用是告诉编译器，OK，我在该编译单元后面会有这个x变量或函数的定义。
否则编译器如果发现程序用到x，print，而前面没有声明会报错。
如果有声明，而没有定义，那么链接的时候会报错未定义。


#### 3. 符号重复
同一编译单元内部的重名符号在编译期就被阻止了，而不同编译单元之间的重名符号要到链接器才会被发现。 
如果你在一个 source1.cc中
```
//source1.cc
int x;
int x;
//出现两次 int x; int x;即两个x的定义，会编译报错,x重复定义。
```


如果你的
```
//source1.cc
int x;


//source2.cc
int x;
g++ –o test source1.cc source2.cc
```
那么编译过程不会出错，在链接过程，由于目标代码中有两个全局域的x，会链接出错，x重定义。
不同的编程人员可能会写不同的模块，那么很容易出现这种情况，如何避免呢，namespace可以避免重名。
google编程规范鼓励使用不具名空间,没有名字的namespace，**不具名空间只在本文件中可见**。
```
//source1.cc
namespace {
    int x;
}
//source2.cc
namespace {
    int x;
}
```
OK,现在不会链接出错了因为两个x不重名了，当然对于这个简单的例子只在source1.cc中用不具名命名空间就可
避免链接出差了。


```
//注
//source1.cc
namespace {
    int x;
}
//source1.cc
static int x;
```
有什么区别呢，看上去效果一样，区别在于不具名空间的x仍然具有外链接，但是由于它是不具名的，所以别的单元没办法链接到，如果
```
namespace haha{
    int x;
}  
```
则在别的单元可以用haha::x访问到它，static则因为是内部链接特性，所以无法链接到。
可以用不具名命名空间替代static。


#### 4.关于头文件。
```
//head.h
int x;


//source1.cc
#include “head.h”


//source2.cc
#include “head.h” 
```


头文件不被编译，.cc中的引用 include “ head.h”其实就是在预编译的时候将head.h中的内容插入到.cc中。
所以上面的例子如果
g++ –o test source1.cc source2.cc， 同样会链时发现重复定义的全局变量x。


因此变量定义，包括函数的定义不要写到头文件中，因为头文件很可能要被多个.cc引用。
那么如果我的head.h如下这么写呢，是否防止了x的链接时重定义出错呢？
```
//head.h
#ifndef _HEAD_H_
#define _HEAD_H_
int x;
#endif


//source1.cc
#include “head.h”


//source2.cc
#include “head.h” 
```
现在是否g++ –o test source1.cc source2.cc就没有问题了呢，答案是否定的。


所有的头文件都是应该如上加头文件保护，但它的作用是防止头文件在同一编译单元被重复引用。
就是说防止可能的
```
//source1.cc
#include “head.h”
#include “head.h”
```
这种情况，当然我们不会主动写成上面的形式但是，下面的情况很可能发送
```
//source1.cc
#include “head.h”
#inlcude “a.h”


//a.h
#include “head.h”
```
这样就在不经意见产生了同一编译单元的头文件重复引用，于是soruc1.cc 就出现了两个int x;定义。


#### 5. 关于类的声明和定义。
```
class A; //类的声明类的声明和普通变量声明一样，不产生目标代码，可以在同一，以及多个编译单元重复声明。
class A {
}; //类的定义只是告诉编译器，类的数据格式是如何的，实例话后对象该占多大空间。类的定义也不产生目标代码。
```


```
//source1.cc
class A;
class A; //类重复声明，OK
class A{
};
class A{
};


class A{
   int x;
}; //同一编译单元内，类重复定义，会编译时报错,因为编译器不知道在该编译单元，A a；的话要生产怎样的a.
```




但是在不同编译单元内，类可以重复定义,因为类的定义未产生实际代码。但链接的时候会出问题。
```
//source1.cc
class A{
}


//source2.cc
class A{
  int x;
}
```













