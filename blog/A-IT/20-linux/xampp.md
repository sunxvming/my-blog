域名解析，设置后待会在浏览器中试下看好了没。

![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/329aca70-0b2e-412a-b826-0565d82de679.png)

外网用浏览器访问不了：
1.先在服务器上 wget http://127.0.0.1  
2.service iptables status
3.上两步都ok的话，若用的是云服，可能还需要在云服上配置开放的端口
3.用ip的话要注意是内网的还是外网的
4.数据库有时用127.0.0.1连接不上，换成localhost就行
5.目录的读写权限要设置好



XAMPP: Starting Apache...fail. 
XAMPP:  Another web server is already running.  
在网查了一下，原来是因为在  xampp 里面有一判断，端口是否已经使用。所要修改一下就可以了。
 ![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/0.9267453295178711.png)

```
需要开启xampp的时候来设置！！！  apache和mysql都开启
 安装完后更新 security 文件 /opt/lampp/lampp security 用来设置MySql root密码， FTP 密码 以及xmapp管理页面。
访问xampp时，若出现403的话只需修改http.conf，他在下面include了其他的conf，修改include的conf也是可以的
修改了还不管用，可能是启动了两个程序，都关掉就行了


phpmyadmin 403 修改etc/extra的httpd-xampp.conf就行




修改如下文件
/opt/lampp/etc/extra/httpd-vhosts.conf



虚拟host
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "/opt/lampp/htdocs/wordpress"
    ServerName sunxvming.com
    ServerAlias www.sunxvming.com
    ErrorLog "logs/sunxvming.com-error_log"
    CustomLog "logs/sunxvming.com-access_log" common
</VirtualHost>


<VirtualHost *:8000>
    DocumentRoot "/opt/lampp/htdocs/project/activity/gamecenter/public"
    ServerName  dc3.fancy3d.cn 
  #  DirectoryIndex index.php   
    <Directory />
    Options FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>
</VirtualHost>


1.修改apache的httpd.conf配置
* httpd.conf    打开 rewrite_module  vhost
*  AllowOverride   改成All
<Directory />
    AllowOverride All
     Require all granted
</Directory>
3.修改httpd-vhosts.conf配置
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "/opt/lampp/htdocs/wordpress"
    ServerName sunxvming.com
    ServerAlias www.sunxvming.com
    ErrorLog "logs/sunxvming.com-error_log"
    CustomLog "logs/sunxvming.com-access_log" common
</VirtualHost>


<VirtualHost *:8000>
    DocumentRoot "/opt/lampp/htdocs/project/activity/gamecenter/public"
    ServerName  dc3.fancy3d.cn 
  #  DirectoryIndex index.php   
    <Directory />
    Options FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>
</VirtualHost>




onethink 弄到服务器上出现三个问题
数据库连接不上 --------》  配置是127.0.0.1 换成localhost 就行了
Runtime  没有写权限也不行    chmod  -R 777 ./Runtime
后台登录不上-----》因为还需要其他的peizh          修改Application\User下面的配置文件, 改成对应服务器上的参数
define('UC_DB_DSN', 'mysqli://root:root@127.0.0.1:3306/ot'); // 数据库连接，使用Model方式调用API必须配置此项
记得清缓存，Runtime下的都清除掉


-------------------------------------------------------------
　　1、/data/mysql 目录下建立data目录
　　mkdir data
        chmod 777 /data               //因为一般操作是用root用户，所以可能mysql没有data目录的操作权限，这里必须放开，至少保证mysql用户对该目录有可读写权限


　　2、把MySQL服务进程停掉：
　　mysqladmin -u root -p shutdown


　　3、把/var/lib/mysql整个目录复制到/data
　　cp -r /var/lib/mysql/　/data/           //这里建议直接复制到新目录，完成全部7步操作，测试连接成功了再删除原位置的文档


　　5、编辑MySQL的配置文档/etc/my.cnf
　　为确保MySQL能够正常工作，需要指明mysql.sock文档的产生位置，修改[mysqld]下面两行：
　　[client]
        socket　 = /mnt/data/mysql/mysql.sock　　　(加上此行)


　　[mysqld]
　　#socket　 = /var/lib/mysql/mysql.sock(原内容，为了更稳妥用“#”注释此行)
　　socket　  = /mnt/data/mysql/mysql.sock　　　(加上此行)
　　datadir =/mnt/data/mysql　　   (加上此行)
 
    6、 chown -R mysql:mysql /data/mysql
　7、重新启动MySQL服务
----------------------------------


mysql 的mysql表千万别随便改，改后可能会出现登录不上的情况，惨疼的教训呐，后来又重新安装了一次lampp




虚拟目录----->在不同目录下有不同网站-------->通过目录来映射，可以映射到根目录的其他地方，而虚拟主机是通过域名来映射的



Alias /phpmyadmin "/opt/lampp/phpmyadmin"
Alias /info "/opt/lampp/htdocs/project/info"
<Directory "/opt/lampp/phpmyadmin">
    AllowOverride AuthConfig Limit
    Require all granted
</Directory>
<Directory "/opt/lampp/htdocs/project/info">
    Require all granted
</Directory>
Alias与virtual host不冲突，可以并存，当根目录下面存在同名文件夹的时候，是不能被正常访问的



<IfModule dir_module>    全局的默认首页
    #DirectoryIndex index.html
    DirectoryIndex index.html index.html.var index.php index.php3 index.php4
</IfModule>
```











