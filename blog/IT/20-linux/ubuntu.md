## 快捷键

Alt+Tab切换到打开多个同类型程序时，停顿一下，可以显示出对应多个程序
Ctrl+Alt+T  





## 为root用户设置密码
打开终端输入：sudo passwd
Password: <--- 输入你当前用户的密码 
Enter new UNIX password: <--- 新的Root用户密码 
Retype new UNIX password: <--- 重复新的Root用户密码
passwd：已成功更新密码


## Enabling SSH on Ubuntu
By default, when Ubuntu is first installed, remote access via SSH is not allowed. Enabling SSH on Ubuntu is fairly straightforward.
```
sudo apt update
sudo apt install openssh-server
sudo service ssh start
```
Ubuntu ships with a firewall configuration tool called UFW. If the firewall is enabled on your system, make sure to open the SSH port:
```
sudo ufw allow ssh
```
sshd: no hostkeys available – exiting.
```
ssh-keygen -A
```



## 安装c++开发环境
Ubuntu缺省情况下，并没有提供C/C++的编译环境，因此还需要手动安装。但是如果单独安装gcc以及g++比较麻烦，幸运的是，Ubuntu提供了一个build-essential软件包。查看该软件包的依赖关系：
```
root@sxm-virtual-machine:/home/sxm# apt depends build-essential
build-essential
 |Depends: libc6-dev
  Depends: <libc-dev>
    libc6-dev
  Depends: gcc (>= 4:9.2)
  Depends: g++ (>= 4:9.2)
  Depends: make
    make-guile
  Depends: dpkg-dev (>= 1.17.11)
```

## 安装c/c++的库
一般安装某个库时都有两个东西，
一个是可执行程序
一个是这个类库的开发包，包括头文件，动态库、静态库什么的
比如在程序中你要用到openssl的东西，那你需要下载openssl的程序，还需要openssl的开发包
sudo apt-get install openssl
sudo apt-get install libssl-dev



## 其他工具
* 终端的加强版
GuakeTerminal──linux下完美帅气的终端 



