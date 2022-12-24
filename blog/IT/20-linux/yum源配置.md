163的地址：   http://mirrors.163.com/.help/centos.html
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup



下载163yum源放到上面的目录下


验证163的repo是否正确配置。
指令如下： yum repolist all


运行以下命令生成缓存
yum clean all
yum makecache

