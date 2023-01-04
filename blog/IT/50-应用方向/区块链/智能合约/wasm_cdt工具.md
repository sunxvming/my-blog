为了编写自己的wasm智能合约的工具，于是参考了维基链的wasm_cdt，而维基链的代码是参考eos的。


## github源码地址
https://github.com/WaykiChain/wicc-wasm-cdt


## 一、目录结构
* libraries 合约引用的库的头文件、源文件
* examples  合约示例
* modules   和cmake相关的编译工具文件
* tools    wasm编译工具文件
* wasm_llvm   llvm的工程
* wasm_llvm/lib/Target/WebAssembly  wasm的编译器前后端


  


## 二、编译安装
注意事项：
* 1.配置最低4核8G
* 2.若是虚拟机的话不要共享目录中安装
* 3.不要用自带的`build.sh`来安装，因为`build.sh`会检查机器的硬件和软件环境，不符合的话会报错
可以直接用cmake直接安装
```
mkdir build
cmake ..
make
make install
```




编译好之后需要进行安装，安装的路径为`/usr/local/wasm.cdt`
内容包括：
```
1.头文件  /usr/local/wasm.cdt/include 
2.静态库 /usr/local/wasm.cdt/lib 
3.二进制程序 /usr/local/wasm.cdt/lib  
4.cmake编译时用到的文件 /usr/local/lib/cmake/wasm.cdt 
```


### 安装遇到问题


#### 代码分支：
master的最新代码


#### 编译失败位置：
CMakeLists.txt中的`include(modules/LibrariesExternalProject.txt)`
编译的内容为`libraries`目录下的内容，包括boost、libc、libc++、wasmlib
```
Scanning dependencies of target WasmLibraries
[ 70%] Creating directories for 'WasmLibraries'
[ 74%] No download step for 'WasmLibraries'
[ 77%] No patch step for 'WasmLibraries'
[ 81%] No update step for 'WasmLibraries'
[ 85%] Performing configure step for 'WasmLibraries'
```




#### 失败可能的原因：
编译`libraries`中的文件需要wasm编译工具链:wasm-cc wasm-cpp wasm-ld等，
但是cmake并没有找到工具链的位置，而是用gcc的工具链去编，导致编译无法进行


#### 解决：
把wasm.cdt的代码版本切换到v1.0的稳定版本后编译通过




## 三、编译合约文件
可以参考eos官方文档
https://developers.eos.io/manuals/eosio.cdt/latest/how-to-guides/compile/compile-a-contract-via-cli


### 编译方式
#### 1.用wasm-cc、wasm-cpp工具链直接编
```
wasm-cpp -abigen ../src/hello.cpp -o hello.wasm -I ../include/
```


#### 2.用cmake编译
```
$ cd examples/hello
$ mkdir build
$ cd build
$ cmake ..
$ make
```






### 编译合约遇到的问题


```
CMake Warning at CMakeLists.txt:4 (find_package):
  By not providing "Findeosio.cdt.cmake" in CMAKE_MODULE_PATH this project
  has asked CMake to find a package configuration file provided by
  "wasm.cdt", but CMake did not find one.


  Could not find a package configuration file provided by "wasm.cdt" with
  any of the following names:


    wasm.cdtConfig.cmake
    wasm.cdt-config.cmake


  Add the installation prefix of "wasm.cdt" to CMAKE_PREFIX_PATH or set
  "wasm.cdt_DIR" to a directory containing one of the above files.  If
  "wasm.cdt" provides a separate development package or SDK, be sure it has
  been installed.
```


#### 根目录下的cmake文件
```
project(hello)
cmake_minimum_required(VERSION 3.5)


include(ExternalProject)
# if no cdt root is given use default path
if(WASM_CDT_ROOT STREQUAL "" OR NOT WASM_CDT_ROOT)
   find_package(wasm.cdt)
endif()


ExternalProject_Add(
   hello_project
   SOURCE_DIR ${CMAKE_SOURCE_DIR}/src
   BINARY_DIR ${CMAKE_BINARY_DIR}/hello
   CMAKE_ARGS -DCMAKE_TOOLCHAIN_FILE=${WASM_CDT_ROOT}/lib/cmake/wasm.cdt/WasmWasmToolchain.cmake
   UPDATE_COMMAND ""
   PATCH_COMMAND ""
   TEST_COMMAND ""
   INSTALL_COMMAND ""
   BUILD_ALWAYS 1
)
```


#### src目录下的cmake文件
```
project(hello)
cmake_minimum_required(VERSION 3.5)


set(WASM_WASM_OLD_BEHAVIOR "Off")
find_package(wasm.cdt)


add_contract( hello hello hello.cpp )
target_include_directories( hello PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( hello ${CMAKE_SOURCE_DIR}/../ricardian )
```


#### 问题：
根目录下的find_package可以找到，src目录下的find_package确找不到包


#### 解决：
在src目录中的cmake文件增加如下代码，让find_package可以找到wasm.cdt的cmake配置的路径
```
set(wasm.cdt_DIR /usr/local/lib/cmake/wasm.cdt)
```

