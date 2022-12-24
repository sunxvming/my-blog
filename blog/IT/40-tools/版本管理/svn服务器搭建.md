Windows上用这个  VisualSVN server，要下载64位的。

安装的时候一直点下一步就行

创建 Repository 和user




1.检查是否已安装

rpm -qa subversion

如果要卸载旧版本：

yum remove subversion



2.安装

yum install subversion



3.检查是否安装成功

svnserve --version



4.创建仓库目录

 /data/svn/game



5.创建项目

svnadmin create /home/svn/game



6.检查是否创建成功

cd /home/svn/game
如果成功，game目录下会多出几个文件夹


 
7.配置权限
A.配置SVN

vim  svnserve.conf



anon-access=none     #去除文件前的注释，将read改为none,防止匿名访问

auth-access=write    #去除文件前的注释

password-db=passwd   #去除文件前的注释

authz-db = authz     #去除文件前的注释,访问权限配置，非常重要，不打开，分组权限不生效



B.添加访问的用户

vim  passwd
[users]
albert=123456

findyou=123456





C.设置添加的用户权限， 注意格式：注释不能在语句的后面

vim authz



[groups]

g_qa=albert,findyou

g_read=abc



[TestCode:/]        #[<版本库名>:<路径>]

@g_qa=rw            #<用户组> = <权限>  ，第一种方式

@g_read=r           #<用户名> = <权限>  ，第二种方式

love=r

*=                  #* = <权限>，第三种方式，*为任意用户，此为禁止匿名用户访问



8.关闭防火墙
防火墙开放SVN端口通行

iptables -A INPUT -p tcp --dport 3690 -j ACCEPT

service iptables stop


9.设置开启启动
vi /etc/rc.d/rc.local   添加下面一行

/usr/bin/svnserve -d -r /data/svn                      whereis 查下命令在哪里



客户端访问svn://192.168.1.186/art

【问题】
  1.检查防火墙是否关闭   2.检查协议是用的https的还是用svn的

