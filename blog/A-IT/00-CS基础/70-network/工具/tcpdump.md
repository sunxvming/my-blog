[原文地址](https://opensource.com/article/18/10/introduction-tcpdump)


# An introduction to using tcpdump at the Linux command line

## 1. Installation on Linux
## 2. Capturing packets with tcpdump
use the command `tcpdump -D` to see which interfaces are available for capture
```
# -c 数量   -nn不进行域名解析
tcpdump -i any -c5 -nn
```


## 3. Understanding the output format
[S]：SYN，表示开始连接
[.]：没有标记，一般是确认
[P]：PSH，表示数据推送
[F]：FIN，表示结束连接
[R] ：RST，表示重启连接
## 4. Filtering packets
Protocol
```
tcpdump -i any -c5 icmp
```
Host  Port 
```
tcpdump -i any -c5 -nn host 54.204.39.132   port 80
tcpdump -i any -c5 -nn "port 80 and (src 192.168.122.98 or dst 54.204.39.132)"
```
## 5. Checking packet content
tcpdump provides two additional flags: `-X` to print content in hex, and ASCII or -A to print the content in ASCII
This is helpful for troubleshooting issues with API calls, assuming the calls are using plain HTTP. For encrypted connections, this output is less useful.


## 6. Saving captures to a file
```
# 写入 -w
tcpdump -i any -c10 -nn -w webserver.pcap port 80
# 查看  -r
tcpdump -nn -r tcpdump.txt
```
This command saves the output in a file named webserver.pcap. The .pcap extension stands for "packet capture" and is the convention for this file format.
You can also use any of the filters we've discussed to filter the content from the file, just as you would with real-time data