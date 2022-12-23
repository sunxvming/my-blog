1. 
```
vi /etc/sysconfig/network-scripts/ifcfg-ethxx

```


2.
```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static    # ip分配方式
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=30949b72-c749-4599-8cc4-061216b0650c
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.1.11    # 需要修改
GATEWAY=192.168.1.1    # 需要修改
NETMASK=255.255.255.0  # 需要修改
DNS1=8.8.8.8           # 需要修改
ZONE=
```
3.
```
service network restart
```