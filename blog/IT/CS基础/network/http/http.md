## X-Forwarded-For
简称XFF头，它代表客户端，也就是HTTP的请求端真实的IP，只有在通过了HTTP 代理或者负载均衡服务器时才会添加该项
标准格式如下：
> X-Forwarded-For: client1, proxy1, proxy2




从标准格式可以看出，X-Forwarded-For头信息可以有多个，中间用逗号分隔，第一项为真实的客户端ip，剩下的就是曾经经过的代理或负载均衡的ip地址，经过几个就会出现几个。
php中的全局变量`$_SERVER["HTTP_X_FORWARDED_FOR"]`获取的值也是用逗号分割的ip，跟上边的形式一样。




## http的长连接
1.第一个问题是，是不是只要设置Connection为keep-alive就算是长连接了？
当然是的，但要服务器和客户端都设置。


2、第二个问题是，我们平时用的是不是长连接？
现在用的基本上都是HTTP1.1协议，基本上Connection都是keep-alive。而且HTTP协议文档上也提到了，HTTP1.1默认是长连接，也就是默认Connection的值就是keep-alive


3、长连接有啥好处？
长连接是为了复用，那既然长连接是指的TCP连接，也就是说复用的是TCP连接。那这就很好解释了，也就是说，长连接情况下，多个HTTP请求可以复用同一个TCP连接，这就节省了很多TCP连接建立和断开的消耗。
比如你请求了淘宝的一个网页，这个网页里肯定还包含了CSS、JS等等一系列资源，如果你是短连接（也就是每次都要重新建立TCP连接）的话，那你每打开一个网页，基本要建立几个甚至几十个TCP连接，这浪费了多少资源就不用去说了吧。
但如果是长连接的话，那么这么多次HTTP请求（这些请求包括请求网页内容，CSS文件，JS文件，图片等等），其实使用的都是一个TCP连接，很显然是可以节省很多消耗的,只需要一次TCP三次握手就行了。
长连接还要多提一句，那就是，长连接并不是永久连接的。如果一段时间内（具体的时间长短，是可以在header当中进行设置的，也就是所谓的超时时间），这个连接没有HTTP请求发出的话，那么这个长连接就会被断掉。




## http post
Post提交的data在http协议的body中，Form表单有两种enctype类型：
1、enctype=”application/x-www-form-urlencoded”
```
<form action="user/login.do" method="post" >  
    用户名:<input type="text" name="username"><br>  
    密码:<input type="text" name="password"><br>  
    <input type="submit" value="登录"/>  
</form> 




POST http://localhost:8080/springmvc/user/login.do HTTP/1.1  
Host: localhost:8080  
Connection: keep-alive  
Content-Length: 33  
Cache-Control: max-age=0  
Origin: http://localhost:8080  
Upgrade-Insecure-Requests: 1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36  
Content-Type: application/x-www-form-urlencoded  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8  
Referer: http://localhost:8080/springmvc/  
Accept-Encoding: gzip, deflate  
Accept-Language: zh-CN,zh;q=0.8  


username=xiaoming&password=123456789  
```
2、enctype=”multipart/form-data”
请求消息头中, Content-Type: multipart/form-data; boundary=- - - -WebKitFormBoundarykALcKBgBaI9xA79y
boundary为分隔符.
如果要传输二进制需要经过BASE64或MIME等编码
HTTP协议明确地指出了，HTTP头和Body都没有长度的要求,但一般服务器都会有长度限制的要求。
```
<form action="user/login.do" method="post" enctype="multipart/form-data">  
    用户名:<input type="text" name="username"><br>  
    密码:<input type="text" name="password"><br>  
    上传文件:<input type="file" name="uploadFile"/><br>  
    <input type="submit" value="登录"/>  
</form>  


POST http://localhost:8080/springmvc/user/login.do HTTP/1.1  
Host: localhost:8080  
Connection: keep-alive  
Content-Length: 400  
Cache-Control: max-age=0  
Origin: http://localhost:8080  
Upgrade-Insecure-Requests: 1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36  
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarykALcKBgBaI9xA79y  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8  
Referer: http://localhost:8080/springmvc/  
Accept-Encoding: gzip, deflate  
Accept-Language: zh-CN,zh;q=0.8  


------WebKitFormBoundarykALcKBgBaI9xA79y  
Content-Disposition: form-data; name="username"  


xiaoming 
------WebKitFormBoundarykALcKBgBaI9xA79y  
Content-Disposition: form-data; name="password"  


123456789  
------WebKitFormBoundarykALcKBgBaI9xA79y  
Content-Disposition: form-data; name="uploadFile"; filename="file.txt"  
Content-Type: text/plain  


文件中的内容       
------WebKitFormBoundarykALcKBgBaI9xA79y--  
```



