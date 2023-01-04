## 信号的基本概念
信号是linux系统中进程间通讯的方式，是**一种异步的通知机制，用来提醒进程一个事件已经发生**。
为了理解信号，先从我们最熟悉的场景说起：
1. 用户输入命令，在Shell下启动一个前台进程。
2. 用户按下Ctrl-C，这个键盘输入产生一个**硬件中断**。
3. 如果CPU当前正在执行这个进程的代码，则该进程的用户空间代码暂停执行，CPU从用户
态切换到内核态处理硬件中断。
4. 终端驱动程序将Ctrl-C解释成一个 SIGINT 信号，记在该进程的PCB中（也可以说发送了一
个 SIGINT 信号给该进程）。
5. 当某个时刻要从内核返回到该进程的用户空间代码继续执行之前，首先处理PCB中记录的
信号，发现有一个 SIGINT 信号待处理，而这个信号的默认处理动作是终止进程，所以直接
终止进程而不再返回它的用户空间代码执行。


用 kill -l 命令可以察看系统定义的信号列表：
```
$ kill -l
1) SIGHUP 2) SIGINT 3) SIGQUIT 4) SIGILL
5) SIGTRAP 6) SIGABRT 7) SIGBUS 8) SIGFPE
9) SIGKILL 10) SIGUSR1 11) SIGSEGV 12) SIGUSR2
13) SIGPIPE 14) SIGALRM 15) SIGTERM 16) SIGSTKFLT
17) SIGCHLD 18) SIGCONT 19) SIGSTOP 20) SIGTSTP
21) SIGTTIN 22) SIGTTOU 23) SIGURG 24) SIGXCPU
25) SIGXFSZ 26) SIGVTALRM 27) SIGPROF 28) SIGWINCH
29) SIGIO 30) SIGPWR 31) SIGSYS 34) SIGRTMIN
35) SIGRTMIN+1 36) SIGRTMIN+2 37) SIGRTMIN+3 38) SIGRTMIN+4
...
```
这些宏定义可以在 signal.h 中找到，例如其中有定义 `#define SIGINT 2`
man signal可以去查看具体的说明
产生信号的条件主要有：
* 用户在终端按下某些键时，终端驱动程序会发送信号给前台进程，例如Ctrl-C产
生 SIGINT 信号，Ctrl-\产生 SIGQUIT 信号，Ctrl-Z产生 SIGTSTP 信号
* 硬件异常产生信号，这些条件由硬件检测到并通知内核，然后内核向当前进程发送适当的
信号。例如当前进程执行了除以0的指令，CPU的运算单元会产生异常，内核将这个异常
解释为 SIGFPE 信号发送给进程。再比如当前进程访问了非法内存地址，MMU会产生异
常，内核将这个异常解释为 SIGSEGV 信号发送给进程。
* 一个进程调用 kill(2) 函数可以发送信号给另一个进程。
* 可以用 kill(1) 命令发送信号给某个进程， kill(1) 命令也是调用 kill(2) 函数实现的，如果
不明确指定信号则发送 SIGTERM 信号，该信号的默认处理动作是终止进程。
* 当内核检测到某种**软件条件**发生时也可以通过信号通知进程，例如闹钟超时产
生 SIGALRM 信号，向读端已关闭的管道写数据时产生 SIGPIPE 信号。


如果不想按默认动作处理信号，用户程序可以调用 sigaction(2) 函数告诉内核如何处理某种信号，可选的处理动作有以下三种：
1. 忽略此信号。
2. 执行该信号的默认处理动作。
3. 提供一个信号处理函数，要求内核在处理该信号时切换到用户态执行这个处理函数，这种方式称为捕捉（Catch）一个信号。


## 产生信号
### 通过终端按键产生信号
`SIGINT` 的默认处理动作是终止进程， `SIGQUIT` 的默认处理动作是终止进程并且Core Dump
Core Dump:当一个进程要异常终止时，可以选择把进程的用户空间内存数据
全部保存到磁盘上，文件名通常是 core ，这叫做Core Dump。进程异常终止通常是因为
有Bug，比如非法内存访问导致段错误，事后可以用gdb检查 core 文件以查清错误原因
一个进程允许产生多大的 core 文件取决于进程的Resource Limit（这个
信息保存在PCB中）。默认是不允许产生 core 文件的，因为 core 文件中可能包含用户密码等敏
感信息，不安全。在开发调试阶段可以用 ulimit(user limit) 命令改变这个限制，允许产生 core 文件。
比如：ulimit -c 1024 c表示core
### 调用系统函数向进程发信号
* `kill` 命令是调用 kill 函数实现的。 kill 函数可以给一个指定的进程发送指定的信号。
* `raise` 函数可以给当前进程发送指定的信号（自己给自己发信号）。
* `abort` 函数使当前进程接收到 SIGABRT 信号而异常终止。
该函数发送SIGABRT信号给调用进程，进程不应该忽略这个信号。
即使进程捕捉到SIGABRT这个信号，进程还是会异常退出。
让进程捕捉SIGABRT的意图是，在进程终止前由其执行所需的清理操作。
就像 exit 函数一样， abort 函数总是会成功的，所以没有返回值

```
#include <signal.h>
int kill(pid_t pid, int signo);
int raise(int signo);
```
```
#include <stdlib.h>
void abort(void);
```


### 由软件条件产生信号
`SIGPIPE` 是一种由软件条件产生的信号,在读端都关闭了，依然写的情况下，那么该进程会收到信号 SIGPIPE ，通常会导致进程异常终止
SIGALRM信号是由alarm 函数产生的
```
#include <unistd.h>
unsigned int alarm(unsigned int seconds);
```
调用 alarm 函数可以设定一个闹钟，也就是告诉内核在 seconds 秒之后给当前进程发 `SIGALRM` 信
号，该信号的默认处理动作是终止当前进程。
```
#include <unistd.h>
#include <stdio.h>
int main(void)
{
    int counter;
    alarm(1);
    for(counter=0; 1; counter++)
        printf("counter=%d ", counter);
    return 0;
}
```
这个程序的作用是1秒钟之内不停地数数，1秒钟到了就被 SIGALRM 信号终止。
## 阻塞信号
### 信号在内核中的表示
以上我们讨论了信号产生（Generation）的各种原因，而实际执行信号的处理动作称为**信号递
达（Delivery）**，信号从产生到递达之间的状态，称为信号**未决（Pending）**。进程可以选择**阻
塞（Block）**某个信号。被阻塞的信号产生时将**保持在未决状态**，直到进程解除对此信号的阻
塞，才执行递达的动作。
每个信号都有两个标志位分别表示**阻塞**和**未决**，还有一个**函数指针**表示处理动作。信号产生
时，内核在进程控制块中设置该信号的未决标志，直到信号递达才清除该标志。
注意，阻塞和忽略是不同的，只要信号被阻塞就不会递达，而忽略是
在递达之后可选的一种处理动作。
### 信号集操作和信号屏蔽
`sigset_t` 类型对于每种信号用一个bit表示“有效”或“无效”状态,一下为操作sigset_t的函数
```
#include <signal.h>
int sigemptyset(sigset_t *set);
int sigfillset(sigset_t *set);
int sigaddset(sigset_t *set, int signo);
int sigdelset(sigset_t *set, int signo);
int sigismember(const sigset_t *set, int signo);
```
sigprocmask 可以读取或更改进程的信号屏蔽字。
```
#include <signal.h>
int sigprocmask(int how, const sigset_t *set, sigset_t *oset);
```
返回值：若成功则为0，若出错则为-1
如果 oset 是非空指针，则读取进程的当前信号屏蔽字通过 oset 参数传出。如果 set 是非空指针，
则更改进程的信号屏蔽字，参数 how 指示如何更改。如果 oset 和 set 都是非空指针，则先将原来
的信号屏蔽字备份到 oset 里，然后根据 set 和 how 参数更改信号屏蔽字。
sigpending读取当前进程的未决信号集，通过 set 参数传出。调用成功则返回0，出错则返回-1。
```
#include <signal.h>
int sigpending(sigset_t *set);
```
例子：
```
#include <signal.h>
#include <stdio.h>
void printsigset(const sigset_t *set)
{
    int i;
    for (i = 1; i < 32; i++)
    if (sigismember(set, i) == 1)
        putchar('1');
    else
        putchar('0');
    puts("");
}
int main(void)
{
    sigset_t s, p;
    sigemptyset(&s);
    sigaddset(&s, SIGINT);
    sigprocmask(SIG_BLOCK, &s, NULL);
    while (1) {
        sigpending(&p);
        printsigset(&p);
        sleep(1);
    }
    return 0;
}
```
程序运行时，每秒钟把各信号的未决状态打印一遍，由于我们阻塞了 SIGINT 信号，按Ctrl-C将会
使 SIGINT 信号处于未决状态，按Ctrl-\仍然可以终止程序，因为 SIGQUIT 信号没有阻塞。
## 捕捉信号
linux编程需要捕捉各种信号，因为很多信号默认是终止程序的，
系统指不定就会跟程序发送什么信号呢，若不处理信号，100%会挂掉的
每个进程能够决定响应除了`SIGSTOP`和`SIGKILL`之外的其他所有信号
### 捕捉信号流程
如果信号的处理动作是用户自定义函数，在信号递达时就调用这个函数，这称为捕捉信号。
处理流程如下：
1. 用户程序注册了 SIGQUIT 信号的处理函数 sighandler 。
2. 当前正在执行 main 函数，这时发生中断或异常切换到内核态。
3. 在中断处理完毕后要返回用户态的 main 函数之前检查到有信号 SIGQUIT 递达。
4. 内核决定返回用户态后不是恢复 main 函数的上下文继续执行，而是执行 sighandler 函数， sighandler 和 main 函数使用不同的堆栈空间，它们之间不存在调用和被调用的关系，是两**个独立的控制流程**。
5. sighandler 函数返回后自动执行特殊的系统调用 `sigreturn` 再次进入内核态。
6. 如果没有新的信号要递达，这次再返回用户态就是恢复 main 函数的上下文继续执行了。

### signal函数
函数其实有点老了，用sigaction功能更强
```
#include <signal.h> 
typedef void (*sighandler_t)(int);
sighandler_t signal(int signum, sighandler_t handler);
```


### sigaction函数
sigaction 函数可以读取和修改与指定信号相关联的处理动作。调用成功则返回0，出错则返回-
1。 signo 是指定信号的编号。若 act 指针非空，则根据 act 修改该信号的处理动作。若 oact 指针
非空，则通过 oact 传出该信号原来的处理动作。
```
#include <signal.h>
int sigaction(int signo, const struct sigaction *act, struct
sigaction *oact);
```
act 和 oact 指向 sigaction 结构体：
```
struct sigaction {
void (*sa_handler)(int); /* addr of signal handler, or SIG_IGN, or SIG_DFL */
sigset_t sa_mask; /* additional signals to block*/
int sa_flags; /* signal options, Figure 10.16*/
void (*sa_sigaction)(int, siginfo_t *, void *); /* alternate handler */
};
```
将 sa_handler 赋值为常数 `SIG_IGN` 传给 sigaction 表示忽略信号，赋值为常数 `SIG_DFL` 表示执行系
统默认动作，赋值为一个函数指针表示用自定义函数捕捉信号，或者说向内核注册了一个信号
处理函数，该函数返回值为 void ，可以带一个 int 参数，通过参数可以得知当前信号的编号，这
样就可以用同一个函数处理多种信号。显然，这也是一个回调函数，不是被 main 函数调用，而
是被系统所调用。
当某个信号的处理函数被调用时，内核自动将当前信号加入进程的信号屏蔽字，当信号处理函
数返回时自动恢复原来的信号屏蔽字，这样就保证了在处理某个信号时，**如果这种信号再次产
生，那么它会被阻塞到当前处理结束为止**。如果在调用信号处理函数时，除了当前信号被自动
屏蔽之外，还希望自动屏蔽另外一些信号，则用 `sa_mask` 字段说明这些需要额外屏蔽的信号，当
信号处理函数返回时自动恢复原来的信号屏蔽字。
### pause函数
`pause` 函数使调用进程挂起直到有信号递达。
* 如果信号的处理动作是终止进程，则进程终止， pause 函数没有机会返回；
* 如果信号的处理动作是忽略，则进程继续处于挂起状态， pause 不返回；
* 如果信号的处理动作是捕捉，则调用了信号处理函数之后 pause 返回-1， errno 设置为 EINTR ，所以 pause 只有出错的返回值。


运用信号和pause实现sleep函数
```
#include <unistd.h>
#include <signal.h>
#include <stdio.h>
void sig_alrm(int signo)
{
/* nothing to do */
}
unsigned int mysleep(unsigned int nsecs)
{
    struct sigaction newact, oldact;
    unsigned int unslept;
    newact.sa_handler = sig_alrm;
    sigemptyset(&newact.sa_mask);
    newact.sa_flags = 0;
    sigaction(SIGALRM, &newact, &oldact);
    alarm(nsecs);
    pause();
    unslept = alarm(0);
    sigaction(SIGALRM, &oldact, NULL);
    return unslept;
}
int main(void)
{
    while(1){
        mysleep(2);
        printf("Two seconds passed\n");
    }
return 0;
}
```

## 可重入函数
当捕捉到信号时，不论进程的主控制流程当前执行到哪儿，都会先跳到信号处理函数中执行，
从信号处理函数返回后再继续执行主控制流程。信号处理函数是一个单独的控制流程，因为它
和主控制流程是**异步**的，二者不存在调用和被调用的关系，并且使用不同的堆栈空间。引入了
信号处理函数使得一个进程具有多个控制流程，如果这些控制流程访问相同的全局资源（全局
变量、硬件资源等），就有可能出现冲突，**根本原因是被打断的操作不是原子操作**。
比如func1函数被不同的控制流程调用，有可能在第一次调用还没返回时就再次进入
该函数，这称为重入， func1函数访问一个全局链表，有可能因为重入而造成错乱，像这样的
函数称为不可重入函数。
### sig_atomic_t类型与volatile限定符
如果在程序中需要使
用一个变量，要保证对它的读写都是原子操作，应该采用什么类型呢？为了解决这些平台相关
的问题，C标准定义了一个类型 sig_atomic_t ，在不同平台的C语言库中取不同的类型，例如
在32位机上定义 sig_atomic_t 为 int 类型。
对于程序中存在多个执行流程访问同一全局变量的情况， volatile 限定符是必要的.
sig_atomic_t 类型的变量应该总是加上 volatile 限定符，因为要使用 sig_atomic_t 类型的理由也
正是要加 volatile 限定符的理由
### 竞态条件与sigsuspend函数
```
#include <signal.h>
int sigsuspend(const sigset_t *sigmask);
```
调用 sigsuspend 时，进程的信号屏蔽字由 sigmask 参数指定，可以通过指定 sigmask 来临时解除对
某个信号的屏蔽，然后挂起等待，当 sigsuspend 返回时，进程的信号屏蔽字恢复为原来的值，
如果原来对该信号是屏蔽的，从 sigsuspend 返回后仍然是屏蔽的。
若仅用pause()的话，可能已经先收到信号了但是进程还没有调度到pause()函数呢
sigsuspend 包含了 pause 的挂起等待功能，同时解决了竞态条件的问题，在对时序要求严格
的场合下都应该调用 sigsuspend 而不是 pause 。


## 关于SIGCHLD信号
进程一章讲过用 wait 和 waitpid 函数清理僵尸进程，父进程可以阻塞等待子进程结束，也可以非
阻塞地查询是否有子进程结束等待清理（也就是轮询的方式）。采用第一种方式，父进程阻塞
了就不能处理自己的工作了；采用第二种方式，父进程在处理自己的工作的同时还要记得时不
时地轮询一下，程序实现复杂。
其实，子进程在终止时会给父进程发 SIGCHLD 信号，该信号的默认处理动作是忽略，父进程可以
自定义 SIGCHLD 信号的处理函数，这样父进程只需专心处理自己的工作，不必关心子进程了，子
进程终止时会通知父进程，父进程在信号处理函数中调用 wait 清理子进程即可。



