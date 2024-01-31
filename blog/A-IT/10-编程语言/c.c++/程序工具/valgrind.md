Valgrind 是个开源的工具，功能很多。例如检查内存泄漏工具---memcheck。
用法: `valgrind [options] prog-and-args`
`[options]`: 常用选项，适用于所有Valgrind工具
`-tool=<name>` 最常用的选项。运行 valgrind中名为toolname的工具。默认memcheck。

* memcheck ------> 这是valgrind应用最广泛的工具，一个重量级的内存检查器，能够发现开发中绝大多数内存错误使用情况。
* callgrind ------> 它主要用来检查程序中函数调用过程中出现的问题。
* cachegrind ------> 它主要用来检查程序中缓存使用出现的问题。
* helgrind ------> 它主要用来检查多线程程序中出现的竞争问题。
* massif ------> 它主要用来检查程序中堆栈使用中出现的问题。
* extension ------> 可以利用core提供的功能，自己编写特定的内存调试工具


检查内存泄漏
```
valgrind --tool=memcheck --leak-check=full ./test
```


例如：
```
#include <iostream>
using namespace std;
int main()
{
        for(int i = 0; i < 1000000; i++)
        {
                new int(2);
        }
    return 0;
}
```
```
valgrind --tool=memcheck --leak-check=full ./a.out
```

















