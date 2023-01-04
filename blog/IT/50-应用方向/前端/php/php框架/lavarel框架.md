## 请求周期
HTTP / Console 内核
设置bootstrappers ，和必须的中间件


服务提供者
在app.php中进行配置
服务提供者给予框架开启多种多样的组件，像数据库，队列，验证器，以及路由组件。只要被启动服务提供者就可支配框架的所有功能，所以服务提供者也是 Laravel 整个引导周期最重要组成部分。


服务提供者是 Laravel 真正意义的生命周期中的关键。应用实例一旦创建，服务提供者就被注册，然后请求被启动的应用接管。简单吧！




## 服务容器
Laravel 服务容器是一个用于管理类的依赖和执行依赖注入的强大工具。






## auth流程
1. 在config/auth.php 中配置不同类型请求所使用的auth
2. 在路由中设置auth的中间件
3. 在auth的中间件中进行用户的验证
```
// 设置用什么方式验证
$this->auth->shouldUse($guard);
shouldUse的方法在AuthManager.php中，在这里设置获取user对象的回调函数，代码如下：
$this->userResolver = function ($name = null) {
      return $this->guard($name)->user();
};




// 验证是否登录
$this->auth->guard($guard)->guest())
```