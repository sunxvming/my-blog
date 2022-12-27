在谈Session 之前，我们要先了解Cookie。你知道网站是如何辨识我们的身份吗？为什么我们输入完帐号密码之后，网站就知道我们是谁呢？就是利用Cookie。Cookie 是网站在浏览器中存放的资料，内容包括使用者在网站上的偏好设定、或者是登入的Session ID。网站利用Session ID 来辨认访客的身份。


Cookie 既然存放在Client 端，那就有被窃取的风险。例如透过 如果Cookie 被偷走了，你的身份就被窃取了。


## Session攻击手法
### 1.猜测Session ID (Session Prediction)
Session ID 如同我们前面所说的，就如同是会员卡的编号。只要知道Session ID，就可以成为这个使用者。如果Session ID 的长度、复杂度、杂乱度不够，就能够被攻击者猜测。攻击者只要写程式不断暴力计算Session ID，就有机会得到有效的Session ID 而窃取使用者帐号。

**防护措施**
使用Session ID 分析程式进行分析，评估是否无法被预测。如果没有100% 的把握自己撰写的Session ID 产生机制是安全的，不妨使用内建的Session ID 产生function，通常都有一定程度的安全。

### 2.窃取Session ID（Session Hijacking）
窃取Session ID 是最常见的攻击手法。攻击者可以利用多种方式窃取Cookie 获取Session ID：
1.跨站脚本攻击
2.网路窃听：使用ARP Spoofing 等手法窃听网路封包获取Cookie
3.透过Referer 取得：若网站允许Session ID 使用URL 传递，便可能从Referer 取得Session ID

受害者已经登入网站伺服器，并且取得Session ID，在连线过程中攻击者用窃听的方式获取受害者Session ID。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/3581a09b-582d-4e27-bda4-a2377a3a2132.jpg)
攻击者直接使用窃取到的Session ID 送至伺服器，伪造受害者身分。若伺服器没有检查Session ID 的使用者身分，则可以让攻击者得逞。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/3fcaca3a-a59b-4912-8e00-ed694b602ad0.jpg)

**防护措施**
* 禁止将Session ID 使用URL (GET) 方式来传递
* 设定加强安全性的Cookie 属性：HttpOnly (无法被JavaScript 存取)
* 设定加强安全性的Cookie 属性：Secure (只在HTTPS 传递，若网站无HTTPS 请勿设定)
* 在需要权限的页面请使用者重新输入密码

## session攻击例子
关于cookie的一些属性，里面有一个httponly的属性，也就是是否禁止js读取cookie。不幸的是很多常见的服务器（比如apache和tomcat）在生成这个存储sessionid的cookie的时候，没有设置httponly这个属性，也就是说js是可以将这个sessionid读取出来的。
 js读取到sessionid，这会有问题吗？你网站上的运行的js代码并不一定是你写的，比如说一般网站都有一个发表文章或者说发帖的功能，如果别有用心的人在发表的时候填写了html代码（这些html一般是超链接或者图片），但是你的后台又没有将其过滤掉，发表出来的文章，被其他人点击了其中恶意链接时，就出事了。这也就是我们常说的XSS跨站脚本攻击(Cross Site Scripting)。
比如链接可以是一段js代码，代码的逻辑是获取点击者的sessionid，并将其发送到指定的地址，而指定的地址则用力此sessionid来伪造http请求进行无需密码权限的登录。



## Session 防护
每个使用者在登入网站的时候，都带有特殊的标识，比如：来源IP 位址、浏览器User-Agent。
如果在同一个Session 中，使用者的IP 或者User-Agent 改变了，最安全的作法就是把这个Session 清除，请使用者重新登入。虽然使用者可能因为IP 更换、Proxy 等因素导致被强制登出，但为了安全性，便利性必须要与之取舍。以PHP 为例，我们可以这样撰写：

```
if($_SERVER['REMOTE_ADDR'] !== $_SESSION['LAST_REMOTE_ADDR'] || $_SERVER['HTTP_USER_AGENT'] !== $_SESSION['LAST_USER_AGENT']) {
   session_destroy();
}
session_regenerate_id();
$_SESSION['LAST_REMOTE_ADDR'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['LAST_USER_AGENT'] = $_SERVER['HTTP_USER_AGENT'];
```

除了检查个人识别资讯来确认是否盗用之外，也可以增加前述的Session ID 的防护方式：
* Cookie 设定Secure Flag (HTTPS)
* Cookie 设置 HTTP Only Flag

Session 的清除机制也非常重要。当伺服器侦测到可疑的使用者Session 行为时，例如攻击者恶意尝试伪造Session ID、使用者Session 可能遭窃、或者逾时等情况，都应该立刻清除该Session ID 以免被攻击者利用。

Session 清除机制时机：
* 侦测到恶意尝试Session ID
* 识别资讯无效时
* 逾时



## 参考链接
- [session的基本原理及安全性](https://blog.csdn.net/yunnysunny/article/details/26935637)
- [session安全问题](https://www.cnblogs.com/zyy04105113/articles/5743837.html)