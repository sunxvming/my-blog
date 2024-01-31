## 配置ssh免登陆
生成ssh免登陆密钥
cd ~，进入到我的home目录
cd .ssh/


ssh-keygen -t rsa （四个回车）
执行完这个命令后，会生成两个文件id_rsa（私钥）、id_rsa.pub（公钥）
将公钥拷贝到要免登陆的机器上
```
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# 或者
ssh-copy-id user@host
```

核心是：B公钥加密，A私钥解密，B再进行验证
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/12731350.png)     



## Enabling SSH on Ubuntu
By default, when Ubuntu is first installed, remote access via SSH is not allowed. Enabling SSH on Ubuntu is fairly straightforward.
```
sudo apt update
sudo apt install openssh-server -y
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


## SSH通过代理连接
### 1. ssh over  corkscrew
[ corkscrew](https://github.com/bryanpkc/corkscrew)是专门为ssh提供http代理的软件，要使用corkscrew需要http代理支持HTTP CONNECT方法

Corkscrew安装
从github上下载源码，然后安装，代码使用c语言写的，用make进行安装
corkscrew的用法，具体详见corkscrew的github：
```
corkscrew <proxyhost> <proxyport> <desthost> <destport> [authfile]
```


假设我的http代理是proxy.nixops.me,端口是8080；ssh服务器是nixops.me,ssh端口2882，格式：


```
ssh user@server -o "ProxyCommand corkscrew 代理地址 代理端口 ssh服务器地址 ssh端口 "
```


测试一下：
```
ssh -p2882 root@nixops.me -o " ProxyCommand /usr/local/bin/corkscrew  proxy.nixops.me 8080  server.nixops.me 2882 "
```


正常会弹出ssh输入密码的提示，这时的ssh就是通过http代理连接到服务器的。每次都这样连接比较麻烦，将配置写入ssh_config文件中，配置全局使用http代理：
编辑ssh客户端配置文件 /etc/ssh/ssh_config,加入：
```
Host *
ProxyCommand corkscrew proxy.nixops.me 8080 %h %p
```


%h表示目标地址，%p是目标端口。这样配置后,用ssh user@host连接服务器就会通过http代理中转。  
非全局配置，可以指定具体的ip：

```
Host host_a    #别名
    User root
    Hostname 10.91.1.89
    Port 59878
    ProxyCommand corkscrew proxy.mgameops.com 5288 %h %p ~/.ssh/corkscrew-auth
    IdentityFile ~/.ssh/id_rsa
```


使用下面命令连接即可：
```
ssh  host_a     
```

### 2. ssh over socks

corkscrew不支持socks代理，如果是socks代理要使用nc，或者其它支持socks的软件，配置和上面类似：
```
ProxyCommand nc -X 5 -x socks5.nixops.me:1080 %h %p
```

nc非常强大，我的http代理支持CONNECT方法，即能打开https的网站，也可以用nc代替corkscrew：

```
ProxyCommand nc -X connect -x proxy.nixops.me:8080 %h %p
```

nc稍好用点，因为各发行版的包管理中都有，使用起比方便。proxycommand 命令相当的灵活，不只是http和socks代理，如果有其它形式的代理,只要有客户端支持都可以用



## 参考链接
- [ssh通过代理连接服务器](https://www.nixops.me/articles/ssh-over-proxies.html)



