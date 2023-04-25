`__typeof__()`并且`__typeof()`是C语言的编译器专用扩展，因为标准C不包含这样的运算符。标准C要求编译器用双下划线前缀语言扩展（这也是为什么你不应该为自己的函数，变量等做这些）


C++ 程序员偏向于使用 for(;;) 结构来表示一个无限循环。


### vs中查看string的中文字
在获取包含中文变量的时候，查看std::string字符串变量，提示；字符串中的字符无效
变量后加,s8 即可


### vs设置Windows SDK
```
#include <WinSock2.h>

```
vs中显示winsock2.h 找不到，于是搜索了下发现在
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/fa0dc94f-7b4b-44b8-ab25-04cef657d891.png)
 于是更改了下Windows sdk就好了
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/2cb8774d-20b1-4a5b-9db3-e24b80b4b498.png)
 



### VS命令行编译
在tools下有个bat文件VsDevCmd.bat，运行后就可以把编译的命令设置到环境变量中，然后就可以在命令行中编译了
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/277f4bd4-0fbc-46e5-96df-e3864abaa6f6.png)




### .net framework ^符号
在MSDN看到这个“^”符号，它究竟是什么意思？不是位运算符哈。
```
public static DirectoryInfo^ CreateDirectory(

String^ path

)
```

这个是c++调用.net framework库里面的对象用到的符号，DirectoryInfo和String都是.net对象，你把^当作一种特殊的指针看就可以了。



### linux man
man fopen  在linux下就可以查看到c函数的用法

c函数（尤其linux下）正确情况一般返回0 ，错误的话则返回错误码



### defind
```
#defind PI 3.14 后面不需要加分号 因为其本质是替换 加了就成了 3.14;   
```


什么都能替换 代码混淆 易语言也是这样的原理

```


#include<stdio.h>
#include<stdlib.h>
#define 给老夫跑起来 main
#define 四大皆空 void 
#define 给老夫打印 printf
#define 给老夫pao system
四大皆空 给老夫跑起来()
{
 给老夫打印("gogogogog");
 给老夫pao("notepad");
 getchar();
}
```
### `DLL _declspec`

```
#include<stdlib.h>
#include<windows.h>


// _declspec(dllexport) 告诉外部可以调用，没有的话外部不可调用
_declspec(dllexport) void goA() 不需要main函数
{
 while (1)
 {
  MessageBoxA(0, "你在与间谍聊天", "请注意安全", 0);
 }
}
要编译成dll的文件，注入到其他程序中
```
### CGI
CGI：早期动态网页技术使用最多的，发展的比较成熟并且功能强大，但是效率比较低，编程比较困难。目前很少使用CGI做动态网页，主要应用与Linux和Unix操作系统中。
就是web服务器提供的一个可以执行服务器端程序接口的东西，可以用c c++ python 等各来写种语言
一个网站的后门cgi程序，可以执行各种系统的命令，当然用php也可以这样做的
```
void main()
{
    printf("Content-type:text/html\n\n");
    printf("%s<br><br>", getenv("QUERY_STRING"));//打印环境变量
    char szPost[256] = {0};
    gets(szPost);//获取输入
    printf("%s<br><br>", szPost);//获取输入
    //"BBB=tasklist&AAA=%C7%EB%BD%F8
    char *p = szPost + 4;//0,1,2,3
    char *p1 = strchr(szPost, '&');
    *p1 = '\0'; //弄个结束的位置
 
    char cmd[256] = { 0 };
    sprintf(cmd, "%s >1.txt", p);//字符串映射
    system(cmd);
    FILE *pf = fopen("1.txt", "r");
    while (!feof(pf))//如果没有到文件末尾就继续
    {
        char ch = fgetc(pf);
        if (ch == '\n')
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
知道那些地址代表那些属性，然后修改之，（属性包括游戏运行暂停状态，分数，生命值……）这就是外挂可以通过使用Cheat Engine 来扫描比如阳光的地址，然后修改地址，最重要的是扫描出基址，和各个属性的偏移地址。然后根据这些地址写一个修改地址的dll，然后注入到游戏中



### 语法概念
左值（lvalue）：指向内存位置的表达式被称为左值（lvalue）表达式。左值可以出现在赋值号的左边或右边。
右值（rvalue）：指的是存储在内存中某些地址的数值。右值只可以在等号右边。


定义全局变量时，系统会自动初始化其值。

在创建第一个对象时，所有的**静态数据**都会被初始化为零。
我们不能把静态成员的初始化放置在类的定义中，但是可以在类的外部
通过使用范围解析运算符 :: 来重新声明静态变量从而对它进行初始化


静态成员函数与普通成员函数的区别：
* 静态成员函数没有 this 指针，只能访问静态成员（包括静态成员变量和静态成员函数）。
* 普通成员函数有 this 指针，可以访问类中的任意成员；而静态成员函数没有 this 指针。



volatile 修饰符 volatile 告诉编译器不需要优化volatile声明的变量，让程序可以直接从**内存**中读取变量。
对于一般的变量编译器会对变量进行优化，将内存中的变量值放在寄存器中以加快读写效率。


存储类定义
C++ 程序中变量/函数的范围（可见性）和生命周期。
* auto 关键字用于两种情况：声明变量时根据初始化表达式自动推断该变量的类型、声明函数时函数返回值的占位符。

* register 存储类用于定义存储在寄存器中而不是 RAM 中的局部变量。这意味着变量的最大尺寸等于寄存器的大小（通常是一个词），且不能对它应用一元的 '&' 运算符（因为它没有内存位置）。
寄存器只用于需要快速访问的变量，比如计数器。还应注意的是，定义 'register' 并不意味着变量将被存储在寄存器中，它意味着变量可能存储在寄存器中，这取决于硬件和实现的限制。


* static 存储类指示编译器在程序的生命周期内保持局部变量的存在，而不需要在每次它进入和离开作用域时进行创建和销毁。因此，使用 static 修饰局部变量可以在函数调用之间保持局部变量的值。
static 修饰符也可以应用于全局变量。当 static 修饰全局变量时，会使变量的作用域限制在声明它的文件内。


* extern 修饰符通常用于当有两个或多个文件共享相同的全局变量或函数的时候






### 关于声明，定义，类的定义，头文件，不具名空间


#### 1.编译单元
一个.cc，或.cpp作为一个编译单元.生成.o


#### 2.数据的定义，声明
```c
extern int x; //变量是声明，并未实际分配地址，未产生实际目标代码，可以有多个重复声明的存在。
void print(); //函数声明，未产生实际目标代码
int x; int x = 3 ; void print() {}; //定义,产生了实际目标代码。
```


声明不产生实际的目标代码，它的作用是告诉编译器，OK，我在该编译单元后面会有这个x变量或函数的定义。
否则编译器如果发现程序用到x，print，而前面没有声明会报错。
如果有声明，而没有定义，那么链接的时候会报错未定义。

#### 3. 符号重复
同一编译单元内部的重名符号在编译期就被阻止了，而不同编译单元之间的重名符号要到链接器才会被发现。 
如果你在一个 source1.cc中
```
//source1.cc
int x;
int x;
//出现两次 int x; int x;即两个x的定义，会编译报错,x重复定义。
```


如果你的
```
//source1.cc
int x;


//source2.cc
int x;
g++ –o test source1.cc source2.cc
```
那么编译过程不会出错，在链接过程，由于目标代码中有两个全局域的x，会链接出错，x重定义。
不同的编程人员可能会写不同的模块，那么很容易出现这种情况，如何避免呢，namespace可以避免重名。
google编程规范鼓励使用不具名空间,没有名字的namespace，**不具名空间只在本文件中可见**。
```
//source1.cc
namespace {
    int x;
}
//source2.cc
namespace {
    int x;
}
```
OK,现在不会链接出错了因为两个x不重名了，当然对于这个简单的例子只在source1.cc中用不具名命名空间就可
避免链接出差了。


```
//注
//source1.cc
namespace {
    int x;
}
//source1.cc
static int x;
```
有什么区别呢，看上去效果一样，区别在于不具名空间的x仍然具有外链接，但是由于它是不具名的，所以别的单元没办法链接到，如果
```
namespace haha{
    int x;
}  
```
则在别的单元可以用haha::x访问到它，static则因为是内部链接特性，所以无法链接到。
可以用不具名命名空间替代static。


#### 4.关于头文件。
```
//head.h
int x;


//source1.cc
#include “head.h”


//source2.cc
#include “head.h” 
```


头文件不被编译，.cc中的引用 include “ head.h”其实就是在预编译的时候将head.h中的内容插入到.cc中。
所以上面的例子如果
g++ –o test source1.cc source2.cc， 同样会链时发现重复定义的全局变量x。


因此**变量定义，包括函数的定义不要写到头文件中，因为头文件很可能要被多个.cc引用**。
那么如果我的head.h如下这么写呢，是否防止了x的链接时重定义出错呢？
```
//head.h
#ifndef _HEAD_H_
#define _HEAD_H_
int x;
#endif


//source1.cc
#include “head.h”


//source2.cc
#include “head.h” 
```
现在是否g++ –o test source1.cc source2.cc就没有问题了呢，答案是否定的。


所有的头文件都是应该如上加头文件保护，但它的作用是防止头文件在同一编译单元被重复引用。
就是说防止可能的
```
//source1.cc
#include “head.h”
#include “head.h”
```
这种情况，当然我们不会主动写成上面的形式但是，下面的情况很可能发送
```
//source1.cc
#include “head.h”
#inlcude “a.h”


//a.h
#include “head.h”
```
这样就在不经意见产生了同一编译单元的头文件重复引用，于是soruc1.cc 就出现了两个int x;定义。


#### 5. 关于类的声明和定义。
```c
class A; //类的声明类的声明和普通变量声明一样，不产生目标代码，可以在同一，以及多个编译单元重复声明。
class A {
}; //类的定义只是告诉编译器，类的数据格式是如何的，实例化后对象该占多大空间。类的定义也不产生目标代码。
```


```c
//source1.cc
class A;
class A; //类重复声明，OK
class A{
};
class A{
};


class A{
   int x;
}; //同一编译单元内，类重复定义，会编译时报错,因为编译器不知道在该编译单元，A a；的话要生产怎样的a.
```


但是在不同编译单元内，类可以重复定义,因为类的定义未产生实际代码。但链接的时候会出问题。
```
//source1.cc
class A{
}


//source2.cc
class A{
  int x;
}
```



## 示例代码
```c
#include "stdio.h"
#include "stdlib.h"
#include "string.h"


//1.在c中没有字符串这种类型，是通过字符串数组(char buf[100])去模拟
//2.字符串和字符串数组的区别 是不是 带有\0

//字符串数组 也是 数组
void main11()
{
    //通过字符串常量初始化字符串数组
    //通过这种方法它会自动给你\0
    char buf4[] = "abcdefg";
    printf("%s\n", buf4);
    system("pause");
}


//strlen() 是一个函数 求字符串的长度，不包括\0
//sizeof() 是一个操作符，求数据类型（实体）的大小(单位:字节)
void main12()
{
    char buf3[] = {'a', 'b', 'c', '\0'}; //buf是个指针
    printf("strlen(buf3):%d \n", strlen(buf3)); //3
    printf("sizeof(buf3)%d \n", sizeof(buf3));//4
    system("pause");
}


int main()
{
    char *p1 = "111111";
    char *p2 = malloc(100);   //sizeof(p2) = 4
    strcpy(p2, "3333");
}


-------------统计str里有几个substr-------------
void main()
{
    char *p = "abcd1111abcd222abcd3333";
    int ncout = 0;


    while (p = strstr(p, "abcd"))
    {
        p = p + strlen("abcd");
        ncout ++;
        if (*p == '\0')
        {
            break;
        }
    }
    printf("ncout:%d\n", ncout);
    system("pause");
}


//不要相信别人给你传送的内存地址是可用的
int getCout(char *str, char *substr, int *count)
{
    int rv = 0;
    char *p = str;
    int ncout = 0;
    if (str==NULL || substr== NULL ||  count==NULL)
    {
        rv = -1;
        printf("func getCout()check (str==NULL || substr== NULL ||  count==NULL) err:%d \n" , rv);
        return rv;
    }
   
    do
    {
        p = strstr(p, substr);
        if (p == NULL) //没有找到则跳出来
        {
            break;
        }
        else
        {
            ncout++;
            p = p + strlen(substr);
        }


    } while (*p != '\0');


    *count  = ncout;
    return rv;
}


--------------字符串复制-------------------


//因为后缀++的优先级,高于，*p;
void copy_str3(char *from , char *to)
{
    int ret = 0;
    if (from ==NULL || to== NULL)
    {
        ret = -1;
        printf("func copy_str2() err: %d, (from ==NULL || to== NULL)", ret);
        return ret;
    }   
    while(*from != '\0')
    {
//         *to = *from;
//         to ++;
//         from ++;
        *to ++ = *from++;
    }
    *to = '\0';
    return ret;
}


void copy_str4(char *from , char *to)
{
    while((*to++ = *from++) != '\0')
    {
        ;
    }
}



----------------去两边的空格，两头堵-----------------
//char *p = "       abcd11111abcd2222abcdqqqqq       ";
void main41()
{
    int count = 0; //去除空格后的长度
    int i = 0, j = 0;

  
    char *p = "   abcd       ";
    j = strlen(p) -1;


    while (isspace(p[i]) && p[i] != '\0')
    {
        i++;
    }


    while (isspace(p[j]) && j>0)
    {
        j--;
    }
    count = j-i +1;


    printf("count:%d", count);
    system("pause");
}
//封装成函数
int trimSpace(char *mybuf) 
{
    int count = 0;
    int i = 0, j = 0;


    char *p = mybuf;
    j = strlen(p) -1;


    while (isspace(p[i]) && p[i] != '\0')
    {
        i++;
    }


    while (isspace(p[j]) && j>0)
    {
        j--;
    }
    count = j-i +1;


    printf("count:%d", count);
    //void *  __cdecl memcpy(void *, const void *, size_t);
    memcpy(mybuf, mybuf+i, count);
    mybuf[count] = '\0';
    return 0;
}
//改进版
//一般情况下不要修改输入的内存块的值，一般有输入参数和输出参数
int trimSpace(char *mybuf, char *outbuf)
{
    int count = 0;
    int i = 0, j = 0;


    char *p = mybuf;   //付给一个值，以免这个指针找不到了，比如 ++操作后
    j = strlen(p) -1;


    while (isspace(p[i]) && p[i] != '\0')
    {
        i++;
    }


    while (isspace(p[j]) && j>0)
    {
        j--;
    }
    count = j-i +1;


    printf("count:%d", count);
    //void *  __cdecl memcpy(void *, const void *, size_t);
    memcpy(outbuf, mybuf+i, count);
    outbuf[count] = '\0';
    return 0;
}


-------------字符串反转----------------
void main()
{
    //char *str = "abcdefg";   因为他是在全局区，没法改变的
    char str[] = "abcdefg";   //在栈区的
    int len = strlen(str);
    char *p1 = str;
    char *p2 = str + len -1;


    while(p1 < p2)
    {
        char c = *p1;
        *p1 = *p2;
        *p2 = c;
        p1 ++;
        p2 --;
    }
    printf("str:%s\n", str);
    system("pause");
}


----------------------配置文件查找------------------------------
int getKeyByValude(char *keyvaluebuf /*in*/,  char *keybuf  /*in*/,
    char *valuebuf /*in out*/, int * valuebuflen /*in out*/)
{
    // 检查参数合法性
    int rv = 0;
    char tmp[2048*10];
    char *p = NULL;
    //1. 在大字符串里面查找有么有关键字
    p = strstr(keyvaluebuf, keybuf);
    if (p==NULL)
    {
        return 0;
    }
    p = p + strlen(keybuf);


    //2. 再查找=号
    p = strstr(keyvaluebuf, "=");
    if (p==NULL)
    {
        return 0;
    }
    p = p + 1;
    //3 去掉左右空格
    rv = trimSpace_ok2(p, tmp);
    if (rv != 0)
    {
        printf("func trimSpace_ok2() err:%d\n", rv);
        return rv;
    }


    strcpy(valuebuf, tmp);
    *valuebuflen = strlen(tmp);
    return 0;
}


void main()
{
    int rv = 0;
    char keyvaluebuf[] = "ORACLE_name  =  itcast     ";


    char *keybuf = "ORACLE_name";
    char valuebuf[1024];
    int valuebuflen = 0;


    //调用函数，要先判断是否出错
    rv = getKeyByValude(keyvaluebuf, keybuf, valuebuf, &valuebuflen);
    if (rv != 0)
    {
        printf("func getKeyByValude() err:%d", rv);
        return ;
    }
    printf("valuebuf:%s\n", valuebuf);
    printf("valuebuflen:%d\n", valuebuflen);


    system("pause");
}


void main02()
{
    //我声明了一个数组类型
    typedef int(MyArr5)[5];    //5个int类型的内存空间，也就是类型的长度

    //用数据类型定义一个变量
    MyArr5 arr5; //相当于int arra[5];


    for (i=0; i<5; i++)
    {
        arr5[i] = i+1;
    }


    for (i=0; i<5; i++)
    {
        printf("%d \n", arr5[i]);
    }


    printf("%d\n", (int)sizeof(arr5));  //20


    //指针步长是20
    printf("%p %p\n", &arr5, &arr5 + 1);   //0x7fffb9a9d500 0x7fffb9a9d514 


    system("pause");
}
--------------指向数组类型的指针变量----------


void main022()
{
    int a;
    int *p = NULL;
    int i = 0;


    //我声明了一个数组类型 （固定大小内存块的别名）
    typedef int(MyArr5)[5];
    //定义一个指向数组类型的指针变量
    MyArr5 *pArray;// &a;


    int a1[5] = {1,3,4,55, 6};
    //给数组指针赋值 需要。。。&a1
    MyArr5 *pArray = &a1; //4个字节
    //用数组指针去遍历数组
    for (i=0; i<5; i++)
    {
        printf("%d ", (*pArray)[i]);
    }


    system("pause");
}




//c库函数读写二进制文件的代码，linux下不区分文本文件和二进制文件，所以也就没有win下的b的读写模式
//二进制文件必须知道文件的格式才能解析出来
struct person
{
    int id;
    char name[20];
    int age;
    int sex;
    char tel[20];
};


//读结构体
int main(int arg, char *args[])
{
    FILE *p = fopen(args[1], "w");
    if (p == NULL)
    {
        printf("error is %s\n", strerror(errno));
    } else
    {
        printf("success\n");
        struct person man;
        memset(&man, 0, sizeof(man));


        while(fread(&man, sizeof(struct person), 1, p))
        {
            printf("id=%d\n", man.id);
            printf("name=%s\n", man.name);
            printf("age=%d\n", man.age);
            printf("tel=%s\n", man.tel);
        }
        fclose(p);
    }
    return 0;
}


//写结构体
int main(int arg, char *args[])
{
    FILE *p = fopen(args[1], "w");
    if (p == NULL)
    {
        printf("error is %s\n", strerror(errno));
    } else
    {
        printf("success\n");
        struct person man[10];
        memset(&man, 0, sizeof(man));


        man[0].id = 0;
        strcpy(man[0].name, "苍井空");
        man[0].age = 50;
        man[0].sex = 1;
        strcpy(man[0].tel, "911");


        man[1].id = 1;
        strcpy(man[1].name, "饭岛爱");
        man[1].age = 20;
        man[1].sex = 0;
        strcpy(man[1].tel, "119");


        fwrite(&man, sizeof(struct person), 2, p);
        fclose(p);
    }
    return 0;
}


//写log的代码
void writelog(const char *log)
{
    time_t tDate;
    struct tm *eventTime;
    time(&tDate);//得到系统当前时间
    eventTime = localtime(&tDate);//将time_t数据类型转化为struct tm结构
    int iYear = eventTime->tm_year + 1900;
    int iMon = eventTime->tm_mon + 1;
    int iDay = eventTime->tm_mday;
    int iHour = eventTime->tm_hour;
    int iMin = eventTime->tm_min;
    int iSec = eventTime->tm_sec;


    printf("tm_isdst = %d\n", eventTime->tm_isdst);


    char sDate[16];
    sprintf(sDate, "%04d-%02d-%02d", iYear, iMon, iDay);
    char sTime[16];
    sprintf(sTime, "%02d:%02d:%02d", iHour, iMin, iSec);
    char s[1024];
    sprintf(s, "%s %s %s\n", sDate, sTime, log);
    FILE *p = fopen("my.log", "a+");
    if (p == NULL)
    {
        printf("write log my.log error:%s\n", strerror(errno));
    }else
    {
        fputs(s, p);
        fclose(p);
    }
    return;
}




```







