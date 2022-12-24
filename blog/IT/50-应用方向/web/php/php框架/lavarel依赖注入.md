Laravel实现构造函数自动依赖注入的方法


Laravel框架的依赖注入确实很强大，并且通过**容器**实现依赖注入可以有选择性的加载需要的服务，减少初始化框架的开销

Laravel提供了多种依赖注入的方式。首先就将实现构造器或者方法参数的注入，这种依赖注入的方式比较简单，也不需要怎么配置。只要在方法的参数中写入类的类型，这个时候，类的实例就会注入到这个参数上，我们在使用的时候，就可以直接使用，而不用我们再去new这个类的实例，这个new的过程，已经由框架替我们做了。
```
class Test
{
    //这是一个类
}

class TestController extend Controller
{
    public function __contract(Test $test)
    {
        print_r($test);
    }
}
```
这样我们不用对`$test`变量做任何的赋值操作，Laravel会帮我们把Test的实例赋值给`$test`变量，这就是一种依赖注入的使用。我们的依赖的Test就这样被注入到了参数里头。我们平时使用Laravel的控制器中接收页面参数的时候，就是依赖注入。


lavarel中实现的源码在`vendor/illuminate/container/Container.php`中的`build`方法中。


## 参考链接
- [Laravel实现构造函数自动依赖注入的方法](http://blog.jkloozx.com/?id=105)