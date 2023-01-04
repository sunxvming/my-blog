去官网下载lua的源码
1.VS新建一个工程，导入源码src文件夹下的所有代码
2.配置： 配置属性 --> 常规 --> 配置类型 --> 选择 “静态库（.lib）
配置lua源码的包含目录
生成lib库


写测试代码
```

#include <stdio.h>  
#include <stdlib.h>  
#include "lua.h"  
#include "lualib.h" 
#include "lauxlib.h"  
#include "luaconf.h"  


//链接是实在源代码目录搜索的，所以要在项目属性的vs++目录的库目录中加上lib的路径就行
#pragma comment(lib, "lua.lib")  
int main(int argc, char* argv[])  
{  
    lua_State* L = luaL_newstate();  
    luaL_openlibs(L);  
    luaL_dofile(L, "E:/project/luatest/test.lua");  
    lua_close(L);  
    system("pause");  
    return 0;  
}  
```




【Visual Studio添加lib到链接依赖项的几种方法 】
一、通过预编译指令，例如：
#pragma comment(lib, "user32.lib")
该指令將user32.lib库文件加入到链接依赖项中，链接是实在源代码目录搜索的，所以要在项目属性的vs++目录的库目录中加上lib的路径就行。
 
二、在项目上点击右键->【属性】->【配置属性】->【链接器】->【输入】->【附加依赖项】，点击编辑，添加相应库文件。

