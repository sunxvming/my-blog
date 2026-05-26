
## 如何配置国内yum源镜像
CentOS发行版作为**红帽RedHat商业发行版的下游社区版本**，因其稳定性极佳，并且提供LTS长期技术支持，所以备受企业客户们的喜爱。丰盘ECM作为一款企业级私有部署的文档管理软件，出于稳定可靠性考虑，最早也是推荐CentOS作为首选操作系统。

而当IBM在2018年年底收购了红帽之后，红帽调整了RedHat和CentOS的发行策略，推出CentOS Stream发行版，**将CentOS从原先红帽RedHat商业发行版的代码下游分支转变为上游分支**，相当于变成了红帽RedHat系统新特性的试验田。这意味着，后续官方发行的CentOS Stream，将会有更频繁的代码变更，以及实验特性的加入，没有了原先稳定性的优势。

**2024年6月30号，CentOS发行版的最后一个LTS长周期版本的支持服务正式终止**，官方的yum源也会下架。如果您单位仍在使用CentOS 7/8的旧版本，那么Linux系统管理员执行 `yum install` 安装软件包的时候都会报错，自然也就无法安装Docker以及丰盘ECM系统。

您有几种解决方案可选择：

- **将系统内置yum源切换成国内第三方维护的镜像站点；**
- 升级至CentOS Stream系列，如CentOS Stream 9的生命周期可至2027年；
- 替换为与CentOS/RedHat二进制兼容的发行版Rocky Linux/Alma Linux/Anolis OS，运维技术和操作习惯接近；
- 切换至Debian/Ubuntu等其他主流发行版，与CentOS二进制不兼容，运维技术和操作习惯差异较大；

以下介绍第一种方案，在旧的CentOS发行版上切换至国内可用的镜像站点，切换成功之后，您可以运行丰盘自动化安装脚本，实现系统快速部署。

### 1. 备份系统原始yum源配置文件

将系统内置或手工配置的yum源配置文件移动至至新的目录，例如 `/etc/yum.repos.d/bak240712/` ，这样后续如果想恢复或者重置也比较方便。**注意，如果不移走的话，最后步骤「重建本地缓存」的时候，有可能会受到老配置文件的影响而失败。**

bash

```
# 创建备份文件夹
sudo mkdir -p /etc/yum.repos.d/bak$(date +"%y%m%d")
# 将源配置移动至备份文件夹
sudo mv /etc/yum.repos.d/*.repo /etc/yum.repos.d/bak$(date +"%y%m%d")
```

### 2. 下载阿里云等镜像站的yum配置文件 

国内目前有很多知名的yum源镜像站点，首选三大公有云厂商（阿里云、腾讯云和华为云）的站点，镜像访问比较稳定。

以阿里云为例，可访问 [https://mirrors.aliyun.com/repo/](https://mirrors.aliyun.com/repo/) 地址查看相关镜像清单。


在Linux终端根据当前操作系统版本下载不同的yum配置文件，由于Docker系统无法安装在Centos6上，此处推荐使用业界较为广泛使用的Centos7.9版本。

```
# 推荐Centos7
sudo wget -O /etc/yum.repos.d/Centos-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# Centos8
sudo wget -O /etc/yum.repos.d/Centos-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```


然后**下载epel源配置文件。**

EPEL (Extra Packages for Enterprise Linux) 是一个为 企业级Linux发行版提供额外软件包的项目，由 Fedora 社区维护，旨在为这些 Linux 发行版提供高质量的附加软件包。


```
# 推荐Centos7
sudo wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

# Centos8
sudo wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-archive-8.repo
```



### 3重建本地缓存 

```
# 运行以下两行命令重建本地缓存即可生效
sudo yum clean all && yum makecache

# 测试安装软件包是否正常
sudo yum install curl wget
```

### 参考链接
- [CentOS停服后如何配置国内yum源镜像 | 丰盘ECM帮助中心](https://www.ekbcloud.com/docs/admin_manual/centos.html)
- [CentOS 7.6镜像下载_centos7.6镜像-CSDN博客](https://blog.csdn.net/zhyue77yuyi/article/details/124702213)


## Centos7升级GCC8版本
1.安装scl源：
yum install centos-release-scl scl-utils-build

2.列出scl可用源
yum list all --enablerepo='centos-sclo-rh' | grep "devtoolset-"

3.安装8版本的gcc、gcc-c++、gdb工具链（toolchian）：
yum install -y devtoolset-8-toolchain
scl enable devtoolset-8 bash
gcc --version


**如何让 devtoolset-8 永久生效**


1.在用户级别永久生效
```
vim ~/.bashrc
# 在文件末尾添加这一行：
source /opt/rh/devtoolset-8/enable

# 保存退出后执行
source ~/.bashrc
```

2.系统级别永久生效
```
sudo sh -c 'echo "source /opt/rh/devtoolset-8/enable" >> /etc/profile'

source /etc/profile
```



## centos7安装opengl库
当你在 **Red Hat 7**（或 CentOS 7）上编译程序时遇到错误：
```
/usr/bin/ld: cannot find -lGL
collect2: error: ld returned 1 exit status
```

编译参数 `-lGL` 表示链接 OpenGL 主库 `libGL.so`。  
在 Red Hat 7 上，这个库通常由 **Mesa** 提供。执行以下命令进行安装
```
sudo yum install mesa-libGL-devel mesa-libGLU-devel
```


## centos修改ip地址
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
IPADDR=192.168.1.21    # 需要修改
GATEWAY=192.168.1.1    # 需要修改
NETMASK=255.255.255.0  # 需要修改
DNS1=8.8.8.8           # 需要修改
ZONE=
```
3.
```
service network restart
```


## centos7无法识别U盘
插上u盘，在文件管理其中应该能看到u盘，

在centons 7中打开U盘，报错file [type](https://so.csdn.net/so/search?q=type&spm=1001.2101.3001.7020) exfat not configured in kernel。
这是因为Linux采用的文件系统和我U盘的文件系统不一致引起。U盘的文件系统是exFat。


**解决方法**
既然已知文件系统不支持导致，那么只要在Linux 下载安装用于读写ExFAT文件系统的工具和库就可以解决了。具体的下载安装命令如下

```bash
yum install -y http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-1.el7.nux.noarch.rpm 
yum install exfat-utils fuse-exfat
```



