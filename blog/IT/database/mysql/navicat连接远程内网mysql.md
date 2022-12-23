当mysql安装的时候默认是不开放外网的，只是监听本地127.0.0.1的3306的接口，外网是无法连接的。此时可以通过SSH隧道或者http代理的方式进行连接。
## ssh方式
> 本地ssh连接远程主机-->远程主机连接主机上的mysql数据库





## http代理方式
> 本地ssh连接http代理--> http代理 连接远程的ntunnel_mysql.php(navicat提供)上的脚本--> ntunnel_mysql.php访问本地 的mysql数据库






