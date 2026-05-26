HTTP和HTTPS比较
 
1、HTTP明文协议的缺陷容易导致数据泄露、数据篡改、流量劫持、钓鱼攻击等安全问题。
2、网页篡改及劫持篡改网页推送广告。
3、HTTP协议无法验证通信方身份，可以伪造虚假服务器欺骗用户。
4、WIFI热点的普及和移动网络的加入，放大了数据被劫持、篡改的风险。
5、HTTPS普遍认为性能消耗要大于HTTP。但是我们可以通过性能优化、把证书部署在SLB或CDN，来解决此问题。



在请求的源头改变http的类型
```php
<?php
//http转化为https   
if ($_SERVER["HTTPS"] == "on")
{
$xredir="https://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
header("Location: ".$xredir);
}
?>  


<?php
//https转化为http   
if ($_SERVER["HTTPS"] != "on")  
{  
$xredir="http://".$_SERVER["SERVER_NAME"]. $_SERVER["REQUEST_URI"];  
header("Location: ".$xredir);  
}   
?>
```

https里面的有http的链接解决方法
1.可以在相应的页面的`<head>`里加上下面这句代码，意思是自动将http的不安全请求升级为https
`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`
      
2.使用相对协议地址 `http://`   改成  `//` 

