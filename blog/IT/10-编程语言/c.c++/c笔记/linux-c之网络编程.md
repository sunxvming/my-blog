## 网络编程基础

**套接字是通信端点的抽象**。与文件描述符一样，套接字需要使用套接字描述符。
套接字在Linux上也是通过文件实现的，所以传统的write和read同样适用于套接字。


### bind函数
* 在调用bind函数是，可以指定一个端口号，或指定一个IP地址，也可以两者都指定，还可以都不指定。
如果一个TCP客户或服务器未曾调用bind捆绑一个**端口**，当调用connect或listen时，内核就要为相应的套接字选择一个临时端口。
* 进程可以把一个特定的IP地址 捆绑到它的套接字上，不过这个IP地址必须属于其所在主机的网络接口之一。对于TCP客户，这就为在该套接字上发送的IP数据报指派了源IP地址。对于TCP服务器，这就限定该套接字只接受那些目的地为这个IP地址的客户连接。TCP客户通常不bind ip和端口。
* 如果在bind时指定端口号位0，那么内核就在bind被调用时选择一个临时端口。如果指定IP地址为通配地址，那么这台机器上的所有ip都会监听




### 网络字节序
不同的 CPU 中，4 字节整数值1在内存空间保存方式是不同的。
* 大端序（Big Endian）：最高有效位放到低地址，低地址存高位
* 小端序（Little Endian）：最低有效位放到低地址，低地址存低位


在通过网络传输数据时必须约定统一的方式，这种约定被称为网络字节序，，统一为大端序。即，先把数据数组转化成大端序格式再进行网络传输。

帮助转换字节序的函数：
```
unsigned short htons(unsigned short);
unsigned short ntohs(unsigned short);
unsigned long htonl(unsigned long);
unsigned long ntohl(unsigned long);
```
其中：
htons 的 h 代表主机（host）字节序。
htons 的 n 代表网络（network）字节序。
s 代表 short
l 代表 long


### 网络地址的初始化与分配
将字符串信息转换为网络字节序的整数型

```
#include <arpa/inet.h>
in_addr_t inet_addr(const char *string);
```
inet_aton 函数与 inet_addr 函数在功能上完全相同，也是将字符串形式的IP地址转换成整数型的IP地址。只不过该函数用了 in_addr 结构体，且使用频率更高

```
#include <arpa/inet.h>
int inet_aton(const char *string, struct in_addr *addr);
```
还有一个函数，与 inet_aton() 正好相反，它可以把网络字节序整数型IP地址转换成我们熟悉的字符串形式

```
#include <arpa/inet.h>
char *inet_ntoa(struct in_addr adr);
```

### 改变和更改文件属性的办法
int opts = fcntl(st, F_GETFL); 
opts = opts | O_NONBLOCK;   //设置nobloking
fcntl(st, F_SETFL, opts)

### 域名及网络地址
利用域名获取IP地址

```
#include <netdb.h>
struct hostent *gethostbyname(const char *hostname);
```
利用IP地址获取域名

```
#include <netdb.h>
struct hostent *gethostbyaddr(const char *addr, socklen_t len, int family);
```


### TCP和UDP

TCP是面向连接的协议
TCP保证可靠的，保证顺序，不会丢包
TCP需要创建并保持一个连接，给系统带来很大开销。
TCP有流量控制和拥塞控制
TCP数据传输效率低
如果要传输一个重要的数据，丢失一点就会破坏整个数据，那么需要选择TCP


UDP是无连接协议
UDP没有因接收方没有收到数据包重传而带来开销。
UDP处理的细节比TCP少。
UDP不能保证消息被传送到目的地。
UDP不能保证数据包的传递顺序
UDP需要程序员必须创建代码监测数据包的正确性，必要时重传。
UDP需要程序员必须把大数据包分片。
UDP需要需要程序员额外的做一些工作


流媒体为了保证很窄的网络带宽来传送更多的数据，基本采用UDP

一些消息重要程度不高，或者有规律重复，可以使用UDP。
设计用在**局域网**的应用可以采用UDP，因为在**局域网中丢失数据包的可能性很低**

### TCP版代码示例

```
//cliet
socket = socket(PF_INET,SOCK_STREAM)
connet(socket, address)
while(1)
{
    write(socket, buf, buf_len)
    read(socket, buf, buf_len)
}
close()
```
```
//server
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)
c_socket = accept(s_socket, client_address)
while(read(c_socket, buf, buf_len)!=0)
{
    write(c_socket, buf, buf_len)
}
close(c_socket)
close(s_socket)
```
### UDP版代码示例
```
s_socket = socket(PF_INET,SOCK_DGRAM)
bind(s_socket,address)
while(1)
{
    str_len = recvfrom(s_socket, buf, buf_len, 0, &client_addr, addr_size);
    sendto(s_socket, buf, buf_len, 0,&client_addr, addr_size);
}
close(s_socket)
```
```
sock = socket(PF_INET,SOCK_DGRAM)
bind(s_socket,address)
while(1)
{
    sendto(sock, buf, buf_len, 0,&client_addr, addr_size);
    recvfrom(sock, buf, buf_len, 0, &client_addr, addr_size);
}
close(sock)
```

## 常见网络编程模式

### 1.每次只处理一个连接
```
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)
while(1)
{
    c_socket = accept(s_socket, client_address)
    while(read(c_socket, buf, buf_len)!=0)
    {
        write(c_socket, buf, buf_len)
    }
    close(c_socket)
}
close(s_socket)
```
### 2.多进程版，每个连接分配一个进程
```
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)
while(1)
{
    c_socket = accept(s_socket, client_address)
    pid = fork()
    if(pid > 0 )
    {
        close(c_socket)
    }else if(pid == 0)
    {
        close(s_socket)
        while(read(c_socket, buf, buf_len)!=0)
        {
            write(c_socket, buf, buf_len)
        }
        close(c_socket)
    }
}
close(s_socket)
```
### 3.多线程版，每个连接分配一个线程
```
void *handle_clinet(void *arg )
{
    c_socket = *((int *)arg)
    while(read(c_socket, buf, buf_len)!=0)
    {
        write(c_socket, buf, buf_len)
    }
}
pthread_t tid
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)
while(1)
{
    c_socket = accept(s_socket, client_address)
    pthread_create(&tid, NULL, handle_client, (void *)&c_socket);
    pthread_detach(tid);
}
close(s_socket)
```
### 4.I/O多路复用版
#### select模型
select要注意最大文件描述符是1024，超过了会崩溃的。
使用select可以将多个socket集中到一起统一监视，监视内容为：接收事件，非阻塞传输事件(those in writefds will be watched to see if a write will not block)，异常
刚开始时把server_soket设置到fd_set文件描述符集合中，然后开始循环调用select去监视所有socet的变化，
当select返回值大于0，说明有变化，然后遍历fd_set的集合，判断哪些socket发生变化，
如果是server_socket发生变化则将accept到的cliet_socket设置到fd_set中
如果是cliet_socket发生变化则进行读写操作，若断开则FD_CLR()掉
```
fd_max=100
fd_set read_set
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)


FD_ZERO(&read_set)
FD_SET(s_socket, &read_set)
while(1)
{
    temp_read_set = read_set        //每次都要复制
    count = select(fd_max, temp_read_set, NULL, NULL, timeout )
    if(count == 0) continue
    for(i = 1, i < fd_max, i++)
    {
        if(FD_ISSET(i, &temp_read_set)) //是否有变化,在select的时候被设置
        {
            if(i==serv_sock)
            {
                c_socket = accept(s_socket, client_address)
                FD_SET(c_socket, &read_set);
            }else
            {
                ret = read(i, buf, buf_len)
                if(ret > 0)
                {
                    write(i, buf, buf_len)
                }else
                {
                    FD_CLR(i, &read_set);
                    close(i);
                }
             }
        }
    }
}
close(s_socket)
```
#### epoll模型
**select慢的原因**：
1. 调用 select 函数后针对所有文件描述符的循环语句，即使只有一个socket改变了
2. 每次调用 select 函数时都需要向该函数传递**fd集合(fd_set)**，涉及到向内核传递数据。


select 的兼容性比较高，这样就可以支持很多的操作系统，不受平台的限制，使用select函数满足以下两个条件：
1. 服务器接入者少
2. 程序应该具有兼容性


下面是epoll函数的功能：
* epoll_create：创建保存epoll文件描述符的空间,everything is file,当然epoll的也不例外
* epoll_ctl：向空间注册并注销文件描述符
* epoll_wait：与 select 函数类似，等待文件描述符发生变化

select 函数中为了保存监视对象的文件描述符，直接声明了 fd_set 变量，但 epoll 方式下**操作系统**负责保存监视对象文件描述符，因此需要向操作系统请求创建保存文件描述符的空间，此时用的函数就是 epoll_create。好处是不用在用户空间和内核空间传送数据了。

**epoll流程**：
1. epoll_create创建一个保存epoll文件描述符的空间，
2. 动态分配内存，给将要监视的 epoll_wait，以读取所有发生事件的socket
3. 利用epoll_ctl添加server_socket的EPOLLIN事件
4. 利用epoll_wait来获取改变的文件描述符,把结果存在epoll_event类型的指针内存中
5. 处理发生事件的socket
6. 重复4-5步骤

```
EPOLL_SIZE = 100
struct epoll_event *events;  //保存所有事件
struct epoll_event event;
s_socket = socket(PF_INET,SOCK_STREAM)
bind(s_socket,address)
listen(s_socket,queuelen)
// setnonblockingmode(s_socket);

ep_fd = epoll_create() //可以忽略这个参数，填入的参数为操作系统参考
events = malloc(sizeof(struct epoll_event)*EPOLL_SIZE);


event.events = EPOLLIN
event.data.fd = s_socket
epoll_ctl(ep_fd, EPOLL_CTL_ADD, s_socket, &event)
while(1)
{
    count = epoll_wait(ep_fd, events, EPOLL_SIZE, -1);  //-1是设置成永不超时
    for(i = 1, i < count, i++)
    {
        fd = events[i].data.fd
        if(fd == s_socket)
        {
            c_socket = accept(s_socket, client_address)
            event.events=EPOLLIN  // 设置监视类型
            // event.events = EPOLLIN | EPOLLET; //改成边缘触发
            // setnonblockingmode(c_socket); //将 accept 创建的套接字改为非阻塞模式
            event.data.fd=c_socket
            epoll_ctl(ep_fd, EPOLL_CTL_ADD, c_socket, &event)
        }else
        {
            ret = read(i, buf, buf_len)
            if(ret > 0)
            {
                write(fd, buf, buf_len)
            }else
            {
                epoll_ctl(ep_fd, EPOLL_CTL_DEL, fd, NULL);
                close(fd);
            }
            /* ET触发
            while(1) 
            {
                ret = read(i, buf, buf_len)
                if(ret > 0)
                {
                    write(fd, buf, buf_len)
                }else if(ret<0)
                {
                  if(errno = EAGAIN) braek;
                }
                else
                {
                    epoll_ctl(ep_fd, EPOLL_CTL_DEL, fd, NULL);
                    close(fd);
                }
            }
            */
         }
    }
}
close(s_socket)
close(ep_fd)
free(events)
events = NULL
```


** 水平触发(level trigger)和边缘触发(edge trigger)**
epoll默认以水平触发方式工作，select也是以条件触发模式工作的。
两者区别：在于发生事件的时间点
* 水平触发：只要输入缓冲有数据就一直通知该事件
比如：服务器端输入缓冲收到50字节数据时，read了30字节，还剩20，仍会触发事件
* 边缘触发：输入缓冲收到数据时仅注册一次事件，即使输入缓冲中还留有数据

* 边缘触发优点：
分离接收数据和处理数据的时间点，给服务端的实现带来很大灵活性。性能上使用得当会优于条件触发。
* 边缘触发的要点：
    1. read时缓存空，返回 -1，变量 errno 中的值变成 EAGAIN 时，说明没有数据可读
    2. 为了完成非阻塞（Non-blocking）I/O ，更改套接字特性。


```
/*


 *
 *  Created on: 2013年12月27日
 *      Author: xxx
 */


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/epoll.h>
#include <netinet/in.h>
#include <arpa/inet.h>


ssize_t socket_recv(int st)
{
    char buf[1024];
    memset(buf, 0, sizeof(buf));
    ssize_t rc = recv(st, buf, sizeof(buf), 0);
    if (rc <= 0)
    {
        printf("recv failed %s\n", strerror(errno));
    } else
    {
        printf("recv %s\n", buf);
        send(st, buf, rc, 0);
    }
    return rc;
}


int socket_accept(int listen_st)
{
    struct sockaddr_in client_addr;
    socklen_t len = sizeof(client_addr);
    memset(&client_addr, 0, sizeof(client_addr));
    int client_st = accept(listen_st, (struct sockaddr *) &client_addr, &len);
    if (client_st < 0)
        printf("accept failed %s\n", strerror(errno));
    else
        printf("accept by %s\n", inet_ntoa(client_addr.sin_addr));
    return client_st;
}


void setnonblocking(int st) //将socket设置为非阻塞
{
    int opts = fcntl(st, F_GETFL);
    if (opts < 0)
    {
        printf("fcntl failed %s\n", strerror(errno));
    }
    opts = opts | O_NONBLOCK;
    if (fcntl(st, F_SETFL, opts) < 0)
    {
        printf("fcntl failed %s\n", strerror(errno));
    }
}


int socket_create(int port)
{
    int st = socket(AF_INET, SOCK_STREAM, 0);
    int on = 1;
    if (setsockopt(st, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on)) == -1)
    {
        printf("setsockopt failed %s\n", strerror(errno));
        return 0;
    }
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if (bind(st, (struct sockaddr *) &addr, sizeof(addr)) == -1)
    {
        printf("bind port %d failed %s\n", port, strerror(errno));
        return 0;
    }
    if (listen(st, 300) == -1)
    {
        printf("listen failed %s\n", strerror(errno));
        return 0;
    }
    return st;
}


int main(int arg, char *args[])
{
    if (arg < 2)
        return -1;
    int iport = atoi(args[1]);    
    int listen_st = socket_create(iport);
    if (listen_st == 0)
        return -1;
    
    struct epoll_event ev, events[100]; //声明epoll_event结构体的变量,ev用于注册事件,数组用于回传要处理的事件
    memset(&ev, 0, sizeof(ev));
    memset(events, 0, sizeof(events));


    int epfd = epoll_create(100); //建立epoll描述符
    setnonblocking(listen_st); //把socket设置为非阻塞方式
    ev.data.fd = listen_st; //设置与要处理的事件相关的文件描述符
    ev.events = EPOLLIN | EPOLLERR | EPOLLHUP; //设置要处理的事件类型    
    if (epoll_ctl(epfd, EPOLL_CTL_ADD, listen_st, &ev) == -1) //注册epoll事件
    {
        printf("epoll_ctl error , %s\n", strerror(errno));
        return -1;
    }
    int st = 0;
    while (1)
    {
        int nfds = epoll_wait(epfd, events, 100, -1); //阻塞， 等待epoll事件的发生,100是和events[100]相对应的
        if (nfds == -1)               //events存放出事的socket
        {
            printf("epoll_wait failed %s\n", strerror(errno));
            break;
        }


        int i;
        for (i = 0; i < nfds; i++)  //遍历发生的事件
        {
            if (events[i].data.fd < 0)
                continue;


            if (events[i].data.fd == listen_st) //监测到一个SOCKET用户连接到了绑定的SOCKET端口，建立新的连接。
            {
                st = socket_accept(listen_st);
                if (st >= 0)
                {
                    setnonblocking(st);
                    ev.data.fd = st;
                    ev.events = EPOLLIN | EPOLLERR | EPOLLHUP; //设置要处理的事件类型？？？？？？
                    if (epoll_ctl(epfd, EPOLL_CTL_ADD, st, &ev) == -1)
                    {
                        printf("epoll_ctl error , %s\n", strerror(errno));
                    }
                    continue;
                }
            }
            if (events[i].events & EPOLLIN) //socket收到数据  ？？？？？？
            {
                st = events[i].data.fd;
                if (socket_recv(st) <= 0)
                {
                    if (epoll_ctl(epfd, EPOLL_CTL_DEL, st, NULL) == -1)
                    {
                        printf("epoll_ctl error , %s\n", strerror(errno));
                    }
                    close(st);
                }
            }
            if (events[i].events & EPOLLERR) //socket错误
            {
                st = events[i].data.fd;
                if (epoll_ctl(epfd, EPOLL_CTL_DEL, st, NULL) == -1)
                {
                    printf("epoll_ctl error , %s\n", strerror(errno));
                }
                close(st);
            }
            
            if (events[i].events & EPOLLHUP) //socket错误
            {
                st = events[i].data.fd;
                if (epoll_ctl(epfd, EPOLL_CTL_DEL, st, NULL) == -1)
                {
                    printf("epoll_ctl error , %s\n", strerror(errno));
                }
                close(st);
                events[i].data.fd=-1;//epoll会自动从池子里清除掉
            }
        }
    }
    close(epfd);
    return 0;
}




```

### 5.Proactor 和 Reactor：
这两种模式都是针对IO操作的，我的理解是Reactor只是告诉调用者什么时候事件到来，但是需要进行什么操作，需要调用者自己处理。Preactor不是当事件到来时通知，而是针对此事件对应的操作完成时，通知调用者，一般通知方式都是异步回调。
举例，Reactor中注册读事件，那么文件描述符可读时，需要调用者自己调用read系统调用读取数据，若工作在Preactor模式，注册读事件，同时提供一个buffer用于存储读取的数据，那么Preactor通过回调函数通知用户时，用户无需在调用系统调用读取数据，因为数据已经存储在buffer中了。显然epoll是Reactor的。

## UNIX Domain
### UNIX Domain Socket IPC
socket API原本是为网络通讯设计的，但后来在socket的框架上发展出一种IPC机制，就是UNIXDomain Socket。
UNIX Domain Socket也提供面向流和面向数据包两种API接口，类似于TCP和UDP，但是面向消息
的UNIX Domain Socket也是可靠的，消息既不会丢失也不会顺序错乱。
UNIX Domain Socket是全双工的，API接口语义丰富，相比其它IPC机制有明显的优越性，目前已成为使用最广泛的IPC机制。
#### 使用
使用UNIX Domain Socket的过程和网络socket十分相似，也要先调用socket()创建一
个socket文件描述符，address family指定为`AF_UNIX`，type可以选择SOCK_DGRAM或SOCK_STREAM，protocol参数仍然指定为0即可。
UNIX Domain Socket与网络socket编程最明显的不同在于**地址格式不同**，用结构
体sockaddr_un表示，网络编程的socket地址是IP地址加端口号，而UNIX Domain Socket的地
址是一个**socket类型的文件在文件系统中的路径**，这个socket文件由bind()调用创建，如果调
用bind()时该文件已存在，则bind()错误返回。
通过accept得到客户端地址也应该是一个socket文件，如果不
是socket文件就返回错误码，如果是socket文件，在建立连接后这个文件就没有用了，调
用unlink把它删掉，通过传出参数uidptr返回客户端程序的user id
#### 客户端显式的bind
与网络socket编程不同的是，UNIX Domain Socket客户端一般
要**显式调用bind函数**，而不依赖系统自动分配的地址。客户端bind一个自己指定的socket文件名
的好处是，该文件名可以包含客户端的pid以便服务器区分不同的客户端。


### AF_INET 和 AF_UNIX区别
#### 1.AF_INET域socket通信过程
![](https://sunxvming.com/imgs/25741395-5427-4821-a08d-f93c0385791b.png)

发送方、接收方依赖IP:Port来标识.
发送方通过系统调用send()将原始数据发送到操作系统内核缓冲区中。内核缓冲区从上到下依次经过TCP层、IP层、链路层的编码，分别添加对应的头部信息，经过网卡将一个数据包发送到网络中。经过网络路由到接收方的网卡。网卡通过系统中断将数据包通知到接收方的操作系统，再沿着发送方编码的反方向进行解码，即依次经过链路层、IP层、TCP层去除头部、检查校验等，最终将原始数据上报到接收方进程。
#### 2.AF_UNIX域socket通信过程
典型的本地IPC，**依赖路径名标识**发送方和接收方。即发送数据时，**指定接收方绑定的路径名**，操作系统根据该路径名可以直接找到对应的接收方，并**将原始数据直接拷贝到接收方的内核缓冲区中，并上报给接收方进程进行处理**。同样的接收方可以从收到的数据包中获取到发送方的路径名，并通过此路径名向其发送数据。
![](https://sunxvming.com/imgs/dd236489-47d7-4656-9e54-c21265c58da9.jpg)
#### 3.相同点
操作系统提供的接口socket(),bind(),connect(),accept(),send(),recv()，以及用来对其进行多路复用事件检测的select(),poll(),epoll()都是完全相同的。都有tcp和udp的协议。收发数据的过程中，上层应用感知不到底层的差别。
#### 4.不同点
* 建立socket传递的地址域，及bind()的地址结构稍有区别：
    + socket() 分别传递不同的域AF_INET和AF_UNIX
    + bind()的地址结构分别为sockaddr_in（制定IP端口）和sockaddr_un（指定路径名）
* AF_INET需经过多个协议层的编解码，消耗系统cpu，并且数据传输需要经过网卡，受到网卡带宽的限制，且网络层是不可靠的。
AF_UNIX数据到达内核缓冲区后，由内核根据指定路径名找到接收方socket对应的内核缓冲区，直接将数据拷贝过去，不经过协议层编解码，节省系统cpu，并且不经过网卡，因此不受网卡带宽的限制，通讯是可靠的。



