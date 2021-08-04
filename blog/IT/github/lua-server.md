
## 脚本模块


## 网络模块

### tcp相关
```
EventLoop
    功能就是对libuv做了一下简单的封装
    init()
    run()
    exit()
    getLoop()
        返回的是uv_loop_t



NetEvent
    NetConnect * createConnect
    destroyConnect(NetConnect * conn)
    
    onAccept(NetConnect * conn)
    onConnect(NetConnect * conn)
    onClose(NetConnect * conn)
    onMsg(NetConnect * conn)
    
    
socket
-------------
MessageBuffer
    结构为rpos,wpos,storage = std::vector<uint8> 

    每个socket都有一个自己提供的buffer供libuv用，这个buffer可以复用，他的生命周期和TcpSocketBase一样长
    当有读事件的时候，libuv会自动把数据填入的这个buffer中

TcpSocketBase
    成员
        uv_tcp_t m_uv_tcp;       //在connect的时候通过uv_tcp_init()初始化
        uv_write_t m_write_t;
        MessageBuffer mBuffer;   
        
    localIP()
    localPort()
    remoteIP()
    remotePort()
    getUvTcp()
        返回的是uv_tcp_t，网络操作还多都得靠他
    
    write(const uv_buf_t* buf, uint32 size)
        uv_write(x,x,x,x,echo_write)
    echo_write() 写事件完了之后的回调  
        self->on_writecomplete()
        
    on_read_start()    // 开启监听读事件
        uv_read_start((uv_stream_t *)getUvTcp(), alloc_buffer, echo_read)
    echo_read() 读事件完了之后的回调
        出错
            uv_close((uv_handle_t*)tcp, on_uv_close);
                TcpSocketBase::on_uv_close()
                    回调user的self->on_clsesocket();
        buffer有数据时，通知上层的connect对象进行处理
            self->on_msgbuffer(&self->mBuffer);

TcpSocket:TcpSocketBase
    setUserdata()
    getUserdata()
    setUsernum()
    getUsernum()
    
NetConnect:TcpSocket
    发送相关函数
        sendMsg()
        sendPacket()
        sendDate()
            构建NetPacket包 header + body
            把构建的包push到mSendPackets中
            TcpSocket::write(pack)
            send_top_msg()
                从mSendPackets中取出包进行发送
                TcpSocketBase::write(&mSending[0], mSending.size());
                    uv_write(x,x,x,x,echo_write)
                    echo_write()
                        self->on_writecomplete()
                            包得再发送成功后才能删除
                            清理mSendPackets
                            清理mSending
    接收相关函数
        on_msgbuffer()
            从MessageBuffer中读数据，先读header再读body,最终创建一个NetPacket，并将NetPacket传入到user的回调函数
            _netevent->onMsg(this, mReadPacket->getMsgType(), mReadPacket);
    
    其他
        on_clsesocket()

server
--------------    
TcpServer
    成员
        uv_tcp_t m_uv_tcp;  //服务器的socket

    listen()
        uv_listen((uv_stream_t*)&m_uv_tcp, DEFAULT_BACKLOG, on_new_connection);
            有新连接的时候回调 on_new_connection(uv_stream_t *server, int status)
            
    shutdown()
    
    on_new_connection()
        此处有两个回调
            TcpSocketBase::on_read_start(), 此时的处理逻辑转移到了socket对象中
            onSocket()    
    virtual createSocket() = 0
    virtual onSocket() = 0


NetServer:TcpServer
    createSocket()
        创建TcpSocket对象
        _netevent->createConnect()
    onSocket()
        _netevent->onAccept((NetConnect *)connect)


clinet
--------------
TcpClient
    connect()
        核心对外函数，连接指定服务器
        此处有两个回调
            TcpSocketBase::on_read_start()
            onSocket()
    virtual createSocket() = 0
    virtual onSocket() = 0

NetClient:TcpClient
    createSocket()
        创建TcpSocket对象
    onSocket()
        _netevent->onConnect((NetConnect *)conn, argv) 
        调用user传入的onConnect回调函数,主要是判断连接成没成功，没成功第一个参数为null


packet
-------------
ByteConverter
    字节序的转换
ByteBuffer
    rpos,wpos,storage

BasePacket:ByteBuffer
    一系列操作buffer的方法
    
    
NetPacket:BasePacket
    head = msglen:uint32 + msgtype:uint32 
    
    getMarkLen()
    getMsgType()
    isHeadFull()
    
    sendSize()
    sendStream()
    
    writeHead()
    readHead()

ProtoPacket
    readProto()
        从NetPacket包中读出protobuf对象
    writeProto()
        将protobuf对象写入到NetPacket包中


```


### udp相关
```
UdpClient
    connect()
        uv_udp_recv_start(&_udp, UdpClient::alloc_buffer, UdpClient::on_read);
        
    writeToServer()
        uv_udp_try_send()
        
    on_read()
        self->onMessage(addr, rcvbuf->base, nread);
        
        
    virtual onMessage() = 0  user继承后，由user具体实现其逻辑


UdpServer
    start()
        uv_udp_bind()
        uv_udp_recv_start(x,x,on_read)
    on_read()
        再调用onMessage()
    virtual onMessage() = 0  user继承后，由user具体实现其逻辑


UdpPacket
    packet = head(4byte,length) + body

```


### http相关
```
HttpEvent
    virtual onClose() = 0
    virtual onGet()   = 0
    virtual onPost()  = 0
    virtual onOther() = 0

HttpConnect : TcpSocket
    接收
        on_msgbuffer()
            主要逻辑就是从buffer中读数据，并进行http包的处理
            解析完整的http包后调用complete()
        complete()
            根据类型进行以下回调
            HttpServer::onPost()
            HttpServer::onGet()
            HttpServer::onOther()
        
    发送    
        sendMsg(const char* msg, int32 len)
        sendData(std::string_view sv)
        autoMsg(std::string_view sv, enum http_content_type type = hct_text_html);


HttpServer : TcpServer,HttpEvent
    其中继承了TcpServer的所有功能，其中最主要的就是开启tcp的监听
   
    TcpServer::on_new_connection()
        此处有两个回调
            TcpSocketBase::on_read_start(), 此时的处理逻辑转移到了socket对象中
            onSocket() 
            当buffer中有数据的话，最终会调用Connect对象的 on_msgbuffer
   
    createSocket()
        和tpc不同的地方为创建不同的socket对象，以处理不同的逻辑

    onGet()
        根据url查找注册的处理方法并回调
    onPost()
        根据url查找注册的处理方法并回调
    onOther()
        调用m_other function
    onClose()
        CommPool::reclaim(conn)  复用connect连接对象
HttpParser : llhttp_t
    parser()
    contentLen()
    method()
    isClose()
    getUrl()
    getParser()
    成员：
        ParseUrl m_url;

ParseUrl
    parse()
    haveParam()
    getPath()
    getParam()

```

### kcp相关


### websocket相关






## 通用模块

```
ObjectPool
    对象池，目的是做到对象的重复利用，以减少内存重复的分配和回收

CommonPool


```




## 第三方插件


### http相关
http_parser

llhttp


