## 开篇词 | 为什么要学习Linux操作系统？

在编程世界中，Linux 就是主流，不会 Linux 你就会格格不入
研究 Linux 内核代码，你能学到数据结构与设计模式的落地实践
了解 Linux 操作系统生态，能让你事半功倍地学会新技术


## 01丨入学测验：你究竟对Linux操作系统了解多少？


## 02 | 学习路径：爬过这六个陡坡，你就能对Linux了如指掌
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/d430ef14-b0be-454e-9f72-63504628d2ad.jpg)


* 熟练使用 Linux命令行、
* 通过系统调用或者 glibc，学会自己进行程序设计
* 了解 Linux 内核机制、
《深入理解 LINUX 内核》。这本书言简意赅地讲述了主
要的内核机制。看完这本书，你会对 Linux 内核有总体的了解。不过这本书的内核版本有
点老，不过对于了解原理来讲，没有任何问题。
* 阅读 Linux 内核代码，聚焦核心逻辑和场景
在了解内核机制的时候，你肯定会遇到困惑的地方，因为理论的描述和提炼虽然能够让你更
容易看清全貌，但是容易让你忽略细节。
一开始阅读代码不要纠结一城一池的得失，不要每一行都一定要搞清楚它是干嘛的，而要聚焦于核心逻辑和使用场景。
这里也推荐一本书，《LINUX 内核源代码情景分析》。这本书最大的优点是结合场景进行
分析，看得见、摸得着，非常直观，唯一的缺点还是内核版本比较老。
* 实验定制化 Linux 组件，已经没人能阻挡你成为内核开发工程师了
纸上得来终觉浅，绝知此事要躬行。从只看内核代码，到上手修改内核代码，这又是一个很大的坎。
* 面向真实场景的开发，实践没有终点


## 03 | 你可以把Linux内核当成一家软件外包公司的老板
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/79b899d5-aebf-41ab-9c41-10fc1609a733.jpg)
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/b2bd1b74-f467-42cc-a40b-659a977da497.jpg)


## 04 | 快速上手几个Linux命令：每家公司都有自己的黑话
Linux 执行程序的方式
* 通过 shell 在交互命令行里面运行
* 后台运行
nohup command >out.file 2>&1 &
退出：ps -ef |grep 关键字 |awk '{print $2}'|xargs kill -9
* 以服务的方式运行
启动  systemctl start mysql      
关闭  systemctl stop mysql      
开机运行   systemctl enable mysql
之所以成为服务并且能够开机启动，是因为在Ubuntu /lib/systemd/system
centos /usr/lib/systemd/system
 目录下会创建一个 XXX.service 的配置文件，里面定义了如何启动、如何关闭


## 05 | 学会几个系统调用：咱们公司能接哪些类型的项目？
## 06 | x86架构：有了开放的架构，才能打造开放的营商环境
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/c14d9aae-3e72-40d7-9d79-90c697eb09fd.jpg)
CPU 和内存来来回回传数据，靠的都是总线。其实总线上主要有两类
数据，一个是地址数据，也就是我想拿内存中哪个位置的数据，这类总线叫地址总线
（Address Bus）；另一类是真正的数据，这类总线叫数据总线（Data Bus）。
* 地址总线的位数，决定了能访问的地址范围到底有多广。例如只有两位，那 CPU 就只能认
00，01，10，11 四个位置，超过四个位置，就区分不出来了。位数越多，能够访问的位置
就越多，能管理的内存的范围也就越广。
* 而数据总线的位数，决定了一次能拿多少个数据进来。例如只有两位，那 CPU 一次只能从
内存拿两位数。要想拿八位，就要拿四次。位数越多，一次拿的数据就越多，访问速度也就
越快。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/ddb16d0f-d68f-4b0d-9fff-c1f1382bf1ee.jpg)


## 07 | 从BIOS到bootloader：创业伊始，有活儿老板自己上
而 ROM 是只读的，上面早就固化了一些初始化的程序，也就是BIOS（Basic Input and Output System，基本输入输出系统）。




## 08 | 内核初始化：生意做大了就得成立公司

这个过程就是这样的：用户态 - 系统调用 - 保存寄存器 - 内核态执行系统调用 - 恢复寄存器 - 返回用户态，然后接着运行
这一节，我们讲了内核的初始化过程，主要做了以下几件事情：
各个职能部门的创建；
用户态祖先进程的创建；
内核态祖先进程的创建。


## 09 | 系统调用：公司成立好了就要开始接项目



## 10 | 进程：公司接这么多项目，如何管？
最终编译成为.o 文件，这就是 ELF 的第一种类型，可重定位文件（Relocatable File）。
二进制文件叫可执行文件，是 ELF 的第二种格式
动态链接库，就是 ELF 的第三种类型，共享对象文件（Shared Object）。

## 11 | 线程：如何让复杂的项目并行执行？
### 如何创建线程？

### 线程的数据
第一类是线程栈上的本地数据，比如函数执行过程中的局部变量。
第二类数据就是在整个进程里共享的全局数据。
第三类数据，线程私有数据（Thread Specific Data）
```
int pthread_key_create(pthread_key_t *key, void (*destructor)(void*))
int pthread_setspecific(pthread_key_t key, const void *value)
void *pthread_getspecific(pthread_key_t key)
```
### mutex
### 条件变量








































