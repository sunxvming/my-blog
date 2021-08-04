boost test库用于`单元测试`、`命令行`测试组件，全称Unit Test Framework(UTF)，优点很多，可以胜任不同强度的测试功能


## 基本概念
1.  一个测试模块大致分为四部：**测试安装**、**测试主体**、**测试清理**、**测试运行器**
2.  **测试主体**是实际运行部分，通常包含多个**测试套件**，而测试套件又由多个**测试用例**组成
3.  **测试套件**，**测试用例**组合成**测试树**，根节点称为**主测试套件**。进而可以理解以**主测试套件**为根节点，**测试套件**为非叶子节点，**测试用例**为叶子节点**整个主体**。


注意事项：
- **主测试套件**必须要有，用`BOOST_TEST_MAIN`或者`BOOST_TEST_MODULE`，而且必须位于头文件`#include <boost/test/unit_test.hpp>`之前！！！


### 测试用例 BOOST_AUTO_TEST_CASE
测试用例作为**最小单元**，各个测试用例之间是无关的，发生错误对其他测试用例没有影响，其内部可以包含多个测试断言函数
```
BOOST_AUTO_TEST_CASE(test_name)
```
注意:
- 测试用例**以t开头**


### 测试套件 BOOST_AUTO_TEST_SUITE
**测试套件包含一个或多个测试用例**
```
BOOST_AUTO_TEST_SUITE( suite_name)    // 开始
BOOST_AUTO_TEST_SUITE_END()            // 结束
```
注意：
- 上面两句必须成对出现，加在之间的属于该测试套件
- 测试套件**以s开头**


## 一个测试的例子
下面用一个Boost的智能指针作为案例，并且预设一个错误，
这个案例，**有一个测试套件，且该测试套件有2个测试用例，当然根节点必须在开头**


**如何编译运行？**
1.  显然下面没有main函数，直接编译链接肯定会出错
2.  test库必须依赖两个动态库，分别是`boost_unit_test_framework`和`boost_test_exec_monitor`
3.  使用test库需要提前编译安装好boost库！！！


**编译命令**
```
g++ -o xxx xxx.cpp -std=c++11 -lboost_unit_test_framework -lboost_test_exec_monitor
```

- boost_unit_test_framework : 表示测试框架库，包含所有的测试宏
- boost_test_exec_monitor : 测试文件中不需要main，因此要专门链接进执行监视库，这个库是静态库。

**-l链接时，优先考虑动态库，找不到会链接同名的静态库，若还没有，ERROR**


```
#define BOOST_TEST_MAIN                 // 必须定义主测试套件，必须位于头文件之前
#include <boost/test/unit_test.hpp>     // test的头文件
#include <boost/smart_ptr.hpp>


// 测试套件的开始
BOOST_AUTO_TEST_SUITE(s_smart_ptr)


// 测试用例1
BOOST_AUTO_TEST_CASE(t_scoped_ptr)      // 测试用例1 t_scoped_ptr
{
    boost::scoped_ptr<int> p(new int(874));
    BOOST_CHECK(p);
    BOOST_CHECK_EQUAL(*p, 874);
}


// 测试用例2
BOOST_AUTO_TEST_CASE(t_shared_ptr)      // 测试用例2 t_shared_ptr
{
    boost::shared_ptr<int> p(new int(100));


    BOOST_CHECK(p);
    BOOST_CHECK_EQUAL(*p, 100);
    BOOST_CHECK_EQUAL(p.use_count(), 1);


    boost::shared_ptr<int> p2 = p;
    BOOST_CHECK_EQUAL(p2, p);
    BOOST_CHECK_EQUAL(p.use_count(), 3);    // 预设一个错误
}


BOOST_AUTO_TEST_SUITE_END()
```

Output
```
Running 2 test cases...
/home/topeet/myBoost/chap6_assert/_6_4.cpp(27): error: in "s_smart_ptr/t_shared_ptr": check p.use_count() == 3 has failed [2 != 3]


*** 1 failure is detected in the test module "Master Test Suite"
```
注意：我们从结果可以知道，错误数量，位置，错误原因。


## 断言
BOOST_CHECK(predicate)：断言测试通过，如不通过不影响程序执行
BOOST_REQUIRE(predicate):要求测试必须通过，否则程序停止执行；
BOOST_ERROR(message)：给出一个错误信息，程序继续执行；
BOOST_FAIL(message)：给出一个错误信息，程序终止。

## 测试安装、测试清理
测试安装、测试清理可以类比类的构造函数、析构函数
1.  测试安装：初始化测试用例或者测试套件所需的数据
2.  测试清理：执行必要的清理工作


因此，我们很容易想到类，很符合此时的需求 ，但是这里需要主要下面的事项
1. 使用struct即可，不能用final修饰
2. 又称为**测试夹具类**，类比夹子的两边
3. 对于测试套件和测试用例，这里有两个宏

```
BOOST_FIXTURE_TEST_SUITE( suite_name, 测试夹具类)    // 测试套件
BOOST_FIXTURE_TEST_CASE( test_name, 测试夹具类)      // 测试案例
```

联想上面的**根节点**，这里也存在一个**全局测试夹具**，测试所有的套件，包括**主测试套件**

```
BOOST_TEST_GLOBAL_FIXTURE(测试夹具类)    //全局测试夹具
```

```
#define BOOST_TEST_MAIN                 // 必须定义主测试套件，必须位于头文件之前
#include <boost/test/unit_test.hpp>
#include <boost/assign.hpp>
#include <vector>


struct global_fixture
{
    global_fixture() { std::cout << "global setup\n"; }
    ~global_fixture() { std::cout << "global teardown\n"; }
};
BOOST_TEST_GLOBAL_FIXTURE(global_fixture);      // 全局测试夹具


struct assign_fixture
{
    assign_fixture() { std::cout << "suit setup\n"; }
    ~assign_fixture() { std::cout << "suit teardown\n"; }


    std::vector<int> v;
};
BOOST_FIXTURE_TEST_SUITE(s_assign, assign_fixture)  // 测试套件的夹具


BOOST_AUTO_TEST_CASE(t_assign1)
{
    using namespace boost::assign;
    v += 1, 2, 3, 4;
    BOOST_CHECK_EQUAL(v.size(), 4);
    BOOST_CHECK_EQUAL(v[2], 3);
}


BOOST_AUTO_TEST_CASE(t_assign2)
{
    boost::assign::push_back(v)(10)(20)(30);
    BOOST_CHECK_EQUAL(v.size(), 3);
    BOOST_CHECK_EQUAL(v[2], 300);    // 预设错误
}


BOOST_AUTO_TEST_SUITE_END()
```

输出：
两个测试用例，**全局测试夹具**已经生效位于开始和结尾处；**测试套件夹具**应用在每个**测试用例**上；其中第二个**测试用例**失败，并报告具体错误信息

```
Running 2 test cases...
global setup
suit setup
suit teardown
suit setup
/home/topeet/myBoost/chap6_assert/_6_4_4.cpp(36): error: in "s_assign/t_assign2": check v[2] == 300 has failed [30 != 300]
suit teardown
global teardown


*** 1 failure is detected in the test module "Master Test Suite"
```
上面，通过案例分析了如何使用boost库的test库，包含**测试安装**、**测试主体–测试套件/测试用例**、**测试清理**


## 命令行–运行参数

对生成的二进制文件，直接查看帮助，获得帮助
```
./xxx --help
```

下面是几个参数的解释
```
run_test          指定需要运行的套件或者用例
build_info        输出编译器、系统等信息
output_format     输出格式，如HRF/XML
list_content      里出所有的测试套件和测试用例，不执行
show_progress     取值yes/no，显示完成的测试用例、总测试用例
```


对上面的案例，可以取如下运行参数


```prism
./xxx --build_info=yes --run_test=s_assign --output_format=HRF
```

输出：
```
Compiler: GNU C++ version 7.5.0
STL     : GNU libstdc++ version 20191114
Boost   : 1.74.0
global setup
suit setup
suit teardown
suit setup
suit teardown
```



## 如何忽略测试失败？

test库提供 `BOOST_AUTO_TEST_CASE_EXPECTED_FAILURES`来**忽略错误的最多次数**

```
// 忽略n个错误
BOOST_AUTO_TEST_CASE_EXPECTED_FAILURES( test_name, n)
```

对于上面的代码，去掉对应的注释，输出结果如下
**没有检测到错误，但是任然有错误信息，因为我们忽略了哈**


```
Running 3 test cases...
/home/topeet/myBoost/chap6_assert/_6_4_7.cpp(25): error: in "s_decorator/t_case3": check *p == 875 has failed [874 != 875]


*** No errors detected
```


## 参考链接
- [Boost C++测试组件test库](https://blog.csdn.net/weixin_39956356/article/details/111385774)