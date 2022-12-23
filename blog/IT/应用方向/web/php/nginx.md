
## 1.nginx 的安装
Nginx ("engine x") 是一个高性能的 HTTP 和 反向代理 服务器，也是一个 IMAP/POP3/SMTP 代理服务器。


安装准备: nginx依赖于pcre库,要先安装pcre(Perl Compatible Regular Expressions, 正则表达式的库)


**安装**
```
yum install pcre pcre-devel (开发的包）

cd /usr/local/src/     # usr(Unix System Resource)

wget http://nginx.org/download/nginx-1.4.2.tar.gz

tar zxvf nginx-1.4.2.tar.gz

cd nginx-1.4.2

./configure --prefix=/usr/local/nginx

make && make install
```



**启动**
```
cd /usr/local/nginx, 看到如下4个目录

./
 ....conf 配置文件 
 ... html 网页文件
 ...logs  日志文件
 ...sbin  主要二进制程序

# 启动
./sbin/nginx
```



**外网用浏览器访问不了的问题**


1. 先在服务器上 wget http://127.0.0.1 
2. service iptables status
3. 上两步都ok的话，若用的是云服，可能还需要在云服上配置开放的端口



## 2.Nginx的信号控制

**所有信号**
```
TERM, INT   Quick shutdown   （轻易别这样用）
QUIT        Graceful shutdown  优雅的关闭进程,即等请求结束后再关闭
HUP         Configuration reload ,Start the new worker processes with a new configuration Gracefully shutdown the old worker processes
            改变配置文件,平滑的重读配置文件   改配置文件后不用重启服务器
USR1        Reopen the log files 重读日志,在日志按月/日志割时有用，备份
USR2        Upgrade Executable on the fly 平滑的升级
WINCH       Gracefully shutdown the worker processes 优雅关闭旧的进程(配合USR2来进行升级)
```


**具体语法**:
```
ps aux|grep nginx

Kill -信号选项 nginx的主进程号

Kill -HUP 4873

Kill -信号控制 `cat /xxx/path/log/nginx.pid`

Kill -USER1 进程号

Kill -USR1  `cat /xxx/path/log/nginx.pid`  # nginx.pid 中有进程号  用执行引号引起来

./sbin/nignx -s signal # 达到同样的效果

./sbin/nignx -h   # 查看帮助命令
```



## 3.Nginx配置段
```
// 全局区
worker_processes 1; // 有1个工作的子进程,可以自行修改,但太大无益,因为要争夺CPU,一般设置为 CPU数*核数


Event {
    // 一般是配置nginx连接的特性
    // 如1个worker能同时允许多少连接
     worker_connections  1024; // 这是指 一个子进程最大允许连1024个连接
}


http {                      //这是配置http服务器的主要段
     Server1 {              // 这是虚拟主机段
            Location {      //定位,把特殊的路径或文件再次定位 ,如image目录单独处理（刷你流量）
            }               // 如.php单独处理


     }


     Server2 {


     }


}
```


**虚拟主机配置**
例子1: 基于域名的虚拟主机
```
server {
    listen 80;  #监听端口
    server_name a.com; #监听域名
    location / {
        root /var/www/a.com;   #根目录定位
        index index.html;
    }
}
```


例子2: 基于端口的虚拟主机配置 ，和基于ip的虚拟主机配置
```
server {
    listen 8080;
    server_name 192.168.1.204;


    location / {
        root /var/www/html8080;
        index index.html;
    }
}
```

## 4.日志管理
我们观察nginx的server段,可以看到如下类似信息
```
#access_log  logs/host.access.log  main;
```
这说明 该server, 它的访问日志的文件是  logs/host.access.log ,使用的格式"main"格式.

除了main格式,你可以自定义其他格式.

main格式是我们定义好一种日志的格式,并起个名字,便于引用.


**1.日志格式**
默认的日志格式: main, 指记录哪些选项
```
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
```


如默认的main日志格式,记录这么几项:
远程IP- 远程用户/用户时间 请求方法(如GET/POST) 请求体body长度 referer来源信息


http-user-agent: 用户代理/蜘蛛 ,被转发的请求的原始IP  浏览器
http_x_forwarded_for:在经过代理时,代理把你的本来IP加在此头信息中,传输你的原始IP

**2.声明一个独特的log_format**
```
log_format  mylog '$remote_addr- "$request" '


                 '$status $body_bytes_sent "$http_referer" '


                    '"$http_user_agent" "$http_x_forwarded_for"';
```
在下面的server/location,我们就可以引用 mylog


Nginx允许针对不同的server做不同的Log,在server段中,这样来声明
```
声明log         log位置            log格式;
access_log   logs/access_8080.log   mylog;
```



服务器运维，大网站的日志一天可能会很大，一天几G很正常，故要**分割备份日志**


**实际应用: shell+定时任务+nginx信号管理,完成日志按日期存储**

分析思路:
凌晨00:00:01,把昨天的日志重命名,放在相应的目录下
再USR1信息号控制nginx重新生成新的日志文件



具体脚本:
```
#!/bin/bash


base_path='/usr/local/nginx/logs'


log_path=$(date -d yesterday +"%Y%m")                 // 例如想要取得核心版本的设定：'version=$(uname -r)'再'echo $version'可得'2.6.18-128.el5'  执行其中的命令


day=$(date -d yesterday +"%d")                              //date -d yesterday +%y/%m/%d    2015/11/11 昨天的日期


mkdir -p $base_path/$log_path


mv $base_path/access.log $base_path/$log_path/access_$day.log


#echo $base_path/$log_path/access_$day.log


Touch $base_path/access.log


kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`
```


定时任务  // crontab 除了可以使用指令执行外，亦可编辑 /etc/crontab       /etc/init.d/atd restart   service atd start  两个都能使


Crontab 编辑定时任务
```
01 00 * * * /xxx/path/b.sh    # 每天0时1分(建议在02-04点之间,系统负载小)
```



## 5.location 语法
**try_files**
try_files的作用是按顺序检查文件是否存在，返回第一个找到的文件或文件夹（结尾加斜线表示为文件夹），如果所有的文件或文件夹都找不到，会进行一个内部重定向到最后一个参数。
```
try_files    $uri $uri/  /index.php?_url=/$uri&$args;
$args 表示url中的参数。  $arg_xx,表示特定的那个参数
$is_args 如果$args设置,值为"?",否则为""
```


**location**
location 有"定位"的意思, 根据uri来进行不同的定位.


在虚拟主机的配置中,是必不可少的,location可以把网站的不同部分,定位到不同的处理方式上.


比如, 碰到`.php`, 如何调用PHP解释器?  --这时就需要location


location 的语法
```
location [=|~|~*|^~] patt {


}
```


中括号可以不写任何参数,此时称为**一般匹配**


也可以写参数
因此,大类型可以分为3种
```
location = patt {} [精准匹配]


location patt{}  [一般匹配]


location ~ patt{} [正则匹配]
```



如何发挥作用?
首先看有没有精准匹配,如果有,则停止匹配过程.
若都没有匹配上，则继承全局的配置.


```
location = patt {


    config A


}
```
如果 `$uri == patt`,匹配成功，使用configA


```
location = / {
    root   /var/www/html/;       //root表根目录
    index  index.htm index.html;
}



location / {
    root   /usr/local/nginx/html;
    index  index.html index.htm;
}
```



如果访问 http://xxx.com/,定位流程是:


1. 精准匹配中　"/"   ,得到index页为　　index.htm
2. 再次访问 /index.htm , 此次内部转跳uri已经是"/index.htm" , 根目录为/usr/local/nginx/html
3. 最终结果,访问了 /usr/local/nginx/html/index.htm



再来看,正则也来参与.
```
location / {
    root   /usr/local/nginx/html;
    index  index.html index.htm;


}


location ~ image {
   root /var/www/image;
   index index.html;
}
```
 


如果我们访问 http://xx.com/image/logo.png
此时, "/" 与"/image/logo.png" 匹配
同时,"image"正则 与"image/logo.png"也能匹配,谁发挥作用?
正则表达式的成果将会使用.
图片真正会访问 /var/www/image/logo.png


```
location / {
    root   /usr/local/nginx/html;
    index  index.html index.htm;
}


 
location /foo {
    root /var/www/html;
    index index.html;
}
```
我们访问 http://xxx.com/foo


对于uri "/foo",   两个location的patt,都能匹配他们


即 '/'能从左前缀匹配 '/foo', '/foo'也能左前缀匹配'/foo',
此时, 真正访问 /var/www/html/index.html
原因:'/foo'匹配的更长,因此使用之.;
![](https://sunxvming.com/imgs/95ad9212-77d6-482c-a04e-7781a2b96137.jpg)



## 6.rewrite 重写


**重写中用到的指令**
```
if  (条件) {}  设定条件,再进行重写
set #设置变量
return #返回状态码
break #跳出rewrite
rewrite #重写
```
 


If  语法格式
```
If 空格 (条件) {
    重写模式
}
```
 


**条件如何写?**


答:3种写法
```
1: "="来判断相等, 用于字符串比较
2: "~" 用正则来匹配(此处的正则区分大小写)
   ~* 不区分大小写的正则
3: -f -d -e   来判断是否为文件,为目录,是否存在.
```
 
例子：
```
if ($remote_addr = 192.168.1.100) {
    return 403;
}


if ($http_user_agent ~ MSIE) {    #浏览器是ie的话
    rewrite ^.*$    /ie.htm;
    break;                        #(不break会循环重定向)
}



if (!-e $document_root$fastcgi_script_name) {    // 在这之前发生的， .php的被转到fastcgi_pass,然后没有这个脚本，再然后就被重定向
    rewrite ^.*$    /404.html break;             // 注, 此处还要加break,
}
```



Nginx有权访问的变量在`nginx/conf/fastcgi.conf`中有说明


Php中的一些全局变量有的是apache、nginx传过来的  负责两个进程之间通话的变量


以 `xx.com/dsafsd.html`这个不存在页面为例,


我们观察访问日志, 日志中显示的访问路径,依然是`GET /dsafsd.html HTTP/1.1`


提示: 服务器内部的rewrite和302跳转不一样.
302跳转的话URL都变了,变成重新http请求404.html, 而内部rewrite, 上下文没变,
就是说 `fastcgi_script_name` 仍然是 `dsafsd.html`,因此 会循环重定向.



**set用法**
set 是设置变量用的, 可以用来达到多条件判断时作标志用. 达到apache下的 rewrite_condition的效果


如下: 判断IE并重写,且不用break; 我们用set变量来达到目的
```
if ($http_user_agent ~* msie) {


    set $isie 1;


}


if ($fastcgi_script_name = ie.html) {


    set $isie 0;


}


if ($isie 1) {


    rewrite ^.*$ ie.html;


}
```
 



**Rewrite语法**
```
Rewrite 正则表达式  定向后的位置 模式
```


**Rewrite例子**
```
# 要达到的效果
Goods-3.html ---->Goods.php?goods_id=3
goods-([\d]+)\.html ---> goods.php?goods_id =$1 


# 配置
location /ecshop {


    index index.php;


    rewrite goods-([\d]+)\.html$   /ecshop/goods.php?id=$1;


    rewrite article-([\d]+)\.html$   /ecshop/article.php?id=$1;


    rewrite category-(\d+)-b(\d+)\.html    /ecshop/category.php?id=$1&brand=$2;


    


    rewrite category-(\d+)-b(\d+)-min(\d+)-max(\d+)-attr([\d\.]+)\.html


    /ecshop/category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5;


   
    rewrite category-(\d+)-b(\d+)-min(\d+)-max(\d+)-attr([\d+\.])-(\d+)-([^-]+)-([^-]+)\.html /ecshop/category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5&page=$6&sort=$7&order=$8;
}
```
> 注意:用url重写时, 正则里如果有"{}",正则要用双引号包起来




**重定向例子**
```
location ~^/mclient {
  rewrite ^/mclient/(\w+)/.*$   /mclient/$1/ark.exe break;
}
```

## 7.nginx+php的编译
apache一般是把php当做自己的一个模块来启动的.

而nginx则是把http**请求**变量(如get,user_agent等)**转发**给php进程,即**php独立进程**,与nginx进行通信. 称为 **fastcgi**运行方式.

因此,为apache所编译的php,是不能用于nginx的.

注意: 我们编译的PHP 要有如下功能:
连接mysql, gd, ttf, 以fpm(fascgi)方式运行

如何去找：./configure -help |grep mysql     然后再去看具体的配置

若没成功少了.h头文件 就需再安装后加-devel (开发的包）
```
./configure  --prefix=/usr/local/fastphp \

--with-mysql=mysqlnd \
--enable-mysqlnd \
--with-gd \
--enable-gd-native-ttf \
--enable-gd-jis-conv
--enable-fpm   #（以独立进程编译）FastCGI Process Manager
--with-apxs2=/usr/local/http2/bin/apxs \  以apache模块编译
```

编译前一定要想好那些编译选项是必须的，比如我弄curl的时候就忘了弄了，后来又重新安装了一遍
`fastCGI`负责两个进程之间(php,nginx)的通话,启动的时候就启动php-fpm


nginx一般是把请求发`fastcgi`管理进程处理，fascgi管理进程选择cgi子进程处理结果并返回给nginx

PHP-FPM提供了更好的PHP进程管理方式，可以有效控制内存和进程、可以**平滑重载PHP配置**，比`spawn-fcgi`具有更多优点，所以被PHP官方收录了。


**nginx+php的配置**
nginx+php的配置比较简单,核心就一句话:
> 把请求的信息转发给9000端口的PHP进程


让PHP进程处理 指定目录下的PHP文件.


如下例子:
```
location ~ \.php$ {         #  \. 转义
    root html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include    fastcgi_params;
}
```
过程如下：
1. 碰到php文件,
2. 把根目录定位到 html,
3. 把请求上下文转交给**9000端口PHP进程**
4. 并告诉PHP进程,当前的脚本是 $document_root$fastcgi_script_name。注：PHP会去找这个脚本并处理,所以脚本的位置要指对。


**php启动**
```
/php/sbin/php-fpm -D
```


安装ecshop时找不到数据库是因为：linux下和数据库通讯用的是socket而不是tcp/ip

解决：
1. 数据库主机改为ip地址
2. php的改配置文件
```
Mysql_default_socket=/var/lib/mysql/mysql.socket 
```







## 8.网页内容的压缩编码与传输速度优化


我们观察news.163.com的头信息


请求:
```
Accept-Encoding:gzip,deflate,sdch
```
响应:
```
Content-Encoding:gzip


Content-Length:36093
```
再把页面另存下来,观察,约10W字节,实际传输的36093字节


从http协议的角度看--请求头 声明 acceopt-encoding: gzip deflate sdch  (是指压缩算法,其中sdch是google倡导的一种压缩方式,目前支持的服务器尚不多)


**gzip配置的常用参数**
这需作为nginx的模块来编译的， 配置的时候可去官网查看所放的位置，上下文
```
gzip on|off;  #是否开启gzip


gzip_buffers 32 4K| 16 8K #缓冲(压缩在内存中缓冲几块? 每块多大?)


gzip_comp_level [1-9] #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)


gzip_disable #正则匹配UA 什么样的Uri不进行gzip


gzip_min_length 200 # 开始压缩的最小长度(再小就不要压缩了,意义不在)


gzip_http_version 1.0|1.1 # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)


gzip_proxied          # 设置请求者代理服务器,该如何缓存内容


gzip_types text/plain  application/xml # 对哪些类型的文件用压缩 如txt,xml,html ,css  


gzip_vary on|off  # 是否传输gzip压缩标志
```
注意:
* 图片/mp3这样的二进制文件,不必压缩因为压缩率比较小, 比如100->80字节,而且压缩也是耗费CPU资源的.
* 比较小的文件不必压缩




## 9.nginx的缓存设置  提高网站性能


Nginx对于图片,js等静态文件的缓存设置
注:这个缓存是指针对**浏览器**所做的缓存,不是指服务器端的数据缓存.


主要知识点: location expires指令


```
location ~ \.(jpg|jpeg|png|gif)$ {
    expires 1d;
}


location ~ \.js$ {
   expires 1h;
}
```


设置并载入新配置文件,用firebug观察,
会发现 图片内容,没有再次产生新的请求,原因--利用了本地缓存的效果.
注: 在大型的新闻站,或文章站中,图片变动的可能性很小,建议做1周左右的缓存
Js,css等小时级的缓存.
如果信息流动比较快,也可以不用expires指令,






## 10.nginx反向代理服务器+负载均衡
![](https://sunxvming.com/imgs/25d33256-aa03-4a0d-941c-bdab559d7ca7.jpg)


用户A始终认为它访问的是原始服务器B而不是代理服务器Z，但实用际上反向代理服务器接 受用户A的应答，
从原始资源服务器B中取得用户A的需求资源，然后发送给用户A。由于防火墙的作用，只允
许代理服务器Z访问原始资源服务器B。尽管在这个虚拟的环境下，防火墙和反向代理的共同
作用保护了原始资源服务器B，但用户A并不知情。


用nginx做反向代理和负载均衡非常简单.


支持两个用法 1个`proxy`, 1个`upstream`,分别用来做反向代理,和负载均衡


以反向代理为例, nginx不自己处理php的相关请求,而是把php的相关请求转发给apache来处理.




这不就是传说的”动静分离”,动静分离不是一个严谨的说法,叫反向代理比较规范.
```
 location ~ \.php$ {


       profix_pass  http://域名：端口 


  }
```
反向代理导致后端的服务器ip为前端的ip，而不是客户端真正的ip 。




解决：
```
location ~ .*\.(jpg|png|gif|bmp)$ {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_pass http://192.168.1.204:8080;
}
```




反向代理后端如果有多台服务器,自然可形成负载均衡,


但proxy_pass如何指向多台服务器?


把多台服务器用 upstream指定绑定在一起并起个组名,


然后proxy_pass指向该组


默认的均衡的算法很简单,就是针对后端服务器的顺序,逐个请求.


也有其他负载均衡算法,如一致性哈希,需要安装第3方模块.








## Nginx---->php-fpm之间的优化


在很多个nginx来访问fpm时, fpm的进程要是不够用, 会生成子进程.(不用了会自动消失，对高并发的网站，时刻都需要子进程，）


生成子进程需要内核来调度,比较耗时,  如果网站并发比较大,   我们可以用静态方式一次性生成若干子进程,保持在内存中.


方法 -- 修改php-fpm.conf
```
Pm = static  让fpm进程始终保持,不要动态生成
Pm.max_children= 32  始终保持的子进程数量
```












## 常见问题
权限问题导致Nginx 403 Forbidden错误的解决方法






系统中的路径查询结果：
[root@lizhong html]# ll /root/html/
总用量 4
-rw-r--r-- 1 root root 3 4月  18 11:07 index.html
目录时存在，重启nginx还是这个错误，后来想到是不是权限问题？于是在nginx.conf头部加入一行：
user  root;
重启nginx再访问，就可以正常访问了




如果不想使用root用户运行，可以通过修改目录访问权限解决403问题，但不能把目录放在root用户宿主目录下，放在任意一个位置并给它755，或者通过chown改变它的拥有者与nginx运行身份一致也可以解决权限问题。





















