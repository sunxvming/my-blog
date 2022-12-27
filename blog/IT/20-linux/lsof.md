lsof(list open files)是一个列出当前系统打开文件的工具

常用参数
```
-n    inhibits the conversion of network numbers to host names for network files. Inhibiting conversion may make lsof run faster
-c c    selects the listing of files for processes executing the command that begins with the characters of c
-p  列出pid的fd
```




查看某个文件正在被谁使用
```
lsof /soft/jdk1.8.0_131/bin/java
```


递归查看某个目录正在使用的文件信息
```
lsof +D /soft/
lsof /soft     #这样的话不会递归
```
列出某个程序所打开的文件信息 
```
lsof -n -c java
```
查看某个进程pid打开的文件句柄
```
lsof  -n -p 10339 
```

ulimit -n 查看最大fd

CentOS 7中的lsof是按PID/TID/file的组合显示结果的,多个线程中会重复打印同一个fd
同一个进程如果多个线程访问同一个文件通常只需要打开一次、占用一个fd，但在lsof中就显示多行。
下面的命令其实也没有太大意义
```
lsof -n|awk '{print $2}'|sort|uniq -c|sort -nr|less
```

这个比较准：
```
find /proc -print | grep -P '/proc/\d+/fd/'| awk -F '/' '{print $3}' | uniq -c | sort -rn | head
```



看某个具体的进程：
```
lsof -n -p <pid>
ls -l /proc/<pid>/fd | wc -l
```





## 测试fd泄漏
```
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <unistd.h>


int main()
{
    int pid = getpid();
    printf("pid:%d\n", pid);


    int i = 0;
    while (i < 500)
    {
        int fh = open("a.txt", O_CREAT | O_WRONLY, S_IRUSR | S_IWUSR);
        printf("%d\n", fh);
        i++;
    }
    sleep(1000);
    return 0;
}
```

博客：侦测程序句柄泄露的统计方法
https://www.ibm.com/developerworks/cn/linux/l-cn-handle/


下面脚本对某进程采样 3000 个数据，每 10 秒采样一次，依此数据绘制句柄统计趋势图。
```
#!/bin/sh
set -x
echo "">total_handler

psid=`ps -ef|grep $1|head -1|awk '{print $2}'`
count=0 
while [ $count -lt 3000 ] 
do 
 lsof -p $psid|wc -l >> total_handler
 sleep 10 
 count=`expr $count + 1`
done
```
根据我们项目的测试经验，通常统计出来的句柄图形如下列三种：
平稳
![](https://sunxvming.com/imgs/dcacc18d-a766-4bb5-b1df-ed0161580624.png)
在程序运行当中，句柄被不断地打开关闭，因此统计图形呈现平稳的锯齿形。在程序运行后期，很多临时打开的句柄被逐渐关闭，总的句柄数量没有随着时间的推移而增加，因此该程序不存在句柄泄露。


峰值稳定
![](https://sunxvming.com/imgs/0d46c8d1-aaaa-4725-99e9-e69af459257c.png)
在该程序运行初期，程序打开的句柄数量会随着时间的推移而逐步增加。但是当运行一段时间后，句柄数量会达到一个相对平稳的状态，大概 3500 左右。这个时候表明程序打开了很多临时句柄，但是句柄数量相对稳定，也不存在句柄泄露问题。


递增
![](https://sunxvming.com/imgs/14960e2a-db49-4252-a2b4-12470f866e3f.png)
程序在运行当中，某一操作引起了程序打开句柄数量逐步增加，而且没有出现相对平稳的迹象，说明该程序可能存在句柄泄露，需要进一步分析是哪一部分的句柄存在泄漏，以及什么操作会引起程序句柄的泄露。


通过对程序句柄数量进行采样统计，并且绘制出相应的统计图形，能够以比较直观的方式判断在程序中是否存在句柄泄露。该方法基于程序要运行大量的测试用例，增加测试用例的覆盖率，尽可能多的用测试用例触发程序打开和关闭句柄的操作，这样才能发现潜在的句柄泄露 bug。对于如何能够快速的发现句柄泄露代码，我们将做进一步研究。





















