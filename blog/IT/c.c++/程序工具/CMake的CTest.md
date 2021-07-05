ctest - Testing driver provided by CMake.
CMake 提供了一个称为 CTest 的测试工具。我们要做的只是在项目根目录的 CMakeLists 文件中调用一系列的 `add_test` 命令。
```
enable_testing()
# 测试程序是否成功运行
add_test (test_run Demo 5 2)


# 测试帮助信息是否可以正常提示
add_test (test_usage Demo)
set_tests_properties (test_usage
  PROPERTIES PASS_REGULAR_EXPRESSION "Usage: .* base exponent")


# 测试 5 的平方
add_test (test_5_2 Demo 5 2)


set_tests_properties (test_5_2
 PROPERTIES PASS_REGULAR_EXPRESSION "is 25")


# 测试 10 的 5 次方
add_test (test_10_5 Demo 10 5)


set_tests_properties (test_10_5
 PROPERTIES PASS_REGULAR_EXPRESSION "is 100000")


# 测试 2 的 10 次方
add_test (test_2_10 Demo 2 10)


set_tests_properties (test_2_10
 PROPERTIES PASS_REGULAR_EXPRESSION "is 1024")
```
上面的代码包含了四个测试。第一个测试 test_run 用来测试程序是否成功运行并返回 0 值。剩下的三个测试分别用来测试 5 的 平方、10 的 5 次方、2 的 10 次方是否都能得到正确的结果。其中 PASS_REGULAR_EXPRESSION 用来测试输出是否包含后面跟着的字符串。
运行结果如下
执行 `make test` 或 `ctest`执行cmake中添加的test
```
$ make test
Running tests...
Test project /home/ehome/Documents/programming/C/power/Demo5
    Start 1: test_run
1/4 Test #1: test_run .........................   Passed    0.00 sec
    Start 2: test_5_2
2/4 Test #2: test_5_2 .........................   Passed    0.00 sec
    Start 3: test_10_5
3/4 Test #3: test_10_5 ........................   Passed    0.00 sec
    Start 4: test_2_10
4/4 Test #4: test_2_10 ........................   Passed    0.00 sec


100% tests passed, 0 tests failed out of 4


Total Test time (real) =   0.01 sec
```
如果要测试更多的输入数据，像上面那样一个个写测试用例未免太繁琐。这时可以通过编写宏来实现：
```
# 定义一个宏，用来简化测试工作
macro (do_test arg1 arg2 result)
  add_test (test_${arg1}_${arg2} Demo ${arg1} ${arg2})
  set_tests_properties (test_${arg1}_${arg2}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result})
endmacro (do_test)
 
# 使用该宏进行一系列的数据测试
do_test (5 2 "is 25")
do_test (10 5 "is 100000")
do_test (2 10 "is 1024")
```
关于 CTest 的更详细的用法可以通过 `man 1 ctest` 参考 CTest 的文档。


## 参考链接
- [CMake 入门实战](https://www.hahack.com/codes/cmake/)



