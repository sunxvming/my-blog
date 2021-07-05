mysql++ API 是一组访问MySQL的C++ API封装。主要目的在于把各种Query的操作和STL容器更好的结合。
## 下载
google搜索mysql++找到其官网，从官网找到linux的源码，然后下载。
## 编译mysql++
阅读源码的readme文件，查看 依赖那些库， 如何编译等。
MySQL++ is built on top of the MySQL C API library, so it needs the  C API development files to build against.
```
yum install mysql-devel
```
## 测试运行
写一个简单的文件连接查询的文件


## 工具
yum install mysql   这个可以下载mysql的命令行连接工具，用这个可以测试数据库是否正常开启，是否能连接 


## 遇到问题
### 1.跨机器连接不上
其实就是如何远程访问的问题，给个权限就行。


### 2.动态库找不到
error while loading shared libraries: libmysqlpp.so.3: cannot open shared object file: No such file or directory
1) 如果共享库文件安装到了/lib或/usr/lib目录下, 那么需执行一下ldconfig命令
ldconfig命令的用途, 主要是在默认搜寻目录(/lib和/usr/lib)以及动态库配置文件/etc/ld.so.conf内所列的目录下, 搜索出可共享的动态链接库(格式如lib*.so*), 进而创建出动态装入程序(ld.so)所需的连接和缓存文件. 缓存文件默认为/etc/ld.so.cache, 此文件保存已排好序的动态链接库名字列表.


2) 如果共享库文件安装到了/usr/local/lib(很多开源的共享库都会安装到该目录下)或其它"非/lib或/usr/lib"目录下, 那么在执行ldconfig命令前, 还要把新共享库目录加入到共享库配置文件/etc/ld.so.conf中, 如下:
```
# cat /etc/ld.so.conf
include ld.so.conf.d/*.conf
# echo "/usr/local/lib" >> /etc/ld.so.conf  
# ldconfig
```
3) 如果共享库文件安装到了其它"非/lib或/usr/lib" 目录下,  但是又不想在/etc/ld.so.conf中加路径(或者是没有权限加路径). 那可以export一个全局变量LD_LIBRARY_PATH, 然后运行程序的时候就会去这个目录中找共享库.
LD_LIBRARY_PATH的意思是告诉loader在哪些目录中可以找到共享库. 可以设置多个搜索目录, 这些目录之间用冒号分隔开. 比如安装了一个mysql到/usr/local/mysql目录下, 其中有一大堆库文件在/usr/local/mysql/lib下面, 则可以在.bashrc或.bash_profile或shell里加入以下语句即可:
```
export LD_LIBRARY_PATH=/usr/local/mysql/lib:$LD_LIBRARY_PATH   
```
一般来讲这只是一种临时的解决方案, 在没有权限或临时需要的时候使用.


## 代码
```
#include <mysql++.h>


using namespace std;
using namespace mysqlpp;


#define DATEBASE_NAME "test1"
#define DATEBASE_IP "192.168.1.19:3306"
#define DATEBASE_USERNAME "root"
#define DATEBASE_PWD "123456"


using namespace std;
using namespace mysqlpp;
 
int main() {
    try {
        Connection conn(false);
        conn.connect(DATEBASE_NAME, DATEBASE_IP, DATEBASE_USERNAME, DATEBASE_PWD);
        Query query = conn.query();
 
        /* To insert stuff with escaping */
        
        //INSERT INTO people (id, name) VALUES (5, 'ddd');
        
        query << "INSERT INTO people " <<
                     "VALUES (7, 'eeeeeeee');";
        query.execute();
        /* That's it for INSERT */
 
        /* Now SELECT */
        query << "SELECT * FROM people LIMIT 10";
        StoreQueryResult ares = query.store();
        for (size_t i = 0; i < ares.num_rows(); i++)
           cout << "Name: " << ares[i]["name"] << " - id: " << ares[i]["id"] << endl;
 
        /* Let's get a count of something */
        query << "SELECT COUNT(*) AS row_count FROM people";
        StoreQueryResult bres = query.store();
        cout << "Total rows: " << bres[0]["row_count"];
 
    } catch (BadQuery er) { // handle any connection or
        // query errors that may come up
        cerr << "Error: " << er.what() << endl;
        return -1;
    } catch (const BadConversion& er) {
        // Handle bad conversions
        cerr << "Conversion error: " << er.what() << endl <<
                "\tretrieved data size: " << er.retrieved <<
                ", actual size: " << er.actual_size << endl;
        return -1;
    } catch (const Exception& er) {
        // Catch-all for any other MySQL++ exceptions
        cerr << "Error: " << er.what() << endl;
        return -1;
    }
 
    return (EXIT_SUCCESS);
}
```


```
TARGET = main
OBJ_PATH = objs


CC = gcc
CPP = g++ -std=c++11
INCLUDES += -I/usr/include/mysql -I/usr/local/mysql/include/mysql++
LIBS = /usr/lib64/libpthread.so  /usr/lib64/librt.so  /usr/local/lib/libmysqlpp.so.3
GFLAGS = -g
CFLAGS :=-Wall  $(GFLAGS)
LINKFLAGS = -ldl


SRCDIR =. 




C_SRCDIR = $(SRCDIR)
C_SOURCES = $(foreach d,$(C_SRCDIR),$(wildcard $(d)/*.c) )
C_OBJS = $(patsubst %.c, $(OBJ_PATH)/%.o, $(C_SOURCES))


CC_SRCDIR = $(SRCDIR)
CC_SOURCES = $(foreach d,$(CC_SRCDIR),$(wildcard $(d)/*.cc) )
CC_OBJS = $(patsubst %.cc, $(OBJ_PATH)/%.o, $(CC_SOURCES))


#CPP_SOURCES = $(wildcard *.cpp)
CPP_SRCDIR = $(SRCDIR)
CPP_SOURCES = $(foreach d,$(CPP_SRCDIR),$(wildcard $(d)/*.cpp) )
CPP_OBJS = $(patsubst %.cpp, $(OBJ_PATH)/%.o, $(CPP_SOURCES))


default:init compile


$(C_OBJS):$(OBJ_PATH)/%.o:%.c
    $(CC) -c $(CFLAGS) $(INCLUDES) $< -o $@


$(CC_OBJS):$(OBJ_PATH)/%.o:%.cc
    $(CPP) -c $(CFLAGS) $(INCLUDES) $< -o $@


$(CPP_OBJS):$(OBJ_PATH)/%.o:%.cpp
    $(CPP) -c $(CFLAGS) $(INCLUDES) $< -o $@


init:
    $(foreach d,$(SRCDIR), mkdir -p $(OBJ_PATH)/$(d);)


test:
    @echo "C_SOURCES: $(C_SOURCES)"
    @echo "CC_SOURCES: $(CC_SOURCES)"
    @echo "CPP_SOURCES: $(CPP_SOURCES)"
    @echo "C_OBJS: $(C_OBJS)"
    @echo "CC_OBJS: $(CC_OBJS)"
    @echo "CPP_OBJS: $(CPP_OBJS)"




compile:$(C_OBJS) $(CC_OBJS) $(CPP_OBJS)
    $(CPP)  $^ -o $(TARGET)  $(LINKFLAGS) $(LIBS)


clean:
    rm -rf $(OBJ_PATH)
    rm -rf $(TARGET)


```

