进程是一个正在执行的程序实例，他也是Linux基本的调度单位
## 进程控制块（PCB）
每个进程在内核中都有一个进程控制块（PCB）来维护进程相关的信息，Linux内核
的进程控制块是 task_struct 结构体。
* 进程id。
* 进程的状态，有运行、挂起、停止、僵尸等状态。
* 文件描述符表，包含很多指向 file 结构体的指针。
* 当前工作目录（Current Working Directory）。
* 用户id和组id。
* 信号相关的信息--信号捕捉函数
* 进程切换时需要保存和恢复的一些CPU寄存器。
* 描述虚拟地址空间的信息。
* 描述控制终端的信息。
* umask 掩码--umask命令与文件和目录的默认访问权限有关
* 控制终端、Session和进程组。
* 进程可以使用的资源上限（Resource Limit）。

子进程的PCB是根据父进程复制而来的，只是进程id不一样
### linux下的进程：
系统中同时运行着很多进程，这些进程都是从最初只有一个进程开始一个一个fork出来的。
在Shell下输入命令可以运行一个程序，是因为Shell进程在读取用户输入的命令之后会
调用 fork 复制出一个新的Shell进程(因为当前执行的进程是shell进程)，然后新的Shell进程调用 exec 执行新的程序。
比如：在Shell提示符下输入命令 ls ，首先 fork 创建子进程，这时子进程仍在执行 /bin/bash 程序，然后子进程调用 exec 执行新的程序 `/bin/ls`
## 环境变量
libc 中定义的全局变量 environ 指向环境变量表， environ 没有包含在任何头文件中，所以在使用
时要用 extern 声明。例如：
```
#include <stdio.h>
int main(void)
{
    extern char **environ;
    for(int i=0; environ[i]!=NULL; i++)
        printf("%s\n", environ[i]);
    return 0;
}
```
用 environ 指针可以查看所有环境变量字符串，但是不够方便，如果给出 name 要在环境变量表中
查找它对应的 value ，可以用 getenv 函数。
```
#include <stdlib.h>
char *getenv(const char *name);
```
修改环境变量可以用以下函数
```
#include <stdlib.h>
int setenv(const char *name, const char *value, int rewrite);
void unsetenv(const char *name);
```
## 进程控制
### fork函数、getpid、getppid
```
#include <sys/types.h>
#include <unistd.h>
pid_t fork(void);
```
返回值：-1出错，大于0父进程，0子进程
fork 在子进程中返回0，子进程仍可以调用 getpid 函数得到
自己的进程id，也可以调用 getppid() 函数得到父进程的id。在父进程中用 getpid 可以得到自己的
进程id，然而要想得到子进程的id，只有将 fork 的返回值记录下来，别无它法。
fork 函数的特点概括起来就是“调用一次，返回两次”，在父进程中调用一次，在父进程和子进程中各返回一次。
fork 的另一个特性是所有由父进程打开的描述符都被复制到子进程中。父、子进程中相同编号
的文件描述符在内核中指向同一个 file 结构体，也就是说， file 结构体的引用计数要增加。


用 gdb 调试多进程的程序会遇到困难， gdb 只能跟踪一个进程（默认是跟踪父进程），而不能同
时跟踪多个进程，但可以设置 gdb 在 fork 之后跟踪父进程还是子进程。
`set follow-fork-mode child` 命令设置 gdb 在 fork 之后跟踪子进程


为什么要知道一个进程的PID以及它父进程的PID呢？。
* PID常见的用法之一就是创建唯一的文件或目录名。
* 另一种的用途是把PID写入日志文件做为日志消息的一部分。


getlogin函数返回执行程序的用户登录名。
可以把登录名作为参数传递给getpwnam函数，这个函数能返回/etc/passwd文件中与该登录名相应的一行完整信息。
```
#include <pwd.h>
struct passwd *getpwnam(const char *name);
```


### system系统调用
```
#include <stdlib.h>
int system(const char *string);        //是fork和exec的结合
```
`system（）`会调用`fork（）`产生子进程，由子进程来调用`/bin/sh -c string`来执行参数string字符串所代表的命令，此命令执行完后随即返回原调用的进程



### exec函数
用 fork 创建子进程后执行的是和父进程相同的程序（但有可能执行不同的代码分支），子进程
往往要调用一种 exec 函数以执行另一个程序。当进程调用一种 exec 函数时，该进程的**用户空间
代码和数据完全被新程序替换**，从新程序的**启动例程**开始执行。调用 exec 并不创建新进程，所
以调用 exec 前后该进程的id并未改变。
其实有六种以 exec 开头的函数，统称 exec 函数：
```
#include <unistd.h>
int execl(const char *path, const char *arg, ...);
int execlp(const char *file, const char *arg, ...);
int execle(const char *path, const char *arg, ..., char *const envp[]);
int execv(const char *path, char *const argv[]);
int execvp(const char *file, char *const argv[]);
int execve(const char *path, char *const argv[], char *const envp[]);
```
这些函数如果调用成功则加载新的程序从启动代码开始执行，不再返回，如果调用出错则返回-1，所以 exec 函数**只有出错的返回值**而没有成功的返回值
函数字母的含义：
不带字母**p(path)**的 exec 函数第一个参数必须是程序的相对路径或绝对路径，例如 "/bin/ls" 或 "./a.out" ，而不能是 "ls" 或 "a.out" 。对于带字母p的函数：如果参数中包含/，则将其视为路径名。
否则视为不带路径的程序名，在 PATH 环境变量的目录列表中搜索这个程序。
带有字母**l(list)**的 exec 函数要求将新程序的每个命令行参数都当作一个参数传给它，命令
行参数的个数是可变的，因此函数原型中有 ... ， ... 中的最后一个可变参数应该是 NULL ，
起sentinel的作用。
对于带有字母**v(vector)**的函数，则应该先构造一个指向各参数的指针
数组，然后将该数组的首地址当作参数传给它，数组中的最后一个指针也应该是 NULL ，就像 main 函数的 argv 参数或者环境变量表一样。
对于以**e(environment)**结尾的 exec 函数，可以把一份新的环境变量表传给它，其他 exec 函数仍使用当前的环境变量表执行新程序。
一个完整的例子：
```
#include <unistd.h>
#include <stdlib.h>
int main(void)
{
    execlp("ps", "ps", "-o","pid,ppid,pgrp,session,tpgid,comm", NULL);
    perror("exec ps");
    exit(1);
}
```
注意在调用 execlp 时传了两个 "ps" 参数，第一个 "ps" 是程序名， execlp 函数要在 PATH 环境变量中找到这个程序并执行它，而第二个 "ps" 是第一个命令行参数， execlp 函数并不关心它的值，
只是简单地把它传给 ps 程序， ps 程序可以通过 main 函数的 argv[0] 取到这个参数。


### 僵尸进程、孤儿进程、init进程、wait和waitpid函数
一个进程在终止时会关闭所有文件描述符，释放在用户空间分配的内存，但它的`PCB`还保留着，内核在其中保存了一些信息：如果是正常终止则保存着退出状态，如果是异常终止则保存着导致该进程终止的信号是哪个。


这个进程的父进程可以调用 wait 或 waitpid 获取这些信息，然后**彻底清除掉这个进程**。我们知道一个进程的退出状态可以在Shell中用特殊变量 `$?` 查看，因为**Shell是它的父进程**，当它终止时Shell调用 `wait` 或 `waitpid` 得到它的退出状态同时彻底清除掉这个进程。

当子进程退出时,它向父进程发送一个`SIGCHLD`信号,默认情况下总是忽略SIGCHLD信号,如果它的父进程尚未调用 `wait` 或 `waitpid` 对它进行清理，这时的进程状态称**为僵尸（Zombie）进程**。**任何进程在刚终止时都是僵尸进程**，正常情况下，僵尸进程都立刻被父进程清理了.

如果一个父进程终止，而它的子进程还存在（这些子进程或者仍在运行，或者已经是僵尸进程了），他们就成为**孤儿进程**，这些子进程的父进程改为 `init` 进程。 init 是系统中的一个特殊进程，通常程序文件是 `/sbin/init` ，进程id是1，在系统启动时负责启动各种系统服务，之后就负责清理子进程，只要有子进程终止， init 就会调用 `wait` 函数清理它。

wait 和 waitpid 函数的原型是：
```
#include <sys/types.h>
#include <sys/wait.h>
pid_t wait(int *status);
pid_t waitpid(pid_t pid, int *status, int options);
```
若调用成功则返回清理掉的子进程id，若调用出错则返回-1。父进程调用 wait 或 waitpid 时可能会：
* 阻塞（如果它的所有子进程都还在运行）。
* 带子进程的终止信息立即返回（如果一个子进程已终止，正等待父进程读取其终止信息）。
* 出错立即返回（如果它没有任何子进程）。


**这两个函数的区别是**：
* 如果父进程的所有子进程都还在运行，调用 wait 将使父进程阻塞，而调用 waitpid 时如果在 options 参数中指定 WNOHANG 可以使父进程不阻塞而立即返回0。
* wait 等待第一个终止的子进程，而 waitpid 可以通过 pid 参数指定等待哪一个子进程。
可见，调用 wait 和 waitpid 不仅可以获得子进程的终止信息，还可以使父进程阻塞等待子进程终
止，**起到进程间同步的作用**。如果参数 status 不是空指针，则子进程的终止信息通过这个参数
传出，如果只是为了同步而不关心子进程的终止信息，可以将 status 参数指定为 NULL 。
通过WIFEXITED、WEXITSTATUS宏可以取出status中的信息


### 进程终止
* main函数调用了return；
* 调用了exit(int status)函数；返回给父进程的状态（status）
* 调用了_exit函数；
* 调用了abort(void)函数； 还可以让程序产生coredump
* 被一个信号终止。
* kill函数用来杀死另一个进程,向另一个进程发送SIGKILL信号

前三个原因都是正常终止，后面两个是非正常终止。

** exit()与_exit()区别**：
`_exit()`函数的作用最为简单：直接使进程停止运行，清除其使用的内存空间，并销毁其在内核中的各种数据结构；`exit()` 函数则在这些基础上作了一些包装

exit()函数与_exit()函数最大的区别就在于 exit()函数在调用exit系统调用之前要检查文件的打开情况，把文件缓冲区中的内容写回文件，就是”清理I/O缓冲“，无论进程为何终止，最后都执行相同的内核代码，关闭打开的文件，释放内存资源，和其他清理工作。


## 守护进程（daemon）
守护进程是一个后台进程，它无需用户输入就能运行，经常是提供某种服务

### 创建守护进程步骤
#### 1. 父进程中执行fork后，执行exit退出。
父进程在fork子进程退出后就消除了控制终端。
守护进程既不需要从标准输入设备读信息，也不需要从标准输出设备输出信息


#### 2. 在子进程中调用setsid。
取消进程和任何控制终端的关联。
setsid函数创建一个新会话和一个新进程组，然后守护进程成为新会话的会话leader，以及新进程组的进程组leader



#### 3. 让根目录`/`成为子进程的工作目录。
```
//chdir函数根据参数pathname设置当前工作
chdir(const char *pathname)
```
因为任何进程如果它的当前目录是在一个被安装的文件系统上，那么就会**妨碍这个文件系统被卸载**。




#### 4. 把子进程的umask变为0。
为了避免守护进程集成的umask受到创建文件和目录操作的干扰，这一步是必要的。
如果一个进程集成了父进程的umask 055，他屏蔽掉了group和other的读和执行权。如果守护进程接着创建了一个文件，那么对group和other用户操作这个文件会带来麻烦。
守护进程调用 umask 0避免了这种情况，当创建文件的时候给予守护进程更大的灵活性
`mode_t umask(mode_t mask); `


#### 5. 关闭任何不需要的文件描述符。
最后关闭子进程继承的任何不必要的文件描述符。
对于子进程来说，没有理由保持从父进程继承来的打开的文件描述符。


```
void setdaemon()
{
 pid_t pid, sid;
 pid = fork();
 if (pid < 0)
 {
  printf("fork failed %s\n", strerror(errno));
  exit(EXIT_FAILURE);
 }
 if (pid > 0)
 {
  exit(EXIT_SUCCESS);
 }


 if ((sid = setsid()) < 0)
 {
  printf("setsid failed %s\n", strerror(errno));
  exit(EXIT_FAILURE);
 }
    if((chdir("/")) < 0)
    {
        printf("chdir failed\n");
        exit(EXIT_FAILURE);
    }
    umask(0);
    //close(STDIN_FILENO);//if close stdin,then daemon_console failed
    close(STDOUT_FILENO);
    close(STDERR_FILENO);    
}
```
### 如何确保只启动一个守护进程的实例
```
#!/bin/sh
WHOAMI=`whoami`
PID=`ps -u $WHOAMI | grep abc | awk '{print $1}'`
if (test "$PID" = "") then
    ./abc
fi
```
### 通过shell脚本结束守护进程
```
#!/bin/sh
WHOAMI=`whoami`   这个用户下的进程都列出来
PID=`ps -u $WHOAMI | grep abc | awk '{print $1}'`
if (test "$PID" != "") then
      kill $PID
fi
```


### 守护进程记录日志
一旦系统调用setsid,它就不再有控制终端。
可以通过`syslog`提供服务，记录守护进程的各种输出信息
```
// openlog函数打开日志,syslog写入日志,closelog关闭日志。
#include <syslog.h>
void openlog(const char *ident, int option, int facility);
void syslog(int priority, const char *format, ...);
void closelog(void);
```
linux系统上日志文件通常是/var/log/messages

### 使用信号与守护进程通信
要和一个守护进程通信，你要向它发送信号，让它以某种方式响应。
例如：强行要求一个守护进程重新读取它的配置文件，或者改变守护进程的行为，或者指示守护进程结束运行


#### 1. 守护进程中添加信号捕捉函数

```
void catch_Signal(int Sign)
{
    switch(Sign)
    {
    case SIGTERM:
        exit(EXIT_SUCCESS);
    }
}
```

## 进程间通信
每个进程各自有不同的用户地址空间，任何一个进程的全局变量在另一个进程中都看不到，所
以进程之间要交换数据**必须通过内核**，在内核中开辟一块缓冲区，进程1把数据从用户空间拷到
内核缓冲区，进程2再从内核缓冲区把数据读走，**内核提供的这种机制**称为进程间通信（IPC，InterProcess Communication）
### 1.管道(pipe)
管道是一种最基本的IPC机制，由 pipe 函数创建：
```
#include <unistd.h>
int pipe(int filedes[2]);
```
调用 pipe 函数时在内核中开辟一块缓冲区（称为管道）用于通信，它有一个读端一个写端，然
后通过 filedes 参数传出给用户程序两个文件描述符， filedes[0] 指向管道的读
端， filedes[1] 指向管道的写端（很好记，就像0是标准输入1是标准输出一样）
所以管道在用户程序看起来就像一个打开的文件，通过 read(filedes[0]); 或者 write(filedes[1]); 向这个
文件读写数据其实是在读写内核缓冲区。 pipe 函数调用成功返回0，调用失败返回-1。

#### 管道通信步骤：
1. 父进程调用 pipe 开辟管道，得到两个文件描述符指向管道的两端。
2. 父进程调用 fork 创建子进程，那么子进程也有两个文件描述符指向同一管道。
3. 父进程关闭管道读端，子进程关闭管道写端。父进程可以往管道里写，子进程可以从管道
里读，管道是用**环形队列**实现的，数据从写端流入从读端流出，这样就实现了进程间通信。

#### 管道的限制：
1. 管道是半双工的，只能实现单向通信，如果想实现双向通信必须另开一个管道
2. 管道的读写端通过打开的文件描述符来传递，因此要通信的两个进程必须从它们的**公共祖先那里继承管道文件描述符**。

#### 读写管道的4种特殊情况:
假设都是阻塞I/O操作，没有设置 O_NONBLOCK 标志
1. 写端都关闭了，依然读，管道中的数据读完后，再次read返回0
2. 写端没关闭，依然读，管道中的数据读完后，再次 read 会阻塞
3. 读端都关闭了，依然写，那么该进程会收到信号 SIGPIPE ，通常会导致进程异常终止
4. 读端没关闭，依然写，管道中的数据写完后，再次 write 会阻塞

#### 四种I/O事件
为了了解阻塞是如何进行的，我们来讨论缓冲区，以及内核缓冲区，最终把I/O事件解释清楚。缓冲区的引入是为了减少频繁I/O操作而引起频繁的系统调用，当你操作一个流时，更多的是以缓冲区为单位进行操作，这是相对于用户空间而言。对于内核来说，也需要缓冲区。
假设有一个管道，进程A为管道的写入方，Ｂ为管道的读出方。
假设一开始内核缓冲区是空的，B作为读出方，被阻塞着。然后首先A往管道写入，这时候内核缓冲区由空的状态变到非空状态，内核就会产生一个事件告诉Ｂ该醒来了，这个事件姑且称之为**“缓冲区非空”**。
但是“缓冲区非空”事件通知B后，B却还没有读出数据；且内核许诺了不能把写入管道中的数据丢掉，这个时候，Ａ写入的数据会滞留在内核缓冲区中，如果内核也缓冲区满了，B仍未开始读数据，最终内核缓冲区会被填满，这个时候会产生一个I/O事件，告诉进程A，你该等等（阻塞）了，我们把这个事件定义为**“缓冲区满”**。
假设后来Ｂ终于开始读数据了，于是内核的缓冲区空了出来，这时候内核会告诉A，内核缓冲区有空位了，你可以从长眠中醒来了，继续写数据了，我们把这个事件叫做**“缓冲区非满”**
也许事件已经通知了A，但是A也没有数据写入了，而Ｂ继续读出数据，直到内核缓冲区空了。这个时候内核就告诉B，你需要阻塞了！，我们把这个时间定为**“缓冲区空”**。
这四个情形涵盖了四个I/O事件，缓冲区满，缓冲区空，缓冲区非空，缓冲区非满。这四个I/O事件是进行**阻塞同步**的根本。
管道的这四种特殊情况具有普遍意义，socket也具有管道的这些特性


### 2.FIFO
进程间通信必须通过内核提供的通道，而且必须有一种办法在进程中标识内核提供的某个通
道，pipe是用打开的**文件描述符来标识的**。内核提供一条通道不成问题，问题是如何标识这
条通道才能使各进程都可以访问它？文件系统中的路径名是全局的，各进程都可以访问，因此
可以用文件系统中的路径名来标识一个IPC通道。
FIFO和Unix Domain Socket这两种IPC机制都是利用文件系统中的特殊文件来标识的。
用 mkfifo 命令创建一个FIFO文件：
```
$ mkfifo hello
$ ls -l hello
prw-r--r-- 1 djkings djkings 0 2008-10-30 10:44 hello
```
FIFO文件在磁盘上没有数据块，仅用来标识内核中的一条通道，各进程可以打开这个文件进
行 read / write ，实际上是在读写内核通道（根本原因在于这个 file 结构体所指向的函数和常规文件不一样）
创建fifo。
```
int mkfifo(const char *pathname, mode_t mode)  //其中mode设置权限
```
删除fifo。
```
int unlink(const char *pathname);
```
Linux的一切都是文件这一抽象概念的优势，打开和关闭FIFO和打开关闭一个普通文件操作是一样的(open close)。
**FIFO的两端使用前都必须要打开**。
open中如果参数flags为O_RDONLY将阻塞open调用，一直到另一个进程为写入数据打开FIFO为止。相同的，O_WRONLY也导致阻塞一直到为读出数据打开FIFO为止。
例子：
```
int main(int arg, char * args[])
{
    int len = 0;
    char buf[100];
    memset(buf, 0, sizeof(buf));
    int fd = open("fifo1", O_RDONLY);
    while ((len = read(fd, buf, sizeof(buf))) > 0)
    {
        printf("%s\n", buf);
    }
    close(fd);
    return 0;
}
```
```
int main(int arg, char * args[])
{
    int len = 0;
    char buf[100];
    memset(buf, 0, sizeof(buf));
    int fd = open("fifo1", O_WRONLY);
    while(1)
    {
        scanf("%s", buf);
        if (buf[0] == '0')
            break;
        write(fd, buf, sizeof(buf));
    }
    close(fd);
    return 0;
}
```
### 3.共享内存
共享内存是由内核出于在多个进程间交换信息的目的而留出的一块**内存区（段）**。
如果段的权限设置恰当，每个要访问该段内存的进程都可以把它映像到自己的私有地址空间中。
如果一个进程更新了段中的数据，其他进程也立即会看到更新。
由一个进程创建的段，也可以由另一个进程读写。
每个进程都把它自己对共享内存的映像放入自己的地址空间。
```
#include <sys/ipc.h>
#include <sys/shm.h>
int shmget(key_t key, size_t size, int shm-flg);
```

#### 创建共享内存区
```
int main(int arg, char * args[])
{
    int shmid = shmget(IPC_PRIVATE, 1024, 0666);
    if (shmid < 0)
        printf("error\n");
    else
        printf("success\n");
    return 0;
}
```
在命令行执行`ipcs –m` 显示，已经成功的创建了一块共享内存区。
`nattch`字段显示已经附加到这个内存区的进程数。

#### 附加共享内存区
```
void  *shmat(int  shmid, const void *shmaddr,int shmflg);
int shmdt(const void *shmaddr);
```
参数shmid是要附加的共享内存区标示符。
总是把参数shmaddr设为0。
参数shmflg可以为SHM_RDONLY，这意味着附加段是只读的。
shmat成功返回被附加了段的地址，失败返回-1，并设置errno。
函数shmdt是将附加在shmaddr的段从调用进程的地址空间分离出去，这个地址必须是shmat返回的。
例子：
```
int main(int arg, char * args[])
{
    char *shmbuf;
    int shmid = 0;
    if (arg > 2)
    {
        shmid = atoi(args[1]);
        shmbuf = shmat(shmid, 0, 0);
        if (atoi(args[2]) == 1) //write shared mem
        {
            scanf("%s\n", shmbuf);shmbuf内存首地址
        }
        if (atoi(args[2]) == 2) //read shared mem
        {
            printf("%s\n", shmbuf);
        }
        shmdt(shmbuf);
    }
    return 0;
}
```




### 4.Unix Domain Socket
Socket和FIFO的原理类似，也需要一个特殊的socket文件来标识内核中的通道，例
如 /var/run 目录下有很多系统服务的socket文件：
```
$ ls -l /var/run/
total 52
srw-rw-rw- 1 root root 0 2008-10-30 00:24
acpid.socket
......
srw-rw-rw- 1 root root 0 2008-10-30 00:25
gdm_socket
......
srw-rw-rw- 1 root root 0 2008-10-30 00:24 sdp
......
srwxr-xr-x 1 root root 0 2008-10-30 00:42
synaptic.socket
```
进程之间传递信息的各种途径（包括各种IPC机制）总结如下：
* 父进程通过 fork 可以将打开文件的描述符传递给子进程
* 子进程结束时，父进程调用 wait 可以得到子进程的终止信息
* 几个进程可以在文件系统中读写某个共享文件，也可以通过给文件加锁来实现进程间同步
* 进程之间互发信号，一般使用 `SIGUSR1` 和 `SIGUSR2` 实现用户自定义功能
* 管道
* FIFO
* mmap函数，几个进程可以映射同一内存区
* UNIX Domain Socket，目前最广泛使用的IPC机制