## 安装PHP的LDAP扩展
* Windows下
如果你的php已经有php_ldap.dll文件，你可以打开php.ini文件， 找到 “;extension=php_ldap.dll” 去掉分号后保存
如果你没有php_ldap.dll文件，你可以从网上找的符合自己php版本的php_ldap.dll 文件，将文件放在相应的目录，重复上过程
重启Apache服务
* Linux下
如果你的php是编译安装的，那么你需要加“--with-ldap”参数，重新编译安装
如果你的php是通过Linux的包管理器安装的，你可以通过包管理器安装php_ldap。 以Debian为例，执行apt-get install php5_ldap
重启Apache服务

## LDAP介绍
LDAP 的全称是“轻量级目录访问协议(Lightweight Directory Access Protocol)”,是一种简单的目录协议。所谓目录,是一种专门的数据库,可以用来服务于任何应用程序。公司的域帐号登录采用的是Ldap登录验证，所有的系统均使用来自同一个 LDAP 目录的用户信息进行身验证。这样,就不需要在每个系统中保存不同的密码,只需要在 LDAP 目录中保存一个密码即可。本文主要介绍一下PHP环境下如何通过后台登录公司Ldap服务器验证用户名密码。
首先是系统的环境配置，在Linux服务器环境下，PHP不默认挂载ldap扩展库，因此需要添加ldap扩展库，添加ldap扩展库的方法有两种：
一是重新编译php，这种方法比较繁琐
另外一种方法是通过phpize和configure的方式加载ldap的so文件来使php支持ldap扩展库，相对来说更加的方便快捷。

这里介绍的是第二种方法:
(1)通过http://www.php.net/releases/ 下载当前系统php版本对应的源码包，解压到服务器某目录下
(2)进入该目录 cd/XXX/XXX/php-5.X.XX/ext/ldap
(3)在当前目录运行phpize/usr/local/php/bin/phpize 生成configure文件
(4)运行configure文件并添加生成ldap扩展的参数
./configure--with-php-config --with-ldap
(5)运行make   make install, 运行结束后会生成ldap.so文件
(6)找到php.ini文件，找到extension_dir，将ldap.so文件复制进该目录
(7)php.ini文件中添加extension=ldap.so
(8)重启apache，这样就为php添加了ldap扩展库
 
用php连接ldap时连接上了，但绑定用户的时候出错了，ldap_bind（）函数返回的是false，这该怎么办捏，
后发现有ldap_error()函数，是打印错误信息的，估计很多的函数库都有这样类似的函数，一打印就知道错误的原因，然后就百度搜索，没搜出来、
后来想起来stack over flow，去上面一搜，果然出来了，很不错

## ldap例子
```
ldap：
host: 10.1.1.23
base:
dc=fancyguo, dc=cn
username:uid=write, ou=sys, dc=fancyguo, dc=cn
password:111
```

客户端连接界面
![](/imgs/_u5FAE_u4FE1_u622A_u56FE_20210415173011.png)
