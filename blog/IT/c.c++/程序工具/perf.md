perf 可以对指定的进程或者事件进行采样，并且还可以用调用栈的形式，输出整个调用链上的汇总信息。

使用 perf 来查找应用程序或者内核中的**热点函数**，从而找出是什么函数占用CPU比较高，从而定位性能瓶颈。
使用 perf 对系统内核线程进行分析时，内核线程依然还在正常运行中，所以这种方法也被称为**动态追踪技术**。


安装
`yum install perf -y`


##  perf top
第一种常见用法是 perf top，类似于 top，它能够**实时显示**占用 CPU 时钟最多的函数或者指令，因此可以用来查找热点函数，使用界面如下所示：
```
$ perf top
Samples: 833 of event 'cpu-clock', Event count (approx.): 97742399
Overhead Shared Object Symbol
   7.28% perf [.] 0x00000000001f78a4
   4.72% [kernel] [k] vsnprintf
   4.32% [kernel] [k] module_get_kallsym
   3.65% [kernel] [k] _raw_spin_unlock_irqrestore
...
```
输出结果中，第一行包含三个数据：分别是采样数（Samples）、事件总数量（Event count）
比如这个例子中，perf 总共采集了 833 个 CPU 时钟事件，而总事件数则为 97742399。
另外，采样数需要我们特别注意。如果采样数过少（比如只有十几个），那下面的排序和百分比就没什么实际参考价值了。


## perf record 和 perf report
perf top 虽然实时展示了系统的性能信息，但它的缺点是并不保存数据，也就无法用于离线或者后续的分析。
而 `perf record` 则提供了保存数据的功能，保存后的数据，需要你用 `perf report` 解析展示。
record会自动保存到当前目录下的perf.data文件中

## 对进程进行性能分析
```
perf record -a -g -p 187862
```
记录某个程序
```
sudo perf record -F 99 -a -g ./demo1

# -F 99 
表示采样的频率 

# -a
录取所有CPU的事件

# -g
使用函数调用图功能
```

生成报告的预览
```
# 生成报告的预览,不用加文件名，使用的是当前目录下的perf.data
perf report
```




## 其他工具
* gprof
gprof是GNU profile工具，可以运行于linux、AIX、Sun等操作系统进行C、C++、Pascal、Fortran程序的性能分析，用于程序的性能优化以及程序瓶颈问题的查找和解决。通过分 析应用程序运行时产生的“flat profile”，可以得到每个函数的调用次数，每个函数消耗的处理器时间，也可以得到函数的“调用关系图”，包括函数调用的层次关系，每个函 数调用花费了多少时间。
gprof 主要是针对应用层程序的性能分析工具，缺点是需要重新编译程序，而且对程序性能有一些影响。不支持内核层面的一些统计，优点就是应用层的函数性能统计比较精细，接近我们对日常性能的理解，比如各个函数时间的运行时间，函数的调用次数等，很人性易读。   





