卸载的方式要和安装的方式一致：


一、通常Linux应用软件的安装包有三种：
 
1) tar包，如software-1.2.3-1.tar.gz。它是使用UNIX系统的打包工具tar打包的。
2) rpm包，如software-1.2.3-1.i386.rpm。它是Redhat Linux提供的一种包封装格式。安装rpm包的命令是"rpm -参数，包管理工具 yum 。"
3) deb包，如software-1.2.3-1.deb。它是Debain Linux提供的一种包封装格式。安装deb包的命令是"dpkg -参数"，包管理工具 apt-get。
 
二、包命名规则：
大多数Linux应用软件包的命名也有一定的规律，它遵循：名称-版本-修正版-类型
 
例如：
  1) software-1.2.3-1.tar.gz 意味着：
　　　　软件名称：software
　　　　版本号：1.2.3
　　　　修正版本：1
　　　　类型：tar.gz，说明是一个tar包。
 
2)  sfotware-1.2.3-1.i386.rpm
 
　　　　软件名称：software
　　　　版本号：1.2.3
　　　　修正版本：1
　　　　可用平台：i386，适用于Intel 80x86平台。
　　　　类型：rpm，说明是一个rpm包。
　　　　注：由于rpm格式的通常是已编译的程序，所以需指明平台。
三、讲解几种方式安装与卸载软件：
 
1、yum
注意：有个前提是yum安装的软件包都是rpm格式的
 search的命令也很有用 ： yum search python | grep python-devel

安装软件包命令：yum -y install ~
删除软件包命令：yum -y remove ~
 
2、RPM
安装：rpm -ivh xxx.rpm
重新安装：rpm -ivh -replacepkgs xxx.rpm
卸载：rpm -e xxx.rpm
查询安装哪些软件：rpm -qa|grep [package name]
查看rpm包安装在哪里：rpm -ql [package name]
 
3、tar.gz， tar.bz, tar.bz2
安装：
（1）解压：tar -zxvf xxx.tar.gz ( tar -jxvf xxx.tar.bz(or bz2) )
（2）./configure (./configure --prefix=path (如：/usr/local/xxx)
（3）make
（4）make install
卸载：
make uninstall
或者如果删除，就删除相应的软件目录；
 
4、bin
安装：
（1）chmod +x xxx.bin （添加执行权限）
（2）执行文件：./xxx.bin
卸载：
直接删除安装目录
 
5、pip安装python包
先安装install python-setuptools python-pip
安装： pip install xxx
卸载： pip uninstall xxx