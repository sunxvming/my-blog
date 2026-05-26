

[学习muduo库](https://github.com/zhaozhengcoder/muduo)

TCP网络编程最本质的是处理三个半事件：
1．连接的建立，包括服务端接受（accept）新连接和客户端成功发起（connect）连接。TCP连接一旦建立，客户端和服务端是平等的，可以各自收发数据。
2．连接的断开，包括主动断开（close、shutdown）和被动断开（read(2)返回0）。
3．消息到达，文件描述符可读。这是**最为重要的一个事件**，对它的处理方式决定了网络编程的风格（阻塞还是非阻塞，如何处理分包，应用层的缓冲如何设计，等等）。
3.5　消息发送完毕，这算半个。对于低流量的服务，可以不必关心这个事件；另外，这里的“发送完毕”是指**将数据写入操作系统的缓冲区**，将由TCP协议栈负责数据的发送与重传，不代表对方已经收到数据。


## 常见问题

- 如果主动发起连接，但是对方主动拒绝，如何定期（带back-off地）重试？
- 如果是水平触发，那么什么时候关注EPOLLOUT事件？会不会造成busy-loop？
- 如果是边沿触发，如何防止漏读造成的饥饿？
- 非阻塞网络编程中正确处理数据发送比接收数据要困难，因为要应对对方接收缓慢的情况。


1. 用户的回调是如何一步一步传到框架代码并被调用的


```cpp
conn->setConnectionCallback(connectionCallback_);        //用户传
conn->setMessageCallback(messageCallback_);              //用户传
conn->setWriteCompleteCallback(writeCompleteCallback_);  //用户传
conn->setCloseCallback(std::bind(&TcpServer::removeConnection, this, _1)); // FIXME: unsafe
```

### 为什么需要buffer
**int buffer**
- TCP是一个无边界的字节流协议，接收方必须要处理“收到的数据尚不构成一条完整的消息"

**output buffer**
- 发送数据时，一次发很多，发不完，不能阻塞，得根据滑动TCP窗口得等对端收了后再发
- 如果buffer里还有待发送的20kB数据，程序又写入了50kB，那么网络库不应该直接调用write()，而应该把这50kB数据append在那20kB数据之后
- 如果output buffer里还有待发送的数据，而程序又想关闭连接，得等数据发送完毕再关


**如何设计并使用缓冲区？**
Buffer的设计要点：
·对外表现为一块连续的内存(char* p, int len)，以方便客户代码的编写。
·其size()可以自动增长，以适应不同大小的消息。

**Buffer大小的设计？**
一方面我们希望减少系统调用，一次读的数据越多越划算。另一方面希望减少内存占用。如果有10000个并发连接，每个连接一建立就分配各50kB的读写缓冲区的话，将占用1GB内存。
在栈上准备一个65536字节的extrabuf，然后利用readv()来读取数据，iovec有两块，第一块指向muduo Buffer中的writable字节，另一块指向栈上的extrabuf。这样如果读入的数据不多，那么全部都读到Buffer中去了；如果长度超过Buffer的writable字节数，就会读到栈上的extrabuf里，然后程序再把extrabuf里的数据append()到Buffer中
这么做利用了临时栈上空间 14 ，避免每个连接的初始Buffer过大造成的内存浪费，也避免反复调用read()的系统开销


### 连接建立过程
一个连接的生命周期过程，如何被创建，如何被销毁？

### 连接断开过程
- 如果要主动关闭连接，如何保证先发送完缓冲区中的数据，保证对方已经收到全部数据？

- **本端**主动断开
	- 过程
		1. 把自己output buffer中的数据都发完
		2. 调用 `shutdown(sockfd, SHUT_WR)`, 关闭写端，但是还能读对方的数据
		3. 对端收到 `\0`后对端调用 `close()` 或 `shutdown()`
		4. 本端`TcpConnection::handleRead`收到 `\0`后, `handleClose()` ->`TcpServer::removeConnection()` -> 从 `TcpServer::connections_`移除此`TcpConnection` -> 移出 `channel_`监听的事件
		5. `TcpConnection`被移除后，生命周期结束，起成员`Socket` 在析构时调用`close()`
	- 目的：
		- muduo把“主动关闭连接”这件事情分成两步来做，如果要主动关闭连接，它会先关本地“写”端，等对方关闭之后，再关本地“读”端。这是解决如果对方已经发送了数据，这些数据还“在路上”，那么muduo不会漏收这些数据。
- **对端**主动断开
	- 执行主动断开的3、4、5步骤




### 对象的生命周期
对于使用muduo库而言，只需要掌握5个关键类：EventLoop、TcpServer、TcpClient 、TcpConnection、Buffer。
`TcpConnection` 的生命期依靠shared_ptr管理（即用户和库**共同控制**）。
`Buffer` 的生命期由 `TcpConnection` 控制。
其余类的生命期由**用户控制**。

Buffer和InetAddress具有值语义，可以拷贝；其他class都是对象语义，不可以拷贝


### TCP分包，解码器
常见分包方法；
1．消息长度固定，比如muduo的roundtrip示例就采用了固定的16字节消息。
2．使用特殊的字符或字符串作为消息的边界，例如HTTP协议的headers以“`\r\n`”为字段的分隔符。
3．在每条消息的头部加一个长度字段。
4．利用消息本身的格式来分包，例如XML格式的消息中`<root>...</root>`的配对，或者JSON格式中的`{ ... }`的配对。解析这种消息格式通常会用到状态机（state machine）。


以第三种方式为例:
增加一个 `LengthHeaderCodec` 的**中间层**来进行编码解码，真正的逻辑通过设置回调函数设置到 `LengthHeaderCodec` 中。
- 当消息来时：
	1. `TcpServer` 的 `setMessageCallback` 设置成 `LengthHeaderCodec` 的 `onMessage`， 业务逻辑的 `onMessage`回调设置到 `LengthHeaderCodec` 中
	2. 先回调 `LengthHeaderCodec` 的 `onMessage`， 再调用业务逻辑的 `onMessage`
- 当发消息时：先调用 `LengthHeaderCodec` 的 `send` ， 封好包之后再调用网络的 `send`

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240829163208.png)

### 消息分发器（dispatcher）

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240829163232.png)


![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240829163754.png)

### 子线程启动eventLoop，主线程send
例子代码：example/asio/chat/client.cc
比如：客户端的例子。它要读取键盘输入，而EventLoop是独占线程的，所以需要两个线程：main()函数所在的线程负责读键盘，另外用一个EventLoopThread来处理网络IO。

1. 当`onConnection`回调时，把 `TcpConnectionPtr` 保存起来
2. 当有键盘输入时，在主线程调用 `TcpConnectionPtr` 进行消息的发送 `conn->send(&buf);`
3. 调用 `loop_->runInLoop( )`， 把可调用对象插入到 `eventLoop` 的 `pendingFunctors_` 中
4. 在loop循环的最后调用可调用对象进行真正的发送逻辑






![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240808152253.png)



## base模块


- **ClassName**
	- 作用：简短说明作用
	- 成员:
		- `member1`
		- `member2`
	- 方法：
		- `method1()`
	- 备注:
		- 备注说明1

### 通用
- **StringPiece**
	- 作用：Google发明的专门用于传递字符串参数的class，这样程序里就不必为`const char*`和`const std::string&`提供两份重载了
	- 成员:
		- `const char*   ptr_;`
		- `int        length_;`
	- 方法：
		- 主要是不同的构造函数

### 线程

- **CurrentThread**
	- 作用：当前线程的信息，这个不是类，是一个**命名空间**
	- 成员
	- 方法：
		- `tid()`  返回线程id
		- `name()` 返回线程名字
		- `isMainThread()`    实现`return tid() == ::getpid();`
	
- **MutexLock**
	- 作用：对互斥锁的封装
	- 成员：
		- `pthread_mutex_t mutex_;` 
		- `pid_t holder_;` 持有当前锁的线程的id，通过`CurrentThread::tid();`来获得
	- 方法：
		- `lock()` 调用`pthread_mutex_lock()`
		- `unlock()` 调用`pthread_mutex_unlock()`
		- 构造：调用`pthread_mutex_init()`
		- 析构：调用`pthread_mutex_destroy()`

- **MutexLockGuard**
	- 作用：互斥锁的RAII类
	- 成员：
		- `MutexLock& mutex_;`   
	- 方法：
		- 构造：调用`MutexLock` 的 `lock()`
		- 析构：调用`MutexLock` 的 `unlock()`

- **Condition**
	- 作用：对条件变量的封装
	- 成员：
		- `MutexLock& mutex_;`  锁
		-  `pthread_cond_t pcond_;` 条件变量
	- 方法：
		- `wait()` 调用`pthread_cond_wait()`
		- `notify()` 调用`pthread_cond_signal()`
		- `notifyAll()` 调用`pthread_cond_broadcast()`
		- 构造：调用`pthread_cond_init` 
		- 析构：调用`pthread_cond_destroy` 

- **CountDownLatch**
	- 作用：把
	- 成员：
		- `MutexLock mutex_;`  
		- `Condition condition_ `
		- `int count_`
	- 方法：
		- `wait()`  当`count_ > 0`时，调用`wait()`等待
		- `countDown()`  `count_--`, 若`count_ == 0`, 则调用`notifyAll()`

- **ThreadData**
	- 作用：把线程执行的逻辑封装在这个里面，即把`std::function`封装到里面
	- 成员：
		- `std::function<void ()> func_;`  执行的函数体
		- `string name_;` 
		- `CountDownLatch* latch_;`
	- 方法：
		- `runInThread()`   执行`func_`并处理相关异常
	- 注意：
		- ThreadData对象是在**堆内存**上创建的，其指针会传给`pthread_create`, 从而传到子线程中

- **Thread**
	- 作用：线程封装类
	- 成员：
		- `pthread_t  pthreadId_;`  线程id
		- `CountDownLatch latch_;`  作用是真正创建并执行了线程函数后通知主线程创建成功
	- 方法：
		- 构造：最主要的是传入可调用对象 `std::function` 
		- 析构：调用`pthread_detach()`
		- `start()` 调用`pthread_create()`创建线程，传的函数指针是`startThread()`, 数据指针是 `ThreadData`， 最终是启线程执行`func_`
		- `join()` 调用`pthread_join()`

- **ThreadPool**
	- 作用：线程池
	- 成员：
		- `typedef std::function<void ()> Task;`
		- `std::vector<std::unique_ptr<muduo::Thread>> threads_;`   线程的容器
		- `std::deque<Task> queue_` 任务队列   `Condition notEmpty_  notFull_` 用来控制队列的空或满的等待
	- 方法：
		- `start(numThreads_)` 启动线程池，创建numThreads_个`Thread`对象，开启numThreads_个线程，设置的可执行对象为`runInThread()`
		- `runInThread()` 在while循环，从队列中取task并执行
		- `run(Task task)` 把Task放到队列中
		- `stop()`  把`threads_`中的线程挨个`join`掉

- **ThreadLocal**
	- 作用：线程局部存储（Thread-Local Storage, TLS）的模板类
	- 成员：
		- `typedef std::function<void ()> Task;`
		- `std::vector<std::unique_ptr<muduo::Thread>> threads_;`   线程的容器
		- `std::deque<Task> queue_` 任务队列   `Condition notEmpty_  notFull_` 用来控制队列的空或满的等待
	- 方法：
		- 构造：调用了`pthread_key_create`函数来创建一个线程局部键（`pkey_`）,它有神奇的作用，通过此key，不同的线程可以**设置**和**获取**本线程独一份的数据
		- 析构：调用了`pthread_key_delete`函数来删除之前创建的线程局部键
		- `value()`:  神奇的功能都在这里，当局部键为空的时候，new一个对象并把其指针赋给局部键，非空的时候把局部键转成对象返回
		- `destructor(void *x)`:  此deletor会传给`pthread_key_create`，用于在线程结束时自动调用，清理线程局部存储中的资源

- **ThreadLocalSingleton**
	- 作用：线程局部存储的单例类
	- 方法：
		- `instance()`: 返回线程单例对象
	- 备注：
		- 当某个线程第一次调用 `instance()` 时，`ThreadLocalSingleton` 会检查该线程是否已经拥有 `T` 类型的实例。
		- 如果没有，则创建一个实例，并通过 `Deleter` 将其与当前线程的 TLS 键关联。
		- 在线程结束时，`pthread_key_t` 关联的 `destructor` 函数会被调用，清理 `T` 类型的实例。
		- 这确保了每个线程都有自己独立的 `T` 实例，并且不会与其他线程的实例冲突。
		- 使用例子：`server_threaded_highperformance.cc`

## 事件循环
- **EventLoop**
	- 作用：里面维护者所有的 `Channel`，`EventLoop` 不关心 `Pooler` 是如何维护 `Channel` 列表的。只关心获得了 `activeChannels_` 就回调用户的方法
	- 成员：
		- `std::unique_ptr<EPoller> poller_;`
		- `std::vector<Channel*> activeChannels_`
		- `std::unique_ptr<TimerQueue> timerQueue_;` 处理定时任务,和其他事件的逻辑一样
		- `std::vector<Functor> pendingFunctors_;`   在主循环的末尾执行，其他线程内调用`EventLoop`可以把执行的方法
		- `std::unique_ptr<Channel> wakeupChannel_;`  用于唤醒被阻塞住的主循环
	- 方法：
		- `loop();` 
			- 主循环，调用 `Poller::poll()` 获得当前活动事件的Channel列表，然后依次调用每个Channel的handleEvent()函数。
			- 即：1.取出活动的事件 2.处理事件
		- `updateChannel()`、`removeChannel()` 调用 `poller` 来更新 `Channel`
		- `wakeup();`   当阻塞到`poll()`调用中，它用`eventfd(2)`来异步唤醒
		- `queueInLoop()` 将cb放入队列，并在必要时唤醒IO线程
		- `runAt()`, `runAfter()`, `runEvery()`
	- 备注：

- **Poller**
	- 作用：poll  epoll的封装，生命周期和 EventLoop相等，采用水平触发
	- 成员：
		- `std::map<int, Channel*> channels_` 维护着所有 `fd` 的Channel, 此Channel是所有的，EventLoop中的是活跃的
	- 方法：
		- `virtual poll() = 0` 、 `virtual updateChannel() = 0` 、 `virtual removeChannel() = 0`
		- `newDefaultPoller()` 根据设置创建具体的poller
	- 备注：
		- 拥有EventLoop指针的作用：判断是否再loop线程中 `assertInLoopThread`
- **PollPoller** : Poller
	- 作用：维护底层的事件结构 `pollfds_` 和 上层的事件结构 `channels_`
	- 成员：
		- `std::vector<struct pollfd> pollfds_` 
	- 方法：
		- `poll();` 调用系统的 `poll()`, 把实际发生的事件填充到 `pollfds_` 中， 并调用 `fillActiveChannels()`
		- `fillActiveChannels()` 通过`pollfds_` 从 `channels_` 获取发生的事件的 `fd` 的 `Channel`， 并将其设置到 `EventLoop` 的 `activeChannels_` 中
		- `updateChannel()` 向 `pollfds_` 和 `channels_` 中添加或更新其中的数据
		- `removeChannel()`  从 `pollfds_` 和 `channels_` 中删除数据

- **EPollPoller** : Poller
	- 作用：维护底层的事件数据结构 `events_` 和 上层的事件数据结构 `channels_`
	- 成员：
		- `std::vector<struct epoll_event> events_` 
	- 方法：
		- `poll();` 调用系统的 `poll()`, 把实际发生的事件填充到 `events_` 中， 并调用 `fillActiveChannels()`
		- `fillActiveChannels()` 通过`events_` 从 `channels_` 获取发生的事件的 `fd` 的 `Channel`， 并将其设置到 `EventLoop` 的 `activeChannels_` 中
		- `updateChannel()` 向 `events_` 和 `channels_` 中添加或更新其中的数据
		- `removeChannel()`  从 `events_` 和 `channels_` 中删除数据

- **Channel**
	- 作用：负责注册与响应IO事件。每个Channel对应一个fd，它存着各种关注的事件及回调函数，负责各种事件的回调。 相当一个对监听对象的各种事件的封装
	- 成员：
		- `const int fd_;` 底层关注的fd 
		- `int events_` 关注那些事件，读、写事件。按位进行设置的,  如 `enableReading() { events_ |= kReadEvent; update(); }`
		- `int revents_`  调用 `poll()` 后返回的那些事件
		- `std::function<void()> readCallback_, writeCallback_, closeCallback_,errorCallback_` 各个回调函数
	- 方法：
		- `handleEvent()`  根据 `revents_` 返回的事件调相应的回调函数
		- `enableReading()`  events_设置监听读，再调用update()
		- `update()`、`remove()` 调用 `EventLoop` 的 `updateChannel()`、` removeChannel()`
	- 备注：
		- 每个 Channel，自始至终都属于一个 EventLoop（不用为线程安全问题烦恼）

## 定时器模块

- **TimerId**
	- 作用：定时器的id，主要用于标识timer、取消timer，id是通过全局原子类型 AtomicInt64 自增得到的
	- 成员：
		-   `Timer* timer_;` 、 ` int64_t sequence_;`

- **Timer**
	- 作用：对定时器的时间点和事件的封装
	- 成员：
		- `std::function<void()> callback_` 
		- `Timestamp expiration_;`  过期时间
		- `const double interval_;`  间隔
		- `const bool repeat_` 是否重复执行
	- 备注：
		- 此class是内部实现细节，用户看不到
			
- **TimerQueue**
	- 作用：对定时器的时间点和事件的封装
	- 成员：
		- `Channel timerfdChannel_`, 使用了一个Channel来观察timerfd_上的readable事件
		- `std::set<std::pair<Timestamp, Timer*>> timers_`  按照时间排序，使用二叉搜索树维护timer，方便按时间查找
		- `std::set<std::pair<Timer*, int64_t>> activeTimers_` 按照timerId排序，方便通过id进行查找
	- 方法：
		- `addTimer()`  有更早的timer会重置`timerfd`， 供EventLoop使用，EventLoop会把它封装为更好用的runAt()、runAfter()、runEvery()等函数
		- `cancel()`  通过传入`TimerId`参数，从而在维护的数据timer结构中找到timer并删除掉
		- `handleRead()`  1. timer到期事件发生时调用 2. 调用 `getExpired()` 获取超时的timer 3. 回调timer的用户函数 4. 调用 `reset()`
		- `getExpired()`  从`timers_`中得到过期的，并把过期的删除
		- `reset()` 1.若到期的timer是定时执行的，则重新添加timer，否则删除  2. 从`timers_`获取最早到期的时间，并重置`timerfd`
	- 备注：
		- 此class是内部实现细节，用户看不到
		- 为什么存在 `timers_` 和 `activeTimers_` 两个结构来维护timer？
			- `timers_` 按过期时间排序的集合，可以高效地找到最早需要触发的定时器。而 `activeTimers_` 则是根据对象地址和timerid排序的，通过`TimerId`可以在 `activeTimers_` 中快速找到，但是无法在 `timers_` 中快速找到
			- 在代码中，`timers_` 和 `activeTimers_` 的大小始终保持一致，通过这个约束来确保数据结构的一致性和操作的正确性


## 线程模块
- **EventLoopThread**
	- 作用：本对象创建时，会启动子线程，并在其中运行EventLoop::loop()
	- 成员：
		- `Thread thread_;` 
		- `EventLoop* loop_` 
	- 方法：
		- `EventLoopThread()`  创建`Thread`对象，并设置 `threadFunc()`为线程函数
		- `threadFunc()` 线程体函数， 创建  `EventLoop` 对象，并执行其 `loop()` 成员函数
		- `startLoop()` 启动线程并返回`EventLoop` 对象
			
- **EventLoopThreadPooll**
	- 作用：
	- 成员：
		- `int numThreads_;`
		- `std::vector<std::unique_ptr<EventLoopThread>> threads_;`
		- `std::vector<EventLoop*> loops_;`
		- `EventLoop* baseLoop_;`  当`numThreads_ == 0` 是才使用baseLoop_， 好像是用处不大
	- 方法：
		- `start()` 1. 创建 `numThreads_`个`EventLoopThread`对象，并启动 `EventLoop` 对象 2. 填充 `threads_`、`loops_`
		- `getNextLoop()`  轮训返回loop对象

## 网络模块

### 服务器端

- **Socket** 
	- 作用：一个RAIIhandle，封装一个filedescriptor，并在析构时关闭fd
	- 成员：
		- `const int sockfd_;` 
	- 方法：
		- `bindAddress()`  
		- `listen()` 
		- `accept()` 
- **SocketsOps** 
	- 作用：封装各种Sockets系统调用

- **TcpServer**
	- 作用：管理 `Acceptor` 获得的 `TcpConnection`
	- 成员：
		- `EventLoop* loop_;  // the acceptor loop`  
		- `std::shared_ptr<EventLoopThreadPool> threadPool_;`   线程池,里面时 ioLoop
		- `std::unique_ptr<Acceptor> acceptor_;`
		- `std::map<string, TcpConnectionPtr> connections_`
	- 方法：
		- `start()`  
			- 1. 本线程的`EventLoop`中增加`Acceptor`的读事件，开启网络监听 
			- 2. 执行`threadPool_`的`start()`, 开启IO线程池
		- `newConnection()`
			- 0. 在构造时便把`newConnection()`设置到`Acceptor`的`newConnectionCallback_`上了
			- 1. 从`threadPool_`中获取`ioLoop`
			- 2. 创建`TcpConnection` 对象，设置4个回调函数，并放到 `connections_` 容器中 
			- 3. ioLoop中开启对此 `TcpConnection` 对象的事件的监听
		- `removeConnection()`  
			- 1. 从 `connections_` 容器中移出 
			- 2. 调用 `TcpConnection::connectDestroyed`
	- 备注：
		- 供用户直接使用的，生命期由用户控制

- **Acceptor**
	- 作用：对内class，供TcpServer使用，生命期由后者控制，负责socket bind listen accept和有了`accept`事件后的回调
	- 成员：
		- `Channel acceptChannel_;` 
		- `Socket acceptSocket_;`
	- 方法：
		- `listen()` 1.调网络API开始listen  2. `acceptChannel_` 启用监听可读事件
		- `handleRead()` 1.调网络API accept()  2. accpet到后回调 TcpServer 传过来的 `newConnectionCallback_` 

- **TcpConnection**
	- 作用：负责连接的状态、 发送数据、接收数据、连接关闭，事件又是通过Channel来获得的
	- 成员：
		- `std::unique_ptr<Socket> socket_;`   拥有TCP socket，它的析构函数会close(fd)
		- `std::unique_ptr<Channel> channel_;
		- `connectionCallback_`， `messageCallback_`, `writeCompleteCallback_`, `closeCallback_` 各种回调
		- `Buffer inputBuffer_;`, `Buffer outputBuffer_;` 
	- 方法：
		- `Constructor`  把`handleXXX()`系列函数设置到 `channel_` 的回调中
		- `handleRead();`
		- `handleWrite();`
		- `handleClose();`
		- `handleError();` 
	- 备注：
		- 没有发起连接的功能，其构造函数的参数是已经建立好连接的socket fd


- **Buffer**
	- 作用：数据的读写通过buffer进行。用户代码不需要调用read(2)/write(2)，只需要处理收到的数据和准备好要发送的数据
	- 成员：
		- `std::vector<char> buffer_;`
		- `size_t readerIndex_;`
		- `size_t writerIndex_;`
	- 方法：
		- 主要的就是各种取数据、写数据的方法
	- 备注：
		- | prependable bytes |  readable bytes  |  writable bytes  |
		- 0      <=          readerIndex   <=      writerIndex    <=    size


### 客户端
- **Connector**
	- 作用：只 负 责 建 立 socket 连 接， 不 负 责 创 建 TcpConnection
	- 成员：
		- `std::function<void (int sockfd)> newConnectionCallback_`    连接成功后的回调
	- 方法：
		- `connect()` 建立连接，失败会进行重试
		- `connecting()` 通过上一步的调用操作系统的`connect()`接口的返回值获得返回状态，若是连接中，则设置socket可写的回调
		- `handleWrite()` 当连接可写时再通过`sockets::getSocketError(sockfd);`获取socket的状态判断是否连接成功
	- 备注：


- **TcpClient**
	- 作用：它的代码与TcpServer甚至有几分相似（都有newConnection和removeConnection()这两个成员函数），只不过每个TcpClient只管理一个TcpConnection
	- 成员：
		- `EventLoop* loop_;`
		- `ConnectorPtr connector_;`
		- `connectionCallback_;`、`messageCallback_;`、`writeCompleteCallback_;`  提供给用户的回调
	- 方法：
	- 备注：


## protobuf

- **ProtobufCodecLite**
	- 作用：protobuf网络格式的编码解码的中间层
	- 成员：
		- `typedef std::function<void (const TcpConnectionPtr&,const MessagePtr&,Timestamp)> ProtobufMessageCallback`
		- `ProtobufMessageCallback messageCallback_;` 用户业务逻辑的回调，回调经过 `ProtobufDispatcher` 后拿到的直接就是具体的protobuf消息格式
	- 方法：
		- `onMessage(const TcpConnectionPtr& conn,Buffer* buf,Timestamp receiveTime);` 解码解析的主要逻辑，解析完回调上层传过来的用户回调
		- `send(TcpConnectionPtr& conn,Message& message)`  编码并进行发生的逻辑

- **ProtobufDispatcher**
	- 作用：注册消息处理的函数并进行消息处理的分发
	- 成员：
		- `std::map<string key, Callback> callbacks_` 保存所有的处理函数
	- 方法：
		- `onProtobufMessage()` 收到数据解析成`protobuf::Message`的数据后，根据名字查找相应的处理函数
		- `registerMessageCallback()`  注册消息处理的函数
	- 备注：
		- 解析创建的类型是protobuf的Message类型，handle处理函数接收的如何变成具体类型？
		    1. 在注册出处理函数的时候，把类型模板参数传进去
		    2. 注册回调函数的时候根据传入的模板类型进行向下转型
## protorpc

- **RpcMessage**
	- 作用：rpc传输的protobuf消息体，在`.proto` 中定义并由protoc自动生成
	- 成员：
		- `MessageType type`   `REQUEST` or `RESPONSE`
		- `fixed64 id` 
		- `string service` 
		- `string method` 
		- `bytes request` 
		- `bytes response`
		- `ErrorCode error`

- **RpcServer**
	- 作用：注册消息处理的函数并进行消息处理的分发
	- 成员：
		- `TcpServer server_;` 
		- `std::map<std::string, ::google::protobuf::Service*> services_;`  
	- 方法：
		- `registerService(::google::protobuf::Service*);`   注册rpc服务， 并调用`channel->setServices(&services_);` 设置到channel中
		- `onConnection(const TcpConnectionPtr& conn)` 连接来了后设置`RpcChannel::onMessage`为MessageCallback

- **RpcChannel**
	- 作用：继承 `::google::protobuf::RpcChannel` 并实现其中的 `CallMethod()` 方法
	- 成员：
		- `std::map<int64_t, OutstandingCall> outstandings_` 发送rpc后把rpc返回的回调放在此结构中，用于结果返回时的调用
		- `std::map<std::string, ::google::protobuf::Service*>* services_;` 
	- 方法：
		- `CallMethod()`  构造 `RpcMessage` 对象， 设置 service、method、request，并调用`RpcCodec`的send方法进行发送
		- `onMessage()` 调用 `RpcCodec` 的 onMessage 方法，在构造时把 `onRpcMessage()` 回调传入到 RpcCodec中
		- `onRpcMessage()`  使用 `RpcCodec` 解码后的 `RpcMessage` 对象
			- 若是 RESPONSE：根据message id从 outstandings_ 找到相应的回调并执行
			- 若是 REQUEST：根据serive名字找到相应的server并调用相应的方法，最后执行 `CallMethod()`方法
	- 备注：

- **RpcCodec**
	- 作用：`typedef ProtobufCodecLiteT<RpcMessage, rpctag> RpcCodec;` 用的就是 `ProtobufCodecLiteT` 的编码解码


## Http服务器


- **HttpServer**
	- 作用：提供http服务
	- 成员：
		- `HttpCallback httpCallback_;`  用户传的回调函数，所有http逻辑都写在这个里面。传入的函数类型为`void onRequest(const HttpRequest& req, HttpResponse* resp)`
	- 方法：
		- `setHttpCallback(const HttpCallback& cb)`  设置用户的回调 
		- `onMessage()` 1. 调用`context->parseRequest()` 2. 调用`onRequest()`
		- `onRequest()` 1.调用 httpCallback_ 回调  2. 根据 HttpResponse 对象，生成http报文，并发送

- **HttpContext**
	- 作用：
	- 成员：
		- `HttpRequest request_;`
		- `HttpRequestParseState state_;` 标识当前解析的状态，用于解析http请求
	- 方法：
		- `parseRequest(Buffer* buf, Timestamp receiveTime)`  解析首行的请求体
		- `processRequestLine(const char* begin, const char* end)`  解析请求行

- **HttpRequest**
	- 作用：代表请求对象，`onConnection()` 建立连接的时候创建
	- 成员：
		- `Method method_;`
		- `string path_;`
		- `string query_;`
		- `std::map<string, string> headers_;`
	- 方法：
		- `o;` 

- **HttpResponse**
	- 作用：代表响应对象，在调用 `HttpServer` 的 `httpCallback_` 之前创建，并将其引用传递给 `httpCallback_` 的参数
	- 成员：
		- `std::map<string, string> headers_;`
		- `HttpStatusCode statusCode_;`
		- `string statusMessage_;`
		- `string body_;`
	- 方法：
		- `appendToBuffer(Buffer* output)` 根据`HttpResponse`对象构造http相应报文，并设置到 `buffer` 中，
























