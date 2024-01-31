## 学习资源
* [Java 经典实例(Java Cookbook),第三版](https://book.douban.com/subject/1231954/)



## 主要版本
1. **Java 7（也称为Java 1.7或Java 1.7.0）**（2011年7月28日）：引入了语言和库的改进，如try-with-resources、钻石操作符、Fork/Join框架等。
2. **Java 8**（2014年3月18日）：引入了Java的重大改进，包括Lambda表达式、流式API、新的日期和时间API（java.time包）等。
3. **Java 9**（2017年9月21日）：引入了模块系统（Java Platform Module System，JPMS）、改进的REPL（Read-Eval-Print Loop）等。

java类中的函数叫做**成员方法**，c++中的叫**成员函数**

##  入门基础及环境搭建 

### 1. Java的特点
在 Java 语言白皮书上面有这样一段话：Java 是一种简单的，强类型，编译和解释，自动内存回收，面向对象的，适用于网络应用的，平台无关的，解释的，健壮的，安全的，结构自然的，可移植的，高性能的，多线程的，动态的语言。
java不仅是门语言，**还是一个平台**。Java 平台由 Java 虚拟机（Java Virtual Machine，JVM）和 Java 应用编程接口（Application Programming Interface，API）构成。
按应用范围，Java 可分为 3 个体系，即 Java SE、Java EE 和 Java ME。
- **Java SE**（Java Platform Standard Edition，Java 平台标准版）以前称为 J2SE，它允许开发和部署在桌面、服务器、嵌入式环境和实时环境中使用的 Java 应用程序。
- **Java EE** 是在 Java SE 基础上构建的，它提供 Web 服务、组件模型、管理和通信 API，可以用来实现企业级的面向服务体系结构（Service Oriented Architecture，SOA）和 Web 2.0 应用程序。
- **Java ME** 为在移动设备和嵌入式设备（比如手机、PDA、电视机顶盒和打印机）上运行的应用程序提供一个健壮且灵活的环境。
### 2. java就业方向
- Web 开发、大数据
Java 在开发高访问、高并发、集群化的大型网站方面有很大的优势，例如人人网、去哪儿网、美团等。
- Android 开发
- 客户端开发
Java 客户端开发主要面向政府、事业单位和大型企业，如医疗、学校、OA、邮箱、投票、金融、考试、物流、矿山等信息方面的系统。
- 游戏开发


### 4. JDK环境变量配置

JDK下载与安装教程，现在一般不直接下载，而是通过IntelliJ IDE下载，而且还提供不同jdk版本的管理。

配置java环境变量
* **JAVA_HOME**
配置JDK的根目录,目的是为了方便引用。
第三方软件会引用约定好的JAVA_HOME变量, 不然, 你将不能正常使用该软件,比如JavaEE 最常用的服务器Tomcat.
* **CLASSPATH**
指定到哪里去找运行时需要用到的类代码（字节码）    
* **PATH**
指定可执行程序的位置


windows下
```
PATH-----C:\Program Files (x86)\Java\jdk1.8.0_40\bin;  bin中有Javac.exe（编译器）  Java.exe（解释器） javadoc 等
JAVA_HOME---C:\Program Files (x86)\Java\jdk1.8.0_40                 
CLASSPATH ---.;C:\Program Files (x86)\Java\jre1.8.0_40\lib       .是当前目录 是要加上的           
```


linux下
```
/etc/profile中修改环境变量
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
```


### 7. 执行流程分析

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs20230923221833.png)


字节码文件是一种和任何具体机器环境及操作系统环境无关的中间代码。它是一种二进制文件，是 Java 源文件由 Java 编译器编译后生成的目标代码文件。
Java 程序通过 JVM 可以实现跨平台特性，但 JVM 是不跨平台的。也就是说，不同操作系统之上的 JVM 是不同的，Windows 平台之上的 JVM 不能用在 Linux 平台，反之亦然。

### 8. 跨平台原理
Java 虚拟机（Java Virtual Machine，简称 JVM）是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。Java 虚拟机包括一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域。
JVM 屏蔽了与具体操作系统平台相关的信息，使 Java 程序只需生成在 Java 虚拟机上运行的目标代码（字节码），就可以在多种平台上不加修改地运行。
JVM 在执行字节码时，实际上最终还是把字节码解释成具体平台上的机器指令执行。
注意：编译的结果不是生成机器码，而是生成字节码，字节码不能直接运行，必须通过 JVM 翻译成机器码才能运行。不同平台下编译生成的字节码是一样的，但是由 JVM 翻译成的机器码却不一样。
所以，运行 Java 程序必须有 JVM 的支持，因为编译的结果不是机器码，必须要经过 JVM 的再次翻译才能执行。即使你将 Java 程序打包成可执行文件（例如 .exe），仍然需要JVM的支持。
**注意：跨平台的是 Java 程序，不是 JVM。JVM 是用 C/C++ 开发的，是编译后的机器码，不能跨平台，不同平台下需要安装不同版本的 JVM。**

**关于JVM的执行效率**
Java 推出的前几年，人们有不同的看法，解释字节码肯定比全速运行机器码慢很多，牺牲性能换来跨平台的优势是否值得？  
  
然而，JVM 有一个选项，可以将使用最频繁的字节码翻译成机器码并保存，这一过程被称为**即时编译**。这种方式确实很有效，致使微软的 .NET 平台也使用了虚拟机。  
  
现在的即时编译器已经相当出色，甚至成了传统编译器的竞争对手，某些情况下甚至超过了传统编译器，原因是 JVM **可以监控运行时信息**。例如，即时编译器可以监控使用频率高的代码并进行优化，可以消除函数调用（即“内嵌”）。  
  
但是，Java 毕竟有一些 C/C++ 没有的额外的开销，关键应用程序速度较慢。比如 Java 采用了与平台无关的绘图方式，GUI 程序（客户端程序）执行要慢；虚拟机启动也需要时间。


### 9. JVM、JRE和JDK
JDK 就是 JRE 加上一些常用工具组成的。JDK 不仅能运行已经被编译好了的 Java 程序，还能支持我们编译 Java 程序（JDK=JRE+各种工具）
- **JDK**（Java Development Kid，Java 开发开源工具包），是针对 Java 开发人员的产品，是整个 Java 的核心，包括了 Java 运行环境 JRE、Java 工具和 Java 基础类库。
- **JRE**（Java Runtime Environment，Java 运行环境）是运行 JAVA 程序所必须的环境的集合，包含 **JVM 标准实现**及 **Java 核心类库**。如果你不是一个程序员的话，这些足够你的需要。
- **JVM**（Java Virtual Machine，Java 虚拟机）是整个 Java 实现跨平台的最核心的部分，能够运行以 Java 语言写作的软件程序。
- **JRE**（Java Runtime Environment），它是你运行一个基于Java语言应用程序的所正常需要的环境。
- **Oracle JDK**，Java开发工具包的官方Oracle版本。
- **OpenJDK**，Java开发工具包的开源实现。尽管OpenJDK已经足够满足大多数的案例，但是许多程序比如Android Studio建议使用Oracle JDK，以避免UI/性能问题。

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs20230924110944.png)


### 10. java和C/C++的区别
Java 是由 C++发展而来的，保留了 C++ 的大部分内容，其编程方式类似于 C++。但 Java 的句法更清晰、规模更小、更易学。Sun 公司曾对多种程序设计语言进行分析研究，取其精华去其糟粕，最终推出了 Java。Java 从根本上解决了 C++ 的固有缺陷，形成了新一代面向对象的程序设计语言。

以下是我们整理的 Java 和 C/C++ 的 10 条不同之处。  
1. C++ 支持指针，而 Java 没有指针的概念。
2. C++ 支持多继承，而 Java 不支持多重继承，但允许一个类实现多个接口。
3. 是完全面向对象的语言，并且还取消了 C/C++ 中的结构和联合，使编译程序更加简洁
4. 自动进行无用内存回收操作，不再需要程序员进行手动删除，而 C++ 中必须由程序释放内存资源，这就增加了程序员的负担。
5. 不支持操作符重载，操作符重载则被认为是 C++ 的突出特征。
6. 允许预处理，但不支持预处理器功能，所以为了实现预处理，它提供了引入语句（import），但它与 C++ 预处理器的功能类似。
7. 不支持缺省参数函数，而 C++ 支持 。
8. C 和 C++ 不支持字符串变量，在 C 和 C++ 程序中使用“Null”终止符代表字符串的结束。在 Java 中字符串是用类对象（String 和 StringBuffer）来实现的
9. goto 语句是 C 和 C++ 的“遗物”，Java 不提供 goto 语句，虽然 Java 指定 goto 作为关键字，但不支持它的使用，这使程序更简洁易读。
10. 不支持 C++ 中的自动强制类型转换，如果需要，必须由程序显式进行强制类型转换。


### Applet小程序
在Java中，创建并运行一个Applet小程序通常需要以下步骤：

1. **编写Applet类**：
   - 创建一个Java类，该类继承自`java.applet.Applet`类，或者实现`javax.swing.JApplet`接口。这个类将成为你的Applet的主要代码文件。
   - 在这个类中，通常需要实现`init()` 方法来进行初始化工作，以及`paint()` 方法来绘制Applet的图形界面。

2. **编写HTML文件**：
   - 创建一个HTML文件，用于嵌入和运行你的Applet。
   - 在HTML文件中，使用`<applet>`标签来嵌入Applet。例如：
     ```html
     <applet code="YourAppletClassName.class" width="300" height="200">
         <!-- 这里可以添加Applet的参数 -->
     </applet>
     ```

3. **编译Java代码**：
   - 使用Java编译器（例如`javac`命令）编译你的Applet类文件，生成`.class`文件。

4. **部署Applet**：
   - 将生成的Applet类文件（.class文件）和HTML文件上传到Web服务器上，或者将它们放在Web服务器可以访问的目录中。

5. **在浏览器中运行**：
   - 打开一个支持Java Applet的Web浏览器，如早期版本的Java Applet中常用的Java插件。
   - 访问包含Applet的HTML页面的URL，浏览器将加载并运行Applet。

需要注意的是，随着Java Applet技术的逐渐过时，现代Web浏览器不再默认支持Applet。因此，为了在现代Web环境中运行Applet，可能需要特殊的配置或插件。

## 程序设计基础

### 标识符和关键字
**标识符**是为方法、变量或其他用户定义项所定义的名称。
**关键字**（或者保留字）是对编译器有特殊意义的固定单词，不能在程序中做其他目的使用。关键字具有专门的意义和用途，和自定义的标识符不同，不能当作一般的标识符来使用。
### 注释
单行、多行、文档注释
```java
/**
 * 这是一个示例类，用于演示文档注释的格式。
 */
```

文档注释只放在**类、接口、成员变量、方法**之前，因为 Javadoc 只处理这些地方的文档注释，而忽略其它地方的文档注释。
Javadoc它可以从程序源代码中抽取类、方法、成员等注释，然后形成一个和源代码配套的 API 帮助文档。
### 常量
final关键字定义常量：1.静态常量 2.成员常量 3.局部常量
```java
public class HelloWorld {
    // 1.静态常量
    public static final double PI = 3.14;
    // 2.成员常量
    final int y = 10;
    public static void main(String[] args) {
        // 3.局部常量
        final double x = 3.3;
    }
}
```

### 变量

#### 声明和初始化
- 变量是**类中**的字段，如果没有**显式地初始化**，默认状态下创建变量并默认初始值为 **0**。
- **方法**中的变量**必须显式地初始化**，否则在使用该变量时就会出错。

#### 作用域
根据作用域的不同，一般将变量分为不同的类型：
- **成员变量**
	- 实例变量
	- 静态变量（类变量）
- **局部变量**
	- 方法局部变量
	- 方法参数变量
	- 代码块局部变量


### 数据类型
1. **原始数据类型**（Primitive Data Types）： 原始数据类型是Java中的基本数据类型，它们用于存储基本的数值数据。
    - 整数类型：
        - byte：1字节，范围为-128到127。
        - short：2字节，范围为-32,768到32,767。
        - int：4字节，范围为-2^31到2^31-1。
        - long：8字节，范围为-2^63到2^63-1。
    - 浮点类型：
        - float：4字节，用于存储单精度浮点数。
        - double：8字节，用于存储双精度浮点数。
    - 字符类型：
        - char：2字节，用于存储一个16位的Unicode字符。共有 **65535** 个字符
    - 布尔类型：
        - boolean：用于表示true或false。
2. **引用数据类型**（Reference Data Types）： 引用数据类型是指那些不直接存储数据值，而是存储数据的引用或地址的数据类型。
    - 类（Class）：类是用户定义的数据类型，用于创建对象。
    - 接口（Interface）：接口定义了一组方法的规范，类可以实现接口。
    - 数组（Array）：数组是一种用于存储多个相同类型的元素的数据结构。
    - 枚举（Enum）：枚举是一种特殊的数据类型，用于表示一组常量。
    - 字符串（String）：字符串是一种引用数据类型，用于存储文本数据。
    - 自定义数据类型：开发者可以创建自定义的引用数据类型，包括类和接口，以满足特定需求。

所谓引用数据类型就是对一个对象的引用，对象包括实例和数组两种。
**实际上，引用类型变量就是一个指针，只是 Java 语言里不再使用指针这个说法。**
引用类型还有一种特殊的 null 类型，空引用（null）是 null 类型变量唯一的值。

### 数据类型转换
- 隐式转换（自动类型转换）
	- 两种数据类型彼此兼容
	- 目标类型的取值范围大于源数据类型（低级类型数据转换成高级类型数据）
	- 数值型数据的转换：byte→short→int→long→float→double。
	- 字符型转换为整型：char→int。
- 显式转换（强制类型转换）
	- 两种数据类型不兼容  double→int
	- 或目标类型的取值范围小于源类型时

### 运算符
- 优先级,总体跟c差不多
- 结合性
- 单目运算符、双目运算符和三目运算符

- 逻辑运算符（&&、||和!）
- 注意：短路与（&&）和短路或（||）能够采用最优化的计算方式，从而提高效率。在实际编程时，应该优先考虑使用短路与和短路或。
	- a&&b	短路与	
	- a||b 	短路或	
	- a|b	      逻辑或	
	- a&b     逻辑与	

- 关系运算符

- 自增和自减运算符（++和--）

- Java移位运算符、复合位赋值运算符及位逻辑运算
位逻辑运算符包含 4 个：&（与）、|（或）、~（非）和 ^（异或）
左移位运算符为`<<`， 右位移运算符为`>>`

* 三目运算符（条件运算符? :）
```
z = x>y ? x-y : x+y;
```


### 直接量（字面量）
关于字符串直接量有一点需要指出，当程序第一次使用某个字符串直接量时，Java 会使用**常量池**（constant pool）来缓存该字符串直接量，如果程序后面的部分需要用到该字符串直接量时，Java 会直接使用常量池（constantpool）中的字符串直接量。  
提示：
- 由于 String 类是一个典型的**不可变类**，因此 String 对象创建出来的就不可能改变，因此无需担心共享 String 对象会导致混乱。
- 常量池（constant pool）指的是在编译期被确定，并被保存在已编译的 .class 文件中的一些数据，它包括关于类、方法、接口中的常量，也包括字符串直接量。

## 流程控制语句

### switch case语句详解
与C语言类似，`switch`语句也支持"fall through"（贯穿）的行为，这意味着在某个`case`分支执行完毕后，控制流将继续执行后续的`case`分支，直到遇到`break`语句或`switch`语句结束。

### foreach语句的用法
```java
public static void main(String[] args) {
    String[] languages={"Java","ASP.NET","Python","C#","PHP"};
    System.out.println("现在流行的编程语言有：");
    // 使用 foreach 循环语句遍历数组
    for(String lang:languages) {
        System.out.println(lang);
    }
}
```

### break语句：跳出循环
带标签的break，解决break只能跳出一层for的问题，若没有带标签的break或goto，只能定义一个变量，在内层设置是否跳出，在外层判断是否再跳出。
```java
public class GotoDemo {
    public static void main(String[] args) {
        label: for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 8; j++) {
                System.out.println(j);
                if (j % 2 != 0) {
                    break label;    //直接跳出最外层的for
                }
            }
        }
    }
}
//输出: 0 1
```
### continue语句详解
带标签的 continue
```java
public static void main(String[] args) {
    label1: for (int x = 0; x < 5; x++) {
        for (int y = 5; y > 0; y--) {
            if (y == x) {
                continue label1;
            }
            System.out.println(x+","+y);
        }
    }
    System.out.println("Game Over!");
}
```


## 字符串处理
### 定义字符串（2种方式）
不论使用哪种形式创建字符串，字符串对象一旦被创建，其值是不能改变的，但可以使用其他变量**重新赋值**的方式进行更改。
```java
String str = "Hello Java";
String str1 = new String("Hello Java");
```

### 字符串和整型int的相互转换

```java
// string转int
Integer.parseInt(str)
Integer.valueOf(str).intValue()

//int转string
String s = String.valueOf(i);
String s = Integer.toString(i);
String s = "" + i;
```

### 字符串拼接（连接）
- 使用连接运算符“+”
- 使用 concat() 方法
- 连接其他类型数据，只要“+”运算符的一个操作数是字符串，编译器就会将另一个操作数转换成字符串形式

### 获取字符串长度（length()）
### 字符串大小写转换（toLowerCase()和toUpperCase()）
### 去除字符串中的空格（trim()）
### 截取（提取）子字符串（substring()）
### 分割字符串（split()）
### 字符串的替换（replace()、replaceFirst()和replaceAll()）

### 字符串比较（4种方法）
- equals() 方法，**逐个地比较**两个字符串的每个字符是否相同。
- equalsIgnoreCase() ， 比较时不区分大小写
- `==`, 比较两个对象引用看它们是否引用相同的实例,千万不要使用`==`运算符测试字符串的相等性
- compareTo(), 按字典顺序比较两个字符串的大小,如果按字典顺序 str 位于 otherster 参数之前，比较结果为一个负整数

### 中容易混淆的空字符串和null
- `""`是一个长度为 0 且占内存的空字符串，在内存中分配一个空间
- `null` 是空引用，表示一个对象的值，没有分配内存

### 字符串查找（3种方法）
- indexOf() 方法
- lastlndexOf() 方法
- charAt(),    字符串名.charAt(索引值)

### StringBuffer类详解
StringBuffer 类可以比 String 类更高效地处理字符串。
StringBuffer 类是可变字符串类，创建 StringBuffer 类的对象后可以随意修改字符串的内容。每个 StringBuffer 类的对象都能够存储指定容量的字符串，如果字符串的长度超过了 StringBuffer 类对象的容量，则该对象的容量会自动扩大。
**追加字符串**
StringBuffer 对象.append(String str)
**替换字符**
StringBuffer 对象.setCharAt(int index, char ch);
**反转字符串**
StringBuffer 对象.reverse();
**删除字符串**
1. deleteCharAt() 方法   StringBuffer 对象.deleteCharAt(int index);
2. delete() 方法    StringBuffer 对象.delete(int start,int end);


### String、StringBuffer和StringBuilder类的区别
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs20230924160956.png)
- String 是 Java 中基础且重要的类，被声明为 final class，是不可变字符串。因为它的不可变性，所以拼接字符串时候会产生很多无用的中间对象，如果频繁的进行这样的操作对性能有所影响。  
- StringBuffer 就是为了解决大量拼接字符串时产生很多中间对象问题而提供的一个类。它提供了 append 和 add 方法，可以将字符串添加到已有序列的末尾或指定位置，它的本质是一个线程安全的可修改的字符序列。  
- StringBuilder 是 JDK1.5 发布的，它和 StringBuffer 本质上没什么区别，就是去掉了保证线程安全的那部分，减少了开销。

### 正则表达式
java.util.regex 是一个用正则表达式所订制的模式来对字符串进行匹配工作的类库包。它包括两个类：**Pattern** 和 **Matcher**。

Pattern 对象是正则表达式编译后在内存中的表示形式，因此，正则表达式字符串必须先被编译为 Pattern 对象
然后再利用该 Pattern 对象创建对应的 Matcher 对象。执行匹配所涉及的状态保留在 Matcher 对象中，多个 Matcher 对象可共享同一个 Pattern 对象。
```java
public class FindGroup {
    public static void main(String[] args) {
        // 使用字符串模拟从网络上得到的网页源码
        String str = "我想找一套适合自己的JAVA教程，尽快联系我13500006666" + "交朋友，电话号码是13611125565" + "出售二手电脑，联系方式15899903312";
        // 创建一个Pattern对象，并用它建立一个Matcher对象
        // 该正则表达式只抓取13X和15X段的手机号
        Matcher m = Pattern.compile("((13\\d)|(15\\d))\\d{8}").matcher(str);
        while (m.find()) {
            System.out.println(m.group());
        }
    }
}
```

## 数字和日期处理
### Math类的常用方法
Math 类封装了常用的数学运算，提供了基本的数学操作，如指数、对数、平方根和三角函数等
### 生成随机数（random()和Random类）
在 Java 中要生成一个指定范围之内的随机数字有两种方法：一种是调用 Math 类的 random() 方法，一种是使用 Random 类。

Random 类提供了丰富的随机数生成方法，可以产生 boolean、int、long、float、byte 数组以及 double 类型的随机数，这是它与 random() 方法最大的不同之处。random() 方法只能产生 double 类型的 0~1 的随机数。

### 数字格式化
字的格式在解决实际问题时使用非常普遍，这时可以使用 DecimalFormat 类对结果进行格式化处理。例如，将小数位统一成 2 位，不足 2 位的以 0 补齐。
DecimalFormat 是 NumberFormat 的一个子类，用于格式化十进制数字。DecimalFormat 类包含一个模式和一组符号
### 大数字运算（BigInteger类和BigDecimal类）
在运算中 **BigInteger** 类型可以准确地表示任何大小的整数值。
**BigDecimal** 类支持任何精度的浮点数，可以用来精确计算货币值。


### 时间日期的处理：Java Date类、Calendar类详解
**Date** 类主要封装了系统的日期和时间的信息
**Calendar** 类则会**根据系统的日历来解释 Date 对象**
Date 类表示系统特定的时间戳，可以精确到毫秒。Date 对象表示时间的默认顺序是星期、月、日、小时、分、秒、年。

Calendar 类是一个抽象类，它为特定瞬间与 YEAR、MONTH、DAY_OF—MONTH、HOUR 等日历字段之间的转换提供了一些方法，并为操作日历字段（如获得下星期的日期） 提供了一些方法。
创建 Calendar 对象不能使用 new 关键字，因为 Calendar 类是一个抽象类，但是它提供了一个 **getInstance**() 方法来获得 Calendar类的对象。getInstance() 方法返回一个 Calendar 对象，其日历字段已由当前日期和时间初始化。


### 日期格式化（DateFormat类和SimpleDateFormat类）
格式化日期表示将日期/时间格式转换为预先定义的日期/时间格式。例如将日期“Fri May 18 15:46:24 CST2016” 格式转换为 “2016-5-18 15:46:24 星期五”的格式。

DateFormat 是日期/时间格式化子类的抽象类，它以与语言无关的方式格式化并解析日期或时间。日期/时间格式化子类（如 SimpleDateFormat）允许进行格式化（也就是日期→文本）、解析（文本→日期）和标准化日期。
在创建 DateFormat 对象时不能使用 new 关键字，而应该使用 DateFormat 类中的静态方法 getDateInstance()


如果使用 DateFormat 类格式化日期/时间并不能满足要求，那么就需要使用 DateFormat 类的子类——SimpleDateFormat。


## 内置包装类
### 包装类、装箱和拆箱
在 Java 中不能定义基本类型对象，**为了能将基本类型视为对象处理**，并能连接相关方法，Java 为每个基本类型都提供了包装类，如 int 型数值的包装类 Integer，boolean 型数值的包装类 Boolean 等。这样便可以把这些基本类型转换为对象来处理了。
在 Java 的设计中提倡一种思想，即一切皆对象。但是从数据类型的划分中，我们知道 Java 中的数据类型分为基本数据类型和引用数据类型，但是基本数据类型怎么能够称为对象呢？于是 Java 为每种基本数据类型分别设计了对应的类，称之为**包装类（Wrapper Classes）**

基本数据类型转换为包装类的过程称为**装箱**，例如把 int 包装成 Integer 类的对象；
包装类变为基本数据类型的过程称为**拆箱**，例如把 Integer 类的对象重新简化为 int。

手动实例化一个包装类称为**手动拆箱装箱**。Java 1.5 版本之前必须手动拆箱装箱，之后可以**自动拆箱装箱**，也就是在进行基本数据类型和对应的包装类转换时，系统将自动进行装箱及拆箱操作，不用在进行手工操作，为开发者提供了更多的方便
```java
int m = 500;
Integer obj = new Integer(m);  // 手动装箱
int n = obj.intValue();        // 手动拆箱

int m = 500;
Integer obj = m;  // 自动装箱
int n = obj;      // 自动拆箱
```

**包装类的应用**
1. 将字符串转换为数值类型
```java
String str1 = "30";
String str2 = "30.3";
// 将字符串变为int型
int x = Integer.parseInt(str1);
// 将字符串变为float型
float f = Float.parseFloat(str2);
```
2. 整数转换为字符串
```java
int m = 500;
String s = Integer.toString(m);
```
### Object类详解
- Object 是 Java 类库中的一个特殊类，也**是所有类的父类**。
- 由于 Java 所有的类都是 Object 类的子类，所以任何 Java 对象都可以调用 Object 类的方法。
- 因为 Object 类**可以接收任意的引用数据类型**，所以在很多的类库设计上都**采用 Object 作为方法的参数**，这样操作起来会比较方便。

| 方法  |说明   |
|---|---|
|Object clone()|创建与该对象的类相同的新对象|
|boolean equals(Object)|比较两对象是否相等|
|void finalize()|当垃圾回收器确定不存在对该对象的更多引用时，对象垃圾回收器调用该方法|
|Class getClass()|返回一个对象运行时的实例类|
|int hashCode()|返回该对象的散列码值|
|void notify()|激活等待在该对象的监视器上的一个线程|
|void notifyAll()|激活等待在该对象的监视器上的全部线程|
|String toString()|返回该对象的字符串表示|
|void wait()|在其他线程调用此对象的 notify() 方法或 notifyAll() 方法前，导致当前线程等待|

**toString() 方法**
当程序输出一个对象或者把某个对象和字符串进行连接运算时，系统会自动调用该对象的 toString() 方法返回该对象的字符串表示
Object 类的 toString() 方法返回“运行时类名@十六进制哈希码”格式的字符串，但很多类都**重写**了 Object 类的 toString() 方法，用于返回可以表述该对象信息的字符串。

**equals() 方法**
- `==` 运算符是比较两个引用变量是否指向同一个实例
- `equals()` 方法是比较两个对象的内容是否相等，通常字符串的比较只是关心**内容是否相等**

**getClass() 方法**
返回对象所属的类，是一个 **Class** 对象。通过 Class 对象可以获取该类的各种信息，包括类名、父类以及它所实现接口的名字等。


### Integer、Float、Double、Byte
Integer/Float/Double 类在对象中包装了一个基本类型 int 的值。Integer 类对象包含一个 int 类型的字段。此外，该类提供了多个方法，能在 int 类型和 String 类型之间互相转换，还提供了处理 int 类型时非常有用的其他一些常量和方法。

###  Number类
Number 是一个抽象类，也是一个超类（即父类）。Number 类属于 java.lang 包，所有的包装类（如 Double、Float、Byte、Short、Integer 以及 Long）都是抽象类 Number 的子类。
抽象类不能直接实例化，而是必须实例化其具体的子类。如下代码演示了 Number 类的使用：
```java
Number num = new Double(12.5);
System.out.println("返回 double 类型的值：" + num.doubleValue());
System.out.println("返回 int 类型的值：" + num.intValue());
System.out.println("返回 float 类型的值：" + num.floatValue());
```
### Character类
### Boolean类

### System类详解
System 类位于 java.lang 包，代表当前 Java 程序的**运行平台**，系统级的很多属性和控制方法都放置在该类的内部。由于该类的构造方法是 private 的，所以无法创建该类的对象，也就是无法实例化该类。
System 类提供了一些类变量和类方法，允许直接通过 System 类来调用这些类变量和类方法。

System 类中提供了一些系统级的操作方法，常用的方法有 arraycopy()、currentTimeMillis()、exit()、gc() 和 getProperty()。


## 数组处理
### 数组简介：数组是什么？
**注意：跟c、c++中的内存模型差异很大**

在计算机语言中数组是非常重要的集合类型，大部分计算机语言中数组具有如下三个基本特性：
1.  一致性：数组只能保存相同数据类型元素，元素的数据类型可以是任何相同的数据类型。
2. 有序性：数组中的元素是有序的，通过下标访问。
3. 不可变性：数组一旦初始化，则长度（数组中元素的个数）不可变。

**数组也是一种数据类型**
int[] 类型是一种**引用类型**，创建 int[] 类型的对象也就是创建数组，需要使用创建数组的语法。
int[] 就是一种数据类型，与 int 类型、String 类型相似，一样可以使用该类型来定义变量，也可以使用该类型进行类型转换等。

java获取数组长度,使用数组对象的 **length** 属性

在Java中，数组的内存空间通常是分配在**堆上**的，而不是栈上。Java的堆内存用于存储对象和数据结构，而数组是对象的一种，因此它们通常存储在堆内存中。
堆内存的主要特点包括：
1. **动态分配**：堆内存的分配是动态的，可以在运行时根据需要动态分配和释放内存空间。
2. **对象生命周期**：堆内存中的对象的生命周期通常由垃圾收集器（Garbage Collector）来管理。垃圾收集器负责识别不再被引用的对象，并释放其占用的内存。
3. **长期存储**：堆内存中的对象通常在整个应用程序生命周期内保持不变，直到垃圾收集器将其标记为不再需要。
局部变量，如基本数据类型和对象的引用，通常存储在栈上，而不是实际的对象数据。
### 一维数组的定义、赋值和初始化
尽管数组可以存储一组基本数据类型的元素，但是数组整体属于**引用数据类型**
```java
// 1.数组声明
int[] score;      
int score[10];    // 错误，在声明数组时不需要规定数组的长度

// 2.分配空间
arrayName = new type[size];    // 数组名 = new 数据类型[数组长度];

//3.创建并初始化
//声明了数组，只是得到了一个存放数组的变量，并没有为数组元素分配内存空间，不能使用
int[] arr = new int[5]; //声明并分配一个长度为 5 的 int 类型数组
```
在创建数组时，java会把内存自动初始化，比如int型数组，**内存都会被初始化成0**。

### 到底有没有多维数组
Java 中没有多维数组的概念，**从数组底层的运行机制上来看 Java 没有多维数组**，但是 Java 提供了支持多维数组的语法，可以实现多维数组的功能。

Java 语言里的数组类型是引用类型，因此数组变量其实是一个引用，这个引用指向真实的数组内存。数组元素的类型也可以是引用，如果数组元素的引用再次指向真实的数组内存，这种情形看上去很像多维数组。

二维数组是一维数组，其数组元素是一维数组。三维数组也是一维数组，其数组元素是二维数组…… 从这个角度来看，Java 语言里没有多维数组。

下面程序示范了如何把二维数组当成一维数组处理。
```java
public class TwoDimensionTest {
    public static void main(String[] args) {
        // 定义一个二维数组
        int[][] a;
        // 把a当成一维数组进行初始化，初始化a是一个长度为4的数组
        // a数组的数组元素又是引用类型
        a = new int[4][];
        // 把a数组当成一维数组，遍历a数组的每个数组元素
        for (int i = 0, len = a.length; i < len; i++) {
            System.out.println(a[i]); // 输出 null null null null
        }
        // 初始化a数组的第一个元素
        a[0] = new int[2];
        // 访问a数组的第一个元素所指数组的第二个元素
        a[0][1] = 6;
        // a数组的第一个元素是一个一维数组，遍历这个一维数组
        for (int i = 0, len = a[0].length; i < len; i++) {
            System.out.println(a[0][i]); // 输出 0 6
        }
    }
}
```
**内存示意图：**
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230925170604.png)

### Arrays工具类
Arrays 类是一个工具类，其中包含了数组操作的很多方法。这个 Arrays 类里均为 static 修饰的方法
- 1）int **binarySearch**(type[] a, type key)
使用二分法查询 key 元素值在 a 数组中出现的索引，如果 a 数组不包含 key 元素值，则返回负数。前提：已排序好的数组
- 2）int **binarySearch**(type[] a, int fromIndex, int toIndex, type key)
只搜索 a 数组中 fromIndex 到 toIndex 索引的元素。
- 3）type[] **copyOf**(type[] original, int length)
把 original 数组复制成一个新数组，其中 length 是新数组的长度。
- 4）type[] **copyOfRange**(type[] original, int from, int to)
只复制 original 数组的 from 索引到 to 索引的元素。
- 5）boolean **equals**(type[] a, type[] a2)
如果 a 数组和 a2 数组的长度相等，而且 a 数组和 a2 数组的数组元素也一一相同，该方法将返回 true。
- 6）void **fill**(type[] a, type val)
该方法将会把 a 数组的所有元素都赋值为 val。
- 7）void **fill**(type[] a, int fromIndex, int toIndex, type val)
仅仅将 a 数组的 fromIndex 到 toIndex 索引的数组元素赋值为 val。
- 8）void **sort**(type[] a)
该方法对 a 数组的数组元素进行排序。
- 9）void **sort**(type[] a, int fromIndex, int toIndex)
仅仅对 fromIndex 到 toIndex 索引的元素进行排序。
- 10）String **toString**(type[] a)
该方法将一个数组转换成一个字符串。该方法按顺序把多个数组元素连缀在一起，多个数组元素使用英文逗号,和空格隔开。

### 数组和字符串的相互转换

**字符串转换为数组**
```java
// 1.toCharArray()
String str = "123abc";
char[] arr = str.toCharArray();    // char数组
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);    // 输出1 2 3 a b c
}

// 2.split()
String str = "123abc";
String[] arr = str.split("");
for (int i = 0; i < arr.length; i++) { // String数组
    System.out.print(arr[i]); // 输出 1 2 3 a b c
}

//3.getBytes()
String str = "123abc" ;  
byte [] arr = str.getBytes();
```

**数组转换为字符串**
```java
//1.copyValueOf
char[] arr = { 'a', 'b', 'c' };
String string = String.copyValueOf(arr);
System.out.println(string); // 输出abc

//2.StringBuffer
String[] arr = { "123", "abc" };
StringBuffer sb = new StringBuffer();
for (int i = 0; i < arr.length; i++) {
    sb.append(arr[i]); // String并不拥有append方法，所以借助 StringBuffer
}
String sb1 = sb.toString();
System.out.println(sb1); // 输出123abc
```



### 比较两个数组是否相等（equals()）

数组相等的条件不仅要求数组元素的个数必须相等，而且要求对应位置的元素也相等。Arrays 类提供了 **equals**() 方法比较整个数组

### 复制数组的4种方法

在 Java 中实现数组复制分别有以下 4 种方法：
- Arrays 类的 copyOf() 方法
	- 目标数组如果已经存在，将会被重构。
- Arrays 类的 copyOfRange() 方法
	- 目标数组如果已经存在，将会被重构。
- System 类的 arraycopy() 方法
	- 目标数组必须**已经存在**，且不会被重构，相当于**替换**目标数组中的部分元素。
- Object 类的 clone() 方法
	- clone() 方法的返回值是 Object 类型，要使用强制类型转换为适当的类型,`int newScores[] = (int[]) scores.clone();`


## 类和对象
对象的概念及面向对象的三个基本特征: 封装、继承、多态



### 类的属性：成员变量的定义和声明
可以在声明成员变量的同时对其进行初始化，如果声明成员变量时没有对其初始化，则系统会使用**默认值初始化成员变量，即默认0值**。
- 通过`this.`来访问属性和方法
- `this()`用来访问本类的构造方法,构造方法和类名相同


### 创建对象详解（显式创建和隐含创建）
无论釆用哪种方式创建对象，Java 虚拟机在创建一个对象时都包含以下步骤：
- 给对象分配内存。
- 将对象的实例变量自动初始化为其变量类型的默认值。
- 初始化对象，给实例变量赋予正确的初始值。

**显式创建对象**
1. 使用 new 关键字创建对象
2. 使用反射，调用 java.lang.Class 或者 java.lang.reflect.Constuctor 类的 newlnstance() 实例方法
3. 调用对象的 clone() 方法
4. 调用 java.io.ObjectlnputStream 对象的 readObject() 方法

**隐含创建对象**
1）String strName = "strValue"，其中的“strValue”就是一个 String 对象，由 Java 虚拟机隐含地创建。
2）字符串的“+”运算符运算的结果为一个新的 String 对象，示例如下：
3）当 Java 虚拟机**加载一个类时**，会隐含地**创建**描述这个类的 Class 实例。
提示：类的加载是指把类的 .class 文件中的二进制数据读入内存中，把它存放在运行时数据区的方法区内，然后在堆区创建一个 java.lang.Class 对象，用来封装类在方法区内的数据结构。


### new运算符深入剖析
不同方式定义字符串时堆和栈的变化：
1. `String a;` 只是在栈中创建了一个 String 类的对象引用变量  a。
2. `String a = "C语言中文网";`在栈中创建一个 String 类的对象引用变量  a，然后查找栈中有没有存放“C语言中文网”，如果有则直接指向“C语言中文网"，如果没有，则将”C语言中文网“存放进栈，再指向。
3. `String a = new String("C语言中文网");`不仅在栈中创建一个 String 类的对象引用变量 a，同时也在堆中开辟一块空间存放新建的 String 对象“C语言中文网”，变量 a 指向堆中的新建的 String 对象”C语言中文网“。

### 匿名对象
```java
new Person("张三", 30).tell(); // 匿名对象
```
与之前声明的对象不同，此处没有任何栈内存引用它，所以此对象使用一次之后就等待被 GC（垃圾收集机制）回收。
### 对象的销毁
在清除对象时，由系统自动进行内存回收，不需要用户额外处理。Java 语言的内存自动回收称为**垃圾回收（Garbage Collection）机制**，简称 GC。

在 Java 的 Object 类中还提供了一个 protected 类型的 **finalize**() 方法，因此任何 Java 类都可以覆盖这个方法，在这个方法中进行释放对象所占有的相关资源的操作。

在 Java 虚拟机的堆区，每个对象都可能处于以下三种状态之一。
1）**可触及状态**：当一个对象被创建后，只要程序中还有引用变量引用它，那么它就始终处于可触及状态。
2）**可复活状态**：当程序不再有任何引用变量引用该对象时，该对象就进入可复活状态。在这个状态下，垃圾回收器会准备释放它所占用的内存，在释放之前，会调用它及其他处于可复活状态的对象的 **finalize**() 方法，这些 finalize() 方法有可能使该对象重新转到可触及状态。
3）**不可触及状态**：当 Java 虚拟机执行完所有可复活对象的 finalize() 方法后，如果这些方法都没有使该对象转到可触及状态，垃圾回收器才会真正回收它占用的内存。

注意：调用 System.gc() 或者 Runtime.gc() 方法也不能保证回收操作一定执行，它只是提高了 Java 垃圾回收器尽快回收垃圾的可能性。


### 中的空对象（null）是怎么回事？
产生空对象主要有以下两种可能性：
程序员自己忘记了实例化，所以程序员必须防止这种情况发生，应该仔细检查自己的代码，为自己创建的所有对象进行实例化并初始化。
空对象是其它地方传递过来的，需要通过判断对象是否为 null 进行避免。


### 注释：类、方法和字段注释
1. 类注释
```java
/**
 * @projectName（项目名称）: project_name
 * @package（包）: package_name.file_name
 * @className（类名称）: type_name
 * @description（类描述）: 一句话描述该类的功能
 * @author（创建人）: user 
 * @createDate（创建时间）: datetime  
 * @updateUser（修改人）: user 
 * @updateDate（修改时间）: datetime
 * @updateRemark（修改备注）: 说明本次修改内容
 * @version（版本）: v1.0
 */
```
2. 方法注释
```java
/**
 * @param num1: 加数1
 * @param num2: 加数2
 * @return: 两个加数的和
 */
public int add(int num1,int num2) {
    int value = num1 + num2;
    return value;
}
```
3. 字段注释
```java
/**
 * 用户名
 */
public String name;
```

### 访问控制修饰符详解（public、 private、protected 和 friendly）
 **默认friendly同一个包可访问**
类的访问控制符只能是空或者 public，方法和属性的访问控制符有 4 个，分别是 public、 private、protected 和 friendly，其中 **friendly** 是一种没有定义专门的访问控制符的默认情况。

|访问范围|private|friendly(默认)|protected|public|
|---|---|---|---|---|
|同一个类|**可访问**|可访问|可访问|可访问|
|同一包中的其他类|不可访问|**可访问**|可访问|可访问|
|不同包中的子类|不可访问|不可访问|**可访问**|可访问|
|不同包中的非子类|不可访问|不可访问|不可访问|**可访问** |


### static关键字
在访问非静态方法时，需要通过实例对象来访问
而在访问静态方法时，可以直接访问，也可以通过类名来访问，还可以通过实例化对象来访问
静态方法只能访问静态变量
在 C/C++ 中 static 是可以作用域局部变量的，但是在 Java 中切记，Java 语法规定 **static 是不允许用来修饰局部变量**。

**静态代码块**
Java 类中的 static{ } 代码块，主要用于初始化类，**为类的静态变量赋初始值**，提升程序性能。
静态代码块的特点如下：
- Java 虚拟机在**加载类时执行静态代码块**，所以很多时候会将一些只需要进行一次的初始化操作都放在 static 代码块中进行。
- 如果类中包含多个静态代码块，则 Java 虚拟机将按它们在类中**出现的顺序**依次执行它们，每个静态代码块只会被执行一次。
- 静态代码块与静态方法一样，不能直接访问类的实例变量和实例方法，而需要通过类的实例对象来访问。


例子：
```java
public class StaticCode {
    public static int count = 0;
    // 非静态代码块
    {
        count++;
        System.out.println("非静态代码块 count=" + count);
    }
    static {
        count++;
        System.out.println("静态代码块1 count=" + count);
    }
    static {
        count++;
        System.out.println("静态代码块2 count=" + count);
    }
    public static void main(String[] args) {
        System.out.println("*************** StaticCode1 执行 ***************");
        StaticCode sct1 = new StaticCode();
        System.out.println("*************** StaticCode2 执行 ***************");
        StaticCode sct2 = new StaticCode();
    }
}

//output：
静态代码块1 count=1
静态代码块2 count=2
*************** StaticCode1 执行 ***************
非静态代码块 count=3
*************** StaticCode2 执行 ***************
非静态代码块 count=4
```
### import static静态导入
用一句话来归纳 `import` 和 `import static` 的作用，使用 import 可以省略写包名，而使用 import static **可以省略类名**。
例子：
```java
import static java.lang.System.*;
import static java.lang.Math.*;
public class StaticImportTest {
    public static void main(String[] args) {
        // out是java.lang.System类的静态成员变量，代表标准输出
        // PI是java.lang.Math类的静态成员变量，表示π常量
        out.println(PI);
        // 直接调用Math类的sqrt静态方法，返回256的正平方根
        out.println(sqrt(256));
    }
}
```

### final修饰符详解
使用 final 关键字声明类、变量和方法需要注意以下几点：
- final 用在**变量**的前面表示变量的值不可以改变，此时该变量可以被称为常量。
- final 用在**方法**的前面表示方法不可以被重写
- final 用在**类**的前面表示该类不能有子类，即该类不可以被继承。
- final 修饰**引用类型变量**, 只保证这个引用类型变量所引用的地址不会改变，即一直引用同一个对象，但这个对象完全可以发生改变

### 方法的可变参数
```java
public void print(String...names) {
	int count = names.length;    // 获取总个数
	System.out.println("本次参加考试的有"+count+"人，名单如下：");
	for(int i = 0;i < names.length;i++) {
		System.out.println(names[i]);
	}
}
```
### 构造方法
如果在类中没有定义任何一个构造方法，则 Java 会自动为该类生成一个默认的构造方法。
默认的构造方法不包含任何参数，并且方法体为空。如果类中显式地定义了一个或多个构造方法，则 Java 不再提供默认构造方法。
### 析构方法
对象的 **finalize**() 方法具有如下特点：
- 垃圾回收器是否会执行该方法以及何时执行该方法，都是不确定的。
- finalize() 方法有可能使用对象复活，使对象恢复到可触及状态。
- 垃圾回收器在执行 finalize() 方法时，如果出现异常，垃圾回收器不会报告异常，程序继续正常运行。
- 技巧：由于 finalize() 方法的不确定性，所以在程序中可以调用 System.gc() 或者 Runtime.gc() 方法提示垃圾回收器尽快执行垃圾回收操作。
### 包（package）详解
包允许将类组合成较小的单元（类似文件夹），它基本上隐藏了类，并避免了名称上的冲突。包允许在更广泛的范围内保护类、数据和方法。你可以在包内定义类，而在包外的代码不能访问该类。这使你的类相互之间有隐私，但不被其他世界所知。

包的 3 个作用如下：
1. 区分相同名称的类。
2. 能够较好地管理大量的类。
3. 控制访问范围。

**包定义**
- package 语句应该放在源文件的第一行，在每个源文件中只能有一个包定义语句
- 如果在源文件中没有定义包，那么类、接口、枚举和注释类型文件将会被放进一个无名的包中，也称为**默认包。**在实际企业开发中，通常不会把类定义在默认包下。

**包导入**
- 如果使用不同包中的其它类，需要使用该类的全名（包名+类名）
- 为了简化编程，可使用 import，import 语句位于 package 语句之后，类定义之前
- 使用星号 `*` 可能会增加编译时间，特别是引入多个大包时，所以明确的导入你想要用到的类是一个好方法，需要注意的是使用星号对运行时间和类的大小没有影响
- 默认为所有源文件导入 java.lang 包下的所有类，因此在使用 String、System 类时都无须使用 import 语句来导入这些类


### 模块
  
在Java 9中引入了模块系统，它允许开发者将代码和依赖项组织成更清晰、更可维护的单元。Java模块系统引入了`module-info.java`文件，其中定义了模块的信息，包括模块的名称、依赖关系以及对外提供的公共接口。

一个Java模块可以包含若干个包，并且可以声明对其他模块的依赖关系。这种模块化的设计使得应用程序的开发、维护和部署更加简单，并且有助于确保代码的安全性和可靠性。

通过模块系统，开发者可以使用`requires`关键字指定模块依赖关系，并使用`exports`关键字指定哪些包是公开的。这种方式可以限制模块之间的访问权限，使得代码更加模块化和安全。

## 继承和多态
### 类的封装
实现封装的具体步骤如下：
1. 修改属性的可见性来限制对属性的访问，一般设为 private。
2. 为每个属性创建一对赋值（setter）方法和取值（getter）方法，一般设为 public，用于属性的读写。
3. 在赋值和取值方法中，加入属性控制语句（对属性值的合法性进行判断）。

### 继承（extends）
- 在 Java 中，所有的继承都是**公有继承**， 而没有 C++ 中的私有继承和保护继承，c++默认是私有继承。
- 类的继承不改变类成员的访问权限，也就是说，如果父类的成员是公有的、被保护的或默认的，它的子类仍具有相应的这些特性，并且子类不能获得父类的构造方法。
- Java 不支持多继承，只允许一个类直接继承另一个类，即子类只能有一个直接父类
- 由于子类不能继承父类的构造方法，因此，如果要调用父类的构造方法，可以使用 super 关键字
- super 可以用来访问父类的构造方法`super()`、普通方法和属性`super.`

super和this的区别
- this 指的是当前对象的引用，super 是当前对象的父对象的引用。
### 对象类型转换
对象类型转换，是指**存在继承关系的对象**，不是任意类型的对象。当对不存在继承关系的对象进行强制类型转换时，会抛出 Java 强制类型转换（java.lang.ClassCastException）异常。
Java 中引用类型之间的类型转换（前提是两个类是父子关系）主要有两种，分别是**向上转型**（upcasting）和**向下转型**（downcasting）。

**向上转型**
- 使用向上转型可以调用父类类型中的所有成员，不能调用子类类型中特有成员
- 实现多态的条件之一
```java
fatherClass obj = new sonClass();
```

**向下转型**
- 向下转型可以调用子类类型中所有的成员,但是如果父类引用对象是父类本身，那么在向下转型的过程中是不安全的，编译不会出错，但是运行时会出现我们开始提到的 Java 强制类型转换异常，一般使用 instanceof 运算符来避免出此类错误
- 必须进行强制类型转换
```java
sonClass obj = (sonClass) fatherClass;
```

### 方法重载、重写
**重载**：
- 方法重载的要求是两同一不同：同一个类中方法名相同，参数列表不同
**重写**
- 在子类中如果创建了一个与父类中相同名称、相同返回值类型、相同参数列表的方法，只是方法体中的实现不同，以实现不同于父类的功能，这种方式被称为方法重写（override），又称为方法覆盖。
- 可以使用 `@Override` 注解来标识，以让编译器进行检查
### 多态性
实现多态有 3 个必要条件：继承、重写和向上转型

**静态绑定与动态绑定**

JVM 的方法调用指令有五个，分别是：

invokestatic：调用静态方法；
invokespecial：调用实例构造器`<init>`方法、私有方法和父类方法；
invokevirtual：调用虚方法；
invokeinterface：调用接口方法，运行时确定具体实现；
invokedynamic：运行时动态解析所引用的方法，然后再执行，用于支持动态类型语言。

其中，invokestatic 和 invokespecial **用于静态绑定**，invokevirtual 和 invokeinterface **用于动态绑定**。可以看出，动态绑定主要应用于虚方法和接口方法。

静态绑定在编译期就已经确定，这是因为静态方法、构造器方法、私有方法和父类方法可以唯一确定。这些方法的**符号引用在类加载的解析阶段就会解析成直接引用**。因此这些方法也被称为非虚方法，与之相对的便是虚方法。

虚方法的方法调用与方法实现的关联（也就是分派）有两种，一种是在编译期确定，被称为**静态分派**，比如方法的重载；一种是在运行时确定，被称为**动态分派**，比如方法的覆盖。对象方法基本上都是虚方法。


**多态的实现**
虚拟机栈中会存放当前方法调用的栈帧，在栈帧中，存储着局部变量表、操作栈、动态连接 、返回地址和其他附加信息。多态的实现过程，就是方法调用动态分派的过程，**通过栈帧的信息去找到被调用方法的具体实现**，然后使用这个具体实现的直接引用完成方法调用。

以 invokevirtual 指令为例，在执行时，大致可以分为以下几步：
1. 先从操作栈中找到对象的实际类型 class；
2. 找到 class 中与被调用方法签名相同的方法，如果有访问权限就返回这个方法的直接引用，如果没有访问权限就报错 java.lang.IllegalAccessError ；
3. 如果第 2 步找不到相符的方法，**就去搜索 class 的父类**，按照继承关系自下而上依次执行第 2 步的操作；
4. 如果第 3 步找不到相符的方法，就报错 java.lang.AbstractMethodError ；

可以看到，如果子类覆盖了父类的方法，则在多态调用中，动态绑定过程会首先确定实际类型是子类，从而先搜索到子类中的方法。这个过程便是方法覆盖的本质。

实际上，**商用虚拟机**为了保证性能，通常会使用**虚方法表和接口方法表**，而不是每次都执行一遍上面的步骤。以虚方法表为例，**虚方法表在类加载的解析阶段填充完成**，其中存储了所有方法的**直接引用**。也就是说，动态分派在填充虚方法表的时候就已经完成了。

在子类的虚方法表中，如果子类覆盖了父类的某个方法，则这个方法的直接引用指向子类的实现；而子类没有覆盖的那些方法，比如 Object 的方法，直接引用指向父类或 Object 的实现。

### instanceof关键字详解
1）声明一个 class 类的对象，判断 obj 是否为 **class 类**的实例对象（很普遍的一种用法）
2）声明一个 class 接口实现类的对象 obj，判断 obj 是否为 **class 接口**实现类的实例对象
3）obj 是 class 类的直接或间接**子类**

### 抽象（abstract）类
抽象类的定义和使用规则如下：
1. 抽象类和抽象方法都要使用 abstract 关键字声明。
2. 如果一个方法被声明为抽象的，那么这个类也必须声明为抽象的。而一个抽象类中，可以有 0~n 个抽象方法，以及 0~n 个具体方法。
3. 抽象类**不能实例化**，也就是不能使用 new 关键字创建对象。


### 接口（Interface）的定义和实现
- 一个接口可以有多个直接父接口，但接口只能继承接口，不能继承类
- 接口的成员没有执行体，是由全局常量和公共的抽象方法所组成。
```java
public interface MyInterface {    // 接口myInterface
    String name;    // 不合法，变量name必须初始化
    int age = 20;    // 合法，等同于 public static final int age = 20;
    void getInfo();    // 方法声明，等同于 public abstract void getInfo();
}
```
### 抽象类和接口的联系和区别
#### 1）抽象类

在 Java 中，被关键字 abstract 修饰的类称为抽象类；被 abstract 修饰的方法称为抽象方法，抽象方法只有方法声明没有方法体。  

抽象类有以下几个特点：
1. 抽象类不能被实例化，只能被继承。
2. 包含抽象方法的类一定是抽象类，但抽象类不一定包含抽象方法（抽象类可以包含普通方法）。
3. 抽象方法的权限修饰符只能为 public、protected 或 default，默认情况下为 public。
4. 一个类继承于一个抽象类，则子类必须实现抽象类的抽象方法，如果子类没有实现父类的抽象方法，那子类必须定义为抽象类。
5. 抽象类可以包含属性、方法、构造方法，但构造方法不能用来实例化对象，只能被子类调用。

#### 2）接口
接口可以看成是一种特殊的类，只能用 interface 关键字修饰。  
  
Java 中的接口具有以下几个特点：
1. 接口中可以包含变量和方法，变量被**隐式指定**为 public static final，方法被**隐式指定**为 public abstract（JDK 1.8 之前）。
2. 接口支持多继承，即一个接口可以继承（extends）多个接口，间接解决了 Java 中类不能多继承的问题。
3. 一个类可以同时实现多个接口，一个类实现某个接口则必须实现该接口中的抽象方法，否则该类必须被定义为抽象类。

#### 3）抽象类和接口的区别
**相似处**
- 接口和抽象类都不能被实例化，主要用于被其他类实现和继承。
- 接口和抽象类都可以包含抽象方法，实现接口或继承抽象类的普通子类都必须实现这些抽象方法。

**差别**
主要体现在二者**设计目的**上

接口作为系统与外界交互的接口，接口体现的是一种规范。
对于接口的**实现者**而言，接口规定了实现者必须向外提供哪些服务（以方法的形式来提供）；
对于接口的**调用者**而言，接口规定了调用者可以调用哪些服务，以及如何调用这些服务（就是如何来调用方法）。
当在一个程序中使用接口时，接口是多个模块间的耦合标准；当在多个应用程序之间使用接口时，接口是多个程序之间的通信标准。    
一个系统中的接口不应该经常改变。一旦接口被改变，对整个系统甚至其他系统的影响将是辐射式的，会导致系统中大部分类都需要改写。  
  
抽象类则不一样，抽象类作为系统中多个子类的共同父类，它所体现的是一种**模板式设计**。
抽象类作为多个子类的抽象父类，可以被当成系统实现过程中的中间产品，这个中间产品已经实现了系统的部分功能（那些已经提供实现的方法），但这个产品依然不能当成最终产品，必须有更进一步的完善，这种完善可能有几种不同方式。


### 内部类是什么？
内部类可以很好地实现隐藏，内部类拥有外部类的所有元素的访问权限。
内部类可以分为：实例内部类、静态内部类和成员内部类

内部类的特点如下：
1. 内部类仍然是一个独立的类，在编译之后内部类会被**编译成独立**的`.class`文件，但是前面**冠以外部类的类名**和`$`符号。
2. 内部类不能用普通的方式访问。内部类是外部类的一个成员，因此内部类可以自由地访问外部类的成员变量，无论是否为 private 的。
3. 内部类声明成静态的，就不能随便访问外部类的成员变量，仍然是只能访问外部类的静态成员变量。

例子：
```java
public class Test {
    public class InnerClass {
        public int getSum(int x,int y) {
            return x + y;
        }
    }
    public static void main(String[] args) {
        Test.InnerClass ti = new Test().new InnerClass();
        int i = ti.getSum(2,3);
        System.out.println(i);    // 输出5
    }
}
```

### 实例内部类
实例内部类是指没有用 static 修饰的内部类，有的地方也称为非静态内部类。
```java
public class Outer {
    class Inner {
        // 实例内部类
    }
}
```
### 静态内部类
```java
public class Outer {
    static class Inner {
    }
}
class OtherClass {
    Outer.Inner oi = new Outer.Inner();  //在创建静态内部类的实例时，不需要创建外部类的实例。
}
```


### 局部内部类
- 在一个方法中定义的内部类
- 只在当前方法中有效
- 不能定义 static 成员
```java
public class Test {
    public void method() {
        class Inner {
            // 局部内部类
        }
    }
}
```

### 匿名类，Java匿名内部类
匿名类是指没有**类名的内部类**，必须在创建时使用 new 语句来声明类,**通常用于实现接口、抽象类或作为方法参数传递**
匿名类有两种实现方式：
- 继承一个类，重写其方法。
- 实现一个接口（可以是多个），实现其方法。

匿名内部类通常在需要一次性或临时实现某个接口或类的情况下使用，以减少代码复杂性。
匿名类和局部内部类一样，可以访问外部类的所有成员
匿名类中允许使用非静态代码块进行成员初始化操作

**典型用法**
1. **事件处理程序（Event Handling）**：匿名内部类常用于为GUI应用程序的组件（例如按钮、菜单项等）创建事件处理程序。例如，使用Swing编写GUI程序时，可以使用匿名内部类来创建按钮的点击事件处理程序，而无需显式创建一个单独的类。

   ```java
   JButton myButton = new JButton("Click Me");
   myButton.addActionListener(new ActionListener() {
       public void actionPerformed(ActionEvent e) {
           // 处理按钮点击事件的代码
       }
   });
   ```

2. **线程和多线程**：匿名内部类可以用于创建线程对象，尤其是在简单的多线程应用中。这样可以避免编写单独的类来扩展 `Thread` 或实现 `Runnable` 接口。

   ```java
   Thread thread = new Thread(new Runnable() {
       public void run() {
           // 线程执行的代码
       }
   });
   thread.start();
   ```

3. **实现接口或抽象类**：匿名内部类可用于**实现接口或抽象类的方法**。这在需要在特定上下文中提供自定义实现时很有用。

   ```java
   Runnable myRunnable = new Runnable() {
       public void run() {
           // 自定义Runnable接口的实现
       }
   };
   ```

4. **集合和迭代器**：在集合框架中，可以使用匿名内部类来创建自定义的比较器、迭代器等。

   ```java
   List<String> myList = new ArrayList<>();
   Collections.sort(myList, new Comparator<String>() {
       public int compare(String str1, String str2) {
           // 自定义比较器的实现
       }
   });
   ```




### 使用内部类实现多重继承
```java
public class Father {
    public int strong() {   
        // 强壮指数
        return 9;
    }
}

public class Mother {
    public int kind() {    
        // 友好指数
        return 8;
    }
}

public class Son {
    // 内部类继承Father类
    class Father_1 extends Father {
        public int strong() {
            return super.strong() + 1;
        }
    }
    class Mother_1 extends Mother {
        public int kind() {
            return super.kind() - 2;
        }
    }
    public int getStrong() {
        return new Father_1().strong();
    }
    public int getKind() {
        return new Mother_1().kind();
    }
}
```


### Lambda表达式
```java
// 可计算接口
public interface Calculable {
    // 计算两个int数值
    int calculateInt(int a, int b);
}

public static Calculable calculate(char opr) {
    Calculable result;
    if (opr == '+') {
        // Lambda表达式实现Calculable接口
        result = (int a, int b) -> {
            return a + b;
        };
    } else {
        // Lambda表达式实现Calculable接口
        result = (int a, int b) -> {
            return a - b;
        };
    }
    return result;
}
```

**函数式接口**
Lambda 表达式实现的接口不是普通的接口，而是函数式接口。**如果一个接口中，有且只有一个抽象的方法**（Object 类中的方法不包括在内），那这个接口就可以被看做是函数式接口。这种接口只能有一个方法。如果接口中声明多个抽象方法，那么 Lambda 表达式会发生编译错误

为了防止在函数式接口中声明多个抽象方法，Java 8 提供了一个声明函数式接口注解 @FunctionalInterface
```java
// 可计算接口
@FunctionalInterface
public interface Calculable {
    // 计算两个int数值
    int calculateInt(int a, int b);
}
```
### Lambda表达式的常见形式
Lambda表达式是一种用于定义匿名函数或闭包的简洁语法，它可以替代传统的匿名内部类。以下是Lambda表达式的常见形式举例：

1. **无参数的Lambda表达式**：
   ```java
   Runnable r = () -> {
       System.out.println("Hello, World!");
   };
   ```

2. **带参数的Lambda表达式**：

   ```java
   (int x, int y) -> {
       return x + y;
   }
   ```

3. **带返回值的Lambda表达式**：

   ```java
    //单行
	(int x, int y) -> x + y
	//多行
	(int x, int y) -> {
	    int result = x + y;
	    return result; // 显式返回结果
	}
   ```

4. **单个参数的简化形式**：如果Lambda表达式只有一个参数，可以省略参数列表的括号。

   ```java
   name -> System.out.println("Hello, " + name);
   ```

5. **方法引用**：Lambda表达式可以**引用已存在的方法**，可以理解为 Lambda 表达式的快捷写法
   ```java
   list.forEach(System.out::println);
   ```

6. **构造函数引用**：Lambda表达式可以引用构造函数来创建新对象。
   ```java
   Supplier<String> supplier = String::new;
   ```

## 异常处理
### 异常（Exception）处理及常见异常
在 Java 中一个异常的产生，主要有如下三种原因：
1. Java 内部错误发生异常，Java 虚拟机产生的异常。
2. 编写的程序代码中的错误所产生的异常，例如空指针异常、数组越界异常等。
3. 通过 throw 语句手动生成的异常，一般用来告知该方法的调用者一些必要信息。

我们把生成异常对象，并把它提交给运行时系统的过程称为**拋出**（throw）异常。
运行时系统在方法的调用栈中查找，直到找到能够处理该类型异常的对象，这一个过程称为**捕获**（catch）异常。

在 Java 中所有异常类型都是内置类 java.lang.Throwable 类的子类，即 Throwable 位于异常类层次结构的顶层

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20231023174043.png)

![1__jXNZuPLKMTQ5IKjBzb8jA.webp](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/1__jXNZuPLKMTQ5IKjBzb8jA.webp)
![java-exceptions-hierarchy-example.png.webp](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/java-exceptions-hierarchy-example.png.webp)


- Exception 类用于用户程序可能出现的异常情况，它也是用来创建自定义异常类型类的类。
- Error 定义了在通常环境下不希望被程序捕获的异常。一般指的是 JVM 错误，如堆栈溢出。

其中异常类 Exception 又分为运行时异常和非运行时异常，这两种异常有很大的区别，也称为**不检查异常**（Unchecked Exception）和**检查异常**（Checked Exception）。

**可检查异常**在源码里必须显示的进行捕获处理，这里是编译期检查的一部分。
**不检查异常**就是所谓的运行时异常，通常是可以编码避免的**逻辑错误**，具体根据需要来判断是否需要捕获，并不会在编译器强制要求

运行时异常都是 RuntimeException 类及其子类异常，如 NullPointerException、IndexOutOfBoundsException 等，这些异常是不检查异常，程序中可以选择捕获处理，**也可以不处理**。这些异常一般由**程序逻辑错误**引起，程序应该**从逻辑角度**尽可能避免这类异常的发生。  
  
非运行时异常是指 RuntimeException 以外的异常，类型上都属于 Exception 类及其子类。从程序**语法角度**讲是必须进行处理的异常，如果不处理，程序就不能编译通过。如 IOException、ClassNotFoundException 等以及用户自定义的 Exception 异常（一般情况下不自定义检查异常）。

1）运行时异常（RuntimeException）：
- NullPropagation：空指针异常；
- ClassCastException：类型强制转换异常
- IllegalArgumentException：传递非法参数异常
- IndexOutOfBoundsException：下标越界异常
- NumberFormatException：数字格式异常

2）非运行时异常：
- ClassNotFoundException：找不到指定 class 的异常
- IOException：IO 操作异常
  
3）错误（Error）：
- NoClassDefFoundError：找不到 class 定义异常
- StackOverflowError：深递归导致栈被耗尽而抛出的异常
- OutOfMemoryError：内存溢出异常

### Error和Exception的异同
Exception 和 Error 体现了 Java 平台设计者对不同异常情况的分类，Exception 是程序正常运行过程中可以预料到的意外情况，并且应该被开发者捕获，进行相应的处理。Error 是指正常情况下不大可能出现的情况，绝大部分的 Error 都会导致程序处于非正常、不可恢复状态。所以不需要被开发者捕获。

Error 错误是任何处理技术都无法恢复的情况，肯定会导致程序非正常终止。


### 异常处理机制及异常处理的基本结构
- try catch 语句用于捕获并处理异常
- finally 语句用于在任何情况下（除特殊情况外）都必须执行的代码
- throw 语句用于拋出异常
- throws 语句用于**声明**可能会出现的异常

在catch中可执行：
- **printStackTrace**() 方法：指出异常的类型、性质、栈层次及出现在程序中的位置（
- **getMessage**() 方法：输出错误的性质。
- **toString**() 方法：给出异常的类型与性质


### finally和return的执行顺序
- 执行 try 代码块或 catch 代码块中的 return 语句之前，都会先执行 finally 语句。
- 无论在 finally 代码块中是否修改返回值，返回值都不会改变，仍然是执行 finally 代码块之前的值。
- finally 代码块中的 return 语句一定会执行。
- 注意：**finally 代码块中最好不要包含 return 语句**，否则程序会提前退出。

### 自动资源管理
当程序使用 finally 块关闭资源时，程序会显得异常臃肿，例如：
```java
public static void main(String[] args) {
    FileInputStream fis = null;
    try {
        fis = new FileInputStream("a.txt");
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } finally {
        // 关闭磁盘文件，回收资源
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

为了解决这种问题，Java 7 增加了一个新特性，该特性提供了另外一种管理资源的方式，这种方式能自动关闭文件，被称为**自动资源管理**（Automatic Resource Management）。该特性是在 try 语句上的扩展，主要释放不再需要的文件或其他资源。
当 try 代码块结束时，自动释放资源。不再需要显式的调用 close() 方法，该形式也称为“**带资源的 try 语句**”。

自动关闭资源的 try 语句相当于包含了隐式的 finally 块（这个 finally 块用于关闭资源），因此这个 try 语句可以既没有 catch 块，也没有 finally 块。

> Java 7 几乎把所有的“资源类”（包括文件 IO 的各种类、JDBC 编程的 Connection 和 Statement 等接口）进行了改写，改写后的资源类都实现了 AutoCloseable 或 Closeable 接口。

```java
public class AutoCloseTest {
    public static void main(String[] args) throws IOException {
        try (
                // 声明、初始化两个可关闭的资源
                // try语句会自动关闭这两个资源
                BufferedReader br = new BufferedReader(new FileReader("AutoCloseTest.java"));
                PrintStream ps = new PrintStream(new FileOutputStream("a.txt"))) {
            // 使用两个资源
            System.out.println(br.readLine());
            ps.println("C语言中文网");
        }
    }
}
```
注意：
1. try 语句中声明的资源被隐式声明为 final，资源的作用局限于带资源的 try 语句。
2. 可以在一条 try 语句中声明或初始化多个资源，每个资源以`;`隔开即可。
3. 需要关闭的资源必须实现了 **AutoCloseable** 或 **Closeable** 接口。


Java 9 不要求在 try 后的圆括号内声明并创建资源，只需要自动关闭的资源有 final 修饰或者是有效的 final (effectively final)
```java
public class AutoCloseTest {
    public static void main(String[] args) throws IOException {
        // 有final修饰的资源
        final BufferedReader br = new BufferedReader(new FileReader("AutoCloseTest.java"));
        // 没有显式使用final修饰，但只要不对该变量重新赋值，该变量就是有效的
        final PrintStream ps = new PrintStream(new FileOutputStream("a. txt"));
        // 只要将两个资源放在try后的圆括号内即可
        try (br; ps) {
            // 使用两个资源
            System.out.println(br.readLine());
            ps.println("C语言中文网");
        }
    }
}
```

### throws和throw：声明和抛出异常
Java 中的异常处理除了捕获异常和处理异常之外，还包括声明异常和拋出异常

**声明异常**
```java
public class Test04 {
    public void readFile() throws IOException {
        // 定义方法时声明异常
        FileInputStream file = new FileInputStream("read.txt"); // 创建 FileInputStream 实例对象
        int f;
        while ((f = file.read()) != -1) {
            System.out.println((char) f);
            f = file.read();
        }
        file.close();
    }
    public static void main(String[] args) {
        Throws t = new Test04();
        try {
            t.readFile(); // 调用 readFHe()方法
        } catch (IOException e) {
            // 捕获异常
            System.out.println(e);
        }
    }
}
```

方法重写时声明抛出异常的**限制**
- 子类方法声明抛出的异常类型应该是父类方法声明抛出的异常类型的**子类或相同**
- 子类方法声明抛出的异常不允许比父类方法声明抛出的异常多

**抛出异常**
与 throws 不同的是，throw 语句用来直接拋出一个异常，后接一个可拋出的异常类对象

### 多异常捕获
在一个catch中捕获多个异常
```java
public class ExceptionTest {
    public static void main(String[] args) {
        try {
            int a = Integer.parseInt(args[0]);
            int b = Integer.parseInt(args[1]);
            int c = a / b;
            System.out.println("您输入的两个数相除的结果是：" + c);
        } catch (IndexOutOfBoundsException | NumberFormatException | ArithmeticException e) {
            System.out.println("程序发生了数组越界、数字格式异常、算术异常之一");
            // 捕获多异常时，异常变量默认有final修饰
            // 所以下面代码有错
            e = new ArithmeticException("test");
        } catch (Exception e) {
            System.out.println("未知异常");
            // 捕获一种类型的异常时，异常变量没有final修饰
            // 所以下面代码完全正确
            e = new RuntimeException("test");
        }
    }
}
```


### 自定义异常
- 实现自定义异常类需要继承 **Exception** 类或其子类，如果自定义运行时异常类需继承 **RuntimeException** 类或其子类。
- 在编码规范上，一般将自定义异常类的类名命名为 XXXException，其中 XXX 用来代表该异常的作用。
- 自定义异常类一般包含两个构造方法：一个是**无参的默认构造方法**，另一个构造方法**以字符串的形式接收**一个定制的异常消息，并将该消息传递给超类的构造方法。

```java
class IntegerRangeException extends Exception {
    public IntegerRangeException() {
        super();
    }
    public IntegerRangeException(String s) {
        super(s);
    }
}
```



### 异常处理规则
**不要使用过于庞大的try块**
很多初学异常机制的读者喜欢在 try 块里放置大量的代码，这样看上去“很简单“，但这种”简单“只是一种假象，因为 try 块里的代码过于庞大，业务过于复杂，就会造成 try 块中出现异常的可能性大大增加，从而导致分析异常原因的难度也大大增加。而且当 try 块过于庞大时，就难免在 try 块后紧跟大量的 catch 块才可以针对不同的异常提供不同的处理逻辑。同一个 try 块后紧跟大量的 catch 块则需要分析它们之间的逻辑关系，反而增加了变成复杂度。


**避免使用 Catch All 语句**
所谓 Catch All 语句指的是一种异常捕获模块，它可以处理程序发生的所有可能异常。例如，如下代码片段：
```java
try {
    // 可能引发Checked异常的代码
} catch (Throwsble t) {
    // 进行异常处理
    t.printStackTrace();
}
```
不可否认，每个程序员都曾经用过这种**偷懒的**异常处理方式，但在编写关键程序时就应避免使用这种异常处理方式。这种处理方式有如下两点不足之处。  
1. 所有的异常都采用相同的处理方式，这将导致无法对不同的异常分情况处理，如果要分情况处理，则需要在 catch 块中使用分支语句进行控制，这是得不偿失的做法。
2. 这种捕获方式可能将程序中的错误、Runtime 异常等可能导致程序终止的情况全部捕获到，从而“压制”了异常。如果出现了一些“关键”异常，那么此异常也会被“静悄悄”地忽略。

**不要忽略捕获到的异常**
不要忽略异常，既然已捕获到异常，那 catch 块理应处理并修复这个错误。catch 块整个为空，或者仅仅打印出错信息都是不妥的。程序出了错误，所有的人都看不到任何异常，但整个应用可能已经彻底坏了，这是最可怕的事情。

### Java.util.logging：JDK自带记录日志类
```java
public class Test {
    private static Logger log = Logger.getLogger(Test.class.toString());
    public static void main(String[] args) {
        // 级别依次升高，后面的日志级别会屏蔽之前的级别
        log.finest("finest");
        log.finer("finer");
        log.fine("fine");
        log.config("config");
        log.info("info");
        log.warning("warning");
        log.severe("server");
    }
}
```


## 集合、枚举
### 集合详解
集合类和数组不一样，数组元素既可以是基本类型的值，也可以是对象（实际上保存的是对象的引用变量）
而集合里**只能保存对象**（实际上只是保存对象的引用变量，但通常习惯上认为集合里保存的是对象）。

Java 集合类型分为 Collection 和 Map
Collection 接口定义了一些通用的方法，通过这些方法可以实现对集合的基本操作。定义的方法既可用于操作 Set 集合，也可用于操作 List 和 Queue 集合。

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230927090743.png)

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230927090754.png)



### List集合：ArrayList和LinkedList类的用法及区别
ArrayList 与 LinkedList 都是 List 接口的实现类，因此都实现了 List 的所有未实现的方法，只是实现的方式有所不同。

ArrayList 是基于动态数组数据结构的实现，访问元素速度优于 LinkedList。LinkedList 是基于链表数据结构的实现，占用的内存空间比较大，但在批量插入或删除数据时优于 ArrayList。

对于快速访问对象的需求，使用 ArrayList 实现执行效率上会比较好。需要频繁向集合中插入和删除元素时，使用 LinkedList 类比 ArrayList 类效果高。

**Vector**：是线程安全的，其他的类似ArrayList
**ArrayList** 和 **LinkedList**：不是线程安全的

Vector的带参数的构造函数: `Vector<E> vector = new Vector<>(initialCapacity, capacityIncrement);
`
### Set集合：HashSet和TreeSet类
Set 集合中的对象不按特定的方式排序，只是简单地把对象加入集合。Set 集合中不能包含重复的对象，并且最多只允许包含一个 null 元素。

**HashSet** 是 Set 接口的典型实现，大多数时候使用 Set 集合时就是使用这个实现类。HashSet 是按照 Hash 算法来存储集合中的元素。因此具有很好的存取和查找性能。
当向 HashSet 集合中存入一个元素时，HashSet 会调用该对象的 **hashCode**() 方法来得到该对象的 hashCode 值，然后根据该 hashCode 值决定该对象在 HashSet 中的存储位置。
HashSet 具有以下特点：
- 不能保证元素的排列顺序，顺序可能与添加顺序不同，顺序也有可能发生变化。
- HashSet 不是同步的，如果多个线程同时访问或修改一个 HashSet，则必须通过代码来保证其同步。
- 集合元素值可以是 null
- 如果向 Set 集合中添加两个相同的元素，则后添加的会覆盖前面添加的元素，即在 Set 集合中不会出现相同的元素


**TreeSet** 类同时实现了 Set 接口和 SortedSet 接口。**SortedSet** 接口是 Set 接口的子接口，可以实现对集合进行**自然排序**,遍历时是有序的
TreeSet 只能对实现了 **Comparable** 接口的类对象进行排序
类似c++的unordered_set、set
### Map集合详解
Map 接口主要有两个实现类：HashMap 类和 TreeMap 类。
**HashMap** 类按哈希算法来存取键对象，而 **TreeMap** 类可以对键对象进行排序。

### 遍历Map集合的四种方式
1）在 for 循环中使用 entries 实现 Map 的遍历（最常见和最常用的）。
```java
public static void main(String[] args) {
    Map<String, String> map = new HashMap<String, String>();
    map.put("Java入门教程", "http://c.biancheng.net/java/");
    map.put("C语言入门教程", "http://c.biancheng.net/c/");
    for (Map.Entry<String, String> entry : map.entrySet()) {
        String mapKey = entry.getKey();
        String mapValue = entry.getValue();
        System.out.println(mapKey + "：" + mapValue);
    }
}
```

2）使用 for-each 循环遍历 key 或者 values，一般适用于只需要 Map 中的 key 或者 value 时使用。性能上比 entrySet 较好。
```java
Map<String, String> map = new HashMap<String, String>();
map.put("Java入门教程", "http://c.biancheng.net/java/");
map.put("C语言入门教程", "http://c.biancheng.net/c/");
// 打印键集合
for (String key : map.keySet()) {
    System.out.println(key);
}
// 打印值集合
for (String value : map.values()) {
    System.out.println(value);
}
```

3）使用迭代器（Iterator）遍历
Iterator 迭代器采用的是快速失败（fail-fast）机制，一旦在迭代过程中检测到该集合已经被修改（通常是程序中的其他线程修改），程序立即引发 ConcurrentModificationException 异常，而不是显示修改后的结果，这样可以避免共享资源而引发的潜在问题。
> 快速失败（fail-fast）机制，是 Java Collection 集合中的一种错误检测机制。
```java
Map<String, String> map = new HashMap<String, String>();
map.put("Java入门教程", "http://c.biancheng.net/java/");
map.put("C语言入门教程", "http://c.biancheng.net/c/");
Iterator<Entry<String, String>> entries = map.entrySet().iterator();
while (entries.hasNext()) {
    Entry<String, String> entry = entries.next();
    String key = entry.getKey();
    String value = entry.getValue();
    System.out.println(key + ":" + value);
}
```

4）通过键找值遍历，这种方式的**效率比较低**，因为本身从键取值是耗时的操作。
```java
for(String key : map.keySet()){
    String value = map.get(key);
    System.out.println(key+":"+value);
}
```


### Collections类操作集合详解
Collections 类是 Java 提供的一个操作 Set、List 和 Map 等集合的工具类。Collections 类提供了许多操作集合的静态方法，借助这些静态方法可以实现集合元素的排序、查找替换和复制等操作。
Java的`java.util.Collections`类提供了许多实用的方法，用于操作集合（Collection），例如列表（List）、集（Set）、映射（Map）等。以下是一些`Collections`类的常用方法：

**注意：`Collections`类中的大多数方法都是静态方法，因此可以直接使用类名来调用。**

1. **`sort(List<T> list)`**：对列表进行升序排序。
2. **`reverse(List<?> list)`**：反转列表中的元素顺序。
3. **`shuffle(List<?> list)`**：随机打乱列表中的元素顺序。
4. **`binarySearch(List<? extends Comparable<? super T>> list, T key)`**：在已排序的列表中执行二分查找。
5. **`addAll(Collection<? super T> c, T... elements)`**：将一组元素添加到集合中。
6. **`frequency(Collection<?> c, Object o)`**：计算集合中某个元素的出现次数。
7. **`max(Collection<? extends T> coll)`** 和 **`min(Collection<? extends T> coll)`**：找到集合中的最大和最小元素。
8. **`addAll(Collection<? super T> c, T... elements)`**：将一组元素添加到集合中。
9. **`replaceAll(List<T> list, T oldVal, T newVal)`**：替换列表中的指定元素。
10. **`unmodifiableCollection(Collection<? extends T> c)`**：创建一个不可修改的集合，防止对其进行修改。

### 使用forEach+Lambda遍历Collection集合
当程序调用 **Iterable** 的 **forEach**(Consumer action) 遍历集合元素时，程序会依次将集合元素传给 **Consumer** 的 **accept**(T t) 方法（该接口中唯一的抽象方法）。正因为 Consumer 是**函数式接口**，因此可以使用 Lambda 表达式来遍历集合元素。
```java
public class CollectionEach {
    public static void main(String[] args) {
        // 创建一个集合
        Collection objs = new HashSet();
        objs.add("C语言中文网Java教程");
        objs.add("C语言中文网C语言教程");
        objs.add("C语言中文网C++教程");
        // 调用forEach()方法遍历集合
        objs.forEach(obj -> System.out.println("迭代集合元素：" + obj));
    }
}
```
### 使用Lambda表达式遍历Iterator迭代器
Java 8 为 Iterator 引入了一个 forEachRemaining(Consumer action) 默认方法，该方法所需的 **Consumer** 参数同样也是函数式接口。当程序调用 Iterator 的 **forEachRemaining**(Consumer action) 遍历集合元素时，程序会依次将集合元素传给 Consumer 的 **accept**(T t) 方法（该接口中唯一的抽象方法）。
```java
public class IteratorEach {
    public static void main(String[] args) {
        // 创建一个集合
        Collection objs = new HashSet();
        objs.add("C语言中文网Java教程");
        objs.add("C语言中文网C语言教程");
        objs.add("C语言中文网C++教程");
        // 获取objs集合对应的迭代器
        Iterator it = objs.iterator();
        // 使用Lambda表达式（目标类型是Comsumer）来遍历集合元素
        it.forEachRemaining(obj -> System.out.println("迭代集合元素：" + obj));
    }
}
```

### 使用foreach循环遍历Collection集合
foreach 循环中的迭代变量也不是集合元素本身，系统只是依次把集合元素的值赋给迭代变量，因此在 foreach 循环中修改迭代变量的值也没有任何实际意义。
同样，当使用 foreach 循环迭代访问集合元素时，该集合也不能被改变，否则将引发 ConcurrentModificationException 异常
```java
public class ForeachTest {
    public static void main(String[] args) {
        // 创建一个集合
        Collection objs = new HashSet();
        objs.add("C语言中文网Java教程");
        objs.add("C语言中文网C语言教程");
        objs.add("C语言中文网C++教程");
        for (Object obj : objs) {
            // 此处的obj变量也不是集合元素本身
            String obj1 = (String) obj;
            System.out.println(obj1);
            if (obj1.equals("C语言中文网Java教程")) {
                // 下面代码会引发 ConcurrentModificationException 异常
                objs.remove(obj);
            }
        }
        System.out.println(objs);
    }
}
```
### 使用Java 8新增的Predicate操作Collection集合
Java 8 起为 Collection 集合新增了一个 removeIf(Predicate filter) 方法，该方法将会批量删除符合 filter 条件的所有元素。该方法需要一个 Predicate 对象作为参数，Predicate 也是**函数式接口**，因此可使用 Lambda 表达式作为参数。
```java
public class ForeachTest {
    public static void main(String[] args) {
        // 创建一个集合
        Collection objs = new HashSet();
        objs.add(new String("C语言中文网Java教程"));
        objs.add(new String("C语言中文网C++教程"));
        objs.add(new String("C语言中文网C语言教程"));
        objs.add(new String("C语言中文网Python教程"));
        objs.add(new String("C语言中文网Go教程"));
        // 使用Lambda表达式(目标类型是Predicate)过滤集合
        objs.removeIf(ele -> ((String) ele).length() < 12);
        System.out.println(objs);
    }
}
```

### 使用Java 8新增的Stream操作Collection集合
Java 8引入了`Stream`（流）这一概念，它是**处理集合数据的新方式**，提供了一种更简洁、更灵活、更可读的方法。`Stream`可用于对集合进行各种操作，如过滤、映射、排序、聚合等，它的引入使得处理集合变得**更加函数式**和流畅。以下是`Stream`的详细介绍：

1. **什么是Stream**：
   - `Stream`是Java 8引入的新概念，它不是数据结构，而是对数据的一种视图。
   - `Stream`允许你以**声明性方式处理集合数据**，而不是传统的迭代方式。

2. **创建Stream**：
   - 可以从集合、数组、I/O通道等数据源创建`Stream`。
   - 例如，从List创建Stream：`List.stream()`。
   - 从数组创建Stream：`Arrays.stream(array)`。

3. **Stream操作**：
   - `Stream`操作分为两种：中间操作和终端操作。
   - 中间操作是对数据源执行的延迟操作，返回一个新的`Stream`。
   - 终端操作触发实际的计算，并产生最终结果。

4. **中间操作**：
   - `filter(Predicate<T> predicate)`：过滤符合条件的元素。
   - `map(Function<T, R> mapper)`：将元素映射为另一种类型。
   - `flatMap(Function<T, Stream<R>> mapper)`：将元素映射为`Stream`，然后将`Stream`合并为一个新的`Stream`。
   - `distinct()`：去重元素。
   - `sorted()`：对元素进行排序。
   - `peek(Consumer<T> action)`：对每个元素执行操作但不改变`Stream`。

5. **终端操作**：
   - `forEach(Consumer<T> action)`：对每个元素执行操作。
   - `toArray()`：将`Stream`转换为数组。
   - `collect(Collector<T, A, R> collector)`：将`Stream`元素汇总为集合、映射等。
   - `reduce(BinaryOperator<T> accumulator)`：对`Stream`元素进行归约操作。
   - `count()`：计算元素数量。
   - `min(Comparator<T> comparator)` 和 `max(Comparator<T> comparator)`：查找最小和最大元素。
   - `anyMatch(Predicate<T> predicate)`、`allMatch(Predicate<T> predicate)` 和 `noneMatch(Predicate<T> predicate)`：检查是否有元素满足、所有元素满足或没有元素满足条件。
   - `findFirst()` 和 `findAny()`：查找第一个或任意一个元素。

6. **流的特性**：
   - `Stream`支持并行操作，可以提高性能。
   - `Stream`是惰性计算的，只有在终端操作被调用时才会执行中间操作。
   - `Stream`不会修改原始数据源，而是生成新的`Stream`。

7. **示例**：

   ```java
   List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eva");

   // 使用Stream过滤和映射
   List<String> filteredNames = names.stream()
       .filter(name -> name.startsWith("A"))
       .map(String::toUpperCase)
       .collect(Collectors.toList()); // 终端操作

   // 使用Stream求和
   int sum = names.stream()
       .mapToInt(String::length)
       .sum(); // 终端操作
   ```

`Stream`为Java提供了一种强大的方式来处理集合数据，它使代码更简洁、可读性更高，同时支持并行计算，提高了性能。通过组合中间操作和终端操作，可以轻松地实现各种数据处理需求。

```java
public class CollectionStream {
    public static void main(String[] args) {
        // 创建一个集合
        Collection objs = new HashSet();
        objs.add(new String("C语言中文网Java教程"));
        objs.add(new String("C语言中文网C++教程"));
        objs.add(new String("C语言中文网C语言教程"));
        objs.add(new String("C语言中文网Python教程"));
        objs.add(new String("C语言中文网Go教程"));
        // 统计集合中出现“C语言中文网”字符串的数量
        System.out.println(objs.stream().filter(ele -> ((String) ele).contains("C语言中文网")).count()); // 输出 5
        // 统计集合中出现“Java”字符串的数量
        System.out.println(objs.stream().filter(ele -> ((String) ele).contains("Java")).count()); // 输出 1
        // 统计集合中出现字符串长度大于 12 的数量
        System.out.println(objs.stream().filter(ele -> ((String) ele).length() > 12).count()); // 输出 1
        // 先调用Collection对象的stream ()方法将集合转换为Stream
        // 再调用Stream的mapToInt()方法获取原有的Stream对应的IntStream
        objs.stream().mapToInt(ele -> ((String) ele).length())
                // 调用forEach()方法遍历IntStream中每个元素
                .forEach(System.out::println);// 输出 11 11 12 10 14
    }
}
```

### Java 9新增的不可变集合
程序直接调用 Set、List、Map 的 `of()` 方法即可创建包含 N 个元素的不可变集合，这样一行代码就可创建包含 N 个元素的集合。
```java
public class Java9Collection {
    public static void main(String[] args) {
        // 创建包含4个元素的Set集合
        Set set = Set.of("Java", "Kotlin", "Go", "Swift");
        System.out.println(set);
        // 不可变集合，下面代码导致运行时错误
        // set.add("Ruby");
        // 创建包含4个元素的List集合
        List list = List.of(34, -25, 67, 231);
        System.out.println(list);
        // 不可变集合，下面代码导致运行时错误
        // list.remove(1);
        // 创建包含3个key-value对的Map集合
        Map map = Map.of("语文", 89, "数学", 82, "英语", 92);
        System.out.println(map);
        // 不可变集合，下面代码导致运行时错误
        // map.remove("语文");
        // 使用Map.entry()方法显式构建key-value对
        Map map2 = Map.ofEntries(Map.entry("语文", 89), Map.entry("数学", 82), Map.entry("英语", 92));
        System.out.println(map2);
    }
}
```

### Java 9中增强的“菱形”语法

集合中使用
```java
List<String> strList = new ArrayList<>();    // 后面的尖括号中的类型由编译器来推断
Map<String, Integer> scores = new HashMap<>();
```

匿名内部类中使用
```java
interface Foo<T> {
    void test(T t);
}
public class AnnoymousTest {
    public static void main(String[] args) {
        // 指定Foo类中泛型为String
        Foo<String> f = new Foo<>() {
            // test()方法的参数类型为String
            public void test(String t) {
                System.out.println("test 方法的 t 参数为：" + t);
            }
        };
        // 使用泛型通配符，此时相当于通配符的上限为Object
        Foo<?> fo = new Foo<>() {
            // test()方法的参数类型为Object
            public void test(Object t) {
                System.out.println("test 方法的 Object 参数为：" + t);
            }
        };
        // 使用泛型通配符，通配符的上限为Number
        Foo<? extends Number> fn = new Foo<>() {
            // 此时test ()方法的参数类型为Number
            public void test(Number t) {
                System.out.println("test 方法的 Number 参数为：" + t);
            }
        };
    }
}
```



## 泛型
### Java泛型简明教程
前面我们提到 Java 集合有个缺点，就是把一个对象“丢进”集合里之后，集合就会“忘记”这个对象的数据类型，当再次取出该对象时，该对象的编译类型就变成了 Object 类型（其运行时类型没变）。  
  
Java 集合之所以被设计成这样，是因为集合的设计者不知道我们会用集合来保存什么类型的对象，所以他们把集合设计成能保存任何类型的对象，只要求具有很好的通用性，但这样做带来如下两个问题：
1. 集合对元素类型没有任何限制，这样可能引发一些问题。例如，想创建一个只能保存 Dog 对象的集合，但程序也可以轻易地将 Cat 对象“丢”进去，所以可能引发异常。
2. 由于把对象“丢进”集合时，集合丢失了对象的状态信息，集合只知道它盛装的是 Object，因此取出集合元素后通常还需要进行**强制类型转换**。这种强制类型转换既增加了编程的复杂度，也可能引发 ClassCastException 异常。

所以为了解决上述问题，从` Java 1.5 `开始提供了泛型。泛型可以在编译的时候检查类型安全，并且所有的强制转换都是自动和隐式的，提高了代码的重用率。

泛型本质上是提供类型的“类型参数”，也就是**参数化类型**。我们可以为**类**、**接口**或**方法**指定一个类型参数，通过这个参数限制操作的数据类型，从而保证类型转换的绝对安全。

- 泛型类一般用于类中的属性类型不确定的情况下
- 是否拥有泛型方法，与其所在的类是不是泛型没有关系

#### 1. 限制泛型可用类型
在 Java 中默认可以使用任何类型来实例化一个泛型类对象。当然也可以对泛型类实例的类型进行限制，**用的定义泛型的时候**
```java
class 类名称<T extends anyClass>
```
其中，anyClass 指某个接口或类。使用泛型限制后，泛型类的类型必须实现或继承 anyClass 这个接口或类


#### 2. 使用类型通配符
Java 中的泛型还支持使用类型通配符，它的作用是在**创建泛型类对象时**限制这个泛型类的类型必须实现或继承某个接口或类。  
使用泛型类型通配符的语法格式如下：
```java
泛型类名称<? extends List>a = null;
```
其中，“`<? extends List>`”作为一个整体表示类型未知，当需要使用泛型对象时，可以单独实例化。  
  
```java
A<? extends List>a = null;
a = new A<ArrayList> ();    // 正确
b = new A<LinkedList> ();    // 正确
c = new A<HashMap> ();    // 错误
```


#### 3. 继承泛型类和实现泛型接口
定义为泛型的类和接口也可以被继承和实现。例如下面的示例代码演示了如何继承泛型类。
```java
public class FatherClass<T1>{}
public class SonClass<T1,T2,T3> extents FatherClass<T1>{}
```


### Java泛型的原理和底层实现：

Java泛型是一种在编译时进行类型检查的机制，用于提供在编写类型安全代码时的灵活性。Java泛型的原理和底层实现如下：

1. **类型擦除（Type Erasure）**：
    - Java泛型是通过类型擦除实现的。在编译时，泛型类型信息被擦除，所有泛型类型都被替换为它们的**原始类型。**
    - 例如，`List<String>`在运行时被擦除为`List`，`List<Integer>`也被擦除为`List`。
2. **类型边界和类型参数**：
    - Java泛型支持类型参数，可以将类型参数传递给泛型类、接口和方法。
    - 使用类型参数可以限制允许的数据类型，例如`List<T>`中的`T`就是类型参数。
3. **类型擦除的影响**：
    - 泛型类型参数被擦除后，会**使用Object类型**来表示泛型类型，然后通过**强制类型转换**进行运行时类型检查。
    - 擦除的结果是泛型代码在运行时不知道实际的泛型类型参数
    - 不过，通过反射等手段，仍然可以在运行时获取有关泛型类型参数的某些信息，但这通常不是推荐的做法
4. **泛型通配符**：
    - Java中使用`?`通配符表示未知的泛型类型。例如，`List<?>`表示一个未知类型的List。
    - 通配符使得可以编写适用于多种泛型类型的通用代码。

例如：
```java
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

Box<String> stringBox = new Box<>("Hello");
String str = intBox.getValue(); 


// 擦除类型后的代码
public class Box {
    private Object value;

    public Box(Object value) {
        this.value = value;
    }

    public Object getValue() {
        return value;
    }
}

Box stringBox = new Box("Hello");
String str = (String) intBox.getValue(); // 类型强制转换
```

#### 优点：
1. **类型安全性：** Java泛型通过编译器进行类型检查，可以在编译时捕获类型错误，提供了更高的类型安全性。
2. **简洁性：** Java泛型的语法相对简单，易于理解和使用。它使用通配符（`?`）来表示未知类型。
3. **擦除类型信息：** 类型擦除使得Java泛型不会在运行时引入性能开销或产生额外的代码大小。
#### 缺点：
1. **类型擦除：** 类型擦除也带来了限制，导致在某些情况下无法在运行时获取泛型类型信息。
2. **限制灵活性：** Java泛型不支持像C++模板那样的完全泛型编程，无法实现某些高级泛型特性。

### C++泛型的原理和底层实现：
C++泛型使用**模板**（Templates）来实现，它在编译时生成类型特定的代码，因此**不涉及类型擦除**。以下是C++泛型的原理和底层实现如下：

1. **模板实例化**：
    - 在C++中，模板是一种泛型编程工具，通过编译器生成特定类型的代码。
    - 模板可以定义函数模板和类模板，允许使用参数化的类型。
2. **类型安全**：
    - C++模板是类型安全的，因为编译器在实例化模板时进行类型检查，并生成特定类型的代码。
    - 没有类型擦除，编译器了解模板的参数化类型。
3. **代码生成**：
    - 每次使用模板时，编译器会生成特定参数类型的代码，这意味着模板代码与参数类型相关联。
4. **泛型参数**：
    - 在C++中，可以使用泛型参数来定义模板。例如，`template <typename T>`定义了一个泛型参数`T`。
    - 模板函数或类可以使用这些泛型参数，如`std::vector<T>`。
5. **代码大小**：
    - C++模板会生成多个版本的代码，一种类型对应一个版本。这可能会导致代码大小增加，但提供了类型安全性和性能优势。

#### 优点：
1. **完全泛型编程：** 提供了更高级别的泛型编程支持，可以实现更复杂和通用的数据结构和算法。
2. **类型不擦除：** 不会擦除类型信息，允许在运行时访问泛型类型的具体信息。
3. **性能：** 可以生成高效的代码，因为编译器在编译时生成特定类型的代码，无需运行时类型检查或转换。
#### 缺点：
1. **复杂性：** C++模板的语法较为复杂，对于初学者来说可能比较难以理解和使用。
2. **编译时错误：** 错误信息通常较难理解，因为编译器在模板实例化时生成的代码可能会导致长而复杂的错误消息。
3. **代码膨胀：** 由于每个模板实例都会生成单独的代码，可能会导致代码膨胀，增加可执行文件的大小。



### 1. 枚举（Enum）：
在Java中，枚举（Enum）、**EnumMap** 和 **EnumSet** 是与枚举类型（Enum）一起使用的重要工具，用于处理一组有限的常量值。下面将分别介绍它们的使用方式：

枚举是一种特殊的数据类型，用于定义一组有限的命名常量。它的声明形式如下：
```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```
使用枚举的主要目的是将常量值进行分组，使代码更具可读性和可维护性。枚举可以在 switch 语句中使用，也可以用于定义有限的选项列表。

示例：
```java
Day today = Day.SUNDAY;
switch (today) {
    case MONDAY:
        System.out.println("It's Monday.");
        break;
    case SUNDAY:
        System.out.println("It's Sunday.");
        break;
    // 其他枚举值的处理
}
```

### 2. EnumMap：

EnumMap 是一种特殊的 Map 实现，它的**键类型**必须是枚举类型。EnumMap 中的键值对是**按枚举值的顺序排列的**，这可以提供更高效的性能。

EnumMap 可以高效地存储和检索与枚举常量相关联的值。
示例：
```java
import java.util.EnumMap;

enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumMapExample {
    public static void main(String[] args) {
        EnumMap<Day, String> activities = new EnumMap<>(Day.class);

        activities.put(Day.MONDAY, "Work");
        activities.put(Day.SUNDAY, "Relax");

        System.out.println("Activities on Monday: " + activities.get(Day.MONDAY));
    }
}
```


### 3. EnumSet：

EnumSet 是一个专门用于枚举类型的集合实现，它只能包含枚举类型的值。EnumSet 中的元素**按枚举值的顺序排列**，具有极高的性能。
EnumSet 主要用于表示一组枚举常量的集合，并且在处理枚举类型时通常比普通的集合更高效。

示例：
```java
import java.util.EnumSet;

enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumSetExample {
    public static void main(String[] args) {
        EnumSet<Day> weekendDays = EnumSet.of(Day.SATURDAY, Day.SUNDAY);

        System.out.println("Weekend days: " + weekendDays);
    }
}
```

## 反射机制

### 编译和运行过程
Java文件的编译、运行过程可以分为以下步骤：
Java 程序不涉及传统意义上的链接步骤，与像C/C++等编程语言不同，它没有明确的编译后的链接过程。Java 在编译和执行过程中执行了一些操作，但这些操作与传统的链接步骤不同。以下是 Java 编译和执行过程的主要步骤：

1. **编译：** Java 源代码文件（`.java`）首先由 Java 编译器（`javac`）编译成字节码文件（`.class`），而不是本地机器代码。这个过程不涉及链接步骤。编译器检查源代码的语法和类型，并生成字节码文件。
2. **字节码文件：** 字节码文件包含了编译后的 Java 代码，这些代码是在 Java 虚拟机（JVM）上执行的中间表示形式。
3. **类加载：** 在运行 Java 程序时，Java 虚拟机负责加载字节码文件，并将它们**转换为运行时的类**。类加载是 Java 虚拟机的一部分，它负责将类加载到内存中，以便可以创建类的实例并执行类中的方法。
4. **运行时链接（可选）：** 在 Java 中，**链接步骤通常是在运行时执行的**，而不是在编译时。这包括初始化静态成员变量和执行类的构造函数等操作。这是一种动态的链接过程。
5. **执行：** 一旦程序被加载并链接，JVM 会执行程序的 `main` 方法（如果存在），从而启动程序的执行。程序可以访问类中的各种方法和属性，并执行相应的操作。

因此，Java 不像传统的编程语言那样有明确的编译后的链接步骤，**链接步骤通常是在运行时执行的**。这种方式有助于实现 Java 的平台无关性，因为字节码可以在不同的操作系统上运行，只要有对应的 JVM。在链接方面，Java 虚拟机负责加载类和执行链接操作，而不需要生成本地机器代码。

**例子：**
如果有多个类文件，如a.java、b.java、c.java，编译后会生成什么？
如果您有多个 Java 源代码文件（例如 `a.java`、`b.java`、`c.java`）并希望将它们编译成字节码文件，通常会使用 Java 编译器（`javac`）来完成此任务。每个源代码文件中的类都会被编译成一个**对应**的字节码文件。

假设您有以下三个 Java 源代码文件：`a.java`、`b.java` 和 `c.java`，每个文件包含一个类：

```java
// a.java
public class A {
    // ...
}

// b.java
public class B {
    // ...
}

// c.java
public class C {
    // ...
}
```

使用以下命令编译这些文件：

```shell
javac a.java b.java c.java
```

这将会生成以下字节码文件（`.class` 文件），每个 Java 源代码文件对应一个字节码文件：

- `A.class` 对应 `a.java`
- `B.class` 对应 `b.java`
- `C.class` 对应 `c.java`

每个字节码文件包含编译后的 Java 类的信息，可以在 Java 虚拟机上运行。这些字节码文件可以独立运行，也可以一起构成一个 Java 程序的一部分，通过 `java` 命令来执行主程序（包含 `main` 方法的类）。

例如，如果其中一个类（例如 `A` 类）包含 `main` 方法，您可以使用以下方式运行它：
这将执行 `A.class` 中的 `main` 方法。
```shell
java A
```


### 类加载过程
Java 的类加载过程是 Java 虚拟机（JVM）在运行 Java 程序时加载类的过程。**类加载**是 Java 虚拟机的一项核心功能，它负责将字节码文件加载到内存中，并在运行时创建类的实例以及执行类的方法。以下是 Java 类加载的详细过程：

1. **加载（Loading）：** 类加载的第一步是加载类的字节码文件。这个过程发生在类加载器（**ClassLoader**）中。类加载器将字节码文件从磁盘或其他存储介质加载到内存中，并创建一个**表示该类的 `Class` 对象**。在加载阶段，JVM 还会检查字节码文件的合法性，并进行验证。
2. **链接（Linking）：** 链接分为三个阶段：验证、准备和解析。
    - **验证（Verification）：** 在验证阶段，JVM 确保加载的类文件是合法的，并且符合 Java 语言规范。这包括类型检查、字段和方法引用的解析，以及字节码的验证。如果验证失败，将抛出 `VerifyError` 异常。
    - **准备（Preparation）：** 在准备阶段，JVM 为类的静态变量分配内存空间，并初始化这些变量为默认值（例如，数值类型为 0，对象引用为 null）。
    - **解析（Resolution）：** 在解析阶段，JVM 将符号引用转换为**直接引用**。符号引用是一种符号化的引用，而直接引用是可以直接使用的引用，例如，方法调用的符号引用将被解析为实际方法的直接引用。解析是可选的，不是所有类都需要进行解析。
3. **初始化（Initialization）：** 初始化阶段是类加载的最后一步。在这个阶段，JVM 执行类的静态初始化器（静态块）和静态字段初始化。这是类中静态成员被赋予初始值的阶段。初始化是类加载的最后一步，只有在初始化完成后才能使用类的实例。
4. **使用（Usage）：** 在初始化后，类可以被使用，包括创建类的实例、调用类的静态方法和访问类的静态字段等。这是程序执行的阶段。
5. **卸载（Unloading）：** 在 Java 虚拟机的某些实现中，已经不再被引用的类可以被卸载，释放内存。类卸载是可选的，不是所有的 JVM 实现都支持。


**如果在A类中的某个方法调用的B类的一个方法，类加载时是如何处理的？**
1. **加载类 A：** 当程序首次引用类 A，Java 虚拟机（JVM）会尝试加载类 A，如果类 A 还没有被加载，它会被加载到内存中。加载类 A 的过程包括查找类 A 的字节码文件（`.class` 文件）并加载它。
2. **加载类 B：** 如果类 B 是类 A 的依赖，且类 B 还没有被加载，JVM 会尝试加载类 B。这是因为在类 A 的方法中调用了类 B 的方法，因此类 B 的加载是必需的。类 B 的加载过程与加载类 A 的过程类似，包括查找类 B 的字节码文件并加载它。
3. **链接和初始化：** 一旦类 A 和类 B 都被加载到内存中，它们将**经历链接和初始化阶段**。链接阶段包括验证、准备和解析。在初始化阶段，将执行静态初始化器（静态块）和静态字段的初始化。这些阶段确保类的正确性和静态成员的初始化。
4. **方法调用：** 当程序执行到类 A 的方法中的对类 B 方法的调用时，JVM 会检查类 B 是否已经加载并初始化。如果类 B 尚未初始化，JVM 将首先执行类 B 的初始化。然后，JVM 执行类 B 中被调用的方法。

**编译器和加载器是怎么知道A类依赖B类的？**
1. **编译阶段：** 在编译 Java 源代码时，编译器会生成类的字节码文件（`.class` 文件），其中包含了对其他类的引用。当类 A 中的方法调用类 B 的方法时，类 A 的字节码文件会包含对类 B 的引用。这个引用通常是符号引用，其中包括类 B 的名称以及方法的签名等信息。编译器并不关心类 B 是否已经存在，它只生成符号引用。
2. **类路径（Classpath）：** 类加载器在加载类时需要查找字节码文件。类路径是一个包含目录和 JAR 文件的列表，用于告诉类加载器在哪里查找类的字节码文件。类加载器会根据类路径查找类的字节码文件，并加载它们到内存中。如果类 B 的字节码文件位于类路径中，类加载器能够找到并加载类 B。
3. **类加载时机：** 类加载是按需进行的。当类 A 在运行时首次引用类 B 时，类加载器会尝试加载类 B。如果类 B 的字节码文件可以在类路径中找到，那么它将被加载到内存中。加载后，类 B 就可以被类 A 的方法引用和使用。

### 反射机制是什么？
Java 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性；这种动态获取信息以及动态调用对象方法的功能称为 Java 语言的反射机制。简单来说，**反射机制指的是程序在运行时能够获取自身的信息**。在 Java 中，只要给定类的名字，就可以通过反射机制来获得类的所有信息。

Java 反射机制在**服务器程序**和**中间件**程序中得到了广泛运用。在服务器端，往往需要根据客户的请求，动态调用某一个对象的特定方法。此外，在 ORM 中间件的实现中，运用 Java 反射机制可以读取任意一个 JavaBean 的所有属性，或者给这些属性赋值。

Java 反射机制主要提供了以下功能，这些功能都位于`java.lang.reflect`包。
- 在运行时判断任意一个对象所属的类。
- 在运行时构造任意一个类的对象。
- 在运行时判断任意一个类所具有的成员变量和方法。
- 在运行时调用任意一个对象的方法。
- 生成动态代理。

所有 Java 类均继承了 Object 类，在 Object 类中定义了一个 **getClass**() 方法，该方法返回同一个类型为 **Class** 的对象
Class 的对象的常用方法：

| 类型 | 访问方法 | 返回值类型 | 说明 |
| ---- | ---- | ---- | ---- |
| 包路径 | getPackage() | Package 对象 | 获取该类的存放路径 |
| 类名称 | getName() | String 对象 | 获取该类的名称 |
| 继承类 | getSuperclass() | Class 对象 | 获取该类继承的类 |
| 实现接口 | getlnterfaces() | Class 型数组 | 获取该类实现的所有接口 |
| 构造方法 | getConstructors() | Constructor 型数组 | 获取所有权限为 public 的构造方法 |
|  | getDeclaredContruectors() | Constructor 对象 | 获取当前对象的所有构造方法 |
| 方法 | getMethods() | Methods 型数组 | 获取所有权限为 public 的方法 |
|  | getDeclaredMethods() | Methods 对象 | 获取当前对象的所有方法 |
| 成员变量 | getFields() | Field 型数组 | 获取所有权限为 public 的成员变量 |
|  | getDeclareFileds() | Field 对象 | 获取当前对象的所有成员变量 |
| 内部类 | getClasses() | Class 型数组 | 获取所有权限为 public 的内部类 |
|  | getDeclaredClasses() | Class 型数组 | 获取所有内部类 |
| 内部类的声明类 | getDeclaringClass() | Class 对象 | 如果该类为内部类，则返回它的成员类，否则返回 null |

#### Java 反射机制的优缺点
优点：
- 能够运行时动态获取类的实例，大大提高系统的**灵活性**和**扩展性**。
- 与 Java 动态编译相结合，可以实现无比强大的功能。
- 对于 Java 这种先编译再运行的语言，能够让我们很方便的创建灵活的代码，这些代码可以**在运行时装配**，无需在组件之间进行源代码的链接，更加容易实现面向对象。

缺点：
- 反射会消耗一定的系统资源，因此，如果不需要动态地创建一个对象，那么就不需要用反射；
- 反射调用方法时可以**忽略权限检查**，获取这个类的私有方法和属性，因此可能会破坏类的封装性而导致安全问题。
### 反射机制API
java.lang.Class 类是实现反射的关键所在。Class **没有公有的构造方法**，Class 实例是由 JVM 在类加载时自动创建的。

获取Class 实例：
```java
// 1. 通过类型class静态变量
Class clz1 = String.class;
String str = "Hello";

// 2. 通过对象的getClass()方法
Class clz2 = str.getClass();

// 3. Class.forName
Class c = Class.forName("java.lang.String");
```

java.lang.reflect 包提供了反射中用到类，主要的类说明如下：
- **Constructor** 类：提供类的构造方法信息。
- **Field** 类：提供类或接口中成员变量信息。
- **Method** 类：提供类或接口成员方法信息。
- **Array** 类：提供了动态创建和访问 Java 数组的方法。
- **Modifier** 类：提供类和成员访问修饰符信息。

### 通过反射访问构造方法
**Constructor** 类的常用方法

|方法名称|说明|
|---|---|
|isVarArgs()|查看该构造方法是否允许带可变数量的参数，如果允许，返回 true，否则返回  <br>false|
|getParameterTypes()|按照声明顺序以 Class 数组的形式获取该构造方法各个参数的类型|
|getExceptionTypes()|以 Class 数组的形式获取该构造方法可能抛出的异常类型|
|newInstance(Object … initargs)|通过该构造方法利用指定参数创建一个该类型的对象，如果未设置参数则表示  <br>采用默认无参的构造方法|
|setAccessiable(boolean flag)|如果该构造方法的权限为 private，默认为不允许通过反射利用 netlnstance()  <br>方法创建对象。如果先执行该方法，并将入口参数设置为 true，则允许创建对  <br>象|
|getModifiers()|获得可以解析出该构造方法所采用修饰符的整数|

```java
public class Book {
    String name; // 图书名称
    int id, price; // 图书编号和价格
    // 空的构造方法
    private Book() {
    }
    // 带两个参数的构造方法
    protected Book(String _name, int _id) {
        this.name = _name;
        this.id = _id;
    }
    // 带可变参数的构造方法
    public Book(String... strings) throws NumberFormatException {
        if (0 < strings.length)
            id = Integer.valueOf(strings[0]);
        if (1 < strings.length)
            price = Integer.valueOf(strings[1]);
    }
    // 输出图书信息
    public void print() {
        System.out.println("name=" + name);
        System.out.println("id=" + id);
        System.out.println("price=" + price);
    }
}

public class Test01 {
    public static void main(String[] args) {
        // 获取动态类Book
        Class book = Book.class;
        // 获取Book类的所有构造方法
        Constructor[] declaredContructors = book.getDeclaredConstructors();
        // 遍历所有构造方法
        for (int i = 0; i < declaredContructors.length; i++) {
            Constructor con = declaredContructors[i];
            // 判断构造方法的参数是否可变
            System.out.println("查看是否允许带可变数量的参数：" + con.isVarArgs());
            System.out.println("该构造方法的入口参数类型依次为：");
            // 获取所有参数类型
            Class[] parameterTypes = con.getParameterTypes();
            for (int j = 0; j < parameterTypes.length; j++) {
                System.out.println(" " + parameterTypes[j]);
            }
            System.out.println("该构造方法可能拋出的异常类型为：");
            // 获取所有可能拋出的异常类型
            Class[] exceptionTypes = con.getExceptionTypes();
            for (int j = 0; j < exceptionTypes.length; j++) {
                System.out.println(" " + parameterTypes[j]);
            }
            // 创建一个未实例化的Book类实例
            Book book1 = null;
            while (book1 == null) {
                try { // 如果该成员变量的访问权限为private，则拋出异常
                    if (i == 1) {
                        // 通过执行带两个参数的构造方法实例化book1
                        book1 = (Book) con.newInstance("Java 教程", 10);
                    } else if (i == 2) {
                        // 通过执行默认构造方法实例化book1
                        book1 = (Book) con.newInstance();
                    } else {
                        // 通过执行可变数量参数的构造方法实例化book1
                        Object[] parameters = new Object[] { new String[] { "100", "200" } };
                        book1 = (Book) con.newInstance(parameters);
                    }
                } catch (Exception e) {
                    System.out.println("在创建对象时拋出异常，下面执行 setAccessible() 方法");
                    con.setAccessible(true); // 设置允许访问 private 成员
                }
            }
            book1.print();
            System.out.println("=============================\n");
        }
    }
}
```
### 通过反射执行方法（获取方法）
**Method**类的常用方法
调用invoke的时候，需要传入对象的实例

|静态方法名称|说明|
|---|---|
|getName()|获取该方法的名称|
|getParameterType()|按照声明顺序以 Class 数组的形式返回该方法各个参数的类型|
|getReturnType()|以 Class 对象的形式获得该方法的返回值类型|
|getExceptionTypes()|以 Class 数组的形式获得该方法可能抛出的异常类型|
|**invoke**(Object obj,Object...args)|利用 args 参数执行指定对象 obj 中的该方法，返回值为 Object 类型|
|isVarArgs()|查看该方法是否允许带有可变数量的参数，如果允许返回 true，否则返回 false|
|getModifiers()|获得可以解析出该方法所采用修饰符的整数|
### 通过反射访问成员变量
**Field** 类的常用方法
可以获取和设置成员变量

|方法名称|说明|
|---|---|
|getName()|获得该成员变量的名称|
|getType()|获取表示该成员变量的 Class 对象|
|get(Object obj)|获得指定对象 obj 中成员变量的值，返回值为 Object 类型|
|set(Object obj, Object value)|将指定对象 obj 中成员变量的值设置为 value|
|getlnt(0bject obj)|获得指定对象 obj 中成员类型为 int 的成员变量的值|
|setlnt(0bject obj, int i)|将指定对象 obj 中成员变量的值设置为 i|
|setFloat(Object obj, float f)|将指定对象 obj 中成员变量的值设置为 f|
|getBoolean(Object obj)|获得指定对象 obj 中成员类型为 boolean 的成员变量的值|
|setBoolean(Object obj, boolean b)|将指定对象 obj 中成员变量的值设置为 b|
|getFloat(Object obj)|获得指定对象 obj 中成员类型为 float 的成员变量的值|
|setAccessible(boolean flag)|此方法可以设置是否忽略权限直接访问 private 等私有权限的成员变量|
|getModifiers()|获得可以解析出该方法所采用修饰符的整数|

### 在远程方法调用中运用反射机制
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230928104011.png)

**Call类，封装了远程过程调用信息**
```java
import java.io.Serializable;
public class Call implements Serializable {
    private static final long serialVersionUID = 6659953547331194808L;
    private String className; // 表示类名或接口名
    private String methodName; // 表示方法名
    private Class[] paramTypes; // 表示方法参数类型
    private Object[] params; // 表示方法参数值
    // 表示方法的执行结果
    // 如果方法正常执行，则result为方法返回值，如果方法抛出异常，那么result为该异常。
    private Object result;
    public Call() {
    }
    public Call(String className, String methodName, Class[] paramTypes, Object[] params) {
        this.className = className;
        this.methodName = methodName;
        this.paramTypes = paramTypes;
        this.params = params;
    }
    public String getClassName() {
        return className;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    public String getMethodName() {
        return methodName;
    }
    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }
    public Class[] getParamTypes() {
        return paramTypes;
    }
    public void setParamTypes(Class[] paramTypes) {
        this.paramTypes = paramTypes;
    }
    public Object[] getParams() {
        return params;
    }
    public void setParams(Object[] params) {
        this.params = params;
    }
    public Object getResult() {
        return result;
    }
    public void setResult(Object result) {
        this.result = result;
    }
    public String toString() {
        return "className=" + className + "methodName=" + methodName;
    }
}
```

**客户端**
```java
import java.io.*;
import java.net.*;
import java.util.*;
import java.lang.reflect.*;
import java.io.*;
import java.net.*;
import java.util.*;
public class SimpleClient {
    public void invoke() throws Exception {
        Socket socket = new Socket("localhost", 8000);
        OutputStream out = socket.getOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(out);
        InputStream in = socket.getInputStream();
        ObjectInputStream ois = new ObjectInputStream(in);
        // 创建一个远程调用对象
        Call call = new Call("ch12.HelloService", "echo", new Class[] { String.class }, new Object[] { "Java" });
        oos.writeObject(call); // 向服务器发送Call对象
        call = (Call) ois.readObject(); // 接收包含了方法执行结果的Call对象
        System.out.println(call.getResult());
        ois.close();
        oos.close();
        socket.close();
    }
    public static void main(String args[]) throws Exception {
        new SimpleClient().invoke();
    }
}
```

**服务器端**
```java
public interface HelloService {
    public String echo(String msg);
    public Date getTime();
}

public class HelloServiceImpl implements HelloService {
    @Override
    public String echo(String msg) {
        return "echo:" + msg;
    }
    @Override
    public Date getTime() {
        return new Date();
    }
}

public class SimpleServer {
    private Map remoteObjects = new HashMap(); // 存放远程对象的缓存
    /** 把一个远程对象放到缓存中 */
    public void register(String className, Object remoteObject) {
        remoteObjects.put(className, remoteObject);
    }
    public void service() throws Exception {
        ServerSocket serverSocket = new ServerSocket(8000);
        System.out.println("服务器启动.");
        while (true) {
            Socket socket = serverSocket.accept();
            InputStream in = socket.getInputStream();
            ObjectInputStream ois = new ObjectInputStream(in);
            OutputStream out = socket.getOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(out);
            Call call = (Call) ois.readObject(); // 接收客户发送的Call对象
            System.out.println(call);
            call = invoke(call); // 调用相关对象的方法
            oos.writeObject(call); // 向客户发送包含了执行结果的Call对象
            ois.close();
            oos.close();
            socket.close();
        }
    }
    public Call invoke(Call call) {
        Object result = null;
        try {
            String className = call.getClassName();
            String methodName = call.getMethodName();
            Object[] params = call.getParams();
            Class classType = Class.forName(className);
            Class[] paramTypes = call.getParamTypes();
            Method method = classType.getMethod(methodName, paramTypes);
            Object remoteObject = remoteObjects.get(className); // 从缓存中取出相关的远程对象
            if (remoteObject == null) {
                throw new Exception(className + "的远程对象不存在");
            } else {
                result = method.invoke(remoteObject, params);
            }
        } catch (Exception e) {
            result = e;
        }
        call.setResult(result); // 设置方法执行结果
        return call;
    }
    public static void main(String args[]) throws Exception {
        SimpleServer server = new SimpleServer();
        // 把事先创建的HelloServiceImpl对象加入到服务器的缓存中
        server.register("ch13.HelloService", new HelloServiceImpl());
        server.service();
    }
}
```

### 高级应用之通过反射操作泛型
#### 泛型和 Class 类
```java
// 未加泛型前
public class ObjectFactory {
    public static Object getInstance(String clsName) {
        try {
            // 创建指定类对应的Class对象
            Class cls = Class.forName(clsName);
            // 返回使用该Class对象创建的实例
            return cls.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
// 获取实例后需要强制类型转换
Date d = (Date)ObjectFactory.getInstance("java.util.Date");

//加泛型后
public class ObjectFactory2 {
    public static <T> T getInstance(Class<T> cls) {
        try {
            return cls.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static void main(String[] args) {
        // 获取实例后无须类型转换
        Date d = CrazyitObjectFactory2.getInstance(Date.class);
        JFrame f = CrazyitObjectFactory2.getInstance(JFrame.class);
    }
}
```


## 输入/输出流
### 流是什么？
- 流是一组有序的**数据序列**，将数据从一个地方带到另一个地方。
- 根据数据流向的不同，可以分为输入（Input）流和输出（Output）流两种。
- 数据流的处理只能按照**数据序列的顺序来进行**，即前一个数据处理完之后才能处理后一个数据
- 对流有不同的处理方法，所以就会产生不同的流对象，不同的流对象会对流进行不同的处理方式
- 流实现的基本要素：流的长度、当前流的位置、对流的处理方式
- 对流的处理方式
	- 比如一次处理几个字节
	- 处理的数据如何解析
	- 流作用的对象：内存、文件、socket、输入设备、输出设备
- 不同类型的流可以通过组合实现更强大的作用

数据流是 Java 进行 I/O 操作的对象，它按照不同的标准可以分为不同的类别。
- 按照流的方向主要分为**输入流**和**输出流**两大类。
- 数据流按照数据单位的不同分为**字节流**和**字符流**。

1. **字节流 vs. 字符流：**
    - `InputStream` 是字节流，用于以字节的形式读取数据。
    - `Reader` 是字符流，用于以字符的形式读取数据。
2. **字符编码：**
    - `InputStream` 操作的是字节数据，因此它不关心字符编码，而且在读取时不会对字符进行解码。这意味着它适用于处理二进制数据或不需要字符编码的情况。
    - `Reader` 以字符形式读取数据，并且可以指定字符编码，因此它适用于处理文本数据，能够正确地解码字符。
3. **字符集处理：**
    - `InputStream` 不处理字符集，它只是读取字节并提供字节数据。
    - `Reader` 能够根据指定的字符集（如UTF-8、UTF-16等）来解码字节流为字符数据，确保正确的字符处理。
4. **适用场景：**
    - `InputStream` 适用于处理二进制数据或字节数据，如图像、音频等。
    - `Reader` 适用于处理文本文件，如读取文本文档、配置文件等。
5. **读取方法：**
    - `InputStream` 提供了字节读取方法，如 `read(byte[] buffer)`，`read()` 等，用于读取字节。
    - `Reader` 提供了字符读取方法，如 `read(char[] buffer)`，`read()` 等，用于读取字符。  `char`为两个字节

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230928112857.png)


**缓冲流**
**BufferedReader** 类主要用于辅助其他字符输入流，它带有**缓冲区**，可以**先将一批数据读到内存缓冲区**。接下来的读操作就可以直接从缓冲区中获取数据，而不需要每次都从**数据源**读取数据并进行字符编码转换，这样就可以提高数据的读取效率。

### 转换流：InputStreamReader和OutputStreamWriter
InputStreamReader 用于将字节输入流**转换为**字符输入流，其中 OutputStreamWriter 用于将字节输出流**转换为**字符输出流。使用转换流可以在一定程度上避免乱码，还可以指定输入输出所使用的字符集。


在 Java 中，流的转换是指将一个类型的流（InputStream、OutputStream、Reader、Writer）转换为另一个类型的流。这种转换通常涉及字符编码、数据格式的转换或包装流以提供额外的功能。流的转换可以通过 Java 标准库提供的类和方法来实现。

1. **字节流和字符流的转换：**
   - `InputStream` 和 `OutputStream` 是用于字节数据的流。
   - `Reader` 和 `Writer` 是用于字符数据的流。
   - 可以使用 `InputStreamReader` 和 `OutputStreamWriter` 将字节流转换为字符流，以便进行字符编码和解码。

   ```java
   InputStream byteInput = ...;
   InputStreamReader reader = new InputStreamReader(byteInput, "UTF-8"); // 将字节流转换为字符流，使用UTF-8编码
   ```

2. **缓冲流的包装：**
   - `BufferedInputStream` 和 `BufferedOutputStream` 可以包装字节流，提供缓冲功能，提高读取和写入的效率。
   - `BufferedReader` 和 `BufferedWriter` 可以包装字符流，提供字符缓冲功能。

   ```java
   InputStream inputStream = ...;
   BufferedInputStream bufferedInput = new BufferedInputStream(inputStream);

   Reader reader = ...;
   BufferedReader bufferedReader = new BufferedReader(reader);
   ```

3. **数据格式的转换：**
   - `ObjectInputStream` 和 `ObjectOutputStream` 用于序列化和反序列化对象，将对象转换为字节流和从字节流还原对象。
   - `DataInputStream` 和 `DataOutputStream` 用于读写**基本数据类型**的二进制格式。

   ```java
   ObjectOutputStream objectOutput = new ObjectOutputStream(outputStream);
   objectOutput.writeObject(someObject);

   DataOutputStream dataOutput = new DataOutputStream(outputStream);
   dataOutput.writeInt(42);
   ```

4. **其他功能性包装：**
   - 有许多其他流包装类可用于添加额外的功能，例如**压缩、加密、字符集转换**等。

   ```java
   InputStream input = ...;
   GZIPInputStream gzipInput = new GZIPInputStream(input); // 压缩流包装

   Reader reader = ...;
   InputStreamReader utf8Reader = new InputStreamReader(reader, "UTF-8"); // 字符集转换
   ```


### 转换流的设计模式
在 Java 中，流的转换通常涉及到**装饰器设计模式**（Decorator Pattern）。装饰器模式允许您通过**包装（装饰）一个基本组件（例如流）来添加额外的功能**，而**不需要改变其接口**。这样，您可以在运行时动态地组合多个装饰器，以实现不同的功能组合，同时保持代码的灵活性和可维护性。

以下是一个示例说明流转换中装饰器模式的应用：

假设您有一个基本的输出流 `OutputStream`，希望在写入数据之前进行缓冲，以提高性能。您可以使用装饰器模式来包装这个基本组件，并添加缓冲功能。

```java
OutputStream outputStream = ...;  // 基本的输出流

// 使用装饰器模式添加缓冲功能
BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
```

在这个示例中，`BufferedOutputStream` 是一个装饰器类，它接受一个基本的 `OutputStream` 作为构造函数参数，并在其上添加了缓冲功能。它仍然实现了 `OutputStream` 接口，因此可以作为输出流使用，但它会在底层调用基本输出流的方法之前进行缓冲。

这个装饰器模式的应用允许您在不改变现有代码结构的情况下，通过组合不同的装饰器来实现不同的功能组合。例如，您可以进一步包装 `BufferedOutputStream`，以添加字符编码转换的功能：

```java
OutputStream outputStream = ...;  // 基本的输出流

// 使用装饰器模式添加缓冲和字符编码转换功能
BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
OutputStreamWriter writer = new OutputStreamWriter(bufferedOutputStream, "UTF-8");
```

在这个示例中，`OutputStreamWriter` 是另一个装饰器类，它接受一个输出流并添加了字符编码转换的功能。

通过不断地堆叠装饰器，您可以根据需求动态构建出适用于不同场景的流。这是装饰器设计模式在 Java 流操作中的典型应用之一。

## 注解

### 注解（Annotation）简介
可以把注解理解为**代码里的特殊标记**，这些标记可以在编译、类加载和运行时**被读取**，并执行相应的处理。开发人员可以通过注解在不改变原有代码和逻辑的情况下在源代码中嵌入补充信息。

注解并不能改变程序的运行结果，也不会影响程序运行的性能。有些注解可以在编译时给用户提示或警告，有的注解可以在运行时读写字节码文件信息。

注解常见的作用有以下几种：
1. 生成帮助文档。这是最常见的，也是 Java 最早提供的注解。常用的有 @see、@param 和 @return 等；
2. 跟踪代码依赖性，实现替代配置文件功能。比较常见的是 [Spring](http://c.biancheng.net/spring/) 2.5 开始的基于注解配置。作用就是减少配置。现在的框架基本都使用了这种配置来减少配置文件的数量；
3. 在编译时进行格式检查。如把 @Override 注解放在方法前，如果这个方法并不是重写了父类方法，则编译时就能检查出。

- **@Override**
告诉编译器检查这个方法，保证父类要包含一个被该方法重写的方法，否则就会编译出错

- **@Deprecated**
表示某个元素（类、方法等）已过时

- **@SuppressWarnings**
抑制编译器警告

- **@FunctionalInterface**
指定某个接口必须是函数式接口，只能修饰接口，不能修饰其它程序元素

### 元注解作用及使用
元注解是负责**对其它注解进行说明的注解**，**自定义注解**时可以使用元注解。

- **@Documented**
标记注解，没有成员变量。用 @Documented 注解修饰的**注解**类会被 JavaDoc 工具提取成文档。

- **@Target** 
指定一个注解的使用范围，即被 @Target 修饰的注解可以用在什么地方。比如用于：方法、成员变量、包、类、接口等

- **@Retention** 
用于描述注解的生命周期，也就是该注解被保留的时间长短。比如：
1. SOURCE：在源文件中有效（即源文件保留）
2. CLASS：在 class 文件中有效（即 class 保留）
3. RUNTIME：在运行时有效（即运行时保留）

- **@Inherited** 
标记注解，用来指定该注解可以被继承。使用 @Inherited 注解的 Class 类，表示这个注解可以被用于该 Class 类的子类。就是说如果某个类使用了被 @Inherited 修饰的注解，则其**子类将自动具有该注解**。

- **@Repeatable** 
注解是 Java 8 新增加的，它允许在相同的程序元素中重复注解，在需要对同一种注解多次使用时，往往需要借助 @Repeatable 注解

### 自定义注解
**标记注解**：没有定义成员变量的注解类型被称为标记注解。这种注解仅利用自身的存在与否来提供信息，如前面介绍的 @Override、@Test 等都是标记注解。
**元数据注解**：包含成员变量的注解，因为它们**可以接受更多的元数据**，所以也被称为元数据注解。

```java
// 定义一个简单的注解类型
public @interface Test {
}

// 定义带两个成员变量的注解
public @interface MyTag {
    // 使用default为两个成员变量指定初始值
    String name() default "C语言中文网";
    int age() default 7;
}

// 使用定义的注解
public class Test {
    // 使用带成员变量的注解时，需要为成员变量赋值
    @MyTag(name="xx", age=6)
    public void info() {
        ...
    }
    ...
}
```

### 通过反射获取注解信息
使用注解修饰了类、方法、变量等成员之后，这些注解不会自己生效，**必须由开发者提供相应的工具来提取处理**。要想获取类、方法或变量的注解信息，**必须通过 Java 的反射技术来获取 Annotation 对象，除此之外没有其它方法**。

只有当定义注解时使用了 @Retention(RetentionPolicy.RUNTIME) 修饰，该注解才会在运行时可见。

使用例子：
```java
/**
* 这是自定义注解的类
*/
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyRequestMapping {
    String value(); // 这是注解的一个属性字段，也就是在使用注解时填写在括号里的参数
}


@MyRequestMapping("/test")
public class TestController {
    public void test() {
        System.out.println("进入Test方法");
    }
}

public class Test {
    public static void main(String[] args) {
        Class<?> c = TestController.class;  // Class是泛型类，此处?表示不关心具体的类型
        MyRequestMapping baseRequestMapping = c.getAnnotation(MyRequestMapping.class);
        System.out.println(baseRequestMapping.value()); // 输出value的值
    }
}
```


## 多线程
线程创建和基本控制方法，线程的互斥和同步

### 线程的生命周期
涉及线程的不同状态和状态之前的切换
一个线程“创建->工作->死亡”的过程称为 线程的生命周期.线程生命周期共有五个状态:
新建状态、就绪状态、运行状态、阻塞状态和死亡状态

- 新建状态 
新建状态指创建了一个线程，但它还没有启动。处于新建状态的线程对象，只能够被启动或终止。例如，以下代码使线程myThread 处于新建状态：
```java
Thread mythread = new Thread();
```

- 就绪状态 
就绪状态是当线程处于新建状态后， 调用了 `start()`方法，线程就处于就绪状态。就绪状态线程具备了运行条
件，但尚未进入运行状态。处于就绪状态的线程**可有多个，这些就绪状态的线程将在就绪队列中排队**， 等待 CPU 资
源。线程通过线程调试获得 CPU 资源变成运行状态。例如，以下代码使线程 myThread 进入就绪状态：
```java
myThread.start();
```

- 运行状态 
运行状态是某个就绪状态的线程获得 CPU 资源，正在运行。如果有更高优先级的线程进入就绪状态，则该线程
将被迫放弃对 CPU 的控制权，进入就绪状态。使用 `yield()`方法可以使线程主动放弃 CPU。线程也可能由于执
行结束或执行 `stop()`方法进入死亡状态。每个线程对象都有一个 `run()`方法，当线程对象开始执行时，系统就
调用该对象的 `run()`方法。

- 阻塞状态 
阻塞状态是正运行的线程遇到某个特殊情况。例如，延迟、挂起、等待Ｉ/Ｏ操作完成等。进入阻塞状态的线程
让出 CPU，并暂时停止自己的执行。线程进入阻塞状态后，就一直等待，直到引起阻塞的原因被消除，线程又
转入就绪状态，进入**就绪队列**排队。当线程再次变成运行状态时，将从原来暂停处开始继续运行。

**线程从阻塞状态恢复到就绪**
状态有三种途径： 
- 自动恢复（例如：sleep 时间到、I/O 操作完成）； 
- 用 resume()方法恢复；
- 用 notify()或notifyAll()方法通知恢复
也可能因为别的线程强制某个处于阻塞状态的线程终止，该线程就从阻塞状态进入死亡状态。

- 死亡状态
死亡状态是指线程不再具有继续运行的能力，也不能再转到其他状态。一般有两种情况使一个线程终止，进入死亡状态
- 一是线程完成了全部工作，即执行完` run()`方法的最后一条语句。 
- 另一种是线程被提前强制性终止。

线程的生命周期图，图中给出从一种状态转变成另一种状态的各种可能的原因。
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20231009093953.png)

**线程调度与优先级**
Java 提供了一个线程调度器来监视和控制就绪状态的线程。线程的调度策略采用 **抢占式**，优先级高的线程比优先级
低的线程 优先执行。在 **优先级相同**的情况下，就按“ **先到先服务**”的原则。线程的优先级用数值表示，数值越大优先级
越高（ 范围 1~10） ）。每个线程根据继承特性自动从父线程获得一个线程的优先级，也可在程序中重新设置。对于任务较
紧急的重要线程，可安排较高的优先级。相反，则给一个较低的优先级。


### 线程的创建
一是 继承 Thread 类声明 Thread 子类，用 Thread 子类创建线程对象。
二是在类中实现 Runnable 接口，在类中提供 Runnable 接口的 run()方法。

1. **继承 Thread 类**：
   - 你可以创建一个自定义的类，继承自 `Thread` 类，并重写 `run()` 方法来定义线程的执行逻辑。然后，创建该类的对象并调用 `start()` 方法来启动线程。
   - 类似c++中多态实现自定义逻辑
     ```java
     class MyThread extends Thread {
         public void run() {
             // 线程的执行逻辑
         }
     }

     public class Main {
         public static void main(String[] args) {
             MyThread myThread = new MyThread();
             myThread.start();
         }
     }
     ```

1. **实现 Runnable 接口**：
   - 你可以创建一个类，实现 `Runnable` 接口，并实现 `run()` 方法。然后，创建一个 `Thread` 对象，将 `Runnable` 实例作为参数传递给 `Thread` 构造函数，并调用 `start()` 方法来启动线程。
   - 类似c++中函数对象实现自定义逻辑
     ```java
     class MyRunnable implements Runnable {
         public void run() {
             // 线程的执行逻辑
         }
     }

     public class Main {
         public static void main(String[] args) {
             MyRunnable myRunnable = new MyRunnable();
             Thread thread = new Thread(myRunnable);
             thread.start();
         }
     }
     ```

3. **使用匿名内部类**：
   - 你可以使用匿名内部类来实现 `Runnable` 接口或继承 `Thread` 类，以便更紧凑地创建线程,原理跟上面的类似。
     ```java
     Thread thread = new Thread(new Runnable() {
         public void run() {
             // 线程的执行逻辑
         }
     });
     thread.start();
     ```

4. **使用 Java 8 的 Lambda 表达式**：
   - 如果你的 Java 版本支持 Lambda 表达式，你可以使用它们来更简洁地创建线程。
     ```java
     Thread thread = new Thread(() -> {
         // 线程的执行逻辑
     });
     thread.start();
     ```



### 线程互斥和同步

#### 互斥
多线程互斥使用共享资源的程序段，在操作系统中称为**临界段**。临界段是一种加锁的机制，与多线程共享资源有关。
临界段 的作用是**在任何时刻一个共享资源只能供一个线程使用**。当资源未被占用，线程可以进入处理这个资源的段，
从而得到该资源的使用权；当线程执行完毕，便退出临界段。如果一个线程已某个共享资源的临界段，并且还没有
使用结束，其他线程必须等待。
在Java中，你可以使用以下方式来实现线程的互斥，以确保多个线程之间不会同时访问共享资源，从而避免竞态条件（Race Condition）和数据不一致的问题：

1. **使用synchronized关键字**：
   - `synchronized` 关键字可用于**方法**或**代码块**，它会锁定指定的对象，确保在同一时间只有一个线程可以访问被 `synchronized` 保护的代码块。
   - 示例：
   - 它会尝试获取当前对象的锁（this 是默认的锁对象）。
   - 在这个示例中，如果一个线程正在执行 method1()，那么其他线程就不能同时执行 method2()，因为它们都需要获得相同对象的锁。
     ```java
	public class MyClass {
	    public synchronized void method1() {
	        // 互斥的方法体1
	    }
	
	    public synchronized void method2() {
	        // 互斥的方法体2
	    }
	}

	// 可以等价地描述成如下：
	void method1(){
		synchronized(this){ 需要同步的代码}
	}
     ```

代码块：lock的是指定的对象
```java
public class MyCounter {
    private int count = 0;
    private Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            // 互斥的代码块
            count++;
        }
    }

    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}
```

2. **使用同步代码块**：
   - 你可以使用同步代码块来锁定指定的对象，以实现互斥。
   - 示例：
     ```java
     private Object lock = new Object();

     public void someMethod() {
         synchronized (lock) {
             // 互斥的代码块
         }
     }
     ```

3. **使用ReentrantLock**：
   - `ReentrantLock` 是Java中的一个可重入锁，它提供了更多的灵活性和控制。你可以使用 `tryLock` 方法来尝试获取锁，并可以设置超时时间等选项。
   - 示例：
     ```java
     import java.util.concurrent.locks.ReentrantLock;

     private ReentrantLock lock = new ReentrantLock();

     public void someMethod() {
         lock.lock();
         try {
             // 互斥的代码块
         } finally {
             lock.unlock();
         }
     }
     ```

4. **使用volatile关键字**：
   - `volatile` 关键字用于标记变量，以确保对变量的读取和写入操作都是原子性的。虽然它不能用来锁定代码块，但可以用于实现一些简单的互斥。
   - 示例：
     ```java
     private volatile int sharedVariable = 0;
     ```

5. **使用同步集合**：
   - Java提供了一些同步集合类，如 `Collections.synchronizedList()`，`Collections.synchronizedMap()` 等，用于确保多线程访问集合时的互斥。
   - 示例：
     ```java
     List<String> synchronizedList = Collections.synchronizedList(new ArrayList<>());
     ```

#### 同步
线程同步的主要目标是避免竞态条件（Race Condition）和数据不一致，确保多个线程能够协调访问共享资源，以避免潜在的问题。

请注意实现线程同步的一般原则：如果两个或多个线程修改同一个对象，那么将执行修改的操作方法用关键字
`synchronized` 修饰之，使它成为临界段。
如果进入临界段的线程必须等待某个对象的状态被改变，那么应调用 `wait()`方法，使线程等待。反之，当另一个进
入临界段的线程修改了某个对象的状态后，就应该调用 `notify()`方法，及时通知那些处于等待的线程，它们等待的环境
已经发生了改变。

如果发生多个线程形成一个等待环，即第一个线程在等候第二个线程，而第二个线程在等候第三个线程，依次类推，最
后一个线程在等候第一个线程。这样，所有线程都陷入相互等待的状态。这个循环等待现象称为**死锁**。在互斥同步机制
的实现中，稍有不当，就可能产生死锁。Java 语言对死锁问题没有特别处理，只能由用户在编程时注意。


`wait()`、`notify()` 和 `notifyAll()` 是Java中用于线程同步和通信的方法，通常用于协调多个线程之间的操作。它们通常与`synchronized`关键字一起使用。以下是它们的用法和示例：

1. `wait()` 方法：
   - `wait()` 方法使当前线程进入等待状态，并释放当前对象的锁，允许其他线程获取该锁。当返回是重新获得锁。
   - 使用方式：
     ```java
     synchronized (lockObject) {
         // 一些代码
         lockObject.wait(); // 当前线程等待，并释放锁
         // 一些其他代码
     }
     ```

2. `notify()` 方法：
   - `notify()` 方法用于唤醒等待在同一对象上的一个等待线程。它选择其中一个等待线程唤醒，但不确定唤醒哪一个。
   - 使用方式：
     ```java
     synchronized (lockObject) {
         // 一些代码
         lockObject.notify(); // 唤醒一个等待线程
         // 一些其他代码
     }
     ```

3. `notifyAll()` 方法：
   - `notifyAll()` 方法用于唤醒等待在同一对象上的所有等待线程。
   - 使用方式：
     ```java
     synchronized (lockObject) {
         // 一些代码
         lockObject.notifyAll(); // 唤醒所有等待线程
         // 一些其他代码
     }
     ```

以下是一个使用`wait()`、`notify()` 和 `notifyAll()` 的示例，用于线程间的简单通信：

```java
public class WaitNotifyExample {
    public static void main(String[] args) {
        final Object lockObject = new Object();

        Thread producer = new Thread(() -> {
            synchronized (lockObject) {
                System.out.println("Producer: Producing something...");
                try {
                    Thread.sleep(2000); // 模拟生产过程
                    lockObject.notify(); // 唤醒等待的线程
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread consumer = new Thread(() -> {
            synchronized (lockObject) {
                System.out.println("Consumer: Waiting for something to be produced...");
                try {
                    lockObject.wait(); // 等待被唤醒
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("Consumer: Consumed the product.");
            }
        });

        producer.start();
        consumer.start();
    }
}
```


## 图形界面设计

先前用Java 编写GUI 程序，是使用抽象窗口工具包 **AWT(Abstract Window Toolkit)**. 现在多用Swing。**Swing** 可以看作是
AWT 的改良版，而不是代替 AWT，是对 AWT 的提高和扩展。所以，在写 GUI 程序时，Swing 和 AWT 都要作用。它们共存于 Java基础类(Java Foundation Class,JFC)中。

AWT 和 Swing 的区别：
1. 是否包含本地代码，AWT包含本地代码，Swing不包含本地代码
2. AWT被称为重量级组件，Swing被称为轻量级组件，当两者同时绘制时，重量级组件会覆盖轻量级组件
3. AWT 在不同平台上运行相同的程序，界面的外观和风格可能会有一些差异。然而，一个基于 Swing 的应用程序可能在任何平台上都会有相同的外观和风格。而 Swing 有自己的机制，在主平台提供的窗口中绘制和管理界面组件。
4. Swing 中的类是从 AWT 继承的，有些 Swing 类直接扩展 AWT 中对应的类。例如，JApplet、JDialog、JFrame和JWindow。


使用Swing 设计图形界面，主要引入两个包：
`javax.swing` 包含Swing 的基本类；`java.awt.event` 包含与处理事件相关的接口和类。


1.选择组件 2.设置布局 3.添加响应事件

###  组件和容器
**组件**(component)是图形界面的基本元素，用户可以直接操作，例如按钮。**容器**(Container)是图形界面的的复合元素，容器可以包含组件，例如面板

Java 语言为每种组件都预定义类，程序通过它们或它们的子类各种组件对象，如，Swing 中预定义的按钮类JButton 是一
种类，程序创建的JButton 对象，或JButton 子类的对象就是按钮。

Java 语言也为每种容器预定义类，程序通过它们或它们的子类创建各种容器对象。例如，Swing 中预定义的窗口类**JFrame** 是一种容器类，程序创建的JFrame 或JFrame 子类的对象就是窗口

为了统一管理组件和容器，为所有组件类定义超类，把组件的共有操作都定义在 **Component** 类中。同样，为所有容器类定
义超类 Container 类，把容器的共有操作都定义在 **Container** 类中。例如，Container 类中定义了 add()方法，大多数容器都可以用add()方法向容器添加组件

**Component**、**Container** 和 **Graphics** 类是 AWT 库中的关键类。为能层次地构造复杂的图形界面，容器被当作特殊的组件，可以把容器放入另一个容器中。
例如，把若干按钮和文本框分放在两个面板中，再把这两个面板和另一些按钮放入窗口中。
这种层次地构造界面的方法，能以增量的方式构造复杂的用户界面。


### 事件驱动程序设计
图形界面上的**事件**是指在某个组件上**发生用户操作**。
对事件作监视的对象称为 **监视器**，监视器提供**响应事件的处理方法**。
为了让监视器与事件对象光联，需要对事件对象作 **监视器注册** ，告诉系统事件对象的监视器。

java语言编写事件处理程序主要有两种方案:
- 一个是程序重设`handleEvent(Eventevt)`,采用这个方案的程序工作量稍大一些。
- 另一个方案是程序实现一些系统设定的接口。java 按事件类型提供多种接口，作为监视器对象的类需要实现相应的接口，即实现响应事件的方法。当事件发生时，系统内设的handleEvent(Event evt)方法就自动调用监视器的类实现的响应事件的方法。

handleEvent的例子：
```java
import java.awt.*;
import java.awt.event.*;

// Frame是awt里面的对象， JFrame是swing中的对象，swing中的对象大都以J开头
public class HandleEventExample extends Frame {

    public HandleEventExample(String title) {
        super(title);
        setSize(300, 200);
    }

    public void paint(Graphics g) {
        g.drawString("Click here", 100, 100);
    }

    public boolean handleEvent(Event evt) {
        if (evt.id == Event.MOUSE_DOWN) {
            System.out.println("Mouse clicked at (" + evt.x + ", " + evt.y + ")");
            return true;
        }
        return super.handleEvent(evt);
    }

    public static void main(String[] args) {
        HandleEventExample frame = new HandleEventExample("HandleEvent Example");
        frame.setVisible(true);
    }
}
```


java.awt.event 包中用来检测并对事件做出反应的模型包括以下 三个组成元素：
(1) **源对象**：事件“发生”这个组件上，它与一组“侦听”该事件的对象保持着联系。
(2) **监视器对象**：一个**实现预定义的接口**的类的一个对象，该对象的类要提供对发生的事件作处理的方法。
(3) **事件对象**：它包含描述当事件发生时从源传递给监视器的特定事件的信息。

在 java 语言中，为了便于系统管理事件，也为了便于程序作监视器注册，系统将事件分类，称为**事件类型**。系统为每个
事件类型**提供一个接口**。要作为监视器对象的类必须实现相应的接口，提供接口规定的响应事件的方法。

```java
import java.awt.*;
import java.awt.event.*;

public class EventHandlingExample {
    public static void main(String[] args) {
        Frame frame = new Frame("Event Handling Example");
        Button button = new Button("Click Me");

        // 创建**事件监听器对象**并 **注册** 到 **源对象**上
        button.addActionListener(new ActionListener() {
	        // ActionEvent为事件对象
	        // actionPerforme为点击事件要实现的接口
            public void actionPerformed(ActionEvent e) {  
                // 事件发生时的处理逻辑
                System.out.println("Button Clicked!");
            }
        });

        // 将按钮添加到框架
        frame.add(button);
        frame.setSize(300, 100);
        frame.setLayout(new FlowLayout());
        frame.setVisible(true);

        // 添加窗口关闭事件监听器
        frame.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }
}
```
在处理事件的方法中，用获取事件源信息的方法获得**事件源信息**，并判断和完成相应处理。获得事件源的方法有：方法
**getSource**()获得事件源对象；方法 **getActionCommand**()获得事件源按钮的 文字信息
在默认情况下，按钮的命令字符串就是按钮上的文字。如有必要可以用方法**setActionCommand**()为界面组件设置命令字符串。

以下是 Java 中一些常见的事件类型接口及其方法，以及这些事件类型通常与哪些组件相关联的表格形式：

| 组件类型          | 事件类型                         | 接口方法                          | 描述                                   |
|------------------|---------------------------------|-----------------------------------|---------------------------------------|
| JButton          | ActionListener                   | `actionPerformed(ActionEvent e)` | 当按钮被点击时触发的事件。            |
| JCheckBox        | ItemListener                    | `itemStateChanged(ItemEvent e)`   | 当复选框的状态发生变化时触发的事件。   |
| JRadioButton     | ItemListener                    | `itemStateChanged(ItemEvent e)`   | 当单选按钮的状态发生变化时触发的事件。 |
| JTextField       | ActionListener, KeyListener      | `actionPerformed(ActionEvent e)`<br>`keyPressed(KeyEvent e)`<br>`keyReleased(KeyEvent e)`<br>`keyTyped(KeyEvent e)` | 当用户按下回车键或输入文本时触发的事件。 |
| JSlider          | ChangeListener                  | `stateChanged(ChangeEvent e)`     | 当滑块的值发生变化时触发的事件。        |
| JList            | ListSelectionListener           | `valueChanged(ListSelectionEvent e)` | 当用户选择列表项时触发的事件。      |
| JTable           | ListSelectionListener, TableModelListener | `valueChanged(ListSelectionEvent e)`<br>`tableChanged(TableModelEvent e)` | 当用户选择表格行或表格数据发生变化时触发的事件。 |
| JComboBox        | ActionListener, ItemListener    | `actionPerformed(ActionEvent e)`<br>`itemStateChanged(ItemEvent e)` | 当用户选择下拉列表中的项时触发的事件。   |
| JMenuBar         | ActionListener                   | `actionPerformed(ActionEvent e)` | 当用户点击菜单项时触发的事件。         |
| JPopupMenu       | ActionListener, MouseListener    | `actionPerformed(ActionEvent e)`<br>`mouseClicked(MouseEvent e)`<br>`mousePressed(MouseEvent e)`<br>`mouseReleased(MouseEvent e)` | 当用户右键点击组件时触发的事件。 |
| JFileChooser     | ActionListener                   | `actionPerformed(ActionEvent e)` | 当用户选择文件时触发的事件。         |
| JTextArea        | ActionListener, KeyListener      | `actionPerformed(ActionEvent e)`<br>`keyPressed(KeyEvent e)`<br>`keyReleased(KeyEvent e)`<br>`keyTyped(KeyEvent e)` | 当用户按下回车键或输入文本时触发的事件。|

`MouseListener` 监听鼠标的点击事件，包括鼠标按下、鼠标释放、鼠标点击、鼠标进入和鼠标离开等事件。
`MouseMotionListener` 则监听鼠标的移动事件，包括鼠标拖动和鼠标移动事件。

### 常见Swing 组件
框架窗口
窗口是GUI 编程的基础，图形界面的应用程序的可视组件都放在窗口中
-  框架窗口(**JFrame**),这是通常意义上的窗口，它支持窗口周边的框架、标题栏，以及最小化、最大化和关闭按钮。
-  一种无边框窗口( **JWindow**)，没有标题栏，没有框架，只是一个空的矩形。


Swing 里的容器都可以添加组件， 除了 **JPanel** 之外， 其他的 Swing 容器 **不允许** 把组件 **直接加入**。

其他容器添加组件有两种方法：
- 一种 是用 `getContentPane() `方法获得内容面板，再将组件加入。
```java
mw.getContentPane().add(button);
```
该代码的意义是获得容器的内容面板，并将按钮button 添加到这个内容面板中。

- 另一种 是建立一个 `JPanel` 对象的**中间容器**，把组件添加到这个容器中，再用 `setContentPane()` 把这个容器置为内容面板。


例如，代码：以下代码把contentPane 置成内容面板
```java
JPanel contentPane = new JPanel();
mw.setContentPane(contentPane);
```

例子：获得内容面板并调用add加入
```java
import javax.swing.*;
public class Example5_1{
	public static void main(String args[]){
		JFrame mw = new JFrame(“我的第一个窗口”);
		mw.setSize(250,200);
		JButton button = new JButton(“我是一个按钮”);
		mw.getContentPane().add(button);
		mw.setVisible(true);
	}
}
```




以下是一些常见的 Swing 组件以及它们的常用方法的示例：

| 组件 | 描述 | 常见方法 |
|---|---|---|
| `JFrame` | 顶级窗口容器 | `setTitle(String title)`: 设置窗口标题<br>`setSize(int width, int height)`: 设置窗口大小<br>`setDefaultCloseOperation(int operation)`: 设置窗口关闭操作 |
| `JPanel` | 面板容器 | `add(Component comp)`: 向面板添加组件<br>`setLayout(LayoutManager manager)`: 设置布局管理器 |
| `JButton` | 按钮 | `setText(String text)`: 设置按钮文本<br>`addActionListener(ActionListener listener)`: 添加按钮的点击事件监听器 |
| `JLabel` | 标签 | `setText(String text)`: 设置标签文本 |
| `JTextField` | 单行文本框 | `getText()`: 获取文本框的内容<br>`setText(String text)`: 设置文本框的内容 |
| `JTextArea` | 多行文本框 | `getText()`: 获取文本区的内容<br>`setText(String text)`: 设置文本区的内容 |
| `JCheckBox` | 复选框 | `isSelected()`: 检查是否选中<br>`setSelected(boolean selected)`: 设置选中状态 |
| `JRadioButton` | 单选按钮 | `isSelected()`: 检查是否选中<br>`setSelected(boolean selected)`: 设置选中状态 |
| `JComboBox` | 下拉框 | `addItem(Object item)`: 向下拉框添加选项<br>`setSelectedIndex(int index)`: 设置选中的索引 |
| `JList` | 列表框 | `setListData(Object[] listData)`: 设置列表的数据<br>`getSelectedValue()`: 获取选中的值 |
| `JTable` | 表格 | `setModel(TableModel dataModel)`: 设置表格模型<br>`getValueAt(int row, int column)`: 获取表格单元格的值 |
| `JSeparator` | 分隔符 | 无常用方法 |
| `JScrollPane` | 滚动面板 | 无常用方法 |
| `JSlider` | 滑块 | `getValue()`: 获取滑块的值<br>`setValue(int value)`: 设置滑块的值 |
| `JProgressBar` | 进度条 | `setValue(int n)`: 设置进度条的值 |
| `JMenuBar` | 菜单栏 | `add(JMenu menu)`: 向菜单栏添加菜单 |
| `JMenu` | 菜单 | `add(JMenuItem menuItem)`: 向菜单添加菜单项 |
| `JMenuItem` | 菜单项 | `addActionListener(ActionListener listener)`: 添加菜单项的点击事件监听器 |
| `JFileChooser` | 文件选择对话框 | `showOpenDialog(Component parent)`: 显示打开文件对话框<br>`showSaveDialog(Component parent)`: 显示保存文件对话框 |
| `JDialog` | 对话框 | 无常用方法 |
| `JOptionPane` | 选项对话框 | `showMessageDialog(Component parent, Object message)`: 显示消息对话框<br>`showInputDialog(Component parent, Object message)`: 显示输入对话框 |
| `JTabbedPane` | 选项卡面板 | `addTab(String title, Component component)`: 添加选项卡页 |
| `JToolBar` | 工具栏 | `add(JButton button)`: 向工具栏添加按钮 |
| `JTree` | 树 | `setModel(TreeModel newModel)`: 设置树的模型<br>`getSelectionPath()`: 获取选中的树节点路径 |
| `JScrollPane` | 滚动面板 | 无常用方法 |
| `JSplitPane` | 分割窗格 | `setTopComponent(Component comp)`: 设置上部分组件<br>`setBottomComponent(Component comp)`: 设置下部分组件 |

面板是一种通用容器，**JPanel 的作用是实现界面的层次结构**，在它上面放入一些组件，也可以在上面绘画，将放有
组件和有画的JPanel 再放入另一个容器里。JPanel 的默认布局为 **FlowLayout**。


### 常见布局
Swing 是 Java 中用于创建图形用户界面 (GUI) 的一个库，它提供了多种布局管理器来帮助开发者设计和排列界面组件。以下是一些常见的 Swing 布局管理器及其主要特点的总结，用表格形式呈现：

| 布局管理器    | 特点                                                      |
| ------------ | --------------------------------------------------------- |
| BorderLayout  | - 将组件分为五个区域：北、南、东、西和中，每个区域只能容纳一个组件。
| GridLayout    | - 将容器分为网格，所有网格具有相同的大小。               |
| FlowLayout   | - 组件按照添加的顺序从左到右排列，当行空间不足时，自动换行。
| CardLayout    | - 可以容纳多个组件，但一次只显示其中一个。               |
| BoxLayout     | - 支持水平和垂直方向的排列，可以创建复杂的布局结构。    |
| GridBagLayout | - 提供高度灵活的布局，可以定制每个组件的位置和大小。    |
| GroupLayout   | - 使用 GroupLayout 特定语法，可以定义复杂的界面布局。   |
| SpringLayout  | - 基于弹簧约束，支持动态和自适应布局。                   |

这些布局管理器提供了各种方式来组织 Swing 界面，以适应不同的需求和设计风格。选择合适的布局管理器取决于您的界面布局要求和设计目标。



### 绘图
程序绘图区域的坐标原点（０，０），一般为屏幕的**左上角**。
#### Ｇraphics 类
在 java.awt 包中，类 `Graphics` 提供的功能有：建立字体、设定显示颜色、显示图像和文本，绘制和填充各种几何
图形。可以从图形对象或使用 Component 的 getGraphics()方法得到 Graphics 对象。Graphics2D 类继承 Graphics 类，
并且增加了许多状态属性，使应用程序可以绘制出更加丰富多彩的图形。

在某个组件中绘图，一般应该为这个组件所属的子类重写 `paint()`方法，在该重写的方法中进行绘图。
但要在JComponent 子类中进行绘图。例如，继承定义一个文本区子类，要在这样的文本区子对象中绘图，就应给这个文本区子类重写 `paintComponent()`。系统自动为程序提供图形对象，并以参数 g 传递给 paint()方法和 paintComponent()方法。

#### 绘图模式
绘图模式是指后绘制的图形与早先绘制的图形有重叠时，如何确定重叠部分的颜色。例如，后绘制的覆盖早先绘制
的；或者后绘制与早先绘制的两种颜色按某种规则混合。主要有**正常模式**和**异或模式**两种：正常模式是后绘制的图形覆
盖在早先绘制的图形之上，使早先贩图形的重叠部分不再可见。异或模式把绘图看作是按图形着色。异或模式绘图时，
将当前正要绘图的颜色、原先绘制的颜色以及异或模式设定的颜色作特定的运算，得到实际绘图颜色。设置绘图模式的
方法有：
- （1）`setPaintMode()`，设置绘图模式为 覆盖模式（正常模式）。正常模式是绘图的默认模式。
- （2）`setXORMode(Color c)`，设置绘图模式为 异或模式，参数 c 为异或模式设定的绘图颜色。

#### 绘图

| 绘制类别   | 方法                                  | 描述                                                         |
| ---------- | ------------------------------------- | ------------------------------------------------------------ |
| 文本绘制   | `drawString(String str, int x, int y)` | 在指定位置绘制文本。                                       |
|            | `setFont(Font font)`                   | 设置文本的字体。                                             |
| 基本图形   | `drawLine(int x1, int y1, int x2, int y2)` | 绘制直线。                                                 |
|            | `drawRect(int x, int y, int width, int height)` | 绘制矩形。                                               |
|            | `fillRect(int x, y, int width, int height)` | 填充矩形。                                                 |
|            | `drawOval(int x, y, int width, int height)` | 绘制椭圆。                                               |
|            | `fillOval(int x, y, int width, int height)` | 填充椭圆。                                               |
|            | `drawRoundRect(int x, y, width, height, arcWidth, arcHeight)` | 绘制带有圆角的矩形。 |
|            | `fillRoundRect(int x, y, width, height, arcWidth, arcHeight)` | 填充带有圆角的矩形。 |
|            | `drawPolygon(int[] xPoints, int[] yPoints, int nPoints)` | 绘制多边形。                                              |
|            | `fillPolygon(int[] xPoints, int[] yPoints, int nPoints)` | 填充多边形。                                              |
| 图像绘制   | `drawImage(Image img, int x, int y, ImageObserver observer)` | 绘制图像。              |
| 颜色和渐变 | `setColor(Color c)`                    | 设置当前绘图颜色。                                          |
|            | `setPaint(GradientPaint paint)`        | 设置渐变颜色。                                            |
| 基本属性   | `setStroke(Stroke s)`                  | 设置绘图轮廓的线条属性，如线宽度和样式。                |
|            | `setRenderingHint(RenderingHints.Key key, Object value)` | 设置渲染提示以改善绘图质量。 |
| 坐标变换   | `translate(int x, int y)`              | 平移坐标系。                                                |
|            | `rotate(double theta)`                 | 旋转坐标系。                                                |
| 裁剪区域   | `setClip(Shape clip)`                  | 设置绘图的裁剪区域，以限制绘制的区域。                  |


