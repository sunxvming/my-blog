
## 问题表现


通过cmake编译的代码，在代码中输出**FILE**就代码文件的绝对路径。在大多数使用**FILE**这宏的，一般都是用于日志输出，首先使用绝对路径会使日志量膨胀，其次我们最终的程序执行的环境，可能与编译的环境不一样，输出绝对路径并没有多大的参考意义


```
//tests/test.cc
#include <iostream>


int main(int argc, char** argv) {
    std::cout << "hello __FILE__=" << __FILE__ << std::endl;
    return0;
}


//输出：hello __FILE__=/home/sylar/test/cmake_test/tests/test.cc
```






```
#一个最简单的CMakeLists.txt


cmake_minimum_required (VERSION 2.8)   #要求最低cmake版本


project(sylar)                         #定义项目名称


add_executable(test tests/test.cc)     #添加一个可执行文件的生成
```






## 解决思路


既然**FILE**宏是gcc定义的，默认等于gcc命令中的文件路径，我们可以通过重新定义该宏来达到我们的目的，如下方式：


```
g++ tests/test.cc -D__FILE__="\"sylar/test.cc\"" -o test


//输出：hello __FILE__=sylar/test.cc
```






为了让输出更有区分度，我在这里强行改成sylar/test.cc， 在程序执行的时候，输出了我们预期的结果，说明这种做法是可行的


## 在cmake中优雅的解决


如果需要在每个源文件的编译上面都带上对应的定义(-D__FILE__=”\”sylar/test.cc\””),那么CMakeLists.txt里面就比较混乱了。我们可以把这种定义，封装到一个cmake函数里面，当需要使用这个功能的时候，就执行一下这个函数，这样就可以优雅的解决**FILE**绝对路径的问题，将绝对路径变成相对路径


```
# utils.cmake


#重新定义当前目标的源文件的__FILE__宏
function(redefine_file_macro targetname)
    #获取当前目标的所有源文件
    get_target_property(source_files "${targetname}" SOURCES)
    #遍历源文件
    foreach(sourcefile ${source_files})
        #获取当前源文件的编译参数
        get_property(defs SOURCE "${sourcefile}"
            PROPERTY COMPILE_DEFINITIONS)
        #获取当前文件的绝对路径
        get_filename_component(filepath "${sourcefile}" ABSOLUTE)
        #将绝对路径中的项目路径替换成空,得到源文件相对于项目路径的相对路径
        string(REPLACE ${PROJECT_SOURCE_DIR}/ "" relpath ${filepath})
        #将我们要加的编译参数(__FILE__定义)添加到原来的编译参数里面
        list(APPEND defs "__FILE__=\"${relpath}\"")
        #重新设置源文件的编译参数
        set_property(
            SOURCE "${sourcefile}"
            PROPERTY COMPILE_DEFINITIONS ${defs}
            )
    endforeach()
endfunction()
```



我们将上面的代码，写入到utils.cmake文件里面，然后去修改我们的CMakeLists.txt，让我们的代码支持**FILE**输出相对路径


```
cmake_minimum_required (VERSION 2.8)


project(sylar)


include (utils.cmake)


add_definitions(-Wno-builtin-macro-redefined)


add_executable(test tests/test.cc)
redefine_file_macro(test)
```




redefine_file_macro(test), 为我们的输出目标添加__FILE__宏重定义功能  
当我们冲定义了`__FILE__`宏，编译器会告警 
```
“:0:0: warning: “FILE” redefined [-Wbuiltin-macro-redefined]”, 为了解决这个告警，我们需要在CMakeLists.txt里面加上add_definitions(-Wno-builtin-macro-redefined)
```

## 重新编译


最终输出：`hello __FILE__=tests/test.cc`



## 参考链接
- [CMAKE系列 – 解决__FILE__ 宏绝对路径的问题(相对路径)](http://www.sylar.top/blog/?p=129)

