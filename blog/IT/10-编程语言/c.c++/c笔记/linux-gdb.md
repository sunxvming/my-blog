## gdb
GDB 不仅是一个调试工具，它也是一个学习源码的好工具。用它开跟踪代码的分支和数据的流向，这样走上几个来回之后，再结合源码，就能够对程序的整体情况“了然于胸”。


gdb 程序名 [corefile]   corefile是可选的，但能增强gdb的调试能力。
Linux默认是不生成corefile的，所以需要在.bashrc文件中添加(开发期间设置打开就行)
ulimit -c unlimited
(修改完.bashrc文件后记得. .bashrc让修改生效)


### 常用命令
```
help  h     按模块列出命令类 
help xx     查看某命令的使用
gdb -p pid  attach指定pid的程序,  detach用于detach进程
run  r      运行程序， 它的后面可以加上**程序的参数**，程序运行完重新执行的时候也用这个
dir  sourcePath，若调试的程序没有源码或源码的位置有移动，需要再次指定源码路径


【查看】
list  显示附近的10行代码
print 变量，表达式。
    print 'file'::变量，表达式,''是必须的，以便让gdb知道指的是一个文件名。
    print funcname::变量，表达式
whatis 命令可以告诉你变量的类型
ptype pt 查看变量的真实类型，不受 typedef 的影响
info xx   查看xx的信息


watch a        观察a的值，当有变化时，停止，其实一个watch就是一个特殊的断点（数据断点）
i watch   info watch       显示观察点
delete num     删除一个watch

display  变量名，      用于监视变量值，每次gdb中断都会打印相应的值，不用老用print打印了。
undisplay      取消观察变量
i display      查看display的值

【打印类相关】
p *this: 打印出当前类里所有的成员的值
p this->member: 打印出当前类里的某个成员的值
ptype this: 打印出当前类里所有的成员（原型）
whatis this: 打印出当前类的类型
set print element 0, 当字符串太长导致打印不全时用这个打破限制

【stack】
bt backtrace|where|info stack   打印出错的函数调用栈
up/down：在函数调用栈里上下移动。
frame f x    切换到第几个函数帧
info frame

【断点】
break b命令设置断点
    break linenum
    break funcname
    break filename:linenum
    break filename:funcname
break...if...  条件断点
info break(i b) 查看断点
condition 断点编号 条件，给普通断点加命中的条件
enable breakpoints  启用断点
disable breakpoints  禁用断点
delete 删除一个断点，若没有参数删除所有，若加断点序号删除指定的
tbreak   临时断点，只生效一次

【控制命令】
start     单步执行，运行程序，停在第一行执行语句
continue  c 命令从断点以后继续执行，直到运行到下一个断点。
step      相当于step into
next      相当于step over
finish fin   结束当前函数，返回到函数调用点
return [value] 停止执行当前函数，将value返回给调用者，相当于step return
quit或者Ctrl+d    退出
until  行号， 使程序运行到指定的行
jump  行号，使程序直接跳到指定的行，其行为是不可控的，因为其破坏了程序本来的执行流

【修改命令】
set variable varname = value 改变一个变量的值
p 也可以进行变量的修改，比如 p server.port = 1001


【多线程】
info threads
thread 线程编号， 切换到指定线程
set scheduler-locking on/step/off
on 可以锁定当前线程，使其他线程暂停，达到只执行当前线程的效果
step  只有再进行单步调试时才锁定当前线程，执行其他的命令其他线程依然有机会执行
off  关闭线程锁定


【多进程】
show follow-fork mode  查看fork的mode
set follow-fork parent/child   fork时进父进程还是子进程



【TUI模式】
`-tui` 选项进入TUI模式
layout src|asm|regs
`Ctrl+X+A`组合键可以在TUI模式和非TUI模式切换
在tui模式下，上下键是用来控制src窗口的，可以通过ctrl+N  ctrl+P来显示上一条或下一条命令


【cgdb】
gdb的升级版，在gdb上做了一层包装，调试看源码更方便


【visualGDB】
visual studio的插件，可以通过ssh连接到远程机器进行远程调试，并且还可以使用图形化的界面


【其他】
enter  重复执行上条命令
winheight wh     Set or modify the height of a specified window
handle SIGINT nostop print pass
    ctrl + c信号会让gdb中断，若想要将信号传递给被调试程序，则可用上面的命令设置
使用break functionname未能中断时，换成文件+行号的再试

```
【程序运行参数】
set args 可指定运行时参数。（如：set args 10 20 30 40 50）
show args 命令可以查看设置好的运行参数。



### 远程调试
```
gdbserver 192.168.1.21:6666 a.out
(gdb) target remote 192.168.1.23:6666
```


