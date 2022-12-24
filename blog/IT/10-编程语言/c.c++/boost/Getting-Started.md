官网文档有详细的入门指引
boost包解压后的结构
```
boost_1_75_0/ .................The “boost root directory”
   index.htm .........A copy of www.boost.org starts here
   boost/ .........................All Boost Header files
    
   libs/ ............Tests, .cpps, docs, etc., by library
     index.html ........Library documentation starts here
     algorithm/
     any/
     array/
                     …more libraries…
   status/ .........................Boost-wide test suite
   tools/ ...........Utilities, e.g. Boost.Build, quickbook, bcp
   more/ ..........................Policy documents, etc.
   doc/ ...............A subset of all Boost library docs
```


使用有两种方式：
1.Header-Only Libraries，只需include头文件
这个需要把boost包中的boost目录复制到  /usr/include/boost，或者自己用`-I`指定包含目录
2.独立编译成lib库，并include相应头文件
需要把boost源码编译成静态库



























