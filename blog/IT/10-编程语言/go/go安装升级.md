## linux
安装
```
# 从官网下载安装包
wget https://go.dev/dl/go1.19.2.linux-amd64.tar.gz
# 解压
tar -C /usr/local -xzf  go1.19.2.linux-amd64.tar.gz
# 设置环境变量
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin:/root/go/bin


# 加载环境变量
source /etc/profile
```
升级
将/usr/local/go删除掉，然后再重新安装一遍




## windows下升级
```
go install golang.org/dl/go1.18@latest
go1.18 download
go1.18 version
```
方式一：
执行上述命令后把go1.18的二进制文件下载到C:\Users\DELL\go\bin，然后再将go1.18改名成go放到之前老版本的路径中，并把老的改成go1.17
方法二：
上述命令还会将整个go的工程下载到C:\Users\DELL\sdk\go1.19中，可以直接将环境变量设置成C:\Users\DELL\sdk\go1.19\bin