
## 简介

### cmake
cmake允许开发者编写一种平台无关的 CMakeList.txt 文件来**定制整个编译流程**，然后再根据目标用户的平台进一步生成所需的本地化 Makefile 和工程文件，如 Unix 的 Makefile 或 Windows 的 Visual Studio 工程。从而做到“Write once, run everywhere”。


* 内部构建和外部构建
cmake强烈推荐的是外部构建(out-of-source build)，好处是不影响源码。即新建build目录，构建的工作和生成的中间文件都在这个目录


* 查看更详细的编译信息
make VERBOSE=1 来构建


### 参考资料
参考资料：
知乎问题 CMake 如何入门？：https://www.zhihu.com/question/58949190


关于cmake由浅入深的例子
https://github.com/ttroy50/cmake-examples


awesome-cmake
https://github.com/onqtam/awesome-cmake


Learn CMake's Scripting Language in 15 Minutes
https://preshing.com/20170522/learn-cmakes-scripting-language-in-15-minutes/






## 注意事项
### cmake缓存
有时候改了cmake中的选项，比如：
`option(CCACHE "Use ccache if available" OFF)` 由ON改成OFF，但是打印CCACHE的值还是不变。这些选项被缓存在CMakeCache.txt中了。
对于这种情况可以直接删掉build目录，或者编译时加上选项,比如
```
cmake .. -DCCACHE=OFF
```
### 编译时编译器
默认情况下.cpp文件的编译方式为g++，以c结尾的文件编译方式为gcc。
当存在c文件和c++文件混编的情况下要注意，若c文件用gcc编译，cpp文件用g++编译，可能会有问题。



## 编译流程

### 最简单例子
```
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)

# 添加可执行文件
add_executable(MyApp main.cpp apf.cpp)
```

### 内置变量


编译发生的目录，即build目录
```
CMAKE_BINARY_DIR
PROJECT_BINARY_DIR
<projectname>_BINARY_DIR
```


工程顶层目录
```
CMAKE_SOURCE_DIR
PROJECT_SOURCE_DIR
<projectname>_SOURCE_DIR
```


当前处理的CMakeLists.txt 所在的路径，即用sub-projects and directories.
```
CMAKE_CURRENT_SOURCE_DIR
CMAKE_CURRENT_BINARY_DIR      The build directory you are currently in.
```


### 设置编译选项

CMake 中有一个变量 CMAKE_BUILD_TYPE ,可以的取值是 Debug Release RelWithDebInfo 和 MinSizeRel。当这个变量值为 Debug 的时候,CMake 会使用变量 CMAKE_CXX_FLAGS_DEBUG 和 CMAKE_C_FLAGS_DEBUG 中的字符串作为编译选项生成 Makefile ,当这个变量值为 Release 的时候,工程会使用变量 CMAKE_CXX_FLAGS_RELEASE 和 CMAKE_C_FLAGS_RELEASE 选项生成 Makefile。
```
cmake_minimum_required(VERSION 2.8.9)
project(hello)


set(CMAKE_CXX_STANDARD 17)
# 编译工具设置

# 设置链接器为ld.gold, 路径一般在/usr/bin/ld.gold下面
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -fuse-ld=gold")

# 编译类型相关 Debug or Release
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -rdynamic")
set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -rdynamic")

set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -rdynamic")
set(CMAKE_C_FLAGS_RELEASE  "${CMAKE_C_FLAGS_RELEASE} -rdynamic")

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Debug")
endif()

message("CMAKE_BUILD_TYPE is:${CMAKE_BUILD_TYPE}")

# message("CMAKE_CXX_FLAGS_DEBUG :================")
# message(${CMAKE_CXX_FLAGS_DEBUG})

# message("CMAKE_CXX_FLAGS_RELEASE  :================")
# message(${CMAKE_CXX_FLAGS_RELEASE})

if(NOT CMAKE_BUILD_TYPE STREQUAL "Debug" AND NOT CMAKE_BUILD_TYPE STREQUAL "Release")
    message(FATAL_ERROR "CMAKE_BUILD_TYPE must be Debug or Release!!!")
endif()

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
endif()

if(CMAKE_BUILD_TYPE STREQUAL "Release")
endif()


# 设置编译输出位置
# 应该把这两条指令写在工程的 CMakeLists.txt 还是 src 目录下的CMakeLists.txt?
# 写在ADD_EXECUTABLE 或 ADD_LIBRARY命令的文件中
set(EXECUTABLE_OUTPUT_PATH ${ROOT_DIR}/bin)
SET(LIBRARY_OUTPUT_PATH ${PROJECT_BINARY_DIR}/lib)
```


### 执行前置工作
```
# 执行某个脚本
execute_process(COMMAND sh ${CMAKE_SOURCE_DIR}/make_depend.sh)
```


### 设置target
```
# 1.动态库 
add_library(hello_library STATIC
    ${SOURCES}
)
# 2.静态库
add_library(hello_library SHARED
    ${SOURCES}
)
# 3.可执行文件
add_executable(hello ${SOURCES})
# 4.自定义目标
add_custom_target()
```


#### 生成同名的.a和.so库文件
```
ADD_LIBRARY(hello SHARED ${LIBHELLO_SRC})
ADD_LIBRARY(hello_static STATIC ${LIBHELLO_SRC})
SET_TARGET_PROPERTIES(hello_static PROPERTIES OUTPUT_NAME "hello")
SET_TARGET_PROPERTIES(hello PROPERTIES CLEAN_DIRECT_OUTPUT 1)
SET_TARGET_PROPERTIES(hello_static PROPERTIES CLEAN_DIRECT_OUTPUT 1)
```
cmake在构建一个新的target 时，会尝试清理掉其他使用这个名字的库，
所以要用CLEAN_DIRECT_OUTPUT来设置一下不要删除相同的目标
CLEAN_DIRECT_OUTPUT：Do not delete other variants of this target


#### EXCLUDE_FROM_ALL，make时默认不编译
在一个项目中不可避免会有一些测试代码，这些测试代码，我们并不一定需要每次都编译，尤其是编译正式版本的时候，这些测试代码是不会加入release版本的。为了加快编译速度，可以将这些测试用的target或不会加入release的target 加上EXCLUDE_FROM_ALL属性就不需要每次编译它了。 
```
# fctest指定了EXCLUDE_FROM_ALL 属性,不会自动编译，只能手动编译
add_executable(fctest EXCLUDE_FROM_ALL FeatureCompareSpeedTest.cpp)
```


### 设置targe属性


targets
A CMake script defines targets using the add_executable, add_library or add_custom_target commands properties
Once a target is created, it has properties that you can manipulate using the `get_property()` and `set_property()`


Unlike variables, targets are visible **in every scope**, even if they were defined in a subdirectory.
All target properties are strings.


```
# Get the target's SOURCES property and assign it to MYAPP_SOURCES
get_property(MYAPP_SOURCES TARGET MyApp PROPERTY SOURCES)


SET_TARGET_PROPERTIES(hello_static PROPERTIES OUTPUT_NAME "hello")


# 获取属性的名字
GET_TARGET_PROPERTY(OUTPUT_VALUE hello_static OUTPUT_NAME)


# 设置动态库版本号  VERSION 指代动态库版本，SOVERSION 指代 API 版本。
SET_TARGET_PROPERTIES(hello PROPERTIES VERSION 1.2 SOVERSION 1)


# 添加宏定义
target_compile_definitions(libWAVM PUBLIC "WAVM_API=__attribute__((visibility(\"default\")))")
```


### 设置源文件
```
# 文件列表
set(SOURCES
    src/Hello.cpp
    src/main.cpp
)
# 模式匹配
file(GLOB SOURCES "src/*.cpp")
```


### 构建可选选项(开关)
```
# should we use our own math functions?
option (USE_MYMATH
        "Use tutorial provided math implementation" ON)


# add the MathFunctions library?
if (USE_MYMATH)
  include_directories ("${PROJECT_SOURCE_DIR}/MathFunctions")
  add_subdirectory (MathFunctions)
  set (EXTRA_LIBS ${EXTRA_LIBS} MathFunctions)
endif (USE_MYMATH)
 
# add the executable
add_executable (Tutorial tutorial.cxx)
target_link_libraries (Tutorial  ${EXTRA_LIBS})



# 这将使用USE_MYMATH的设置来确定是否应该编译和使用mathfunction库。
# 注意，使用一个变量(在本例中是EXTRA_LIBS)来设置可选的库，然后将它们链接到可执行文件中。
# 这是一种常见的方法，用于保持较大的项目具有许多可选组件。


```


源码中使用
```
首先在Configure.h.in文件中添加以下内容：
#cmakedefine USE_MYMATH


#ifdef USE_MYMATH
#include "MathFunctions.h"
#endif



#ifdef USE_MYMATH
  double outputValue = mysqrt(inputValue);
#else
  double outputValue = sqrt(inputValue);
#endif
```


### 自定义生成文件


```
set (Tutorial_VERSION_MAJOR 1)
set (Tutorial_VERSION_MINOR 0)
 
# Copy a file to another location and modify its contents.
configure_file (
  "${PROJECT_SOURCE_DIR}/TutorialConfig.h.in"
  "${PROJECT_BINARY_DIR}/TutorialConfig.h"
)


```


TutorialConfig.h.in
```
// @xx@ 中的变量会被替换掉
#define Tutorial_VERSION_MAJOR @Tutorial_VERSION_MAJOR@
#define Tutorial_VERSION_MINOR @Tutorial_VERSION_MINOR@
```


### 设置包含目录
```
1.
include_directories(include)


2.
target_include_directories(${PROJECT_NAME}
    PRIVATE
        ${PROJECT_SOURCE_DIR}/Include
)
```




### 设置依赖库、依赖库目录


```
INCLUDE_DIRECTORIES([AFTER|BEFORE] [SYSTEM] dir1 dir2 ...)


1.
target_link_libraries(${PROJECT_NAME} "pthread" )


2.
add_library(glut32 STATIC IMPORTED)
set_property(TARGET glut32 PROPERTY IMPORTED_LOCATION ${ROOT_DIR}/Library/glut32.lib)
target_link_libraries(${PROJECT_NAME} glut32 )  #添加glut32.lib
```




### 指定安装规则
安装的内容可以包括目标二进制、动态库、静态库以及文件、目录、脚本等。
变量CMAKE_INSTALL_PREFIX    用法：cmake -DCMAKE_INSTALL_PREFIX=/usr .
默认是在DESTINATION目录下


```
# DESTINATION 在这里是一个相对路径，取默认值。在unix系统中指向 /usr/local 在windows上c:/Program Files/${PROJECT_NAME}。
# 指定target安装目录， make install时生效
install(TARGETS testStudent DESTINATION /usr/lib)


# 自定义文件复制
file(COPY ${ROOT_DIR}/Library/glut32.dll
    DESTINATION ${EXECUTABLE_OUTPUT_PATH}/Release)


# 目标文件
INSTALL(TARGETS targets... [ARCHIVE|LIBRARY|RUNTIME] [DESTINATION dirname] [PERMISSIONS permissions...] [...])
# 普通文件
INSTALL(FILES files... DESTINATION <dir> [PERMISSIONS permissions...])
# 目录的安装
INSTALL(DIRECTORY dirs... DESTINATION <dir> [FILE_PERMISSIONS permissions...]）
安装时CMAKE脚本的执行：INSTALL([[SCRIPT <file>] [CODE <code>]] [...])
```

### Pre-build和Post-build操作
在CMake中提供了add_custom_command和add_custom_target用来为某个目标或库添加一些自定义命令，该命令本身会成为目标的一部分，仅在目标本身被构建时才会执行。如果该目标已经构建，命令将不会执行。

add_custom_command: 增加自定义的构建规则到生成的构建系统中
```
add_custom_command(TARGET target
                     PRE_BUILD | PRE_LINK| POST_BUILD
                     COMMAND command1[ARGS] [args1...]
                     [COMMAND command2[ARGS] [args2...] ...]
                     [WORKING_DIRECTORYdir]
                     [COMMENT comment][VERBATIM])
```

### cpack生成安装包



## 语法


### 执行指定的脚本
cmake -P hello.txt



### 变量 All Variables Are Strings
```
# 命令行中设置
cmake -DNAME=Newman


# 脚本中设置
set(THING "funk")


# 基本语法规则：
# 1. 变量使用${}方式取值，但是在IF控制语句中是直接使用变量名
# 2. 指令(参数1 参数2...)
# 参数使用括弧括起，参数之间使用空格或分号分开
# 指令是大小写无关的，参数和变量是大小写相关的
# 参数加不加引号都可以
# SET(SRC_LIST main.c)也可以写成 SET(SRC_LIST "main.c")
```


### 结构化变量
You Can Simulate a Data Structure using Prefixes
变量可以嵌套使用
```
set(JOHN_NAME "John Smith")
set(JOHN_ADDRESS "123 Fake St")
set(PERSON "JOHN")
message("${${PERSON}_NAME} lives at ${${PERSON}_ADDRESS}.")
```



### 语句 Every Statement is a Command
every statement is a command that takes a list of string arguments and has no return value
```
math(EXPR MY_SUM "1 + 1")   # Evaluate 1 + 1; store result in MY_SUM
```


### 比较语句
数字比较         LESS,GREATER,EQUAL


字符串比较       STRLESS、STRGREATER、STREQUAL


### 控制语句 Flow Control Commands
cmake所有commands  https://cmake.org/cmake/help/latest/manual/cmake-commands.7.html


Even flow control statements are commands.
```
# 缩进不是必须的
if(WIN32)
    message("You're running CMake on Windows.")
endif()


# 循环
set(A "1")
set(B "1")
while(A LESS "1000000")
    message("${A}")                 # Print A
    math(EXPR T "${A} + ${B}")      # Add the numeric values of A and B; store result in T
    set(A "${B}")                   # Assign the value of B to A
    set(B "${T}")                   # Assign the value of T to B
endwhile()
```


### 列表
Lists are Just Semicolon-Delimited Strings
```
set(ARGS "EXPR;T;1 + 1")   #此时的ARGS就是一个列表
math(${ARGS})    # Equivalent to calling math(EXPR T "1 + 1")


set(ARGS "EXPR;T;1 + 1")   #加引号会原文输出，不加引号会被当做多个值
message("${ARGS}")       # Prints: EXPR;T;1 + 1


# 列表在for循环中的应用
foreach(ARG These are separate arguments)
    message("${ARG}")   # Prints each word on a separate line
endforeach()


foreach(ARG ${MY_LIST})       # Splits the list; passes items as arguments
    message("${ARG}")         # Prints each item on a separate line
endforeach()
```


### 函数和宏
Functions Run In Their Own Scope; Macros Don’t


函数里的变量不会污染全局的变量，若要在函数中设置变量的值，需要传参并用set设值
函数可以访问函数外部的全局变量
```
# VALUE为参数
function(doubleIt VALUE)
    math(EXPR RESULT "${VALUE} * 2")
    message("${RESULT}")
endfunction()


doubleIt("4")   # Prints: 8


# 改变外部变量
function(doubleIt VARNAME VALUE)
    math(EXPR RESULT "${VALUE} * 2")
    set(${VARNAME} "${RESULT}" PARENT_SCOPE)    # Set the named variable in caller's scope
endfunction()


doubleIt(RESULT "4")                    # Tell the function to set the variable named RESULT
message("${RESULT}")                    # Prints: 8


# 上述函数用宏实现
macro(doubleIt VARNAME VALUE)
    math(EXPR ${VARNAME} "${VALUE} * 2")      # Set the named variable in caller's scope
endmacro()


doubleIt(RESULT "4")                    # Tell the macro to set the variable named RESULT
message("${RESULT}")                    # Prints: 8



# 无参函数会把list当做参数，并用ARGN来引用
function(doubleEach)
    foreach(ARG ${ARGN})                # Iterate over each argument
        math(EXPR N "${ARG} * 2")       # Double ARG's numeric value; store result in N
        message("${N}")                 # Print N
    endforeach()
endfunction()


doubleEach(5 6 7 8)                     # Prints 10, 12, 14, 16 on separate lines
```




### Including Other Scripts


#### include
命令可以包含进来另一个脚本，include的搜索路径的变量在CMAKE_MODULE_PATH中


#### find_package
The find_package command looks for scripts of the form Find*.cmake and also runs them in the same scope.
Such scripts are often used to help find external libraries.


find_package()命令首先会在模块路径中寻找Find.cmake，这是查找库的一个典型方式。具体查找路径依次为CMake：变量${CMAKE_MODULE_PATH}中的所有目录。如果没有，然后再查看它自己的模块目录/share/cmake-x.y/Modules/
命令查找： find / -name Find*.cmake |less

find_package的主要作用是生成一些变量：如:`xxx_INCLUDE_DIRS`,`xxx_LIBRARIES`, 方便集成三方库
```
find_package(OpenSceneGraph REQUIRED osgDB osgUtil osgViewer osgGA osgText)

include_directories(${OPENSCENEGRAPH_INCLUDE_DIRS})

target_link_libraries(${PROJECT_NAME} PRIVATE ${OPENSCENEGRAPH_LIBRARIES})
```



`find_package` 是 CMake 中一个用于查找并加载外部库或工具包的函数。它的工作原理涉及一系列步骤，用于在系统上查找所需的库或工具包，并设置相应的变量以便后续使用。

这里是 `find_package` 的主要工作步骤：

1. **查找模块文件：** `find_package` 需要一个 `Find<PackageName>.cmake` 文件或 `<PackageName>Config.cmake` 文件来帮助定位库或工具包。这些文件通常由库或工具包的提供者编写，并包含了指导 CMake 如何找到和使用该包的信息。

2. **搜索位置：** `find_package` 会在预定义的一系列目录中搜索模块文件。这些目录包括 CMake 的模块路径 (`CMAKE_MODULE_PATH`)，系统环境变量中的路径，以及其他用户定义的路径。

3. **执行模块文件：** 找到适当的模块文件后，`find_package` 会执行该文件。这个文件的内容会告诉 CMake 如何找到包，设置必要的变量以便在项目中使用。

4. **设置变量：** 如果找到了所需的包，`find_package` 会设置一系列变量，例如 `<PackageName>_FOUND` 表示是否找到该包，`<PackageName>_INCLUDE_DIRS` 表示包含文件的目录，`<PackageName>_LIBRARIES` 表示库文件的路径等等。这些变量允许你在 CMakeLists.txt 文件中使用该包。

5. **报告结果：** `find_package` 会将结果报告给 CMake 构建系统，这样你就可以根据找到的包是否可用来设置其他构建选项或路径。

需要注意的是，不同的包提供者可能会有不同的 `Find<PackageName>.cmake` 文件或 `<PackageName>Config.cmake` 文件。一些包可能会使用基于环境变量的方法，而另一些则可能提供了更复杂的配置文件，包含了库的位置、依赖项和编译选项等信息。

总的来说，`find_package` 提供了一个灵活且通用的方法来管理依赖项，但其准确的工作方式取决于每个特定包提供的支持文件和 CMake 的配置。


#### add_subdirectory
CMake’s add_subdirectory command, on the other hand, creates a new scope, then executes the script named CMakeLists.txt from the specified directory in that new scope
















## windows上使用
Windows上使用CMake也很方便，除了传统的命令行方式使用CMake，还有一个简单的GUI程序cmake-gui.exe来使用CMake。
运行cmake-gui
source code编辑框就是输入代码的所在的路径，这个路径能够找到一个CMakeLists.txt文件。
build the binaries编辑框就是编译输出的中间文件和最终的二进制文件的目录。
Add Entry添加预定义的变量
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/c8b32e20-2b60-493b-b07b-f0c644b1f3ab.png)


因为CMake最终通过CMakeLists.txt文件生成Windows上对应的vs工程文件，不同的vs版本也会影响到最终生成vs工程文件，所以configure对话框就是选择代码编译工具的，如图所示：
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/4b2979e6-edd8-42d0-9c31-25f0f795e993.jpg)


## vscode的cmake插件使用
cmake插件是微软官方出品，使用很方便。需要大致三个步骤：
1. 选择kits(编译套件)，比如是vs的还是mingw的
2. 生成对应平台的构建工程并编译，比如是vs的工程还是make的工程
3. Debug(ctrl+f5) 或者 run without debugging(shift+f5) 

### 以mingw说明cmake执行的过程

#### cmake构建命令
```
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Debug -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_C_COMPILER:FILEPATH=D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin\gcc.exe -DCMAKE_CXX_COMPILER:FILEPATH=D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin\g++.exe -SD:/project/c++/example -Bd:/project/c++/example/build -G "MinGW Makefiles"
```


#### 编译的构建命令
`cmake --build` 命令是 CMake 提供的用于执行构建的命令。它允许你在不离开 CMake 命令行界面的情况下调用底层的构建工具（如 Make、Ninja、Visual Studio 等），以执行构建过程。
其中-v命令可以查看最终执行的命令
```
cmake --build  d:/project/c++/example/build -v --config Debug --target all -j 22
```

最终命令如下：
```
"C:\Program Files\CMake\bin\cmake.exe" -SD:\project\c++\example -BD:\project\c++\example\build --check-build-system CMakeFiles\Makefile.cmake 0
"C:\Program Files\CMake\bin\cmake.exe" -E cmake_progress_start D:\project\c++\example\build\CMakeFiles D:\project\c++\example\build\\CMakeFiles\progress.marks
D:/program/Qt/Qt5.12.12/Tools/mingw730_64/bin/mingw32-make.exe  -f CMakeFiles\Makefile2 all
mingw32-make.exe[1]: Entering directory 'D:/project/c++/example/build'
D:/program/Qt/Qt5.12.12/Tools/mingw730_64/bin/mingw32-make.exe  -f CMakeFiles\MyApp.dir\build.make CMakeFiles/MyApp.dir/depend
mingw32-make.exe[2]: Entering directory 'D:/project/c++/example/build'
"C:\Program Files\CMake\bin\cmake.exe" -E cmake_depends "MinGW Makefiles" D:\project\c++\example D:\project\c++\example D:\project\c++\example\build D:\project\c++\example\build D:\project\c++\example\build\CMakeFiles\MyApp.dir\DependInfo.cmake --color=
mingw32-make.exe[2]: Leaving directory 'D:/project/c++/example/build'
D:/program/Qt/Qt5.12.12/Tools/mingw730_64/bin/mingw32-make.exe  -f CMakeFiles\MyApp.dir\build.make CMakeFiles/MyApp.dir/build
mingw32-make.exe[2]: Entering directory 'D:/project/c++/example/build'
[ 50%] Building CXX object CMakeFiles/MyApp.dir/main.cpp.obj
D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin\g++.exe   -g -std=gnu++1z -MD -MT CMakeFiles/MyApp.dir/main.cpp.obj -MF CMakeFiles\MyApp.dir\main.cpp.obj.d -o CMakeFiles\MyApp.dir\main.cpp.obj -c D:\project\c++\example\main.cpp
[100%] Linking CXX executable MyApp.exe
"C:\Program Files\CMake\bin\cmake.exe" -E cmake_link_script CMakeFiles\MyApp.dir\link.txt --verbose=1
"C:\Program Files\CMake\bin\cmake.exe" -E rm -f CMakeFiles\MyApp.dir/objects.a
D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin\ar.exe qc CMakeFiles\MyApp.dir/objects.a @CMakeFiles\MyApp.dir\objects1
D:\program\Qt\Qt5.12.12\Tools\mingw730_64\bin\g++.exe -g -Wl,--whole-archive CMakeFiles\MyApp.dir/objects.a -Wl,--no-whole-archive -o MyApp.exe -Wl,--out-implib,libMyApp.dll.a -Wl,--major-image-version,0,--minor-image-version,0 @CMakeFiles\MyApp.dir\linkLibs.rsp
mingw32-make.exe[2]: Leaving directory 'D:/project/c++/example/build'
[100%] Built target MyApp
mingw32-make.exe[1]: Leaving directory 'D:/project/c++/example/build'
"C:\Program Files\CMake\bin\cmake.exe" -E cmake_progress_start D:\project\c++\example\build\CMakeFiles 0
```


#### vs的套件说明
- x86：编译器为x86版本，输出文件为x86。
- amd64_x86：编译器为amd64版本，输出文件为x86。
- amd64：编译器为amd64版本，输出文件为amd64。
- x86_amd64：编译器为x86版本，输出文件为amd64。



## cmake插件存在的问题

按`shift+F5`或`cmake：run without debugging` 直接运行编译好的程序，无法在插件创建的terminal中运行起来程序，且没有任何报错，但是用其他的terminal都可运行程序。

定位问题的步骤：
1. 确定带gui界面的程序无法运行，命令行的程序可以运行
2. 用之前的python打包的单独exe且是带图形界面程序运行，发现可以运行
3. 在terminal中运行编译好的程序时程序一闪而过，猜想会不会是缺少dll动态库直接退出程序的运行
4. 把依赖的dll库放在运行程序的文件中，发现可以正常运行，猜想cmake创建的terminal的环境变量可能有问题
5. 在cmake创建的terminal中和非cmake创建的terminal中用`$env:path`打印环境变量发现，cmake创建的比非cmake创建的少了依赖的动态库的环境变量
6. 对比发现少的path环境变量中带有mingw，猜想是不是cmake插件进行了某些处理，直接把带mingw的环境变量给干掉了
7. vscode中执行`CMake: Open the CMake Tools Log File`打开cmake插件的log文件，发现其中有打印环境变量，打印如下`2023-06-20T11:08:55.736Z [debug] [kit] The environment for kit 'GCC 7.3.0 x86_64-w64-mingw32': {`
8. 下载cmake tool插件的源码，搜索`The environment for kit`,找到其所在的源码位置，发现其中有针对path环境变量的过滤逻辑`current_path_list = current_path_list.filter(p => !isMingw(p)); 
9. 其主要逻辑是如果path环境变量中包含mingw，则将其删除，逻辑多少有些随意，虽是微软官方出品的插件
10. 既然你代码把我的环境变量删除了，我也不想改你源码，于是就想办法怎么在把被删除的变量加上去
11. 去插件的github的issue上有关键字搜看有没有人和我遇到同样的问题，找了很多，虽然有，但里面没有解决方案
12. 最终搜索到的方法是，在Setting中设置`cmake.env`, Environment variables to set when running CMake commands. 设置成如下：`PATH : ${env:PATH};D:\program\opencv\build-mingw\install\x64\mingw\bin;D:\program\Qt\Qt5.12.12\5.12.12\mingw73_64\bin;`


