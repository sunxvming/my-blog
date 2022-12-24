PHP-FPM 负责管理一个进程池来处理来自 Web 服务器的 HTTP 动态请求，在 PHP-FPM 中，master 进程负责与 Web 服务器进行通信，接收 HTTP 请求，再将请求转发给 worker 进程进行处理，worker 进程主要负责动态执行 PHP 代码，处理完成后，将处理结果返回给 Web 服务器，再由 Web 服务器将结果发送给客户端。这就是 PHP-FPM 的基本工作原理，


PS：最大请求数：最大处理请求数是指一个php-fpm的worker进程在处理多少个请求后就终止掉，master进程会重新respawn一个新的。
这个配置的主要目的是避免php解释器或程序引用的第三方库造成的内存泄露。
```
pm.max_requests = 10240
```






1 CGI


(1)什么是CGI：


CGI(Common Gateway Interface)公共网关接口， 是WWW技术中最重要的技术之一，有着不可替代的重要地位， CGI是外部应用程序(CGI程序)与Web服务器之间的接口标准，是在CGI程序和Web服务器之间传递消息的规程。CGI规范允许WEB服务器执行外部程序，将他们的输出发送给Web浏览器， CGI将Web的一组简单的超媒体文档变成一个完整的新的交互式媒体。


(2)CGI的目的：


CGI是为了保证web server传递过来的数据是标准格式的，方便CGI程序的编写者。


(3)CGI的处理过程：


web server (比如nginx)只是内容的分发者。


比如，如果请求/index.html, 那么web server会去文件系统中找到这个文件，发送给浏览器，这里分发的是静态数据。


如果现在请求的是/index.php，根据配置文件，nginx知道这个不是静态文件，需要去找PHP解析器来处理，那么它会把这个请求简单处理后交给PHP解析器。Nginx会传那些数据给(如url，查询字符串，POST数据，HTTP header)PHP解析器呢？CGI就是规定要传哪些数据、以什么样的格式传递给后方处理这个请求的协议。


当web server收到/index.php这个请求后，会启动对应的CGI程序，这里就是PHP的解析器。接下来PHP解析器会解析php.ini文件，初始化执行环境，然后处理请求，再以规定CGI规定的格式返回处理后的结果，退出进程。web server再把结果返回给浏览器


(4)CGI的功能描述：


绝大多数的CGI程序被用来解释处理来自表单的输入信息， 并在服务器产生相应的处理，或将相应的信息反馈给浏览器。CGI程序是网页具有交互功能


(5)小结：


过以上所述，CGI是个协议，跟进程什么的没有关系


2 Fastcgi


(1)Fastcgi的作用：


Fastcgi是用来提高CGI程序性能的。


(2)CGI程序的性能问题:


”PHP解析器会解析php.ini文件，初始化执行环境“，就是这里了。标准的CGI对每个请求都会执行这次步骤(不嫌累呀！启动进程很累的说！)，所以处理每个请求的时间会比较长，这明显不合理！


(3)Fastcgi是做什么的：对进程进行管理


首先Fastcgi会先启动一个master，解析配置文件，初始化执行环境，然后再启动多个worker。当请求过来时，master会传递给一个worker，然后立即可以接受下一个请求。这样就避免了重复的劳动，效率自然是高。而且当worker不够用时，master可以根据配置预先启动几个worker等着；当然空闲worker太多时，也会停掉一些，这样就提高了性能，也节约了资源。这就是fastcgi的对进程的管理


3 PHP-FPM


php的解析器是php-cgi。php-cgi只是个CGI程序，他自己本身只能解析请求，返回结果，不会进程管理，所以就出现里一些能够调度php-cgi进程的程序，而PHP-FPM就是能够调度php-cgi进程的程序中的一种。PHP-FPM在长时间的发展后，逐渐得到了大家的认可


PHP-FPM其实是PHP源代码的一个补丁，旨在将FastCGI进程管理整合进PHP包中。必须将它patch你的PHP源代码中，在编译安装PHP 后才可以使用。PHP5.3.3已经继承php-fpm了，不再是第三方的包了。PHP-FPM提供了更好的PHP进程管理方式，可以有效控制内存和进 程，可以平滑重载PHP配置


4 小结


(1)cgi是公共网关接口，以进程方式工作。即当有请求时就创建一个cgi进程，应用程序结束时关闭cgi进程 并退出内存


(2)fastcgi是cgi的拓展，应用程序结束时，fastcgi进程不退出内存，而是等待下一个请求。php 的cgi方式都是fastcgi方式，在php4就是这样的


(3)php-fpm是fastcgi管理器。在此之前，fastcgi进程是由操作系统管理的，一旦某个fastcgi进程发生故障，就可能危机操作系统的正常运行.php-fpm的作用就是在操作系统和fastcgi之间建立一道围墙，从而阻断了fastcgi的故障向操作系统的传播