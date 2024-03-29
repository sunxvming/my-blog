## OAuth介绍
OAuth 2.0 是目前最流行的授权机制，用来授权第三方应用，获取用户数据。


简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。


令牌（token）与密码（password）的作用是一样的，都可以进入系统，但是有三点差异。
（1）令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化。
（2）令牌可以被数据所有者撤销，会立即失效。密码一般不允许被他人撤销。
（3）令牌有权限范围（scope）。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。


上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这就是 OAuth 2.0 的优点。


注意，只要知道了令牌，就能进入系统。系统一般不会再次确认身份，所以令牌必须保密，泄漏令牌与泄漏密码的后果是一样的。 这也是为什么令牌的有效期，一般都设置得很短的原因。


OAuth 2.0 对于如何颁发令牌的细节，规定得非常详细。具体来说，一共分成四种授权类型（authorization grant），即四种颁发令牌的方式，适用于不同的互联网场景。


## OAuth 2.0 的四种方式
OAuth 2.0 的标准是 RFC 6749 文件。该文件先解释了 OAuth 是什么。
> OAuth 引入了一个授权层，用来分离两种不同的角色：客户端和资源所有者。......资源所有者同意以后，资源服务器可以向客户端颁发令牌。客户端通过令牌，去请求数据。


这段话的意思就是，OAuth 的核心就是向第三方应用颁发令牌。然后，RFC 6749 接着写道：
> （由于互联网有多种场景，）本标准定义了获得令牌的四种授权方式（authorization grant ）。


也就是说，OAuth 2.0 规定了四种获得令牌的流程。你可以选择最适合自己的那一种，向第三方应用颁发令牌。下面就是这四种授权方式。
注意，不管哪一种授权方式，第三方应用申请令牌之前，都必须先到**系统备案**，说明自己的身份，然后会拿到两个身份识别码：客户端 ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的。


### 第一种授权方式：授权码
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/b829050a-6a7d-4b1c-aa75-8d5b9673d098.jpg)


### 第二种方式：隐藏式
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/6cf0a5d4-c303-4852-a129-93674186df71.jpg)


### 第三种方式：密码式
这种方式需要用户给出自己的用户名/密码，显然风险很大，因此只适用于其他授权方式都无法采用的情况，而且必须是用户高度信任的应用。


### 第四种方式：凭证式




### 令牌的使用
A 网站拿到令牌以后，就可以向 B 网站的 API 请求数据了。
此时，每个发到 API 的请求，都必须带有令牌。具体做法是在请求的头信息，加上一个`Authorization`字段，令牌就放在这个字段里面。


 ```
curl -H "Authorization: Bearer ACCESS_TOKEN" \
"https://api.b.com"
```
上面命令中，`ACCESS_TOKEN`就是拿到的令牌。


### 更新令牌
令牌的有效期到了，如果让用户重新走一遍上面的流程，再申请一个新的令牌，很可能体验不好，而且也没有必要。OAuth 2.0 允许用户自动更新令牌。


具体方法是，B 网站颁发令牌的时候，一次性颁发两个令牌，一个用于获取数据，另一个用于获取新的令牌（refresh token 字段）。令牌到期前，用户使用 refresh token 发一个请求，去更新令牌。

> ```
> https://b.com/oauth/token?
>   grant_type=refresh_token&
>   client_id=CLIENT_ID&
>   client_secret=CLIENT_SECRET&
>   refresh_token=REFRESH_TOKEN
> ```


上面 URL 中，`grant_type`参数为`refresh_token`表示要求更新令牌，`client_id`参数和`client_secret`参数用于确认身份，`refresh_token`参数就是用于更新令牌的令牌。
B 网站验证通过以后，就会颁发新的令牌。




## 参考链接
- [OAuth 2.0 的一个简单解释](https://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
- [OAuth 2.0 的四种方式](https://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)
- [GitHub OAuth 第三方登录示例教程](http://www.ruanyifeng.com/blog/2019/04/github-oauth.html)