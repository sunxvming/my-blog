
## vscode的cmake插件使用
cmake插件是微软官方出品，使用很方便。需要大致三个步骤：
1. 选择kits(编译套件)，比如是vs的还是mingw的
2. 生成对应平台的构建工程并编译，比如是vs的工程还是make的工程
3. build(f7)    Debug(ctrl+f5)   run without debugging(shift+f5) 

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


## cmake编译时传递参数

在vscode的`settings.json`中添加如下配置：
```json
"cmake.configureSettings": {
	"CMAKE_BUILD_TYPE": "${buildType}"
 }    
```
可以添加到项目里面的`.vscode/settings.json`中， 也可以添加到自己的配置中。
上面的是cmake插件的配置，通过它可以向cmake命令传递类似如下的参数：
```
cmake.EXE -DCMAKE_BUILD_TYPE:STRING=Debug 
```