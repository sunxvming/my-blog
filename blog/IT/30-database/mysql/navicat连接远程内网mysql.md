当mysql安装的时候默认是不开放外网的，只是监听本地127.0.0.1的3306的接口，外网是无法连接的。此时可以通过SSH隧道或者http代理的方式进行连接。
## ssh方式
> 本地ssh连接远程主机-->远程主机连接主机上的mysql数据库


![](https://sunxvming.com/imgs/615bd270-a100-4a0a-a9c4-a37768747373.png)


## http代理方式
> 本地ssh连接http代理-->http代理连接远程的ntunnel_mysql.php(navicat提供)上的脚本-->ntunnel_mysql.php访问本地的mysql数据库


![](https://sunxvming.com/imgs/29d3cae3-d021-4c10-b6f9-4d41f4008ecf.png)



