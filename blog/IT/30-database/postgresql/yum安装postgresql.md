```
yum search postgresql
# 安装postgresql-server会附带安装上postgres客户端
yum install postgresql-server


# 检查一下版本信息
psql --version


# 查看生成的postgresql用户
cut -d : -f 1 /etc/passwd


# 初始化数据库
# 安装完成之后，不能直接启动数据库，需要先执行初始化，初始化之后，会生成postgresql相关配置文件和数据库文件，他们都会存放在路径/var/lib/pgsql/data下。
postgresql-setup initdb


# 启动数据库
service postgresql start
service postgresql status
service postgresql restart
```




配置：
find / -name postgresql.conf
配置文件地址：/var/lib/pgsql/data




## 参考链接
[yum安装postgresql](https://www.jianshu.com/p/b6f8db653b96)

