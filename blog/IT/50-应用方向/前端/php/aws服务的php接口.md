

AWS CloudFront,CDN加速的产品，可以和S3一起配合使用。


## 邮件发送服务ses
若用aws的服务器每月有免费的几万封的额度，其中调用使用方式可以是一下几种：
1. 调用aws提供的发送邮件的api，可以去看aws的文档，或者去Packagist中搜索一下别人已经封装好的aws的库
2. 使用aws的smtp的服务器发送


注意点：
1. 发送的发件人邮箱需要在aws的后台中添加，然后aws会发送邮件进行认证此邮箱是户用本人的邮箱，认证完成后就可以进行发送了。
2. 发送服务分为沙盒环境和正式环境，沙盒环境中能在aws后台添加的邮件列表之间发送，正式环境可以随意发。
3. 发送邮件时有每天多少封的限制的，具体在aws的后台看




## 参考链接
- [aws-sdk-php-laravel](https://github.com/aws/aws-sdk-php-laravel)
- [Laravel-AWS S3控制台+API完整流程](https://blog.csdn.net/qq_43489208/article/details/113759771)