# c++编码规范
-------------

## 工具设置
缩进 制表符大小=4 缩进大小=4
编码 no bom的UTF-8


## 头文件

### 1.使用#define保护
```
#ifndef __FOO_CLASS_H__
#define __FOO_CLASS_H__
...
#endif//__FOO_CLASS_H__
```
### 2.内联函数
建议低于10行函数才考虑inline


### 3.cpp文件`#include`顺序建议如下
* 本.cpp的.h头文件
* c\c++库
* 依赖库
* 本项目内的.h

### 4.类的前置声明 
```
// #include <Hero> 尽量不要包含头文件,
class Hero; //下方前置声明
class Mon;
class Tri
{
    Mon* m;
    Hero* h;
}
```

## 命名规定
* 常量：大写加下划线
* 文件名:同类名一致，一般一个类一个文件
* 类名：大驼峰 class MyClass;
* 成员变量：小驼峰，foo_ 下划线结尾
* 成员函数：小驼峰
* 变量名：小写加下划线
* 普通函数：小写加下划线



## 注释
* 使用规定的代码片段创建文件、类注释
* 每个文件头加入功能说明及作者信息
* 未完成的代码使用TODO注释
```
//========================================================================
// 名称： xx
// 作者：xx
// 功能简介：xx
// 修改时间：2015.02.05
//========================================================================
```


## 命名空间
1.客户端使用 namespace xxx{} 命名空间包裹,xxx为本项目定义的命名空间
2.全局函数也封装于命名空间内
3.禁止使用using namespace xx; 建议使用using namespace LORD::FOO;类型

4.命名空间不要增加额外的缩进层次, 例如:
```
namespace {

void foo() {  // 正确. 命名空间内没有额外的缩进.
  ...
}

}  // namespace
```

5.声明嵌套命名空间时, 每个命名空间都独立成行.
```
namespace foo {
namespace bar {
```


## 类
1.仅仅有数据时使用struct,其他一律使用class
2.成员变量初始化顺序,声明顺序对应


## 其他C++
* 判断指针为空，逻辑层尽量判断
* 输入参数为值或者const引用
* 使用c++类型转换，static_cast<>，建议不要使用int* y = (int*)x; 验证 B* b = (B*)c; B* b = static_cast<B*> c;
* 使用前置自增自减，尤其迭代器和模板类型
* 整数用0 实数用0.0 指针用nullptr 
* 使用sizeof(value)替代sizeof(type)
* 消除编译器报的所有警告



## 低效率写法
```
// 低效率 禁止使用
for (int i=0; i<1000; ++i)
{
    Foo f;
    f.DoSomething(i);
}
// 建议使用
Foo f;
for (int i=0; i<1000; ++i)
{
    f.DoSomething(i);
}
```




# Google C++ Style Guide

## C++ Version
Currently, code should target C++17, i.e., should not use C++2x features.
> 基于 C++ 11，C++ 17 旨在使 C++ 成为一个不那么臃肿复杂的编程语言，以简化该语言的日常使用，使开发者可以更简单地编写和维护代码。



## 命名约定
通用命名规则
函数命名, 变量命名, 文件命名要有描述性; 少用缩写.
尽可能使用描述性的命名, 别心疼空间, 毕竟相比之下让代码易于新读者理解更重要. 不要用只有项目开发者能理解的缩写, 也不要通过砍掉几个字母来缩写单词.



## 参考链接
- [Google 开源项目风格指南 (中文版)](https://zh-google-styleguide.readthedocs.io/en/latest/contents/), by google



