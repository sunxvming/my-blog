## 一、gcov简介
### gcov是什么

* gcov是一个测试代码覆盖率的工具。与GCC一起使用来分析程序，以帮助创建更高效、更快的运行代码，并发现程序的未测试部分
* 是一个命令行方式的控制台程序。需要结合`lcov`,`gcovr`,`genhtml`等前端图形工具才能实现统计数据图形化
* 伴随GCC发布，不需要单独下载gcov工具。配合GCC共同实现对c/c++文件的语句覆盖和分支覆盖测试
* 与程序概要分析工具（`profiling tool`，例如`gprof`）一起工作，可以估计程序中哪段代码最耗时


### gcov能做什么
使用像gcov或gprof这样的分析器，您可以找到一些基本的性能统计数据：
* 每一行代码执行的频率是多少
* 实际执行了哪些行代码，配合测试用例达到满意的覆盖率和预期工作   
* 每段代码使用了多少计算时间，从而找到热点优化代码   
* gcov创建一个`sourcefile.gcov`的日志文件，此文件标识源文件`sourcefile.c`每一行执行的次数,您可以与`gprof`一起使用这些日志文件来帮助优化程序的性能。`gprof`提供了您可以使用的时间信息以及从gcov获得的信息。


## 二、gcov过程概况
![](https://sunxvming.com/imgs/1f4e51ca-1e99-4ace-a1db-829636d1dd44.png)
### 主要工作流
* 1) 编译前，在编译器中加入编译器参数`-fprofile-arcs -ftest-coverage`；
* 2) 源码经过编译预处理，然后编译成汇编文件，在生成汇编文件的同时完成插桩。插桩是在生成汇编文件的阶段完成的，因此插桩是汇编时候的插桩，每个桩点插入3~4条汇编语句，直接插入生成的*.s文件中，最后汇编文件汇编生成目标文件，生成可执行文件；并且生成关联BB和ARC的.gcno文件；
* 3) 执行可执行文件，在运行过程中之前插入桩点负责收集程序的执行信息。所谓桩点，其实就是一个变量，内存中的一个格子，对应的代码执行一次，则其值增加一次；
* 4) 生成.gcda文件，其中有BB和ARC的执行统计次数等，由此经过加工可得到覆盖率。



## 三、使用gcov
* 编译后会在存在目标文件的目录生成 *.gcno。
* 执行程序后，可以看到数据文件*.gcda生成。
* 执行 gcov  *.cpp.gcno 就生成 *.cpp.gcov 测试结果。如果没有运行可执行程序，则运行时的覆盖率为0。
* 其中`.gcno` `.gcda`为二进制文件
`.gcov`为覆盖率的文本文件


左图是没有运行可执行文件的gcov文件，右图是运行了可执行文件的gcov文件
* 其中`#####`表示未运行的行 
* 每行前面的数字表示行运行的次数
![](https://sunxvming.com/imgs/9da05fe4-8822-4bc5-944a-4d33c649a53b.png)




## 四、gcov文件可视化
上述生成的`.gcov`文件可视化成都较低，需要借助`lcov`，`genhtml`工具直接生成html报告。

以下命令执行目录在生成的.o目标文件目录中，执行流程如下：

**1.归零所有执行过的产生覆盖率信息的统计文件,即删除所有.gcda文件**
```
lcov -d ./ -z
```

**2.初始化并创建基准数据文件**
```
# -c 捕获，-i初始化，-d应用目录，-o输出文件
lcov -c -i -d ./ -o init.info
```

**3.执行编译后的测试程序，生成.gcda文件**

**4.收集测试文件运行后产生的覆盖率文件**
```
lcov -c -d ./ -o cover.info
```

**5.合并基准数据和执行测试文件后生成的覆盖率数据**
```
# -a 合并文件
lcov -a init.info -a cover.info -o total.info
```

**6.过滤不需要关注的源文件路径和信息**
```
# --remove 删除统计信息中如下的代码或文件，支持正则
lcov --remove total.info '*/usr/include/*' '*/usr/lib/*' '*/usr/lib64/*' '*/usr/local/include/*' '*/usr/local/lib/*' '*/usr/local/lib64/*' '*/third/*'  -o final.info
```

**7.通过final.info生成html文件**
```
#如果是git目录，可以获取此次版本的commitID，如果不是，忽略此步
# commitId=$(git log | head -n1 | awk '{print $2}')
# 这里可以带上项目名称和提交ID，如果没有，忽略此步
#genhtml -o cover_report --legend --title "${project_name} commit SHA1:${commitId}" --prefix=${curr_path} final.info
# -o 生成的html及相关文件的目录名称，--legend 简单的统计信息说明
# --title 项目名称，--prefix 将要生成的html文件的路径 
genhtml -o cover_report --legend --title "lcov"  --prefix=./ final.info
```

**8.查看覆盖率报告**
最终生成的可视化文件在cover_report中，用浏览器打开如下：

覆盖率报告是按目录就行组织的，左侧的路径可以点开，详细看每个文件哪些行被覆盖到了，下面这张图是总的概览
![](https://sunxvming.com/imgs/7cd7909b-d44f-42ff-86f2-56e7dfb1944c.png)

下图是各个文件的列表
![](https://sunxvming.com/imgs/614fd721-9304-43e1-bff4-04e550787526.png)

下图为具体文件的覆盖率报告
![](https://sunxvming.com/imgs/50653059-6148-43a9-92d5-eee19ececfa2.png)

**lcov常用的参数**
```
-d 项目路径，即.gcda .gcno所在的路径
-a 合并（归并）多个lcov生成的info文件
-c 捕获，也即收集代码运行后所产生的统计计数信息
--external 捕获其它目录产生的统计计数文件
-i/--initial 初始化所有的覆盖率信息，作为基准数据
-o 生成处理后的文件
-r/--remove 移除不需要关注的覆盖率信息文件
-z 重置所有执行程序所产生的统计信息为0
```

## 参考链接
- [gcov代码覆盖率测试-原理和实践总结](https://blog.csdn.net/yanxiangyfg/article/details/80989680)
- [关于代码覆盖lcov的使用](https://www.jianshu.com/p/a42bbd9de1b7)