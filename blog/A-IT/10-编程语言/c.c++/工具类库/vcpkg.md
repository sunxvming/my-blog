
## vcpkg安装依赖的原理
vcpkg是一个包管理器，它使用本身编译、组织和安装C++库及其相关依赖项。它的工作原理基于以下几个关键点：

### 知识库
vcpkg维护了一个知识库，其中包含了大量的C++库以及它们的依赖关系、编译选项等信息。这个知识库使得vcpkg能够知道每个库的构建配置和它们彼此之间的依赖关系。

### 源码编译
当你使用vcpkg安装一个库时，它会**从源代码构建该库**。vcpkg会自动下载所需的源代码，并根据目标平台进行编译。这确保了库能够在你的系统上良好地工作。

### 依赖解析
vcpkg会检查库的依赖关系，并确保安装所需的所有依赖项。如果某个库依赖于其他库，vcpkg会尝试解析这些依赖关系并安装缺失的依赖项。

### 本地安装
安装的库和它们的依赖项会被保存在vcpkg管理的本地目录中。这些库会被编译为静态或动态链接库，以便后续在你的项目中使用。


vcpkg下载和编译依赖需要维护以下这几个目录：
- **ports**  所有可以下载的三方包的信息
* **downloads**  源码包，一般从github上下载
* **buildtrees**  源码和编译后的文件都放在这里，编译后的文件分debug版本和release版本
* **packages**   按照不同的包存放的库的依赖，包括头文件库文件，分debug版本和release版本
* **installed**   存放编译后的文件和头文件，所有的依赖库都存放在统一的目录下，比如lib下有所有的依赖库



## 注意点
**安装的版本**
请注意: vcpkg 在 Windows 中默认编译并安装 **x86** 版本的库。 若要编译并安装 **x64** 版本，请执行:

```
vcpkg install [package name]:x64-windows
```

**安装时的报错**
安装的时候经常会出错，大部分原因都是因为去下载源码包的时候网络连接的问题，可以加个代理去下载


## 构建三元组
（cpu架构，操作系统，静动态库）

确保已安装包的三元组与项目的配置匹配。 对 64 位项目，使用 x64-windows 或 x64-windows-static；对 32 位项目，使用 x86-windows 或 x86-windows-static。



**静动态库**
安装的时候默认是动态库，如何需要安装成静态库的话需要设置参数：`x64-windows-static`,
vcpkg会安装到这个目录下：`vcpkg\packages\freeglut_x64-windows-static`


**覆盖默认三元组**
如前所述，Windows（x86-windows 和 x64-windows）的默认三联密码**安装动态库**，而静态库则需要一个后缀 (-static)。 这与 Linux 和 Mac OS 不同，这两个操作系统中的静态库是由 x64-linux 和 x64-osx 构建的。

x64-linux：构建动态库，
x64-linux-static：构建静态库。



## linux下的使用
安装vcpkg
```
sudo apt-get update
sudo apt-get install git
sudo apt-get install build-essential tar curl zip unzip

git clone https://github.com/microsoft/vcpkg

./vcpkg/bootstrap-vcpkg.sh   // 这会从github上下载 vcpkg的可执行程序
```
