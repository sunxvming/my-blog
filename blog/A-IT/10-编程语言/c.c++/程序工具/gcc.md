## toolchain

binutils 一组用于编译、链接、汇编和其它调试目的的程序

| 命令/工具 | 功能描述 |  |
| ---- | ---- | ---- |
| as | 汇编器 |  |
| ar t libxxx.a | 查看静态库中包含的目标文件 |  |
| ar x libxxx.a | 将.a文件解压 |  |
| ar cr libtinyxml.a tinystr.o tinyxml.o | 打包成静态库 |  |
| ranlib | 为静态库文件创建索引，它会在静态库文件中创建一个索引表，加快查找目标文件的速度，通常是在创建静态库时自动执行的，所以在绝大多数情况下你不需要手动运行它 |  |
| ld | 链接器 |  |
| nm | 可能是name mapping的缩写，查看可执行程序内部的符号，函数名等信息 |  |
| ldd | List Dynamic Dependencies |  |
| objcopy | 将原目标文件中的内容复制到新的目标文件中，可以通过不同的命令选项调整目标文件的格式，比如去除某些ELF文件头 |  |
| objdump | 用于生成反汇编文件，主要依赖objcopy实现 |  |
| readelf | 解读ELF文件 |  |
| file | 查看文件类型，架构，32位还是64位等信息 |  |

## gcc
使用gcc，程序员可以对编译过程有更多的控制。可以再编译的任何阶段结束后停止整个编译过程以检查编译器在该阶段输出的信息。

### gcc查看版本和支持的c++标准
gcc --version
gcc -std=c++20    若不支持c++20则会报不支持

### gcc常用选项

| 选项       | 功能描述                                       |
| ----------- | ----------------------------------------------- |
| --verbose   | 打印出编译连接时的详细信息                     |
| -E          | 预编译                                         |
| -c          | 只编译，不链接 gcc –o hello hello.o 链接目标文件 |
| -o filename | 输出文件名，如果没指定filename，默认为a.out      |
| -lstdc++    | 代表gcc要用标准的c++的库完成链接                |
| -g          | 包含调试信息                                   |
| -D          | 后面直接跟宏命(中间不加空格)，相当于定义这个宏，默认这个宏的内容是1   例如`-DLINUX` = `#define LINUX 1` |
| -L          | 指定其他库文件所在的目录名,即去哪里找so文件， 需要配合-l一起使用 |
| -l          | 链接库文件, 库文件一般放在/lib和/usr/lib和/usr/local/lib，库名字为libxxx.so。当目录下有同名的.a和.so文件时，会优先连接so文件 |
| -I          | 参数是用来指定头文件目录，/usr/include目录一般是不用指定的，gcc知道去那里找，但是如果头文件不在/usr/include里我们就要用-I参数指定了，比如头文件放在/myinclude目录里，那编译命令行就要加上-I/myinclude参数了 |
| -O          | 优化编译后的代码                                |
| -w          | 关闭所有告警信息                               |
| -Wall       | 开启所有告警信息                               |
| -Werror     | 所有告警当error来处理                          |
| -Wl         | 选项告诉编译器将后面的参数传递给链接器         |
| -M          | 生成.c文件与头文件依赖关系以用于Makefile，包括系统库的头文件 |
| -MM         | 生成.c文件与头文件依赖关系以用于Makefile，不包括系统库的头文件 |
| -fuse-ld=gold | 使用gold链接器而不是默认链接器                |
| -fuse-ld=lld | 使用LLVM lld链接器而不是默认链接器             |


gcc默认只链接c的标准库，并不链接c++标准库，需要添加-lstd++
```
$gcc –lstdc++ -o hello hello.cpp
```
对于C语言和C++语言，gcc编译完的**目标代码**是不同的，最大的区别是C++会修改编译后的变量以及函数各种标号的名称
g++是gcc的c++编译器，如果是编译c++的文件，建议使用g++


### 32or64位
GCC（GNU Compiler Collection）的默认行为取决于你**所使用的编译器版本以及你的操作系统**。通常情况下，如果你在一个64位操作系统上使用最新版本的GCC，它会默认编译为64位程序。如果你在一个32位操作系统上使用GCC，它会默认编译为32位程序。

然而，你可以通过命令行选项来显式指定编译为32位或64位程序。例如，要编译为64位程序，你可以使用 `-m64` 选项，而要编译为32位程序，你可以使用 `-m32` 选项。

### 链接时常见问题
1. 链接的库如存在符号的依赖的话，那么链接时指定库的顺序就很重要，**被依赖的库要放在后面**。
2. 静态库不同版本冲突的问题
碰到这样一个情况，链接时报lua里面的符号找不到。经过查找发现源码里引的头文件不是项目中的lua的头文件，而是系统中的lua的头文件。这两个版本不同，项目中的lua为5.4，系统中的为5.1。而链接的时候链接的为lua5.4的静态库，从而造成符号找不到的问题。
3. debug和release版本的库混合链接可能会导致崩溃


## make
make是一个构建工具，用于管理项目的编译和构建过程。

### make是怎么完成工作的呢？
三要素：target、dependency、command
makefile是一个文本形式的脚本文件，其中包含一些规则告诉make编译哪些文件，怎么样编译以及在什么条件下编译。
makefile规则遵循以下通用形式,且依赖是**递归结构**的
```
target:dependency [dependency[…]]
    command
    command
    […]
```
* 分析各个目标和依赖之间的关系
* 根据依赖关系**自底向上**执行命令
* 根据修改时间比目标新，确定更新
* 如果目标不依赖任何条件，则执行对应命令，以示更新

注意：每个command第一个字符必须是**tab**键，而不是空格键，不然make会报错并停止。


### Makefile结构说明
Makefile里主要包含了五个东西：变量定义、显式规则、隐晦规则、文件指示和注释。
1. 变量的定义。变量一般都是字符串，这个有点像C语言中的宏，当Makefile被执行时，其中的变量都会被扩展到相应的引用位置上。
2. 显式规则。说明如何生成一个或多的的目标文件。由书写者明显指出，要生成的文件，文件的依赖文件，生成的命令。
3. 隐晦规则。由于make有自动推导的功能，所以隐晦的规则可以让我们比较粗糙地简略地书写Makefile，这是由make所支持的。
4. 文件指示。一个是在一个Makefile中引用另一个Makefile，就像C语言中的include一样。
5. 注释。只有行注释，用“#”字符



### 最简单的makefile
```
start:
    gcc -o hello hello.c
```
### 稍微复杂的makefile
```
start:hello.o
        gcc -o hello hello.o
        @echo '---------------ok---------------'
hello.o:
        gcc -o hello.o -c hello.c
clean:
        rm -f hello.o
```
1. target start后面的hello.o代表其下的command依赖与hello.o这个target。所以make先执行了hello.o这个target下的command。
2. 输入make clean,make会直接执行clean其下的command。
3. 增加了@echo，显示编译成功语句，为了不将语句本身输出，所以前面加@符号。

### 使用变量
为了简化编辑和维护makefile，可以在makefile中使用变量。
varname=some_text
把变量用括号括起来，前面加`$`就可以引用该变量的值, `$(varname)`
按照惯例makefile的变量都是大写（只是习惯而已，不是必须的）。
```
CC=gcc
SRCS=hello.c
OBJS=hello.o
# OBJS=$(SRCS:.c=.o) 更简便的写法，意思是将SRCS变量中的.c替换为.o
EXEC=hello
start:hello.o
        $(CC) -o $(EXEC) $(OBJS)
        @echo '---------------ok---------------'
hello.o:
        $(CC) -o $(OBJS) -c $(SRCS)
clean:
        rm -f hello.o
```
### 隐晦规则
```
%.o : %.c
```
`%`通配符，当想生成x.o文件时发现与`%.o : %.c`匹配，则将%替换为x，也就是x.o : x.c，则会执行规则的命令。
表示make定义了一条规则，任何x.o文件都从 x.c编译而来

make定义了一些有用的**预定义变量**
`$@`  表示target，即目标文件
`$<`  表示dependency，即第一个依赖
完整例子：
```
CC=$(CROSS)clang $(TARGET_FLAGS) -lstdc++
AR=$(CROSS)ar -cr
SRCS=Circle.cpp Edge.cpp Math.cpp NavPath.cpp Path.cpp Point.cpp Polygon.cpp Triangle.cpp
OBJS=$(SRCS:.cpp=.o)
EXEC=libNavPath.a
start: $(OBJS)
    $(AR) $(EXEC) $(OBJS)
    @echo '----------------ok------------$(CC)'
%.o: %.cpp:
    $(CC) -Wall -g -o $@ -c $<
clean:
    rm -f $(OBJS)
    rm -f libNavPath.a
```
#### 规则中加匹配
```
$（C_OBJS）：$（OBJ_PATH）/%.o:%.c


$(C_OBJS) 中有很多文件，假设各种各样的都有 （实际中肯定是你自己定义的，不会乱七八糟）
看看这些文件里面，找出匹配符合 $（OBJ_PATH）/%.o的，其实就是过滤出满足$（OBJ_PATH）/%.o的。


一般来说
$（C_OBJS）：$（OBJ_PATH）/%.o:%.c
和规则
$（P_OouDIR）/%.o:%.c
是等价的
但是一般性而言，并不等价，比如$(C_OBJS)还定义了其它文件，比如 ./lib/xxx.o
静态模式规则的好处，是能精确定义，哪个文件，依赖哪个文件。规定了预选范围。
%.o:%.c 则是泛泛而谈，只要匹配就可以。
```


### 其他
#### foreach使用
```
$(foreach <var>,<list>,<text>)
```
这个函数的意思是，把参数`<list>`中的单词逐一取出放到参数`<var>`所指定的变量中，然后再执行`< text>`所包含的表达式。
每一次`<text>`会返回一个字符串，循环过程中，`<text>`的所返回的每个字符串会以空格分隔，最后当整个循环结束时，`<text>`所返回的每个字符串所组成的整个字符串（以空格分隔）将会是foreach函数的返回值。


所以，`<var>`最好是一个变量名，`<list>`可以是一个表达式，而`<text>`中一般会使用`<var>`这个参数来依次枚举`<list>`中的单词。举个例子：
```
    names := a b c d
    files := $(foreach n,$(names),$(n).o)
```
上面的例子中，`$(name)`中的单词会被挨个取出，并存到变量“n”中，`$(n).o`每次根据`$(n)`计算出一个值，这些值以空格分隔，最后作为foreach函数的返回，所以，`$(files)`的值是`a.o b.o c.o d.o`。


#### wildcard
在Makefile规则中，通配符会被自动展开。但在变量的定义和函数引用时，通配符将失效。这种情况下如果需要通配符有效，就需要使用函数“wildcard”，它的用法是：`$(wildcard PATTERN...)` 。在Makefile中，它被展开为已经存在的、使用空格分开的、匹配此模式的所有文件列表。
一般我们可以使用`$(wildcard *.c)`来获取工作目录下的所有的.c文件列表。复杂一些用法；可以使用`$(patsubst %.c,%.o,$(wildcard *.c))`，首先使用“wildcard”函数获取工作目录下的.c文件列表；之后将列表中所有文件名的后缀.c替换为.o。这样我们就可以得到在当前目录可生成的.o文件列表。因此在一个目录下可以使用如下内容的Makefile来将工作目录下的所有的.c文件进行编译并最后连接成为一个可执行文件：
```
objects := $(patsubst %.c,%.o,$(wildcard *.c))
foo : $(objects)
    cc -o foo $(objects)
```

#### 其他设置
set -x会在执行每一行 shell 脚本时，把执行的内容输出来。它可以让你看到当前执行的情况，里面涉及的变量也会被替换成实际的值。
set -e会在执行出错时结束程序，就像其他语言中的“抛出异常”一样。（准确说，不是所有出错的时候都会结束程序，见下面的注）


 

### make clean
* 用途：清除编译生成的中间.o文件和最终目标文件
* make clean 如果当前目录下有同名clean文件，则不执行clean对应的命令
* 伪目标声明：.PHONY:clean
* clean命令中的特殊符号
    - “-”此条命令出错，make也会继续执行后续的命令。如：“-rm main.o”
    - “@”不显示命令本身，只显示结果。如：“@echo”clean done“”

### 常见的make出错信息
* No rule to make target ‘target’.Stop
makefile中没有包含创建指定target所需要的规则，而且也没有默认规则可用。
* ‘target’ is up to date
指定的target相关文件没有变化。
* command：Command not found
make找不到命令，通常是因为命令被拼写错误或者不在$PATH路径下。
* `makefile:2: *** missing separator. Stop. make`
makefile的缩进是用的tab，而不是空格


### 常用编译方式
在一些开源项目中，会使用 autogen.sh+configure+make 方式进行代码编译。
1. 运行 autogen.sh，生成 configure 脚本；
2. 运行 configure 脚本，检查系统配置；
3. 运行 make 命令，执行代码的编译操作；
4. 运行 make install 命令，安装编译生成的文件。



## makefile例子
```
TARGET = main
OBJ_PATH = objs
PREFIX_BIN =


CC = gcc
CPP = g++ -std=c++17
INCLUDES += -I./ -I../include
LIBS = /usr/lib64/libpthread.so  /usr/lib64/librt.so

G = -g
CFLAGS :=-Wall  -Wno-unknown-pragmas $(G) 
LINKFLAGS = -ldl 


SRCDIR =. ./include 

C_SRCDIR = $(SRCDIR)
C_SOURCES = $(foreach d,$(C_SRCDIR),$(wildcard $(d)/*.c) )
C_OBJS = $(patsubst %.c, $(OBJ_PATH)/%.o, $(C_SOURCES))
C_DEPEND = $(patsubst %.c, $(OBJ_PATH)/%.d, $(C_SOURCES))


CC_SRCDIR = $(SRCDIR)
CC_SOURCES = $(foreach d,$(CC_SRCDIR),$(wildcard $(d)/*.cc) )
CC_OBJS = $(patsubst %.cc, $(OBJ_PATH)/%.o, $(CC_SOURCES))
CC_DEPEND = $(patsubst %.cc, $(OBJ_PATH)/%.d, $(CC_SOURCES))


CPP_SRCDIR = $(SRCDIR)
CPP_SOURCES = $(foreach d,$(CPP_SRCDIR),$(wildcard $(d)/*.cpp) )
CPP_OBJS = $(patsubst %.cpp, $(OBJ_PATH)/%.o, $(CPP_SOURCES))
CPP_DEPEND = $(patsubst %.cpp, $(OBJ_PATH)/%.d, $(CPP_SOURCES))


default: init compile 



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
    @echo "C_OBJS: $(C_OBJS)"
    @echo "CPP_SOURCES: $(CPP_SOURCES)"
    @echo "CPP_OBJS: $(CPP_OBJS)"
    @echo "CC_SOURCES: $(CC_SOURCES)"
    @echo "CC_OBJS: $(CC_OBJS)"

compile:$(C_OBJS) $(CC_OBJS) $(CPP_OBJS)
    $(CPP)  $^ -o $(TARGET)  $(LINKFLAGS) $(LIBS)

clean:
    rm -rf $(OBJ_PATH)
    rm -rf $(TARGET)
    
cleand:
    find ./objs -name *.d | xargs rm -rf


install: $(TARGET)
    cp $(TARGET) $(PREFIX_BIN)

uninstall:
    rm -f $(PREFIX_BIN)/$(TARGET)

# include $(CPP_DEPEND)的作用是生成.d文件，init是先生成objs目录和源文件的子目录
ifeq ($(MAKECMDGOALS),)  # 如果目标为空
include $(CPP_DEPEND) init
endif

# $* 不带后缀的target
# $< target
# $@ depend
# $$xx  变量要用两个$$表示
# $$$$  进程号
# sed中的变量用 '"包围， 's,\('"$$BASESRC"'\)\.o[ :]*,\objs\/$*.o $@ : ,g'
#
# 以下为作用为生成.d文件，
# .d文件就是声明引用的头文件的依赖关系的，文件内容类似于如下
# objs/./example.o objs/./example.d : example.cpp ThreadPool.h
$(CPP_DEPEND):$(OBJ_PATH)/%.d:%.cpp
    BASESRC=`basename $*`;\
    set -e; rm -f $@; \
    $(CPP) $(INCLUDES) -MM $(CPPFLAGS) $< > $@.$$$$; \
    sed 's,\('"$$BASESRC"'\)\.o[ :]*,\objs\/$*.o $@ : ,g' < $@.$$$$ > $@; \
    rm -f $@.$$$$

```