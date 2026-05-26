

## 2.9

增加一个接口涉及到的位置：
- api增加xxReq、xxRes方法
- app/boot 下面添加logic
- router增加路由
- controller 增删改查的接口方法，其逻辑是调用service
- service  定义了增删改查的interface
- logic   对应service中接口的具体实现，并在init()方法中创建实例对象，以供service中获取其实例
- dao   外部的dao再调用internal中的dao
- model
	- do  
	- entity





## 1.16

[GoFrame (ZH)-v1.16 - GoFrame (ZH)-v1.16 - GoFrame官网 - 类似PHP-Laravel, Java-SpringBoot的Go企业级开发框架](https://goframe.org/display/gf116)


解决方案的沉淀优先采用工具以及代码形式，而不是文档。




### 问题
[在Goframe使用pgsql的时候使用Save的方法_goframe pgsql-CSDN博客](https://blog.csdn.net/qlynick/article/details/126524195)




### 工具类库
gconv 进行各种类型转换


配置文件


数据库操作debug日志


日志功能





### 生成代码

 gf gen dao
