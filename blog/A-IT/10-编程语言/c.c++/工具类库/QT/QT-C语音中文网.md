## 1. Qt是什么？Qt简介（非常全面）
Qt 是一个跨平台的 C++ 框架，Qt 除了支持界面设计（GUI编程），还封装了与网络编程、多线程、数据库连接、视频音频等相关的功能。
Qt 还存在 Python、Ruby、Perl 等脚本语言的绑定， 也就是说可以使用脚本语言开发基于 Qt 的程序
Qt 支持的操作系统有很多，例如通用操作系统 Windows、Linux、Unix，智能手机系统 Android、iOS、WinPhone， 嵌入式系统 QNX、VxWorks 等等
这套 Qt 教程以 Qt 5.9 为基础来介绍 Qt 开发
## 2. Qt和其它GUI库的对比
Qt 和 MFC
读者经常将 MFC 和 Qt 进行对比，MFC 只能应用在 Windows 平台，而 Qt 是跨平台的，一次编写，到处运行。
另外，Qt 已经封装了底层细节，学习 Qt 将会非常简单；而 MFC 只是给 **Windows API 加了一层包装**，不了解 Windows API 也学不好 MFC，大家普遍反映 MFC 难学。

Linux 下的 GUI 库
Linux 下常用的 GUI 库有基于 C++ 的 Qt、GTK+、wxWidgets，以及基于 Java 的 AWT 和 Swing。
其中最著名的就是 Qt 和 GTK+：KDE 桌面系统已经将 Qt 作为默认的 GUI 库，Gnome 桌面系统也将 GTK+ 作为默认的 GUI 库。
相比 GTK+，Qt 的功能更加强大，更新也很快，比较受人们追捧。

## 3. 学习QML还是C++？
Qt4 时代的主流就是传统部件（或叫控件）编程，Qt5 诞生之时，正是手机移动设备蓬勃发展的时候，为了适应手机移动应用开发， Qt5 将 QML 脚本编程提到与传统 C++ 部件编程相同的高度，力推 QML 界面编程
QML 类似于网页设计的 HTML，是一种标记语言，我们可以借助 CSS 对它进行美化，也可以借助 JavaScript 进行交互。有 Web 开发经验的读者学习 QML 将非常轻松。

ML 只能用来进行界面设计和人机交互，也就是只能胜任 UI 部分，在底层仍然需要调用 C++ 编写的组件来完善功能。
现阶段新生的 QML 还不如传统的 C++ 部件编程那样拥有丰富的开发组件，尤其缺乏复杂的企业级应用程序所必须的树等控件。这就决定了至少现阶段，真正大型的桌面程序仍然只能选择以 C++ 为主、QML 为辅的开发模式。
总的来说，C++ 对于 Qt 是不可或缺的，而 QML 只是一个加分项。

## 4. Qt下载（多种下载通道+所有版本）
Qt 官网有一个专门的资源下载网站，所有的开发环境和相关工具都可以从这里下载，具体地址是：[http://download.qt.io/](http://download.qt.io/)

| 目录 | 说明 |
| ---- | ---- |
| archive | 各种 Qt 开发工具安装包，新旧都有（可以下载 Qt 开发环境和源代码）。 |
| community_releases | 社区定制的 Qt 库，Tizen 版 Qt 以及 Qt 附加源码包。 |
| development_releases | 开发版，有新的和旧的不稳定版本，在 Qt 开发过程中的非正式版本。 |
| learning | 有学习 Qt 的文档教程和示范视频。 |
| ministro | 迷你版，目前是针对 [Android](https://c.biancheng.net/android/) 的版本。 |
| official_releases | 正式发布版，是与开发版相对的稳定版 Qt 库和开发工具（可以下载Qt开发环境和源代码）。 |
| online | Qt 在线安装源。 |
| snapshots | 预览版，最新的开发测试中的 Qt 库和开发工具。 |

| 目录 | 说明 |
| ---- | ---- |
| vsaddin | 这是 Qt 针对 Visual Studio 集成的插件，本教程基本不使用 Visual Studio ，所以不需要插件。 |
| qtcreator | 这是 Qt 官方的集成开发工具，但是 qtcreator 本身是个空壳，它没有编译套件和 Qt 开发库。  <br>  <br>除了老版本的 Qt 4 需要手动下载 qtcreator、编译套件、Qt 开发库进行搭配之外，一般用不到。对于我们教程压根不需要下载它，因为 Qt 5 有专门的大安装包，里面包含开发需要的东西，并且能自动配置好。 |
| qt | 这是 Qt 开发环境的下载目录，我们刚说的 Qt 5 的大安装包就在这里面。 |
| online_installers | 在线安装器，国内用户不建议使用，在线安装是龟速，还经常断线。我们教程采用的全部是离线的大安装包。 |
|  |  |

### 国内镜像网站
这里给大家推荐几个国内著名的 Qt 镜像网站，主要是各个高校的：
- 中国科学技术大学：[http://mirrors.ustc.edu.cn/qtproject/](http://mirrors.ustc.edu.cn/qtproject/)
- 清华大学：[https://mirrors.tuna.tsinghua.edu.cn/qt/](https://mirrors.tuna.tsinghua.edu.cn/qt/)
- 北京理工大学：[http://mirror.bit.edu.cn/qtproject/](http://mirror.bit.edu.cn/qtproject/)
- 中国互联网络信息中心：[https://mirrors.cnnic.cn/qt/](https://mirrors.cnnic.cn/qt/)

## 5. 图解Qt安装（Windows平台）
## 6. 图解Qt安装（Linux平台）
## 7. Linux Qt cannot find -lGL错误完美解决方案（亲测有效）
## 8. 解密Qt安装目录的结构
## 9. 认识一下Qt用到的开发工具
Qt 工具集

## 10. Qt编程涉及的术语和名词
## 11. Qt Creator的初步使用
## 12. 编写第一个Qt程序
## 13. 分析第一个Qt程序
## 14. Qt控件和事件
学习 Qt 界面编程，本质上就是学习 Qt 各个控件的用法以及对 Qt 事件的处理

## 15. Qt信号和槽机制详解
信号和槽是 Qt 特有的消息传输机制，它能将相互独立的控件关联起来。
Qt 中的所有控件都具有接收信号的能力，一个控件还可以接收多个不同的信号。对于接收到的每个信号，控件都会做出相应的响应动作。例如，按钮所在的窗口接收到“按钮被点击”的信号后，会做出“关闭自己”的响应动作；
在 Qt 中，对信号做出的响应动作就称为**槽**。
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230523152456.png)

信号和槽机制底层是通过函数间的相互调用实现的。每个信号都可以用函数来表示，称为**信号函数**；每个槽也可以用函数表示，称为**槽函数**。例如，“按钮被按下”这个信号可以用 clicked() 函数表示，“窗口关闭”这个槽可以用 close() 函数表示，信号和槽机制实现“点击按钮会关闭窗口”的功能，其实就是 clicked() 函数调用 close() 函数的效果。

信号函数和槽函数通常位于某个类中，和普通的成员函数相比，它们的特别之处在于：  
- 信号函数用  signals 关键字修饰，槽函数用 public slots、protected slots 或者 private slots 修饰。signals 和 slots 是 Qt 在 C++ 的基础上扩展的关键字，专门用来指明信号函数和槽函数；
- 信号函数只需要声明，不需要定义（实现），而槽函数需要定义（实现）。

为了提高程序员的开发效率，Qt 的各个控件类都提供了一些常用的信号函数和槽函数。
在程序中引入`<QPushButton>`头文件，双击选中“QPushButton”并按 "Fn+F1" 快捷键，就会弹出 QPushButton 类的使用手册

注意，并非所有的控件之间都能通过信号和槽关联起来，信号和槽机制只适用于满足以下条件的控件：
- 控件类必须直接或者间接继承自 QObject 类。Qt 提供的控件类都满足这一条件，这里提供一张 [Qt常用类的继承关系](http://c.biancheng.net/uploads/allimg/211028/2-21102QG3143O.gif)的高清图片，感兴趣的读者可以简单了解一下。
- 控件类中必须包含 private 属性的 Q\_OBJECT 宏。


### connect()函数实现信号和槽
connect() 是 QObject 类中的一个静态成员函数，专门用来关联指定的信号函数和槽函数。
关联某个信号函数和槽函数，需要搞清楚以下 4 个问题：  
- 信号发送者是谁？
- 哪个是信号函数？
- 信号的接收者是谁？
- 哪个是接收信号的槽函数？

一个 connect() 函数只能关联一个信号函数和一个槽函数，程序中可以包含多个 connect() 函数，能实现以下几种效果：  

- 关联多个信号函数和多个槽函数；
- 一个信号函数可以关联多个槽函数，当信号发出时，与之关联的槽函数会一个接一个地执行，但它们执行的顺序是随机的，无法人为指定哪个先执行、哪个后执行；
- 多个信号函数可以关联同一个槽函数，无论哪个信号发出，槽函数都会执行。


## 16. Qt QLabel文本框的使用
## 17. Qt QPushButton按钮用法详解
## 18. Qt QLineEdit单行输入框用法详解
## 19. Qt QListWidget列表框用法详解
## 20. Qt QTableWidget表格控件的用法（非常详细）
## 21. Qt QTreeWidget树形控件用法详解
## 22. Qt QMessageBox用法详解
Qt 提供了 6 种通用的 QMessageBox 消息对话框，通过调用 QMessageBox 类中的 6 个静态成员方法，可以直接在项目中使用它们。

## 23. Qt布局管理详解（5种布局控件）
Qt 提供了很多摆放控件的辅助工具（又称布局管理器或者布局控件），它们可以完成两件事：
- 自动调整控件的位置，包括控件之间的间距、对齐等；
- 当用户调整窗口大小时，位于布局管理器内的控件也会随之调整大小，从而保持整个界面的美观。

Qt 共提供了 5 种布局管理器，每种布局管理器对应一个类，分别是
- QVBoxLayout（垂直布局）
- QHBoxLayout（水平布局）
- QGridLayout（网格布局）
- QFormLayout（表单布局）
- QStackedLayout（分组布局）

## 24. Qt pro文件详解
任何一个 Qt 项目都至少包含一个 pro 文件，此文件负责存储与当前项目有关的配置信息，比如：
- 项目中用到了哪些模块？
- 项目中包含哪些源文件，哪些头文件，它们的存储路径是什么？
- 项目使用哪个图片作为应用程序的图标？
- 项目最终生成的可执行文件的名称是什么？

一个项目中可能包含上百个源文件，Qt 编译这些源文件的方法是：先由 qmake 工具根据 pro 文件记录的配置信息生成相应的 makefile 文件，然后执行 make 命令完成对整个项目的编译。也就是说，pro 文件存储的配置信息是用来告知编译器如何编译当前项目的 


pro 文件可以存储上百条配置信息，每条配置信息由三部分构成：
1. 前半部分是关键字，也称配置项，用来指明配置信息的含义；
2. 中间用 +=、-=、= 等数学符号连接配置项和它对应的值；
3. 后半部分是配置项对应的值，一个配置项可以对应多个值，每个值代表不同的含义。

|配置项                  |                        			    含 义  |          
|--|--------|                                                                                                       
|QT                                              		|	指定项目中用到的所有模块，默认值为 core 和 gui，中间用 += 符号连接。|
|greaterThan(QT_MAJOR_VERSION, 4): QT += widgets 		|	如果 QT 版本大于 4（Qt5 或更高版本），则需要添加 widgets 模块，该模块包含所有控件类。|
|TARGET                                          		|	指定程序成功运行后生成的可执行文件的名称，中间用 = 符号连接。|
|TEMPLATE                                        		|	指定如何运行当前程序，默认值为 app，表示当前程序是一个应用程序，可以直接编译、运行。常用的值还有 lib，表示将当前程序编译成库文件。|
|DEFINES                                         		|	在程序中新定义一个指定的宏，比如&nbsp;DEFINES += xxx，如同在程序中添加了 #define xxx 语句。|
|SOURCES                                         		|	指定项目中包含的所有 .cpp 源文件。|
|HEADERS                                         		|	指定项目中包含的所有 .h 头文件。|
|FORMS                                           		|	指定项目中包含的 ui 文件。|
|INCLUDEPATH                                     		|	指定头文件的存储路径，例如：INCLUDEPATH += /opt/ros/include|
|CONFIG                                          		|	经常对应的值有：release：以 release 模式编译程序；debug：以 debug 模式编译程序；warn_on：编译器输出尽可能多的警告；c++11：启动 C++11 标准支持。|

上表中，大部分配置项不需要我们手动修改，比如 SOURCES、HEADERS、FORMS 等，当我们添加或者删除项目中的源文件时，Qt 会自动修改这些配置项。



## 25. Qt自定义信号和槽函数
### 自定义信号函数
信号函数指的是符合以下条件的函数：
- 定义在某个类中，该类直接或间接继承自 QObject 类；
- 用 signals 关键字修饰；
- 函数只需要声明，不需要定义（实现）；
- 函数的返回值类型为 void，参数的类型和个数不限。

### 发信号
对于 Qt 提供给我们的信号函数，其底层已经设置好了信号发出的时机，例如按下鼠标时、点击 Enter 回车键时等等。对于自定义的信号，我们需要自己指定信号发出的时机，这就需要用到  emit 关键字。

```c++
class MyWidget:public QWidget{
    //Q_OBJECT 是一个宏，添加它才能正常使用 Qt 的信号和槽机制
    Q_OBJECT
//自定义信号函数
signals:
    void MySignal(QString mess);
public:
    void emitSignal(){
        emit MySignal(message);
    }
private:
    QString message;
};
```

> 对于每一个自定义的信号函数，程序中都应该提供发射该信号的方法（函数），而且这样的方法（函数）可以有多个。

### 自定义槽函数
和信号函数不同，槽函数必须手动定义（实现）。槽函数可以在程序中直接调用，但主要用来响应某个信号。
Qt5 中，槽函数既可以是普通的全局函数、也可以是类的成员函数、静态成员函数、友元函数、虚函数，还可以用 lambda 表达式表示。




## 26. Qt QFile文件操作详解

- QFile+QTextStream
和单独使用 QFile 类读写文本文件相比，QTextStream 类提供了很多读写文件相关的方法，还可以设定写入到文件中的数据格式，比如对齐方式、写入数字是否带前缀等等。
- QFile+QDataStream
QDataStream 类的用法和 QTextStream 非常类似，最主要的区别在于，QDataStream 用于读写二进制文件。


## 27. Qt实现学生信息管理系统
## 28. Qt打包程序详解（适用于Windows平台）