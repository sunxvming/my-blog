参考：https://zhuanlan.zhihu.com/c_200294809


## 相关路径
CMAKE_PREFIX_PATH是以分号分隔的列表，供find_package(), find_program(), find_library(), find_file()和find_path()使用，初始为空，由用户设定
CMAKE_MODULE_PATH是以分号分隔的列表，供include()或 find_package()使用。初始为空，由用户设定
 
两者的选择，优先使用CMAKE_PREFIX_PATH


## Module模式与Config模式
通过上文我们了解了通过Cmake引入依赖库的基本用法。知其然也要知其所以然，find_package对我们来说是一个黑盒子，那么它是具体通过什么方式来查找到我们依赖的库文件的路径的呢。到这里我们就不得不聊到find_package的两种模式，一种是Module模式，也就是我们引入curl库的方式。另一种叫做Config模式，也就是引入glog库的模式。下面我们来详细介绍着两种方式的运行机制。


在Module模式中，cmake需要找到一个叫做`Find<LibraryName>.cmake`的文件。这个文件负责找到库所在的路径，为我们的项目引入头文件路径和库文件路径。cmake搜索这个文件的路径有两个，一个是上文提到的cmake安装目录下的`share/cmake-<version>/Modules`目录，另一个使我们指定的`CMAKE_MODULE_PATH`的所在目录。


如果Module模式搜索失败，没有找到对应的`Find<LibraryName>.cmake`文件，则转入Config模式进行搜索。它主要通过`<LibraryName>Config.cmake` or `<lower-case-package-name>-config.cmake`这两个文件来引入我们需要的库。以我们刚刚安装的glog库为例，在我们安装之后，它在`/usr/local/lib/cmake/glog/`目录下生成了`glog-config.cmake`文件，而`/usr/local/lib/cmake/<LibraryName>/`正是find_package函数的搜索路径之一。（find_package的搜索路径是一系列的集合，而且在linux，windows，mac上都会有所区别，需要的可以参考官方文档[find_package](https://cmake.org/cmake/help/latest/command/find_package.html)）


由以上的例子可以看到，对于原生支持Cmake编译和安装的库通常会安装Config模式的配置文件到对应目录，这个配置文件直接配置了头文件库文件的路径以及各种cmake变量供find_package使用。而对于非由cmake编译的项目，我们通常会编写一个`Find<LibraryName>.cmake`，通过脚本来获取头文件、库文件等信息。通常，原生支持cmake的项目库安装时会拷贝一份XXXConfig.cmake到系统目录中，因此在没有显式指定搜索路径时也可以顺利找到。