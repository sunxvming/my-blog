JWT(json web Token),降低耦合性,适用于前后端分离,分布式架构,取代传统的session





## jwt认证流程
1.  客户端发送认证信息 (一般就是用户名 / 密码), 向服务器发送请求
2.  服务器验证客户端的认证信息，验证成功之后，服务器向客户端返回一个 加密的 token (一般情况下就是一个字符串)
3.  客户端存储 (cookie, app 中都可以存储) 这个 token, 在之后每次向服务器发送请求时，都携带上这个 token
4.  服务器验证这个 token 的合法性，只要验证通过，服务器就认为该请求是一个合法的请求


## token生成原理
生成token的底层用了**对称秘钥加密**的方法，jwt的库中会生成一个秘钥保存在本地的文件中。当生成token的时候jwt的库会用这个秘钥来对登录用户的信息(比如用户id，token过期时间等)进行加密操作，然后生成token并发送给客户端。
因为对token加密的秘钥只有生成token的人知道，所有其他人也就无法伪造这个token，从而到达了用户的认证登录。


## token的刷新和主动失效
token本是无状态的，但往往有刷新token和销毁token的需求。这这个需求是**通过token本身无法达到的**，必须将token的信息进行持久化的储存。
其中lavarel中的jwt就是将token存储在redis中，已进行token状态的记录。
具体来讲就是用户销毁token的时候，将此token记录在redis，相当于一个黑名单，再用此token登录时就判定此token已失效。

## lavarel中使用jwt
命令行重新生成秘钥的命令：
```
php artisan jwt:secret
```



## 参考链接：
- [五分钟带你了解啥是JWT](https://zhuanlan.zhihu.com/p/86937325)