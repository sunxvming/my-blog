## 安装启动

创建虚拟磁盘
```
qemu-img create -f raw d:/program/qvm/kylin_arm64.img 50G
```

安装麒麟系统
```
qemu-system-aarch64.exe -m 20G -cpu cortex-a72 --accel tcg,thread=multi -M virt -bios d:\soft\QEMU_EFI.fd -rtc base=localtime -display sdl -device VGA -device nec-usb-xhci -device usb-tablet -device usb-kbd -drive if=virtio,file=d:\program\qvm\kylin_arm64.img,id=hd0,format=raw,media=disk -drive if=none,file=d:\soft\Kylin-Desktop-V10-Phytium-aarch64.iso,id=cdrom,media=cdrom -device virtio-scsi-device -device scsi-cd,drive=cdrom
```

启动脚本启动虚拟机
```
qemu-system-aarch64 -m 12G -cpu cortex-a72  --accel tcg,thread=multi -M virt -bios d:\soft\QEMU_EFI.fd -rtc base=localtime -display gtk -device VGA -device nec-usb-xhci -device usb-tablet -device usb-kbd -drive if=virtio,file=d:\program\qvm\kylin_arm64.img,id=hd0,format=raw,media=disk -net nic,model=virtio -net tap,ifname=tap0
```


## 遇到问题

### 安装系统时退出
下载了1.最新的qemu、1.QEMU_EFI.fd、3.麒麟系统，在进行安装时显示了qemu的窗口，窗口上显示`guest has not initialized the display`的错误，几秒后窗口便消失，程序退出。在用mobaXterm打开本地的terminal执行安装系统的命令时也是产生上述的现象，并在terminal中多输出了一个`Segmentation fault`。
起初以为仅仅是显示的错误而已，于是便在网上查询相关的解决方案，试了好多都不成功。于是有以下的猜想：
1. 麒麟系统镜像有问题
2. QEMU_EFI.fd有问题
3. 我自己电脑win11系统的问题

于是把安装时的镜像参数换成一个假的镜像，但是依然报错，先排除了镜像的问题。下班后也查到原因。
回家后在自己的dell的win10系统的电脑上安装了最新qemu、QEMU_EFI.fd、麒麟系统，安装系统的时还是一样的问题，猜想是不是qemu版本的问题，于是又下载了一个一年前的qemu版本，运行时直接报dll缺失的问题，于是又换了一个几个月前的版本，运行时便没有上述问题了。结论是有些软件最新版本可能会有问题，旧的版本也可能会有问题，就看你如何选择什么样的版本了。

### 运行虚拟机时运行太慢，发现cpu只有1核
这个慢指两方面：1、安装系统时，可能得俩小时以上  2、启动系统时，可能得好几分钟才能启动好。
在用`-smp 8,sockets=4,cores=2`参数指定多核后运行系统后qemu便退出运行。但是换成`-smp 1`后便可以运行。
经过查询发现在x86的系统用qemu运行arm架构的虚拟机，使用 `-smp` 参数设置虚拟机的多核配置只适用于相同架构的虚拟机，而在不同的架构下不能启用硬件虚拟加速，只能用`--accel tcg,thread=multi`参数进行软件的加速，速度会比硬件加速的慢。
于是就不折腾这个加速的东西了，命令行连接虚拟机的话速度也不会太慢的。

### 本地宿主机ssh无法到虚拟机
检查步骤：
1. 防火墙。宿主机和虚拟机的防火墙都要关掉，麒麟系统虚拟机在图形化界面设置里面也有防火墙的设置，也需要关掉。windows的系统防火墙也需要关掉。不然双方都ping不通
2. ssh服务器是否安装、启动、运行、监听22端口
3. ssh的配置，是否允许密码登录、是否允许root运行登录等设置


## 虚拟机和宿主机互连且可连网

### TAP-Windows Adapter V9
TAP-Windows Adapter V9 是一种网络适配器，通常与虚拟私人网络（Virtual Private Network，VPN）软件相关联。它是由OpenVPN项目开发的一种虚拟网络适配器驱动程序。

TAP-Windows Adapter V9 允许 VPN 软件在 Windows 操作系统上创建虚拟网络接口，以便在建立 VPN 连接时通过该接口进行网络通信。这样可以实现对网络流量的加密和隧道化，以增加网络安全性和保护用户的隐私。

当您安装某些 VPN 软件时，例如 OpenVPN 或 NordVPN，它们通常会为其 VPN 连接创建一个虚拟网络适配器。TAP-Windows Adapter V9 就是用于实现这种功能的虚拟网络适配器。

### 配置步骤
1. 创建TAP-Windows Adapter V9网卡，命名为tap0
2. 把连网的网卡共享给tap0，
3. ![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230713112235.png)
4. 设置共享后tap0的网卡会被设置成如下的ip
5. ![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230713112452.png)
6. 可以看到宿主机共享了网络后，tap0网卡的IP地址变为了192.168.137.1,这个地址即是虚拟机系统中网络的网关地址，掩码即是虚拟机系统中网络的子网掩码。
7. 运行虚拟机，查看虚拟机的ip为192.168.137.xxx，和tap0在一个网段当中，说明在一个网络里面





## 参考链接
- [Windows上使用QEMU创建银河麒麟ARM64虚拟机完全手册 - 程语有云 - 博客园](https://www.cnblogs.com/mylibs/p/kylin-arm64-with-qemu-on-windows.html)
- [Win10桥接网卡使得qemu虚拟机能和宿主机互相通讯且能正常访问网络](https://blog.csdn.net/qq_37823156/article/details/129354546)
- [ 使用Qemu在Windows上模拟arm平台并安装国产化操作系统](https://blog.csdn.net/EmptyStupid/article/details/127949231)