## 一、COOKIE
cookie 是一种在远程浏览器端储存数据并以此来跟踪和识别用户的机制。
PHP在http协议的头信息里发送cookie,格式类似`Set-Cookie:xxx`, 因此 `setcookie()` 函数必须在其它信息被输出到浏览器前调用，这和对 `header()` 函数的限制类似。


### cookie工作机理:
1. 服务器通过随着响应发送一个http的`Set-Cookie`头,在客户机中设置一个cookie
2. 客户端自动向服务器端发送一个http的cookie头,服务器接收读取.

```
HTTP/1.x 200 OK
X-Powered-By: PHP/5.2.1
Set-Cookie: TestCookie=something from somewhere; path=/
Expires: Thu, 19 Nov 2007 18:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-type: text/html
```
这一行实现了cookie功能,收到这行后
```
Set-Cookie: TestCookie=something from somewhere; path=/
```
浏览器将在客户端的磁盘上创建一个cookie文件,并在里面写入:
```
TestCookie=something from somewhere;
```
这一行就是我们用`setcookie('TestCookie','something from somewhere','/');`的结果.
也就是用`header('Set-Cookie: TestCookie=something from somewhere; path=/');`的结果.



### 设置cookie:
可以用 `setcookie()` 或 `setrawcookie()` 函数来设置 cookie。也可以通过向客户端直接发送http头来设置.

**使用setcookie()函数设置cookie**
```
<?php
$value = 'something from somewhere';
setcookie("TestCookie", $value); /* 简单cookie设置 */
setcookie("TestCookie", $value, time()+3600); /* 有效期1个小时 */
setcookie("TestCookie", $value, time()+3600, "/~rasmus/", ".example.com", 1); /* 有效目录 /~rasmus,有效域名example.com及其所有子域名 */
?>
```

**使用header()设置cookie**
```
header("Set-Cookie: name=$value[;path=$path[;domain=xxx.com[;]]");
```
后面的参数和上面列出setcookie函数的参数一样.


### Cookie的读取:
直接用php内置超级全局变量 `$_COOKIE`就可以读取浏览器端的cookie,这个相当于php自动帮你做了从http头中解析cookie的功能。
```
print $_COOKIE['TestCookie'];
```

### 删除cookie
只需把有效时间设为小于当前时间, 和把值设置为空.例如:
```
setcookie("name","",time()-1);
```
用header()类似.


### 常见问题解决:
1. 用setcookie()时有错误提示,可能是因为调用setcookie()前面有输出或空格.也可能你的文档使从其他字符集转换过来,文档后面可能带有BOM签名(就是在文件内容添加一些隐藏的BOM字符).解决的办法就是使你的文档不出现这种情况.还有通过使用ob_start()函数有也能处理一点.
2. `$_COOKIE`受magic_quotes_gpc影响,可能自动转义
3. 使用的时候,有必要测试用户是否支持cookie,有用户是禁用cookie的



## 二、PHP的Session
访问网站的来客会被分配一个唯一的标识符，即所谓的会话ID。它要么存放在客户端的cookie，要么经由 URL 传递。
当来客访问网站时，PHP 会自动（如果 session.auto_start 被设为 1）或在用户请求时（由 session_start() 明确调用或 session_register() 暗中调用）**检查请求中**是否发送了特定的会话 ID。如果是，则之前保存的环境就被重建。

### sessionID的传送
通过cookie传送sessin ID
使用session_start()调用session,服务器端在生成session文件的同时,生成session ID哈希值和默认值为PHPSESSID的session name,并向客户端发送变量为(默认的是)PHPSESSID(session name),值为一个128位的哈希值.服务器端将通过该cookie与客户端进行交互.


### session基本用法实例

```
// page1.php
<?php
session_start();
echo 'Welcome to page #1';
/* 创建session变量并给session变量赋值 */
$_SESSION['favcolor'] = 'green';
$_SESSION['animal'] = 'cat';
$_SESSION['time'] = time();

// 跳转到page2之后依然可以获取session的值
echo '<br /><a href="page2.php">page 2</a>';
?>

// page2.php
<?php
session_start();
print $_SESSION['animal']; // 打印出单个session
var_dump($_SESSION); // 打印出page1.php传过来的session值
?>
```


**删除session**
```
// 要三步实现.
session_destroy(); // 第一步: 删除服务器端session文件,这使用
setcookie(session_name(),'',time()-3600); // 第二步: 删除实际的session:
$_SESSION = array(); // 第三步: 删除$_SESSION全局变量数组
```

### session在PHP大型web应用中的使用
对于访问量大的站点,用默认的session存贮方式并不适合,目前最优的方法是用数据库存取session.这时,函数
`bool session_set_save_handler ( callback open, callback close, callback read, callback write, callback destroy, callback gc )`
就是提供给我们解决这个问题的方案.

该函数使用的6个函数如下:
```
1. bool open() 用来打开会话存储机制,
2. bool close() 关闭会话存储操作.
3. mixde read() 从存储中装在session数据时使用这个函数
4. bool write() 将给定session ID的所有数据写到存储中
5. bool destroy() 破坏与指定的会话ID相关联的数据
6. bool gc() 对存储系统中的数据进行垃圾收集
```

例子见php手册`session_set_save_handler()` 函数.
如果用类来处理,调用className类中的6个静态方法.
```
session_set_save_handler(
    array('className','open'),
    array('className','close'),
    array('className','read'),
    array('className','write'),
    array('className','destroy'),
    array('className','gc'),
)
```


**常用session函数**
```
bool session_start(void); 初始化session
bool session_destroy(void): 删除服务器端session关联文件。
string session_id() 当前session的id
string session_name() 当前存取的session名称,也就是客户端保存session ID的cookie名称.默认PHPSESSID。
array session_get_cookie_params() 与这个session相关联的session的细节.
string session_cache_limiter() 控制使用session的页面的客户端缓存
ini session_cache_expire() 控制客户端缓存时间
bool session_destroy() 删除服务器端保存session信息的文件
void session_set_cookie_params ( int lifetime [, string path [, string domain [, bool secure [, bool httponly]]]] )设置与这个session相关联的session的细节
bool session_set_save_handler ( callback open, callback close, callback read, callback write, callback destroy, callback gc )定义处理session的函数,(不是使用默认的方式)
bool session_regenerate_id([bool delete_old_session]) 分配新的session id
```


### session安全问题
攻击者通过投入很大的精力尝试获得现有用户的有效会话ID,有了会话id,他们就有可能能够在系统中拥有与此用户相同的能力.
因此,我们主要解决的思路是**效验session ID的有效性**.

```
<?php
/**
 * 效验session的合法性
 */
function sessionVerify() {
    if(!isset($_SESSION['user_agent'])){
        $_SESSION['user_agent'] = MD5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
    }
    /* 如果用户session ID是伪造,则重新分配session ID */
    elseif ($_SESSION['user_agent'] != MD5($_SERVER['REMOTE_ADDR']  . $_SERVER['HTTP_USER_AGENT'])) {
        session_regenerate_id();
    }
}


/**
 * 销毁session
 * 三步完美实现,不可漏
 *
 */
function sessionDestroy() {
    session_destroy();
    setcookie(session_name(),'',time()-3600);
    $_SESSION = array();
}
?>
```

注明:
session的保存数据的时候，是通过系列化`$_SESSION`数组来存贮，所以有系列化所拥有的问题，可能有特殊字符的值要用base64_encode函数编码，读取的时候再用base64_decode解码

**SESSION 的数据保存在哪里呢？**

当然是在服务器端，但不是保存在内存中，而是保存在文件或数据库中。
默认情况下，php.ini 中设置的 SESSION 保存方式是 files（session.save_handler = files），即使用读写文件的方式保存 SESSION 数据，而 SESSION 文件保存的目录由 session.save_path 指定，文件名以 sess_ 为前缀，后跟 SESSION ID，如：sess_c72665af28a8b14c0fe11afe3b59b51b。文件中的数据即是序列化之后的 SESSION 数据了。


如果访问量大，可能产生的 SESSION 文件会比较多，这时可以设置分级目录进行 SESSION 文件的保存，效率会提高很多，设置方法为：session.save_path="N;/save_path"，N 为分级的级数，save_path 为开始目录。
当写入 SESSION 数据的时候，PHP 会获取到客户端的 SESSION_ID，然后根据这个 SESSION ID 到指定的 SESSION 文件保存目录中找到相应的 SESSION 文件，不存在则创建之，最后将数据序列化之后写入文件。读取 SESSION 数据是也是类似的操作流程，对读出来的数据需要进行解序列化，生成相应的 SESSION 变量。

当然如果压力大的话，可以存储在redis上，就没有什么压力了。


## cookie和session的登录流程
1. 用户输入用户名、密码、验证码进行登录
2. 服务器验证用户登录信息后：
    * 生产sessionid
    * 往此需要的信息写入到此session
    * 将session的内容会序列化成字符串或者二进制保存在文件或者数据库中
    * 返回的http头中设置sessionid，例如`set-cookie:PHPSESSID=xxxxxxx`，作用是将seesionid设置到浏览器的cookie中
3. 浏览器保存sessionid到cookie中
4. 浏览器再次请求其他页面时，将sessionid设置到http的头中并发送请求
5. 服务器接收到请求后，读取sessionid，并根据这个PHPSESSID查询服务器上有没有对应的session内容，如果有则将其对应的值取出、进行反序列序列化并将值设置到某个对象上。比如php中的是设置到`$_SESSION`数组中。一般这个步骤由框架和编程语言自动完成。程序中可以直接使用session的值