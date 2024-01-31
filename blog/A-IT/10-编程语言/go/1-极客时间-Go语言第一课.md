## 资源链接
- [github源码](https://github.com/bigwhite/publication/tree/master/column)

## 开篇词｜这样入门Go，才能少走弯路
使用go的理由
* 对初学者足够友善，能够快速上手。
* 生产力与性能的最佳结合。
* 快乐又有“钱景”。

## 01｜前世今生：你不得不了解的Go的历史和现状
当你开始接触一门新语言的时候，你一定要去了解它的历史和现状。因为这样，你才能建立起对这门语言的整体认知，了解它未来的走向。
2007年，Go 语言的创始人有三位，分别是图灵奖获得者、C 语法联合发明人、Unix 之父肯·汤普森(Ken Thompson)、Plan 9 操作系统领导者、UTF-8 编码的最初设计者罗伯·派克(Rob Pike)，以及 Java 的 HotSpot 虚拟机和 Chrome 浏览器的 JavaScript V8 引擎的设计者之一罗伯特·格瑞史莫(Robert Griesemer)。有了创建go的想法。
2009年，Go 语言第一次公之于众，并开源。
2012年 ，Go 1.0 版本正式发布

## 02｜拒绝“Hello and Bye”：Go语言的设计哲学是怎么一回事？
编程语言的设计哲学，就是指决定这门语言演化进程的高级原则和依据。设计哲学之于编程语言，就好比一个人的价值观之于这个人的行为。
我将 Go 语言的设计哲学总结为五点：简单、显式、组合、并发和面向工程

### 简单
选择了“简单”，就意味着 Go 不会像 C++、Java 那样将其他编程语言的新特性兼蓄并收，所以你在 Go 语言中看不到传统的面向对象的类、构造函数与继承，看不到结构化的异常处理，也看不到本属于函数编程范式的语法元素。

### 显示
```
c = int64(a) + int64(b)
fmt.Printf("%d\n", c)
```
而这其实就是 Go 语言显式设计哲学的一个体现。在 Go 语言中，不同类型变量是不能在一起进行混合计算的，这是因为 Go 希望开发人员明确知道自己在做什么。
除此之外，Go 设计者所崇尚的显式哲学还直接决定了 Go 语言错误处理的形态：Go 语言采用了显式的基于值比较的错误处理方案，函数 / 方法中的错误都会通过 return 语句显式地返回，并且通常调用者不能忽略对返回的错误的处理。

### 组合
Go 语言为支撑组合的设计提供了类型嵌入(Type Embedding)。
```
// $GOROOT/src/sync/pool.go
type poolLocal struct {
    private interface{}   
    shared  []interface{}
    Mutex               
    pad     [128]byte  
}
```
在代码段中，我们在 poolLocal 这个结构体类型中嵌入了类型 Mutex，这就使得 poolLocal 这个类型具有了互斥同步的能力，我们可以通过 poolLocal 类型的变量，直接调用 Mutex 类型的方法 Lock 或 Unlock。

另外，我们在标准库中还会经常看到类似如下定义接口类型的代码段：
```
// $GOROOT/src/io/io.go
type ReadWriter interface {
    Reader
    Writer
}
```
这里，标准库通过**嵌入接口类型**的方式来实现接口行为的聚合，组成大接口，这种方式在标准库中尤为常用，并且已经成为了 Go 语言的一种**惯用法**。

### 并发
Go 放弃了传统的基于操作系统线程的并发模型，而采用了用户层轻量级线程，Go 将之称为 goroutine。
goroutine 占用的资源非常小，Go 运行时默认为每个 goroutine 分配的栈空间仅 2KB。goroutine 调度的切换也不用陷入(trap)操作系统内核层完成，代价很低。因此，一个 Go 程序中可以创建成千上万个并发的 goroutine。而且，所有的 Go 代码都在 goroutine 中执行，哪怕是 go 运行时的代码也不例外。

### 面向工程
Go 语言设计的初衷，就是面向解决真实世界中 Google 内部大规模软件开发存在的各种问题，为这些问题提供答案，这些问题包括：程序构建慢、依赖管理失控、代码难于理解、跨语言构建难等。
在 Go 语言最初设计阶段就将解决工程问题作为 Go 的设计原则之一去考虑 Go 语法、工具链与标准库的设计，这也是 Go 与其他偏学院派、偏研究型的编程语言在设计思路上的一个重大差异。


## 03｜配好环境：选择一种最适合你的Go安装方法

安装多个 Go 版本
1. 手动安装不同的go版本，安装到不同的路径后再设置环境变量，通过考环境变量来使用不同的go版本
2. go get 命令，例如如下，之后带版本的go就下载下来了，然后通过带版本号的 go 命令来使用特定版本的 Go 了
```
go get golang.org/dl/go1.15.13
go1.15.13 download
```


Go 版本的选择策略：
* 第一种，也是我们推荐的一种，那就是使用 Go 最新的版本，这样你可以体验到 Go 的最新语言特性，应用到标准库的最新 API 以及 Go 工具链的最新功能，并且很多老版本中的 bug 在最新版本中都会得到及时修复；
* 如果你还是对最新版本的稳定性有一丝担忧，你也可以选择使用次新版；
* 最后，如果你要考虑现存生产项目或开源项目，那你按照需要选择，与项目策略保持一致就好了。


## 04｜初窥门径：一个Go程序的结构是怎样的？

## 05｜标准先行：Go项目的布局标准是什么？
Go 项目的典型结构布局是怎样的？
一个 Go 项目通常分为可执行程序项目和库项目(让其他用户使用的)，
可执行程序
```
exe-layout
├── cmd/
│   ├── app1/
│   │   └── main.go
│   └── app2/
│       └── main.go
├── go.mod
├── go.sum
├── internal/
│   ├── pkga/
│   │   └── pkg_a.go
│   └── pkgb/
│       └── pkg_b.go
├── pkg1/
│   └── pkg1.go
├── pkg2/
│   └── pkg2.go
└── vendor/
```

库程序
```
lib-layout
├── go.mod
├── internal/
│   ├── pkga/
│   │   └── pkg_a.go
│   └── pkgb/
│       └── pkg_b.go
├── pkg1/
│   └── pkg1.go
└── pkg2/
    └── pkg2.go
```

## 06｜构建模式：Go是怎么解决包依赖管理问题的？
### 深入 Go Module 构建模式
Go 语言设计者在设计 Go Module 构建模式，来解决“包依赖管理”的问题时，进行了几项创新，这其中就包括语义导入版本 (Semantic Import Versioning)，以及和其他主流语言不同的最小版本选择 (Minimal Version Selection) 等机制。

* go.mod 的 require 段中依赖的版本号，都符合 vX.Y.Z 的格式。
* 如果同一个包的新旧版本是兼容的，那么它们的包导入路径应该是相同的。
* 如果包的主版本升级后，或主版本不同时，在导入包的时候将包主版本号引入到包导入路径中。例如：`import "github.com/sirupsen/logrus/v2"`
* 可以同时依赖一个包的两个不兼容版本，有些语言的包管理机制则不允许同时依赖两个不兼容的版本的包。
* 当不同的包依赖于同一个包的不同版本时， Go 会在该项目依赖项的所有版本中，选出符合项目整体要求的“最小版本”，而不是最新的版本。


### 最小版本选择
当前存在的主流编程语言，以及 Go Module 出现之前的很多 Go 包依赖管理工具都会选择依赖项的“最新最大 (Latest Greatest) 版本。
理想状态下，如果语义版本控制被正确应用，并且这种“社会契约”也得到了很好的遵守，那么这种选择算法是有道理的，而且也可以正常工作。在这样的情况下，依赖项的“最新最大版本”应该是最稳定和安全的版本，并且应该有向后兼容性。至少在相同的主版本 (Major Verion) 依赖树中是这样的。

go的方式：
A和B都依赖于C，A依赖于C的v1.0.0，B依赖于C的v1.3.0，而C的最新版本是v1.7.0，那么Go会选择v1.3.0作为项目依赖项的版本。
Go 设计者另辟蹊径，在诸多兼容性版本间，他们不光要考虑最新最大的稳定与安全，还要尊重各个 module 的述求：A 明明说只要求 C v1.1.0，B 明明说只要求 C v1.3.0。所以 Go 会在该项目依赖项的所有版本中，选出符合项目整体要求的“最小版本”,能同时满足A和B的声明要求。




go.sum
这是 Go Module 的一个**安全措施**。当将来这里的某个 module 的特定版本被再次下载的时候，go 命令会使用 go.sum 文件中对应的哈希值，和新下载的内容的哈希值进行比对，只有哈希值比对一致才是合法的，这样可以确保你的项目所依赖的 module 内容，不会被恶意或意外篡改。因此，我推荐你把 go.mod 和 go.sum 两个文件与源码，一并提交到代码版本控制服务器上。


小结:
在这一讲中，我们初步了解了 Go 语言构建模式的演化历史。
Go 语言最初发布时内置的构建模式为 **GOPATH 构建模式**。在这种构建模式下，所有构建都离不开 GOPATH 环境变量。在这个模式下，Go 编译器并没有关注依赖包的版本，开发者也无法控制第三方依赖的版本，导致开发者无法实现可重现的构建。
那么，为了支持可重现构建，Go 1.5 版本引入了 vendor 机制，开发者可以在项目目录下缓存项目的所有依赖，实现可重现构建。但 vendor 机制依旧不够完善，开发者还需要手工管理 vendor 下的依赖包，这就给开发者带来了不小的心智负担。
后来，Go 1.11 版本中，Go 核心团队推出了新一代构建模式：Go Module 以及一系列创新机制，包括语义导入版本机制、最小版本选择机制等。语义导入版本机制是 Go Moudle 其他机制的基础，它是通过在包导入路径中引入主版本号的方式，来区别同一个包的不兼容版本。而且，Go 命令使用最小版本选择机制进行包依赖版本选择，这和当前主流编程语言，以及 Go 社区之前的包依赖管理工具使用的算法都有点不同。


## 07｜构建模式：Go Module的6类常规操作

### 为当前 module 添加一个依赖
1. import 包名  2. go get 包名或go mod tidy进行依赖包下载，一般会下载最新的版本

### 升级/降级依赖的版本
比如基于初始状态执行的 go mod tidy 命令，帮我们选择了 logrus 的最新发布版本 v1.8.1
如果你觉得这个版本存在某些问题，想将 logrus 版本降至某个之前发布的兼容版本，比如 v1.7.0，那么我们可以在项目的 module 根目录下，执行带有版本号的 go get 命令：
```
# 在项目根目录下执行
$go get github.com/sirupsen/logrus@v1.7.0
go: downloading github.com/sirupsen/logrus v1.7.0
go get: downgraded github.com/sirupsen/logrus v1.8.1 => v1.7.0
# 或者
$go mod edit -require=github.com/sirupsen/logrus@v1.7.0
$go mod tidy       
go: downloading github.com/sirupsen/logrus v1.7.0

# 当依赖的主版本号为 0 或 1 的时候，我们在 Go 源码中导入依赖包，不需要在包的导入路径上增加版本号，即
import github.com/user/repo/v0 等价于 import github.com/user/repo
import github.com/user/repo/v1 等价于 import github.com/user/repo
```

### 添加一个主版本号大于 1 的依赖
1. 在声明它的导入路径的基础上，加上版本号信息，例如：`import  "github.com/go-redis/redis/v7"`
2.  `go get github.com/go-redis/redis/v7` 或 `go mod tidy`


### 升级依赖版本到一个不兼容版本
1. 先将代码中包导入路径中的版本号改为升级后的版本
2.  `go get github.com/go-redis/redis/v7` 或 `go mod tidy`

### 移除一个依赖
仅从源码中删除对依赖项的导入语句还不够。这是因为如果源码满足成功构建的条件，go build 命令是不会“多管闲事”地清理 go.mod 中多余的依赖项的。
我们还得用 go mod tidy 命令，它会自动分析源码依赖，而且将不再使用的依赖从 go.mod 和 go.sum 中移除。

### 特殊情况：使用 vendor,这种方式很便于开发者查看源码，还不错
vendor 机制虽然诞生于 GOPATH 构建模式主导的年代，但在 Go Module 构建模式下，它依旧被保留了下来，并且成为了 Go Module 构建机制的一个很好的补充。特别是在一些不方便访问外部网络，并且对 Go 应用构建性能敏感的环境，比如在一些内部的持续集成或持续交付环境 (CI/CD) 中，使用 vendor 机制可以实现与 Go Module 等价的构建。
和 GOPATH 构建模式不同，Go Module 构建模式下，我们再也无需手动维护 vendor 目录下的依赖包了，Go 提供了可以快速建立和更新 vendor 的命令。
```
go mod vendor
```
go mod vendor 命令在 vendor 目录下，创建了一份这个项目的依赖包的副本，并且通过 vendor/modules.txt 记录了 vendor 下的 module 以及版本。
如果我们要基于 vendor 构建，而不是基于本地缓存的 Go Module 构建，我们需要在 go build 后面加上 -mod=vendor 参数。
在 Go 1.14 及以后版本中，如果 Go 项目的顶层目录下**存在 vendor 目录**，那么 go build 默认也会优先基于 vendor 构建，除非你给 go build 传入 -mod=mod 的参数。

## 08｜入口函数与包初始化：搞清Go程序的执行次序
相较于 main.main 作为 Go 应用的入口，main.main 函数返回的意义其实更大，因为 main 函数返回就意味着整个 Go 程序的终结，而且你也不用管这个时候是否还有其他子 Goroutine 正在执行。
对于 main 包的 main 函数来说，它虽然是用户层逻辑的入口函数，但它却不一定是用户层第一个被执行的函数。
在main函数执行之前，会进行包初始化的 init 函数，注意：包的init函数不能被手工显式地调用

### Go 包的初始化次序
我们从程序逻辑结构角度来看，Go 包是程序逻辑封装的基本单元，每个包都可以理解为是一个“自治”的、封装良好的、对外部暴露有限接口的基本单元。一个 Go 程序就是由一组包组成的，程序的初始化就是这些包的初始化。每个 Go 包还会有自己的依赖包、常量、变量、init 函数(其中 main 包有 main 函数)等。
在这里你要注意：我们在阅读和理解代码的时候，需要知道这些元素在在程序初始化过程中的初始化顺序，这样便于我们确定在某一行代码处这些元素的当前状态。
* 包初始化是个递归的过程，采用深度优先的规则进行
* 一个被多个包依赖的包仅会初始化一次
* 每个包内按以“常量 -> 变量 -> init 函数”的顺序进行初始化；
* 包内的多个 init 函数按出现次序进行自动调用。


### init 函数的用途
Go 包初始化时，init 函数的初始化次序在变量之后，这给了开发人员在 init 函数中对包级变量进行进一步检查与操作的机会。

#### 重置包级变量值
init 函数就好比 Go 包真正投入使用之前唯一的“质检员”，负责对包内部以及暴露到外部的包级数据（主要是包级变量）的初始状态进行检查。

#### 实现对包级变量的复杂初始化
```
var (
    http2VerboseLogs    bool // 初始化时默认值为false
    http2logFrameWrites bool // 初始化时默认值为false
    http2logFrameReads  bool // 初始化时默认值为false
    http2inTests        bool // 初始化时默认值为false
)
func init() {
    e := os.Getenv("GODEBUG")
    if strings.Contains(e, "http2debug=1") {
        http2VerboseLogs = true // 在init中对http2VerboseLogs的值进行重置
    }
    if strings.Contains(e, "http2debug=2") {
        http2VerboseLogs = true // 在init中对http2VerboseLogs的值进行重置
        http2logFrameWrites = true // 在init中对http2logFrameWrites的值进行重置
        http2logFrameReads = true // 在init中对http2logFrameReads的值进行重置
    }
}
```
#### 在 init 函数中实现“注册模式”
这种通过在 init 函数中注册自己的实现的模式，就有效降低了 Go 包对外的直接暴露，尤其是包级变量的暴露，从而避免了外部通过包级变量对包状态的改动。
```
import (
    "database/sql"
    _ "github.com/lib/pq"
)
func main() {
    db, err := sql.Open("postgres", "user=pqgotest dbname=pqgotest sslmode=verify-full")     //没有使用lib/pq库的地方
    if err != nil {
        log.Fatal(err)
    }
    
    age := 21
    rows, err := db.Query("SELECT name FROM users WHERE age = $1", age)
    ...
}

// 这个奥秘就在，我们其实是利用了用空导入的方式导入 lib/pq 包时产生的一个“副作用”，也就是 lib/pq 包作为 main 包的依赖包，它的 init 函数会在 pq 包初始化的时候得以执行。

// pq包中的init函数
func init() {
    //pq 包将自己实现的 sql 驱动注册到了 sql 包中
    //这样只要应用层代码在 Open 数据库的时候，传入驱动的名字(这里是“postgres”)，那么通过 sql.Open 函数，
    //返回的数据库实例句柄对数据库进行的操作，实际上调用的都是 pq 包中相应的驱动实现。
    sql.Register("postgres", &Driver{})      
}
```
另外，从标准库 database/sql 包的角度来看，这种“注册模式”实质是一种工厂设计模式的实现，sql.Open 函数就是这个模式中的工厂方法，它根据外部传入的驱动名称“生产”出不同类别的数据库实例句柄。

###  init 函数在检查包数据初始状态时遇到失败或错误的情况
一般是根据初始化严重程度的级别来抛出不同的错误，若是较为严重的影响程序生命周期的错误，则直接抛出运行时恐慌(Panic)，如果是较低级别的错误，可以通过记录trance等提供相应错误日志

## 09｜即学即练：构建一个Web服务就是这么简单


## 10｜变量声明：静态语言有别于动态语言的重要特征
如果你没有显式为变量赋予初值，Go 编译器会为变量赋予这个类型的零值：
```
var a int // a的初值为int类型的零值：0
```

Go 语言的变量可以分为两类：一类称为包级变量 (package varible)，另一类则是局部变量 (local varible)
包级变量只能使用带有 var 关键字的变量声明形式




## 11｜代码块与作用域：如何保证变量不会被遮蔽？
在这一讲中，我们学习了另外两个变量相关的概念：代码块与作用域。
代码块有显式与隐式之分，显式代码块就是包裹在一对配对大括号内部的语句序列，而隐式代码块则不容易肉眼分辨，它是通过 Go 语言规范明确规定的。理解隐式代码块是理解代码块概念以及后续作用域概念的前提与基础。
隐式代码块有五种，分别是：
* 宇宙代码块
* 包代码块
* 文件代码块
* 分支控制语句隐式代码块
* switch/select 的子句隐式代码块

**作用域**的概念是 Go 源码编译过程中标识符(包括变量)的一个属性。Go 编译器会校验每个标识符的作用域，如果它的使用范围超出其作用域，编译器会报错。
不过呢，我们可以使用**代码块的概念来划定每个标识符的作用域**。划定原则就是声明于外层代码块中的标识符，其作用域包括所有内层代码块。但是，Go 的这种作用域划定也带来了**变量遮蔽**问题。简单的遮蔽问题，我们通过分析代码可以很快找出，复杂的遮蔽问题，即便是通过 go vet 这样的静态代码分析工具也难于找全。
因此，我们只有了解变量遮蔽问题本质，在日常编写代码时注意同名变量的声明，注意短变量声明与控制语句的结合，才能从根源上尽量避免变量遮蔽问题的发生。


变量遮蔽(Variable Shadowing)
变量遮蔽问题的根本原因，就是内层代码块中声明了一个与外层代码块同名且同类型的变量，这样，内层代码块中的同名变量就会替代那个外层变量

短变量声明与控制语句的结合十分容易导致变量遮蔽问题，并且很不容易识别，因此在日常 go 代码开发中你要尤其注意两者结合使用的地方。

利用工具检测变量遮蔽问题
Go 官方提供了 go vet 工具可以用于对 Go 源码做一系列静态检查，在 Go 1.14 版以前默认支持变量遮蔽检查，Go 1.14 版之后，变量遮蔽检查的插件就需要我们单独安装了

## 12｜基本数据类型：Go原生支持的数值类型有哪些？
Go 语言的类型大体可分为基本数据类型、复合数据类型和接口类型这三种
整形分为：平台无关整型和平台相关整型
* 平台无关整型，它们在任何 CPU 架构或任何操作系统下面，长度都是固定不变的
* 平台相关型，int，unit，uintptr，比如int在32位是4字节，64位是8字节

### 创建自定义的数值类型
* 类型定义语法，通过类型定义语法实现的自定义数值类型虽然在数值性质上与原类型是一致的，但它们却是完全不同的类型，不能相互赋值，需要显式转换，要不会有编译错误
type MyInt int32
* 类型别名语法，通过类型别名创建的新类型则等价于原类型，可以互相替代。类型别名加入go的初衷就是为了**重构**，这也是其主要场景。
type MyInt = int32     


## 13｜基本数据类型：为什么Go要原生支持字符串类型？
### 原生支持字符串有什么好处？
1.string 类型的数据是不可变的，提高了字符串的并发安全性和存储利用率。
Go 语言规定，字符串类型的值在它的生命周期内是不可改变的。Go 这样的“字符串类型数据不可变”的性质给开发人员带来的最大好处，就是我们不用再担心字符串的并发安全问题。
另外，也由于字符串的不可变性，针对同一个字符串值，无论它在程序的几个位置被使用，Go 编译器只需要为它分配一块存储就好了，大大提高了存储利用率。
```
var s string = "hello"
s[0] = 'k'   // 错误：字符串的内容是不可改变的
s = "gopher" // ok
```

2.没有结尾’\0’，而且获取长度的时间复杂度是常数时间，消除了获取字符串长度的开销。

3.原生支持“所见即所得”的原始字符串，大大降低构造多行字符串时的心智负担。
Go 语言就简单多了，通过一对反引号原生支持构造“所见即所得”的原始字符串(Raw String)。

4.对非 ASCII 字符提供原生支持，消除了源码在不同环境下显示乱码的可能。
Go 语言源文件默认采用的是 Unicode 字符集，Go 字符串中的每个字符都是一个 Unicode 字符，并且这些 Unicode 字符是以 UTF-8 编码格式存储在内存当中的。

### Go 字符串的组成
两种视角
* 1. 可空的字节序列，字节序列中的字节个数称为该字符串的长度。一个个的字节只是孤立数据，不表意。
* 2. 可空的字符序列构成

```
// 字节
var s = "中国人"
fmt.Printf("the length of s = %d\n", len(s)) // 9，长度的时候要注意
for i := 0; i < len(s); i++ {
  fmt.Printf("0x%x ", s[i]) // 0xe4 0xb8 0xad 0xe5 0x9b 0xbd 0xe4 0xba 0xba
}
fmt.Printf("\n")

// 字符
var s = "中国人"
fmt.Println("the character count in s is", utf8.RuneCountInString(s)) // 3
for _, c := range s {
  fmt.Printf("0x%x ", c) // 0x4e2d 0x56fd 0x4eba,   打印的为Unicode码点(Code Point)
}
fmt.Printf("\n")
```

### rune 类型与字符字面值
rune 本质上是 int32 类型的别名类型 `type rune = int32`
一个 rune 实例就是一个 Unicode 字符，rune 本质是表示一个**码点**。 一个 Go 字符串也可以被视为 rune 实例的集合。我们可以通过字符字面值来初始化一个 rune 变量。
```
// rune -> []byte                                                                            
func encodeRune() {                                                                          
    var r rune = 0x4E2D               // 此处标识的是码点                                                   
    fmt.Printf("the unicode charactor is %c\n", r) // 中                                     
    buf := make([]byte, 3)                                                                   
    _ = utf8.EncodeRune(buf, r) // 对rune进行utf-8编码                                                           
    fmt.Printf("utf-8 representation is 0x%X\n", buf) // 0xE4B8AD， 此处表示的是码点的utf8的编码表示的十六进制。                           
}                                                                                            
                                                                                             
// []byte -> rune                                                                            
func decodeRune() {                                                                          
    var buf = []byte{0xE4, 0xB8, 0xAD}                                                       
    r, _ := utf8.DecodeRune(buf) // 对buf进行utf-8解码
    fmt.Printf("the unicode charactor after decoding [0xE4, 0xB8, 0xAD] is %s\n", string(r)) // 中
}
```

### Go 字符串类型的内部表示
string 类型其实是一个“描述符”，它本身并不真正存储字符串数据，而仅是由一个指向底层存储的指针和字符串的长度字段组成的。
```
// $GOROOT/src/reflect/value.go
// StringHeader是一个string的运行时表示
type StringHeader struct {
    Data uintptr
    Len  int
}
```

这段代码利用了 unsafe.Pointer 的通用指针转型能力，按照 StringHeader 给出的结构内存布局，“顺藤摸瓜”，一步步找到了底层数组的地址，并输出了底层数组内容。
```
func dumpBytesArray(arr []byte) {
    fmt.Printf("[")
    for _, b := range arr {
        fmt.Printf("%c ", b)
    }
    fmt.Printf("]\n")
}
func main() {
    var s = "hello"
    hdr := (*reflect.StringHeader)(unsafe.Pointer(&s)) // 将string类型变量地址显式转型为reflect.StringHeader
    fmt.Printf("0x%x\n", hdr.Data) // 0x10a30e0
    p := (*[5]byte)(unsafe.Pointer(hdr.Data)) // 获取Data字段所指向的数组的指针
    dumpBytesArray((*p)[:]) // [h e l l o ]   // 输出底层数组的内容
}
```
了解了 string 类型的实现原理后，我们还可以得到这样一个结论，那就是我们直接将 string 类型通过函数 / 方法参数传入也不会带来太多的开销


#### 字符迭代。
通过常规 for 迭代与 for range 迭代所得到的结果不同，常规 for 迭代采用的是**字节视角**；而 for range 迭代采用的是**字符视角**；
```
var s = "中国人"
for i := 0; i < len(s); i++ {
  fmt.Printf("index: %d, value: 0x%x\n", i, s[i])
}
// output
index: 0, value: 0xe4
index: 1, value: 0xb8
index: 2, value: 0xad
index: 3, value: 0xe5
index: 4, value: 0x9b
index: 5, value: 0xbd
index: 6, value: 0xe4
index: 7, value: 0xba
index: 8, value: 0xba

var s = "中国人"
for i, v := range s {
    fmt.Printf("index: %d, value: 0x%x\n", i, v)
}
// output
index: 0, value: 0x4e2d
index: 3, value: 0x56fd
index: 6, value: 0x4eba
```

#### 字符串转换。
Go 支持字符串与字节切片、字符串与 rune 切片的双向转换，并且这种转换无需调用任何函数，只需使用显式类型转换就可以了
```
var s string = "中国人"
                      
// string -> []rune
rs := []rune(s) 
fmt.Printf("%x\n", rs) // [4e2d 56fd 4eba]
                
// string -> []byte
bs := []byte(s) 
fmt.Printf("%x\n", bs) // e4b8ade59bbde4baba
                
// []rune -> string
s1 := string(rs)
fmt.Println(s1) // 中国人
                
// []byte -> string
s2 := string(bs)
fmt.Println(s2) // 中国人
```
这样的转型看似简单，但无论是 string 转切片，还是切片转 string，这类转型背后也是有着一定开销的。这些开销的根源就在于 **string是不可变的**，运行时要为转换后的类型分配新内存。

## 14｜常量：Go在“常量”设计上的创新有哪些？
Go 语言对类型安全是有严格要求的：即便两个类型拥有着相同的底层类型，但它们仍然是不同的数据类型，不可以进行运算。常量依然如此。

* 无类型常量
声明常量时不加类型。无类型常量也不是说就真的没有类型，它也有自己的默认类型，不过它的默认类型是根据它的初值形式来决定的。
* 隐式转型
对于无类型常量参与的表达式求值，Go 编译器会根据上下文中的类型信息，把无类型常量自动转换为相应的类型后，再参与求值计算。如果类型有溢出，编译时会报错。
* 实现枚举
Go 语言其实并没有原生提供枚举类型。
Go 的 const 语法提供了“隐式重复前一个非空表达式”的机制
iota **行偏移量指示器**。iota 是 Go 语言的一个预定义标识符，它表示的是 const 声明块(包括单行声明)中，每个常量所处位置在块中的偏移值(从零开始)。
```
const (
    _ = iota
    IPV6_V6ONLY  // 1
    SOMAXCONN    // 2
    SO_ERROR     // 3
)
```

## 15｜同构复合类型：从定长数组到变长切片
Go 的数组类型包含两个重要属性：元素的**类型**和数组**长度**(元素的个数)
如果两个数组类型的元素类型 T 与数组长度 N 都是一样的，那么这两个数组类型是等价的，如果有一个属性不同，它们就是两个不同的数组类型。
```
func foo(arr [5]int) {}
func main() {
    var arr1 [5]int
    var arr2 [6]int
    var arr3 [5]string
    foo(arr1) // ok
    foo(arr2) // 错误：[6]int与函数foo参数的类型[5]int不是同一数组类型
    foo(arr3) // 错误：[5]string与函数foo参数的类型[5]int不是同一数组类型
}  
```

```
var arr = [6]int{1, 2, 3, 4, 5, 6}
fmt.Println("数组长度：", len(arr))           // 6
fmt.Println("数组大小：", unsafe.Sizeof(arr)) // 48, 6*8,64 位平台上，int 长度是8
```

数组初始化
```
// 方式一
var arr2 = [6]int {
    11, 12, 13, 14, 15, 16,
} // [11 12 13 14 15 16]

// 方式二
var arr3 = [...]int { 
    21, 22, 23,
} // [21 22 23]
fmt.Printf("%T\n", arr3) // [3]int

//方式三
var arr4 = [...]int{
    99: 39, // 将第100个元素(下标值为99)的值赋值为39，其余元素值均为0
}
fmt.Printf("%T\n", arr4) // [100]int
```


### 多维数组
```
var mArr [2][3][4]int
```



注意点 ：
* Go 传递数组的方式都是纯粹的值拷贝，这会带来较大的内存拷贝开销。这跟c的传数组会退化成指针有区别
* 数组在使用上确有两点不足：1.固定的元素个数 2.传值机制下导致的开销较大。于是 Go 设计者们又引入了另外一种同构复合类型：切片(slice)，来弥补数组的这两处不足。

### 切片
创建
```
//方法一：
var nums = []int{1, 2, 3, 4, 5, 6} 
   
//方法二：通过make
sl := make([]byte, 6, 10) // 其中10为cap值，即底层数组长度，6为切片的初始长度
sl := make([]byte, 6) // cap = len = 6

//方法三：数组的切片化，采用 array[low : high : max]语法基于一个已存在的数组创建切片，**底层访问的数组还是原数组**，修改切片内容，底层的也会跟着改
// 类似于c++中的string_view
arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
sl := arr[3:7:9]

//方法四：基于切片创建切片
a := []int{1, 2, 3,4,5}
b := a[2:4]
```

切片声明相比数组仅仅是少了一个“长度”属性。
Go 切片在运行时其实是一个三元组结构
```
type slice struct {
    array unsafe.Pointer      //指针
    len   int    //个数
    cap   int   //最大容量
}
```

在 Go 语言中，数组更多是“退居幕后”，承担的是底层存储空间的角色。切片就是数组的“描述符”，也正是因为这一特性，切片才能在函数参数传递时避免较大性能开销。
另外，针对一个已存在的数组，我们还可以建立多个操作数组的切片，这些切片共享同一底层数组，切片对底层数组的操作也同样会反映到其他切片中。
append 操作的这种自动扩容行为，有些时候会给我们开发者带来一些困惑，比如基于一个已有数组建立的切片，一旦追加的数据操作触碰到切片的容量上限(实质上也是数组容量的上界)，**切片就会和原数组解除“绑定”**，后续对切片的任何修改都不会反映到原数组中了。

s1和s2的区别
```
var s1 []int
var s2 = []int{}
```
s1是声明，还没初始化，是nil值，底层**没有分配内存空间**。
s2初始化了，不是nil值，底层分配了内存空间


## 16｜复合数据类型：原生map类型的实现机制是怎样的？
map 类型对 value 的类型没有限制，但是对 key 的类型却有严格要求，因为 map 类型要保证 key 的唯一性。Go 语言中要求，key 的类型必须支持“==”和“!=”两种比较操作符。
在 Go 语言中，函数类型、map 类型以及切片只支持与 nil 的比较，而不支持同类型两个变量的比较。所以函数类型、map 类型自身，以及切片类型是不能作为 map 的 key 类型的。


map 变量的声明和初始化
```
var m map[string]int // 一个map[string]int类型的变量
```
和切片类型变量一样，如果我们没有显式地赋予 map 变量初值，map 类型变量的默认值为 nil。

不过切片变量和 map 变量在这里也有些不同。初值为零值 nil 的切片类型变量，可以借助内置的 append 的函数进行操作，这种在 Go 语言中被称为“**零值可用**”。定义“零值可用”的类型，可以提升我们开发者的使用体验，我们不用再担心变量的初始状态是否有效。
但 map 类型，因为它内部实现的复杂性，**无法“零值可用”**。所以，如果我们对处于零值状态的 map 变量直接进行操作，就会导致运行时异常(panic)，从而导致程序进程异常退出：
```
var m map[string]int // m = nil
m["key"] = 1         // 发生运行时异常：panic: assignment to entry in nil map
```


为 map 类型变量显式赋值有两种方式：一种是使用复合字面值；另外一种是使用 make 这个预声明的内置函数。

### 方法一：使用复合字面值初始化 map 类型变量。
```
// 初始化为空
m := map[int]string{}

// 初始化为微复杂一些的复合字面值
type Position struct { 
    x float64 
    y float64
}
m2 := map[Position]string{
    Position{29.935523, 52.568915}: "school",
    Position{25.352594, 113.304361}: "shopping-mall",
    Position{73.224455, 111.804306}: "hospital",
}

//Go 允许省略字面值中的元素类型,编译器可以自动推断其类型
m2 := map[Position]string{
    {29.935523, 52.568915}: "school",
    {25.352594, 113.304361}: "shopping-mall",
    {73.224455, 111.804306}: "hospital",
}
```

### 方法二：使用 make 为 map 类型变量进行显式初始化。
```
//这样可以为 map 类型变量指定键值对的初始容量，但无法进行具体的键值对赋值
m1 := make(map[int]string) // 未指定初始容量
m2 := make(map[int]string, 8) // 指定初始容量为8
```

### map操作
```
//赋值和获取键值对数量
m := map[string]int {
  "key1" : 1,
  "key2" : 2,
}
fmt.Println(len(m)) // 2
m["key3"] = 3  
fmt.Println(len(m)) // 3

// 查找和数据读取
m := make(map[string]int)
v := m["key1"]       // 如果这个键在 map 中并不存在，我们也会得到一个值，这个值是 value 元素类型的零值。

// 使用“comma ok”的惯用法来判断key是否在map中
m := make(map[string]int)

if v, ok := m["key1"]; ok  {
    // "key1"在map中
}
// "key1"在map中，v将被赋予"key1"键对应的value

//只关心key在不在map中
m := make(map[string]int)
_, ok := m["key1"]
... ...


//删除数据
m := map[string]int {
  "key1" : 1,
  "key2" : 2,
}
fmt.Println(m) // map[key1:1 key2:2]
delete(m, "key2") // 删除"key2"， delete 函数是从 map 中删除键的唯一方法，即使key不在map中，也不会报错
fmt.Println(m) // map[key1:1]
```
注意：
对同一 map 做多次遍历的时候，每次遍历元素的次序都不相同。


### map 的内部实现
Go 运行时使用一张哈希表来实现抽象的 map 类型。运行时实现了 map 类型操作的所有功能，包括查找、插入、删除等。在编译阶段，Go 编译器会将 Go 语法层面的 map 操作，重写成运行时对应的**函数调用**。大致的对应关系是这样的：
```
// 创建map类型变量实例
m := make(map[keyType]valType, capacityhint) → m := runtime.makemap(maptype, capacityhint, m)
// 插入新键值对或给键重新赋值
m["key"] = "value" → v := runtime.mapassign(maptype, m, "key") v是用于后续存储value的空间的地址
// 获取某键的值 
v := m["key"]      → v := runtime.mapaccess1(maptype, m, "key")
v, ok := m["key"]  → v, ok := runtime.mapaccess2(maptype, m, "key")
// 删除某键
delete(m, "key")   → runtime.mapdelete(maptype, m, “key”)
```


### map 与并发
map 实例不是并发写安全的，也不支持并发读写。如果我们对 map 实例进行并发读写，程序运行时就会抛出异常。
不过，如果我们仅仅是进行并发读，map 是没有问题的。
考虑到 map 可以自动扩容，map 中数据元素的 value 位置可能在这一过程中发生变化，所以 Go 不允许获取 map 中 value 的地址，这个约束是在编译期间就生效的。


## 17｜复合数据类型：用结构体建立对真实世界的抽象
### 如何自定义一个新类型？
```
type T S // 定义一个新类型T
type M map[int]string
type S []string


type T1 int     // T1的底层类型是int
type T2 T1     // T2的底层类型也是int
```
底层类型在 Go 语言中有重要作用，它被用来判断两个类型本质上是否相同(Identical)。
在上面例子中，虽然 T1 和 T2 是不同类型，但因为它们的底层类型都是类型 int，所以它们在本质上是相同的。
而本质上相同的两个类型，它们的变量可以通过显式转型进行相互赋值，相反，如果本质上是不同的两个类型，
它们的变量间连显式转型都不可能，更不要说相互赋值了。

### 第二种自定义新类型的方式是使用类型别名(Type Alias)
```
type T = S // type alias
```

### 如何定义一个结构体类型？
```
type Book struct {
     Title string              // 书名
     Pages int                 // 书的页数
     Indexes map[string]int    // 书的索引
}
```

#### 第一种：定义一个空结构体。
```
type Empty struct{} // Empty是一个不包含任何字段的空结构体类型

var s Empty
println(unsafe.Sizeof(s)) // 0
// 空结构体类型变量的内存占用为 0。基于空结构体类型**内存零开销**这样的特性，
// 我们在日常 Go 开发中会经常使用空结构体类型元素，作为一种“事件”信息进行 Goroutine 之间的通信
// 这种以空结构体为元素类建立的 channel，是目前能实现的、内存占用最小的 Goroutine 间通信方式
var c = make(chan Empty) // 声明一个元素类型为Empty的channel
c<-Empty{}               // 向channel写入一个“事件”
```


#### 第二种情况：使用其他结构体作为自定义结构体中字段的类型。
```
type Person struct {
    Name string
    Phone string
    Addr string
}
type Book struct {
    Title string
    Author Person
    ... ...
}

// 或者，以这种方式定义的结构体字段，我们叫做**嵌入字段**(Embedded Field)。
type Book struct {
    Title string
    Person
    ... ...
}

//字段访问
var book Book 
println(book.Person.Phone) // 将类型名当作嵌入字段的名字
println(book.Phone)        // 支持直接访问嵌入字段所属类型中字段
```
### 结构体变量的声明与初始化
#### 零值初始化
```
type Book struct {
    ...
}
var book Book
var book = Book{}
book := Book{}
```
如果一种类型采用零值初始化得到的零值变量，是有意义的，而且是直接可用的，我称这种类型为“**零值可用**”类型。
在 Go 语言标准库和运行时的代码中，有很多践行“零值可用”理念的好例子，最典型的莫过于 sync 包的 Mutex 类型了。Mutex 是 Go 标准库中提供的、用于多个并发 Goroutine 之间进行同步的互斥锁。
```
var mu sync.Mutex
mu.Lock()
mu.Unlock()
```

#### 使用复合字面值
最简单的对结构体变量进行显式初始化的方式，就是按顺序依次给每个结构体字段进行赋值，比如下面的代码：
```
type Book struct {
    Title string              // 书名
    Pages int                 // 书的页数
    Indexes map[string]int    // 书的索引
}
var book = Book{"The Go Programming Language", 700, make(map[string]int)}      //不推荐用这种形式，容易出错
```
Go 推荐我们用“field:value”形式的复合字面值,field:value”形式字面值中的字段可以以任意次序出现,
未显式出现在字面值中的结构体字段默认零值。
```
var t = T{
    F2: "hello",
    F1: 11,
    F4: 14,
}
```

### 结构体类型的内存布局

```
var t T
unsafe.Sizeof(t)      // 结构体类型变量占用的内存大小
unsafe.Offsetof(t.Fn) // 字段Fn在内存中相对于变量t起始地址的偏移量
```

## 18｜控制结构：if的“快乐路径”原则
* Go 坚持“一件事情仅有一种做法的理念”，只保留了 for 这一种循环结构，去掉了 C 语言中的 while 和 do-while 循环结构；
* Go 填平了 C 语言中 switch 分支结构中每个 case 语句都要以 break 收尾的“坑”；
* Go 支持了 type switch 特性，让“类型”信息也可以作为分支选择的条件；
* Go 的 switch 控制结构的 case 语句还支持表达式列表，让相同处理逻辑的多个分支可以合并为一个分支，等等。


在 if 语句中声明自用变量是 Go 语言的一个惯用法，这种使用方式直观上可以让开发者有一种代码行数减少的感觉，提高可读性。同时，由于这些变量是 if 语句自用变量，它的作用域仅限于 if 语句的各层隐式代码块中，if 语句外部无法访问和更改这些变量
```
func main() {
    if a, c := f(), h(); a > 0 {
        println(a)
    } else if b := f(); b > 0 {
        println(a, b)
    } else {
        println(a, b, c)
    }
}
```

建议在使用 if 语句时尽量符合“快乐路径”原则，这个原则通常只使用最容易理解的单分支结构，所有正常代码均“靠左”，这让函数内代码逻辑一目了然，提升了代码可读性与可维护性。
```
func doSomething() error {
  if errorCondition1 {
    // some error logic
    ... ...
    return err1
  }
  
  // some success logic
  ... ...
  if errorCondition2 {
    // some error logic
    ... ...
    return err2
  }
  // some success logic
  ... ...
  return nil
}
```

## 19｜控制结构：Go的for循环，仅此一种
Go 语言的 for 循环支持声明多循环变量，并且可以应用在循环体以及判断条件中
```
for i, j, k := 0, 1, 2; (i < 20) && (j < 10) && (k < 30); i, j, k = i+1, j+1, k+5 {
    sum += (i + j + k)
    println(sum)
}
```
for的不同形式
```
// 省略语句1和语句3
i := 0
for ; i < 10; {
    println(i)
    i++
}  
// 等同于上边
i := 0
for i < 10 {
    println(i)
    i++
} 
//死循环
for { 
   // 循环体代码
}

// for range
var sl = []int{1, 2, 3, 4, 5}
for i, v := range sl {
    fmt.Printf("sl[%d] = %d\n", i, v)
}

// for channel
// 每次从 channel 中读取一个元素后，会把它赋值给循环变量 v，并进入循环体。当 channel 中没有数据可读的时候，
// for range 循环会阻塞在对 channel 的读操作上。直到 channel 关闭时，for range 循环才会结束
var c = make(chan int)
for v := range c {
}
```

### 带 label 的 continue 语句
而带 label 的 continue 语句，通常出现于嵌套循环语句中，被用于跳转到外层循环并继续执行外层循环语句的下一个迭代，比如下面这段代码：
```
//找到数组中每一行的第一个13，并立即进行下一行的查找
func main() {
    var sl = [][]int{
        {1, 34, 26, 35, 78},
        {3, 45, 13, 24, 99},
        {101, 13, 38, 7, 127},
        {54, 27, 40, 83, 81},
    }
outerloop:
    for i := 0; i < len(sl); i++ {
        for j := 0; j < len(sl[i]); j++ {
            if sl[i][j] == 13 {
                fmt.Printf("found 13 at [%d, %d]\n", i, j)
                continue outerloop         // 若不加label的话只会跳出本次循环，而跳不到外层循环
            }
        }
    }
}
```
和 continue 语句一样，Go 也 break 语句增加了对 label 的支持。而且，和前面 continue 语句一样，如果遇到嵌套循环，break 要想跳出外层循环，用不带 label 的 break 是不够，因为不带 label 的 break 仅能跳出其所在的最内层循环。


### for 语句的常见“坑”与避坑方法
问题一：循环变量的重用
```
func main() {
    var m = []int{1, 2, 3, 4, 5}  
             
    for i, v := range m {            //每次循环i和v都是同一个变量，不会生成临时变量的
        go func() {
            time.Sleep(time.Second * 3)      //最终每个goroutine都会打印出5
            fmt.Println(i, v)
        }()
    }
    time.Sleep(time.Second * 10)
}
// 等同于
func main() {
    var m = []int{1, 2, 3, 4, 5}  
    {
      i, v := 0, 0
        for i, v = range m {
            go func() {
                time.Sleep(time.Second * 3)
                fmt.Println(i, v)
            }()
        }
    }
    time.Sleep(time.Second * 10)
}
// 正确做法
func main() {
    var m = []int{1, 2, 3, 4, 5}
    for i, v := range m {
        go func(i, v int) {
            time.Sleep(time.Second * 3)
            fmt.Println(i, v)
        }(i, v)
    }
    time.Sleep(time.Second * 10)
}
// 结果
0 1
1 2
2 3
3 4
4 5
```

问题二：参与循环的是 range 表达式的副本
```
func main() {
    var a = [5]int{1, 2, 3, 4, 5}
    var r [5]int
    fmt.Println("original a =", a)
    for i, v := range a {   // range后跟的是数组a的一个副本
        if i == 0 {      // 在循环第一次就改变索引1和2的值
            a[1] = 12
            a[2] = 13
        }
        r[i] = v
    }
    fmt.Println("after for range loop, r =", r)
    fmt.Println("after for range loop, a =", a)
}
// 输出， 数组a的值没变
original a = [1 2 3 4 5]
after for range loop, r = [1 2 3 4 5]
after for range loop, a = [1 12 13 4 5]

以上类似下面的代码

for i, v := range a' { //a'是a的一个值拷贝， 只是对数组是这样，因为数组是值拷贝，其他的如slice和map是引用拷贝(其实也是值拷贝，不过只是他们的底层都是指针实现)
    if i == 0 {
        a[1] = 12
        a[2] = 13
    }
    r[i] = v
}

// 正确做法
func main() {
    var a = [5]int{1, 2, 3, 4, 5}
    var r [5]int
    fmt.Println("original a =", a)
    for i, v := range a[:] {
        if i == 0 {
            a[1] = 12
            a[2] = 13
        }
        r[i] = v
    }
    fmt.Println("after for range loop, r =", r)
    fmt.Println("after for range loop, a =", a)
}
```

问题三：遍历 map 中元素的随机性
如果我们在循环的过程中，对 map 进行了修改，那么这样修改的结果是否会影响后续迭代呢？这个结果和我们遍历 map 一样，具有随机性。


## 20｜控制结构：Go中的switch语句有哪些变化？
switch的执行顺序
Go 先对 switch expr 表达式进行求值，然后再按 case 语句的出现顺序，从上到下进行逐一求值。在带有表达式列表的 case 语句中，Go 会从左到右，对列表中的表达式进行求值。如果 switch 表达式匹配到了某个 case 表达式，那么程序就会执行这个 case 对应的代码分支。这个分支后面的 case 表达式将不会再得到求值机会。无论 default 分支出现在什么位置，它都只会在所有 case 都没有匹配上的情况下才会被执行的。

Go 语言就宽容得多了，只要类型支持比较操作，都可以作为 switch 语句中的表达式类型。
不过，实际开发过程中，以结构体类型为 switch 表达式类型的情况并不常见

和 if、for 等控制结构语句一样，switch 语句的 initStmt 可用来声明只在这个 switch 隐式代码块中使用的变量，这种就近声明的变量最大程度地缩小了变量的作用域。

Go 语言中的 Swith 语句就修复了 C 语言的这个缺陷，取消了默认执行下一个 case 代码逻辑的“非常规”语义，每个 case 对应的分支代码执行完后就结束 switch 语句。


```
func checkWorkday(a int) {
    switch a {
    case 1, 2, 3, 4, 5:
        println("it is a work day")
    case 6, 7:
        println("it is a weekend day")
    default:
        println("are you live on earth")
    }
}
```


### type switch
```

func main() {
    var x interface{} = 13
    switch x.(type) {                     // x 必须是一个接口类型变量
    case nil:
        println("x is nil")
    case int:
        println("the type of x is int")
    case string:
        println("the type of x is string")
    case bool:
        println("the type of x is string")
    default:
        println("don't support the type")
    }
}
```


### 
```
func main() {
    var sl = []int{5, 19, 6, 3, 8, 12}
    var firstEven int = -1
    // find first even number of the interger slice
    for i := 0; i < len(sl); i++ {
        switch sl[i] % 2 {
        case 0:
            firstEven = sl[i]
            break                             //break只会跳出switch 语句
        case 1:
            // do nothing
        }
    }
    println(firstEven)
}
```

```
func main() {
    var sl = []int{5, 19, 6, 3, 8, 12}
    var firstEven int = -1
    // find first even number of the interger slice
loop:
    for i := 0; i < len(sl); i++ {
        switch sl[i] % 2 {
        case 0:
            firstEven = sl[i]
            break loop                   // break可以跳出当前的for循环
        case 1:
            // do nothing
        }
    }
    println(firstEven) // 6
}
```


## 21｜函数：请叫我“一等公民”
* 变长参数
在 Go 中，变长参数实际上是通过**切片**来实现的。所以，我们在函数体中，就可以使用切片支持的所有操作来操作变长参数，这会大大简化了变长参数的使用复杂度。

* 函数支持多返回值

* 具名返回值
当函数的返回值**个数较多时**，具名返回值可以让代码显得更优雅清晰

### 函数是“一等公民”
#### 特征一：Go 函数可以存储在变量中。
#### 特征二：支持在函数内创建并通过返回值返回。
这个例子，模拟了执行一些重要逻辑之前的上下文建立(setup)，以及之后的上下文拆除(teardown)
```
func setup(task string) func() {
    println("do some setup stuff for", task)
    return func() {
        println("do some teardown stuff for", task)
    }
}
func main() {
    teardown := setup("demo")
    defer teardown()
    println("do some bussiness stuff")
}
```
#### 特征三：作为参数传入函数(一般都是做回调函数)
```
time.AfterFunc(time.Second*2, func() { println("timer fired") })
```
#### 特征四：拥有自己的类型。
```
// $GOROOT/src/net/http/server.go
type HandlerFunc func(ResponseWriter, *Request)
```

### 函数“一等公民”特性的高效运用
* 应用一：函数类型的妙用
```
func greeting(w http.ResponseWriter, r *http.Request) {   //greeting并没有ServeHTTP的方法，转换后便拥有了ServeHTTP方法
    fmt.Fprintf(w, "Welcome, Gopher!\n")
}                    
func main() {
    //HandlerFunc 的底层类型是func(ResponseWriter, *Request)，与 greeting 函数的类型是一致的,可以转换
    http.ListenAndServe(":8080", http.HandlerFunc(greeting))      
}

// $GOROOT/src/net/http/server.go
func ListenAndServe(addr string, handler Handler) error {
    server := &Server{Addr: addr, Handler: handler}
    return server.ListenAndServe()
}
// $GOROOT/src/net/http/server.go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}

// $GOROOT/src/net/http/server.go
type HandlerFunc func(ResponseWriter, *Request)
// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {    // 为函数类型添加方法
        f(w, r)
}
```

* 应用二：利用闭包简化函数调用。
```
times(2, 5) // 计算2 x 5
times(3, 5) // 计算3 x 5
times(4, 5) // 计算4 x 5

func partialTimes(x int) func(int) int {
  return func(y int) int {
    return times(x, y)
  }
}

timesTwo := partialTimes(2)   // 以高频乘数2为固定乘数的乘法函数
timesThree := partialTimes(3) // 以高频乘数3为固定乘数的乘法函数
timesFour := partialTimes(4)  // 以高频乘数4为固定乘数的乘法函数
```
 
## 22｜函数：怎么结合多返回值进行错误处理？

C 语言这种错误处理机制也有一些弊端。比如，由于 C 语言中的函数最多仅支持一个返回值，很多开发者会把这单一的返回值“一值多用”。什么意思呢？就是说，一个返回值，不仅要承载函数要返回给调用者的信息，又要承载函数调用的最终错误状态。比如 C 标准库中的fprintf函数的返回值就承载了两种含义。在正常情况下，它的返回值表示输出到 FILE 流中的字符数量，但如果出现错误，这个返回值就变成了一个负数，代表具体的错误值

Go 函数增加了**多返回值机制**，来支持错误状态与返回信息的分离，并建议开发者把要返回给调用者的信息和错误状态标识，分别放在不同的返回值中。

error 类型
```
type interface error {
    Error() string
}
```

错误值构造,他们返回的都是errors.errorString类型的值，错误信息只是一个单一的字符串，若要包含更多信息，需要自己构造增强版的错误对象
```
err := errors.New("your first demo error")
errWithCtx = fmt.Errorf("index %d is out of bounds", i)

type errorString struct {
    s string
}
func (e *errorString) Error() string {
    return e.s
}
```



基于 Go 错误处理机制、统一的错误值类型以及错误值构造方法的基础上，Go 语言形成了多种错误处理的惯用策略，
包括
1. 透明错误处理策略
调用函数返回啥错误，我也直接将错误返回给上一层
```
err := doSomething()
if err != nil {
    // 不关心err变量底层错误值所携带的具体上下文信息
    // 执行简单错误处理逻辑并返回
    ... ...
    return err
}
```

2. “哨兵”错误处理策略、
根据错误类型进行相应的处理
```
var (
    ErrInvalidUnreadByte = errors.New("bufio: invalid use of UnreadByte")
    ErrInvalidUnreadRune = errors.New("bufio: invalid use of UnreadRune")
    ErrBufferFull        = errors.New("bufio: buffer full")
    ErrNegativeCount     = errors.New("bufio: negative count")
)

data, err := b.Peek(1)
if err != nil {
    switch err {
    case bufio.ErrNegativeCount:
        // ... ...
        return
    case bufio.ErrBufferFull:
        // ... ...
        return
    case bufio.ErrInvalidUnreadByte:
        // ... ...
        return
    default:
        // ... ...
        return
    }
}

//case中的写法可以用如下的更好的写法代替
if errors.Is(err, ErrOutOfBounds) {
    // 越界的错误处理
}
不同的是，如果 error 类型变量的底层错误值是一个包装错误（Wrapped Error），errors.Is 方法会沿着该包装错误所在错误链（Error Chain)，与链上所有被包装的错误（Wrapped Error）进行比较，直至找到一个匹配的错误为止。

err1 := fmt.Errorf("wrap sentinel: %w", ErrSentinel)
err2 := fmt.Errorf("wrap err1: %w", err1)
println(err2 == ErrSentinel) //false
println(errors.Is(err2, ErrSentinel)) //true 
```

3. 错误值类型检视策略
```
type UnmarshalTypeError struct {
    Value  string       
    Type   reflect.Type 
    Offset int64        
    Struct string       
    Field  string      
}

func (d *decodeState) addErrorContext(err error) error {
    if d.errorContext.Struct != nil || len(d.errorContext.FieldStack) > 0 {
        switch err := err.(type) {
        case *UnmarshalTypeError:
            err.Struct = d.errorContext.Struct.Name()
            err.Field = strings.Join(d.errorContext.FieldStack, ".")
            return err
        }
    }
    return err
}
```

4. 错误行为特征检视策略等。
将某个包中的错误类型归类，统一提取出一些公共的错误行为特征，并将这些错误行为特征放入一个公开的接口类型中。这种方式也被叫做错误行为特征检视策略。
以标准库中的net包为例，它将包内的所有错误类型的公共行为特征抽象并放入net.Error这个接口中，如下面代码：
```
// $GOROOT/src/net/net.go
type Error interface {
    error
    Timeout() bool  
    Temporary() bool
}

func (srv *Server) Serve(l net.Listener) error {
    ... ...
    for {
        rw, e := l.Accept()
        if e != nil {
            select {
            case <-srv.getDoneChan():
                return ErrServerClosed
            default:
            }
            if ne, ok := e.(net.Error); ok && ne.Temporary() {
                // 注：这里对临时性(temporary)错误进行处理
                ... ...
                time.Sleep(tempDelay)
                continue
            }
            return e
        }
        ...
    }
    ... ...
}
```
而错误处理方只需要依赖这个公共接口，就可以检视具体错误值的错误行为特征信息，并根据这些信息做出后续错误处理分支选择的决策。



这些策略都有适用的场合，但没有某种单一的错误处理策略可以适合所有项目或所有场合。

在错误处理策略选择上，我有一些个人的建议，你可以参考一下：
* 请尽量使用“透明错误”处理策略，降低错误处理方与错误值构造方之间的耦合；
* 如果可以通过错误值类型的特征进行错误检视，那么请尽量使用“错误行为特征检视策略”;
* 在上述两种策略无法实施的情况下，再使用“哨兵”策略和“错误值类型检视”策略；
* Go 1.13 及后续版本中，尽量用errors.Is和errors.As函数替换原先的错误检视比较语句。



## 23｜函数：怎么让函数更简洁健壮？
健壮性的“三不要”原则
原则一：不要相信任何外部输入的参数。
原则二：不要忽略任何一个错误，调用标准库或第三方包提供的函数，不能假定它一定会成功
原则三：不要假定异常不会发生。

### 认识 Go 语言中的异常：panic
panic 指的是 Go 程序在运行时出现的一个异常情况。如果异常出现了，但没有被捕获并恢复，Go 程序的执行就会**被终止**，即便出现异常的位置**不在主 Goroutine** 中也会这样。
在 Go 中，panic 主要有两类来源，一类是来自 Go 运行时，另一类则是 Go 开发人员通过 panic 函数主动触发的。
无论是哪种，一旦 panic 被触发，后续 Go 程序的执行过程都是一样的，这个过程被 Go 语言称为 panicking。


### 如何应对 panic？
#### 第一点：评估程序对 panic 的忍受度，不同应用对异常引起的程序崩溃退出的忍受度是不一样的。
像后端 HTTP 服务器程序这样的任务关键系统，我们就需要在特定位置捕捉并恢复 panic，以保证服务器整体的健壮度。在这方面，Go 标准库中的 http server 就是一个典型的代表。
Go 标准库提供的 http server 采用的是，每个客户端连接都使用一个单独的 Goroutine 进行处理的并发处理模型。也就是说，客户端一旦与 http server 连接成功，http server 就会为这个连接新创建一个 Goroutine，并在这 Goroutine 中执行对应连接(conn)的 **serve** 方法，来处理这条连接上的客户端请求。
前面提到了 panic 的“危害”时，我们说过，无论在哪个 Goroutine 中发生未被恢复的 panic，整个程序都将崩溃退出。所以，为了保证处理某一个客户端连接的 Goroutine 出现 panic 时，不影响到 http server 主 Goroutine 的运行，Go 标准库在 serve 方法中加入了对 panic 的捕捉与恢复

#### 第二点：提示潜在 bug
C 语言中有个很好用的辅助函数，断言(assert 宏)。在 Go 标准库中，大多数 panic 的使用都是**充当类似断言**的作用的。

#### 第三点：不要混淆异常与错误

### 使用 defer 简化函数实现
defer 是 Go 语言提供的一种延迟调用机制，defer 的运作离不开函数。怎么理解呢？这句话至少有以下两点含义：
* 在 Go 中，只有在函数(和方法)内部才能使用 defer；
* defer 关键字后面只能接函数(或方法)，这些函数被称为 deferred 函数。defer 将它们注册到其所在 Goroutine 中，用于存放 deferred 函数的栈数据结构中，这些 deferred 函数将在执行 defer 的函数退出前，按后进先出(LIFO)的顺序被程序调度执行(如下图所示)。

deferred 函数是一个可以在任何情况下为函数进行收尾工作的好“伙伴”。


## 24｜方法：理解“方法”的本质
```
func (t *T或T) MethodName(参数列表) (返回值列表) {
    // 方法体
}
```
Go 中的方法必须是归属于一个**类型**，而 receiver(方法接收器) 参数的类型就是这个方法归属的类型，或者说这个方法就是这个类型的一个方法。

注意：
1.receiver 参数的基类型本身不能为指针类型或接口类型。
2.方法声明要与 receiver 参数的基类型声明放在同一个包内。

基于这个约束，我们还可以得到两个推论。
第一个推论：我们不能为原生类型(诸如 int、float64、map 等)添加方法。
第二个推论：不能跨越 Go 包为其他包的类型声明新方法。

如果 receiver 参数的基类型为 T，那么我们说 receiver 参数绑定在 T 上，我们可以通过 *T 或 T 的变量实例调用该方法：
```
type T struct{}
func (t T) M(n int) {
}
func main() {
    var t T
    t.M(1) // 通过类型T的变量实例调用方法M
    p := &T{}
    p.M(2) // 通过类型*T的变量实例调用方法M
}
```

### 方法的本质是什么？
C++ 中的对象在调用方法时，编译器会自动传入指向对象自身的 this 指针作为方法的第一个参数。而 Go 方法中的原理也是相似的.
Go 语言中的方法的本质就是，一个以方法的 receiver 参数作为第一个参数的**普通函数**。

```
type T struct { 
    a int
}
func (t T) Get() int {  
    return t.a 
}
func (t *T) Set(a int) int { 
    t.a = a 
    return t.a 
}

//==========等价式============
// 类型T的方法Get的等价函数
func Get(t T) int {  
    return t.a 
}
// 类型*T的方法Set的等价函数
func Set(t *T, a int) int { 
    t.a = a 
    return t.a 
}
//===========调用============
var t T
t.Get()
t.Set(1)
// ===========Method Expression的调用============
var t T
T.Get(t)
(*T).Set(&t, 1)
```

## 25｜方法：方法集合与如何选择receiver类型？
### 方法集合
**方法集合**也是用来判断一个类型**是否实现了某接口类型的唯一手段**，可以说，“方法集合决定了接口实现”
Go 中任何一个类型都有属于自己的方法集合，或者说方法集合是 Go 类型的一个“属性”。但不是所有类型都有自己的方法呀，比如 int 类型就没有。所以，对于没有定义方法的 Go 类型，我们称其拥有空方法集合。


Go 语言规定，`*T` 类型的方法集合包含所有以 `*T` 为 receiver 参数类型的方法，以及所有以 T 为 receiver 参数类型的方法。
```
func dumpMethodSet(i interface{}) {
    dynTyp := reflect.TypeOf(i)
    if dynTyp == nil {
        fmt.Printf("there is no dynamic type\n")
        return
    }
    n := dynTyp.NumMethod()
    if n == 0 {
        fmt.Printf("%s's method set is empty!\n", dynTyp)
        return
    }
    fmt.Printf("%s's method set:\n", dynTyp)
    for j := 0; j < n; j++ {
        fmt.Println("-", dynTyp.Method(j).Name)
    }
    fmt.Printf("\n")
}
//===============
type T struct{}
func (T) M1() {}
func (T) M2() {}
func (*T) M3() {}
func (*T) M4() {}
func main() {
    var n int
    dumpMethodSet(n)
    dumpMethodSet(&n)
    var t T
    dumpMethodSet(t)
    dumpMethodSet(&t)
}
//===============
int's method set is empty!
*int's method set is empty!
main.T's method set:
- M1
- M2
*main.T's method set:
- M1
- M2
- M3
- M4
```
**方法集合决定接口实现的含义就是**：
如果某类型 T 的方法集合与某接口类型的方法集合相同，或者类型 T 的方法集合是接口类型 I 方法集合的超集，那么我们就说这个类型 T 实现了接口 I。
或者说，方法集合这个概念在 Go 语言中的主要用途，就是用来判断某个类型是否实现了某个接口。


* 原则1：
依据就是**T类型是否需要实现某个接口**。
如果 T 类型需要实现某个接口，那我们就要使用 T 作为 receiver 参数的类型，来满足接口类型方法集合中的所有方法。
如果 T 不需要实现某一接口，但 *T 需要实现该接口，那么根据方法集合概念，*T 的方法集合是包含 T 的方法集合的，这样我们在确定 Go 方法的 receiver 的类型时，参考原则一和原则二就可以了。
* 原则2：
如果 Go 方法要把对 receiver 参数代表的类型实例的修改，反映到原类型实例上，那么我们应该选择 *T 作为 receiver 参数的类型。
无论是 T 类型实例，还是 *T 类型实例，都既可以调用 receiver 为 T 类型的方法，也可以调用 receiver 为 *T 类型的方法。这是因为go编译器帮你自动进行了处理。
* 原则3：
不需要在方法中对类型实例进行修改时，通常会为 receiver 参数选择 T 类型，尽量少暴露可以修改类型内部状态的方法。
如果 receiver 参数类型的 size 较大，以值拷贝形式传入就会导致较大的性能开销，这时我们选择 *T 作为 receiver 类型可能更好些。


## 26｜方法：如何用类型嵌入模拟实现“继承”？
类型嵌入指的就是在一个类型的定义中嵌入了其他类型。Go 语言支持两种类型嵌入，
分别是**接口类型**的类型嵌入和**结构体**类型的类型嵌入。这是 Go 组合设计哲学的一种体现。
**结构体类型**的方法集合，包含嵌入的接口类型的方法集合。


类型嵌入对新类型的方法集合的影响，包括：
* 结构体类型的方法集合包含嵌入的接口类型的方法集合；
* 当结构体类型 T 包含嵌入字段 E 时，*T 的方法集合不仅包含类型 E 的方法集合，还要包含类型 *E 的方法集合。

基于非接口类型的 defined 类型创建的新 defined 类型**不会继承**原类型的方法集合，而通过类型别名定义的新类型则和原类型拥有相同的方法集合。
```

package main
type T struct{}
func (T) M1()  {}
func (*T) M2() {}
type T1 T
func main() {
  var t T
  var pt *T
  var t1 T1
  var pt1 *T1
  dumpMethodSet(t)
  dumpMethodSet(t1)
  dumpMethodSet(pt)
  dumpMethodSet(pt1)
}
// output:
main.T's method set:
- M1
main.T1's method set is empty!
*main.T's method set:
- M1
- M2
*main.T1's method set is empty!
```

## 27｜即学即练：跟踪函数调用链，理解代码更直观
使用 defer 可以跟踪函数的执行过程
```
func Trace(name string) func() {
    println("enter:", name)
    return func() {
        println("exit:", name)
    }
}
func foo() {
    defer Trace("foo")()
    bar()
}
func bar() {
    defer Trace("bar")()
}
func main() {
    defer Trace("main")()
    foo()
}
```


## 加餐｜聊聊Go 1.17版本的那些新特性
### 支持将切片转换为数组指针
```
//1.17之前
b := []int{11, 12, 13}
var p = (*[3]int)(unsafe.Pointer(&b[0]))
p[1] += 10
fmt.Printf("%v\n", b) // [11 22 13]

//1.17之后
b := []int{11, 12, 13}
p := (*[3]int)(b) // 将切片转换为数组类型指针
p[1] = p[1] + 10
fmt.Printf("%v\n", b) // [11 22 13]
```
注意：转换后的数组长度不能大于原切片的长度

### Go Module 构建模式的变化
Go 1.17 版本中，Go Module 最重要的一个变化就是 pruned module graph，即修剪的 module 依赖图。

### Go 编译器的变化
Go 1.17 版本中，Go 编译器最大的变化是在 AMD64 架构下率先实现了从基于堆栈的调用惯例到基于寄存器的调用惯例的切换。


## 加餐｜他山之石：学习Go你还可以参考什么？
第一名：《Go 程序设计语言》- 人手一本的 Go 语言“圣经”
第二名：《Go 语言实战》- 实战系列经典之作，紧扣 Go 语言的精华
第三名：《Go 语言学习笔记》- Go 源码剖析与实现原理探索
第四名：《Go 101》- Go 语言参考手册
第五名：《The Way To Go》- Go 语言百科全书

其他形式的参考资料
Go 官方文档
Go 相关博客
Go 播客
Go 技术演讲
Go 日报 / 周刊邮件列表



## 28｜接口：接口即契约
Go 规定：如果一个类型 T 的方法集合是某接口类型 I 的方法集合的等价集合或超集，我们就说类型 T 实现了接口类型 I，那么类型 T 的变量就可以作为合法的右值赋值给接口类型 I 的变量。

空接口类型的这一可接受任意类型变量值作为右值的特性，让他成为 Go 加入泛型语法之前唯一一种具有“泛型”能力的语法元素
```
v, ok := i.(T)   // 把接口类型转成指定的类型
v := i.(T)        // 直接这样转的话如果类型不对，会引起panic
```


### Go 语言接口定义的惯例
尽量定义“小接口”
优势：
* 第一点：接口越小，抽象程度越高。而这种情况的极限恰恰就是无方法的空接口 interface{}，空接口的这个抽象对应的事物集合空间包含了 Go 语言世界的所有事物。
* 第二点：小接口易于实现和测试
* 第三点：小接口表示的“契约”职责单一，易于复用组合

定义小接口，你可以遵循的几点
* 首先，别管接口大小，先抽象出接口。
* 第二，将大接口拆分为小接口。
* 最后，我们要注意接口的单一契约职责。


## 29｜接口：为什么nil接口不等于nil？
为什么接口在 Go 中有这么高的地位呢？这是因为接口是 Go 这门静态语言中唯一“动静兼备”的语法特性。

接口的静态特性与动态特性
接口的**静态特性**体现在接口类型变量具有静态类型，比如var err error中变量 err 的静态类型为 error。拥有静态类型，那就意味着编译器会在编译阶段对所有接口类型变量的赋值操作进行类型检查，编译器会检查右值的类型是否实现了该接口方法集合中的所有方法。如果不满足，就会报错。
而接口的**动态特性**，就体现在接口类型变量在运行时还存储了右值的真实类型信息，这个右值的真实类型被称为接口类型变量的动态类型。有点类似多态。

要更好地理解 Go 接口的这两种特性，我们需要深入到 Go 接口在运行时的表示层面上去。接口类型变量在运行时表示为 eface 和 iface，eface 用于表示空接口类型变量，iface 用于表示非空接口类型变量。只有两个接口类型变量的类型信息(eface._type/iface.tab._type)相同，且数据指针(eface.data/iface.data)所指数据相同时，两个接口类型变量才是相等的。
最后，接口类型变量的赋值本质上是一种装箱操作，装箱操作是由 Go 编译器和运行时共同完成的，有一定的性能开销，对于性能敏感的系统来说，我们应该尽量避免或减少这类装箱操作。


## 30｜接口：Go中最强大的魔法

Go 语言之父 Rob Pike 曾说过：如果 C++ 和 Java 是关于类型层次结构和类型分类的语言，那么 Go 则是关于组合的语言。

接口应用的几种模式
### 1. 基本模式
```
func YourFuncName(param YourInterfaceType)     //实现多态
```


### 2.创建模式
Go 社区流传一个经验法则：“接受接口，返回结构体(Accept interfaces, return structs)”
```
type Cond struct {
    ... ...
    L Locker
}
func NewCond(l Locker) *Cond {
    return &Cond{L: l}
}
```

### 3.包装器模式
通过这个函数，我们可以实现对输入参数的类型的包装，并在不改变被包装类型(输入参数类型)的定义的情况下，返回具备新功能特性的、实现相同接口类型的新类型。
```
func YourWrapperFunc(param YourInterfaceType) YourInterfaceType

// example
func LimitReader(r Reader, n int64) Reader { return &LimitedReader{r, n} }
type LimitedReader struct {
    R Reader // underlying reader
    N int64  // max bytes remaining
}
func (l *LimitedReader) Read(p []byte) (n int, err error) {
    // ... ...
}


func main() {
    r := strings.NewReader("hello, gopher!\n")
    lr := io.LimitReader(r, 4)
    if _, err := io.Copy(os.Stdout, lr); err != nil {
        log.Fatal(err)
    }
}
```

### 4.适配器模式
适配器模式的核心是适配器函数类型(Adapter Function Type)

最典型的适配器函数类型莫过于我们在第 21 讲中提到过的http.HandlerFunc了
```
func greetings(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome!")
}
func main() {
    //http.HandlerFunc(greetings)这一句是一个类型转换，就是把普通的函数转换成框架可以用的类型
    //将一个普通函数(比如例子中的几个匿名函数)转型为实现了 http.Handler 的类型的实例。
    http.ListenAndServe(":8080", http.HandlerFunc(greetings))  
}

// HandlerFunc类型的实现
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
type HandlerFunc func(ResponseWriter, *Request)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {    // 框架在底层调用这个方法以达到调用用户自定义方法的作用
    f(w, r)
}
```

### 5.中间件(Middleware)
实质上，这里的中间件就是包装模式和适配器模式结合的产物。
```
func validateAuth(s string) error {
    if s != "123456" {
        return fmt.Errorf("%s", "bad auth token")
    }
    return nil
}
func greetings(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome!")
}
func logHandler(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        t := time.Now()
        log.Printf("[%s] %q %v\n", r.Method, r.URL.String(), t)
        h.ServeHTTP(w, r)
    })
}
func authHandler(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        err := validateAuth(r.Header.Get("auth"))
        if err != nil {
            http.Error(w, "bad auth param", http.StatusUnauthorized)
            return
        }
        h.ServeHTTP(w, r)
    })
}
func main() {
    http.ListenAndServe(":8080", logHandler(authHandler(http.HandlerFunc(greetings))))
}
```
我们看到，所谓中间件(如：logHandler、authHandler)本质就是一个包装函数(支持链式调用)，但它的内部利用了适配器函数类型(http.HandlerFunc)，将一个普通函数(比如例子中的几个匿名函数)转型为实现了 http.Handler 的类型的实例。

### 6.尽量避免使用空接口作为函数参数类型
建议广大 Gopher 尽可能地抽象出带有一定行为契约的接口，并将它作为函数参数类型，尽量不要使用可以“逃过”编译器类型安全检查的空接口类型(interface{})。
一般传数据可以用空接口，传带有**某种行为**的结构体就不要用空接口了


这些使用interface{}作为参数类型的函数或方法都有一个共同特点，就是它们面对的都是未知类型的数据，所以在这里使用具有“泛型”能力的interface{}类型。我们也可以理解为是在 Go 语言尚未支持泛型的这个阶段的权宜之计。等 Go 泛型落地后，很多场合下 interface{}就可以被泛型替代了。




## 31｜并发：Go的并发方案实现方案是怎样的？
Go 并没有使用操作系统线程作为承载分解后的代码片段(模块)的基本执行单元，而是实现了goroutine这一由 Go 运行时(runtime)负责调度的、轻量的用户级线程，为并发程序设计提供原生支持。

goroutine 的优势主要是：
* 资源占用小，每个 goroutine 的初始栈大小仅为 2k；
* 由 Go 运行时而不是操作系统调度，goroutine 上下文切换在用户层完成，开销更小；
* 在语言层面而不是通过标准库提供。goroutine 由go关键字创建，一退出就会被回收或销毁，开发体验更佳；
* 语言内置 channel 作为 goroutine 间通信原语，为并发设计提供了强大支撑。


我们看到，和传统编程语言不同的是，Go 语言是面向并发而生的，所以，在程序的结构设计阶段，**Go 的惯例是优先考虑并发设计**。这样做的目的更多是考虑随着外界环境的变化，通过并发设计的 Go 应用可以更好地、更自然地适应**规模化(scale)**。


并发不是并行。并发是**应用程序结构设计**相关的概念，而并行只是程序**执行期**的概念，并行的必要条件是具有多个处理器或多核处理器，否则无论是否是并发的设计


## 32｜并发：聊聊Goroutine调度器的原理
Goroutine 调度器
Goroutine 的调度问题就演变为，Go 运行时如何将程序内的众多 Goroutine，按照一定算法调度到“CPU”资源上运行的问题了。
可是，在操作系统层面，线程竞争的“CPU”资源是真实的物理 CPU，但在 Go 程序层面，各个 Goroutine 要竞争的“CPU”资源又是什么呢？
Go 程序是用户层程序，它本身就是整体运行在一个或多个操作系统线程上的。
所以这个答案就出来了：Goroutine 们要竞争的“CPU”资源就是操作系统线程。这样，Goroutine 调度器的任务也就明确了：将 Goroutine 按照一定算法放到不同的操作系统线程中去执行。



深入 G-P-M 模型
关于 G、P、M 的定义，我们可以参见$GOROOT/src/runtime/runtime2.go这个源文件
* G:  代表 Goroutine，存储了 Goroutine 的执行栈信息、Goroutine 状态以及 Goroutine 的任务函数等，而且 G 对象是可以重用的；
* P:  代表逻辑 processor，P 的数量决定了系统内最大可并行的 G 的数量，P 的最大作用还是其拥有的各种 G 对象队列、链表、一些缓存和状态；
* M:  M 代表着真正的执行计算资源。在绑定有效的 P 后，进入一个调度循环，而调度循环的机制大致是从 P 的本地运行队列以及全局队列中获取 G，切换到 G 的执行栈上并执行 G 的函数，调用 goexit 做清理工作并回到 M，如此反复。M 并不保留 G 状态，这是 G 可以跨 M 调度的基础。

而 Goroutine 调度器的目标，就是公平合理地将各个 G 调度到 P 上“运行”，下面我们重点看看 G 是如何被调度的。

前面说过，除非极端的无限循环，否则只要 G 调用函数，Go 运行时就有了抢占 G 的机会。Go 程序启动时，运行时会去启动一个名为 sysmon 的 M(一般称为监控线程)，这个 M 的特殊之处在于它不需要绑定 P 就可以运行(以 g0 这个 G 的形式)，这个 M 在整个 Go 程序的运行过程中至关重要

如果一个 G 任务运行 10ms，sysmon 就会认为它的运行时间太久而发出抢占式调度的请求。
不过，除了这个常规调度之外，还有两个特殊情况下 G 的调度方法。
* 第一种：channel 阻塞或网络 I/O 情况下的调度。
* 第二种：系统调用阻塞情况下的调度。


小结
基于 Goroutine 的并发设计离不开一个高效的生产级调度器。Goroutine 调度器演进了 10 余年，先后经历了 G-M 模型、G-P-M 模型和 work stealing 算法、协作式的抢占调度以及基于信号的异步抢占等改进与优化，目前 Goroutine 调度器相对稳定和成熟，可以适合绝大部分生产场合。
现在的 G-P-M 模型和最初的 G-M 模型相比，通过向 G-M 模型中增加了一个代表逻辑处理器的 P，使得 Goroutine 调度器具有了更好的伸缩性。
M 是 Go 代码运行的真实载体，包括 Goroutine 调度器自身的逻辑也是在 M 中运行的。
P 在 G-P-M 模型中占据核心地位，它拥有待调度的 G 的队列，同时 M 要想运行 G 必须绑定一个 P。一个 G 被调度执行的时间不能过长，超过特定长的时间后，G 会被设置为可抢占，并在下一次执行函数或方法时被 Go 运行时移出运行状态。
如果 G 被阻塞在某个 channel 操作或网络 I/O 操作上时，M 可以不被阻塞，这避免了大量创建 M 导致的开销。但如果 G 因慢系统调用而阻塞，那么 M 也会一起阻塞，但在阻塞前会与 P 解绑，P 会尝试与其他 M 绑定继续运行其他 G。但若没有现成的 M，Go 运行时会建立新的 M，这也是系统调用可能导致系统线程数量增加的原因，你一定要注意这一点。



## 33｜并发：小channel中蕴含大智慧

作为一等公民的 channel

那 channel 作为一等公民意味着什么呢？
这意味着我们可以像使用普通变量那样使用 channel，比如，定义 channel 类型变量、给 channel 变量赋值、将 channel 作为参数传递给函数 / 方法、将 channel 作为返回值从函数 / 方法中返回，甚至将 channel 发送到其他 channel 中。这就大大简化了 channel 原语的使用，提升了我们开发者在做并发设计和实现时的体验。

创建channel
为 channel 类型变量赋初值的唯一方法就是使用 **make** 这个 Go 预定义的函数，比如下面代码
```
var ch chan int      //默认值为 nil


ch1 := make(chan int)         //无缓冲的
ch2 := make(chan int, 5)      //带缓冲的
```

channel 是用于 Goroutine 间通信的，所以绝大多数对 channel 的读写都被分别放在了不同的 Goroutine 中。一个goroutine中写入channel，另一个goroutine中读取channel，这样就实现了两个goroutine之间的通信。

由于无缓冲 channel 的运行时层实现不带有缓冲区，所以 Goroutine 对无缓冲 channel 的接收和发送操作是**同步**的。也就是说，对同一个无缓冲 channel，只有对它进行接收操作的 Goroutine 和对它进行发送操作的 Goroutine **都存在的情况下**，通信才能得以进行，否则单方面的操作会让对应的 Goroutine 陷入挂起状态
对无缓冲 channel 类型的发送与接收操作，一定要放在两个不同的 Goroutine 中进行，否则会导致 deadlock。


和无缓冲 channel 相反，带缓冲 channel 的运行时层实现带有缓冲区，因此，对带缓冲 channel 的发送操作在缓冲区未满、接收操作在缓冲区非空的情况下是异步的(发送或接收不需要阻塞等待)。
也就是说，对一个带缓冲 channel 来说，在缓冲区未满的情况下，对它进行发送操作的 Goroutine 并不会阻塞挂起；在缓冲区有数据的情况下，对它进行接收操作的 Goroutine 也不会阻塞挂起。
但当缓冲区满了的情况下，对它进行发送操作的 Goroutine 就会阻塞挂起；当缓冲区为空的情况下，对它进行接收操作的 Goroutine 也会阻塞挂起。



使用操作符<-，我们还可以声明只发送 channel 类型(send-only)和只接收 channel 类型(recv-only)

```
ch1 := make(chan<- int, 1) // 只发送channel类型
ch2 := make(<-chan int, 1) // 只接收channel类型
```
通常只发送 channel 类型和只接收 channel 类型，会被用作函数的参数类型或返回值，用于限制对 channel 内的操作，或者是明确可对 channel 进行的操作的类型


```
func produce(ch chan<- int) {
    for i := 0; i < 10; i++ {
        ch <- i + 1
        time.Sleep(time.Second)
    }
    close(ch)
}
func consume(ch <-chan int) {
    for n := range ch {
        println(n)
    }
}
func main() {
    ch := make(chan int, 5)
    var wg sync.WaitGroup
    wg.Add(2)
    go func() {
        produce(ch)
        wg.Done()
    }()
    go func() {
        consume(ch)
        wg.Done()
    }()
    wg.Wait()
}
```

### 关闭 channel
channel 关闭后，所有等待从这个 channel 接收数据的操作都将返回。
```
n := <- ch      // 当ch被关闭后，n将被赋值为ch元素类型的零值
m, ok := <-ch   // 当ch被关闭后，m将被赋值为ch元素类型的零值, ok值为false
for v := range ch { // 当ch被关闭后，for range循环结束
    ... ...
}
```
从前面 produce 的示例程序中，我们也可以看到，channel 是在 produce 函数中被关闭的，这也是 channel 的一个使用惯例，那就是**发送端负责关闭** channel。
这是因为发送端没有像接受端那样的、可以安全判断 channel 是否被关闭了的方法。同时，一旦**向一个已经关闭的 channel 执行发送操作，这个操作就会引发 panic**

### select
通过 select，我们可以同时在多个 channel 上进行发送/接收操作：
```
select {
case x := <-ch1:     // 从channel ch1接收数据
  ... ...
case y, ok := <-ch2: // 从channel ch2接收数据，并根据ok值判断ch2是否已经关闭
  ... ...
case ch3 <- z:       // 将z值发送到channel ch3中:
  ... ...
default:             // 当上面case中的channel通信均无法实施时，执行该默认分支
}
```

当 select 语句中没有 default 分支，而且所有 case 中的 channel 操作都阻塞了的时候，整个 select 语句都将**被阻塞**，直到某一个 case 上的 channel 变成可发送，或者某个 case 上的 channel 变成可接收，select 语句才可以继续进行下去。


### 无缓冲 channel 的惯用法

#### 1.用作信号传递(routin之间的同步)


1 对 1 通知信号
```
type signal struct{}
func worker() {
    println("worker is working...")
    time.Sleep(1 * time.Second)
}
func spawn(f func()) <-chan signal {
    c := make(chan signal)
    go func() {
        println("worker start to work...")
        f()
        c <- signal(struct{}{})
    }()
    return c
}
func main() {
    println("start a worker...")
    c := spawn(worker)
    <-c
    fmt.Println("worker work done!")
}
```


1 对 n 的信号通知,这样的信号通知机制，常被用于协调多个 Goroutine 一起工作
```
func worker(i int) {
    fmt.Printf("worker %d: is working...\n", i)
    time.Sleep(1 * time.Second)
    fmt.Printf("worker %d: works done\n", i)
}
func spawnGroup(f func(i int), num int, groupSignal <-chan signal) <-chan signal {
    c := make(chan signal)
    var wg sync.WaitGroup
    for i := 0; i < num; i++ {
        wg.Add(1)
        go func(i int) {
            <-groupSignal   // 进入后默认先阻塞起来，等到父goroutine统一close这个channel来统一发信号
            fmt.Printf("worker %d: start to work...\n", i)
            f(i)
            wg.Done()
        }(i + 1)
    }
    go func() {
        wg.Wait()
        c <- signal(struct{}{})
    }()
    return c
}
func main() {
    fmt.Println("start a group of workers...")
    groupSignal := make(chan signal)
    c := spawnGroup(worker, 5, groupSignal)
    time.Sleep(5 * time.Second)
    fmt.Println("the group of workers start to work...")
    //关闭一个无缓冲 channel 会让所有阻塞在这个 channel 上的接收操作返回,相当于一个信号枪的作用
    close(groupSignal)
    <-c
    fmt.Println("the group of workers work done!")
}
```

#### 2.用于替代锁机制
无缓冲 channel 具有同步特性，这让它在某些场合可以替代锁，让我们的程序更加清晰，可读性也更好

锁的方式
```
type counter struct {
    sync.Mutex
    i int
}
var cter counter
func Increase() int {
    cter.Lock()
    defer cter.Unlock()
    cter.i++
    return cter.i
}
func main() {
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(i int) {
            v := Increase()
            fmt.Printf("goroutine-%d: current counter value is %d\n", i, v)
            wg.Done()
        }(i)
    }
    wg.Wait()
}
```

channel的方式
这种并发设计逻辑更符合 Go 语言所倡导的“不要通过共享内存来通信，而是通过通信来共享内存”的原则。
```
type counter struct {
    c chan int
    i int
}
func NewCounter() *counter {
    cter := &counter{
        c: make(chan int),
    }
    go func() {       // 所有的Increase操作都放到一个goroutine中，从而达到了锁的作用
        for {
            cter.i++          
            cter.c <- cter.i
        }
    }()
    return cter
}
func (cter *counter) Increase() int {
    return <-cter.c
}
func main() {
    cter := NewCounter()
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(i int) {
            v := cter.Increase()
            fmt.Printf("goroutine-%d: current counter value is %d\n", i, v)
            wg.Done()
        }(i)
    }
    wg.Wait()
}
```

### 带缓冲 channel 的惯用法
带缓冲的 channel 与无缓冲的 channel 的最大不同之处，就在于它的异步性。

#### 第一种用法：用作消息队列
channel 经常被 Go 初学者视为在多个 Goroutine 之间通信的消息队列，这是因为，channel 的原生特性与我们认知中的消息队列十分相似，包括 Goroutine 安全、有 FIFO(first-in, first out)保证等。


#### 第二种用法：用作计数信号量(counting semaphore)
```
var active = make(chan struct{}, 3)   //最大容量是3
var jobs = make(chan int, 10)
func main() {
    go func() {
        for i := 0; i < 8; i++ {
            jobs <- (i + 1)
        }
        close(jobs)
    }()
    var wg sync.WaitGroup
    for j := range jobs {
        wg.Add(1)
        go func(j int) {
            active <- struct{}{}     // active记到3就会被阻塞掉
            log.Printf("handle job: %d\n", j)
            time.Sleep(2 * time.Second)
            <-active
            wg.Done()
        }(j)
    }
    wg.Wait()
}
```

### len(channel) 的应用
针对 channel ch 的类型不同，len(ch) 有如下两种语义：
* 当 ch 为无缓冲 channel 时，len(ch) 总是返回 0；
* 当 ch 为带缓冲 channel 时，len(ch) 返回当前 channel ch 中**尚未被读取的元素个数**。

在“多发送单接收”的场景，也就是有多个发送者，但有且只有一个接收者。在这样的场景下，我们可以在接收 goroutine 中使用len(channel)是否大于0来判断是否 channel 中有数据需要接收。

而在“多接收单发送”的场景，也就是有多个接收者，但有且只有一个发送者。在这样的场景下，我们可以在发送 Goroutine 中使用len(channel)是否小于cap(channel)来判断是否可以执行向 channel 的发送操作。


### nil channel 的妙用
如果一个 channel 类型变量的值为 nil，我们称它为 nil channel。nil channel 有一个特性，那就是对 nil channel 的读写都会发生阻塞。


### 与 select 结合使用的一些惯用法

#### 第一种用法：利用 default 分支避免阻塞
select 语句的 default 分支的语义，就是在其他非 default 分支因通信未就绪，而无法被选择的时候执行的，这就给 default 分支赋予了一种“避免阻塞”的特性。
```
func tryRecv(c <-chan int) (int, bool) {
  select {
  case i := <-c:
    return i, true
  default: // channel为空
    return 0, false
  }
}

func trySend(c chan<- int, i int) bool {
  select {
  case c <- i:
    return true
  default: // channel满了
    return false
  }
}
```

#### 第二种用法：实现超时机制
通过超时事件，我们既可以避免长期陷入某种操作的等待中，也可以做一些异常处理工作
```
func worker() {
  select {
  case <-c:
       // ... do some stuff
  case <-time.After(30 *time.Second):
      return
  }
}
```

#### 第三种用法：实现心跳机制
结合 time 包的 Ticker，我们可以实现带有心跳机制的 select。这种机制让我们可以在监听 channel 的同时，执行一些周期性的任务，比如下面这段代码：
```
func worker() {
  heartbeat := time.NewTicker(30 * time.Second)
  defer heartbeat.Stop()    //在使用完 ticker 之后，调用它的Stop，避免心跳事件在 ticker 的 channel(本例中的 heartbeat.C)中持续产生
  for {
    select {
    case <-c:
      // ... do some stuff
    case <- heartbeat.C:
      //... do heartbeat stuff
    }
  }
}
```


## 34｜并发：如何使用共享变量？

sync 包低级同步原语可以用在哪？
1. 首先是需要高性能的临界区(critical section)同步机制场景。
我们可以把 channel 看成是一种高级的同步原语，它自身的实现也是建构在低级同步原语之上的。也正因为如此，channel 自身的性能与低级同步原语相比要略微逊色，开销要更大。
差距可能在几倍之间。
因此，通常在需要高性能的临界区(critical section)同步机制的情况下，sync 包提供的低级同步原语更为适合。

2. 第二种就是在不想转移结构体对象所有权，但又要保证结构体内部状态数据的同步访问的场景。
基于 channel 的并发设计，有一个特点：在 Goroutine 间通过 channel 转移数据对象的所有权。所以，只有拥有数据对象所有权(从 channel 接收到该数据)的 Goroutine 才可以对该数据对象进行状态变更。



### sync 包中同步原语使用的注意事项
在使用 sync 包提供的同步原语之前，我们一定要牢记这些原语使用的注意事项：
不要复制首次使用后的 Mutex/RWMutex/Cond 等。一旦复制，你将很大可能得到意料之外的运行结果。也就是值类型的不可以被复制
以Mutex为例
```
// $GOROOT/src/sync/mutex.go
type Mutex struct {
    state int32
    sema  uint32
}
```
初始情况下，Mutex 的实例处于 Unlocked 状态(state 和 sema 均为 0)。对 Mutex 实例的复制也就是两个整型字段的复制。一旦发生复制，原变量与副本就是两个单独的内存块，各自发挥同步作用，互相就没有了关联。


### 条件变量
sync.Cond是传统的条件变量原语概念在 Go 语言中的实现。

条件变量是同步原语的一种，如果没有条件变量，开发人员可能需要在 Goroutine 中通过连续轮询的方式，检查某条件是否为真，这种连续轮询非常消耗资源，因为 Goroutine 在这个过程中是处于活动状态的，但它的工作又没有进展。


sync 包中的低级同步原语各有各的擅长领域，你可以记住：
* 在具有一定并发量且读多写少的场合使用 RWMutex；
* 在需要“等待某个条件成立”的场景下使用 Cond；
* 当你不确定使用什么原语时，那就使用 Mutex 吧。
* 简单类型的，如数字类型的，就用atomic 包提供的原子操作函数。



## 35｜即学即练：如何实现一个轻量级线程池？
Goroutine 的开销十分小，一个 Goroutine 的起始栈大小为 2KB，而且创建、切换与销毁的代价很低，我们可以创建成千上万甚至更多 Goroutine。
但是，一旦规模化后，这种非零成本也会成为瓶颈。我们以一个 Goroutine 分配 2KB 执行栈为例，100w Goroutine 就是 2GB 的内存消耗。
另外，随着 Goroutine 数量的增加，Go 运行时进行 Goroutine 调度的处理器消耗，也会随之增加，成为阻碍 Go 应用性能提升的重要因素。


Goroutine 池就是一种常见的解决方案。这个方案的核心思想是对 Goroutine 的重用，也就是把 M 个计算任务调度到 N 个 Goroutine 上，而不是为每个计算任务分配一个独享的 Goroutine，从而提高计算资源的利用率。


workerpool 的实现主要分为三个部分：
* pool 的创建与销毁；
* pool 中 worker(Goroutine)的管理；
* task 的提交与调度。


## 加餐｜如何拉取私有的Go Module？

### 导入本地 module
如果我们的项目依赖的是本地正在开发、尚未发布到公共站点上的 Go Module，那么我们应该如何做呢？
这个时候，我们就可以借助 go.mod 的 replace 指示符，来解决这个问题。解决的步骤是这样的：
1. 首先，我们需要在 module a 的 go.mod 中的 require 块中，手工加上这一条,
注意了，这里的 v1.0.0 版本号是一个“假版本号”，目的是满足 go.mod 中 require 块的语法要求。
```
require github.com/user/b v1.0.0
```

2. 然后，我们再在 module a 的 go.mod 中使用 replace，将上面对 module b v1.0.0 的依赖，替换为本地路径上的 module b:
```
replace github.com/user/b v1.0.0 => module b的本地源码路径
```

但显然这种方法也是有“瑕疵”的。这个替换的本地路径是因开发者环境而异的。
解决：
在Go 1.18 版本中加入了 Go 工作区(Go workspace，也译作 Go 工作空间)辅助构建机制。
基于这个机制，我们可以将多个本地路径放入同一个 workspace 中，这样，在这个 workspace 下各个 module 的构建将优先使用 workspace 下的 module 的源码。工作区配置数据会放在一个名为 go.work 的文件中，这个文件是开发者环境相关的，因此并不需要提交到源码服务器上，这就解决了上面“伪造 go.mod”方案带来的那些问题。

### 拉取私有 module 的需求与参考方案
随着公司内 Go 使用者和 Go 项目的增多，“重造轮子”的问题就出现了。抽取公共代码放入一个独立的、可被复用的内部私有仓库成为了必然，这样我们就有了拉取私有 Go Module 的需求。

第一个方案，是通过直连组织公司内部的私有 Go Module 服务器拉取。
第二种方案，是将外部 Go Module 与私有 Go Module 都交给内部统一的 GOPROXY 服务去处理：


## 加餐｜聊聊最近大热的Go泛型
Go 1.18加入泛型
Go 1.18 发布说明中给出了一个结论：Go 1.18 编译器的性能要比 Go 1.17 下降 15% 左右

在没有泛型之前，Gopher 们通常使用空接口类型 interface{}，作为算法操作的对象的数据类型，不过这样做的不足之处也很明显：一是无法进行类型安全检查，二是性能有损失。

类型参数(type parameter)的名字都是首字母大写的，通常都是用单个大写字母命名。

### 约束(constraint)
约束(constraint)规定了一个类型实参(type argument)必须满足的条件要求。如果某个类型满足了某个约束规定的所有条件要求，那么它就是这个约束修饰的类型形参的一个合法的类型实参。
```
type C1 interface {      //C就是一个泛型约束
    ~int | ~int32
    M1()
}
type T struct{}
func (T) M1() {
}
type T1 int
func (T1) M1() {
}
func foo[P C1](t P)() {
}
func main() {
    var t1 T1
    foo(t1)
    var t T
    foo(t) // 编译器报错：T does not implement C1
}
```

### 泛型类型
```
type Slice[T int|float32|float64 ] []T

// 这里传入了类型实参int，泛型类型Slice[T]被实例化为具体的类型 Slice[int]
var a Slice[int] = []int{1, 2, 3}  
fmt.Printf("Type Name: %T",a)  //输出：Type Name: Slice[int]

// 传入类型实参float32, 将泛型类型Slice[T]实例化为具体的类型 Slice[string]
var b Slice[float32] = []float32{1.0, 2.0, 3.0} 
fmt.Printf("Type Name: %T",b)  //输出：Type Name: Slice[float32]
```

在 Go 1.18 中，any 是 interface{}的别名，也是一个预定义标识符，使用 any 作为类型参数的约束，代表没有任何约束。
```
type Vector[T any] []T
func (v Vector[T]) Dump() {
    fmt.Printf("%#v\n", v)
}
func main() {
    var iv = Vector[int]{1,2,3,4}
    var sv Vector[string]
    sv = []string{"a","b", "c", "d"}
    iv.Dump()
    sv.Dump()
}
```

什么情况适合使用泛型
* 如果你发现自己多次编写完全相同的代码(样板代码)，各个版本之间唯一的差别是代码使用不同的类型，那就请你考虑是否可以使用类型参数。
* 当编写的函数的操作元素的类型为 slice、map、channel 等特定类型的时候。如果一个函数接受这些类型的形参，并且函数代码没有对参数的元素类型作出任何假设，那么使用类型参数可能会非常有用。
* 另一个适合使用类型参数的情况是编写通用数据结构

什么情况不宜使用泛型
* 当不同的类型使用一个共同的方法时，如果一个方法的实现对于所有类型都相同，就使用类型参数；相反，如果每种类型的实现各不相同，请使用不同的方法，不要使用类型参数。

## 大咖助阵｜大明：Go泛型，泛了，但没有完全泛
如果你经常要分别为不同的类型写完全相同逻辑的代码，那么使用泛型将是最合适的选择



### 泛型方法
```
func Add[T int | float32 | float64](a T, b T) T {
    return a + b
}

Add[int](1,2) // 传入类型实参int，计算结果为 3
Add[float32](1.0, 2.0) // 传入类型实参float32, 计算结果为 3.0
Add[string]("hello", "world") // 错误。因为泛型函数Add的类型约束中并不包含string
```

### Go 泛型的局限

#### Go 接口和结构体不支持泛型方法；
```
// ================没加泛型==================
type Orm interface {
   Insert(data ...interface{}) (sql.Result, error)
}

// ==================接口或结构体加泛型============
type Orm[T any] interface {
   Insert(data ...T) (sql.Result, error)
}

var userOrm Orm[User]          // 这样需要创建很多个Orm实例
var orderOrm Orm[Order]

//======== 结构体和接口方法加泛型，但是go不支持========
type orm struct {     
}
func (o orm) Insert[T any](data ...T) (sql.Result, error) {
    //...
}

type Orm interface {
   Insert[T any](data ...T) (sql.Result, error)
}

orm.Insert[*User](&User{}, &User{})
orm.Insert[*Order](&Order{}, &Order{})


// 实际上，操作任意类型的接口很常见，特别是对于提供客户端功能的中间件来说
type HttpClient interface {
   Get[T any](url string) (T, error)
}

type CacheClient interface {
   Get[T any](key string) (T, error)
}
```

#### 泛型约束不能作为类型声明；
泛型约束不能被用于做参数，它只能和泛型结合在一起使用，这就导致我们并不能用泛型的约束，来解决某个接口可以处理有限多种类型输入的问题。所以长期来看， interface{} 这种参数类型还会广泛存在于所有中间件的设计中。
```
type Selectable interface {
   string | Aggregate      // 限制类型只能是string或Aggregate类型
}
type Selector struct {
   columns []Selectable
}
func (s *Selector) Select(cols ...Selectable) *Selector {      // 方法的参数做限制
   panic("implement me")
}
```

#### 泛型约束只能是接口，而不能是结构体。
```
type BaseEntity struct {
   Id int64
}
func Insert[Entity BaseEntity](e *Entity) {     //BaseEntity是个结构体，所以不行
   
}
type myEntity struct {
   BaseEntity
   Name string
}
```

#### 这三个对应的、可行的解决思路：
* Builder 模式；
* 标记接口；
* Getter/Setter 接口。


### 参考链接
- [Go 1.18 泛型全面讲解：一篇讲清泛型的全部](https://segmentfault.com/a/1190000041634906)



## 36｜打稳根基：怎么实现一个TCP服务器？（上）
虽然目前主流 socket 网络编程模型是 I/O 多路复用模型，但考虑到这个模型在使用时的体验较差，Go 语言将这种复杂性隐藏到运行时层，并结合 Goroutine 的轻量级特性，在用户层提供了基于 I/O 阻塞模型的 Go socket 网络编程模型，这一模型就大大降低了 gopher 在编写 socket 应用程序时的心智负担。



网络 I/O 操作都是系统调用，Goroutine 执行 I/O 操作的话，一旦阻塞在系统调用上，就会导致 M 也被阻塞，为了解决这个问题，Go 设计者将这个“复杂性”隐藏在 Go 运行时中，他们在运行时中实现了网络轮询器（netpoller)，netpoller 的作用，就是只阻塞执行网络 I/O 操作的 Goroutine，但不阻塞执行 Goroutine 的线程（也就是 M）。
这样一来，对于 Go 程序的用户层（相对于 Go 运行时层）来说，它眼中看到的 goroutine 采用了“阻塞 I/O 模型”进行网络 I/O 操作，Socket 都是“阻塞”的。
但实际上，这样的“假象”，是通过 Go 运行时中的 netpoller I/O 多路复用机制，“模拟”出来的，对应的、真实的底层操作系统 Socket，实际上是非阻塞的。只是运行时拦截了针对底层 Socket 的系统调用返回的错误码，并通过 netpoller 和 Goroutine 调度，让 Goroutine“阻塞”在用户层所看到的 Socket 描述符上。
比如：当用户层针对某个 Socket 描述符发起read操作时，如果这个 Socket 对应的连接上还没有数据，运行时就会将这个 Socket 描述符加入到 netpoller 中监听，同时发起此次读操作的 Goroutine 会被挂起。
直到 Go 运行时收到这个 Socket 数据可读的通知，Go 运行时才会重新唤醒等待在这个 Socket 上准备读数据的那个 Goroutine。而这个过程，从 Goroutine 的视角来看，就像是 read 操作**一直阻塞在那个 Socket 描述符上一样**。
而且，Go 语言在网络轮询器（netpoller）中采用了 I/O 多路复用的模型。考虑到最常见的多路复用系统调用 select 有比较多的限制，比如：监听 Socket 的数量有上限（1024）、时间复杂度高，等等，Go 运行时选择了在不同操作系统上，使用操作系统各自实现的高性能多路复用函数，比如：Linux 上的 epoll、Windows 上的 iocp、FreeBSD/MacOS 上的 kqueue、Solaris 上的 event port 等，这样可以最大程度提高 netpoller 的调度和执行性能。



### 并发 Socket 读写
go的Read、Write底层使用的锁机制来保证并发安全，多个goruntine同时读写同一个socket，不会出现数据错乱的情况。
在应用层面，要想保证多个 Goroutine 在一个conn上 write 操作是安全的，需要一次 write 操作完整地写入一个“业务包”。一旦将业务包的写入拆分为多次 write，那也无法保证某个 Goroutine 的某“业务包”数据在conn发送的连续性。
对于 Read 操作而言，由于 TCP 是面向字节流，conn.Read无法正确区分数据的业务边界，因此，多个 Goroutine 对同一个 conn 进行 read 的意义不大，Goroutine 读到不完整的业务包，反倒增加了业务处理的难度。


## 37｜代码操练：怎么实现一个TCP服务器？（中）

协议的解包与打包
所谓协议的解包（decode），就是指识别 TCP 连接上的字节流，将一组字节“转换”成一个特定类型的协议消息结构，然后这个消息结构会被业务处理逻辑使用。
而打包（encode）刚刚好相反，是指将一个特定类型的消息结构转换为一组字节，然后这组字节数据会被放在连接上发送出去。



## 38｜成果优化：怎么实现一个TCP服务器？（下）
在这一讲中，我们重点讲解了如何针对上一讲实现的第一版服务端进行优化。我们给出了 Go 程序优化的四步循环方法，这四步依次是建立性能基准、性能剖析、代码优化和与性能基准比较，确定优化效果。如果经过一轮优化，Go 应用的性能仍然无法达到你的要求，那么还可以按这个循环，进行多轮优化。
建立性能基准是整个优化过程的前提，基准提供了性能优化的起点与参照物。而建立性能基准的前提又是建立观测设施。观测设施的建立方法有很多，这里我们基于 Prometheus+Grafana 的组合，实现了一个可视化的观测平台。基于这个平台，我们为第一版服务端实现建立了性能基准。
另外，剖析 Go 应用性能有很多工具，而 Gopher 的最爱依然是 Go 原生提供的 pprof，我们可以以图形化的形式或命令行的方式，收集和展示获取到的采样数据。针对我们的服务端程序，我们进行了带缓冲的网络 I/O 以及重用内存对象的优化，取得了很不错的效果。



## 大咖助阵｜海纳：聊聊语言中的类型系统与泛型
在这节课里，我们先了解到什么是类型系统，并介绍了什么是强类型和弱类型，什么是静态类型和动态类型。然后我们通过举例来说明 Python，JavaScript，Go 和 C++ 各自的类型系统的特点。
从这些例子中，我们看到静态强类型语言更容易阅读和维护，但灵活性不如动态弱类型语言。所以动态弱类型语言往往都是脚本语言，不太适合构建大型程序。
接下来，我们简单介绍了泛型的概念。我们使用了一个栈的例子来说明了使用泛型可以提高编程效率，节省代码量。Go 语言从 1.18 开始也支持泛型编程。
然后我们又提供了一个新的视角来理解泛型，这种新的视角是把泛型类看成是一种函数，它的输入参数可以是类型，也可以是值，它的返回值是一种新的类型。
最后，我们介绍了 C++ 的泛型实现和 Java 的泛型实现。C++ 不同的泛型参数会得到一种新的类型，这个过程我们也会称它为泛型的实例化。而 Java 则会进行类型擦除，从而导致表面上不同的类型参数实际上指代的是同一种类型。



## 孔令飞｜从小白到“老鸟”：我的Go语言进阶之路


## 叶剑峰｜Go语言中常用的那些代码优化点
第一点：使用 pkg/errors 而不是官方 error 库
第二点：在初始化 slice 的时候尽量补全 cap
第三点：初始化一个类的时候，如果类的构造参数较多，尽量使用 Option 写法
第四点：巧用大括号控制变量作用域




## 加餐｜作为Go Module的作者，你应该知道的几件事
在这一讲，我们更多从 Go Module 的作者或维护者的角度出发，去思考规划、发布和维护 Go Module 过程中可能遇到的问题以及解决方法。
Go Module 经过多年打磨已经逐渐成熟，对各种 Go Module 仓库的布局方式都提供了很好的支持。通常情况下，我们会采用在单仓库单 module 的布局方式，无论是发布 module 打版本号还是升级 major 版本号，这种方式都简单易懂，心智负担低。
当然 Go Module 也支持在一个仓库下管理多个 module，如果使用这种方式，要注意发布某 module 时，tag 名字要包含 module 目录名，比如：module1/v1.0.1。
升级 module 的 major 版本号时，你一定要注意：如果 module 内部包间有相互导入，那么这些包的 import 路径上也要增加 vN，否则就会存在在高 major 号的 module 代码中，引用低 major 号的 module 代码的情况，导致出现一些奇怪的问题。
此外，发布 Go Module 时你也一定要谨慎小心，因为一旦将 broken 的版本发布出去，要想作废这个版本是没有太好的方案的，现有的方案都或多或少对 module 使用者有些影响。尤其是采用单 repo 多 module 的布局方式时，发布 module 时更是要格外细心。













