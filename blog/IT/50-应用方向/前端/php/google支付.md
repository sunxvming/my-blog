

获取code
```
https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/androidpublisher&response_type=code&access_type=offline&redirect_uri=https://sdk.minervagame.com/api/google_oauth&client_id=1007551836008-g31ue9ttiqikr0tcnj8s8htgb1ef7lc5.apps.googleusercontent.com
```
其中 redirect_uri要在google后台进行配置




[开发者后台]( https://play.google.com/apps/publish)


## 用服务者账号调用google play api
- [googleapis / google-api-php-client](https://github.com/googleapis/google-api-php-client),google api的php的github上的库
- [将 OAuth 2.0 用于服务器到服务器应用程序](https://developers.google.com/identity/protocols/oauth2/service-account),google的用服务者账号调用google play api的文档




## 参考链接
- [google play console](https://play.google.com/console)
- [google api控制台]( https://console.cloud.google.com/apis)
- [Google Play Developer API， 官方文档](https://developers.google.com/android-publisher)，其中里面就有google支付验证的接口
- [Android Google应用内支付（新的集成方式）](https://www.jianshu.com/p/0375402f7a2c)
- [Google支付和服务端验证](https://www.jianshu.com/p/76416ebc0db0),按照此步骤获取到了refresh_token
- [google支付接口被刷以及解决方案 google支付查单](https://my.oschina.net/lemonzone2010/blog/398736)
- [Google Play 结算服务相关术语](https://developer.android.google.cn/google/play/billing/terminology?hl=zh-cn),介绍了商品的类型，如消耗型商品、非消耗商品等
- [Google Play Developer API - "The current user has insufficient permissions to perform the requested operation."](https://stackoverflow.com/questions/43536904/google-play-developer-api-the-current-user-has-insufficient-permissions-to-pe)


- [处理待处理的交易](https://developer.android.com/google/play/billing/integrate#pending)