curl既是是一个编程用的函数库，又是一个有用的linux命令行工具，发出网络请求，然后得到和提取数据.
### 默认使用
```
$ curl https://www.example.com
```
上面命令向www.example.com发出 GET 请求，服务器返回的内容会在命令行输出。


### 保存文件
-o参数将服务器的回应保存成文件，等同于`wget`命令。
```
$ curl -o example.html https://www.example.com
```
上面命令将www.example.com保存成example.html。


-O参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。
```
$ curl -O https://www.example.com/foo/bar.html
```
上面命令将服务器回应保存成文件，文件名为bar.html。


### 指定 HTTP 请求的方法
-X参数指定 HTTP 请求的方法。
```
$ curl -X POST https://www.example.com
```
上面命令对https://www.example.com发出 POST 请求。


### 发送 POST
-d参数用于发送 POST 请求的数据体。
```
$ curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
$ curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
```
使用-d参数以后，HTTP 请求会自动加上标头`Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 POST 方法，因此可以省略`-X POST`。
-d参数可以读取本地文本文件的数据，向服务器发送。
```
$ curl -d '@data.txt' https://google.com/login
```
上面命令读取data.txt文件的内容，作为数据体向服务器发送。