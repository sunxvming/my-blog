## Qt简介
Qt 是一个跨平台的 C++ 框架，Qt 除了支持界面设计（GUI编程），还封装了与网络编程、多线程、数据库连接、视频音频等相关的功能。
Qt 还存在 Python、Ruby、Perl 等脚本语言的绑定， 也就是说可以使用脚本语言开发基于 Qt 的程序
Qt 支持的操作系统有很多，例如通用操作系统 Windows、Linux、Unix，智能手机系统 Android、iOS、WinPhone， 嵌入式系统 QNX、VxWorks 等等

## Qt和其它GUI库的对比
Qt 和 MFC
读者经常将 MFC 和 Qt 进行对比，MFC 只能应用在 Windows 平台，而 Qt 是跨平台的，一次编写，到处运行。
另外，Qt 已经封装了底层细节，学习 Qt 将会非常简单；
而 MFC 只是给 **Windows API 加了一层包装**，不了解 **Windows API** 也学不好 MFC，大家普遍反映 MFC 难学。

Linux 下的 GUI 库
Linux 下常用的 GUI 库有基于 C++ 的 Qt、GTK+、wxWidgets，以及基于 Java 的 AWT 和 Swing。
其中最著名的就是 Qt 和 GTK+：KDE 桌面系统已经将 Qt 作为默认的 GUI 库，Gnome 桌面系统也将 GTK+ 作为默认的 GUI 库。
相比 GTK+，Qt 的功能更加强大，更新也很快，比较受人们追捧。

## 学习QML还是C++？
Qt4 时代的主流就是传统部件（或叫控件）编程，Qt5 诞生之时，正是手机移动设备蓬勃发展的时候，为了适应手机移动应用开发， Qt5 将 QML 脚本编程提到与传统 C++ 部件编程相同的高度，力推 QML 界面编程
QML 类似于网页设计的 HTML，是一种标记语言，我们可以借助 CSS 对它进行美化，也可以借助 JavaScript 进行交互。有 Web 开发经验的读者学习 QML 将非常轻松。

QML 只能用来进行界面设计和人机交互，也就是只能胜任 UI 部分，在底层仍然需要调用 C++ 编写的组件来完善功能。
现阶段新生的 QML 还不如传统的 C++ 部件编程那样拥有丰富的开发组件，尤其缺乏复杂的企业级应用程序所必须的树等控件。这就决定了至少现阶段，真正大型的桌面程序仍然只能选择以 C++ 为主、QML 为辅的开发模式。
总的来说，C++ 对于 Qt 是不可或缺的，而 QML 只是一个加分项。


## Qt和wxWidgets
1、wxWidgets封装了各种平台API，可以在各平台上显示原生窗口，而QT则是使用自己的框架。这样带来的好处就是，wxWidgets只专注框架代码这一层，具体实现由平台完成，wxWidgets可以做到最小，安装程序只有几十M的体积。而QT不但要做框架代码这一层，还要做API这一层，相当于在系统上又搞了一层API，因此安装体积通常几个G，甚至10几个G，非常庞大。套用某水的广告词：wxWidgets不生产API，wxWidgets只是API的搬运工。

2、wxWidgets开发出来的程序体积小。因为wxWidgets是将框架与平台API进行了剥离，所以编译后的程序非常小，这也是平台依赖度高的好处。

3、wxWidgets从1992年到现在还在不停进化，开源、简单、技术成熟、可信赖。像CodeBlocks这些IDE本身也是用wxWidgets开发的，而且这个CodeBlocks每年也推出新版本，迭代很快。至于可视化工具也很多，CodeBlocks本身就自带一个wxSmith，拖拖拉拉界面就搞定了，开发也非常方便。值得强调的是，wxWidgets也吸收了MFC、QT等各个框架的优点，语法灵活、简洁，也就是说，wxWidgets与时俱进，这也是它能发展近30年，长盛不衰的原因。


## Qt下载、安装
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


### Qt6安装
[Qt6入门教程 2：Qt6下载与安装-CSDN博客](https://blog.csdn.net/caoshangpa/article/details/135420524)
[Qt 6之一：简介、安装与简单使用_qt6-CSDN博客](https://blog.csdn.net/cnds123/article/details/130730203)

直接运行安装会很慢，用国内的镜像会快很多
```
.\qt-online-installer-windows-x64-online.exe --mirror https://mirrors.ustc.edu.cn/qtproject
```


如果安装发现少了东西，无须全部重新安装，运行 Qt安装目录下的 MaintenanceTool.exe 即可，同样控制台下执行
```
.\MaintenanceTool.exe --mirror http://mirrors.ustc.edu.cn/qtproject/
```

在线安装器默认没有5.15的版本，若要想安装得勾选Archive
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251025173128.png)


## Qt安装目录的结构

**Qt 整体目录结构**
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240603134844.png)


**Qt 类库目录**
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240603134906.png)




## Qt工具集

| 工具        | 说明                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| qmake     | 核心的项目构建工具，可以生成跨平台的 .pro 项目文件，并能依据不同操作系统和编译工具生成相应的 Makefile，用于构建可执行程序或链接库。                                                                        |
| uic       | User Interface Compiler，用户界面编译器，Qt 使用 XML 语法格式的 .ui 文件定义用户界面，uic 根据 .ui 文件生成用于创建用户界面的 C++ 代码头文件，比如 `ui_*****.h` 。                                |
| moc       | Meta-Object Compiler，元对象编译器，moc 处理 C++ 头文件的类定义里面的 `Q_OBJECT` 宏，它会生成源代码文件，比如 `moc_*****.cpp` ，其中包含相应类的元对象代码，元对象代码主要用于实现 Qt 信号/槽机制、运行时类型定义、动态属性系统。 |
| rcc       | Resource Compiler，资源文件编译器，负责在项目构建过程中编译 .qrc 资源文件，将资源嵌入到最终的 Qt 程序里。                                                                               |
| qtcreator | 集成开发环境，包含项目生成管理、代码编辑、图形界面可视化编辑、 编译生成、程序调试、上下文帮助、版本控制系统集成等众多功能， 还支持手机和嵌入式设备的程序生成部署。                                                               |
| assistant | Qt 助手，帮助文档浏览查询工具，Qt 库所有模块和开发工具的帮助文档、示例代码等都可以检索到，是 Qt 开发必备神器，也可用于自学 Qt。                                                                           |
| designer  | Qt 设计师，专门用于可视化编辑图形用户界面（所见即所得），生成 .ui 文件用于 Qt 项目。                                                                                                 |
| linguist  | Qt 语言家，代码里用 tr() 宏包裹的就是可翻译的字符串，开发人员可用 lupdate 命令生成项目的待翻译字符串文件 .ts，用 linguist 翻译多国语言 .ts ，翻译完成后用 lrelease 命令生成 .qm 文件，然后就可用于多国语言界面显示。             |
| qmlscene  | 在 Qt 4.x 里是用 qmlviewer 进行 QML 程序的原型设计和测试，Qt 5 用 qmlscene 取代了旧的 qmlviewer。新的 qmlscene 另外还支持 Qt 5 中的新特性 scenegraph 。                               |


## Qt-creator使用
F4    头/源文件切换
F1    查看帮助文档



## Qt对象模型

* Qt头文件没有.h后缀
* Qt一个类对应一个头文件，**类名就是头文件名**

- QMainWindow
是一个为用户提供主窗口程序的类，包含一个菜单栏（menu bar）、多个工具栏(tool bars)、多个锚接部件(dock widgets)、一个状态栏(status bar)及一个中心部件(central widget)，是许多应用程序的基础，如文本编辑器，图片编辑器等。

- QWidget
所有窗口及窗口控件都是从QWidget直接或间接派生出来的。

- QApplication
应用程序类，管理图形用户界面应用程序的控制流和主要设置。是Qt的整个后台管理的命脉它包含**主事件循环**，在其中来自窗口系统和其它资源的所有事件处理和调度。它也处理应用程序的初始化和结束，并且提供对话管理。



![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240603141618.png)


在Qt中**创建对象**的时候会提供一个Parent对象指针，下面来解释这个parent到底是干什么的。

QObject是以**对象树**的形式组织起来的。

当你创建一个 QObject 对象时，会看到QObject的构造函数接收一个QObject指针作为参数，这个参数就是 parent，也就是父对象指针。
这相当于，**在创建QObject对象时，可以提供一个其父对象，我们创建的这个QObject对象会自动添加到其父对象的children()列表。**
**当父对象析构的时候，这个列表中的所有对象也会被析构。（注意，这里的父对象并不是继承意义上的父类！）**
这种机制在 GUI 程序设计中相当有用。例如，一个按钮有一个QShortcut（快捷键）对象作为其子对象。当我们删除按钮的时候，这个快捷键理应被删除。这是合理的。


QWidget是能够在屏幕上显示的一切组件的父类。

 **QWidget** **继承自QObject，因此也继承了这种对象树关系。当设置了parent参数后，一个孩子自动地成为父组件的一个子组件**。因此，它会显示在**父组件的坐标系统中，被父组件的边界剪裁**。例如，当用户关闭一个对话框的时候，应用程序将其删除，那么，我们希望属于这个对话框的按钮、图标等应该一起被删除。事实就是如此，因为这些都是对话框的子组件。
当然，**我们也可以自己删除子对象，它们会自动从其父对象列表中删除。**


Qt 引入对象树的概念，**在一定程度上解决了内存问题**。
* 当一个QObject对象在堆上创建的时候，Qt 会同时为其创建一个对象树。不过，对象树中对象的顺序是没有定义的。这意味着，销毁这些对象的顺序也是未定义的。
* 任何对象树中的 QObject对象 delete 的时候，如果这个对象有 parent，则自动将其从 parent 的children()列表中删除；如果有孩子，则自动 delete 每一个孩子。Qt 保证没有QObject会被 delete 两次，这是由析构顺序决定的。


如果QObject在栈上创建，Qt 保持同样的行为。正常情况下，这也不会发生什么问题。来看下下面的代码片段：
```cpp
{
    QWidget window;
    QPushButton quit("Quit", &window);
}
```

作为父组件的 window 和作为子组件的 quit 都是QObject的子类。这段代码是正确的，quit 的析构函数不会被调用两次，因为标准 C++要求，**局部对象的析构顺序应该按照其创建顺序的相反过程**。因此，这段代码在超出作用域时，会先调用 quit 的析构函数，将其从父对象 window 的子对象列表中删除，然后才会再调用 window 的析构函数。

但是，如果我们使用下面的代码：
```cpp
{
    QPushButton quit("Quit");
    QWidget window;
    quit.setParent(&window);
}
```


情况又有所不同，析构顺序就有了问题。我们看到，在上面的代码中，作为父对象的 window 会首先被析构，因为它是最后一个创建的对象。在析构过程中，它会调用子对象列表中每一个对象的析构函数，也就是说， quit 此时就被析构了。然后，代码继续执行，在 window 析构之后，quit 也会被析构，因为 quit 也是一个局部变量，在超出作用域的时候当然也需要析构。但是，这时候已经是第二次调用 quit 的析构函数了，C++ 不允许调用两次析构函数，因此，程序崩溃了。

由此我们看到，Qt 的对象树机制虽然帮助我们在一定程度上解决了内存问题，但是也引入了一些值得注意的事情。这些细节在今后的开发过程中很可能时不时跳出来烦扰一下，所以，我们最好从开始就养成良好习惯，**在 Qt 中，尽量在构造的时候就指定 parent 对象，并且大胆在堆上创建**。



## 界面编程

两种风格的编程方式：
### 命令式的
命令式编程是一种逐步指示计算机如何完成任务的编程风格。程序员需要明确地描述每一步该做什么，并且以一种顺序执行的方式来处理任务。命令式编程的特点包括：

步骤明确：程序员需要明确指定每一个步骤，从而实现预期的结果。
状态变化：命令式编程通常涉及修改变量或对象的状态，通过一系列命令来改变应用程序的状态。
可控性强：由于程序员控制每一步的执行过程，因此在处理复杂逻辑时有更高的灵活性和可控性。
在界面编程中，命令式编程风格常见于传统的 GUI 框架，例如 Java Swing、Qt。

### 声明试的
声明式编程是一种通过描述**想要的结果**来进行编程的风格，而不是逐步说明如何实现这个结果。声明式编程的特点包括：

1. **关注结果**：程序员专注于描述最终的输出或状态，而不关注具体的执行步骤。
2. **减少副作用**：由于不直接操控状态变化，声明式编程往往能够减少副作用，提高代码的可维护性和可读性。
3. **高层抽象**：通常使用高级抽象和函数来描述界面，简化了复杂性。

在界面编程中，声明式编程风格广泛应用于现代前端框架，如 React、Vue.js 和 Flutter。



**窗口系统**
坐标体系
以**左上角**为原点，X向右增加，Y向下增加。

对于嵌套窗口， 其坐标是相对于父窗口来说的。




## Qt控件

| 控件             | 描述                           |
|------------------|--------------------------------|
| QWidget          | 所有控件的基类，提供基本的窗口功能  |
| QPushButton      | 按钮控件，用于捕获点击事件        |
| QLabel           | 标签控件，用于显示文本或图像     |
| QLineEdit        | 单行文本输入框                  |
| QTextEdit        | 多行文本编辑框                  |
| QPlainTextEdit   | 多行纯文本编辑框                |
| QCheckBox        | 复选框                         |
| QRadioButton     | 单选按钮                       |
| QComboBox        | 下拉列表框                     |
| QListWidget      | 列表小部件，提供项目列表         |
| QTreeWidget      | 树形小部件，提供层次结构数据      |
| QTableWidget     | 表格小部件，提供表格数据         |
| QSlider          | 滑动条，用于选择范围值          |
| QSpinBox         | 微调框，用于输入和显示数值      |
| QDoubleSpinBox   | 双精度微调框                   |
| QProgressBar     | 进度条，用于显示任务的进度      |
| QMenu            | 菜单控件，用于创建菜单栏和上下文菜单 |
| QMenuBar         | 菜单栏                         |
| QToolBar         | 工具栏控件，用于快速访问常用功能 |
| QStatusBar       | 状态栏控件，用于显示状态信息    |
| QDialog          | 对话框控件，用于模态或非模态对话框 |
| QMessageBox      | 消息框，用于显示消息和提示       |
| QFileDialog      | 文件对话框，用于文件选择        |
| QColorDialog     | 颜色对话框，用于选择颜色        |
| QFontDialog      | 字体对话框，用于选择字体        |
| QDateEdit        | 日期编辑器                     |
| QTimeEdit        | 时间编辑器                     |
| QDateTimeEdit    | 日期时间编辑器                  |
| QCalendarWidget  | 日历控件                       |
| QTabWidget       | 选项卡控件                     |
| QStackedWidget   | 堆栈式布局控件                  |
| QScrollArea      | 滚动区域控件                   |
| QGroupBox        | 分组框控件                     |
| QSplitter        | 分割器控件                     |
| QFrame           | 帧控件                         |
| QFormLayout      | 表单布局控件                   |
| QVBoxLayout      | 垂直布局控件                   |
| QHBoxLayout      | 水平布局控件                   |
| QGridLayout      | 网格布局控件                   |
| QStackedLayout   | 堆叠布局控件                   |



| 控件          | 信号                            | 描述                        | 槽                   | 描述                                |
|---------------|--------------------------------|---------------------------|----------------------|------------------------------------|
| QPushButton   | `clicked()`                    | 按钮点击时发出             | 自定义函数            | 响应按钮点击事件                    |
| QLineEdit     | `textChanged(const QString &text)` | 文本改变时发出             | 自定义函数            | 响应文本改变事件                    |
| QComboBox     | `currentIndexChanged(int index)` | 当前选项改变时发出         | 自定义函数            | 响应选项改变事件                    |
| QCheckBox     | `stateChanged(int state)`      | 复选框状态改变时发出       | 自定义函数            | 响应复选框状态改变事件              |
| QRadioButton  | `toggled(bool checked)`        | 单选按钮状态改变时发出     | 自定义函数            | 响应单选按钮状态改变事件            |
| QSlider       | `valueChanged(int value)`      | 滑动条值改变时发出         | 自定义函数            | 响应滑动条值改变事件                |
| QSpinBox      | `valueChanged(int value)`      | 微调框值改变时发出         | 自定义函数            | 响应微调框值改变事件                |
| QDoubleSpinBox | `valueChanged(double value)`   | 双精度微调框值改变时发出   | 自定义函数            | 响应双精度微调框值改变事件          |
| QScrollBar    | `valueChanged(int value)`      | 滚动条值改变时发出         | 自定义函数            | 响应滚动条值改变事件                |
| QDateEdit     | `dateChanged(const QDate &date)` | 日期改变时发出             | 自定义函数            | 响应日期改变事件                    |
| QTimeEdit     | `timeChanged(const QTime &time)` | 时间改变时发出             | 自定义函数            | 响应时间改变事件                    |
| QDateTimeEdit | `dateTimeChanged(const QDateTime &dateTime)` | 日期时间改变时发出     | 自定义函数            | 响应日期时间改变事件                |


### 对话框QDialog
Qt 中使用QDialog类实现对话框。就像主窗口一样，我们通常会设计一个类继承QDialog。QDialog（及其子类，以及所有Qt::Dialog类型的类）的对于其 parent 指针都有额外的解释：**如果 parent 为 NULL，则该对话框会作为一个顶层窗口，否则则作为其父组件的子对话框（此时，其默认出现的位置是 parent 的中心）。顶层窗口与非顶层窗口的区别在于，顶层窗口在任务栏会有自己的位置，而非顶层窗口则会共享其父组件的位置。**

**对话框分为模态对话框和非模态对话框。**

* 模态对话框，就是会阻塞同一应用程序中其它窗口的输入。
模态对话框很常见，比如“打开文件”功能。你可以尝试一下记事本的打开文件，当打开文件对话框出现时，我们是不能对除此对话框之外的窗口部分进行操作的。

* 与此相反的是非模态对话框，例**如查找对话框**，我们可以在显示着查找对话框的同时，继续对记事本的内容进行编辑。


### 自定义控件
在搭建 Qt 窗口界面的时候， 在一个项目中很多窗口， 或者是窗口中的某个模块  会被经常性的重复使用。 一般遇到这种情况我们都会将这个窗口或者模块拿出来  做成一个独立的窗口类， 以备以后重复使用。  在使用 Qt 的 ui 文件搭建界面的时候， 工具栏栏中只为我们提供了标准的窗口控  件， 如果我们想使用自定义控件怎么办？

假如SmallWidget是一个自定义的控件，那个它只需要继承QWidget并进行相应的实现，
在使用时，打开要嵌入的.ui 文件，先放入一个 QWidget 控件, 然后再上边鼠标右键
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251117172257.png)
弹出提升窗口部件对话框
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251117172320.png)

添加要提升的类的名字,然后选择 添加
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251117172338.png)

添加之后,类名会显示到上边的列表框中,然后单击提升按钮,完成操作.  
我们可以看到, 这个窗口对应的类从原来的 QWidget 变成了 SmallWidget
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251117172358.png)


## Qt消息机制和事件


| 事件类别     | 事件函数                            | 描述                     |
|--------------|------------------------------------|------------------------|
| 鼠标事件     | `mousePressEvent(QMouseEvent *event)`  | 鼠标按下事件               |
|              | `mouseReleaseEvent(QMouseEvent *event)` | 鼠标释放事件               |
|              | `mouseDoubleClickEvent(QMouseEvent *event)` | 鼠标双击事件               |
|              | `mouseMoveEvent(QMouseEvent *event)`      | 鼠标移动事件               |
| 键盘事件     | `keyPressEvent(QKeyEvent *event)`        | 键盘按下事件               |
|              | `keyReleaseEvent(QKeyEvent *event)`       | 键盘释放事件               |
| 焦点事件     | `focusInEvent(QFocusEvent *event)`       | 焦点进入事件               |
|              | `focusOutEvent(QFocusEvent *event)`      | 焦点离开事件               |
| 绘图事件     | `paintEvent(QPaintEvent *event)`         | 绘图事件，窗口需要重绘时触发     |
| 窗口事件     | `closeEvent(QCloseEvent *event)`         | 窗口关闭事件               |
|              | `resizeEvent(QResizeEvent *event)`       | 窗口大小调整事件           |
|              | `moveEvent(QMoveEvent *event)`           | 窗口移动事件               |
|              | `showEvent(QShowEvent *event)`           | 窗口显示事件               |
|              | `hideEvent(QHideEvent *event)`           | 窗口隐藏事件               |
| 拖放事件     | `dragEnterEvent(QDragEnterEvent *event)` | 拖动进入事件               |
|              | `dragMoveEvent(QDragMoveEvent *event)`   | 拖动移动事件               |
|              | `dragLeaveEvent(QDragLeaveEvent *event)` | 拖动离开事件               |
|              | `dropEvent(QDropEvent *event)`           | 拖放释放事件               |
| 定时器事件   | `timerEvent(QTimerEvent *event)`         | 定时器触发事件             |
| 输入法事件   | `inputMethodEvent(QInputMethodEvent *event)` | 输入法事件               |
| 上下文菜单事件 | `contextMenuEvent(QContextMenuEvent *event)` | 上下文菜单事件           |
| 滚动事件     | `wheelEvent(QWheelEvent *event)`         | 鼠标滚轮事件               |
| 事件过滤器   | `eventFilter(QObject *watched, QEvent *event)` | 事件过滤器，用于拦截和处理事件 |
| 更新事件     | `updateEvent(QEvent *event)`             | 更新事件                   |
| 激活事件     | `activateEvent(QEvent *event)`           | 窗口激活事件               |



**事件**（event）是由系统或者 Qt 本身在不同的时刻发出的。当用户按下鼠标、敲下键盘，或者是窗口需要重新绘制的时候，都会发出一个相应的事件。一些事件在对**用户操作**做出响应时发出，如键盘事件等；另一些事件则是由**系统自动发出**，如计时器事件。

在前面我们也曾经简单提到，**Qt 程序**需要在main()函数创建一个QApplication对象，然后调用它的exec()函数。这个函数就是开始 Qt 的事件循环。在执行exec()函数之后，程序将进入事件循环来监听应用程序的事件。当事件发生时，Qt 将创建一个**事件对象**。**Qt 中所有事件类都继承于QEvent**。在事件对象创建完毕后，Qt 将这个事件对象传递给 **QObject的event()**函数。 **event()函数并不直接处理事件，而是按照事件对象的类型分派给特定的事件处理函数**（event handler）。

在所有组件的父类QWidget中，定义了很多事件处理的回调函数，这些函数都是 protected virtual 的，也就是说，我们可以在子类中重新实现这些函数。如
- keyPressEvent()
- keyReleaseEvent()
- mouseDoubleClickEvent()
- mouseMoveEvent()
- mousePressEvent()
- mouseReleaseEvent() 等。


### 事件的接受与忽略
```cpp
//!!! Qt5
// ---------- custombutton.h ---------- //
class CustomButton : public QPushButton
{
    Q_OBJECT
public:
    CustomButton(QWidget *parent = 0);
private:
    void onButtonCliecked();
};

// ---------- custombutton.cpp ---------- //
CustomButton::CustomButton(QWidget *parent) :
    QPushButton(parent)
{
    connect(this, &CustomButton::clicked,
            this, &CustomButton::onButtonCliecked);
}

void CustomButton::onButtonCliecked()
{
    qDebug() << "You clicked this!";
}

// ---------- main.cpp ---------- //
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    CustomButton btn;
    btn.setText("This is a Button!");
    btn.show();

    return a.exec();
}
```
这是一段简单的代码，经过我们前面一段时间的学习，我们已经能够知道这段代码的运行结果：点击按钮，会在控制台打印出“You clicked this!”字符串。这是我们前面介绍过的内容。下面，我们向CustomButton类添加一个事件函数：
```cpp
// CustomButton
...
protected:
    void mousePressEvent(QMouseEvent *event);
...

// ---------- custombutton.cpp ---------- //
...
void CustomButton::mousePressEvent(QMouseEvent *event)
{
if (event->button() == Qt::LeftButton) 
{
        qDebug() << "left";
} 
else 
{
        QPushButton::mousePressEvent(event);
    }
}
```

我们重写了CustomButton的`mousePressEvent()`函数，也就是鼠标按下。在这个函数中，我们判断如果鼠标按下的是左键，则打印出来“left”字符串，否则，调用父类的同名函数。编译运行这段代码，当我们点击按钮时，“You clicked this!”字符串不再出现，只有一个“left”。也就是说，我们把父类的实现覆盖掉了。由此可以看出，父类QPushButton的mousePressEvent()函数中肯定发出了`clicked()`信号，否则的话，我们的槽函数怎么会不执行了呢？
这暗示我们一个非常重要的细节：**当重写事件回调函数时，时刻注意是否需要通过调用父类的同名函数来确保原有实现仍能进行！** 比如我们的CustomButton了，如果像我们这么覆盖函数，clicked()信号永远不会发生，你连接到这个信号的槽函数也就永远不会被执行。这个错误非常隐蔽，很可能会浪费你很多时间才能找到。因为这个错误不会有任何提示。这一定程度上说，我们的组件“忽略”了父类的事件，但这更多的是一种违心之举，一种错误。

通过调用父类的同名函数，**我们可以把 Qt 的事件传递看成链状：如果子类没有处理这个事件，就会继续向其父类传递。** Qt 的事件对象有两个函数：accept()和ignore()。正如它们的名字一样，

- accept()用来告诉 Qt，这个类的事件处理函数想要处理这个事件；
**如果一个事件处理函数调用了一个事件对象的accept()函数，这个事件就不会被继续传播给其父组件**

- ignore()则告诉 Qt，这个类的事件处理函数不想要处理这个事件。
**如果调用了事件的ignore()函数，Qt 会从其父组件中寻找另外的接受者**。

-  在事件处理函数中，可以使用 **isAccepted()** 来查询这个事件是不是已经被接收了。

事实上，**我们很少会使用accept()和ignore()函数**，而是像上面的示例一样，如果希望忽略事件（所谓忽略，是指自己不想要这个事件），只要调用父类的响应函数即可。
为了避免自己去调用accept()和ignore()函数，而是尽量调用父类实现，Qt 做了特殊的设计：**事件对象默认是 accept 的，而作为所有组件的父类QWidget的默认实现则是调用ignore()。这么一来，如果你自己实现事件处理函数，不调用QWidget的默认实现，你就等于是接受了事件；如果你要忽略事件，只需调用QWidget的默认实现。**



### event（）
事件对象创建完毕后，Qt 将这个事件对象传递给QObject的event()函数。event()函数并不直接处理事件，而是将这些事件对象按照它们不同的类型，分发给不同的事件处理器（event handler）。

如上所述，**event()函数主要用于事件的分发**。所以，如果你希望在事件分发之前做一些操作，就可以重写这个event()函数了。例如，我们希望在一个QWidget组件中监听 tab 键的按下，那么就可以继承QWidget，并重写它的event()函数，来达到这个目的：
```cpp
bool CustomWidget::event(QEvent *e)
{
    if (e->type() == QEvent::KeyPress) {
        QKeyEvent *keyEvent = static_cast<QKeyEvent *>(e);
        if (keyEvent->key() == Qt::Key_Tab) {
            qDebug() << "You press tab.";
            return true;
        }
    }
    return QWidget::event(e);
}
```

CustomWidget是一个普通的QWidget子类。我们重写了它的event()函数，这个函数有一个QEvent对象作为参数，也就是需要转发的事件对象。函数返回值是 bool 类型。

-  **如果传入的事件已被识别并且处理，则需要返回 true，否则返回 false。如果返回值是 true，那么 Qt 会认为这个事件已经处理完毕，不会再将这个事件发送给其它对象，而是会继续处理事件队列中的下一事件。**
-  **在event()函数中，调用事件对象的accept()和ignore()函数是没有作用的，不会影响到事件的传播**。

我们可以通过使用QEvent::type()函数可以检查事件的实际类型，其返回值是QEvent::Type类型的枚举。我们处理过自己感兴趣的事件之后，可以直接返回 true，表示我们已经对此事件进行了处理；对于其它我们不关心的事件，则需要调用父类的event()函数继续转发，否则这个组件就只能处理我们定义的事件了。

这是 Qt 5 中QObject::event()函数的源代码
```cpp
//!!! Qt5
bool QObject::event(QEvent *e)
{
    switch (e->type()) {
    case QEvent::Timer:
        timerEvent((QTimerEvent*)e);
        break;

    case QEvent::ChildAdded:
    case QEvent::ChildPolished:
    case QEvent::ChildRemoved:
        childEvent((QChildEvent*)e);
        break;
    // ...
    default:
        if (e->type() >= QEvent::User) {
            customEvent(e);
            break;
        }
        return false;
    }
    return true;
}
```

**event()** 函数中实际是通过事件处理器来响应一个具体的事件。这相当于event()函数将具体事件的处理“委托”给具体的事件处理器。而这些事件处理器是 protected virtual 的，因此，我们重写了某一个事件处理器，即可让 Qt 调用我们自己实现的版本。


**现在我们可以总结一下 Qt 的事件处理，实际上是有五个层次：**
- 重写paintEvent()、mousePressEvent()等事件处理函数。这是最普通、最简单的形式，同时功能也最简单。
- 重写event()函数。event()函数是所有对象的事件入口，QObject和QWidget中的实现，默认是把事件传递给特定的事件处理函数。
- 在特定对象上面安装事件**过滤器**。该过滤器仅过滤该对象接收到的事件。
- 在QCoreApplication::instance()上面安装事件过滤器。该过滤器将过滤所有对象的所有事件，因此和notify()函数一样强大，但是它更灵活，因为可以安装多个过滤器。全局的事件过滤器可以看到 disabled 组件上面发出的鼠标事件。全局过滤器有一个问题：只能用在主线程。
- 重写QCoreApplication::notify()函数。这是最强大的，和全局事件过滤器一样提供完全控制，并且不受线程的限制。但是全局范围内只能有一个被使用（因为QCoreApplication是单例的）。




### 定时器事件

#### 使用QTimer类
使用：只需创建一个 QTimer 类对象，然后调用其 start() 函数开启定时器，此后 QTimer 对象就会周期性的发出 timeout() 信号。

#### 利用事件 timerEvent
① 重写 `void timerEvent(QTimerEvent *event);`
② 启动定时器 `startTimer(1000)`，单位是毫秒
③ startTimer 的返回值是定时器的唯一标识，可以用startTimer启动多个timer，然后在timerEvent中使用 `event->timerId()` 做比较，看当前执行的是那个timer的事件




## Qt信号和槽机制
信号和槽是 Qt 特有的**消息传输机制**，它能将相互独立的控件和事件关联起来。

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20230523152456.png)

信号和槽机制底层是通过函数间的相互调用实现的。每个信号都可以用函数来表示，称为**信号函数**；每个槽也可以用函数表示，称为**槽函数**。例如，“按钮被按下”这个信号可以用 clicked() 函数表示，“窗口关闭”这个槽可以用 close() 函数表示，信号和槽机制实现“点击按钮会关闭窗口”的功能，其实就是 clicked() 函数调用 close() 函数的效果。

所谓信号槽，实际就是**观察者模式**。当某个事件发生之后，比如，按钮检测到自己被点击了一下，它就会发出一个信号（signal）。这种发出是没有目的的，类似广播。如果有对象对这个信号感兴趣，它就会使用连接（connect）函数，意思是，将想要处理的信号和自己的一个函数（称为槽（slot））绑定来处理这个信号。也就是说，当信号发出时，被连接的槽函数会自动被回调。这就类似观察者模式：**当发生了感兴趣的事件，某一个操作就会被自动触发**

只有继承了QObject类的类，才具有信号槽的能力。所以，为了使用信号槽，必须继承 **QObject**。凡是QObject类（不管是直接子类还是间接子类），都应该在第一行代码写上**Q_OBJECT**。不管是不是使用信号槽，都应该添加这个宏。这个宏的展开将为我们的类提供信号槽机制、国际化机制以及 Qt 提供的不基于 C++ RTTI 的反射能力。


**使用connect()函数实现信号和槽**
connect() 是 QObject 类中的一个静态成员函数，专门用来关联指定的信号函数和槽函数。一个 connect() 函数只能关联一个信号函数和一个槽函数
关联某个信号函数和槽函数，需要搞清楚以下 4 个问题：  
- 信号发送者是谁？
- 哪个是信号函数？
- 信号的接收者是谁？
- 哪个是接收信号的槽函数？


注意，并非所有的控件之间都能通过信号和槽关联起来，信号和槽机制只适用于满足以下条件的控件：
- 控件类必须直接或者间接继承自 QObject 类。Qt 提供的控件类都满足这一条件
- 控件类中必须包含 `Q_OBJECT` 宏。


信号函数和槽函数特点：  
- 信号函数用  signals 关键字修饰，槽函数用 public slots、protected slots 或者 private slots 修饰。signals 和 slots 是 Qt 在 C++ 的基础上扩展的关键字，专门用来指明信号函数和槽函数；
- 信号函数只需要声明，不需要定义（实现），而槽函数需要定义（实现）。
- Qt 5 中，任何成员函数、static 函数、全局函数和 Lambda 表达式都可以作为槽函数。
- 与信号函数不同，槽函数必须自己完成实现代码。槽函数就是普通的成员函数，因此作为成员函数，也会受到 public、private 等访问控制符的影响。（如果信号是 private 的，这个信号就不能在类的外面连接，也就没有任何意义。）
- 一个信号可以和多个槽相连。如果是这种情况，这些槽会一个接一个的被调用，但是它们的调用顺序是不确定的，无法人为指定哪个先执行、哪个后执行。
- 多个信号可以连接到一个槽，只要任意一个信号发出，这个槽就会被调用。
- 一个信号可以**连接到另外的一个信号**。当第一个信号发出时，第二个信号被发出。除此之外，这种信号-信号的形式和信号-槽的形式没有什么区别。
- 槽可以被取消链接。这种情况并不经常出现，因为当一个对象delete之后，Qt自动取消所有连接到这个对象上面的槽。


为了提高程序员的开发效率，Qt 的各个控件类都提供了一些常用的信号函数和槽函数。
在程序中引入`<QPushButton>`头文件，双击选中“QPushButton”并按 "Fn+F1" 快捷键，就会弹出 QPushButton 类的使用手册




### 自定义信号和槽函数

**信号函数**指的是符合以下条件的函数：
- 定义在某个类中，该类直接或间接继承自 QObject 类；
- 用 signals 关键字修饰；
- 函数只需要声明，不需要定义（实现）；
- 函数的返回值类型为 void，参数的类型和个数不限。

#### 发信号
对于 Qt 提供给我们的信号函数，其底层已经设置好了信号发出的时机，例如按下鼠标时、点击 Enter 回车键时等等。对于自定义的信号，我们需要自己指定信号发出的时机，这就需要用到  **emit** 关键字。

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

#### 自定义槽函数
和信号函数不同，槽函数必须手动定义（实现）。槽函数可以在程序中直接调用，但主要用来响应某个信号。
Qt5 中，槽函数既可以是普通的全局函数、也可以是类的成员函数、静态成员函数、友元函数、虚函数，还可以用 lambda 表达式表示。


## Qt布局管理

**Qt** 提供了两种组件定位机制：**绝对定位**和**布局定位**。
- **绝对定位**：就是一种最原始的定位方法：给出这个组件的坐标和长宽值。
这样，Qt 就知道该把组件放在哪里以及如何设置组件的大小。但是这样做带来的一个问题是，如果用户改变了窗口大小，比如点击最大化按钮或者使用鼠标拖动窗口边缘，采用绝对定位的组件是不会有任何响应的。这也很自然，因为你并没有告诉 Qt，在窗口变化时，组件是否要更新自己以及如何更新。或者，还有更简单的方法：禁止用户改变窗口大小。但这总不是长远之计。

- **布局定位**：你只要把组件放入某一种布局，布局由专门的布局管理器进行管理。当需要调整大小或者位置的时候，Qt 使用对应的布局管理器进行调整。布局定位完美的解决了使用绝对定位的缺陷。

Qt 提供了很多摆放控件的辅助工具（又称布局管理器或者布局控件），它们可以完成两件事：
- 自动调整控件的位置，包括控件之间的间距、对齐等；
- 当用户调整窗口大小时，位于布局管理器内的控件也会随之调整大小，从而保持整个界面的美观。


Qt 共提供了 5 种布局管理器，每种布局管理器对应一个类，分别是
- QVBoxLayout（垂直布局）
- QHBoxLayout（水平布局）
- QGridLayout（网格布局），类似于 HTML 的 table；
- QFormLayout（表单布局）
- QStackedLayout（分组布局）


## Qt样式表
Qt样式表的思想很大程度上是来自于HTML的层叠式样式表(CSS)， 通过调用QWidget::setStyleSheet()或QApplication::setStyleSheet()， 你可以为一个独立的子部件、整个窗口，甚至是整个个应用程序指定一个样式表。

Qt样式表与CSS的语法规则几乎完全相同。
一个样式表由一系列的样式规则构成。每个样式规则都有着下面的形式：
```
selector { attribute: value }
```
*	选择器(selector)部分通常是一个类名(例如QComboBox)，当然也还有其他的语法形式。
*	属性(attribute)部分是一个样式表属性的名字，值(value)部分是赋给该属性的值。

### 伪状态
部件的外观可以按照用户界面**元素状态**的不同来分别定义，这在样式表中被称为“伪状态”。例如，如果我们想在一个push button在被按下的时候具有sunken的外观，我们可以指定一个叫做 `:pressed` 的伪状态。
```
QPushButton {
    border: 2px outset green;
    background: gray;
}

QPushButton:pressed {
    border-style: inset;
}
```

### 用子部件定义微观样式
许多部件都包含有子元素，这些元素可以称为“子部件”。Spin box的上下箭头就是子部件最好的例子。
子部件可以通过::来指定，例如QDateTimeEdit::up-button。定义子部件的样式与定义部件非常相似，它们遵循前面提到的方箱模型（即它们可以拥有自己的边框、背景等），并且也可以和伪状态联合使用（例如QSpinBox::up-button:hover）。
下表列出了可用的子部件类型：
```
表 2. 子部件列表
子部件    描述
::down-arrow    combo box或spin box的下拉箭头
::down-button    spin box的向下按钮
::drop-down    combo box的下拉箭头
::indicator    checkbox、radio button或可选择group box的指示器
::item    menu、menu bar或status bar的子项目
::menu-indicator    push button的菜单指示器
::title    group box的标题
::up-arrow    spin box的向上箭头
::up-button    spin box的向上按钮
```

通过指定subcontrol-position和subcontrol-origin属性，子部件可以被放置在部件箱体内的任何位置。并且，子部件的位置还可以使用相对或绝对的方式进一步的调整。具体选择何种调整方式取决于子部件具有固定的大小，还是会随着父部件而变化。

相对定位
```
QPushButton::menu-indicator:pressed {
    position: relative;
    top: 2px;
    left: 2px;
}
```


绝对定位
```
QPushButton::menu-indicator {
    border: 2px solid red;
    subcontrol-origin: padding;
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 40px;
}
```



## Qt pro文件详解
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





## 资源文件
Qt 资源系统是一个跨平台的资源机制，用于将程序运行时所需要的资源**以二进制的形式存储于可执行文件内部**。如果你的程序需要加载特定的资源（图标、文本翻译等），那么，将其放置在资源文件中，就再也不需要担心这些文件的丢失。也就是说，如果你将资源以资源文件形式存储，它是会**编译到可执行文件内部**。
资源文件后缀为：`.qrc`

例子：
res.qrc
```
<RCC>
    	<qresource prefix="/images">
        	<file alias="doc-open">document-open.png</file>    //使用别名，即使资源路径更改了也不用变
    	</qresource>
    	<qresource prefix="/images/fr" lang="fr">
        	<file alias="doc-open">document-open-fr.png</file>
    	</qresource>
</RCC>
```

当我们编译工程之后，我们可以在构建目录中找到 qrc_res.cpp 文件，这就是 Qt 将我们的资源编译成了 C++ 代码。
生成的c++代码类似如下形式：
```cpp
/****************************************************************************
** Resource object code
**
** Created by: The Resource Compiler for Qt version 5.12.12
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

static const unsigned char qt_resource_data[] = {
  // D:/project/c++/shipar/res/image/point_blue.png
  0x0,0x0,0x7,0x8,
  0x89,
  0x50,0x4e,0x47,0xd,0xa,0x1a,0xa,0x0,0x0,0x0,0xd,0x49,0x48,0x44,0x52,0x0,
  0x0,0x0,0x14,0x0,0x0,0x0,0x14,0x8,0x6,0x0,0x0,0x0,0x8d,0x89,0x1d,0xd,
  0x0,0x0,0x0,0x9,0x70,0x48,0x59,0x73,0x0,0x0,0xb,0x13,0x0,0x0,0xb,0x13,
  0x1,0x0,0x9a,0x9c,0x18,0x0,0x0,0x5,0x16,0x69,0x54,0x58,0x74,0x58,0x4d,0x4c,
  0x3a,0x63,0x6f,0x6d,0x2e,0x61,0x64,0x6f,0x62,0x65,0x2e,0x78,0x6d,0x70,0x0,0x0,
  0x0,0x0,0x0,0x3c,0x3f,0x78,0x70,0x61,0x63,0x6b,0x65,0x74,0x20,0x62,0x65,0x67,
  0x69,0x6e,0x3d,0x22,0xef,0xbb,0xbf,0x22,0x20,0x69,0x64,0x3d,0x22,0x57,0x35,0x4d,
  0x30,0x4d,0x70,0x43,0x65,0x68,0x69,0x48,0x7a,0x72,0x65,0x53,0x7a,0x4e,0x54,0x63,
  ...
```




## QFile文件操作详解

- QFile+QTextStream
和单独使用 QFile 类读写文本文件相比，QTextStream 类提**供了很多读写文件相关的方法**，还可以设定写入到文件中的数据格式，比如对齐方式、写入数字是否带前缀等等。
- QFile+QDataStream
QDataStream 类的用法和 QTextStream 非常类似，最主要的区别在于，QDataStream 用于读写二进制文件。



## 绘图和绘图设备

Qt 的绘图系统允许使用相同的 API 在屏幕和其它打印设备上进行绘制。整个绘图系统基于QPainter，QPainterDevice和QPaintEngine三个类。

QPainter用来执行绘制的操作；
QPaintDevice是一个二维空间的抽象，这个二维空间允许QPainter在其上面进行绘制，也就是QPainter工作的空间；
QPaintEngine提供了画笔（QPainter）在不同的设备上进行绘制的统一的接口。
Qt 的绘图系统实际上是，使用QPainter在QPainterDevice上进行绘制，它们之间使用QPaintEngine进行通讯（也就是翻译QPainter的指令）。


QPainter接收一个`QPaintDevice`指针作为参数。QPaintDevice有很多子类，比如 `QImage`，以及 `QWidget` 。注意回忆一下，QPaintDevice可以理解成要在哪里去绘制，而现在我们希望画在这个组件，因此传入的是 this 指针。



### 绘制状态的保存和加载
在绘图过程中，比如我们需要绘制很复杂的图像，而且在绘图过程中会多次进行重复复杂的设置，影响我们的开发效率。为了解决这个问题，QPainter为我们提供了save（）函数，此函数用来保存当前QPainter的设置（例如：红色画笔，线宽10px，绿色画刷，字体仿宋加粗高度32），接下来进行后续绘制，设置有可能会随之改变，当我们在某个位置绘图的时候如果需要前边保存的状态，即可通过restore（）函数，将保存的状态取出（红色画笔，线宽10px，绿色画刷，字体仿宋加粗高度32）。

QPainter的save（），restore（）函数的使用我们需要掌握以下两点：
- QPainter的状态设置可以使用save（）多次保存，使用restore（）函数取出每次保存的状态
- 使用save()函数保存多个设置的时候,其内部的存储方式为**栈**，使用restore()函数取保存的状态的时候相当于取出栈顶元素,并将其从栈顶弹出。


### 坐标变换
Qt 提供了四种坐标变换：平移 translate，旋转 rotate，缩放 scale 和扭曲 shear。
我们首先在 (10, 10) 点绘制一个红色的 50×100 矩形。保存当前状态，将坐标系平移到 (100, 0)，绘制一个黄色的矩形。注意，translate()操作平移的是**坐标系**，不是矩形。


**绘图设备是指继承QPainterDevice的子类。**Qt一共提供了四个这样的类，分别是QPixmap、QBitmap、QImage和 QPicture。其中，

- QPixmap专门为图像在屏幕上的显示做了优化。因此，它与实际的底层显示设备息息相关。**注意，这里说的显示设备并不是硬件，而是操作系统提供的原生的绘图引擎。所以，在不同的操作系统平台下，QPixmap的显示可能会有所差别。
	- 它的目标：高效显示
	- QPixmap = “显卡/窗口系统里的显示图片”
	- GPU texture/surface
	- “存放在 GPU 显存中的图像数据”。
	- CPU 不容易直接访问
	- 如果硬要读,需要从GPU → CPU
- QBitmap是QPixmap的一个子类，它的色深限定为1，即是黑白的。可以使用 QPixmap的isQBitmap()函数来确定这个QPixmap是不是一个QBitmap。**由于QBitmap色深小，因此只占用很少的存储空间，所以适合做光标文件和笔刷。**
- QImage专门为图像的像素级访问做了优化。可通过setPixpel()和pixel()等方法直接存取指定的像素
	- QImage = “内存里的图片数据”
	- CPU image buffer
	- 一块普通 CPU 内存中的连续像素缓冲区。
	- QImage img(100, 100, QImage::Format_RGB32);   --->  内存可能是：100 × 100 × 4 bytes  像素连续排列
	- 渲染时需要CPU → GPU
- QPicture则可以记录和重现QPainter的各条命令。**这是一个可以记录和重现QPainter命令的绘图设备。** **QPicture将QPainter的命令序列化到一个IO设备，保存为一个平台独立的文件格式。**





### 图形视图框架
Graphics View(图形视图)框架提供基于图元的模型/视图编程。Graphics View是一个基于item的**M-V**架构的框架。

- 基于item意思是，它的每一个组件都是一个item。这是与**QPainter的状态机**不同。回忆一下，使用QPainter绘图多是采用一种**面向过程的描述方式**，首先使用drawLine()画一条直线，然后使用drawPolygon()画一个多边形；而对于Graphics View来说，相同的过程可以是，首先创建一个场景scene，然后创建一个line对象和一个polygon对象，再使用scene的add()函数将line和polygon添加到scene，最后通过视口view就可以看到了。乍看起来，后者似乎更加复杂，但是，如果你的图像中包含了成千上万的直线、多边形之类，管理这些对象要比管理QPainter的draw语句容易得多。并且，这些图形对象也**更加符合面向对象的设计要求**：一个很复杂的图形可以很方便的复用。

- M-V架构的意思是，Graphics View提供一个model和一个view。所谓 **model** 就是我们添加的种种对象，所谓 **view** 就是我们观察这些对象的视口。**同一个model可以由很多view从不同的角度进行观察**，这是很常见的需求。使用QPainter就很难实现这一点，这需要很复杂的计算，而Qt的Graphics View就可以很容易的实现。



Graphics View三元素（Graphics View框架结构主要包含三个类）：
-  场景类（QGraphicsScene）
	* QGraphicsScene作为场景，即是我们添加图形的空间，相当于整个世界；
-  视图类（QGraphicsView）
	* QGraphicsView作为视口，也就是我们观察的窗口，相当于照相机的**取景框**，这个取景框可以覆盖整个场景，也可以是场景的一部分；
-  图元类（QGraphicsItem）
	* QGraphicsItem作为图形元件，以便scene添加，Qt内置了很多图形，比如line、polygon等，都是继承自QGraphicsItem。


Graphics View 的坐标系统：
三个Graphics View基本类都有各自不同的坐标系：
1. 场景坐标
2. 视图坐标 
3. 图元坐标。

- 场景坐标
场景坐标是所有图元的基础坐标系统。场景坐标系统描述了顶层的图元，每个图元都有场景坐标和相应的包容框。场景坐标的原点在场景中心，坐标原点是X轴正方向向右，Y轴正方向向下。
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240603111817.png)


- 视图坐标
视图坐标是窗口部件的坐标。视图坐标的**单位是像素**。QGraphicsView视图的左上角是原点（0， 0）， X轴正方向向右，Y轴正方向向下。所有的鼠标事件最开始都是使用视图坐标。
 
- 图元坐标
图元使用自己的本地坐标，这个坐标系统通常以图元的中心为原点，这也是所有变换的原点。图元坐标方向是X轴正方向向右，Y轴正方向向下。创建图元后，只需注意图元坐标就可以了，QGraphicsScene和QGraphicsView会完成所有的变换。



添加图元
场景类（QGraphicsScene）是一个放置图元的容器，**本身是不可见的**，必须通过与之相连的**视图类**来显示以及与外界进行相互操作。将**场景类添加到视图类**中有两种方式：
1. 通过视图类的构造函数:
	* QGraphicsView(QGraphicsScene * scene, QWidget * parent = 0)
2. 通过视图类的成员函数:
	* void	setScene(QGraphicsScene * scene)


添加图元到场景类中有两种方式:
1. 通过场景类成员函数addItem添加:
	* void	addItem(QGraphicsItem * item)  首先创建QGraphicsItem的子类对象, 然后再通过该函数将创建的对象添加到场景中。
2. 使用场景类提供的addEllipse、addLine、addPath、addPixmap、addRect、addText等成员函数直接添加图形、图片或文本到场景中。


设置图元的位置
在场景中添加新的图元之后，还可以继续设置图元的位置，可以使用QGraphicsItem类的成员函数 **setPos**() 进行设置:
```
void	setPos(const QPointF & pos)
void	setPos(qreal x, qreal y) 
```
图元中是可以添加图元的，通过setParentItem（QGraphicsItem * newParent）函数设置父图元。
使用setPos函数时其参数使用的坐标体系是**其父对象的坐标体系**，如果该图元有父图元，那么使用的就是其父图元的坐标体系。如果没有，那么使用的就是**scene的坐标体系**。




## 多媒体功能

- [Qt 绘制图片_qt setpixmap-CSDN博客](https://blog.csdn.net/weixin_41502364/article/details/132601333)


##  Socket通信
Qt中提供的所有的Socket类都是**非阻塞**的。
Qt中常用的用于socket通信的套接字类:
- QTcpServer：用于TCP/IP通信, 作为服务器端套接字使用
- QTcpSocket：用于TCP/IP通信，作为客户端套接字使用。
- QUdpSocket：用于UDP通信，服务器，客户端均使用此套接字。


### 广播
在使用QUdpSocket类的writeDatagram()函数发送数据的时候，其中第二个参数host应该指定为广播地址：QHostAddress：：Broadcast此设置相当于QHostAddress("255.255.255.255")
使用UDP广播的的特点：
- 使用UDP进行广播，局域网内的其他的UDP用户全部可以收到广播的消息
- UDP广播只能在局域网范围内使用
### 组播
我们再使用广播发送消息的时候会发送给所有用户，但是有些用户是不想接受消息的，这时候我们就应该使用组播，接收方只有先注册到组播地址中才能收到组播消息，否则则接受不到消息。另外组播是可以在Internet中使用的。
在使用QUdpSocket类的writeDatagram()函数发送数据的时候，其中第二个参数host应该指定为组播地址，关于组播地址的分类：
- 224.0.0.0～224.0.0.255为预留的组播地址（永久组地址），地址224.0.0.0保留不做分配，其它地址供路由协议使用；
- 224.0.1.0～224.0.1.255是公用组播地址，可以用于Internet；
- 224.0.2.0～238.255.255.255为用户可用的组播地址（临时组地址），全网范围内有效；
- 239.0.0.0～239.255.255.255为本地管理组播地址，仅在特定的本地范围内有效。
注册加入到组播地址需要使用QUdpSocket类的成员函数：
```cpp
bool joinMulticastGroup(const QHostAddress & groupAddress)
```



## 多线程
Qt 中**所有界面都是在 UI 线程中**（也被称为主线程，就是执行了QApplication::exec()的线程），在这个线程中执行耗时的操作（比如那个循环），就会阻塞 UI 线程，从而让界面停止响应。界面停止响应，用户体验自然不好，不过更严重的是，有些窗口管理程序会检测到你的程序已经失去响应，可能会建议用户强制停止程序，这样一来你的程序可能就此终止，任务再也无法完成。所以，为了避免这一问题，我们要使用 QThread 开启一个新的线程

```cpp
class WorkerThread : public QThread
{
    Q_OBJECT
public:
    WorkerThread(QObject *parent = 0)
        : QThread(parent)
    {
    }
protected:
    void run()
    {
        for (int i = 0; i < 1000000000; i++);
        emit done();
    }
signals:
    void done();
};
```
我们增加了一个WorkerThread类。WorkerThread继承自QThread类，重写了其` run() `函数。我们可以认为，run()函数就是新的线程需要执行的代码。在这里就是要执行这个循环，然后发出计算完成的信号。run()是线程的入口，就像main()对于应用程序的作用，使用 `QThread::start()` 函数启动一个线程。
这是 Qt 线程的最基本的使用方式之一（确切的说，这种方式已经不大推荐使用，不过因为看起来很清晰，而且简单使用起来也没有什么问题，所以还是有必要介绍）


多线程使用过程中注意事项：
- 线程不能操作UI对象（从Qwidget直接或间接派生的窗口对象）
- 需要移动到子线程中处理的模块类，创建的对象的时候不能指定父对象。


在Qt中，多线程编程是一种常见的方式，用于在后台执行耗时任务而不阻塞用户界面。Qt 提供了几种多线程的方式，主要包括 QThread 类、QtConcurrent 命名空间和使用 QThreadPool 和 QRunnable。以下是一些典型的使用方式和示例代码：

### 1. 使用 QThread 类

QThread 类提供了一种创建和管理线程的基本方式。可以通过继承 QThread 类或者将工作对象移动到新线程来实现。

#### 方式一：继承 QThread

继承 QThread 并重写 run() 方法。

```cpp
#include <QCoreApplication>
#include <QThread>
#include <QDebug>

class WorkerThread : public QThread
{
    Q_OBJECT

protected:
    void run() override {
        for (int i = 0; i < 5; ++i) {
            QThread::sleep(1);
            qDebug() << "Worker thread:" << QThread::currentThread();
        }
    }
};

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    WorkerThread thread;
    thread.start();

    return a.exec();
}

#include "main.moc"
```

#### 方式二：将对象移动到新线程

创建一个工作对象，将其移到新线程，并在新线程中调用对象的槽函数。
```cpp
#include <QCoreApplication>
#include <QThread>
#include <QObject>
#include <QDebug>

class Worker : public QObject
{
    Q_OBJECT

public slots:
    void doWork() {
        for (int i = 0; i < 5; ++i) {
            QThread::sleep(1);
            qDebug() << "Worker thread:" << QThread::currentThread();
        }
    }
};

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QThread thread;
    Worker worker;

    worker.moveToThread(&thread);

    QObject::connect(&thread, &QThread::started, &worker, &Worker::doWork);
    QObject::connect(&thread, &QThread::finished, &worker, &QObject::deleteLater);

    thread.start();

    return a.exec();
}

#include "main.moc"
```

### 2. 使用 QtConcurrent 命名空间

QtConcurrent 命名空间提供了多种高层次的并行编程功能，可以轻松地在多个线程上运行函数或操作容器。

```cpp
#include <QCoreApplication>
#include <QtConcurrent>
#include <QDebug>

void hello()
{
    for (int i = 0; i < 5; ++i) {
        QThread::sleep(1);
        qDebug() << "Hello from worker thread:" << QThread::currentThread();
    }
}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QtConcurrent::run(hello);

    return a.exec();
}
```

### 3. 使用 QThreadPool 和 QRunnable

QThreadPool 和 QRunnable 提供了一种线程池的管理方式，可以方便地管理和重用多个线程。

```cpp
#include <QCoreApplication>
#include <QThreadPool>
#include <QRunnable>
#include <QDebug>

class Worker : public QRunnable
{
public:
    void run() override {
        for (int i = 0; i < 5; ++i) {
            QThread::sleep(1);
            qDebug() << "Worker thread:" << QThread::currentThread();
        }
    }
};

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    Worker *worker = new Worker();
    QThreadPool::globalInstance()->start(worker);

    return a.exec();
}
```

### 4. 信号和槽机制

在多线程环境中，使用信号和槽机制来进行线程间的通信是非常方便和安全的。

```cpp
#include <QCoreApplication>
#include <QThread>
#include <QObject>
#include <QDebug>

class Worker : public QObject
{
    Q_OBJECT

public slots:
    void doWork() {
        for (int i = 0; i < 5; ++i) {
            QThread::sleep(1);
            emit resultReady(i);
        }
    }

signals:
    void resultReady(int);
};

class Controller : public QObject
{
    Q_OBJECT

public slots:
    void handleResults(int value) {
        qDebug() << "Received value:" << value << "in thread:" << QThread::currentThread();
    }
};

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QThread workerThread;
    Worker worker;
    Controller controller;

    worker.moveToThread(&workerThread);

    QObject::connect(&workerThread, &QThread::started, &worker, &Worker::doWork);
    QObject::connect(&worker, &Worker::resultReady, &controller, &Controller::handleResults);
    QObject::connect(&workerThread, &QThread::finished, &worker, &QObject::deleteLater);

    workerThread.start();

    return a.exec();
}

#include "main.moc"
```



## qt事件循环
所谓事件，可以大致分为一下几类：
- 键盘、鼠标以及其他与窗体交互引发的事件。
- socket活动，如连接、可读、可写引发的事件
- 定时器超时引发的事件

事件生成后，并非立刻发送，而是放在事件队列（event queue）中，一定时间后发送。分发器（dispatcher）循环获取事件队列中的事件，并把事件发送至事件的目标对象，因此称之为事件循环。事件循环伪代码如下：
```cpp
while (is_active)
{
    while (!event_queue_is_empty)
        dispatch_next_event();
    wait_for_more_events();
}
```

一般对于带UI窗口的程序来说，“事件”是由操作系统或程序框架在不同的时刻发出的。

当用户按下鼠标、敲下键盘，或者是窗口需要重新绘制的时候，计时器触发的时候，都会发出一个相应的事件。

我们把“事件循环”的代码 提炼/抽象 如下：

```cpp
function loop() {
    initialize();
    bool shouldQuit = false;
    while(false == shouldQuit)
    {
        var message = get_next_message();
        process_message(message);
        if (message == QUIT) 
        {
            shouldQuit = true;
        }
    }
}
```

在事件循环中, 不停地去获取下一个事件，然后做出处理。直到quit事件发生，循环结束。

有“取事件”的过程，那么自然有“存储事件”的地方，要么是操作系统存储，要么是软件框架存储。

存储事件的地方，我们称作 “事件队列” Event Queue

处理事件，我们也称作 “事件分发” Event Dispatch

## 不同操作系统的事件循环

### Windows
先来看一个Windows系统的事件循环示例(win32 API)：

```text
    MSG msg = { 0 };
    bool done = false;
    bool result = false;
    while (!done)
    {
        if (PeekMessage(&msg, 0, 0, 0, PM_REMOVE))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
        if (msg.message == WM_QUIT)
        {
            done = true;
        }
    }
```

### Qt的事件循环

Qt作为一个跨平台的UI框架，其事件循环实现原理, 就是把不同平台的事件循环进行了封装，并提供统一的抽象接口。
和Qt做了类似工作的，还有glfw、SDL等等很多开源库。

### QEventLoop类

QEventLoop即Qt中的事件循环类，主要接口如下：  

```text
int exec(QEventLoop::ProcessEventsFlags flags = AllEvents)
void exit(int returnCode = 0)
bool isRunning() const
bool processEvents(QEventLoop::ProcessEventsFlags flags = AllEvents)
void processEvents(QEventLoop::ProcessEventsFlags flags, int maxTime)
void wakeUp()
```

其中exec是启动事件循环，调用exec以后，调用exec的函数就会被“阻塞”，直到EventLoop里面的while循环结束。

### QCoreApplication 主事件循环

一般的Qt程序，main函数中都有一个QCoreApplication/QGuiApplication/QApplication，并在末尾调用 exec。  

```text
int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);
    //或者QGuiApplication， 或者 QApplication
    ...
    ...
    return app.exec();
}
```

  

Application类中，除去启动参数、版本等相关东西后，关键就是维护了一个 QEventLoop，Application的exec就是QEventLoop的exec。

不过Application中的这个EventLoop，我们称作“主事件循环”Main EventLoop。
所有的事件分发、事件处理都从这里开始。

Application还提供了sendEvent和poseEvent两个函数，分别用来发送事件。

sendEvent发出的事件会立即被处理，也就是“同步”执行。
postEvent发送的事件会被加入事件队列，在下一轮事件循环时才处理，也就是“异步”执行。
还有一个特殊的sendPostedEvents，是将已经加入队列中的准备异步执行的事件立即同步执行。


### 主循环伪代码
```cpp 
while (!app.shouldQuit()) { // 假设存在一个shouldQuit()方法来检查退出条件  
    // 1. 处理挂起的系统事件  
    // Qt会调用底层操作系统的API来检查是否有新的事件（如鼠标点击、键盘输入等）  
    // 这些事件会被添加到Qt的事件队列中  
  
    // 伪代码表示：  
    // Events = systemEventQueue.poll(); // 假设的方法，用于从系统获取新事件  
    // for (Event event : Events) {  
    //     app.eventQueue.enqueue(event); // 将事件加入Qt的事件队列  
    // }  
  
    // 2. 处理Qt内部事件和定时器  
    // Qt还需要处理内部生成的事件（如定时器到期）  
    // 这些事件同样会被加入到事件队列中  
  
  
    // 3. 分发事件  
    // Qt的事件循环会遍历事件队列，并将事件分发给相应的对象处理  
    // 这通常通过调用对象的event()方法或特定的事件处理器（如mousePressEvent()）来完成  
  
    // 伪代码表示：  
    while (!app.eventQueue.isEmpty()) {  
        Event event = app.eventQueue.dequeue(); // 从事件队列中取出事件  
          
        // 查找事件的目标对象  
        // 这可能涉及到事件过滤器、对象树中的传播等机制  
        QObject* target = findTargetForEvent(event);  
  
        // 如果找到了目标对象，则分发事件  
        if (target != nullptr) {  
            bool handled = target->event(event); // 调用目标对象的event()方法  
  
            // 如果event()方法返回false，表示事件未被处理  
            // Qt可能会继续尝试其他事件处理机制（如事件过滤器）  
        }  
  
        // 注意：实际的Qt实现中，事件处理要复杂得多  
        // 它可能涉及事件过滤器、事件传播、自定义事件处理器等多种机制  
    }  
  
    // 4. 处理空闲时间  
    // 当没有更多事件需要处理时，Qt可能会执行一些清理工作  
    // 或者允许应用程序执行一些后台任务（如更新UI、处理网络数据等）  
  
    // 伪代码中的这一步也是隐式的，因为Qt的QCoreApplication和QApplication类提供了  
    // 空闲时间处理的机制（如使用QTimer的singleShot(0, ...)）  
  
    // 5. 休眠以节省CPU资源  
    // 在没有事件需要处理时，Qt的主循环可能会让出CPU时间  
    // 这通常通过调用底层操作系统的休眠或等待函数来实现  
  
    // 伪代码中的这一步在Qt的实际实现中是自动处理的  
    // 但为了完整性，我们可以将其表示为一个假设的sleep()调用  
    // sleepIfNeeded(); // 假设的方法，用于在需要时让出CPU时间  
}  
  
// 当shouldQuit()返回true时，主循环结束  
// Qt会执行清理工作，并退出应用程序  
  
// 注意：上述伪代码中的许多方法（如shouldQuit()、eventQueue.enqueue()、findTargetForEvent()等）  
// 在Qt的实际API中并不存在。它们仅用于说明Qt主循环的工作原理。
```

### 不要阻塞事件循环
即不要在事件循环中执行耗时的操作，因为这将导致其他事件无法被处理，例如鼠标点击事件的响应槽函数中，不应做耗时操作，因为事件将无法被处理，UI会冻结，程序表现出“无响应”的状态。


### 为什么不能在Qt子线程中操作ui对象和QTcpSocket对象

在Qt中，不能直接在子线程中操作UI对象和`QTcpSocket`对象（或其他许多Qt的I/O和GUI类对象），这主要基于以下几个原因：
1. **线程安全性**：Qt的UI对象和许多网络、文件I/O类（如`QTcpSocket`）并不是线程安全的。这意味着它们没有设计为在多个线程中同时被访问或修改而不引起数据竞争或不一致的状态。如果多个线程尝试同时更新这些对象，可能会导致不可预测的行为、崩溃或数据损坏。
    
2. **事件循环**：Qt的UI组件（如窗口、按钮等）和许多I/O类都依赖于Qt的事件循环来处理事件（如用户输入、网络事件等）。这些事件循环通常只在主线程（也称为GUI线程）中运行。在子线程中直接操作UI对象会绕过事件循环，导致事件无法被正确处理，进而可能导致界面响应不灵敏或完全无响应。
    
3. **设计哲学**：Qt的设计哲学之一是鼓励使用信号和槽（Signals and Slots）机制来进行对象之间的通信，特别是跨线程通信。信号和槽提供了一种类型安全的机制，允许对象在特定事件发生时通知其他对象，并且这种通信可以是跨线程的。通过使用信号和槽，可以在保持线程安全的同时，实现子线程与主线程之间的数据交换和UI更新。



## 调试

你可以使用 `QT_DEBUG_PLUGINS=1` 环境变量启动 Qt 程序来调试插件加载过程：

```
QT_DEBUG_PLUGINS=1 ./your_qt_app
```



## 相关博文
- [API设计原则 – Qt官网的设计实践总结 | 酷 壳 - CoolShell](https://coolshell.org/articles/18024.html)
- [qt开发最全面试集锦](https://github.com/0voice/qt_interview_reference)
- [feiyangqingyun/QWidgetDemo: Qt编写的一些开源的demo，预计会有100多个，一直持续更新完善，代码简洁易懂注释详细，每个都是独立项目](https://github.com/feiyangqingyun/QWidgetDemo?tab=readme-ov-file)
- [feiyangqingyun/qtkaifajingyan: 自己总结的这十多年做Qt开发以来的经验，以及Qt相关武林秘籍电子书，](https://github.com/feiyangqingyun/qtkaifajingyan)