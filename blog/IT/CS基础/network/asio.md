Boost.Asio 对网络编程做了一个极好的抽象，从而保证只需要少量的代码就可以实现一个优雅的客户端/服务端软件。

## Boost.Asio入门

简单来说，Boost.Asio是一个跨平台的、主要用于网络和其他一些底层输入/输出编程的C++库。


### 同步VS异步
在同步编程中，所有的操作都是顺序执行的，比如从socket中读取（请求），然后写入（回应）到socket中。每一个操作都是阻塞的。
异步编程是事件驱动的。虽然启动了一个操作，但是你不知道它何时会结束；它只是提供一个回调给你，当操作结束时，它会调用这个API，并返回操作结果。


**异步的客户端例子**
```
using boost::asio;
io_service service;
ip::tcp::endpoint ep( ip::address::from_string("127.0.0.1"), 2001);
ip::tcp::socket sock(service);
sock.async_connect(ep, connect_handler);
service.run();
void connect_handler(const boost::system::error_code & ec) {
    // 如果ec返回成功我们就可以知道连接成功了
}
```
注意：只要还有待处理的异步操作，servece.run()循环就会一直运行。在上述例子中，只执行了一个这样的操作，就是socket的async_connect。在这之后，service.run()就退出了。


**异步服务端例子**
```
using boost::asio;
typedef boost::shared_ptr<ip::tcp::socket> socket_ptr;
io_service service;
ip::tcp::endpoint ep( ip::tcp::v4(), 2001)); // 监听端口2001
ip::tcp::acceptor acc(service, ep);
socket_ptr sock(new ip::tcp::socket(service));
start_accept(sock);
service.run();
void start_accept(socket_ptr sock) {
    acc.async_accept(*sock, boost::bind( handle_accept, sock, _1) );
}
void handle_accept(socket_ptr sock, const boost::system::error_code &
err) {
    if ( err) return;
    // 从这里开始, 你可以从socket读取或者写入
    socket_ptr sock(new ip::tcp::socket(service));
    start_accept(sock);
}
```
在上述代码片段中，首先，你创建一个io_service实例，指定监听的端口。然后，你创建接收器acc——一个接受客户端连接，创建虚拟的socket，异步等待客户端连接的对象。

最后，运行异步service.run()循环。当接收到客户端连接时，handle_accept被调用（调用async_accept的完成处理程序）。如果没有错误，这个socket就可以用来做读写操作。

在使用这个socket之后，你创建了一个新的socket，然后再次调用start_accept()，用来创建另外一个“等待客户端连接”的异步操作，从而使service.run()循环一直保持忙碌状态。

### 异常处理VS错误代码
Boost.Asio允许同时使用异常处理或者错误代码，所有的异步函数都有抛出错误和返回错误码两种方式的重载。

```
# 异常版
try {
    sock.connect(ep);
} catch(boost::system::system_error e) {
    std::cout << e.code() << std::endl;
}

# 错误码版
boost::system::error_code err;
sock.connect(ep, err);
if ( err)
    std::cout << err << std::endl;
```

当使用异步函数时，你可以在你的回调函数里面检查其返回的错误码。异步函数从来不抛出异常，因为这样做毫无意义。那谁会捕获到它呢？

### io_service类
*   有一个_io_service_实例和一个处理线程的单线程例子：
```
io_service service; // 所有socket操作都由service来处理 
ip::tcp::socket sock1(service); // all the socket operations are handled by service 
ip::tcp::socket sock2(service); sock1.asyncconnect( ep, connect_handler); 
sock2.async_connect( ep, connect_handler); 
deadline_timer t(service, boost::posixtime::seconds(5));
t.async_wait(timeout_handler); 
service.run();
```


*   有一个io_service实例和多个处理线程的多线程例子：
```
io_service service;
ip::tcp::socket sock1(service);
ip::tcp::socket sock2(service);
sock1.asyncconnect( ep, connect_handler);
sock2.async_connect( ep, connect_handler);
deadline_timer t(service, boost::posixtime::seconds(5));
t.async_wait(timeout_handler);
for ( int i = 0; i < 5; ++i)
    boost::thread( run_service);
void run_service()
{
    service.run();
}
```

*   有多个_io_service_实例和多个处理线程的多线程例子：
```
io_service service[2];
ip::tcp::socket sock1(service[0]);
ip::tcp::socket sock2(service[1]);
sock1.asyncconnect( ep, connect_handler);
sock2.async_connect( ep, connect_handler);
deadline_timer t(service[0], boost::posixtime::seconds(5));
t.async_wait(timeout_handler);
for ( int i = 0; i < 2; ++i)
    boost::thread( boost::bind(run_service, i));
void run_service(int idx)
{
    service[idx].run();
}
```

区别：
*   第一种情况是非常基础的应用程序。因为是串行的方式，所以当几个处理程序需要被同时调用时，你通常会遇到瓶颈。如果一个处理程序需要花费很长的时间来执行，所有随后的处理程序都不得不等待。
*   第二种情况是比较适用的应用程序。他是非常强壮的——如果几个处理程序被同时调用了（这是有可能的），它们会在各自的线程里面被调用。唯一的瓶颈就是所有的处理线程都很忙的同时又有新的处理程序被调用。然而，这是有快速的解决方式的，增加处理线程的数目即可。
*   第三种情况是最复杂和最难理解的。你只有在第二种情况不能满足需求时才使用它。这种情况一般就是当你有成千上万实时（socket）连接时。你可以认为每一个处理线程（运行_io_service::run()_的线程）有它自己的_select/epoll_循环；它等待任意一个socket连接，然后等待一个读写操作，当它发现这种操作时，就执行。大部分情况下，你不需要担心什么，唯一你需要担心的就是当你监控的socket数目以指数级的方式增长时（超过1000个的socket）。在那种情况下，有多个select/epoll循环会增加应用的响应时间。


最后，需要一直记住的是如果没有其他需要监控的操作，.run()就会结束。如果你想要service.run()接着执行，你需要分配更多的工作给它。这里有两个方式来完成这个目标。一种方式是在connect_handler中启动另外一个异步操作来分配更多的工作。 另一种方式会模拟一些工作给它，用下面的代码片段：

```
typedef boost::shared_ptr work_ptr;
work_ptr dummy_work(new io_service::work(service));
```


## Boost.Asio基本原理

主要类
IP地址：ip::address
端点：ip::tcp::endpoint
套接字：ip::tcp::socket
套接字缓冲区:buffer
解析域名的类：ip::tcp::resolver、ip::tcp::resolver::query

### 缓冲区
缓冲区内存的有效时间必须比I/O操作的时间要长；你需要保证它们在I/O操作结束之前不被释放。
对于同步操作来说，这很容易
```
char buff[512];
...
sock.receive(buffer(buff));
strcpy(buff, "ok\n");
sock.send(buffer(buff));
```
但是在异步操作时就没这么简单了
```
// 非常差劲的代码 ...
void on_read(const boost::system::error_code & err, std::size_t read_bytes)
{ ... }
void func() {
    char buff[512];  //出了作用域就没了
    sock.async_receive(buffer(buff), on_read);
}
```
对于上面的问题有几个解决方案：
*   使用全局缓冲区
*   创建一个缓冲区，然后在操作结束时释放它
*   使用一个集合对象管理这些套接字和其他的数据，比如缓冲区数组



socket相关函数
```
ip::tcp::endpoint ep( ip::address::from_string("127.0.0.1"), 80);
ip::tcp::socket sock(service);
sock.open(ip::tcp::v4());
sock.connect(ep);
sock.write_some(buffer("GET /index.html\r\n"));
char buff[1024]; sock.read_some(buffer(buff,1024));
sock.shutdown(ip::tcp::socket::shutdown_receive);
sock.close();
```


## 参考链接
- [Boost.Asio C++ 网络编程](https://mmoaay.gitbooks.io/boost-asio-cpp-network-programming-chinese/content/)



