Libevent、libev、libuv三个网络库，都是c语言实现的异步事件库


* libevent
名气最大，应用最广泛，历史悠久的跨平台事件库；
* libev
较libevent而言，设计更简练，性能更好，但对Windows支持不够好；

* libuv
开发node的过程中需要一个跨平台的事件库，他们首选了libev，但又要支持Windows，故重新封装了一套，linux下用libev实现，Windows下用IOCP实现；


## Libuv 基础
Libuv是一个高性能的，事件驱动的异步I/O库，它本身是由C语言编写的，具有很高的可移植性。libuv封装了不同平台底层对于异步IO模型的实现，所以它还本身具备着Windows, Linux都可使用的跨平台能力。

### 事件循环(Event loops)
事件驱动编程模型的伪代码如下:


```
while there are still events to process:
    e = get the next event
    if there is a callback associated with e:
        call the callback
```


适用于事件驱动编程模型的例子如下:
* 文件已经准备好可写入数据.
* 某一 socket 上存在数据可读.
* 定时器已超时.


计算机程序最基本的活动是输入输出的处理, 而不是大量的数值计算, 而使用传统输入输出函数(read, fprintf 等)的问题是它们都是 **阻塞** 的. 将数据写入磁盘或者从网络读取数据都会消耗大量时间, 而阻塞函数直到任务完成后才返回, 在此期间你的程序什么也没有做, 浪费了大量的 CPU 时间. 对于追求高性能的程序而言, 在其他活动或者 I/O 操作在进行尽量让 CPU 不被阻塞.


标准的解决方案是使用线程, 每个阻塞的 I/O 操作都在一个单独的线程(或线程池)中启动, 当阻塞函数被调用时, 处理器可以调度另外一个真正需要 CPU 的线程来执行任务.


Libuv 采用另外一种方式处理阻塞任务, 即 **异步** 和 **非阻塞** 方式.大多数现代操作系统都提供了事件通知功能, 例如, 调用 read 读取网络套接字时程序会阻塞, 直到发送者最终发送了数据(read 才返回). 但是, 应用程序可以要求操作系统监控套接字, 并在套接字上注册事件通知. 应用程序可以在适当的时候查看它所监视的事件并获取数据(若有). 整个过程是 **异步** 的, 因为程序在某一时刻关注了它感兴趣的事件, 并在另一个时刻获取(使用)数据, 这也是 **非阻塞** 的, 因为该进程还可以处理另外的任务. Libuv 的事件循环方式很好地与该模型匹配, 因为操作系统事件可以视为另外一种 libuv 事件. 非阻塞方式可以保证在其他事件到来时被尽快处理


## 监视器(Watchers)
libuv 通过监视器(Watcher)来对特定事件进行监控, 监视器通常是类似 uv_TYPE_t 结构体的封装, TYPE 代表该监视器的用途, libuv 所有的监视器类型如下:

```
typedef struct uv_loop_s uv_loop_t;typedef struct uv_err_s uv_err_t;typedef struct uv_handle_s uv_handle_t;typedef struct uv_stream_s uv_stream_t;typedef struct uv_tcp_s uv_tcp_t;typedef struct uv_udp_s uv_udp_t;typedef struct uv_pipe_s uv_pipe_t;typedef struct uv_tty_s uv_tty_t;typedef struct uv_poll_s uv_poll_t;typedef struct uv_timer_s uv_timer_t;typedef struct uv_prepare_s uv_prepare_t;typedef struct uv_check_s uv_check_t;typedef struct uv_idle_s uv_idle_t;typedef struct uv_async_s uv_async_t;typedef struct uv_process_s uv_process_t;typedef struct uv_fs_event_s uv_fs_event_t;typedef struct uv_fs_poll_s uv_fs_poll_t;typedef struct uv_signal_s uv_signal_t;
```

所有监视器的结构都是 uv_handle_t 的”子类”， 在 libuv 和本文中都称之为句柄( **handlers** ).

监视器由相应类型的初始化函数设置, 如下:

```
uv_TYPE_init(uv_TYPE_t*)
```

某些监视器初始化函数的第一个参数为事件循环的句柄.

监视器再通过调用如下类型的函数来设置事件回调函数并监听相应事件:

```
uv_TYPE_start(uv_TYPE_t*, callback)
```

而停止监听应调用如下类型的函数:

```
uv_TYPE_stop(uv_TYPE_t*)
```

当 libuv 所监听事件发生后, 回调函数就会被调用. 应用程序特定的逻辑通常都是在回调函数中实现的, 例如, 定时器回调函数在发生超时事件后也会被调用, 另外回调函被调用时传入的相关参数都与特定类型的事件有关, 例如, IO 监视器的回调函数在发生了IO事件后将会收到从文件读取的数据.



## 参考链接
- [libuv 中文编程指南(零)前言](https://www.cnblogs.com/haippy/archive/2013/03/17/2963995.html)