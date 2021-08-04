【windows和linux差异】
windows下的换行是\r\n
linux下的换行是\n
mac下的换行是\r
windows下的文件上传到linux上文件的/r/n，可能会被上传的软件自动变变成适应linux上的格式
如果不是，记得转换格式
【注意】
拿到一台linux机器的时候要先看看是什么版本的，因为不同版本的命令是有些差别的
```
# 查看内核/操作系统信息
uname -a
cat  /etc/*-release
cat  /proc/version

# Linux查看glibc安装版本
64bit：strings /lib64/libc.so.6 |grep GLIBC
32bit：strings /lib/libc.so.6 |grep GLIBC
```

## shell
```
man帮助
1   Executable programs or shell commands
2   System calls (functions provided by the kernel)
3   Library calls (functions within program libraries)

shell配置
----------------------
系统级的   
    /etc/profile    System wide environment and startup programs written here
    /etc/bashrc     System wide functions and aliases written here

用户级的
    ~/.bash_profile
    ~/.bashrc  rc  run commands的缩写
设置可以在当前目录查找可执行文件的方法
    打开宿主目录下的用户配置文件”.bash_profile”
    在PATH后面追加”:.”  
    source .bash_profile
source
    这个命令其实只是简单地读取脚本里面的语句依次在当前shell里面执行，没有建立新的子shell。
    那么脚本里面所有新建、改变变量的语句都会保存在当前shell里面。
    source命令通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录
    source命令(从C Shell而来)是bash shell的内置命令;点命令(.),(从Bourne Shell而来)是source的另一名称
    sh filename和./filename，重新建立一个子shell，在子shell中执行脚本里面的语句，该子shell继承父shell
    的环境变量，但子shell新建的、改变的变量不会被带回父shell，

环境变量
-------------
env  # 查看环境变量资源

export  查看所有环境变量
修改环境变量
查看path环境变量 echo $PATH
export PATH=$PATH:/home/uusama/mysql/bin

命令的输入
-------------------------
<<< here string
md5sum <<< ddd  等同于 echo ddd | md5sum

<<  here document
md5sum << END
ddd
END
```

## 磁盘管理
```
fdisk -l                  查看所有磁盘
fdisk /dev/sda            对/dev/sda进行分区
mkfs -t ext3 /dev/sdb1    格式化磁盘为ext3系统
parted /dev/sdb           查看某个硬盘信息

df(Disk free) -B --block-size=GB df --block-size=MB 查看磁盘使用情况

du(Disk usage) -h 查看目录大小   默认是递归的
du -h --max-depth=1 work/testing    指定查看的深度

mount /dev/hda2 /mnt/hda2 挂载一个叫做hda2的盘到/mnt/hda2  确保'/mnt/hda2'已经存在 
umount /dev/hda2 卸载一个叫做hda2的盘 - 先从挂载点 '/mnt/hda2' 退出 
```

## 目录和文件
```
【基础操作】
cd - 返回上次所在的目录 
ls -lSr|less 以尺寸大小排列文件和目录 
ls -R 递归显示

tree 显示目录结构，需要额外下载此程序 

touch  新建文件
mkdir -p /path  创建级联目录

ln xx xx 建立硬链接,不能建立指向目录的硬链接 
ln -s xx xx 软连接 

file filename 查看文件的类型详细信息

cp -R 源路径 新路径     --recursive
scp root@192.168.2.208:/home/a.txt /home 
scp 服务器用户名@iP地址:服务端文件路径 客户端保存路径

【文件权限】
chmod 755 for.sh  绝对法 4r 2w 1x
chmod o+x for.sh  相对法 u  g o
chmod u=rwx,og=rx for.sh

chown user1:group1 file1 改变file1的所有人和群组属性 
chown -R  use1 /var/www/food   递归的

chgrp group1 file1 改变file1的群组

chattr  文件的特殊属性 - 使用 "+" 设置权限，使用 "-" 用于取消 
chattr +a file1 只允许以追加方式读写文件 
chattr +i file1 设置成不可变的文件，不能被删除、修改、重命名或者链接 

umask  指定用户创建文件时的掩码
```

## 文本工具
```
cat more less head tail 

cat aa.txt bb.txt > cc.txt  合并到一个文件
cat file1 | command( sed, grep, awk, grep, etc...) > result.txt 

tail -f /var/log/messages 实时查看被添加到一个文件中的内容 

od    按照八进制、十六进制、ascii显示文本
hexdump -C test.bc   查看二进制文件

cut - remove sections from each line of files
cut -d: -f1 /etc/passwd

wc 统计数量 -l 或–lines 只显示列数。-w 或–words 只显示字数。 

【格式转换】
iconv - convert text from one character encoding to another
dos2unix filedos.txt  fileunix.txt 将一个文本文件的格式从MSDOS转换成UNIX 
unix2dos fileunix.txt filedos.txt 将一个文本文件的格式从UNIX转换成MSDOS 

indent是linux下的一个代码格式的的工具，格式化c代码    
indent -bad -bli 0 -ce -kr -nsob --space-after-if --space-after-while --space-after-for --use-tabs -i8
```

## 查找与检索
```
find [OPTION] path… [expression] 
find /root/me -name 'file*' 

locate filename  查找filename
locate \*.ps 寻找以 '.ps' 结尾的文件
locate 与 find 不同: find 是去硬盘找，locate 只在 /var/lib/slocate数据库中找，
locate 的查找并不是实时的，运行updatedb，重新建立数据库索引

grep -n 'eee' hello.txt  在hello.txt查找eee, -n是显示行号 
grep 'printf' /usr/include -R 递归的在目录中查找

whereis halt  显示一个二进制文件、源码或man的位置,比which显示的信息更多 
which halt    显示一个二进制文件或可执行文件的完整路径 

find的 -exec参数
-exec 参数后面跟的是command命令，它的终止是以;为结束标志的，所以这句命令后面的分号是不可缺少的，考虑到各个系统中分号会有不同的意义，所以前面加反斜杠。
{} 花括号代表前面find查找出来的文件名。

exec和xargs参数区别
exec参数是一个一个传递的，传递一个参数执行一次命令；xargs一次性将所有参数传给命令

#xargs将参数一次传给echo，即执行：echo begin ./11.txt ./22.txt
find . -name '*.txt' -type f | xargs echo begin

#exec一次传递一个参数，即执行：echo begin ./11.txt;  echo begin ./22.txt
find . -name '*.txt' -type f -exec echo begin {} \;
```


## 打包和压缩文件
```
zip   file1.zip file1 
unzip file1.zip     

tar -zcvf archive.tar.gz dir1    创建一个gzip格式的压缩包 
tar -zxvf archive.tar.gz         解压一个gzip格式的压缩包 
```

## 系统管理
```
shutdown -h now 关机
shutdown -r now 重启
reboot          重启

who    查看登录的用户    
last   查看用户登录日志
pkill -kill -t pts/2   踢人

crontab -l # 查看当前用户的计划任务服务
用crontab执行shell脚本的时候要注意给脚本可执行的权限，要不会报permision deny的错误

less /etc/passwd # 查看系统所有用户
less /etc/group  # 查看系统所有组

date  查看日期时间
```

## 用户和用户组管理
```
whoami   查看当前用户
useradd user1 创建一个新用户 
    用useradd增长一个新用户之后,还不能立即使用,得给新用户设一个密码才可以使用.
useradd -c "Name Surname " -g admin -d /home/user1 -s /bin/bash user1 创建一个属于 "admin" 用户组的用户 
userdel -r user1 删除一个用户 ( '-r' 排除主目录) 
usermod -c "User FTP" -g system -d /ftp/user1 -s /bin/nologin user1 修改用户属性 

groupadd group_name 创建一个新用户组 
groupdel group_name 删除一个用户组 
groupmod -n new_group_name old_group_name 重命名一个用户组

passwd user1 修改一个用户的口令 (只允许root执行) 

su – root 切换到root -中间有空格
    加-后,环境变量这些什么的都切换成其他用户的，不加则没有
```

## 进程管理
```
每个进程启动之后在 /proc下面有一个于pid对应的路径，进入进程号的目录后可以得到很多关于进程的信息

查看所有进程
ps aux  或   ps -ef 

pwdx <pid>  通过pid 寻找程序路径

ctrl+z  程序已经在前台运行，执行ctrl+z就可以放入后台
fg      把后台执行的程序恢复到前台来运行

jobs    列出所有在后台执行的进程
fg %number  jobs命令列出的，中括号([ ])里面的数字就是 jobs 的代号，通过fg %number 就可以恢复指定的后台进程
bg %number  放到后台运行

nohup /opt/lampp/sbin/mysqld &    no hang up
nohup command >out.file 2>&1 &    后台运行处理输出

kill -l 列出所有信号
kill pid 向pid的进程发送kill信号
pkill -9 http

top    实时显示进程状态用户

free -m -s 3    -s 表示刷新的时间间隔,秒为单位
```

## 系统监控
```
ulimit -n   查看最大fd

查看所有进程打开的句柄数,输出格式：fds pid
lsof -n|awk '{print $2}'|sort|uniq -c|sort -nr|less
find /proc -print | grep -P '/proc/\d+/fd/'| awk -F '/' '{print $3}' | uniq -c | sort -rn | head

CentOS 7中的lsof是按PID/TID/file的组合显示结果的,多个线程中会重复打印同一个fd
同一个进程如果多个线程访问同一个文件通常只需要打开一次、占用一个fd，但在lsof中就显示多行。
下面的命令其实也没有太大意义
lsof -n|awk '{print $2}'|sort|uniq -c|sort -nr|less

这个比较准：
find /proc -print | grep -P '/proc/\d+/fd/'| awk -F '/' '{print $3}' | uniq -c | sort -rn | head

看某个具体的进程：
    lsof  -n -p <pid>
    ls -l /proc/<pid>/fd | wc -l

```

## 网络命令
```
网络配置文件 /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0 #物理设备名
IPADDR=192.168.1.10   #IP地址
NETMASK=255.255.255.0 #掩码值
GATEWAY=192.168.1.1   #网关地址
ONBOOT=yes            # [yes|no]（引导时是否激活设备）
USERCTL=no            #[yes|no]（非root用户是否可以控制该设备）
BOOTPROTO=static      #[none|static|bootp|dhcp]（引导时不使用协议|静态分配|BOOTP协议|DHCP协议）
DNS1=8.8.8.8          #dns
ping  主机名/IP地址

ifconfig     查看网卡信息
ifconfig eth0 down/up  关闭开启网卡

netstat -apn  | grep 80       a全部状态的全部连接 p显示pid  n Do not try to resolve service names.
netstat -antp # 查看所有tcp连接，t代表tcp
ss -ant       #查看所有tcp连接,当连接比较多时比netstat要快   ss(Socket Statistics)

nslookup domain.com     域名查询,查询Internet域名信息或诊断DNS 服务器问题的工具.
route -n            # 查看路由表

hosts文件 /etc/hosts  格式为 ip  host， 改后ping一下就好 

wget -c  xxx    断点续传
```

## 包管理
```
rpm(Red Hat Package Manager)
    rpm -qa   query all
    rpm -i jdk-XXX_linux-x64_bin.rpm   i install
    rpm -e    erase
yum   yum安装的包是rpm的包
    yum search  jdk  在线查找某个包
    yum install java-11-openjdk.x86_64
    yum erase   java-11-openjdk.x86_64
    源服务器列表配置：/etc/yum.repos.d/CentOS-Base.repo 

dpkg(Debian Packager) Debian的包管理
    dpkg -l  list
    dpkg -i jdk-XXX_linux-x64_bin.deb  debian下的安装
    dpkg -r   remove

apt-get   apt(Advanced Package Tool)  deb的网络包管理工具
    apt-cache search jdk
    apt-get install openjdk-9-jdk 
    apt-get purge openjdk-9-jdk
    源服务器列表配置：/etc/apt/sources.list
```

## 其他工具
```
rzsz yum install -y lrzsz      sz filename  下载    rz 上传

echo "ddd" | md5sum

ssh ip  ssh登录

mail命令发送邮件
    mail -s test yangfang@fudan.edu.cn                     #第一种方法，你可以把当前shell当成编辑器来用，编辑完内容后Ctrl-D结束
    echo “mail content”|mail -s test yangfang@fudan.edu.cn #第二种方法，我用的最多
    mail -s test yangfang@fudan.edu.cn < file              #第三种方法，以file的内容为邮件内容发信

strace
跟踪系统调用的执行
用法：strace -p pid

time 程序名   查看程序运行时间
```

## linux常见服务器
```
远程连接服务器
    telnet
        远程连接，明文传输数据
    ssh
        ssh协议支持传输文件的，xshell的xftp传输文件就是用的ssh协议
        命令行的话可以用scp通过ssh传输文件 

文件服务器
    ftp:vsftpd
        提供交互式的访问,查看目录文件信息，在服务器与客户端之间进行文件的传输
        可以用ftp/lftp命令连接服务器进行文件上传和下载
    TFTP(Trivial File Transfer Protocol)
        简单文件传送协议，是一个小而易于实现的文件传送协议，不支持交互
    NFS(Network FileSystem)
        做文件共享目录用，允许把nps服务器的目录挂载到本地，操作本地的文件等同于操作服务器
        比如： mount -t nfs -o nolock -o tcp IP:/home/用户名/nfs /mnt   将远程的挂载到本地
        若FTP需要修改文件，则需要下载然后再上传
    samba
        用于Linux和Windows之间共享文件。
DNS服务器

邮件服务器

web服务器
    nginx php mysql redis之类的可以都放到 uer/local/web目录下，方便查找

数据库服务器
```