

## 苹果登录验证
实现原理：
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/264f22e3-7a76-4418-8646-fc917b377dc9.jpg)










## 苹果退款
苹果在2020年6月的开发者大会上宣告支持普通商品的退款回调服务，只需要在开发者后台配置回调网址即可收到退款通知
苹果给出推送退款的功能，是 server to server，所以我们需要将接收退款通知推送的接口填入苹果后台。
处理退款主要是先判断notification_type是否为REFUND，是的话再根据其他的参数来处理退款订单


通知是分版本1和版本2的，通过在回调url上加v1和v2进行标识。文档如下：[启用 App Store 服务器通知 ](https://developer.apple.com/documentation/appstoreservernotifications/enabling_app_store_server_notifications)


## 参考链接
- [苹果官方文档](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)
- [PHP后端实现苹果三方登录/signin-with-apple 授权验证](https://blog.csdn.net/curioust/article/details/105353930)
- [关于苹果内购商品退款的开发联调](https://zhuanlan.zhihu.com/p/339675669)
- [喜大普奔，苹果可以推送退款通知了](https://blog.csdn.net/qq_41342577/article/details/107030335)


- [Receiving App Store Server Notifications ](https://developer.apple.com/documentation/appstoreservernotifications/receiving_app_store_server_notifications)
- [IOS In App Purchase(内购)验证 ](https://www.cnblogs.com/zhaoqingqing/p/4597794.html)
- [IAP (In-App purchase) - 简书](https://www.jianshu.com/p/f2d30aa59cbb)




