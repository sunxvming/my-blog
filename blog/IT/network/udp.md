# UDP的连接性和负载均衡


说起网络 socket，大家自然会想到 TCP ，用的最多也是 TCP，UDP 在大家的印象中是作为 TCP 的补充而存在，是无连接、不可靠、无序、无流量控制的传输层协议。UDP的无连接性已经深入人心，协议上的无连接性指的是一个 UDP 的 Endpoint1(IP,PORT)，可以向多个 UDP 的 Endpointi ( IP ， PORT )发送数据包，也可以接收来自多个 UDP 的 Endpointi(IP,PORT) 的数据包。实现上，考虑这样一个特殊情况：UDP Client 在 Endpoint_C1只往 UDP Server 的 Endpoint_S1 发送数据包，并且只接收来自 Endpoint_S1 的数据包，把 UDP 通信双方都固定下来，这样不就形成一条单向的虚”连接”了么？


## UDP的”连接性”
我们知道Linux系统有用户空间(用户态)和内核空间(内核态)之分，对于x86处理器以及大多数其它处理器，用户空间和内核空间之前的切换是比较耗时(涉及到上下文的保存和恢复，一般3种情况下会发生用户态到内核态的切换：发生系统调用时、产生异常时、中断时)。那么对于一个高性能的服务应该减少频繁不必要的上下文切换，如果切换无法避免，那么尽量减少用户空间和内核空间的数据交换，减少数据拷贝。熟悉socket编程的同学对下面几个系统调用应该比较熟悉了，由于UDP是基于用户数据报的，只要数据包准备好就应该调用一次send或sendto进行发包，当然包的大小完全由应用层逻辑决定的。


细看两个系统调用的参数便知道，sendto比send的参数多2个，这就意味着每次系统调用都要多拷贝一些数据到内核空间，同时，参数到内核空间后，内核还需要初始化一些临时的数据结构来存储这些参数值(主要是对端Endpoint_S的地址信息)，在数据包发出去后，内核还需要在合适的时候释放这些临时的数据结构。进行UDP通信的时候，如果首先调用`connect`绑定对端Endpoint_S的后，那么就可以直接调用send来给对端Endpoint_S发送UDP数据包了。用户在connect之后，内核会**永久维护一个存储对端Endpoint_S的地址信息的数据结构**，内核不再需要分配/删除这些数据结构，只需要查找就可以了，从而减少了数据的拷贝。这样对于connect方而言，该UDP通信在内核已经维护这一个“连接”了，那么在通信的整个过程中，内核都能随时追踪到这个“连接”。


```
int connect(int socket, const struct sockaddr *address,
              socklen_t address_len);             
ssize_t send(int socket, const void *buffer, size_t length, 
              int flags);
ssize_t sendto(int socket, const void *message, 
              size_t length,              
int flags, const struct sockaddr *dest_addr,
              socklen_t dest_len);
ssize_t recv(int socket, void *buffer, size_t length,
              int flags);
ssize_t recvfrom(int socket, void *restrict buffer, 
              size_t length,              
int flags, struct sockaddr *restrict address,
              socklen_t *restrict address_len);
```




## UDP的负载均衡
端口重用SO_REUSEADDR、SO_REUSEPORT


要进行多处理，就免不了要在相同的地址端口上处理数据，SO_REUSEADDR允许端口的重用，只要确保四元组的唯一性即可。对于TCP，在bind的时候所有可能产生四元组不唯一的bind都会被禁止(于是，ip相同的情况下，TCP套接字处于TIME_WAIT状态下的socket，才可以重复绑定使用)；对于connect，由于通信两端中的本端已经明确了，那么只允许connect从来没connect过的对端(在明确不会破坏四元组唯一性的connect才允许发送SYN包)；对于监听listen端，四元组的唯一性油connect端保证就OK了。


TCP通过连接来保证四元组的唯一性，一个connect请求过来，accept进程accept完这个请求后(当然不一定要单独accept进程)，就可以分配socket资源来标识这个连接，接着就可以分发给相应的worker进程去处理该连接后续的事情了。这样就可以在多核服务器中，同时有多个worker进程来同时处理多个并发请求，从而达到负载均衡，CPU资源能够被充分利用。


UDP的无连接状态(没有已有对端的信息)，使得UDP没有一个有效的办法来判断四元组是否冲突，于是对于新来的请求，UDP无法进行资源的预分配，于是多处理模式难以进行，最终只能“守株待兔“，UDP按照固定的算法查找目标UDP socket，这样每次查到的都是UDP socket列表固定位置的socket。UDP只是简单基于目的IP和目的端口来进行查找，这样在一个服务器上多个进程内创建多个绑定相同IP地址(SO_REUSEADDR)，相同端口的UDP socket，那么你会发现，只有最后一个创建的socket会接收到数据，其它的都是默默地等待，孤独地等待永远也收不到UDP数据。UDP这种只能单进程、单处理的方式将要破灭UDP高效的神话，你在一个多核的服务器上运行这样的UDP程序，会发现只有一个核在忙，其他CPU核心处于空闲的状态。创建多个绑定相同IP地址，相同端口的UDP程序，只会起到容灾备份的作用，不会起到负载均衡的作用。


要实现多处理，那么就要改变UDP Socket查找的考虑因素，对于调用了connect的UDP Client而言，由于其具有了“连接”性，通信双方都固定下来了，那么内核就可以根据4元组完全匹配的原则来匹配。于是对于不同的通信对端，可以查找到不同的UDP Socket从而实现多处理。而对于server端，在使用SO_REUSEPORT选项(linux 3.9以上内核)，这样在进行UDP socket查找的时候，源IP地址和源端口也参与进来了，内核查找算法可以保证：


* [1] 固定的四元组的UDP数据包总是查找到同一个UDP Socket；
* [2] 不同的四元组的UDP数据包可能会查找到不同的UDP Socket。
这样对于不同client发来的数据包就能查找到不同的UDP socket从而实现多处理。这样看来，似乎采用SO_REUSEADDR、SO_REUSEPORT这两个socket选项并利用内核的socket查找算法，我们在多核CPU服务器上多个进程内创建多个绑定相同端口，相同IP地址的UDP socket就能做到负载均衡充分利用多核CPU资源了。然而事情远没这么顺利、简单。






## UDP数据包的发送和接收问题

**(1) UDP的通信有界性**
在阻塞模式下，UDP的通信是以数据包作为界限的，即使server端的缓冲区再大也要按照client发包的次数来多次接收数据包，server只能一次一次的接收，client发送多少次，server就需接收多少次，即客户端分几次发送过来，服务端就必须按几次接收。


**(2) UDP数据包的无序性和非可靠性**
client依次发送1、2、3三个UDP数据包，server端先后调用3次接收函数，可能会依次收到3、2、1次序的数据包，收包可能是1、2、3的任意排列组合，也可能丢失一个或多个数据包。


**(3) UDP数据包的接收**
client发送两次UDP数据，第一次 500字节，第二次300字节，server端阻塞模式下接包，第一次recvfrom( 1000 )，收到是 1000，还是500，还是300，还是其他？
> 由于UDP通信的有界性，接收到只能是500或300，又由于UDP的无序性和非可靠性，接收到可能是300，也可能是500，也可能一直阻塞在recvfrom调用上，直到超时返回(也就是什么也收不到)。

在假定数据包是不丢失并且是按照发送顺序按序到达的情况下，server端阻塞模式下接包，先后三次调用：recvfrom( 200)，recvfrom( 1000)，recvfrom( 1000)，接收情况如何呢？
> 由于UDP通信的有界性，第一次recvfrom( 200)将接收第一个500字节的数据包，但是因为用户空间buf只有200字节，于是只会返回前面200字节，剩下300字节将丢弃。第二次recvfrom( 1000)将返回300字节，第三次recvfrom( 1000)将会阻塞。


**(4) UDP包分片问题**
如果MTU是1500，Client发送一个8000字节大小的UDP包，那么Server端阻塞模式下接包，在不丢包的情况下，recvfrom(9000)是收到1500，还是8000。如果某个IP分片丢失了，recvfrom(9000)，又返回什么呢？
> 根据UDP通信的有界性，在buf足够大的情况下，接收到的一定是一个**完整的数据包**，UDP数据在下层的分片和组片问题由IP层来处理，提交到UDP传输层一定是一个完整的UDP包，那么recvfrom(9000)将返回8000。如果某个IP分片丢失，udp里有个CRC检验，如果包不完整就会丢弃，也不会通知是否接收成功，所以UDP是不可靠的传输协议，那么recvfrom(9000)将阻塞。

## UDP数据包长度
**(1) UDP 报文大小的影响因素，主要有以下3个**
[1] UDP协议本身，UDP协议中有16位的UDP报文长度，那么UDP报文长度不能超过2^16=65536。
[2] 以太网(Ethernet)数据帧的长度，数据链路层的MTU(最大传输单元)。
[3] socket的UDP发送缓存区大小

**(2) UDP数据包最大长度**
根据 UDP 协议，从 UDP 数据包的包头可以看出，UDP 的最大包长度是2^16-1的个字节。由于UDP包头占8个字节，而在IP层进行封装后的IP包头占去20字节，所以这个是UDP数据包的最大理论长度是2^16 - 1 - 8 - 20 = 65507字节。如果发送的数据包超过65507字节，send或sendto函数会错误码1(Operation not permitted， Message too long)，当然啦，一个数据包能否发送65507字节，还和UDP发送缓冲区大小（linux下UDP发送缓冲区大小为：cat /proc/sys/net/core/wmem_default）相关，如果发送缓冲区小于65507字节，在发送一个数据包为65507字节的时候，send或sendto函数会错误码1(Operation not permitted， No buffer space available)。

**(3) UDP数据包理想长度**
理论上 UDP 报文最大长度是65507字节，实际上发送这么大的数据包效果最好吗？我们知道UDP是不可靠的传输协议，为了减少 UDP 包丢失的风险，我们最好能控制 UDP 包在下层协议的传输过程中不要被切割。相信大家都知道MTU这个概念。 MTU 最大传输单元，这个最大传输单元实际上和链路层协议有着密切的关系，EthernetII 帧的结构 DMAC + SMAC + Type + Data + CRC 由于以太网传输电气方面的限制，每个以太网帧都有最小的大小64字节，最大不能超过1518字节，对于小于或者大于这个限制的以太网帧我们都可以视之为错误的数据帧，一般的以太网转发设备会丢弃这些数据帧。由于以太网 EthernetII 最大的数据帧是1518字节，除去以太网帧的帧头（DMAC目的 MAC 地址48bit=6Bytes+SMAC源 MAC 地址48bit=6Bytes+Type域2bytes）14Bytes和帧尾CRC校验部分4Bytes那么剩下承载上层协议的地方也就是Data域最大就只能有1500字节这个值我们就把它称之为MTU。
在下层数据链路层最大传输单元是1500字节的情况下，要想IP层不分包，那么UDP数据包的最大大小应该是1500字节 – IP头(20字节) – UDP头(8字节) = 1472字节。不过鉴于Internet上的标准MTU值为576字节，所以建议在进行Internet的UDP编程时，最好将UDP的数据长度控制在 (576-8-20)548字节以内。


## UDP丢包问题
在不考虑UDP下层IP层的分片丢失，CRC检验包不完整的情况下，造成UDP丢包的因素有哪些呢？


**[1] UDP socket缓冲区满造成的UDP丢包**
通过 cat /proc/sys/net/core/rmem_default 和cat /proc/sys/net/core/rmem_max可以查看socket缓冲区的缺省值和最大值。如果socket缓冲区满了，应用程序没来得及处理在缓冲区中的UDP包，那么后续来的UDP包会被内核丢弃，造成丢包。在socket缓冲区满造成丢包的情况下，可以通过增大缓冲区的方法来缓解UDP丢包问题。但是，如果服务已经过载了，简单的增大缓冲区并不能解决问题，反而会造成滚雪球效应，造成请求全部超时，服务不可用。


**[2] UDP socket缓冲区过小造成的UDP丢包**
如果Client发送的UDP报文很大，而socket缓冲区过小无法容下该UDP报文，那么该报文就会丢失。


**[3] ARP缓存过期导致UDP丢包**
ARP 的缓存时间约10分钟，APR 缓存列表没有对方的 MAC 地址或缓存过期的时候，会发送 ARP 请求获取 MAC 地址，在没有获取到 MAC 地址之前，用户发送出去的 UDP 数据包会被内核缓存到 arp_queue 这个队列中，默认最多缓存3个包，多余的 UDP 包会被丢弃。被丢弃的 UDP 包可以从 /proc/net/stat/arp_cache 的最后一列的 unresolved_discards 看到。当然我们可以通过 echo 30 > /proc/sys/net/ipv4/neigh/eth1/unres_qlen 来增大可以缓存的 UDP 包。
UDP 的丢包信息可以从 cat /proc/net/udp 的最后一列drops中得到，而倒数第四列 inode 是丢失 UDP 数据包的 socket 的全局唯一的虚拟i节点号，可以通过这个 inode 号结合 lsof ( lsof -P -n | grep 25445445)来查到具体的进程。






## 参考链接
- [告知你不为人知的 UDP：连接性和负载均衡](https://cloud.tencent.com/developer/article/1004555)
- [告知你不为人知的 UDP：疑难杂症和使用](https://cloud.tencent.com/developer/article/1004554)







































