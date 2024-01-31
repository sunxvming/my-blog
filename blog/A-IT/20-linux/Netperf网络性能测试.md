Netperf 是一种网络性能测量工具，主要基于 TCP 或 UDP 的传输。Netperf可以进行不同模式的网络性能测试，如**批量数据传输**（bulk data transfer）模式和**请求/应答**（request/reponse）模式。


## 工作原理
Netperf 工具以 client/server 方式工作。server 端是 `netserver`，用来侦听来自 client 端的连接，client 端是 `netperf` ，用来向 server 发起网络测试。
在client与server之间,首先建立一个控制连接,传递有关测试配置的信息,以及测试的结果: 在控制连接建立并传递了测试配置信息以后，client与server之间会再建立一个测试连接,进行来回传递特殊的流量模式,以测试网络的性能