## Qt+Qmake
1. 从0新建项目的话直接在Qt中按其引导步骤一步步创建就行
2. 已有项目源码，且项目中有`.pro`项目配置文件，则直接用Qt打开`.pro`即可打开工程
3. 已有项目源码，但没有`.pro`项目配置文件,则1.新建一个工程 2.把源码考进新工程中3.Add Existing File or Directory

## Qt+Cmake
使用的Qt版本为5.12.12
1. 下载cmake，并设置到环境变量中
2. 下载Ninja，Qt中会默认生成用Ninja构建的项目。从 [Ninja 的 GitHub 仓库](https://github.com/ninja-build/ninja/releases)下载与操作系统相兼容的预编译二进制文件(仅一个ninja.exe)，并放入到cmake所在的目录中
3. 在qt中创建cmake的工程，qt会进行自动的构建

### Ninja
Ninja是一个快速且轻量级的构建系统，旨在加速软件项目的构建过程。它是由Google开发的，最初用于支持Chromium项目的构建，后来逐渐被广泛采用于其他开源项目和商业项目。
Ninja的主要作用是根据构建规则和依赖关系，自动化执行项目的编译和构建过程。


## VSCode+cmake
### 工具和插件的安装和配置
需要配置的环境变量
```
# cmake工具
C:\Program Files\CMake\bin

# mingw编译工具链g++.exe gdb.exe
D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin

# Qt的相关开发工具、动态库，如designer.exe、Qt5Core.dll、Qt5Widgets.dll等
D:\program\Qt\Qt5.12.12\5.12.12\mingw73_64\bin
```

vscode中安装的插件
- CMake
- CMake Tools
- Qt Configure
- Qt tools

### 新建Qt项目
1.配置Qt安装目录 `>QtConfigure:Set Qt Dir`, 目录为`D:\program\Qt\Qt5.12.12`
2.创建Qt项目 `>QtConfigure:New Project`, 新建项目名称、选择Qt套件（msvc或mingw），选择构建工具（cmake或qmake），是否带ui文件
套件即为Qt的特定版本的相关开发工具、动态库等
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230616194753.png)
以上步骤会创建一个带`CmakeLists.txt`的Qt工程
3.`> CMake:quick start`用cmake生成build目录和相关文件
4.`Cmake:build`F7编译   `cmake:debug`F5调试

若直接运行编译好的exe文件报`Qt5xxx.dll`的错误，则配置对应的编译套件环境变量，重新编译，即可直接打开exe运行程序。
```
# Qt的相关开发工具、动态库，如designer.exe、Qt5Core.dll、Qt5Widgets.dll等
D:\program\Qt\Qt5.12.12\5.12.12\mingw73_64\bin
```




## Ubuntu中打开Qt creator,提示无法覆盖文件
Ubuntu12.10中打开Qt creator,提示无法覆盖文件 /home/xxx/.config/Nokia/qtversion.xml : Permission denied解决办法
打开Qt creator,提示无法覆盖文件 /home/xxx/.config/Nokia/qtversion.xml : Permission denied ，要不断点好几次确定之后才能进去。  

退出的时候显示无法覆盖文件 /home/xxx/.config/Nokia/toolChains.xml : Permission denied。


实际上解决方式是改变主目录下.config的权限。

终端下输入：sudo chown -R lmm:lmm ~/.config/。  
lmm:lmm是我的当前的登录的用户名，改成你自己的用户名就可以了。
估计原来不好用的原因是没有以root权限安装。



## QT配置msvc

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20240410133607.png)


![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20240410133747.png)
需要下载windbg
CDB（command line debugger）是给控制台调试代码用的，CDB是WinDbg的小兄弟。因为VS的VC++用的调试器是C:\Windows\System32\vsjitdebugger.exe，所以安装Visual Studio是没有cdb的。必须从WDK里面安装Debugging Tools for Windows。

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20240410133848.png)



## linux下源码编译qt和qtCreator
QTCreator要想在Linux-arm架构下运行，必须要保证两个：
1. qt要在arm下编译生成对应库文件和qmake
2. qtCreator 要在arm架构下编译

- [飞腾ARM架构 UOS系统编译Qt 5.15.2源码及Qt Creator - 掘金](https://juejin.cn/post/7300569624236359718)
- [qt/qtcreator在Arm架构下的安装_qt creator arm-CSDN博客](https://blog.csdn.net/yaojinjian1995/article/details/117285197)

## 参考链接
- [Qt 开发使用VSCode](https://blog.csdn.net/qq_39827640/article/details/127630482)