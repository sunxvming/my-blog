## 什么是mysqlnd驱动?
PHP手册上的描述:
MySQL Native Driver is a replacement for the MySQL Client Library (libmysql). 
MySQL Native Driver is part of the official PHP sources as of PHP 5.3.0. 
mysqldnd即mysql native driver简写,即是由PHP源码提供的mysql驱动连接代码.它的目的是代替旧的libmysql驱动.


 


传统的安装php的方式中,我们在编译PHP时,一般需要指定以下几项:
```
--with-mysql=/usr/local/mysql 
--with-pdo-mysql=/usr/local/mysql
```
这实际上就是使用了mysql官方自带的libmysql驱动, 这是比较老的驱动, PHP 5.3开始已经不建议使用它了, 而建议使用mysqlnd.
编译php时,修改以下几个项参数即可
```
--with-mysql=mysqlnd \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd
```


## 数据库驱动可能的问题
PHP 从数据库取出的整型变成了字符串
相同的代码部署在了 A 和 B 两个服务器上， A 服务器从数据库中取出的整型值即为整型，B 服务则会把整型变成字符串
如果用的是老的mysql的驱动的话，会造成数据类型错误的情况，换成mysqlnd的话就会解决。