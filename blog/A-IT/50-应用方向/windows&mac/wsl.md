wsl(Windows Subsystem for Linux)


## 安装ubuntu
```
wsl --install
```
此命令默认情况下，安装的 Linux 分发版为 Ubuntu，当然也可以更改，最好是按下面官网链接中的安装步骤进行安装。


## 检查正在运行的 WSL 版本
```
wsl -l -v
```


## 启动linux子系统
1. 直接在搜索栏中搜索ubuntu，然后点击运行
2. 在cmd中输入wsl也可以启动linux子系统


## ubuntu的相关操作
设置root密码
```
sudo passwd
```


设置默认root登录：以管理员打开powshell，输入以下命令，
注意：用户名需要替换掉，版本页需要替换掉，如果wsl的路径不在这里可以去C:\Program Files\WindowsApps\XXX.UbuntuXXX\ubuntu版本.exe
```
C:\Users\用户名\AppData\Local\Microsoft\WindowsApps\ubuntu版本.exe config --default-user root
```
## 遇到问题


###  无法解析服务器的名称或地址
wsl --install -d Ubuntu， 无法解析服务器的名称或地址，
原因是在操作时raw.githubusercontent.com域名无法解析，修改DNS没有用，可以直接修改hosts文件


### 启动ubuntu系统时报：WslRegisterDistribution failed with error: 0x800701bc
造成该问题的原因是WSL版本由原来的WSL1升级到WSL2后，内核没有升级，前往[微软WSL官网](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel)下载安装适用于 x64 计算机的最新 WSL2 Linux 内核更新包即可。


## 参考链接
- [wsl官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/)
- [wsl安装](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)
- [vscode打开WSL项目](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode）