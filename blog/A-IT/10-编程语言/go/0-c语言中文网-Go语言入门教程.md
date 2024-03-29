
## 一.Go语言简介

编译型语言
支持交叉编译
完全支持 UTF-8 的编程语言
静态强类型
具有垃圾回收功能
并发型
Go语言的语法规则严谨，没有歧义，更没什么黑魔法变异用法
保留指针，但默认阻止指针运算
将切片和字典作为内置类型



### 1.3 Go语言为并发而生

Go语言的并发是基于 goroutine 的，goroutine 类似于线程，但并非线程。可以将 goroutine 理解为一种虚拟线程。Go语言运行时会参与调度 goroutine，并将 goroutine 合理地分配到每个 CPU 中，最大限度地使用 CPU 性能。

多个 goroutine 中，Go语言使用通道（channel）进行通信，通道是一种内置的数据结构，可以让用户在不同的 goroutine 之间同步发送具有类型的消息。这让编程模型更倾向于在 goroutine 之间发送消息，而不是让多个 goroutine 争夺同一个数据的使用权。


goroutine  channel


### 1.4 哪些项目使用Go语言开发？
Docker、Go语言、以太坊、超级账本


### 1.5 哪些大公司正在使用Go语言
Go语言的强项在于它适合用来开发网络并发方面的服务，比如消息推送、监控、容器等，所以在高并发的项目上大多数公司会优先选择 Golang 作为开发语言。



### 1.6 Go语言适合做什么
Go语言擅长的领域：
* 在服务器编程方面，Go语言适合处理日志、数据打包、虚拟机处理、文件系统、分布式系统、数据库代理等；
* 网络编程方面，Go语言广泛应用于 Web 应用、API 应用、下载应用等；
* 此外，Go语言还可用于内存数据库和云平台领域，目前国外很多云平台都是采用 Go 开发。


### 1.7 Go语言和其它编程语言的对比
### 1.8 Go语言的性能如何？
### 1.9 Go语言标准库强大
### 1.10 Go语言上手简单
### 1.11 Go语言代码风格清晰、简单
去掉循环语句的括号
去掉if语句的括号
强制的代码风格
    左括号必须紧接着语句不换行


### 1.12 Go语言是怎么完成编译的
### 1.13 在Windows上安装Go语言开发包
go开发包安装完成之后，目录下的结构遵循 GOPATH 规则
### 1.14 在Linux上安装Go语言开发包
配置环境变量
我们需要配置 2 个环境变量分别是 GOROOT 和 PATH。
GOROOT 的值应该为Go语言的当前安装目录：`export GOROOT=/usr/local/go`
PATH 为了方便使用Go语言命令和 Go 程序的可执行文件，需要追加其值：`export PATH=$PATH:$GOROOT/bin`
```
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
```


### 1.15 在Mac OS上安装Go语言开发包
### 1.16 Go语言集成开发环境
### 1.17 Go语言工程结构详述
src 目录：放置项目和库的源文件；
pkg 目录：放置编译后生成的包/库的归档文件；
bin 目录：放置编译后生成的可执行文件。

### 1.18 Go语言依赖管理
早期的Go语言被很多开发者所吐槽的一个问题就是没有依赖包的管理，不过随着版本的不断更迭，Go语言依赖管理方面也在不断的完善。

godep 是一个Go语言官方提供的通过 vender 模式来管理第三方依赖的工具，类似的还有由社区维护的准官方包管理工具 dep。
Go语言从 1.5 版本开始开始引入 vendor 模式，如果项目目录下有 vendor 目录，那么Go语言编译器会优先使用 vendor 内的包进行编译、测试等。

go module 是Go语言从 1.11 版本之后官方推出的版本管理工具，并且从 Go1.13 版本开始，go module 成为了Go语言默认的依赖管理工具。


### 1.19 第一个Go语言程序
### 1.20 Go语言程序的编译和运行
1.  `go build xx.go`命令可以将Go语言程序代码编译成二进制的可执行文件，但是需要我们手动运行该二进制文件；
2.  `go run xx.go`命令则更加方便，它会在编译后直接运行Go语言程序，编译过程中会产生一个临时文件，但不会生成可执行文件，这个特点很适合用来调试程序。

### 1.21 Goland下载和安装
### 1.22 Goland入门指南
### 1.23 Goland常用快捷键
### 1.24 LiteIDE搭建Go语言开发环境



## 二.Go语言基本语法
### 2.1 Go语言变量的声明

```
// c语言中 a是int *， b是int
int* a, b;

//go中 a, b都是指针类型
var a, b *int
```

当一个变量被声明之后，系统自动赋予它该类型的零值：int 为 0，float 为 0.0，bool 为 false，string 为空字符串，指针为 nil 等。所有的内存在 Go 中**都是经过初始化的**。

变量的命名规则：小骆驼

### 2.2 Go语言变量的初始化
```
const size = 300  // 常量
var hp int = 100  // 变量初始化的标准格式
var hp = 100      // 编译器推导类型的格式
np := 100         // 短变量声明并初始化
```

### 2.3 Go语言多个变量同时赋值
```
var a int = 100
var b int = 200
b, a = a, b
```

### 2.4 Go语言匿名变量
```
a, _ := GetData()
```
在 Lua 等编程语言里，匿名变量也被叫做哑元变量。

### 2.5 Go语言变量的作用域
了解变量的作用域对我们学习Go语言来说是比较重要的，因为Go语言会在编译时检查每个变量是否使用过，**一旦出现未使用的变量，就会报编译错误**。

函数内定义的变量称为**局部变量**
函数外定义的变量称为**全局变量**
全局变量只需要在一个源文件中定义，就可以在所有源文件中使用
全局变量与局部变量名称可以相同，但是函数体内的局部变量会被优先考虑。

### 2.6 Go语言整型（整数类型）
用来表示 Unicode 字符的 rune 类型和 int32 类型是等价的，通常用于表示一个 Unicode 码点。这两个名称可以互换使用。同样，byte 和 uint8 也是等价类型，byte 类型一般用于强调数值是一个原始的数据而不是一个小的整数。

最后，还有一种无符号的整数类型 uintptr，它没有指定具体的 bit 大小但是足以容纳指针。uintptr 类型只有在底层编程时才需要，特别是Go语言和C语言函数库或操作系统接口相交互的地方。

尽管在某些特定的运行环境下 int、uint 和 uintptr 的大小可能相等，但是它们依然是不同的类型，比如 int 和 int32，虽然 int 类型的大小也可能是 32 bit，但是在需要把 int 类型当做 int32 类型使用的时候**必须显示的对类型进行转换**


### 2.7 Go语言浮点类型（小数类型）
Go语言提供了两种精度的浮点数 float32 和 float64，它们的算术规范由 IEEE754 浮点数国际标准定义，该浮点数规范被所有现代的 CPU 支持。

一个 float32 类型的浮点数可以提供大约 6 个十进制数的精度，而 float64 则可以提供约 15 个十进制数的精度，通常应该**优先使用 float64 类型**，因为 float32 类型的累计计算误差很容易扩散，并且 float32 能精确表示的正整数并不是很大。

### 2.8 Go语言复数
在计算机中，复数是由两个浮点数表示的，其中一个表示实部（real），一个表示虚部（imag）。
Go语言中复数的类型有两种，分别是  complex128（64 位实数和虚数）和 complex64（32 位实数和虚数），其中 complex128 为复数的默认类型。

声明复数的语法格式如下所示：
```
var name complex128 = complex(x, y)
name := complex(x, y)
```

### 2.9 实例：输出正弦函数（Sin）图像

### 2.10 Go语言bool类型（布尔类型）
Go语言对于值之间的比较有非常严格的限制，只有两个相同类型的值才可以进行比较

布尔值并不会**隐式转换**为数字值 0 或 1
```
// 如果b为真，btoi返回1；如果为假，btoi返回0
func btoi(b bool) int {
    if b {
        return 1
    }
    return 0
}

func itob(i int) bool { return i != 0 }
```


### 2.11 Go语言字符串
字符串是一种值类型，且值不可变，即创建某个文本后将**无法再次修改**这个文本的内容，更深入地讲，字符串是字节的**定长数组**。

go的heredoc语法
```
const str = `第一行
第二行
第三行
\r\n
`
fmt.Println(str)
```

### 2.12 Go语言字符类型（byte和rune）
Go语言的字符有以下两种：  

* 一种是 uint8 类型，或者叫 byte 型，代表了 ASCII 码的一个字符。
* 另一种是 rune 类型，代表一个 UTF-8 **字符**，当需要处理中文、日文或者其他复合字符时，则需要用到 rune 类型。rune 类型等价于 int32 类型。

### 2.13 Go语言数据类型转换
由于Go语言不存在隐式类型转换，因此所有的类型转换都必须**显式的声明**
```
valueOfTypeB = typeB(valueOfTypeA)
```
只有**相同底层类型**的变量之间可以进行相互转换（如将 int16 类型转换成 int32 类型），不同底层类型的变量相互转换时会引发编译错误（如将 bool 类型转换为 int 类型）
浮点数在转换为整型时，会将小数部分去掉，只保留整数部分。


### 2.14 Go语言指针
```
var cat int = 1
var str string = "banana"
fmt.Printf("%p %p", &cat, &str)

// 对指针进行取值操作
var house = "Malibu Point 10880, 90265"
ptr := &house
value := *ptr

// 交换函数
func swap(a, b *int) {
    // 取a指针的值, 赋给临时变量t
    t := *a
    // 取b指针的值, 赋给a指针指向的变量
    *a = *b
    // 将a指针的值赋给b指针指向的变量
    *b = t
}
x, y := 1, 2
// 交换变量值
swap(&x, &y)
// 输出变量值
fmt.Println(x, y)
```

```
str := new(string)
*str = "Go语言教程"
fmt.Println(*str)
```

### 2.15 Go语言变量逃逸分析
在 C/C++ 语言中，需要开发者自己学习如何进行内存分配，选用怎样的内存分配方式来适应不同的算法需求。比如，函数局部变量尽量使用栈，全局变量、结构体成员使用堆分配等。程序员不得不花费很长的时间在不同的项目中学习、记忆这些概念并加以实践和使用。

Go语言将这个过程整合到了编译器中，命名为“变量逃逸分析”。通过编译器分析代码的特征和代码的生命周期，决定应该使用堆还是栈来进行内存分配。
```
// 声明空结构体测试结构体逃逸情况
type Data struct {
}
func dummy() *Data {
    // 实例化c为Data类型
    var c Data
    //返回函数局部变量地址,     c/c++中会出错，go中会自动将变量move到heap中
    return &c
}
func main() {
    fmt.Println(dummy())
}
```

在使用Go语言进行编程时，Go语言的设计者不希望开发者将精力放在内存应该分配在栈还是堆的问题上，编译器会自动帮助开发者完成这个纠结的选择
编译器觉得变量应该分配在堆和栈上的原则是：
* 变量是否被取地址；
* 变量是否发生逃逸。


### 2.16 Go语言变量的生命周期
在程序的编译阶段，编译器会根据实际情况自动选择在栈或者堆上分配局部变量的存储空间，不论使用 var 还是 new 关键字声明变量都不会影响编译器的选择。
```
// 在函数 f 里的变量 x 必须在堆上分配，因为它在函数退出后依然可以通过包一级的 global 变量找到，虽然它是在函数内部定义的。
// 用Go语言的术语说，这个局部变量 x 从函数 f 中逃逸了。

// 当函数 g 返回时，变量 *y 不再被使用，也就是说可以马上被回收的。因此，*y 并没有从函数 g 中逃逸，编译器可以选择在栈上分配 *y 的存储空间，
// 也可以选择在堆上分配，然后由Go语言的 GC（垃圾回收机制）回收这个变量的内存空间。

var global *int
func f() {
    var x int
    x = 1
    global = &x
}
func g() {
    y := new(int)
    *y = 1
}
```
在实际的开发中，并不需要刻意的实现变量的逃逸行为，因为**逃逸的变量需要额外分配内存**，同时对性能的优化可能会产生细微的影响。

虽然Go语言能够帮助我们完成对内存的分配和释放，但是为了能够开发出高性能的应用我们任然需要了解变量的声明周期。例如，如果**将局部变量赋值给全局变量**，将会阻止 GC 对这个局部变量的回收，导致不必要的内存占用，从而影响程序的性能。

### 2.17 Go语言常量
Go语言中的常量使用关键字 const 定义，用于存储不会改变的数据，常量是在**编译时被创建的**，即使定义在函数内部也是如此
```
const pi = 3.14159 // 相当于 math.Pi 的近似值

const (
    e  = 2.7182818
    pi = 3.1415926
)


const (
    a = 1
    b                // 默认值为上一个常量的值
    c = 2
    d
)
fmt.Println(a, b, c, d) // "1 1 2 2"
```

### 2.18 Go语言模拟枚举
```
type Weekday int
const (
    Sunday Weekday = iota     // 开始生成枚举值, 默认为0
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)
```

### 2.19 Go语言类型别名
```
type byte = uint8
type rune = int32

// 将NewInt定义为int类型
type NewInt int
// 将int取一个别名叫IntAlias,  IntAlias 类型只会在代码中存在，**编译完成时，不会有 IntAlias 类型**。
type IntAlias = int
```


### 2.20 Go语言注释的定义及使用
godoc工具用来生成文档

### 2.21 Go语言关键字与标识符

### 2.22 Go语言运算符的优先级


### 2.23 Go语言字符串和数值类型的相互转换
strconv 包为我们提供了字符串和基本数据类型之间

```
strconv.Itoa()：整型转字符串
strconv.Atoi()：字符串转整型

//Parse 系列函数用于将字符串转换为指定类型的值
strconv.ParseBool()
strconv.ParseFloat()
strconv.ParseInt()
strconv.ParseUint()

//Format 系列函数实现了将给定类型数据格式化为字符串类型的功能
strconv.FormatBool()
strconv.FormatInt()
strconv.FormatUint()
strconv.FormatFloat()

//Append 系列函数用于将指定类型转换成字符串后追加到一个切片中
strconv.AppendBool()
strconv.AppendFloat()
strconv.AppendInt()
strconv.AppendUint()
```

## 三.Go语言容器

### 3.1 Go语言数组
数组是一个由固定长度的特定类型元素组成的序列,和数组对应的类型是 Slice（切片），Slice 是可以增长和收缩的动态序列，功能也更灵活
```
var a [3]int             // 定义三个整数的数组
fmt.Println(a[0])        // 打印第一个元素
fmt.Println(a[len(a)-1]) // 打印最后一个元素
// 打印索引和元素
for i, v := range a {
    fmt.Printf("%d %d\n", i, v)
}
// 仅打印元素
for _, v := range a {
    fmt.Printf("%d\n", v)
}
// 在数组的定义中，如果在数组长度的位置出现“...”省略号，则表示数组的长度是根据初始化值的个数来计算
q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"
```

数组的长度是数组类型的一个组成部分，因此 [3]int 和 [4]int 是两种不同的数组类型，数组的长度必须是常量表达式，因为数组的长度需要在编译阶段确定。
如果两个数组类型相同（包括数组的长度，数组中元素的类型）的情况下，我们可以直接通过较运算符（`==`和` !=`）来判断两个数组是否相等，

### 3.2 Go语言多维数组

```
// 声明一个二维整型数组，两个维度的长度分别是 4 和 2
var array [4][2]int
// 使用数组字面量来声明并初始化一个二维整型数组
array = [4][2]int{ {10, 11}, {20, 21}, {30, 31}, {40, 41} }
```

### 3.3 Go语言切片

切片（slice）是对数组的一个连续片段的引用，所以切片是一个**引用类型**
切片有点像C语言里的指针，指针可以做运算，但代价是内存操作越界，切片在指针的基础上增加了大小，约束了切片对应的内存区域，切片使用中无法对切片内部的地址和大小进行手动调整，因此切片比指针更安全、强大。

1. 从指定范围中生成切片
```
var highRiseBuilding [30]int
for i := 0; i < 30; i++ {
        highRiseBuilding[i] = i + 1
}
// 区间
fmt.Println(highRiseBuilding[10:15])
```

2. 直接声明新的切片
```
// 声明字符串切片
var strList []string
// 声明整型切片
var numList []int
```
切片是动态结构，只能与 nil 判定相等，**不能互相判定相等**。声明新的切片后，可以使用 `append()` 函数向切片中添加元素。


3. **通过make()生成切片**
使用 `make()` 函数生成的切片一定发生了**内存分配操作**，但给定开始与结束位置（包括切片复位）的切片只是将新的切片结构指向已经分配好的内存区域，设定开始与结束位置，不会发生内存分配操作。

### 3.4 使用append()为切片添加元素

```
var a []int
a = append(a, 1) // 追加1个元素
a = append(a, 1, 2, 3) // 追加多个元素, 手写解包方式
```
在使用 append() 函数为切片动态添加元素时，如果空间不足以容纳足够多的元素，切片就会进行“扩容”，此时新切片的长度会发生改变。
切片在扩容时，容量的扩展规律是按容量的 2 倍数进行扩充，例如 1、2、4、8、16……，代码如下：
```
var numbers []int

for i := 0; i < 10; i++ {
    numbers = append(numbers, i)
    fmt.Printf("len: %d  cap: %d pointer: %p\n", len(numbers), cap(numbers), numbers)
}
```

append也可以在开头添加元素，在切片开头添加元素一般都会导致内存的重新分配，而且会导致已有元素全部被复制 1 次，因此，从切片的开头添加元素的性能要比从尾部追加元素的性能差很多。


### 3.5 Go语言切片复制
```
copy(destSlice, srcSlice []T) int

slice1 := []int{1, 2, 3, 4, 5}
slice2 := []int{5, 4, 3}
copy(slice2, slice1) // 只会复制slice1的前3个元素到slice2中
copy(slice1, slice2) // 只会复制slice2的3个元素到slice1的前3个位置
```


### 3.6 Go语言从切片中删除元素
Go语言并没有对删除切片元素提供专用的语法或者接口，需要使用切片本身的特性来删除元素，根据要删除元素的位置有三种情况，分别是从开头位置删除、从中间位置删除和从尾部删除，其中删除切片尾部的元素速度最快。

从开头位置删除
```
a = []int{1, 2, 3}
a = a[1:] // 删除开头1个元素
a = a[N:] // 删除开头N个元素
```
从尾部删除
```
a = []int{1, 2, 3}
a = a[:len(a)-1] // 删除尾部1个元素
a = a[:len(a)-N] // 删除尾部N个元素
```

### 3.7 Go语言range关键字
```
// 创建一个整型切片，并赋值
slice := []int{10, 20, 30, 40}
// 迭代每一个元素，并显示其值
for index, value := range slice {
    fmt.Printf("Index: %d Value: %d\n", index, value)
}
```
range 返回的是每个元素的**副本**，而不是直接返回对该元素的引用。

### 3.8 Go语言多维切片
Go语言中同样允许使用多维切片，声明一个多维数组的语法格式如下：
```
var sliceName [][]...[]sliceType
```


```
//声明一个二维切片
var slice [][]int
//为二维切片赋值
slice = [][]int{ {10}, {100, 200} }
```

### 3.9 Go语言map（映射）
```
mapCreated := make(map[string]float)
```
等价于
```
mapCreated := map[string]float{}
```

使用函数 `len()` 可以获取 map 中 pair 的数目

可以使用make()，但不能使用 new() 来构造 map，如果错误的使用 new() 分配了一个引用对象，会获得一个空引用的指针，相当于声明了一个未初始化的变量并且取了它的地址

```
mapCreated := new( map[string]float )
mapCreated["key1"] = 4.5   //invalid operation: mapCreated["key1"] (index of type *map[string]float).
```

如果一个 key 要对应多个值怎么办?
例如，当我们要处理 unix 机器上的所有进程，以父进程（pid 为整形）作为 key，所有的子进程（以所有子进程的 pid 组成的切片）作为 value.
通过将 value 定义为 []int 类型或者其他类型的切片，就可以优雅的解决这个问题
```
mp1 := make(map[int][]int)
```

map可以索引一个不存在的值，

### 3.10 Go语言遍历map
```
scene := make(map[string]int)
scene["route"] = 66
scene["brazil"] = 4
scene["china"] = 960
for k, v := range scene {
    fmt.Println(k, v)
}
```

### 3.11 map元素的删除和清空
```
delete(map, 键)
```
Go语言中并没有为 map 提供任何清空所有元素的函数、方法，清空 map 的唯一办法就是重新 make 一个新的 map,之前的如果没有引用会被垃圾回收

### 3.12 Go语言map的多键索引
```
// 查询键
type queryKey struct {
    Name string
    Age  int
}
// 创建查询键到数据的映射
var mapper = make(map[queryKey]*Profile)   // 或者：var mapper = make(map[interface{}]*Profile)
// 构建查询索引
func buildIndex(list []*Profile) {
    // 遍历所有数据
    for _, profile := range list {
        // 构建查询键
        key := queryKey{
            Name: profile.Name,
            Age:  profile.Age,
        }
        // 保存查询键
        mapper[key] = profile
    }
}


// 根据条件查询数据
func queryData(name string, age int) {
    // 根据查询条件构建查询键
    key := queryKey{name, age}
    // 根据键值查询数据
    result, ok := mapper[key]
    // 找到数据打印出来
    if ok {
        fmt.Println(result)
    } else {
        fmt.Println("no found")
    }
}
```

### 3.13 Go语言sync.Map
Go语言中的 map 在并发情况下，只读是线程安全的，同时读写是**线程不安全**的。
sync.Map 和 map 不同，不是以语言原生形态提供，而是在 sync 包下的特殊结构。
sync.Map 不能使用 map 的方式进行取值和设置等操作，而是使用 sync.Map 的方法进行调用，`Store` 表示存储，`Load` 表示获取，`Delete` 表示删除。

### 3.14 Go语言list（列表）
列表是一种非连续的存储容器,底层结构是链表
```
l := list.New()    // 或 l := list.List
l.PushBack("fist")
l.PushFront(67)
// 尾部添加后保存元素句柄
element := l.PushBack("fist")
// 在fist之后添加high
l.InsertAfter("high", element)
// 在fist之前添加noon
l.InsertBefore("noon", element)
```


### 3.15 Go语言nil：空值/零值
在Go语言中，布尔类型的零值（初始值）为 false，数值类型的零值为 0，字符串类型的零值为空字符串`""`，而指针、切片、映射、通道、函数和接口的零值则是 nil。

* nil 标识符是不能比较的
* nil 不是关键字或保留字
* 不同类型 nil 的指针是一样的
* 不同类型的 nil 是不能比较的
* nil 是 map、slice、pointer、channel、func、interface 的零值


### 3.16 Go语言make和new关键字的区别及实现原理
Go语言中 new 和 make 是两个内置函数，主要用来创建并分配类型的内存。
* new 只分配内存
* make 只能用于 slice、map 和 channel 的初始化,如果不初始化，那变量的值将是nil，你不可以对他进行任何操作



## 四.流程控制
### 4.1 Go语言分支结构
```
if err := Connect(); err != nil {
    fmt.Println(err)
    return
}
```
这种写法可以将**返回值与判断**放在一行进行处理，而且返回值的作用范围被限制在 `if、else` 语句组合中。
在编程中，变量的作用范围越小，所造成的问题可能性越小，因此限制变量的作用范围对代码的稳定性有很大的帮助。

### 4.2 Go语言循环结构
Go语言还进一步考虑到**无限循环**的场景，让开发者不用写无聊的 `for(;;){}`和`do{} while(1);`
```
sum := 0
for {
    sum++
    if sum > 100 {
        break
    }
}
```

### 4.3 输出九九乘法表
### 4.4 Go语言键值循环
### 4.5 Go语言switch语句
### 4.6 Go语言goto语句
### 4.7 Go语言break（跳出循环）
Go语言中 break 语句可以结束 for、switch 和 select 的代码块，另外 break 语句还可以在语句后面添加**标签**，表示退出某个标签对应的代码块，标签要求必须定义在对应的 for、switch 和 select 的代码块上。

### 4.8 Go语言continue
### 4.9 示例：聊天机器人
### 4.10 示例：词频统计
### 4.11 示例：缩进排序
### 4.12 示例：二分查找算法
### 4.13 示例：冒泡排序
### 4.14 Go语言分布式id生成器




## 五.Go语言函数

Go 语言支持普通函数、匿名函数和闭包
Go 语言的函数属于“一等公民”（first-class），也就是说：
* 函数本身可以作为值进行传递。
* 支持匿名函数和闭包（closure）。
* 函数可以作为一个类型去实现接口。

### 5.1 Go语言函数声明
因为Go语言是编译型语言，所以函数编写的顺序是无关紧要的，鉴于可读性的需求，最好把 main() 函数写在文件的前面，其他函数按照一定逻辑顺序进行编写
```
func hypot(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
}
```

在函数调用时，Go语言**没有**默认参数值

在函数中，实参通过值传递的方式进行传递，因此函数的形参是实参的拷贝，对形参进行修改不会影响实参
但是，如果实参包括**引用类型**，如指针、slice(切片)、map、function、channel 等类型，实参可能会由于函数的间接引用被修改。

**带有变量名的返回值**
```
func namedRetValues() (a, b int) {      //类似函数参数的东西
    a = 1
    b = 2
    return
}
```

### 5.2 示例：将秒转换为具体的时间

### 5.3 示例：函数中的参数传递效果测试
Go语言中传入与返回参数在调用和返回时都使用值传递，这里需要注意的是指针、切片和 map 等引用型对象在参数传递中不会发生复制，而是**将指针进行复制**，类似于创建一次引用。


### 5.4 Go语言函数变量

### 5.5 Go语言字符串的链式处理
```
// 字符串处理函数，传入字符串切片和处理链
func StringProccess(list []string, chain []func(string) string) {
    // 遍历每一个字符串
    for index, str := range list {
        // 第一个需要处理的字符串
        result := str
        // 遍历每一个处理链
        for _, proc := range chain {
            // 输入一个字符串进行处理，返回数据作为下一个处理链的输入。
            result = proc(result)
        }
        // 将结果放回切片
        list[index] = result
    }
}
// 自定义的移除前缀的处理函数
func removePrefix(str string) string {
    return strings.TrimPrefix(str, "go")
}
func main() {
    // 待处理的字符串列表
    list := []string{
        "go scanner",
        "go parser",
        "go compiler",
        "go printer",
        "go formater",
    }
    // 处理函数链
    chain := []func(string) string{
        removePrefix,
        strings.TrimSpace,
        strings.ToUpper,
    }
    // 处理字符串
    StringProccess(list, chain)
    // 输出处理好的字符串
    for _, str := range list {
        fmt.Println(str)
    }
}
```

链式处理器是一种常见的编程设计，Netty 是使用 Java 语言编写的一款异步事件驱动的网络应用程序框架，支持快速开发可维护的高性能的面向协议的服务器和客户端，Netty 中就有类似的链式处理器的设计。

Netty 可以使用类似的处理链对封包进行收发编码及处理，Netty 的开发者可以分为 3 种：第一种是 Netty 底层开发者；第二种是每个处理环节的开发者；第三种是业务实现者。在实际开发环节中，后两种开发者往往是同一批开发者，链式处理的开发思想将数据和操作拆分、解耦，让开发者可以根据自己的技术优势和需求，进行系统开发，同时将自己的开发成果共享给其他的开发者。

### 5.6 Go语言匿名函数
```
// 将匿名函数体保存到f()中
f := func(data int) {
    fmt.Println("hello", data)
}
// 使用f()调用
f(100)
```


### 5.7 Go语言函数类型实现接口
函数和其他类型一样都属于“一等公民”，其他类型能够实现接口，函数也可以
```
// 调用器接口
type Invoker interface {
    // 需要实现一个Call方法
    Call(interface{})
}
// 结构体类型
type Struct struct {
}
// 实现Invoker的Call
func (s *Struct) Call(p interface{}) {
    fmt.Println("from struct", p)
}

// 函数定义为类型,然后实现接口
type FuncCaller func(interface{})
// 实现Invoker的Call
func (f FuncCaller) Call(p interface{}) {
    // 调用f函数本体
    f(p)
}

func main() {
    // 声明接口变量
    var invoker Invoker
    // 实例化结构体
    s := new(Struct)
    // 将实例化的结构体赋值到接口
    invoker = s       // 类似面向对象中的多态的用法
    // 使用接口调用实例化结构体的方法Struct.Call
    invoker.Call("hello")


    // 将匿名函数转为FuncCaller类型，再赋值给接口
    invoker = FuncCaller(func(v interface{}) {       // 类似面向对象中的多态的用法
        fmt.Println("from function", v)
    })
    // 使用接口调用FuncCaller.Call，内部会调用函数本体
    invoker.Call("hello")
}
```

### 5.8 Go语言闭包（Closure）
函数 + 引用环境 = 闭包
函数是编译期静态的概念，而闭包是运行期动态的概念。
闭包对环境中变量的引用过程也可以被称为“捕获”，在 C++11 标准中，捕获有两种类型，分别是引用和复制，可以改变引用的原值叫做“引用捕获”，捕获的过程值被复制到闭包中使用叫做“复制捕获”。
在 Lua 语言中，将被捕获的变量起了一个名字叫做 Upvalue，因为捕获过程总是对闭包上方定义过的自由变量进行引用。
C++中为闭包创建了一个类，而被捕获的变量在编译时放到类中的成员中，闭包在访问被捕获的变量时，实际上访问的是闭包隐藏类的成员。

闭包例子：
```
// 准备一个字符串
str := "hello world"
// 创建一个匿名函数
foo := func() {
   
    // 匿名函数中访问str
    str = "hello dude"
}
// 调用匿名函数，执行闭包，此时 str 发生修改，变为 hello dude。
foo()        
```


### 5.9 Go语言可变参数
```
func myfunc(args ...int) {
    for _, arg := range args {
        fmt.Println(arg)
    }
}
```
形如`...type`格式的类型只能作为函数的参数类型存在，并且必须是最后一个参数，它是一个语法糖（syntactic sugar），即这种语法对语言的功能并没有影响，但是更方便程序员使用，通常来说，使用语法糖能够增加程序的可读性，从而减少程序出错的可能。  

从内部实现机理上来说，类型`...type`本质上是一个数组切片，也就是`[]type`，这也是为什么上面的参数 args 可以用 for 循环来获得每个传入的参数。
假如没有`...type`这样的语法糖，开发者将不得不这么写：
```
func myfunc2(args []int) {
    for _, arg := range args {
        fmt.Println(arg)
    }
}

//调用， 主要是调用时看着比较麻烦
myfunc2([]int{1, 3, 7, 13})
```

如果你希望传任意类型，可以指定类型为 interface{}，下面是Go语言标准库中 fmt.Printf() 的函数原型：
```
func Printf(format string, args ...interface{}) {
    // ...
}

// 对interface{}参数进行处理
func MyPrintf(args ...interface{}) {
    for _, arg := range args {
        switch arg.(type) {
            case int:
                fmt.Println(arg, "is an int value.")
            case string:
                fmt.Println(arg, "is a string value.")
            case int64:
                fmt.Println(arg, "is an int64 value.")
            default:
                fmt.Println(arg, "is an unknown type.")
        }
    }
}
```


### 5.10 Go语言defer（延迟执行语句）
代码的延迟顺序与最终的执行顺序是反向的。
延迟调用是在 defer 所在函数结束时进行，函数结束可以是正常返回时，也可以是发生宕机时。

处理锁的情况
```
var (
    // 一个演示用的映射
    valueByKey      = make(map[string]int)
    // 保证使用映射时的并发安全的互斥锁
    valueByKeyGuard sync.Mutex
)
// 根据键读取值
func readValue(key string) int {
    // 对共享资源加锁
    valueByKeyGuard.Lock()
    // 取值
    v := valueByKey[key]
    // 对共享资源解锁
    valueByKeyGuard.Unlock()
    // 返回值
    return v
}

func readValue(key string) int {
    valueByKeyGuard.Lock()
    // defer后面的语句不会马上调用, 而是延迟到函数结束时调用
    defer valueByKeyGuard.Unlock()
    return valueByKey[key]
}
```

处理资源释放的情况
```
// 根据文件名查询其大小
func fileSize(filename string) int64 {
    // 根据文件名打开文件, 返回文件句柄和错误
    f, err := os.Open(filename)
    // 如果打开时发生错误, 返回文件大小为0
    if err != nil {
        return 0
    }
    // 取文件状态信息
    info, err := f.Stat()
   
    // 如果获取信息时发生错误, 关闭文件并返回文件大小为0
    if err != nil {
        f.Close()
        return 0
    }
    // 取文件大小
    size := info.Size()
    // 关闭文件
    f.Close()
   
    // 返回文件大小
    return size
}

func fileSize(filename string) int64 {
    f, err := os.Open(filename)
    if err != nil {
        return 0
    }
    // 延迟调用Close, 此时Close不会被调用
    defer f.Close()
    info, err := f.Stat()
    if err != nil {
        // defer机制触发, 调用Close关闭文件
        return 0
    }
    size := info.Size()
    // defer机制触发, 调用Close关闭文件
    return size
}
```


### 5.11 Go语言递归函数
### 5.12 Go语言处理运行时错误
Go语言的错误处理思想及设计包含以下特征：

* 一个可能造成错误的函数，需要返回值中返回一个错误接口（error），如果调用是成功的，错误接口将返回 nil，否则返回错误。
* 在函数调用后需要检查错误，如果发生错误，则进行必要的错误处理。  

Go语言没有类似Java 或 .NET 中的异常处理机制，虽然可以使用 defer、panic、recover 模拟，但官方并不主张这样做
Go语言的设计者认为其他语言的异常机制已被过度使用，上层逻辑需要为函数发生的异常付出太多的资源，
同时，如果函数使用者觉得错误处理很麻烦而忽略错误，那么程序将在不可预知的时刻崩溃。

### 5.13 Go语言宕机（panic）
例子
```
func MustCompile(str string) *Regexp {
    regexp, error := Compile(str)
    if error != nil {
        panic(`regexp: Compile(` + quote(str) + `): ` + error.Error())
    }
    return regexp
}
```

### 5.14 Go语言宕机恢复（recover）
Recover 是一个Go语言的内建函数，可以让进入宕机流程中的 goroutine 恢复过来，recover 仅在延迟函数 defer 中有效

```
// 保护方式允许一个函数
func ProtectRun(entry func()) {
    // 延迟处理的函数
    defer func() {
        // 发生宕机时，获取panic传递的上下文并打印
        err := recover()
        switch err.(type) {
        case runtime.Error: // 运行时错误
            fmt.Println("runtime error:", err)
        default: // 非运行时错误
            fmt.Println("error:", err)
        }
    }()
    entry()
}
```

panic 和 recover 的组合有如下特性：
* 有 panic 没 recover，程序宕机。
* 有 panic 也有 recover，程序不会宕机，执行完对应的 defer 后，从宕机点退出当前函数后继续执行。

### 5.15 Go语言计算函数执行时间

### 5.16 示例：通过内存缓存来提升性能

### 5.17 Go语言哈希函数

### 5.18 Go语言函数的底层实现
Go 实现闭包是通过返回一个如下的结构来实现的
```
type Closure struct {
    F uintptr        // F 是返回的匿名函数指针
    env *Type        // env 是对外部环境变量的引用集合
}
```


### 5.19 Go语言Test功能测试函数
Go语言自带了 testing 测试包，可以进行自动化的单元测试，输出结果验证，并且可以测试性能。
Go语言的 testing 包提供了三种测试方式，分别是单元（功能）测试、性能（压力）测试和覆盖率测试。
* 要开始一个单元测试，需要准备一个 go 源码文件，在命名文件时文件名必须以`_test.go`结尾
* 测试函数的名称要以Test或Benchmark开头，后面可以跟任意字母组成的字符串，但第一个字母必须大写，例如 TestAbc()，一个测试用例文件中可以包含多个测试函数；
* 单元测试则以`(t *testing.T)`作为参数，性能测试以`(t *testing.B)`做为参数；
* 测试用例文件使用`go test `命令来执行，源码中不需要 main() 函数作为入口，所有以`_test.go`结尾的源码文件内以`Test`开头的函数都会自动执行。


## 六.Go语言结构体
Go 语言中没有“类”的概念，也不支持“类”的继承等面向对象的概念。

### 6.1 Go语言结构体定义
结构体的定义只是一种内存布局的描述
```
type Point struct {
    X int
    Y int
}
```

### 6.2 Go语言实例化结构体
```
type Player struct{
    Name string
    HealthPoint int
    MagicPoint int
}

var p1 Player
p1.Name = "name1"

tank := new(Player)
tank.Name = "Canon"
tank.HealthPoint = 300
```
在Go语言中，访问结构体指针的成员变量时可以继续使用`.`，这是因为Go语言为了方便开发者访问结构体指针的成员变量，使用了语法糖（Syntactic sugar）技术，将 `ins.Name` 形式转换为 `(*ins).Name`。

在Go语言中，对结构体进行`&`取地址操作时，视为对该类型进行一次`new`的实例化操作，取地址格式如下：
`ins := &T{}`
其中：
* T 表示结构体类型。
* ins 为结构体的实例，类型为 `*T`，是指针类型。

### 6.3 初始化结构体的成员变量
```
type People struct {
    name  string
    child *People
}
relation := &People{
    name: "爷爷",
    child: &People{
        name: "爸爸",
        child: &People{
                name: "我",
        },
    },
}
```

### 6.4 Go语言构造函数
Go语言的类型或结构体没有构造函数的功能，但是我们可以使用结构体初始化的过程来模拟实现构造函数。
```
type Cat struct {
    Color string
    Name  string
}
func NewCatByName(name string) *Cat {
    return &Cat{
        Name: name,
    }
}
func NewCatByColor(color string) *Cat {
    return &Cat{
        Color: color,
    }
}
```

带有父子关系的结构体的构造和初始化——模拟父级构造调用
```
type Cat struct {
    Color string
    Name  string
}
type BlackCat struct {
    Cat  // 嵌入Cat, 类似于派生
}
// “构造基类”
func NewCat(name string) *Cat {
    return &Cat{
        Name: name,
    }
}
// “构造子类”
func NewBlackCat(color string) *BlackCat {
    cat := &BlackCat{}
    cat.Color = color
    return cat
}
```
这个例子中，Cat 结构体类似于面向对象中的“基类”，BlackCat 嵌入 Cat 结构体，类似于面向对象中的“派生”，实例化时，BlackCat 中的 Cat 也会一并被实例化。
总之，Go语言中没有提供构造函数相关的特殊机制，用户根据自己的需求，将参数使用函数传递到结构体构造参数中即可完成构造函数的任务。

### 6.5 Go语言方法和接收器
在Go语言中“方法”的概念与其他语言一致，只是Go语言建立的**接收器**强调方法的**作用对象是接收器，也就是类实例，而函数没有作用对象**。

**为结构体添加方法**

面向过程实现方法
```
type Bag struct {
    items []int
}
// 将一个物品放入背包的过程
func Insert(b *Bag, itemid int) {
    b.items = append(b.items, itemid)
}
func main() {
    bag := new(Bag)
    Insert(bag, 1001)
}
```

接收器的方法
```
type Bag struct {
    items []int
}
func (b *Bag) Insert(itemid int) {        //(b*Bag) 表示接收器，即 Insert 作用的对象实例
    b.items = append(b.items, itemid)
}
func main() {
    b := new(Bag)
    b.Insert(1001)        //用面向对象的用法来调用
}
```

接收器根据接收器的类型可以分为指**针接收器**、**非指针接收器**，两种接收器在使用时会产生不同的效果，根据效果的不同，两种接收器会被用于不同性能和功能要求的代码中。

指针类型接收器只影响调用函数的引用传递还是值传递，只有类型一样值类型和指针类型对针接收器和非指针接收器的方法都能调用

1) 理解指针类型的接收器
指针类型的接收器由一个结构体的指针组成，更接近于面向对象中的 this 或者 self。

2) 理解非指针类型的接收器
当方法作用于非指针接收器时，Go语言会在代码运行时将接收器的值**复制一份**，在非指针接收器的方法中可以获取接收器的成员值，但修改后无效。

3) 指针和非指针接收器的使用
在计算机中，小对象由于值复制时的速度较快，所以适合使用非指针接收器，大对象因为复制性能较低，适合使用指针接收器

### 6.6 为任意类型添加方法
Go语言可以对任何类型添加方法，给一种类型添加方法就像给结构体添加方法一样，因为结构体也是一种类型。

在Go语言中，使用 type 关键字可以定义出新的自定义类型，之后就可以为自定义类型添加各种方法了
```
// 将int定义为MyInt类型
type MyInt int
// 为MyInt添加IsZero()方法
func (m MyInt) IsZero() bool {
    return m == 0
}
```

### 6.7 示例：使用事件系统实现事件的响应和处理
Go语言可以将类型的方法与普通函数视为一个概念，从而简化方法和函数混合作为回调类型时的复杂性。
无论是普通函数还是结构体的方法，只要它们的**签名一致**，与它们签名一致的函数变量就可以保存普通函数或是结构体方法。

```
package main
// 实例化一个通过字符串映射函数切片的map
var eventByName = make(map[string][]func(interface{}))
// 注册事件，提供事件名和回调函数
func RegisterEvent(name string, callback func(interface{})) {
    // 通过名字查找事件列表
    list := eventByName[name]
    // 在列表切片中添加函数
    list = append(list, callback)
    // 将修改的事件列表切片保存回去
    eventByName[name] = list
}
// 调用事件
func CallEvent(name string, param interface{}) {
    // 通过名字找到事件列表
    list := eventByName[name]
    // 遍历这个事件的所有回调
    for _, callback := range list {
        // 传入参数调用回调
        callback(param)
    }
}
```

### 6.8 类型内嵌和结构体内嵌
```
type A struct {
    ax, ay int
}
type B struct {
    A
    bx, by float32
}
func main() {
    b := B{A{1, 2}, 3.0, 4.0}
    fmt.Println(b.ax, b.ay, b.bx, b.by)
    fmt.Println(b.A)
}
```
结构内嵌特性:
1.内嵌的结构体可以直接访问其成员变量,即使多层嵌入结构也可以
2.内嵌结构体的字段名是它的类型名，内嵌结构体字段仍然可以使用详细的字段进行一层层访问
3.一个结构体只能嵌入一个同类型的成员，无须担心结构体重名和错误赋值的情况，编译器在发现可能的赋值歧义时会报错。

### 6.9 结构体内嵌模拟类的继承
成员和方法都会继承
```
// 可飞行的
type Flying struct{}
func (f *Flying) Fly() {
    fmt.Println("can fly")
}

// 可行走的
type Walkable struct{}
func (f *Walkable) Walk() {
    fmt.Println("can calk")
}

// 人类
type Human struct {
    Walkable // 人类能行走
}
// 鸟类
type Bird struct {
    Walkable // 鸟类能行走
    Flying   // 鸟类能飞行
}
func main() {
    // 实例化鸟类
    b := new(Bird)
    b.Fly()
    b.Walk()
    // 实例化人类
    h := new(Human)
    h.Walk()
}
```

### 6.10 初始化内嵌结构体
结构体内嵌初始化时，将结构体内嵌的类型作为字段名像普通结构体一样进行初始化
```
// 车轮
type Wheel struct {
    Size int
}
// 引擎
type Engine struct {
    Power int    // 功率
    Type  string // 类型
}
// 车
type Car struct {
    Wheel
    Engine
}
func main() {
    c := Car{
        // 初始化轮子
        Wheel: Wheel{
            Size: 18,
        },
        // 初始化引擎
        Engine: Engine{
            Type:  "1.4T",
            Power: 143,
        },
    }
    fmt.Printf("%+v\n", c)

	// 也可以这样,这样更清晰一些
	var car Car
	car.Size = 18
	car.Power = 143
	car.Type = "1.4T"

}
```

### 6.11 内嵌结构体成员名字冲突
```
type A struct {
    a int
}
type B struct {
    a int
}
type C struct {
    A
    B
}
func main() {
    c := &C{}
    c.a = 1    // 有歧义，编译的时候就会报错。正确写法：c.A.a = 1
    fmt.Println(c)
}
```


### 6.12 示例：使用匿名结构体解析JSON数据

### 6.13 Go语言垃圾回收和SetFinalizer
Go语言自带垃圾回收机制（GC），GC 是自动进行的，如果要手动进行 GC，可以使用 runtime.GC() 函数，显式的执行 GC。显式的进行 GC 只在某些特殊的情况下才有用，比如当内存资源不足时调用 runtime.GC() ，这样会立即释放一大片内存，但是会造成程序短时间的性能下降。

finalizer（终止器）是与对象关联的一个函数，通过 runtime.SetFinalizer 来设置，如果某个对象定义了 finalizer，当它被 GC 时候，这个 finalizer 就会被调用，以完成一些特定的任务，例如发信号或者写日志等。
SetFinalizer 函数可以将 x 的终止器设置为 f，当垃圾收集器发现 x 不能再直接或间接访问时，它会清理 x 并调用 f(x)。
SetFinalizer定义：
```
func SetFinalizer(x, f interface{})
```

x 的终止器会在 x 不能直接或间接访问后的任意时间被调用执行，不保证终止器会在程序退出前执行，因此一般终止器只用于在长期运行的程序中释放关联到某对象的**非内存资源**。例如，当一个程序丢弃一个 os.File 对象时没有调用其 Close 方法，该 os.File 对象可以使用终止器去关闭对应的操作系统文件描述符。

### 6.14 示例：将结构体数据保存为JSON格式数据
```
import (
    "encoding/json"
    "fmt"
)

func main() {
    // 声明技能结构体
    type Skill struct {
        Name  string
        Level int
    }
    // 声明角色结构体
    type Actor struct {
        Name   string
        Age    int
        Skills []Skill
    }
    // 填充基本角色数据
    a := Actor{
        Name: "cow boy",
        Age:  37,
        Skills: []Skill{
            {Name: "Roll and roll", Level: 1},
            {Name: "Flash your dog eye", Level: 2},
            {Name: "Time to have Lunch", Level: 3},
        },
    }
    result, err := json.Marshal(a)
    if err != nil {
        fmt.Println(err)
    }
    jsonStringData := string(result)
    fmt.Println(jsonStringData)
}
```

### 6.15 Go语言链表操作
```
type Node struct {
    data int
    next *Node
}
func Shownode(p *Node) { //遍历
    for p != nil {
        fmt.Println(*p)
        p = p.next //移动指针
    }
}
func main() {
    var head = new(Node)
    head.data = 1
    var node1 = new(Node)
    node1.data = 2
    head.next = node1
    var node2 = new(Node)
    node2.data = 3
    node1.next = node2
    Shownode(head)
}
```


### 6.16 Go语言数据I/O对象及操作
Go语言标准库的 bufio 包中，实现了对数据 I/O 接口的缓冲功能。这些功能封装于接口 io.ReadWriter、io.Reader 和 io.Writer 中，并对应创建了 ReadWriter、Reader 或 Writer 对象，在提供缓冲的同时实现了一些文本基本 I/O 操作功能。

操作Reader对象
```
func main() {
    data := []byte("C语言中文网")
    rd := bytes.NewReader(data)
    r := bufio.NewReader(rd)
    var buf [128]byte
    n, err := r.Read(buf[:])
    fmt.Println(string(buf[:n]), n, err)
}
```

操作Writer对象
```
func main() {
    wr := bytes.NewBuffer(nil)
    w := bufio.NewWriter(wr)
    p := []byte("C语言中文网")
    fmt.Println("写入前未使用的缓冲区为：", w.Available())
    w.Write(p)
    fmt.Printf("写入%q后，未使用的缓冲区为：%d\n", string(p), w.Available())
}
结果
// 写入前未使用的缓冲区为： 4096
// 写入"C语言中文网"后，未使用的缓冲区为：4080
```

## 七.语言接口

### 7.1 Go语言接口声明（定义）
Go语言不是一种 “传统” 的面向对象编程语言：它里面没有类和继承的概念。
Go语言的**每个接口中的方法数量不会很多**。Go语言希望**通过一个接口精准描述它自己的功能**，而通过多个接口的**嵌入和组合**的方式**将简单的接口扩展为复杂的接口**。

接口声明的格式
```
type 接口类型名 interface{
    方法名1( 参数列表1 ) 返回值列表1
    方法名2( 参数列表2 ) 返回值列表2
    …
}
```


### 7.2 Go语言实现接口的条件
如果一个任意类型 T 的方法集为一个接口类型的方法集的超集，则我们说类型 T 实现了此接口类型。T 可以是一个**非接口类型，也可以是一个接口类型**。

实现关系在Go语言中是**隐式**的。两个类型之间的实现关系不需要在代码中显式地表示出来。Go语言中没有类似于 implements 的关键字。
Go编译器将自动在需要的时候检查两个类型之间的实现关系。
Go语言的接口实现是隐式的，无须让实现接口的类型写出实现了哪些接口。这个设计被称为**非侵入式设计**。


接口定义后，需要实现接口，调用方才能正确编译通过并使用接口。接口的实现需要遵循两条规则才能让接口可用。
1.接口的方法与实现接口的类型方法格式一致
2.接口中所有方法均被实现


### 7.3 Go语言类型与接口的关系
* 一个类型可以实现多个接口
* 多个类型可以实现相同的接口


### 7.4 接口的nil判断
nil 在 Go语言中只能被赋值给指针和接口。
接口在底层的实现有两个部分：type 和 data。在源码中，显式地将 nil 赋值给接口时，接口的 type 和 data 都将为 nil。此时，接口与 nil 值判断是相等的。
但如果将一个**带有类型的nil**赋值给接口时，只有 data 为 nil，而 type 不为 nil，此时，接口与 nil 判断将不相等。
```
package main

import "fmt"

// 定义一个结构体
type MyImplement struct{}

// 实现fmt.Stringer的String方法
func (m *MyImplement) String() string {
	return "hi"
}

// 在函数中返回fmt.Stringer接口
func GetStringer() fmt.Stringer {
	// 赋nil
	var s *MyImplement = nil
	// 返回变量
	return s          //返回是s复制给了fmt.Stringer接口，最终的返回值不是nil
}
func main() {
	// 判断返回值是否为nil
	if GetStringer() == nil {
		fmt.Println("GetStringer() == nil")
	} else {
		fmt.Println("GetStringer() != nil")    // 会执行此处代码
	}
}

//正确做法
func GetStringer() fmt.Stringer {
    var s *MyImplement = nil
    if s == nil {
        return nil
    }
    return s
}
```

### 7.5 Go语言类型断言
```
var x interface{}
x = 10
value, ok := x.(int)
fmt.Print(value, ",", ok)    //10,true


var x interface{}
x = "Hello"
value := x.(int)
fmt.Println(value)  //panic: interface conversion: interface {} is string, not int


func getType(a interface{}) {
    switch a.(type) {
    case int:
        fmt.Println("the type of a is int")
    case string:
        fmt.Println("the type of a is string")
    case float64:
        fmt.Println("the type of a is float")
    default:
        fmt.Println("unknown type")
    }
}
```


### 7.6 示例：Go语言实现日志系统



### 7.7 Go语言排序
普通类型排序
```
StringSlice	sort.Strings(a [] string)
sort.Ints(a []int)
sort.Float64s(a []float64)
```

空接口类型排序
```
sort.Slice(slice interface{}, less func(i, j int) bool)
```


### 7.8 Go语言接口的嵌套组合
在Go语言中，不仅结构体与**结构体**之间可以嵌套，接口与接口间也可以通过嵌套创造出新的接口。

```
//Go语言的 io 包中定义了写入器（Writer）、关闭器（Closer）和写入关闭器（WriteCloser）3 个接口
type Writer interface {
    Write(p []byte) (n int, err error)
}
type Closer interface {
    Close() error
}
type WriteCloser interface {    
    Writer          //接口的组合
    Closer
}

//======实现======
// 声明一个设备结构
type device struct {
}
// 实现io.Writer的Write()方法
func (d *device) Write(p []byte) (n int, err error) {
    return 0, nil
}
// 实现io.Closer的Close()方法
func (d *device) Close() error {
    return nil
}
func main() {
    // 声明写入关闭器, 并赋予device的实例
    var wc io.WriteCloser = new(device)
    // 写入数据
    wc.Write(nil)
    // 关闭设备
    wc.Close()
    // 声明写入器, 并赋予device的新实例
    var writeOnly io.Writer = new(device)
    // 写入数据
    writeOnly.Write(nil)
}
```


### 7.9 Go语言接口和类型之间的转换

#### 类型断言

```
t := i.(T)   //i 代表接口变量，T 代表转换的目标类型，t 代表转换后的变量。

var w io.Writer
w = os.Stdout
f := w.(*os.File) // 成功: f == os.Stdout
c := w.(*bytes.Buffer) // 死机：接口保存*os.file，而不是*bytes.buffer
```


#### 将接口转换为其他接口
实现某个接口的类型同时实现了另外一个接口，此时可以在两个接口间转换。
```
// 定义飞行动物接口
type Flyer interface {
    Fly()
}
// 定义行走动物接口
type Walker interface {
    Walk()
}
// 定义鸟类
type bird struct {
}
// 实现飞行动物接口
func (b *bird) Fly() {
    fmt.Println("bird: fly")
}
// 为鸟添加Walk()方法, 实现行走动物接口
func (b *bird) Walk() {
    fmt.Println("bird: walk")
}
// 定义猪
type pig struct {
}
// 为猪添加Walk()方法, 实现行走动物接口
func (p *pig) Walk() {
    fmt.Println("pig: walk")
}
func main() {
// 创建动物的名字到实例的映射
    animals := map[string]interface{}{
        "bird": new(bird),
        "pig":  new(pig),
    }
    // 遍历映射
    for name, obj := range animals {
        // 判断对象是否为飞行动物
        f, isFlyer := obj.(Flyer)         //obj为接口类型，接口转换为其他接口
        // 判断对象是否为行走动物
        w, isWalker := obj.(Walker)
        fmt.Printf("name: %s isFlyer: %v isWalker: %v\n", name, isFlyer, isWalker)
        // 如果是飞行动物则调用飞行动物接口
        if isFlyer {
            f.Fly()
        }
        // 如果是行走动物则调用行走动物接口
        if isWalker {
            w.Walk()
        }
    }
}
```


### 7.10 Go语言空接口类型
空接口是接口类型的特殊形式，空接口没有任何方法，因此任何类型都无须实现空接口。
从实现的角度看，任何值都满足这个接口的需求。因此空接口类型可以保存任何值，也可以从空接口中取出原值。
空接口的内部实现保存了对象的**类型**和**指针**。使用空接口保存一个数据的过程会比直接用数据对应类型的变量保存**稍慢**。
因此在开发中，应在需要的地方使用空接口，而不是在所有地方使用空接口。

```
var any interface{}    // 声明 any 为 interface{} 类型的变量。
any = 1                
fmt.Println(any)       // 打印 any 的值，提供给 fmt.Println 的类型依然是 interface{}。
any = "hello"
fmt.Println(any)
```

从空接口获取值
```
// 声明a变量, 类型int, 初始值为1
var a int = 1
// 声明i变量, 类型为interface{}, 初始值为a, 此时i的值变为1
var i interface{} = a
// 声明b变量, 尝试赋值i
var b int = i     //error cannot use i (type interface {}) as type int in assignment: need type assertion
var b int = i.(int)   //得进行类型断言
```

空接口比较
```
var a interface{} = 100
var b interface{} = 100
fmt.Println(a == b)     //true

var a interface{} = 100
var b interface{} = "100"
fmt.Println(a == b)     //false


var c interface{} = []int{10}
var d interface{} = []int{10}
fmt.Println(c == d)   //崩溃，因为编译器碰到两个切片的比较会懵逼
```

类型的可比较性
```
map	           宕机错误，不可比较
切片（[]T）	    宕机错误，不可比较
通道（channel）	可比较，必须由同一个 make 生成，也就是同一个通道才会是 true，否则为 false
数组（[容量]T）	 可比较，编译期知道两个数组是否一致
结构体	        可比较，可以逐个比较结构体的值
函数	        可比较
```

### 7.11 示例：使用空接口实现可以保存任意值的字典
空接口可以保存任何类型这个特性可以方便地用于容器的设计。

```
// 字典结构
type Dictionary struct {
    data map[interface{}]interface{} // 键值都为interface{}类型
}
// 根据键获取值
func (d *Dictionary) Get(key interface{}) interface{} {
    return d.data[key]
}
// 设置键值
func (d *Dictionary) Set(key interface{}, value interface{}) {
    d.data[key] = value
}
// 遍历所有的键值，如果回调返回值为false，停止遍历
func (d *Dictionary) Visit(callback func(k, v interface{}) bool) {
    if callback == nil {
        return
    }
    for k, v := range d.data {
        if !callback(k, v) {
            return
        }
    }
}
// 清空所有的数据
func (d *Dictionary) Clear() {
    d.data = make(map[interface{}]interface{})
}
// 创建一个字典
func NewDictionary() *Dictionary {
    d := &Dictionary{}
    // 初始化map, 这一步省略是否可以？？？
    d.Clear()
    return d
}
```


### 7.12 Go语言类型分支
```
func printType(v interface{}) {
    switch v.(type) {
    case int:
        fmt.Println(v, "is int")
    case string:
        fmt.Println(v, "is string")
    case bool:
        fmt.Println(v, "is bool")
    default:                            //变量不是所有case中列举的类型时的处理
        fmt.Println(v, "is noknow")
    }
}
```

```
// 具备刷脸特性的接口
type CantainCanUseFaceID interface {
    CanUseFaceID()
}
// 具备被偷特性的接口
type ContainStolen interface {
    Stolen()
}

// 电子支付方式
type Alipay struct {
}
// 为Alipay添加CanUseFaceID()方法, 表示电子支付方式支持刷脸
func (a *Alipay) CanUseFaceID() {
}
// 现金支付方式
type Cash struct {
}
// 为Cash添加Stolen()方法, 表示现金支付方式会出现偷窃情况
func (a *Cash) Stolen() {
}

// 打印支付方式具备的特点
func print(payMethod interface{}) {
    switch payMethod.(type) {
    case CantainCanUseFaceID:  // 可以刷脸
        fmt.Printf("%T can use faceid\n", payMethod)
    case ContainStolen:  // 可能被偷
        fmt.Printf("%T may be stolen\n", payMethod)
    }
}
```

### 7.13 Go语言error接口
开发中遇到的分为异常与错误
在C语言中通过返回 -1 或者 NULL 之类的信息来表示错误，但是对于使用者来说，如果不查看相应的 API 说明文档，根本搞不清楚这个返回值究竟代表什么意思
针对这样的情况，Go语言中引入 error 接口类型作为错误处理的标准模式，如果函数要返回错误，则返回值类型列表中肯定包含 error。error 处理过程类似于C语言中的错误码，可逐层返回，直到被处理。
```
type error interface {
    Error() string
}
```
error 接口有一个签名为 Error() string 的方法，所有实现该接口的类型都可以当作一个错误类型。
Error() 方法给出了错误的描述，在使用 fmt.Println 打印错误时，会在内部调用 Error() string 方法来得到该错误的描述。
一般情况下，如果函数需要返回错误，就将 error 作为多个返回值中的最后一个（但这并非是强制要求）。
```
func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return -1, errors.New("math: square root of negative number")
    }
    return math.Sqrt(f), nil
}

//自定义错误类型，更高级的当然也可以把出错时的堆栈信息打印出来
type dualError struct {
    Num     float64
    problem string
}
func (e dualError) Error() string {
    return fmt.Sprintf("Wrong!!!,because \"%f\" is a negative number", e.Num)
}

func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return -1, dualError{Num: f}
    }
    return math.Sqrt(f), nil
}
```


### 7.14 Go语言接口内部实现
接口变量必须初始化才有意义，没有初始化的接口变量的默认值是 nil，没有任何意义。
具体类型实例传递给接口称为**接口的实例化**。在接口的实例化的过程中，编译器通过特定的数据结构描述这个过程。

#### 非空接口的内部数据结构
非空接口初始化的过程就是初始化一个 `iface` 类型的结构
```
//src/runtime/runtime2.go
type iface struct {
    tab *itab                //itab 存放类型及方法指针信息,存放接口**自身类型**和**绑定的实例类型**及实例相关的函数指针
    data unsafe.Pointer      //指向具体的实例数据，如果传递给接口的是值类型，则 data 指向的是实例的副本；如果传递给接口的是指针类型，则 data 指向指针的副本。
}

type itab struct {
    inter *interfacetype      //接口自身的静态类型
    _type *_type              //_type 就是接口存放的具体实例的类型（动态类型）
    hash uint32               // hash 存放具体类型的 Hash 值, copy of _type.hash. Used for type switches.
    _   [4]byte
    fun [1]uintptr            
}
```
itab 有 5 个字段：
* inner：是指向接口类型元信息的指针。
* _type：是指向接口存放的具体类型元信息的指针，iface 里的 data 指针指向的是该类型的值。一个是类型信息，另一个是类型的值。
* hash：是具体类型的 Hash 值，_type 里面也有 hash，这里冗余存放主要是为了接口断言或类型查询时快速访问。
* fun：是一个函数指针，可以理解为 C++ 对象模型里面的虚拟函数指针，这里虽然只有一个元素，实际上指针数组的大小是可变的，编译器负责填充，运行时使用底层指针进行访问，不会受 struct 类型越界检查的约束，这些指针指向的是具体类型的方法。

itab 这个数据结构是非空接口实现动态调用的基础，itab 的信息被编译器和链接器保存了下来，存放在可执行文件的只读存储段（.rodata）中。itab 存放在静态分配的存储空间中，不受 GC 的限制，其内存不会被回收。


```
//描述接口的类型
type interfacetype struct {
    typ _type       //类型通用部分
    pkgpath name    //接口所属包的名字信息， name 内存放的不仅有名称，还有描述信息
    mhdr []imethod  //接口的方法
}
//接口方法元信息
type imethod struct {
    name nameOff //方法名在编译后的 section 里面的偏移量
    ityp typeOff //方法类型在编译后的 section 里面的偏移量
}
```

Go语言是一种强类型的语言，编译器在编译时会做严格的类型校验。所以 Go 必然为每种类型**维护一个类型的元信息**，这个元信息在运行和反射时都会用到，Go语言的类型元信息的通用结构是 _type（代码位于 src/runtime/type.go）， 其他类型都是以 _type 为内嵌宇段封装而成的结构体。
```
//src/runtime/type.go
type type struct {
    size uintptr     // 大小
    ptrdata uintptr  //size of memory prefix holding all pointers
    hash uint32      //类型Hash
    tflag tflag      //类型的特征标记
    align uint8      //_type 作为整体交量存放时的对齐字节数
    fieldalign uint8 //当前结构字段的对齐字节数
    kind uint8       //基础类型枚举值和反射中的 Kind 一致，kind 决定了如何解析该类型
    alg *typeAlg     //指向一个函数指针表，该表有两个函数，一个是计算类型 Hash 函
                     //数，另一个是比较两个类型是否相同的 equal 函数
    //gcdata stores the GC type data for the garbage collector.
    //If the KindGCProg bit is set in kind, gcdata is a GC program.
    //Otherwise it is a ptrmask bitmap. See mbitmap.go for details.
    gcdata *byte      //GC 相关信息
    str nameOff       //str 用来表示类型名称字符串在编译后二进制文件中某个 section
                      //的偏移量
                      //由链接器负责填充
    ptrToThis typeOff //ptrToThis 用来表示类型元信息的指针在编译后二进制文件中某个
                      //section 的偏移量
                      //由链接器负责填充
}
```


```
type Caler interface {
    Add (a , b int) int
    Sub (a , b int) int
}
type Adder struct {id int }

func (adder Adder) Add(a, b int) int { return a + b }

func (adder Adder) Sub(a , b int) int { return a - b }

func main () {
    var m Caler=Adder{id: 1234}
    m.Add(10, 32)
}
```
整个接口的动态调用完成。从中可以清楚地看到，接口的动态调用分为两个阶段：
第一阶段就是构建 iface 动态数据结构，这一阶段是在接口实例化的时候完成的，映射到 Go 语句就是var m Caler = Adder{id: 1234}。
第二阶段就是通过函数指针间接调用接口绑定的实例方法的过程，映射到 Go 语句就是 m.Add(10, 32)。

#### 空接口数据结构
空接口 `interface{}` 是没有任何方法集的接口，所以空接口内部不需要维护和动态内存分配相关的数据结构 itab 。空接口只关心存放的**具体类型是什么，具体类型的值是什么**。由于空接口自身没有方法集，所以空接口变量实例化后的真正用途不是接口方法的动态调用。
```
//go/src/runtime/runtime2.go
//空接口
type eface struct {
    _type *_type
    data unsafe.Pointer
}
```


### 7.15 示例：表达式求值器
### 7.16 示例：简单的Web服务器


### 7.17 部署Go语言程序到Linux服务器
### 7.18 示例：音乐播放器
### 7.19 示例：实现有限状态机（FSM）
### 7.20 示例：二叉树数据结构的应用




## 8.Go语言包（package）

### 8.1 包的基本概念
* 任何源代码文件必须属于某个包，同时源码文件的第一行有效代码必须是`package pacakgeName` 语句，通过该语句声明自己所在的包。
* Go语言的包借助了目录树的组织形式，一般包的名称就是其源文件所在目录的名称，虽然Go语言没有强制要求包名必须和其所在的目录名同名，但还是建议包名和所在目录同名
* 包可以定义在很深的目录中，包名的定义是**不包括目录路径的**，但是包在**引用时一般使用全路径引用**。
* 包名为 main 的包为应用程序的入口包，编译不包含 main 包的源码文件时不会得到可执行文件。
* 一个文件夹下的所有源码文件**只能属于同一个包**，同样属于同一个包的源码文件不能放在多个文件夹下。
* 包名是从`GOPATH/src/ `后开始计算的，使用`/ `进行路径分隔。

Go 语言也有 Public 和 Private 的概念，粒度是包。如果类型/接口/方法/函数/字段的首字母大写，则是 Public 的，对其他 package 可见，如果首字母小写，则是 Private 的，对其他 package 不可见。


包的引用格式
```
1) 标准引用格式
import "fmt"

2) 自定义别名引用格式
import F "fmt"    //使用时直接 F.xx

3) 省略引用格式
import . "fmt"    //这种格式相当于把 fmt 包直接合并到当前程序中，在使用 fmt 包内的方法是可以不用加前缀fmt.，直接引用。

4) 匿名引用格式
import _ "fmt"    //下画线_表示匿名导入包。执行包初始化的 init 函数，而不使用包内部的数据时。匿名导入的包与其他方式导入的包一样都会被编译到可执行文件中。
```
注意：
* 一个包可以有多个 init 函数，包加载时会执行全部的 init 函数，但并不能保证执行顺序，所以不建议在一个包中放入多个 init 函数
* 包不能出现环形引用的情况，比如包 a 引用了包 b，包 b 引用了包 c，如果包 c 又引用了包 a，则编译不能通过。
* 包的重复引用是允许的，比如包 a 引用了包 b 和包 c，包 b 和包 c 都引用了包 d。这种场景相当于重复引用了 d，这种情况是允许的，并且 Go 编译器保证包 d 的 init 函数只会执行一次。

Go语言包的初始化有如下特点：  
* 包初始化程序从 main 函数引用的包开始，逐级查找包的引用，直到找到没有引用其他包的包，最终生成一个包引用的有向无环图。
* Go 编译器会将有向无环图转换为一棵树，然后从树的叶子节点开始逐层向上对包进行初始化。
* 单个包的初始化过程如上图所示，先初始化常量，然后是全局变量，最后执行包的 init 函数。

### 8.2 Go语言封装简介及实现细节

封装的实现步骤：  
* 将结构体、字段的首字母小写；
* 给结构体所在的包提供一个工厂模式的函数，首字母大写，类似一个构造函数；
* 提供一个首字母大写的 Set 方法（类似其它语言的 public），用于对属性判断并赋值；
* 提供一个首字母大写的 Get 方法（类似其它语言的 public），用于获取属性的值。

```
type person struct {
    Name string
    age int   //其它包不能直接访问..
    sal float64
}
//写一个工厂模式的函数，相当于构造函数
func NewPerson(name string) *person {
    return &person{
        Name : name,
    }
}
//为了访问age 和 sal 我们编写一对SetXxx的方法和GetXxx的方法
func (p *person) SetAge(age int) {
    if age >0 && age <150 {
        p.age = age
    } else {
        fmt.Println("年龄范围不正确..")
        //给程序员给一个默认值
    }
}
func (p *person) GetAge() int {
    return p.age
}
```



### 8.3 Go语言GOPATH
Go 开发包在安装完成后，将 `GOPATH` 赋予了一个默认的目录，参见下表。
```
平  台	         GOPATH 默认值	     举 例
Windows 平台	%USERPROFILE%/go	C:\Users\用户名\go
Unix 平台	    $HOME/go	        /home/用户名/go
```

在很多与 Go语言相关的书籍、文章中描述的 GOPATH 都是通过修改系统全局的环境变量来实现的。然而，根据笔者多年的 Go语言使用和实践经验及周边朋友、同事的反馈，这种设置全局 GOPATH 的方法可能会导致当前项目错误引用了其他目录的 Go 源码文件从而造成编译输出错误的版本或编译报出一些无法理解的错误提示。

Visual Studio 早期在设计时，允许 C++ 语言在全局拥有一个包含路径。当一个工程多个版本的编译，或者两个项目混杂有不同的共享全局包含时，会发生难以察觉的错误。在新版本 Visual Studio 中已经废除了这种全局包含的路径设计，并建议开发者将包含目录与项目关联。

Go语言中的 GOPATH 也是一种类似全局包含的设计，因此鉴于 Visual Studio 在设计上的失误，建议开发者不要设置全局的 GOPATH，而是**随项目设置 GOPATH**。


### 8.4 Go语言常用内置包
1) fmt
fmt 包实现了格式化的标准输入输出，这与C语言中的 printf 和 scanf 类似。其中的 fmt.Printf() 和 fmt.Println() 是开发者使用最为频繁的函数。
1) io
这个包提供了原始的 I/O 操作界面。它主要的任务是对 os 包这样的原始的 I/O 进行封装，增加一些其他相关，使其具有抽象功能用在公共的接口上。
3) bufio
bufio 包通过对 io 包的封装，提供了数据缓冲功能，能够一定程度减少大块数据读写带来的开销。
在 bufio 各个组件内部都维护了一个缓冲区，数据读写操作都直接通过缓存区进行。当发起一次读写操作时，会首先尝试从缓冲区获取数据，只有当缓冲区没有数据时，才会从数据源获取数据更新缓冲。
4) sort
sort 包提供了用于对切片和用户定义的集合进行排序的功能。
5) strconv
strconv 包提供了将字符串转换成基本数据类型，或者从基本数据类型转换为字符串的功能。
6) os
os 包提供了不依赖平台的操作系统函数接口，设计像 Unix 风格，但错误处理是 go 风格，当 os 包使用时，如果失败后返回错误类型而不是错误数量。
7) sync
sync 包实现多线程中锁机制以及其他同步互斥机制。
8) flag
flag 包提供命令行参数的规则定义和传入参数解析的功能。绝大部分的命令行程序都需要用到这个包。
9) encoding/json
encoding/json 包提供了对 JSON 的基本支持，比如从一个对象序列化为 JSON 字符串，或者从 JSON 字符串反序列化出一个具体的对象等。
1)  html/template
主要实现了 web 开发中生成 html 的 template 的一些函数。
11) net/http
net/http 包提供 HTTP 相关服务，主要包括 http 请求、响应和 URL 的解析，以及基本的 http 客户端和扩展的 http 服务。
通过 net/http 包，只需要数行代码，即可实现一个爬虫或者一个 Web 服务器，这在传统语言中是无法想象的。
12) reflect
reflect 包实现了运行时反射，允许程序通过抽象类型操作对象。通常用于处理静态类型 interface{} 的值，并且通过 Typeof 解析出其动态类型信息，通常会返回一个有接口类型 Type 的对象。
13) os/exec
os/exec 包提供了执行自定义 linux 命令的相关实现。
14) strings
strings 包主要是处理字符串的一些函数集合，包括合并、查找、分割、比较、后缀检查、索引、大小写处理等等。
strings 包与 bytes 包的函数接口功能基本一致。
15) bytes
bytes 包提供了对字节切片进行读写操作的一系列函数。字节切片处理的函数比较多，分为基本处理函数、比较函数、后缀检查函数、索引函数、分割函数、大小写处理函数和子切片处理函数等。
16) log
log 包主要用于在程序中输出日志。

### 8.5 Go语言自定义包



### 8.6 Go语言package
包（package）是多个 Go 源码的集合，是一种高级的代码复用方案。每个包一般都定义了一个不同的名字空间用于它内部的每个标识符的访问。
每个包还通过控制包内名字的可见性和是否导出来实现封装特性。
包的特性如下：
* 一个目录下的同级文件归属一个包。
* 包名可以与其目录不同名。
* 包名为 main 的包为应用程序的入口包，编译源码没有 main 包时，将无法编译输出可执行的文件。

当我们修改了一个源文件，我们必须重新编译该源文件对应的包和所有依赖该包的其他包。即使是从头构建，Go语言编译器的编译速度也明显快于其它编译语言。Go语言的闪电般的编译速度主要得益于三个语言特性。
1. 所有导入的包必须在每个文件的开头显式声明，这样的话编译器就没有必要读取和分析整个源文件来判断包的依赖关系。
2. 禁止包的环状依赖，因为没有循环依赖，包的依赖关系形成一个有向无环图，每个包可以被独立编译，而且很可能是被并发编译。
3. 编译后包的目标文件不仅仅记录包本身的导出信息，目标文件同时还记录了包的依赖关系。因此，在编译一个包的时候，编译器只需要读取每个直接导入包的目标文件，而不需要遍历所有依赖的的文件。

### 8.7 Go语言导出包中的标识符
首字母大小表导出，小写表私有


### 8.8 Go语言import导入包
如果我们想同时导入两个有着名字相同的包，例如 math/rand 包和 crypto/rand 包，那么导入声明必须至少为一个同名包指定一个新的包名以避免冲突。这叫做**导入包的重命名**。
```
import (
    "crypto/rand"
    mrand "math/rand" // 将名称替换为mrand避免冲突, 导入包的重命名只影响当前的源文件。
)
```
导入包重命名作用：
1.解决相同包名
2.导入的一个包名很笨重，特别是在一些自动生成的代码中，这时候用一个简短名称会更方便
3.避免和本地普通变量名产生冲突

#### 理解包导入后的init()函数初始化顺序
Go 语言包会从 main 包开始检查其引用的所有包，每个包也可能包含其他的包。Go 编译器由此构建出一个树状的包引用关系，再根据引用顺序决定编译顺序，依次编译这些包的代码。
在运行时，被最后导入的包会最先初始化并调用 `init()` 函数。



### 8.9 Go语言工厂模式自动注册
```
// factory.go
package base
// 类接口
type Class interface {
    Do()
}
var (
// 保存注册好的工厂信息
    factoryByName = make(map[string]func() Class)
)
// 注册一个类生成工厂
func Register(name string, factory func() Class) {
    factoryByName[name] = factory
}
// 根据名称创建对应的类
func Create(name string) Class {
    if f, ok := factoryByName[name]; ok {
        return f()
    } else {
        panic("name not found")
    }
}


package cls1
import (
    "chapter08/clsfactory/base"
    "fmt"
)
// 定义类1
type Class1 struct {
}
// 实现Class接口
func (c *Class1) Do() {
    fmt.Println("Class1")
}
func init() {
    // 在启动时注册类1工厂
    base.Register("Class1", func() base.Class {
        return new(Class1)
    })
}

package cls2
import (
    "chapter08/clsfactory/base"
    "fmt"
)
// 定义类2
type Class2 struct {
}
// 实现Class接口
func (c *Class2) Do() {
    fmt.Println("Class2")
}
func init() {
    // 在启动时注册类2工厂
    base.Register("Class2", func() base.Class {
        return new(Class2)
    })
}


package main
import (
    "chapter08/clsfactory/base"
    _ "chapter08/clsfactory/cls1"  // 匿名引用cls1包, 自动注册
    _ "chapter08/clsfactory/cls2"  // 匿名引用cls2包, 自动注册,关键之处在于init方法的初始化
)
func main() {
    // 根据字符串动态创建一个Class1实例
    c1 := base.Create("Class1")
    c1.Do()
    // 根据字符串动态创建一个Class2实例
    c2 := base.Create("Class2")
    c2.Do()
}
```


### 8.10 Go语言单例模式
Go语言实现单例模式的有四种方式，分别是懒汉式、饿汉式、双重检查和 sync.Once。

#### 1. 懒汉式——非线程安全
非线程安全，指的是在多线程下可能会创建多次对象。
```
//使用结构体代替类
type Tool struct {
    values int
}

//建立私有变量
var instance *Tool

//获取单例对象的方法，引用传递返回
func GetInstance() *Tool {
    if instance == nil {
        instance = new(Tool)
    }
    return instance
}

// =====================
// 在非线程安全的基本上，利用 Sync.Mutex 进行加锁保证线程安全，但由于每次调用该方法都进行了加锁操作，在性能上不是很高效。

//锁对象
var lock sync.Mutex

//加锁保证线程安全
func GetInstance() *Tool {
    lock.Lock()
    defer lock.Unlock()
    if instance == nil {
        instance = new(Tool)
    }
    return instance
}
```

#### 2. 饿汉式
直接创建好对象，不需要判断为空，同时也是**线程安全**，唯一的缺点是在**导入包的同时会创建该对象**，并持续占有在内存中。
Go语言饿汉式可以使用 init 函数，也可以使用全局变量。
```
type config struct {
}

var cfg *config

// ======初始化方法形式=========
func init()  {
   cfg = new(config)
}

// NewConfig 提供获取实例的方法
func NewConfig() *config {
   return cfg
}

//==========全局变量形式==========
type config struct {  
}
var cfg *config = new(config)
// NewConfig 提供获取实例的方法
func NewConfig() *config {
   return cfg
}
```

#### 3.双重检查
在懒汉式（线程安全）的基础上再进行优化，减少加锁的操作，保证线程安全的同时不影响性能。
```
//锁对象
var lock sync.Mutex
//第一次判断不加锁，第二次加锁保证线程安全，一旦对象建立后，获取对象就不用加锁了。
func GetInstance() *Tool {
    if instance == nil {
        lock.Lock()
        if instance == nil {
            instance = new(Tool)
        }
        lock.Unlock()
    }
    return instance
}
```

#### 4.sync.Once
```
var once sync.Once
func GetInstance() *Tool {
    once.Do(func() {
        instance = new(Tool)
    })
    return instance
}
```
sync.Once 内部本质上也是双重检查的方式，但在写法上会比自己写双重检查更简洁，以下是 Once 的源码
```
func (o *Once) Do(f func()) {
    //判断是否执行过该方法，如果执行过则不执行
    if atomic.LoadUint32(&o.done) == 1 {
        return
    }
    // Slow-path.
    o.m.Lock()
    defer o.m.Unlock()
    //进行加锁，再做一次判断，如果没有执行，则进行标志已经扫行并调用该方法
    if o.done == 0 {
        defer atomic.StoreUint32(&o.done, 1)
        f()
    }
}
```

### 8.11 Go语言sync包与锁
**互斥锁 Mutex**
```
func (m *Mutex) Lock()
func (m *Mutex) Unlock()
```

**读写锁 RWMutex**

读写锁有如下四个方法：
* 写操作的锁定和解锁分别是`func (*RWMutex) Lock`和`func (*RWMutex) Unlock`
* 读操作的锁定和解锁分别是`func (*RWMutex) Rlock`和`func (*RWMutex) RUnlock`。

我们可以将其总结为如下三条：
* 同时只能有一个 goroutine 能够获得写锁定；
* 同时可以有任意多个 gorouinte 获得读锁定；
* 同时只能存在写锁定或读锁定（读和写互斥）。


### 8.12 Go语言big包
实际开发中，对于超出 int64 或者 uint64 类型的大数进行计算时，如果对精度没有要求，使用 float32 或者 float64 就可以胜任，但如果对精度有严格要求的时候，我们就不能使用浮点数了，因为浮点数在内存中只能被近似的表示。

Go语言中 math/big 包实现了大数字的多精度计算，支持 Int（有符号整数）、Rat（有理数）和 Float（浮点数）等数字类型。

这些类型可以实现任意位数的数字，只要内存足够大，但缺点是需要更大的内存和处理开销，这使得它们使用起来要比内置的数字类型慢很多。


### 8.13 示例：使用图像包制作GIF动画
### 8.14 Go语言正则表达式：regexp包
### 8.15 Go语言time包：时间和日期
```
now := time.Now() //获取当前时间
year := now.Year()     //年
month := now.Month()   //月
day := now.Day()       //日


now := time.Now()            //获取当前时间
timestamp1 := now.Unix()     //时间戳


now := time.Now()
later := now.Add(time.Hour) // 当前时间加1小时后的时间
```

定时器
使用 time.Tick(时间间隔) 可以设置定时器，定时器的本质上是一个通道（channel），示例代码如下：
```
ticker := time.Tick(time.Second) //定义一个1秒间隔的定时器
for i := range ticker {
    fmt.Println(i) //每秒都会执行的任务
}
```


### 8.16 Go语言os包用法简述


### 8.17 Go语言flag包：命令行参数解析


### 8.18 Go语言go mod包依赖管理工具
Modules 是相关 Go 包的集合，是源代码交换和版本控制的单元。Go语言命令直接支持使用 Modules，包括记录和解析对其他模块的依赖性，Modules 替换旧的基于 GOPATH 的方法，来指定使用哪些源文件。

#### GO111MODULE
* GO111MODULE=off 禁用 go module，编译时会从 GOPATH 和 vendor 文件夹中查找包；
* GO111MODULE=on 启用 go module，编译时会忽略 GOPATH 和 vendor 文件夹，只根据 go.mod下载依赖；
* GO111MODULE=auto（默认值），当项目在 GOPATH/src 目录之外，并且项目根目录有 go.mod 文件时，开启 go module。

Windows 下开启 GO111MODULE 的命令为：
```
set GO111MODULE=on 或者 set GO111MODULE=auto
```

MacOS 或者 Linux 下开启 GO111MODULE 的命令为：
```
export GO111MODULE=on 或者 export GO111MODULE=auto
```

#### GOPROXY
Go语言在 1.13 版本之后 GOPROXY 默认值为 https://proxy.golang.org，在国内可能会存在下载慢或者无法访问的情况，所以十分建议大家将 GOPROXY 设置为国内的 goproxy.cn。
```
Windows 下设置 GOPROXY 的命令为：
go env -w GOPROXY=https://goproxy.cn,direct

MacOS 或 Linux 下设置 GOPROXY 的命令为：
export GOPROXY=https://goproxy.cn
```

#### 使用go get命令下载指定版本的依赖包
执行`go get `命令，在下载依赖包的同时还可以指定依赖包的版本。  

* 运行`go get -u`命令会将项目中的包升级到最新的次要版本或者修订版本；
* 运行`go get -u=patch`命令会将项目中的包升级到最新的修订版本；
* 运行`go get [包名]@[版本号]`命令会下载对应包的指定版本或者将对应包升级到指定的版本。

> 提示：`go get [包名]@[版本号]`命令中版本号可以是 x.y.z 的形式，例如 go get foo@v1.2.3，也可以是 git 上的分支或 tag，例如 go get foo@master，还可以是 git 提交时的哈希值，例如 go get foo@e3702bed2。


go.mod 提供了 module、require、replace 和 exclude 四个命令：
* module 语句指定包的名字（路径）；
* require 语句指定的依赖项模块；
* replace 语句可以替换依赖项模块；
* exclude 语句可以忽略依赖项模块。

### 8.19 示例：使用Go语言生成二维码



### 8.20 Go语言Context（上下文）
Context的实现就是通道的一个综合的应用，因为其涉及到不同goroutin之间的消息的传递。比如cancel()的执行会向ctx.Done()发送消息。
Context 在 Go1.7 之后就加入到了Go语言标准库中，准确说它是 Goroutine 的上下文，包含 Goroutine 的运行状态、环境、现场等信息。

随着 Context 包的引入，标准库中很多接口因此加上了 Context 参数，例如 database/sql 包，Context 几乎成为了并发控制和超时控制的标准做法。

在网络编程下，当接收到一个网络请求 Request，在处理 Request 时，我们可能需要开启不同的 Goroutine 来获取数据与逻辑处理，即一个请求 Request，会在多个 Goroutine 中处理。而这些 Goroutine 可能需要共享 Request 的一些信息，同时当 Request 被取消或者超时的时候，所有从这个 Request 创建的所有 Goroutine 也应该被结束。


### 8.21 示例：客户信息管理系统
### 8.22 示例：使用Go语言发送电子邮件
### 8.23 Go语言（Pingo）插件化开发


### 8.24 Go语言定时器实现原理及作用


## Go语言并发
Go 语言通过编译器运行时（runtime），从语言上支持了并发的特性。Go 语言的并发通过 goroutine 特性完成。goroutine 类似于线程，但是可以根据需要创建多个 goroutine 并发工作。goroutine 是由 Go 语言的运行时调度完成，而线程是由操作系统调度完成。


### 9.1 Go语言并发简述
Go语言的并发机制运用起来非常简便，在启动并发的方式上直接添加了语言级的关键字就可以实现，和其他编程语言相比更加轻量。

协程/线程
协程：独立的栈空间，共享堆空间，调度由用户自己控制，本质上有点类似于用户级线程，这些用户级线程的调度也是自己实现的。
线程：一个线程上可以跑多个协程，协程是轻量级的线程。

goroutine 是一种非常轻量级的实现，可在单个进程里执行成千上万的并发任务，它是Go语言并发设计的核心。
说到底 goroutine 其实就是线程，但是它比线程更小，十几个 goroutine 可能体现在底层就是五六个线程，而且Go语言内部也实现了 goroutine 之间的内存共享。


channel 是Go语言在语言级别提供的 goroutine 间的通信方式。我们可以使用 channel 在两个或多个 goroutine 之间传递消息。
channel 是类型相关的，也就是说，一个 channel 只能传递一种类型的值，这个类型需要在声明 channel 时指定。
定义一个 channel 时，也需要定义发送到 channel 的值的类型，注意，**必须使用 make 创建 channel**
```
ci := make(chan int)
cs := make(chan string)
cf := make(chan interface{})
```

### 9.2 Go语言轻量级线程
Go 程序从 main 包的 main() 函数开始，在程序启动时，Go 程序就会为 main() 函数创建一个默认的 goroutine。

使用 go 关键字创建 goroutine 时，被调用函数的**返回值会被忽略**。
如果需要在 goroutine 中返回数据，请使用后面介绍的通道（channel）特性，**通过通道把数据从 goroutine 中作为返回值传出**。

```
func running() {
    var times int
    // 构建一个无限循环
    for {
        times++
        fmt.Println("tick", times)
        // 延时1秒
        time.Sleep(time.Second)
    }
}
func main() {
    // 并发执行程序
    go running()
    // 接受命令行输入, 不做任何事情
    var input string
    fmt.Scanln(&input)
}

//========匿名函数方式==============
func main() {
    go func() {
        var times int
        for {
            times++
            fmt.Println("tick", times)
            time.Sleep(time.Second)
        }
    }()
    var input string
    fmt.Scanln(&input)
}
```
终止 goroutine 的最好方法就是自然返回 goroutine 对应的函数。虽然可以用 golang.org/x/net/context 包进行 goroutine 生命期深度控制，但这种方法仍然处于内部试验阶段，并不是官方推荐的特性。

### 9.3 Go语言并发通信
事实上，不管是什么平台，什么编程语言，不管在哪，并发都是一个大话题。并发编程的难度在于协调，而协调就要通过交流，从这个角度看来，并发单元间的通信是最大的问题。

在工程上，有两种最常见的并发通信模型：共享数据和消息。

共享数据是指多个并发单元分别保持对同一个数据的引用，实现对该数据的共享。被共享的数据可能有多种形式，比如内存数据块、磁盘文件、网络数据等。在实际工程应用中最常见的无疑是内存了，也就是常说的共享内存。
比如以下例子：
```
var counter int = 0
func Count(lock *sync.Mutex) {
    lock.Lock()
    counter++
    fmt.Println(counter)
    lock.Unlock()
}
func main() {
    lock := &sync.Mutex{}
    for i := 0; i < 10; i++ {
        go Count(lock)
    }
    for {
        lock.Lock()
        c := counter
        lock.Unlock()
        runtime.Gosched()
        if c >= 10 {
            break
        }
    }
}
```
Go语言提供的是另一种通信模型，即以消息机制而非共享内存作为通信方式。
消息机制认为每个并发单元是自包含的、独立的个体，并且都有自己的变量，但在不同并发单元间**这些变量不共享**。
每个并发单元的输入和输出只有一种，那就是消息。每个进程不会被其他进程打扰，它只做好自己的工作就可以了。不同进程间靠消息来通信，它们不会共享内存。
Go语言提供的消息通信机制被称为 channel，

### 9.4 Go语言竞争状态
在`go build`命令中多加了一个`-race `标志，这样生成的可执行程序就自带了检测资源竞争的功能，运行生成的可执行文件，效果如下所示：
```
==================
WARNING: DATA RACE
Read at 0x000000619cbc by goroutine 8:
  main.incCount()
      D:/code/src/main.go:25 +0x80

Previous write at 0x000000619cbc by goroutine 7:
  main.incCount()
      D:/code/src/main.go:28 +0x9f

Goroutine 8 (running) created at:
  main.main()
      D:/code/src/main.go:17 +0x7e

Goroutine 7 (finished) created at:
  main.main()
      D:/code/src/main.go:16 +0x66
==================
4
Found 1 data race(s)
```

锁住共享资源
Go语言提供了**传统的**同步机制，就是对共享资源加锁。atomic 和 sync 包里的一些函数就可以对共享的资源进行加锁操作。

**原子函数**
原子函数能够以很底层的加锁机制来同步访问整型变量和指针，示例代码如下所示：
```
var (
    counter int64
    wg      sync.WaitGroup
)
func main() {
    wg.Add(2)
    go incCounter(10)
    go incCounter(20)
    wg.Wait()          //等待goroutine结束
    fmt.Println(counter)
}
func incCounter(id int) {
    defer wg.Done()
    for count := 0; count < 2; count++ {
        atomic.AddInt64(&counter, 1) //安全的对counter加1,  lock free,原子操作
        runtime.Gosched()    //让当前 goroutine 暂停的意思，退回执行队列，让其他等待的 goroutine 运行
    }
}
```

**互斥锁**
```
var (
    counter int64
    wg      sync.WaitGroup
    mutex   sync.Mutex
)
func main() {
    wg.Add(2)
    go incCounter(1)
    go incCounter(2)
    wg.Wait()
    fmt.Println(counter)
}
func incCounter(id int) {
    defer wg.Done()
    for count := 0; count < 2; count++ {
        //同一时刻只允许一个goroutine进入这个临界区
        mutex.Lock()
        {
            value := counter
            runtime.Gosched()
            value++
            counter = value
        }
        mutex.Unlock() //释放锁，允许其他正在等待的goroutine进入临界区
    }
}
```

### 9.5 Go语言调整并发的运行性能
在 Go语言程序运行时（runtime）实现了一个小型的任务调度器。这套调度器的工作原理**类似于操作系统调度线程**，Go 程序调度器可以高效地将 CPU 资源分配给每一个任务。传统逻辑中，开发者需要维护线程池中线程与 CPU 核心数量的对应关系。同样的，Go 地中也可以通过 runtime.GOMAXPROCS() 函数做到，格式为：
```
runtime.GOMAXPROCS(逻辑CPU数量)
```
一般情况下，可以使用 runtime.NumCPU() 查询 CPU 数量，并使用 runtime.GOMAXPROCS() 函数进行设置，例如：
```
runtime.GOMAXPROCS(runtime.NumCPU())
```
Go 1.5 版本之前，默认使用的是单核心执行。从 Go 1.5 版本开始，默认执行上面语句以便让代码并发执行，最大效率地利用 CPU。


### 9.6 并发和并行的区别
并发（concurrency）：把任务在不同的时间点交给处理器进行处理。在同一时间点，任务并不会同时运行。
并行（parallelism）：把每一个任务分配给每一个处理器独立完成。在同一时间点，任务一定是同时运行。
Go语言在 GOMAXPROCS 数量与任务数量相等时，可以做到并行执行，但一般情况下都是并发执行。


### 9.7 goroutine和coroutine的区别
C#、Lua、Python 语言都支持 coroutine 特性。coroutine 与 goroutine 在名字上类似，都可以将函数或者语句**在独立的环境中运行**，但是它们之间有两点不同：
* goroutine 可能发生并行执行；
* coroutine 始终顺序执行。

coroutine 始终发生在单线程，coroutine 程序需要主动交出控制权，宿主才能获得控制权并将控制权交给其他 coroutine。
goroutine 间使用 channel 通信，coroutine 使用 yield 和 resume 操作。

coroutine 的运行机制属于协作式任务处理，早期的操作系统要求每一个应用必须遵守操作系统的任务处理规则，应用程序在不需要使用 CPU 时，会**主动交出 CPU 使用权**。如果开发者无意间或者故意让应用程序长时间占用 CPU，操作系统也无能为力，表现出来的效果就是计算机很容易失去响应或者死机。
goroutine 属于抢占式任务处理，已经和现有的多线程和多进程任务处理非常类似。最终还需要由操作系统来管理。

### 9.8 Go语言通道（chan）
Go语言提倡使用通信的方法**代替共享内存**，当一个资源需要在 goroutine 之间共享时，通道在 goroutine 之间架起了一个**管道**，并提供了确保同步交换数据的机制。
声明通道时，需要指定将要被共享的数据的类型。可以通过通道共享内置类型、命名类型、结构类型和引用类型的值或者指针。

在地铁站、食堂、洗手间等公共场所人很多的情况下，大家养成了排队的习惯，目的也是避免拥挤、插队导致的低效的资源使用和交换过程。代码与数据也是如此，多个 goroutine 为了争抢数据，势必造成执行的低效率，使用队列的方式是最高效的，channel 就是一种队列一样的结构

Go语言中的通道（channel）是一种特殊的类型。在任何时候，同时只能有一个 goroutine 访问通道进行发送和获取数据。goroutine 间通过通道就可以通信。
通道像一个传送带或者队列，总是遵循先入先出（First In First Out）的规则，保证收发数据的顺序。

**使用通道发送数据**
通道创建后，就可以使用通道进行发送和接收操作。
```
// 创建一个空接口通道
ch := make(chan interface{})
// 将0放入通道中
ch <- 0
// 将hello字符串放入通道中
ch <- "hello"
```
发送将持续阻塞直到数据被接收。把数据往通道中发送时，如果接收方一直都没有接收，那么发送操作将**持续阻塞**。

**使用通道接收数据**
通道的收发操作在不同的两个 goroutine 间进行。
由于通道的数据在没有接收方处理时，数据发送方会持续阻塞，因此通道的接收必定在另外一个 goroutine 中进行。如果在一个goroutine中就会产生死锁。
如果接收方接收时，通道中没有发送方发送数据，接收方也会发生阻塞，直到发送方发送数据为止。


通道的数据接收一共有以下 4 种写法。

1.阻塞接收数据
```
data := <-ch
```

2.非阻塞接收数据
```
data, ok := <-ch
```
data：表示接收到的数据。未接收到数据时，data 为通道类型的零值。
ok：表示是否接收到数据。
非阻塞的通道接收方法可能造成高的 CPU 占用，因此使用非常少。如果需要实现接收超时检测，可以配合 select 和计时器 channel 进行

3.接收任意数据，忽略接收的数据
```
<-ch   //执行该语句时将会发生阻塞，直到接收到数据，但接收到的数据会被忽略。这个方式实际上只是通过通道在 goroutine 间阻塞收发实现并发同步。
```
```
func main() {
    // 构建一个通道
    ch := make(chan int)
    // 开启一个并发匿名函数
    go func() {
        fmt.Println("start goroutine")
        //....
        fmt.Println("exit goroutine")
        // 通过通道通知main的goroutine
        ch <- 0
    }()
    fmt.Println("wait goroutine")
    // 等待匿名goroutine
    <-ch
    fmt.Println("all done")
}
```

4.循环接收
```
for data := range ch {
}

func main() {
    // 构建一个通道
    ch := make(chan int)
    // 开启一个并发匿名函数
    go func() {
        // 从3循环到0
        for i := 3; i >= 0; i-- {
            // 发送3到0之间的数值
            ch <- i
            // 每次发送完时等待
            time.Sleep(time.Second)
        }
    }()
    // 遍历接收通道数据
    for data := range ch {
        // 打印通道数据
        fmt.Println(data)
        // 当遇到数据0时, 退出接收循环
        if data == 0 {
                break
        }
    }
}
```


### 9.9 示例：并发打印
生产者消费者模型
```
func printer(c chan int) {      //消费者
    // 开始无限循环等待数据
    for {
        // 从channel中获取一个数据
        data := <-c
        // 将0视为数据结束
        if data == 0 {
            break
        }
        // 打印数据
        fmt.Println(data)
    }
    // 通知main已经结束循环(我搞定了!)
    c <- 0
}
func main() {
    // 创建一个channel
    c := make(chan int)
    // 并发执行printer, 传入channel
    go printer(c)
    for i := 1; i <= 10; i++ {           // 生产者
        // 将数据通过channel投送给printer
        c <- i
    }
    // 通知并发的printer结束循环(没数据啦!)
    c <- 0
    // 等待printer结束(搞定喊我!)
    <-c
}
```


### 9.10 Go语言单向通道
目的是为了做限制,有利于代码接口的严谨性。单向通道的值一定是普通通道赋予的
```
var 通道实例 chan<- 元素类型    // 只能写入数据的通道
var 通道实例 <-chan 元素类型    // 只能读取数据的通道
```

time包中的单向通道
```
// time 包中的计时器会返回一个 timer 实例，代码如下：
timer := time.NewTimer(time.Second)

// timer的Timer类型定义如下：
type Timer struct {
    C <-chan Time        //只能读取的单向通道。如果此处不进行通道方向约束，一旦外部向通道写入数据，将会造成其他使用到计时器的地方逻辑产生混乱。
    r runtimeTimer
}
```
```
// 关闭 channel
close(ch)

// 如何判断一个 channel 是否已经被关闭，如果返回值是 false 则表示 ch 已经被关闭。
x, ok := <-ch
```

### 9.11 Go语言无缓冲的通道
使用两个 goroutine 来模拟网球比赛
```
// wg 用来等待程序结束
var wg sync.WaitGroup
func init() {
    rand.Seed(time.Now().UnixNano())
}
// main 是所有Go 程序的入口
func main() {
    // 创建一个无缓冲的通道
    court := make(chan int)
    // 计数加 2，表示要等待两个goroutine
    wg.Add(2)
    // 启动两个选手
    go player("Nadal", court)
    go player("Djokovic", court)
    // 发球
    court <- 1
    // 等待游戏结束
    wg.Wait()
}
// player 模拟一个选手在打网球
func player(name string, court chan int) {
    // 在函数退出时调用Done 来通知main 函数工作已经完成
    defer wg.Done()
    for {
        // 等待球被击打过来
        ball, ok := <-court
        if !ok {
            // 如果通道被关闭，我们就赢了
            fmt.Printf("Player %s Won\n", name)
            return
        }
        // 选随机数，然后用这个数来判断我们是否丢球
        n := rand.Intn(100)
        if n%13 == 0 {
            fmt.Printf("Player %s Missed\n", name)
            // 关闭通道，表示我们输了
            close(court)
            return
        }
        // 显示击球数，并将击球数加1
        fmt.Printf("Player %s Hit %d\n", name, ball)
        ball++
        // 将球打向对手
        court <- ball
    }
}
```


### 9.12 Go语言带缓冲的通道
带缓冲通道在发送时无需等待接收方接收即可完成发送过程，并且不会发生阻塞，只有当存储空间满时才会发生阻塞。同理，如果缓冲通道中有数据，接收时将不会发生阻塞，直到通道中没有数据可读时，通道将会再度阻塞。

无缓冲通道保证收发过程同步。无缓冲收发过程类似于快递员给你电话让你下楼取快递，整个递交快递的过程是同步发生的，你和快递员不见不散。但这样做快递员就必须等待所有人下楼完成操作后才能完成所有投递工作。如果快递员将快递放入快递柜中，并通知用户来取，快递员和用户就成了异步收发过程，效率可以有明显的提升。带缓冲的通道就是这样的一个“快递柜”。

```
// 创建
通道实例 := make(chan 通道类型, 缓冲大小)
```

带缓冲通道在很多特性上和无缓冲通道是类似的。无缓冲通道可以看作是长度永远为 0 的带缓冲通道。因此根据这个特性，带缓冲通道在下面列举的情况下依然会发生阻塞：
带缓冲通道被填满时，尝试再次发送数据时发生阻塞。
带缓冲通道为空时，尝试接收数据时发生阻塞。


### 9.13 Go语言channel超时机制
```
select {
    case <-chan1:
    // 如果chan1成功读到数据，则进行该case处理语句
    case chan2 <- 1:
    // 如果成功向chan2写入数据，则进行该case处理语句
    default:
    // 如果上面都没有成功，则进入default处理流程
}
```
执行select若没有事件发生，那么有如下两种可能的情况：
* 如果给出了 default 语句，那么就会执行 default 语句，同时程序的执行会从 select 语句后的语句中恢复；
* 如果没有 default 语句，那么 select 语句将被阻塞，直到至少有一个通信可以进行下去。

发生事件之后:
在一个select语句中，Go语言会按顺序从头至尾评估每一个发送和接收的语句。
如果其中的任意一语句可以继续执行（即没有被阻塞），那么就从那些可以执行的语句中任意选择一条来使用。之后向下执行下去。

```
func main() {
    ch := make(chan int)
    quit := make(chan bool)
    //新开一个协程
    go func() {
        for {
            select {
            case num := <-ch:
                fmt.Println("num = ", num)
            case <-time.After(3 * time.Second):
                fmt.Println("超时")
                quit <- true
            }
        }
    }() //别忘了()
    for i := 0; i < 5; i++ {
        ch <- i
        time.Sleep(time.Second)
    }
    <-quit
    fmt.Println("程序结束")
}
```


### 9.14 Go语言通道的多路复用
Go语言中提供了 select 关键字，可以同时响应多个通道的操作。
```
操作         	语句示例
接收任意数据	 case <- ch;
接收变量	    case d :=  <- ch;
发送数据	    case ch <- 100;
```

```
# 这个程序实现了一个随机向 ch 中写入一个 0 或者 1 的过程。
ch := make(chan int, 1)
for {
    select {       // select下边的case会同事进行监控的，不是顺序执行的
        case ch <- 0:
        case ch <- 1:
    }
    i := <-ch
    fmt.Println("Value received:", i)
}
```


### 9.15 Go语言模拟远程过程调用
```
// 模拟RPC客户端的请求和接收消息封装
func RPCClient(ch chan string, req string) (string, error) {
    // 向服务器发送请求
    ch <- req
    // 等待服务器返回
    select {
    case ack := <-ch: // 接收到服务器返回数据
        return ack, nil
    case <-time.After(time.Second): // 超时
        return "", errors.New("Time out")
    }
}
// 模拟RPC服务器端接收客户端请求和回应
func RPCServer(ch chan string) {
    for {
        // 接收客户端请求
        data := <-ch
        // 打印接收到的数据
        fmt.Println("server received:", data)
        // 反馈给客户端收到
        ch <- "roger"
    }
}
func main() {
    // 创建一个无缓冲字符串通道
    ch := make(chan string)
    // 并发执行服务器逻辑
    go RPCServer(ch)
    // 客户端请求数据和接收数据
    recv, err := RPCClient(ch, "hi")
    if err != nil {
        // 发生错误打印
        fmt.Println(err)
    } else {
        // 正常接收到数据
        fmt.Println("client received", recv)
    }
}
```

### 9.16 示例：使用通道响应计时器的事件
```
func main() {
    // 声明一个退出用的通道
    exit := make(chan int)
    // 打印开始
    fmt.Println("start")
    // 过1秒后, 调用匿名函数
    time.AfterFunc(time.Second, func() {
        // 1秒后, 打印结果
        fmt.Println("one second after")
        // 通知main()的goroutine已经结束
        exit <- 0
    })
    // 等待结束
    <-exit
}
```
time.AfterFunc() 函数是在 time.After 基础上增加了到时的回调，方便使用。
而 time.After() 函数又是在 time.NewTimer() 函数上进行的封装


计时器（Timer）:给定多少时间后触发
打点器（Ticker）:每到固定点就会触发。
这两种方法创建后会返回 time.Ticker 对象和 time.Timer 对象，里面通过一个 C 成员，类型是只能接收的时间通道（<-chan Time），
使用这个通道就可以获得时间触发的通知。

```
func main() {
    // 创建一个打点器, 每500毫秒触发一次
    ticker := time.NewTicker(time.Millisecond * 500)
    // 创建一个计时器, 2秒后触发
    stopper := time.NewTimer(time.Second * 2)
    // 声明计数变量
    var i int
    // 不断地检查通道情况
    for {
        // 多路复用通道
        select {
        case <-stopper.C:  // 计时器到时了
            fmt.Println("stop")
            // 跳出循环
            goto StopHere
        case <-ticker.C:  // 打点器触发了
            // 记录触发了多少次
            i++
            fmt.Println("tick", i)
        }
    }
// 退出的标签, 使用goto跳转
StopHere:
    fmt.Println("done")
}
```

### 9.17 Go语言关闭通道后继续使用通道
通道是一个**引用对象**，和 map 类似。map 在没有任何外部引用时，Go语言程序在运行时（runtime）会自动对内存进行垃圾回收（Garbage Collection, GC）。类似的，通道也可以被垃圾回收，但是通道也可以被主动关闭,用`close(ch)`来进行关闭，ch 不会被 close 设置为 nil，依然可以被访问

* 给被关闭通道发送数据将会触发 panic
* 从已关闭的通道接收数据时将不会发生阻塞
从已经关闭的通道接收数据或者正在接收数据时，将会接收到通道类型的零值，然后停止阻塞并返回。

```
func main() {
    ch := make(chan int, 2)  // 创建一个整型带两个缓冲的通道
   
    // 给通道放入两个数据
    ch <- 0
    ch <- 1
   
    // 关闭缓冲
    close(ch)
    // 遍历缓冲所有数据, 且多遍历1个，当通道空后将取不到东西，结果返回false
    for i := 0; i < cap(ch)+1; i++ {
        v, ok := <-ch
        fmt.Println(v, ok)
    }
}
//结果
0 true
1 true
0 false
```


### 9.18 Go语言多核并行化
```
type Vector []float64
// 分配给每个CPU的计算任务
func (v Vector) DoSome(i, n int, u Vector, c chan int) {
    for ; i < n; i++ {
        v[i] += u.Op(v[i])
    }
    c <- 1 // 发信号告诉任务管理者我已经计算完成了
}
const NCPU = 16 // 假设总共有16核
func (v Vector) DoAll(u Vector) {
    c := make(chan int, NCPU) // 用于接收每个CPU的任务完成信号
    for i := 0; i < NCPU; i++ {
        go v.DoSome(i*len(v)/NCPU, (i+1)*len(v)/NCPU, u, c)
    }
    // 等待所有CPU的任务完成
    for i := 0; i < NCPU; i++ {
        <-c // 获取到一个数据，表示一个CPU计算完成了
    }
    // 到这里表示所有计算已经结束
}
```


### 9.19 Go语言Telnet回音服务器
```
// 服务逻辑, 传入地址和退出的通道
func server(address string, exitChan chan int) {
    // 根据给定地址进行侦听
    l, err := net.Listen("tcp", address)
    // 如果侦听发生错误, 打印错误并退出
    if err != nil {
        fmt.Println(err.Error())
        exitChan <- 1
    }
    // 打印侦听地址, 表示侦听成功
    fmt.Println("listen: " + address)
    // 延迟关闭侦听器
    defer l.Close()
    // 侦听循环
    for {
        // 新连接没有到来时, Accept是阻塞的
        conn, err := l.Accept()
        // 发生任何的侦听错误, 打印错误并退出服务器
        if err != nil {
            fmt.Println(err.Error())
            continue
        }
        // 根据连接开启会话, 这个过程需要并行执行
        go handleSession(conn, exitChan)
    }
}

// 连接的会话逻辑
func handleSession(conn net.Conn, exitChan chan int) {
    fmt.Println("Session started:")
    // 创建一个网络连接数据的读取器
    reader := bufio.NewReader(conn)
    // 接收数据的循环
    for {
        // 读取字符串, 直到碰到回车返回
        str, err := reader.ReadString('\n')
        // 数据读取正确
        if err == nil {
            // 去掉字符串尾部的回车
            str = strings.TrimSpace(str)
            // 处理Telnet指令
            if !processTelnetCommand(str, exitChan) {
                conn.Close()
                break
            }
            // Echo逻辑, 发什么数据, 原样返回
            conn.Write([]byte(str + "\r\n"))
        } else {
            // 发生错误
            fmt.Println("Session closed")
            conn.Close()
            break
        }
    }
}

func processTelnetCommand(str string, exitChan chan int) bool {
    // @close指令表示终止本次会话
    if strings.HasPrefix(str, "@close") {
        fmt.Println("Session closed")
        // 告诉外部需要断开连接
        return false
        // @shutdown指令表示终止服务进程
    } else if strings.HasPrefix(str, "@shutdown") {
        fmt.Println("Server shutdown")
        // 往通道中写入0, 阻塞等待接收方处理
        exitChan <- 0
        // 告诉外部需要断开连接
        return false
    }
    // 打印输入的字符串
    fmt.Println(str)
    return true
}

func main() {
    // 创建一个程序结束码的通道
    exitChan := make(chan int)
    // 将服务器并发运行
    go server("127.0.0.1:7001", exitChan)
    // 通道阻塞, 等待接收返回值
    code := <-exitChan
    // 标记程序返回值并退出
    os.Exit(code)
}
```


### 9.20 检测代码在并发环境下可能出现的问题
Go语言程序可以使用通道进行多个 goroutine 间的数据交换，但这仅仅是数据同步中的一种方法。
通道内部的实现依然使用了各种锁，因此优雅代码的代价是性能。
在某些轻量级的场合，原子访问（atomic包）、互斥锁（sync.Mutex）以及等待组（sync.WaitGroup）能最大程度满足需求。

```
var (
    // 序列号
    seq int64
)
/*
func GenID() int64 {
// 尝试原子的增加序列号
    atomic.AddInt64(&seq, 1)    // 此处存在竞争态，因为操作和返回分成的两部进行了，运行go run -race main.go的时候会报错
    return seq
}
*/

func GenID() int64 {
    // 尝试原子的增加序列号
    return atomic.AddInt64(&seq, 1)
}

func main() {
    //生成10个并发序列号
    for i := 0; i < 10; i++ {
            go GenID()
    }
    fmt.Println(GenID())
}
```


### 9.21 互斥锁和读写互斥锁
Go语言包中的 sync 包提供了两种锁类型：sync.Mutex 和 sync.RWMutex。

互斥锁例子
```
var (
    // 逻辑中使用的某个变量
    count int
    // 与变量对应的使用互斥锁
    countGuard sync.Mutex      //互斥锁的变量命名可以用这种格式：变量名+Guard
)
func GetCount() int {
    // 锁定
    countGuard.Lock()
    // 在函数退出时解除锁定
    defer countGuard.Unlock()
    return count
}
func SetCount(c int) {
    countGuard.Lock()
    count = c
    countGuard.Unlock()
}
func main() {
    // 可以进行并发安全的设置
    SetCount(1)
    // 可以进行并发安全的获取
    fmt.Println(GetCount())
}
```


### 9.22 Go语言等待组
在 sync.WaitGroup类型中，每个 sync.WaitGroup 值在内部维护着一个计数，此计数的初始默认值为零。

等待组常用方法
```
(wg * WaitGroup) Add(delta int)	等待组的计数器 +1
(wg * WaitGroup) Done()	等待组的计数器 -1
(wg * WaitGroup) Wait()	当等待组计数器不等于 0 时阻塞直到变 0。
```

例子：
```
func main() {
    // 声明一个等待组
    var wg sync.WaitGroup
    // 准备一系列的网站地址
    var urls = []string{
        "http://www.github.com/",
        "https://www.qiniu.com/",
        "https://www.golangtc.com/",
    }
    // 遍历这些地址
    for _, url := range urls {
        // 每一个任务开始时, 将等待组增加1
        wg.Add(1)
        // 开启一个并发
        go func(url string) {
            // 使用defer, 表示函数完成时将等待组值减1
            defer wg.Done()
            // 使用http访问提供的地址
            _, err := http.Get(url)
            // 访问完成后, 打印地址和可能发生的错误
            fmt.Println(url, err)
            // 通过参数传递url地址
        }(url)
    }
    // 等待所有的任务完成
    wg.Wait()
    fmt.Println("over")
}
```

### 9.23 死锁、活锁和饥饿概述
活锁
活锁是另一种形式的活跃性问题，该问题尽管不会阻塞线程，但也不能继续执行，因为线程将不断重复同样的操作，而且总会失败。
例如线程1可以使用资源，但它很礼貌，让其他线程先使用资源，线程2也可以使用资源，但它同样很绅士，也让其他线程先使用资源。就这样你让我，我让你，最后两个线程都无法使用资源。

活锁通常发生在处理事务消息中，如果不能成功处理某个消息，那么消息处理机制将回滚事务，并将它重新放到队列的开头。这样，错误的事务被一直回滚重复执行，这种形式的活锁通常是由过度的错误恢复代码造成的，因为它错误地将不可修复的错误认为是**可修复的错误**。

要解决这种活锁问题，需要在重试机制中引入随机性。例如在网络上发送数据包，如果检测到冲突，都要停止并在一段时间后重发，如果都在1秒后重发，还是会冲突，所以引入随机性可以解决该类问题。

活锁和死锁的区别在于，处于活锁的实体是在不断的改变状态，所谓的“活”，而处于死锁的实体表现为等待，活锁有可能自行解开，死锁则不能。

### 9.24 示例：封装qsort快速排序函数

### 9.25 Go语言CSP：通信顺序进程简述
Go实现了两种并发形式，第一种是大家普遍认知的多线程共享内存，其实就是 Java 或 C++ 等语言中的多线程开发；
另外一种是Go语言特有的，也是Go语言推荐的 CSP（communicating sequential processes）并发模型。

CSP 并发模型是上个世纪七十年代提出的，用于描述两个独立的并发实体通过共享 channel（管道）进行通信的并发模型。


### 9.26 示例：聊天服务器

### 9.27 高效地使用Go语言并发特性

### 9.28 使用select切换协程
select 做的就是：选择处理列出的多个通信情况中的一个，每次只会执行一个。
* 如果都阻塞了，会等待直到其中一个可以处理
* 如果多个可以处理，随机选择一个
* 如果没有通道操作可以处理并且写了 default 语句，它就会执行：default 永远是可运行的（这就是准备好了，可以执行）。

在任何一个 case 中执行 break 或者 return，select 就结束了。
select 语句实现了一种监听模式，**通常用在（无限）循环中**；在某种情况下，通过 break 语句使循环退出。


### 9.29 Go语言加密通信



## 十、Go语言反射
反射是指在程序运行期对程序本身进行访问和修改的能力。程序在编译时，变量被转换为内存地址，变量名不会被编译器写入到可执行部分。在运行程序时，程序无法获取自身的信息。

支持反射的语言可以在程序编译期将变量的反射信息，如字段名称、类型信息、结构体信息等整合到可执行文件中，并给程序提供接口访问反射信息，这样就可以在程序运行期获取类型的反射信息，并且有能力修改它们。

C/C++ 语言没有支持反射功能，只能通过 typeid 提供非常弱化的程序运行时类型信息。Java、C# 等语言都支持完整的反射功能。
Lua、JavaScript 类动态语言，由于其本身的语法特性就可以让代码在运行期访问程序自身的值和类型信息，因此不需要反射系统。

### 10.1 Go语言反射（reflection）
反射（reflection）是在 Java 出现后迅速流行起来的一种概念，通过反射可以获取丰富的类型信息，并可以利用这些类型信息做非常灵活的工作。
大多数现代的高级语言都以各种形式支持反射功能，反射是把双刃剑，功能强大但代码可读性并不理想，若非必要并不推荐使用反射。

```
// 定义一个Enum类型
type Enum int
const (
    Zero Enum = 0
)
func main() {
    // 声明一个空结构体
    type cat struct {
    }
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(cat{})
    // 显示反射类型对象的名称和种类
    fmt.Println(typeOfCat.Name(), typeOfCat.Kind())
    // 获取Zero常量的反射类型对象
    typeOfA := reflect.TypeOf(Zero)
    // 显示反射类型对象的名称和种类
    fmt.Println(typeOfA.Name(), typeOfA.Kind())
}
// 结果
cat struct
Enum int    
```

Go语言程序中对指针获取反射对象时，可以通过 reflect.Elem() 方法获取这个指针指向的元素类型，这个获取过程被称为取元素

```
func main() {
    // 声明一个空结构体
    type cat struct {
    }
    // 创建cat的实例
    ins := &cat{}
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(ins)
    // 显示反射类型对象的名称和种类
    fmt.Printf("name:'%v' kind:'%v'\n", typeOfCat.Name(), typeOfCat.Kind())
    // 取类型的元素
    typeOfCat = typeOfCat.Elem()
    // 显示反射类型对象的名称和种类
    fmt.Printf("element name: '%v', element kind: '%v'\n", typeOfCat.Name(), typeOfCat.Kind())
}
// 结果
name:'' kind:'ptr'
element name: 'cat', element kind: 'struct'
```

#### 使用反射获取结构体的成员类型
任意值通过 reflect.TypeOf() 获得反射对象信息后，如果它的类型是结构体，可以通过反射值对象 reflect.Type 的 NumField() 和 Field() 方法获得结构体成员的详细信息。


#### 结构体标签（Struct Tag）
结构体标签是对结构体字段的额外信息标签。

编写 Tag 时，必须严格遵守键值对的规则。结构体标签的解析代码的容错能力很差，一旦格式写错，编译和运行时都不会提示任何错误。


### 10.2 Go语言反射规则浅析

1. 反射第一定律：反射可以将“接口类型变量”转换为“反射类型对象”
2. 反射第二定律：反射可以将“反射类型对象”转换为“接口类型变量”
简单来说 Interface 方法和 ValueOf 函数作用恰好相反，唯一一点是，返回值的静态类型是 interface{}。

3. 反射第三定律：如果要修改“反射类型对象”其值必须是“可写的”
只要反射对象要修改它们表示的对象，就必须获取它们表示的对象的地址。

### 10.3 反射——性能和灵活性的双刃剑
使用反射的注意事项
* 能使用原生代码时，尽量避免反射操作。
* 提前缓冲反射值对象，对性能有很大的帮助。
```
func BenchmarkReflectAssign(b *testing.B) {
    v := data{Hp: 2}
    // 取出结构体指针的反射值对象并取其元素
    vv := reflect.ValueOf(&v).Elem()
    // 根据名字取结构体成员
    f := vv.FieldByName("Hp")  
    b.StopTimer()
    b.ResetTimer()
    b.StartTimer()

    //反射对象在循环外
    for i := 0; i < b.N; i++ {
        // 反射测试设置成员值性能
        f.SetInt(3)
    }

    //反射对象在循环内
    for i := 0; i < b.N; i++ {
        // 测试结构体成员的查找和设置成员的性能
        vv.FieldByName("Hp").SetInt(3)
    }
}
```

* 避免反射函数调用，和原生相比，速度能差上百倍，实在需要调用时，先提前缓冲函数参数列表，并且尽量少地使用返回值。

### 10.4 通过反射获取类型信息
```
var a int
typeOfA := reflect.TypeOf(a)     //返回的是reflect.Type类型
fmt.Println(typeOfA.Name(), typeOfA.Kind())
// 输出
int  int
```
**理解反射的类型（Type）与种类（Kind）**
在使用反射时，需要首先理解类型（Type）和种类（Kind）的区别。编程中，使用最多的是类型，但在反射中，当需要区分一个大品种的类型时，就会用到种类（Kind）。例如，需要统一判断类型中的指针时，使用种类（Kind）信息就较为方便。

类型（Type）指的是系统原生数据类型，如 int、string、bool、float32 等类型，以及使用 type 关键字定义的类型
种类（Kind）指的是对象归属的品种,在 reflect 包中定义

reflect.Type 中的 Name() 方法，返回表示类型名称的字符串,即Type。
reflect.Type 中的 Kind() 方法，返回 reflect.Kind 类型的常量。

### 10.5 通过反射获取指针指向的元素类型
可以通过 reflect.Elem() 方法获取这个指针指向的元素类型。这个获取过程被称为**取元素**，等效于对指针类型变量做了一个`*`操作
```
func main() {
    // 声明一个空结构体
    type cat struct {
    }
    // 创建cat的实例
    ins := &cat{}
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(ins)
    // 显示反射类型对象的名称和种类
    fmt.Printf("name:'%v' kind:'%v'\n",typeOfCat.Name(), typeOfCat.Kind())
    // 取类型的元素
    typeOfCat = typeOfCat.Elem()
    // 显示反射类型对象的名称和种类
    fmt.Printf("element name: '%v', element kind: '%v'\n", typeOfCat.Name(), typeOfCat.Kind())
}
```

### 10.6 通过反射获取结构体的成员类型
任意值通过 reflect.TypeOf() 获得反射对象信息后，如果它的类型是结构体，可以通过反射值对象（reflect.Type）的 NumField() 和 Field() 方法获得结构体成员的详细信
```
方法	                                        说明
Field(i int) StructField	                    根据索引，返回索引对应的结构体字段的信息。当值不是结构体或索引超界时发生宕机
NumField() int	                                返回结构体成员字段数量。当类型不是结构体或索引超界时发生宕机
FieldByName(name string) (StructField, bool)	根据给定字符串返回字符串对应的结构体字段的信息。没有找到时 bool 返回 false，当类型不是结构体或索引超界时发生宕机
FieldByIndex(index []int) StructField	        多层成员访问时，根据 []int 提供的每个结构体的字段索引，返回字段的信息。没有找到时返回零值。当类型不是结构体或索引超界时 发生宕机
FieldByNameFunc( match func(string) bool) (StructField,bool)	根据匹配函数匹配需要的字段。当值不是结构体或索引超界时发生宕机
```

**结构体字段类型**
reflect.Type 的 Field() 方法返回 `StructField` 结构,这个结构描述结构体的成员信息，通过这个信息可以获取成员与结构体的关系，如偏移、索引、是否为匿名字段、结构体标签（Struct Tag）等，而且还可以通过 StructField 的 Type 字段进一步获取结构体成员的类型信息。StructField 的结构如下：
```
type StructField struct {
    Name string          // 字段名
    PkgPath string       // 字段路径
    Type      Type       // 字段反射类型对象
    Tag       StructTag  // 字段的结构体标签
    Offset    uintptr    // 字段在结构体中的相对偏移
    Index     []int      // Type.FieldByIndex中的返回的索引值
    Anonymous bool       // 是否为匿名字段
}
```


例子
```
func main() {

    type cat struct {
        Name string
        // 带有结构体tag的字段
        Type int `json:"type" id:"100"`
    }
    ins := cat{Name: "mimi", Type: 1}
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(ins)
    // 遍历结构体所有成员
    for i := 0; i < typeOfCat.NumField(); i++ {
        // 获取每个成员的结构体字段类型
        fieldType := typeOfCat.Field(i)
        // 输出成员名和tag
        fmt.Printf("name: %v  tag: '%v'\n", fieldType.Name, fieldType.Tag)
    }
    // 通过字段名, 找到字段类型信息
    if catType, ok := typeOfCat.FieldByName("Type"); ok {
        // 从tag中取出需要的tag
        fmt.Println(catType.Tag.Get("json"), catType.Tag.Get("id"))
    }
}
```


### 10.7 Go语言结构体标签
JSON、BSON 等格式进行序列化及对象关系映射（Object Relational Mapping，简称 ORM）系统都会用到结构体标签，这些系统使用标签设定字段在处理时应该具备的特殊属性和可能发生的行为。这些信息都是静态的，无须实例化结构体，可以通过反射获取到。
结构体标签（Struct Tag）类似于C#中的特性（Attribute）。C#允许在类、字段、方法等前面添加 Attribute，然后在反射系统中可以获取到这个属性系统。例如：
```
[Conditional("DEBUG")]
public static void Message(string msg)
{
    Console.WriteLine(msg)；
}
```


结构体标签的格式
```
`key1:"value1" key2:"value2"`
```

StructTag(StructField中的字段)拥有一些方法，可以进行 Tag 信息的解析和提取，如下所示：
```
// 根据 Tag 中的键获取对应的值，例如 `key1:"value1"key2:"value2"` 的 Tag 中，可以传入“key1”获得“value1”。
func(tag StructTag)Get(key string)string

// 根据 Tag 中的键，查询值是否存在。
func(tag StructTag)Lookup(key string)(value string,ok bool)
```

### 10.8 通过反射获取值信息
反射不仅可以获取值的类型信息，还可以动态地**获取或者设置**变量的值。Go语言中使用 reflect.Value 获取和设置变量的值。
通过reflect.ValueOf返回代表反射对象值的reflect.Value对象

从反射值对象（reflect.Value）中获取值的方法：如下
为了保证 API 的精简，这些方法操作的是某一组类型范围最大的那个
```
方法名	                     说明
Interface() interface {}	将值以 interface{} 类型返回，可以通过类型断言转换为指定类型
Int() int64	                将值以 int 类型返回，所有有符号整型均可以此方式返回
Uint() uint64	            将值以 uint 类型返回，所有无符号整型均可以此方式返回
Float() float64	            将值以双精度（float64）类型返回，所有浮点数（float32、float64）均可以此方式返回
Bool() bool	                将值以 bool 类型返回
Bytes() []bytes	            将值以字节数组 []bytes 类型返回
String() string	            将值以字符串类型返回
```

例子
```
func main() {
    // 声明整型变量a并赋初值
    var a int = 1024
    // 获取变量a的反射值对象
    valueOfA := reflect.ValueOf(a)
    // 获取interface{}类型的值, 通过类型断言转换
    var getA int = valueOfA.Interface().(int)
    // 获取64位的值, 强制类型转换为int类型
    var getA2 int = int(valueOfA.Int())    // 注意返回的是int中最大的类型
    fmt.Println(getA, getA2)
}
```

### 10.9 通过反射访问结构体成员的值
反射值对象（reflect.Value）提供对结构体访问的方法

```
Field(i int) Value	                               根据索引，返回索引对应的结构体成员字段的反射值对象。当值不是结构体或索引超界时发生宕机
NumField() int	                                   返回结构体成员字段数量。当值不是结构体或索引超界时发生宕机
FieldByName(name string) Value	                   根据给定字符串返回字符串对应的结构体字段。没有找到时返回零值，当值不是结构体或索引超界时发生宕机
FieldByIndex(index []int) Value	                   多层成员访问时，根据 []int 提供的每个结构体的字段索引，返回字段的值。 没有找到时返回零值，当值不是结构体或索引超界时发生宕机
FieldByNameFunc(match func(string) bool) Value	根据匹配函数匹配需要的字段。找到时返回零值，当值不是结构体或索引超界时发生宕机
```

例子：
```
// 定义结构体
type dummy struct {
    a int
    b string
    // 嵌入字段
    float32
    bool
    next *dummy
}

func main() {
    // 值包装结构体
    d := reflect.ValueOf(dummy{
            next: &dummy{},
    })
    // 获取字段数量
    fmt.Println("NumField", d.NumField())
    // 获取索引为2的字段(float32字段)
    floatField := d.Field(2)
    // 输出字段类型
    fmt.Println("Field", floatField.Type())
    // 根据名字查找字段
    fmt.Println("FieldByName(\"b\").Type", d.FieldByName("b").Type())
    // 根据索引查找值中, next字段的int字段的值
    fmt.Println("FieldByIndex([]int{4, 0}).Type()", d.FieldByIndex([]int{4, 0}).Type())
}
```


### 10.10 判断反射值的空和有效性
反射值对象`reflect.Value`提供一系列方法进行零值和空判定
```
IsNil() bool	返回值是否为 nil。如果值类型不是通道（channel）、函数、接口、map、指针或 切片时发生 panic，类似于语言层的v== nil操作
IsValid() bool	判断值是否有效。 当值本身非法时，返回 false，例如 reflect Value不包含任何值，值为 nil 等。
```

### 10.11 通过反射修改变量的值
对于不可取地址的值不可以修改其值，所有通过 reflect.ValueOf(x) 返回的 reflect.Value 都是不可取地址的。
我们可以通过调用 `reflect.ValueOf(&x).Elem()`，来获取任意变量x对应的可取地址的 Value。

```
x := 2 
a := reflect.ValueOf(2) //不可取地址。因为 a 中的值仅仅是整数 2 的拷贝副本
b := reflect.ValueOf(x) // 不可取地址,ValueOf的参数是值穿
c := reflect.ValueOf(&x) // 不可取地址，它只是一个指针 &x 的拷贝
d := c.Elem() // 它是 c 的解引用方式生成的，指向另一个变量，因此是可取地址的

//我们可以通过调用 reflect.Value 的 CanAddr 方法来判断其是否可以被取地址：
fmt.Println(a.CanAddr()) // "false"
fmt.Println(b.CanAddr()) // "false"
fmt.Println(c.CanAddr()) // "false"
fmt.Println(d.CanAddr()) // "true"
```
每当我们通过指针间接地获取的 reflect.Value 都是可取地址的，即使开始的是一个不可取地址的 Value.



使用 reflect.Value 取元素、取地址及修改值的属性方法
```
Elem() Value	取值指向的元素值，类似于语言层*操作。当值类型不是指针或接口时发生宕机，空指针时返回 nil 的 Value
Addr() Value	对可寻址的值返回其地址，类似于语言层&操作。当值不可寻址时发生宕机
CanAddr() bool	表示值是否可寻址
CanSet() bool	返回值能否被修改。要求值可寻址且是导出的字段
```

使用 reflect.Value 值修改相关方法
在 reflect.Value 的 CanSet 返回 false 仍然修改值时会发生宕机
```
Setlnt(x int64)	     使用 int64 设置值。当值的类型不是 int、int8、int16、 int32、int64 时会发生宕机
SetUint(x uint64)	使用 uint64 设置值。当值的类型不是 uint、uint8、uint16、uint32、uint64 时会发生宕机
SetFloat(x float64)	使用 float64 设置值。当值的类型不是 float32、float64 时会发生宕机
SetBool(x bool)	    使用 bool 设置值。当值的类型不是 bod 时会发生宕机
SetBytes(x []byte)	设置字节数组 []bytes值。当值的类型不是 []byte 时会发生宕机
SetString(x string)	设置字符串值。当值的类型不是 string 时会发生宕机
```

例子：
```
var a int = 1024
// 获取变量a的反射值对象
valueOfA := reflect.ValueOf(a)
// 尝试将a修改为1(此处会发生崩溃),因为其不能被寻址
valueOfA.SetInt(1)

var a int = 1024
// 获取变量a的反射值对象(a的地址)
valueOfA := reflect.ValueOf(&a)
// 取出a地址的元素(a的值)
valueOfA = valueOfA.Elem()
// 修改a的值为1，这个可以
valueOfA.SetInt(1)
```

结构体成员中，如果字段没有被导出，则不能通过反射修改
```
type dog struct {
    legCount int
}
// 获取dog实例的反射值对象
valueOfDog := reflect.ValueOf(dog{})
// 获取legCount字段的值
vLegCount := valueOfDog.FieldByName("legCount")
// 尝试设置legCount的值(这里会发生崩溃)
vLegCount.SetInt(4)

//=========如下可以
type dog struct {
    LegCount int
}
// 获取dog实例地址的反射值对象
valueOfDog := reflect.ValueOf(&dog{})     //返回的valueOfDog代表的是dog指针类型
// 取出dog实例地址的元素
valueOfDog = valueOfDog.Elem()
// 获取legCount字段的值
vLegCount := valueOfDog.FieldByName("LegCount")
vLegCount.SetInt(4)
fmt.Println(vLegCount.Int())  //output  4
```


### 10.12 通过类型信息创建实例
当已知 reflect.Type 时，可以动态地创建这个类型的实例，实例的类型为指针。例如 reflect.Type 的类型为 int 时，创建 int 的指针
```
func main() {
    var a int
    // 取变量a的反射类型对象
    typeOfA := reflect.TypeOf(a)
    // 根据反射类型对象创建类型实例
    aIns := reflect.New(typeOfA)
    // 输出Value的类型和种类
    fmt.Println(aIns.Type(), aIns.Kind())
}
//输出
*int ptr
```

### 10.13 通过反射调用函数
如果反射值对象（reflect.Value）中值的类型为函数时，可以通过 reflect.Value 调用该函数。使用反射调用函数时，需要将参数使用反射值对象的切片 []reflect.Value 构造后传入 Call() 方法中，调用完成时，函数的返回值通过 []reflect.Value 返回。
```
func main() {
    // 将函数包装为反射值对象
    funcValue := reflect.ValueOf(add)
    // 构造函数参数, 传入两个整型值
    paramList := []reflect.Value{reflect.ValueOf(10), reflect.ValueOf(20)}
    // 反射调用函数
    retList := funcValue.Call(paramList)
    // 获取第一个返回值, 取整数值
    fmt.Println(retList[0].Int())
}
```
反射调用函数的过程需要构造大量的 reflect.Value 和中间变量，对函数参数值进行逐一检查，还需要将调用参数复制到调用函数的参数内存中。调用完毕后，还需要将返回值转换为 reflect.Value，用户还需要从中取出调用值。因此，反射调用函数的性能问题尤为突出，不建议大量使用反射函数调用。

### 10.14 Go语言inject库：依赖注入
正常情况下，对函数或方法的调用是我们的主动直接行为，在调用某个函数之前我们需要清楚地知道被调函数的名称是什么，参数有哪些类型等等。

所谓的控制反转就是将这种主动行为变成间接的行为，我们不用直接调用函数或对象，而是借助框架代码进行间接的调用和初始化，这种行为称作“控制反转”，库和框架能很好的解释控制反转的概念。

依赖注入是实现控制反转的一种方法，如果说控制反转是一种设计思想，那么依赖注入就是这种思想的一种实现，通过注入参数或实例的方式实现控制反转。如果没有特殊说明，我们可以认为依赖注入和控制反转是一个东西。

控制反转的价值在于解耦，有了控制反转就不需要将代码写死，可以让控制反转的的框架代码读取配置，动态的构建对象，这一点在 Java 的 Spring 框架中体现的尤为突出。

inject 包借助反射实现函数的注入调用
```
type S1 interface{}
type S2 interface{}
func Format(name string, company S1, level S2, age int) {
    fmt.Printf("name ＝ %s, company=%s, level=%s, age ＝ %d!\n", name, company, level, age)
}
func main() {
    //控制实例的创建
    inj := inject.New()
    //实参注入
    inj.Map("tom")
    inj.MapTo("tencent", (*S1)(nil))
    inj.MapTo("T4", (*S2)(nil))
    inj.Map(23)
    //函数反转调用
    inj.Invoke(Format)
}
```

对 struct 类型的注入
```
type S1 interface{}
type S2 interface{}
type Staff struct {
    Name    string `inject`
    Company S1     `inject`
    Level   S2     `inject`
    Age     int    `inject`
}
func main() {
    //创建被注入实例
    s := Staff{}
    //控制实例的创建
    inj := inject.New()
    //初始化注入值
    inj.Map("tom")
    inj.MapTo("tencent", (*S1)(nil))
    inj.MapTo("T4", (*S2)(nil))
    inj.Map(23)
    //实现对 struct 注入
    inj.Apply(&s)
    //打印结果
    fmt.Printf("s ＝ %v\n", s)
}
```




## 十二. Go语言编译与工具

### 12.1 go build命令
Go语言的编译速度非常快。Go 1.9 版本后默认利用Go语言的并发特性进行函数粒度的并发编译。
```
go build           //生成名为当前文件名的可执行文件
go build main.go   //生成名为main可执行文件
```


### 12.2 go clean命令
`go clean`命令可以移除当前源码包和关联源码包里面编译生成的文件

```
-n 把需要执行的清除命令打印出来，但是不执行，这样就可以很容易的知道底层是如何运行的；
-x 打印出来执行的详细命令，其实就是 -n 打印的执行版本；
-i 清除关联的安装的包和可运行文件，也就是通过go install安装的文件；
-r 循环的清除在 import 中引入的包；
-cache 删除所有go build命令的缓存
-testcache 删除当前包所有的测试结果
```

### 12.3 go run命令
`go run`不会在运行目录下生成任何文件，可执行文件被放在临时文件中被执行，工作目录被设置为当前目录。
在`go run`的后部可以添加参数，这部分参数会作为代码可以接受的命令行输入提供给程序。

go run main.go undefined? 
golang main包推荐只有一个main.go文件，这样大家就能按照习惯的方式，`go run main.go 或 go build main.go`来运行编译项目。
如果main包下有多个go文件，应该使用`go run a.go b.go c.go 或 go run *.go`来运行，编译同理。
因为mian包里，使用go run main.go，编译器只会加载main.go这个文件，不会加载main包里的其他文件，只有非main包里的文件才会通过依赖去自动加载。所以你需要输入多个文件作为参数。


### 12.4 go fmt命令
Go语言的开发团队制定了统一的官方代码风格，并且推出了 gofmt 工具（gofmt 或 go fmt）来帮助开发者格式化他们的代码到统一的风格。

gofmt 是一个 cli 程序，会优先读取标准输入，如果传入了文件路径的话，会格式化这个文件，如果传入一个目录，会格式化目录中所有 .go 文件，如果不传参数，会格式化当前目录下的所有 .go 文件。

gofmt 默认不对代码进行简化，使用-s参数可以开启简化代码功能，

gofmt 是一个独立的 cli 程序，而Go语言中还有一个`go fmt`命令，`go fmt`命令是 gofmt 的简单封装。  

### 12.5 go install命令
`go install` 只是将编译期间的中间文件放在 GOPATH 的 pkg 目录下，将编译结果放在 GOPATH 的 bin 目录下。
这个命令在内部实际上分成了两步操作：第一步是生成结果文件（相当于go build）（可执行文件或者 .a 包），第二步会把编译好的结果移到 `$GOPATH/pkg` 或者 `$GOPATH/bin`。
比如
```
go install -v mvdan.cc/gofumpt@latest
```


### 12.6 go get命令
go get命令可以借助代码管理工具通过远程拉取或更新代码包及其依赖包，并自动完成编译和安装。
`go get`第一步是下载源码包，第二步是执行go install。下载源码包的go工具会自动根据不同的域名调用不同的源码工具
参数
```
-d 只下载不安装
-u 强制使用网络去更新包和它的依赖包
-f 只有在你包含了 -u 参数的时候才有效，不让 -u 去验证 import 中的每一个都已经获取了，这对于本地 fork 的包特别有用
-fix 在获取源码之后先运行 fix，然后再去做其他的事情
-t 同时也下载需要为运行测试所需要的包
-v 显示执行的命令
```

远程包的路径格式:网站域名/作者或机构/项目名
比如：github.com/pilu/fresh

有些第三方库只是依赖库，不会生成可执行文件，那么go get 操作成功后GOPATH下的bin目录下不会有任何编译好的二进制文件。

### 12.7 go generate命令
`go generate`命令是在Go语言 1.4 版本里面新添加的一个命令，当运行该命令时，它将扫描与当前包相关的源代码文件，找出所有包含`//go:generate`的特殊注释，提取并执行该特殊注释后面的命令。

用处：执行generate后面的命令或程序，程序的输入是当前的go文件中的内容

### 12.8 go test命令
```
go help test
go test   //
go test xx_test.go
go test -v -run TestA xx_test.go
go test . -count=1  // go test的时候不缓存
go test moduleName
go test -c   //显式编译出测试文件
go test ./...     //这意味着对目录下的所有包执行操作。在当前目录+所有子目录上运行go test。


```

go test文件放置何处
```
1. go test文件与源文件放置在相同的目录,要和测试的包的包名保持一致。这种方式叫“包内测试”
    在相同的目录下，不能声明多个package，否则会报如下的错误：
    在相同的目录下，也就是在相同的package下，接口是可见的，不需要在test文件中引入待测试接口的package
2. go test文件与源文件没有放置到不同的目录下。所有的包名都叫一个名字。这种方式叫“包外测试”
    需要import导入源文件所在的包，使用接口时，也需要使用“package_name.API”的方式引用。
    go_test文件使用任意的包名即可，但是要保证是完全一致的，因为一个目录下只能有一个包名。
```

参考链接
- [28 一文告诉你测试包的包名要不要带“\_test”后缀](https://www.helloworld.net/special/jnwqhy/6823287072)


### 12.9 go pprof命令
Go语言工具链中的 go pprof 可以帮助开发者快速分析及定位各种性能问题，如 CPU 消耗、内存分配及阻塞分析。



### 12.10 与C/C++进行交互
#### 1.调用c代码
在Go语言的源代码中直接声明C语言代码是比较简单的应用情况，可以直接使用这种方法将C语言代码直接写在Go语言代码的注释中，并在注释之后紧跟`import "C"`，通过`C.xx `来引用C语言的结构和函数，如下
```
package main
/*
#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int id;
}ctx;
ctx *createCtx(int id) {
    ctx *obj = (ctx *)malloc(sizeof(ctx));
    obj->id = id;
    return obj;
}
*/
import "C"
import (
    "fmt"
)
func main() {
    var ctx *C.ctx = C.createCtx(100)
    fmt.Printf("id : %d\n", ctx.id)
}
```

#### 2.调用c++代码
首先我们新建一个 cpp 目录，并将 C++ 的代码放置在 cpp 目录下，C++ 代码需要提前编译成**动态库**（拷贝到系统库目录可以防止 go 找不到动态库路径），go 程序运行时会去链接。

```
├── cpp
│   ├── cwrap.cpp
│   ├── cwrap.h
│   ├── test.cpp
│   └── test.h
└── main.go
```
1) test.h
```
#include <stdio.h>
class Test {
public:
    void call();
};
```
2) test.cpp
```
#include "test.h"

void Test::call() {
    printf("call from c++ language\n");
}
```

3) cwrap.cpp
```
#include "cwrap.h"
#include "test.h"
void call() {
    Test ctx;
    ctx.call();
}
```

4) cwrap.h
```
#include "cwrap.h"
#include "test.h"
void call() {
    Test ctx;
    ctx.call();
}
```
5) main.go
```
package main
/*
#cgo CFLAGS: -Icpp
#cgo LDFLAGS: -lgotest
#include "cwrap.h"
*/
import "C"
func main() {
    C.call()
}
```

### 12.11 Go语言内存管理
go的内存管理工作由go运行时完成

Go语言的内存分配器采用了跟 tcmalloc 库相同的实现，是一个带内存池的分配器，底层直接调用操作系统的 mmap 等函数。
作为一个内存池，它的基本部分包括以下几部分：
* 首先，它会向操作系统申请大块内存，自己管理这部分内存。
* 然后，它是一个池子，当上层释放内存时它不实际归还给操作系统，而是放回池子重复利用。
* 接着，内存管理中必然会考虑的就是内存碎片问题，如果尽量避免内存碎片，提高内存利用率，像操作系统中的首次适应，最佳适应，最差适应，伙伴算法都是一些相关的背景知识。
* 另外，Go语言是一个支持 goroutine 这种多线程的语言，所以它的内存管理系统必须也要考虑在多线程下的稳定性和效率问题。

在多线程方面，很自然的做法就是每条线程都有自己的本地的内存，然后有一个全局的分配链，当某个线程中内存不足后就向全局分配链中申请内存。这样就避免了多线程同时访问共享变量时的加锁。


### 12.12 Go语言垃圾回收
Go语言中使用的垃圾回收使用的是标记清扫算法。进行垃圾回收时会 stoptheworld。不过在Go语言 1.3 版本中，实现了精确的垃圾回收和并行的垃圾回收，大大地提高了垃圾回收的速度，进行垃圾回收时系统并不会长时间卡住。




### 12.13 Go语言实现RSA和AES加解密

