EventLoopThreadPool




TcpServer
管理accept获得的TcpConnection
为用户直接使用的


TcpConnection
负责连接的 状态、 发送、接受、关闭，事件又是通过Channel来获得的


Acceptor
供 TcpServer使用，负责socket bind listen accept和有了listen事件后的回调








EventLoop
里面维护者所有的 Channel，EventLoop不关心Pooler是如何维护Channel列表的。只关心有了activeChannels_就回调用户的方法。


Poller   
poll  epoll的封装，声明周期和 EventLoop相等


Channel      
每个 Channel，自始至终都属于一个 EventLoop（不用为线程安全问题烦恼），   每个Channel对应一个fd，它存着各种回调函数以及各种事件，负责各种事件的回调


Buffer


定时器模块
TimerId  Timer TimerQueue

