自动识别系统（Automatic Identification System，AIS），是安装在船舶上的一套自动追踪系统
由AIS所发出的讯息包括独特的识别码、船名、位置、航向、船速，并显示在AIS的萤幕或电子海图上。
国际海事组织中《国际海上人命安全公约》（SOLAS）要求航行于国际水域，总吨位在300以上之船舶，以及所有不论吨位大小的客船，均应安装AIS。
AIS的主要目的是允许船舶查看其所在地区的海上交通，并被该交通看到。
AIS的最初目的仅仅是避免碰撞，但此后已经开发并继续开发许多其他应用程序。AIS目前用于：
避 碰、渔船队监测和控制、海事安全、导航辅助

AIS 收发器通过收发器内置的 VHF 发射器定期自动广播信息，例如其位置、速度和导航状态。这些信息来自船舶的导航传感器，通常是其全球导航卫星系统（GNSS）接收器和陀螺罗盘。





## 协议格式
!AIVDM（从其他船只接收数据）
!AIVDO（自有船只的信息）


AIS协议定义了数据传输的格式，以下是AIS消息的基本格式：

1. 起始位（Start Bit）：用于指示消息的开始，固定为二进制0。
2. 消息类型（Message Type）：指示消息的类型，占6个比特位，共有27种不同类型的消息。
3. MMSI（Maritime Mobile Service Identity）：船舶的唯一标识号码，占30个比特位。
4. 航行状态（Navigational Status）：指示船舶的航行状态，占4个比特位。
5. 转向率（Rate of Turn）：指示船舶的转向率，占8个比特位。
6. 速度（Speed Over Ground）：船舶的地速，以节为单位，占10个比特位。
7. 精度（Position Accuracy）：指示船舶位置的精确度，占1个比特位。
8. 经度（Longitude）：船舶的经度信息，占28个比特位。
9. 纬度（Latitude）：船舶的纬度信息，占27个比特位。
10. 航向（Course Over Ground）：船舶的航向，以度为单位，占12个比特位。
11. 时间戳（Timestamp）：指示数据的时间戳信息，占6个比特位。
12. 特定信息（Specific Information）：根据消息类型的不同，可能包含特定的附加信息。
13. 停止位（Stop Bit）：用于指示消息的结束，固定为二进制1。


AIVDM消息中的MessageType字段表示AIS消息的类型。每个AIS消息类型都有一个唯一的MessageType值，用于标识消息类型。以下是一些常见的AIS消息类型及其对应的MessageType值：
1. Position Report (Class A): MessageType 1, 2, 3 - 船舶位置报告（A类）
2. Position Report (Class B): MessageType 18, 19 - 船舶位置报告（B类）
3. Static and Voyage Related Data: MessageType 5, 24 - 静态和航行相关数据
4. Aids to Navigation: MessageType 21 - 航标辅助信息
5. Safety Related Message: MessageType 6 - 安全相关消息
6. Binary Addressed Message: MessageType 8, 9 - 二进制寻址消息
7. Binary Broadcast Message: MessageType 7 - 二进制广播消息
8. Standard SAR Aircraft Position Report: MessageType 4 - 标准搜救飞机位置报告
9. Base Station Report: MessageType 21 - 基站报告

A类消息通常由较大的商船或船舶发送，发送频率更高，提供更详细的船只信息。而B类消息主要由小型船只、渔船等非商业船只发送

```
$GNGLL
$GNGLL,<纬度>,<纬度方向>,<经度>,<经度方向>,<UTC时间>,<状态>,<校验和>*<校验和>\r\n
```

各字段的含义如下：
- `<纬度>`：纬度值，格式为十进制度分（DDMM.MMMM）。
- `<纬度方向>`：纬度的方向，可以是`N`（北半球）或`S`（南半球）。
- `<经度>`：经度值，格式为十进制度分（DDDMM.MMMM）。
- `<经度方向>`：经度的方向，可以是`E`（东经）或`W`（西经）。
- `<UTC时间>`：协调世界时（UTC）时间，格式为HHMMSS.SSS。
- `<状态>`：定位状态，表示GPS定位的质量和状态。
- `<校验和>`：校验和，用于数据完整性验证。


### 自定义格式
aipov   heading  pitch  roll  utctime 
罗经信息  



### 协议模拟发送工具
[NemaStudio](https://www.sailsoft.nl/ais_simulator.html),通过模拟各种航海仪器和目标对象包括GPS，AIS和雷达的输出非常强大的开发和测试工具









## 参考资料
- [Automatic identification system - Wikipedia](https://en.wikipedia.org/wiki/Automatic_identification_system)
- [船舶定位AIS数据源是从哪来的？ - 知乎](https://www.zhihu.com/question/21633927)