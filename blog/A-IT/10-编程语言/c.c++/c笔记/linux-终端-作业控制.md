## 输入设备&终端
> 硬件驱动程序读取--->线路规程 --->输入队列---> 用户程序/输出队列

内核中处理终端设备的模块包括**硬件驱动程序**和**线路规程**（Line Discipline）
硬件驱动程序负责读写实际的硬件设备，比如从键盘读入字符和把字符输出到显示器
线路规程像一个过滤器，对于某些特殊字符并不是让它直接通过，而是做特殊处理，比如在键盘上按下`Ctrl-Z`，对应的字符并不会被用户程序的 read 读到，而是**被线路规程截获**，解释成 SIGTSTP 信号发给前台进程，通常会使该进程停止。线路规程应该过滤哪些字符和做哪些特殊处理是可以配置的。


### 终端设备的输入和输出队列缓冲区
以输入队列为例，从键盘输入的字符经线路规程过滤后进入**输入队列**，用户程序以先进先出的顺序从队列中读取字符，一般情况下，当输入队列满的时候再输入字符会丢失，同时系统会响铃警报。终端可以配置成**回显（Echo）模式**，在这种模式下，输入队列中的每个字符既送给用户程序也送给输出队列，因此我们在命令行键入字符时，该字符不仅可以被程序读取，我们也可以同时在屏幕上看到该字符的回显。

### 虚拟终端和网络终端
虚拟终端或串口终端的数目是有限的，虚拟终端一般就是 /dev/tty1 ~ /dev/tty6 六个，串口终端的数目也不超过串口的数目
网络终端或图形终端窗口的数目却是不受限制的，这是通过**伪终端**（Pseudo TTY）实现的。
一套伪终端由一个主设备（PTY Master）和一个从设备（PTY Slave）组成。主设备在概念上相当于键盘和显示器，只不过它不是真正的硬件而是一个内核模块，操作它的也不是用户而是另外一个进程。从设备和上面介绍的 /dev/tty1 这样的终端
设备模块类似，只不过它的底层驱动程序不是访问硬件而是访问主设备。伪终端的文件在 /dev/pts/0 、 /dev/pts/1 下面


### 网络登录过程
1.用户通过 telnet 客户端连接服务器。如果服务器配置为独立（Standalone）模式，则在服务器监听连接请求是一个 telnetd 进程，它 fork 出一个 telnetd 子进程来服务客户端，父进程仍监听其它连接请求。
另外一种可能是服务器端由系统服务程序 inetd 或 xinetd 监听连接请求， inetd 称为InternetSuper-Server，它监听系统中的多个网络服务端口，如果连接请求的端口号和 telnet 服务端口号一致，则 fork / exec 一个 telnetd 子进程来服务客户端。 
xinetd 是 inetd 的升级版本，配置更为灵活。
2.telnetd 子进程打开一个伪终端设备，然后再经过 fork 一分为二：父进程操作伪终端主设备，子进程将伪终端从设备作为它的控制终端，并且将文件描述符0、1、2指向控制终端，二者通过伪终端通信，父进程还负责和 telnet 客户端通信，而子进程负责用户的登录过程，提示输入帐号，然后调用 exec 变成 login 进程，提示输入密码，然后调用 exec 变成Shell进程。这个Shell进程认为自己的控制终端是伪终端从设备，**伪终端主设备可以看作键盘显示器等硬件**，而操作这个伪终端的“用户”就是父进程 telnetd 。
3.当用户输入命令时， telnet 客户端将用户输入的字符通过网络发给 telnetd 服务器，由 telnetd 服务器代表用户将这些字符输入伪终端。**Shell进程并不知道自己连接的是伪终端而不是真正的键盘显示器，也不知道操作终端的“用户”其实是 telnetd 服务器而不是真正的用户**。Shell仍然解释执行命令，**将标准输出和标准错误输出写到终端设备**，这些数据最终由 telnetd 服务器发回给 telnet 客户端，然后显示给用户看。


## 作业控制
进程---> 作业(进程组)---> session

### Session与进程组
Shell分前后台来控制的不是进程而是作业（Job）或者进程组（Process Group）。一个前台作业可以由多个进程组成，一个后台作业也可以由多个进程组成，Shell可以同时运行一个前台作业和任意多个后台作业，这称为作业控制（Job Control）。
例如用以下命令启动5个进程：
```c
$ proc1 | proc2 &
$ proc3 | proc4 | proc5
```
其中 proc1 和 proc2 属于同一个后台进程组， proc3 、 proc4 、 proc5 属于同一个前台进程组，Shell进程本身属于一个单独的进程组。这些进程组的控制终端相同，它们属于同一个**Session**。

### 登录和执行命令的过程(Session和进程组角度)
1.getty 或 telnetd 进程在打开终端设备之前调用 `setsid` 函数创建一个新的Session，该进程称为Session Leader，该进程的id也可以看作Session的id，然后该进程打开终端设备作为这个Session中所有进程的控制终端。在创建新Session的同时也创建了一个新的进程组，该进程是这个进程组的Process Group Leader，该进程的id也是进程组的id。
2.在登录过程中， getty 或 telnetd 进程变成 login ，然后变成Shell，但仍然是同一个进程，仍然是Session Leader。
3.由Shell进程 fork 出的子进程本来具有和Shell相同的Session、进程组和控制终端，但是Shell调用 `setpgid` 函数将作业中的某个子进程指定为一个**新进程组的Leader**，然后调用 setpgid将该作业中的其它子进程也转移到这个进程组中。如果这个进程组需要在前台运行，就调用 tcsetpgrp 函数将它设置为前台进程组，由于一个Session只能有一个前台进程组，所以Shell所在的进程组就自动变成后台进程组。

`jobs` 命令可以查看当前有哪些作业。
`fg` 命令可以将某个作业提至前台运行，如果该作业的进程组正在后台运行则提至前台运行
如果该作业处于停止状态，则给进程组的每个进程发 SIGCONT 信号使它继续运行。