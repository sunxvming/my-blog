## 关于压力测试

* 压力测试是一项很重要的工作。比如在一个网站上线之前，能承受多大访问量、在大访问量情况下性能怎样，这些数据指标好坏将会直接影响用户体验。但是，在压力测试中存在一个共性，那就是压力测试的结果与实际负载结果不会完全相同，就算压力测试工作做的再好，也不能保证100%和线上性能指标相同。面对这些问题，我们只能尽量去想方设法去模拟。

* 压力测试工作应该放到产品上线之前，而不是上线以后；

* 测试时并发应当由小逐渐加大，比如并发100时观察一下网站负载是多少、打开页面是否流畅，并发200时又是多少、网站打开缓慢时并发是多少、网站打不开时并发又是多少；

* 更详细的进行某个页面测试，如电商网站可以着重测试购物车、推广页面等，因为这些页面占整个网站访问量比重较大。


## 一、ab
安装
```
yum -y install httpd-tools
```
使用
```
ab -c 100 -n 10000  http://192.168.85.128/test/testMysqlIncar
-c 并发量
-n 请求总数量
```

用post方式请求，请求体为json,请求体需要写在文件中
```
ab -n100000 -c500 -p guest.txt -T application/json http://test-sdk.minervagame.com/api/guest/signIn
#  guest.txt 如下
{
    "adid": "C03F20C3-5613-4A0D-85DA-FEA23F0B491F",
    "adjust_id": "7f5101bdaca38ed760748344957e167a",
    "apk_version_code": "6024",
    "apk_version_name": "1.6.6363",
    "device_name": "Apple",
    "device_type": "2",
    "device_unique_id": "C03F20C3-5613-4A0D-85DA-FEA23F0B491F",
    "device_version": "iPad5,1",
    "game_id": "1001",
    "lang": "zh_CN",
    "area_code" : "jp",
    "os": "ios",
    "os_version": "14.2",
    "package_name": "com.lmgames.ImmortalSword",
    "platform_id": "2",
    "regional_code": "na",
    "sdk_version": "1.1.2",
    "signature": "4b5618a009a8b0ed1959e29e6c20889e",
    "time": "1629253656",
    "sdk_tag": "raymond"
}
```


## 二、webbench
webbench的标准测试可以向我们展示服务器的两项内容：每秒钟相应请求数和每秒钟传输数据量。
webbench不但能对静态页面的测试能力，还能对动态页面（ASP,PHP,JAVA,CGI）进 行测试的能力。还有就是他支持对含有SSL的安全网站例如电子商务网站进行静态或动态的性能测试。
Webbench最多可以模拟3万个并发连接去测试网站的负载能力。

### 1.WebBench安装：

```
wget http://blog.s135.com/soft/linux/webbench/webbench-1.5.tar.gz

tar zxvf webbench-1.5.tar.gz
cd webbench-1.5
make
make install

webbench --help  查看帮助
```


### 2.WebBench使用：
```
webbench -c 1000 -t 60 http://192.168.80.157/phpinfo.php

webbench -c 并发数 -t 运行测试时间 URL
```



压测前 `ps -ef| wc -l`  显示85个进程
压测后 `webbench -c 500 -t 30 http://www.baidu.com/` 显示580个进程
说明webbench的每个连接都会生成一个进程
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/e1ee675b-df9a-4e9f-99de-e2ada735f956.png)

查看系统中可创建的进程数实际值  cat /proc/sys/kernel/pid_max     32768  也就是最多能fork三万多进程














