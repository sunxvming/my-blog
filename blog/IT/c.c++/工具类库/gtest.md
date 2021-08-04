# gtest使用例子
----------------------


##  gitub github地址    https://github.com/google/googletest


## 安装
```
git clone https://github.com/google/googletest.git 
cd googletest        
mkdir build       
cd build
cmake ..            
make
sudo make install    # Install in /usr/local/ by default
```




## 简单例子
```
#include<gtest/gtest.h>
int add(int a,int b){
    return a+b;
}
TEST(testCase,test0){
    EXPECT_EQ(add(2,3),5);
}
int main(int argc,char **argv){
  testing::InitGoogleTest(&argc,argv);
  return RUN_ALL_TESTS();
}
```
`TEST`宏的作用是创建一个简单测试，它定义了一个测试函数，在这个函数里可以使用任何C++代码并使用提供的断言来进行检查。
`RUN_ALL_TESTS()`运行所有测试案例


`ASSERT_*`版本的断言失败时会产生致命失败，并结束当前函数。
`EXPECT_*`版本的断言产生非致命失败，而不会中止当前函数。
通常更推荐使用`EXPECT_*`断言，因为它们运行一个测试中可以有不止一个的错误被报告出来。但如果在编写断言如果失败，就没有必要继续往下执行的测试时，你应该使用`ASSERT_*`断言。 


## GTest的断言
### 1、布尔值检查
```
ASSERT_TRUE(condition);
EXPECT_TRUE(condition);


ASSERT_FALSE(condition);
EXPECT_FALSE(condition);
```


###   2、数值型数据检查
```
expected == actual
ASSERT_EQ(expected, actual);
EXPECT_EQ(expected, actual);


val1 != val2
ASSERT_NE(val1, val2);
EXPECT_NE(val1, val2);


val1 < val2
ASSERT_LT(val1, val2);
EXPECT_LT(val1, val2);


val1 <= val2
ASSERT_LE(val1, val2);
EXPECT_LE(val1, val2);


val1 > val2
ASSERT_GT(val1, val2);
EXPECT_GT(val1, val2);


val1 >= val2
ASSERT_GE(val1, val2);
EXPECT_GE(val1, val2);
```
###   3、字符串比较
```
ASSERT_STREQ(expected_str, actual_str);
EXPECT_STREQ(expected_str, actual_str);


ASSERT_STRNE(str1, str2);
EXPECT_STRNE(str1, str2);


ASSERT_STRCASEEQ(expected_str, actual_str);
EXPECT_STRCASEEQ(expected_str, actual_str);


ASSERT_STRCASENE(str1, str2);
EXPECT_STRCASENE(str1, str2);
```


###   4、异常检查
```
ASSERT_THROW(statement, exception_type);
EXPECT_THROW(statement, exception_type);


ASSERT_ANY_THROW(statement);
EXPECT_ANY_THROW(statement);


ASSERT_NO_THROW(statement);
EXPECT_NO_THROW(statement);
```
###   5、浮点型检查
```
ASSERT_FLOAT_EQ(expected, actual);
EXPECT_FLOAT_EQ(expected, actual);


ASSERT_DOUBLE_EQ(expected, actual);
EXPECT_DOUBLE_EQ(expected, actual);
```
## 事件机制
gtest的事件一共有3种：
* (1)、全局的，所有案例执行前后；
* (2)、TestSuite级别的，在某一批案例中第一个案例前，最后一个案例执行后；
* (3)、TestCase级别的，每个TestCase前后。


## 参数化
测试用例中有专门的方法得到参数
```
int main(int argc, char **argv)
{
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```


## 运行测试输出
其中还有代码的执行时间
```
[ RUN      ] contract_tools.read_and_validate_code
wasm_interface::validate: resolve end..
[       OK ] contract_tools.read_and_validate_code (2 ms)
```















