
 HTTP 协议有一个缺陷：通信只能由客户端发起。
 只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。
 如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。
轮询的效率低，非常浪费资源，于是WebSocket 就是这样发明的。


特点包括：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。
（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
（3）数据格式比较轻量，性能开销小，通信高效。
（4）可以发送**文本** or **二进制数据**。
（5）没有同源限制，客户端可以与任意服务器通信。
（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。  `ws://example.com:80/some/path`



网页端例子：
```js
var ws = new WebSocket("wss://echo.websocket.org");   // 执行语句之后，客户端就会与服务器进行连接

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      

```


## WebSocket 工作流程

```
Client                         Server
  |                               |
  |----------TCP三次握手---------->|  1.TCP连接
  |<----------------------------->|
  |                               |
  |------HTTP Upgrade请求-------->|   2.发送HTTP Upgrade请求,升级协议。用的是http协议，GET请求
  |<-----101 Switching------------|
  |                               |
  |====== WebSocket连接建立 ====== |   3.WebSocket连接
  |                               |
  |<====== 双向通信 =============>|
  |                               |
  |----------TCP四次挥手---------->|
```

客户端请求：
```
GET /chat HTTP/1.1

Host: localhost:8080

Upgrade: websocket

Connection: Upgrade

Sec-WebSocket-Key:
dGhlIHNhbXBsZSBub25jZQ==

Sec-WebSocket-Version: 13
```

服务器响应：
```
HTTP/1.1 101 Switching Protocols

Upgrade: websocket

Connection: Upgrade

Sec-WebSocket-Accept:
s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```


WebSocket 并不是一种新的传输层连接，它是运行在 TCP 之上的应用层协议。
客户端先通过 TCP 三次握手建立 TCP 连接，然后利用这个 TCP 连接发送 HTTP Upgrade 请求；
服务器返回 `101 Switching Protocols` 后，双方才正式把这条 TCP 连接从 HTTP 协议切换为 WebSocket 协议。
从这一刻开始，后续数据都以 WebSocket Frame 的形式在同一条 TCP 连接上传输，直到最终通过 TCP 四次挥手关闭连接。


## WebSocket Frame


```plain
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

Frame 主要由 FIN、Opcode、Mask、Payload Length、Masking Key 和 Payload Data 组成。
- FIN 表示消息是否结束
- Opcode 表示数据类型（文本、二进制、Ping、Pong 、Close等）
- Payload Length 表示消息长度。
- 客户端发送的数据必须携带 Mask Key，并对 Payload 做 XOR 掩码处理；服务端发送给客户端则不需要 Mask。
- 接收方先解析帧头获取长度，再读取对应长度的数据，因此能够正确区分消息边界，避免 TCP 粘包拆包问题。



## 数据帧和控制帧

WebSocket帧可以分两大类
- 数据帧（Data Frame）：Text、Binary
- 控制帧（Control Frame）：Close、Ping、Pong

WebSocket 中 Opcode=0x8 表示 Close，用于正常关闭连接。当客户端关闭页面、服务端主动断开连接、协议错误或异常情况发生时，会发送 Close Frame，**双方完成 Close 握手后再关闭底层 TCP 连接**。

Opcode=0x9 表示 Ping，主要用于心跳检测和保活。连接建立后，客户端或服务端都可以定时发送 Ping 来检测对方是否仍然在线。

Opcode=0xA 表示 Pong，用于响应 Ping。根据 RFC6455，收到 Ping 后必须返回 Pong。实际项目中通常由服务端定时发送 Ping，如果连续多次收不到 Pong，则认为连接已经失效并主动关闭连接。

Ping/Pong 属于 WebSocket 应用层心跳机制，与 TCP KeepAlive 不同，检测周期可以由应用自由控制，因此更适合实时系统。