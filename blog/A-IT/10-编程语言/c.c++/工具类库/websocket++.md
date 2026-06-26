在C++环境下使用websocket，比较常用的有2个库：websocket++ 和 libwebsockets。 
前者是用C++写的，依赖C++11和boost， 后者是用C语言写的，依赖openssl

websocket++ [github](https://github.com/zaphoyd/websocketpp) [官方网站]( https://www.zaphoyd.com/projects/websocketpp/)



| 库                 | 语言  | 底层依赖                   | 编程模型                 | 性能     | 易用性   | 工业使用  | 典型场景                 |
| ----------------- | --- | ---------------------- | -------------------- | ------ | ----- | ----- | -------------------- |
| **Boost.Beast**   | C++ | Boost.Asio             | Reactor / async IO   | ⭐⭐⭐⭐⭐  | ⭐⭐⭐   | ⭐⭐⭐⭐⭐ | 工业后端 / AOI / 现代C++服务 |
| **libwebsockets** | C   | OpenSSL + epoll/kqueue | event loop (Reactor) | ⭐⭐⭐⭐⭐  | ⭐⭐    | ⭐⭐⭐⭐⭐ | 嵌入式 / 工业设备 / 高并发     |
| **uWebSockets**   | C++ | epoll / io_uring       | 极致事件驱动               | ⭐⭐⭐⭐⭐⭐ | ⭐⭐    | ⭐⭐⭐⭐  | 高频交易 / 超高并发推送        |
| **websocket++**   | C++ | Boost.Asio             | async callback       | ⭐⭐⭐⭐   | ⭐⭐⭐⭐  | ⭐⭐⭐   | 中小型服务 / 教学 / 偏旧      |
| **Drogon**        | C++ | Boost.Asio / 自研        | 框架式MVC               | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐  | Web后端 / REST + WS    |
| **Poco**          | C++ | 自带网络栈                  | OO封装                 | ⭐⭐⭐    | ⭐⭐⭐⭐  | ⭐⭐⭐   | 工业软件 / 设备控制          |
| **Qt WebSocket**  | C++ | Qt Network             | Qt event loop        | ⭐⭐⭐    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | 桌面客户端 / GUI系统        |

