

## composer的下载
```
curl -sS https://getcomposer.org/installer | php
```
其中的installer为php的代码，执行完上面的代码后，composer.phar就会被下载当前文件夹下。


##  composer使用
1. 编写 composer.json配置文件，在其中声明依赖关系
2. 使用`php composer.phar install`进行安装


注意点：
* composer会在满足条件的情况下去拉取最新的那份依赖


### install和update的区别
* composer update
composer会去读取composer.json中指定的依赖，去分析他们，并且去拉取符合条件最新版本的依赖。
然后他会把所拉取到的依赖放入vendor目录下，并且把所有拉取的依赖的精确版本号写入composer.lock文件中。
* composer install
本地有composer.lock时， 读取composer.lock而非composer.json，并且以此为标准去下载依赖。
本地没有composer.lock时，所做的事情和`composer update`一致


**什么时候使用update**
当你修改了你的依赖关系，不管是新增了依赖，还是修改了依赖的版本，又或者是删除了依赖，


这时候如果你执行`composer install`的时候，是不会有任何变更的，但你会得到一个警告信息
Warning: The lock file is not up to date with the latest changes in composer.json. You may be getting outdated dependencies. Run update to update them.
有人可能会很好奇php是怎么知道我修改了依赖，或者`composer.lock`已经过期了。很简单，如果你打开`composer.lock`的话，
会发现其中有一个hash字段，这就是当时对应的那份依赖的哈希值。如果值不一致自然而然就知道发生了变更了。
这时候，你应该去通过`composer update`来更新下你的依赖了。


**单独更新和安装**
* `composer update monolog/monolog` 不影响别的已经安装的依赖，仅仅更新你修改的部分
* `composer install monolog/monolog` 单独安装一个包


## 文件的自动加载
除了库的下载，Composer 还准备了一个自动加载文件，它可以加载 Composer 下载的库中所有的类文件。 使用它，你只需要将下面这行代码添加到你项目的引导文件中：
```
require 'vendor/autoload.php';
```


## 安装单独的包
使用`composer require 包名`进行安装，安装后会把安装的包自动添加到`composer.josn`和`composer.lock`中。并且进行包的自动导入和加载。
下面以当时安装mycard支付为例
```
./composer require omnipay/common:v3.0.0 #后面可以指定安装的版本， omnipay-mycard 依赖于 omnipay/common
```
```
./composer require sunxvming/omnipay-mycard     # 安装mycard
```
## 包的冲突问题
比如A包依赖C包的版本为3.0，此时需要安装B包，而B包依赖C包的版本为2.0，此时存在依赖两个不同的C包的冲突情况，因此B包安装不会成功。


解决办法1：
将B包的github的仓库fork到自己的仓库，然后修改B的composer.json文件，修改里面的依赖的C包的版本，并把自己github上fork的B包上传到[Packagist](https://packagist.org/)中。然后`composer require`的时候require自己的包。








## 参考链接
- [Composer官网](https://www.phpcomposer.com/)
- [PHP 中的代码依赖管理（大量的 Composer 技巧来袭） ](https://learnku.com/laravel/t/7439/code-dependency-management-in-php)