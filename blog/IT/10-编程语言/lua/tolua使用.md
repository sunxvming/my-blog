## tolua vs tolua++
对比了一下tolua.h和tolua++.h后，tolua++.h中比tolua.h中多了几个关于tolua_tocppstring的方法。其他大部分的方法都是一样的。


## 目录说明
* lua-5.2.0
lua源码
* tolua-master
tolua源码
* toluatest
使用tolua编写的一个小例子


## linux下编译tolua
1. tolua依赖lua，所以先下载lua进行编译，然后把liblua.a和相应的头文件放到指定目录
2. 编译tolua，会编译两个东西，一个是libtolua.a的静态库。一个是tolua的可执行程序程序，负责把pkg转成c/c++，这个 c/c++ 源文件就是导出的可供 lua 调用的代码。


## 使用tolua

### 1. 头文件包含
lua的头文件
tolua的头文件

### 2. 库
lua的静态库liblua.a
tolua的静态库libtolua.a

### 3. 将`.pkg`文件导出生成`.cpp`文件
其中`.pkg`文件中的内容和要导出的cpp类的头文件中的内容基本一致
要注意的是要在文件头引入头文件，然后把 public 关键字去掉。
所有公有的函数或数据都可以导出，如果不想导出某个函数，则在package文件中不要定义就可以了。

### 4. 使用
cpp中将cpp对象注册到lua栈中，lua中调用cpp对象的方法
```
//cpp文件
int main (void)
{
    int  tolua_tfunction_open (lua_State*);
    lua_State* L = luaL_newstate();
    luaL_openlibs(L);
     // 此方法是pkg文件生成的cpp文件中的方法，作用是将cpp类的属性和方法导入到lua环境栈中
     // 见:tfunctionbind.cpp
    tolua_tfunction_open(L); 

    luaL_dofile(L,"tfunction.lua");

    lua_close(L);
    return 0;
}
```
```
//lua文件
local p = Point:new(1,2)
local x, y = p:get()
```


## 参考链接
- [tolua](https://github.com/LuaDist/tolua), by github








