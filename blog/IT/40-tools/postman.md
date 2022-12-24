## 为什么选择Postman?
* 简单易用 - 要使用Postman，你只需登录自己的账户，只要在电脑上安装了Postman应用程序，就可以方便地随时随地访问文件。
* 使用集合 - Postman允许用户为他们的API调用创建集合。每个集合可以创建子文件夹和多个请求。这有助于组织测试结构。
* 多人协作 - 可以导入或导出集合和环境，从而方便共享文件。直接使用链接还可以用于共享集合。
* 创建环境 - 创建多个环境有助于减少测试重复(DEV/QA/STG/UAT/PROD)，因为可以为不同的环境使用相同的集合。这是参数化发生的地方，将在后续介绍。
* 创建测试 - 测试检查点(如验证HTTP响应状态是否成功)可以添加到每个API调用中，这有助于确保测试覆盖率。
* 自动化测试 - 通过使用集合Runner或Newman，可以在多个迭代中运行测试，节省了重复测试的时间。
* 调试 - Postman控制台有助于检查已检索到的数据，从而易于调试测试。
* 持续集成——通过其支持持续集成的能力，可以维护开发实践。

Postman 有个 workspace 的概念，workspace 分 personal 和 team 类型。Personal workspace 只能自己查看的 API，Team workspace 可添加成员和设置成员权限，成员之间可共同管理 API。

## 如何使用
![](https://sunxvming.com/imgs/37ddb176-f6ee-4e2e-804c-fa3e9c38c733.jpg)


## 如何将请求参数化
数据参数化是Postman最有用的特征之一。你可以将使用到的变量进行参数化，而不是使用不同的数据创建相同的请求，这样会事半功倍，简洁明了。  
这些数据可以来自**数据文件**或**环境变量**。参数化有助于避免重复相同的测试，可用于自动化迭代测试。

参数通过使用**双花括号**创建:`{{sample}}`。

## postman变量
postman 支持的变量的作用范围
* Global
全局变量在整个工作空间中都可用。

* Collection
集合变量可在集合中的整个请求中使用，并且独立于环境，因此请不要根据所选环境进行更改。
* Environment 环境变量使您可以针对不同的环境定制处理，例如本地开发与测试或生产
* Data
数据变量来自外部CSV和JSON文件，以定义在通过Newman或Collection Runner运行集合时可以使用的数据集
* Local
局部变量是临时的，只能在您的请求脚本中访问。


### 环境变量
在做测试的过程中，可能遇到频繁更换测试地址的操作，比如今天开发用了这个测试环境，明天又换了另一个测试环境活正式环境。
在postman中可以设置不同的环境变量以进行不同的环境测试，操作如下：
![](https://sunxvming.com/imgs/ca85f161-bc2c-4659-9e02-63de11231c90.png)

选择环境变量的位置在右上角，并且旁边的小眼睛图片可以查看此环境的所有变量
![](https://sunxvming.com/imgs/0bb93362-7c61-4c6b-8637-16c201608168.png)


## 如何创建Postman Tests
Postman Tests在请求中添加JavaScript代码来协助验证结果，如：成功或失败状态、预期结果的比较等等。
例如如下测试返回值是否为200
![](https://sunxvming.com/imgs/16e299b9-06b0-455c-aa20-dd7bfe5ff27c.jpg)
测试通过了会在下面显示：
![](https://sunxvming.com/imgs/ad504a29-841a-4f99-bf0e-ac9697a53dcb.jpg)


## postman显示返回的base64图片验证码、二维码
postman可以创建一个工作流按顺序测试多个接口，并可以将前面的接口的返回值作为变量传递给后面的接口使用。

在开发中，有些接口返回的数据是base64的图片数据，有时需要实时查看，如图片验证码、二维码等。

在postman的tests输入JS代码，点击SEND
```
// 将接口返回数据赋值处理
var data = {
    response: pm.response.json()
}
// html 模板字符
// 如果base64代码中已包含“data:image/jpg;base64,”，需要在base64代码前面加上，如下：
var template = `<html><img src="{{response.data}}" /></html>`;

// 设置 visualizer 数据。传模板并解析对象。
pm.visualizer.set(template, data);
```

效果如下：
![](https://sunxvming.com/imgs/fba1744a-261c-408d-ac0d-cfa235b9f341.png)



## postman模拟登录过程(验证码、登录、token)
1.获取图片验证码，这一步若没有图片识别，就只能人工识别了。
2.用用户名、密码、验证码进行登录
3.登录接口获取到的token保存到全局变量中，并设置到之后请求的header中


## 如何对collections中的请求做批量测试
### 使用Collection runner运行集合
![](https://sunxvming.com/imgs/50970bae-e718-4f93-a425-95ab0a5de358.png)

### 使用Newman运行集合
运行集合的另一种方式是通过Newman。Newman和Collection Runner之间的主要区别如下:
1. Newman是Postman的替代品，所以需要单独安装Newman；
2. Newman使用命令行，而Collection Runner使用UI界面；
3. Newman可以用于持续集成。

**安装newman**
1.下载并安装nodejs
2.下载newman：`npm install -g newman`


**newman的使用**
其中的`<collection name>`和`<environment name>`是postman中导出的collection文件和environment文件。

关于Newman的一些基础指导如下：
1、只运行集合（如果没有环境或测试数据文件依赖关系，则可以使用此选项。）
```
newman run <collection name>
```

2、运行集合和环境（参数-e 是environment）

```
newman run <collection name> -e <environment name>
```

3、使用所需的编号运行集合的迭代。

```
newman run <collection name> -n <no.of iterations>
```

4、运行数据文件

```
newman run <collection name> --data <file name>  -n <no.of iterations> -e <environment name>
```

5、设置延迟时间。(这一点很重要，因为如果由于请求在后台服务器上，完成前一个请求时没有延迟时间直接启动下一个请求，测试可能会失败。)

```
newman run <collection name> -d <delay time>
```




## postman的导入和导出
**collections**
postman的collections可以用文件的方式导入和导出，也可以生成 public link让其他人进行导入。这个public link修改后是不进行同步的。

**environments**
在导出collections的时候是不能顺便导出环境变量的，环境变量得单独的进行导出。


## 参考链接
- [API测试之Postman使用完全指南(Postman教程，这篇文章就够了)](https://www.cnblogs.com/softwaretesterpz/p/13205666.html)
- [使用postman创建collection测试接口](https://blog.csdn.net/weixin_33725722/article/details/88678349)



