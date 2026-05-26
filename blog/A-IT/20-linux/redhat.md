

[RedHat红帽RHEL7.2镜像下载以及安装教程（内含下载链接）_rhel7镜像文件下载-CSDN博客](https://blog.csdn.net/noooow/article/details/128410796)

[Redhat7系统安装教程：从下载到配置,-CSDN博客](https://blog.csdn.net/z09364517158/article/details/135187053)


[Redhat安装完成后，注册激活方法](https://www.cnblogs.com/lewsuy/p/11362816.html)
subscription-manager register --username=sunxvming --password=xvmingsun1618VV --auto-attach
sudo subscription-manager attach --auto



启用 RHEL 7 的官方仓库
sudo subscription-manager repos --enable rhel-7-server-rpms
sudo subscription-manager repos --enable rhel-7-server-optional-rpms
sudo subscription-manager repos --enable rhel-7-server-extras-rpms


sudo yum clean all
sudo yum makecache
sudo yum groupinstall "Development Tools" -y


sudo yum groupinstall "Development Tools" -y
sudo yum install gcc gcc-c++ make cmake git -y




## **什么是 `epel-release`**

- **EPEL** = _Extra Packages for Enterprise Linux_
    
- 是由 Fedora 项目维护的一个第三方软件仓库，提供很多 RHEL/CentOS 默认仓库里没有的软件包。
    
- 安装 `epel-release` 包的作用是**添加 EPEL 仓库到你的系统**，这样 `yum install` 就可以直接安装 EPEL 仓库里的软件。
    

> 在源码编译 Qt 或开发环境时，通常会用到 `ninja-build`、`python3`、`cmake` 等，这些在默认 RHEL7 仓库里不一定有，而 EPEL 就提供这些包。