## 参数加引号
```
BOOST_PP_STRINGIZE(BOOST_PP_CAT(a, b)) // expands to "ab"
```


## 参数加括号
来源:eos中的wasm_interface_private.hpp
```
#include <boost/preprocessor/cat.hpp>
#include <boost/preprocessor/seq/for_each.hpp>




#define _ADD_PAREN_1(...) ((__VA_ARGS__)) _ADD_PAREN_2
#define _ADD_PAREN_2(...) ((__VA_ARGS__)) _ADD_PAREN_1
#define _ADD_PAREN_1_END
#define _ADD_PAREN_2_END
#define _WRAPPED_SEQ(SEQ) BOOST_PP_CAT(_ADD_PAREN_1 SEQ, _END)


// _ADD_PAREN_1(aa)(bb)(cc)会展开如下：
// _ADD_PAREN_1(aa)_ADD_PAREN_2(bb)_ADD_PAREN_1(cc)_ADD_PAREN_2
// 最终结果是给每个参数加上括号   


_WRAPPED_SEQ((aa)(bb)(cc))   //((aa)) ((bb)) ((cc))
```


## 用宏循环某个参数列表  BOOST_PP_SEQ_FOR_EACH
```
BOOST_PP_SEQ_FOR_EACH(macro, data, seq)


变量：
macro
一个以格式macro(r, data, elem)定义的三元宏。该宏被BOOST_PP_SEQ_FOR_EACH按照seq中每个元素进行展开。展开该宏，需要用到下一个BOOST_PP_FOR的重复项、备用数据data和当前元素。


data
备用数据，用于传给macro


seq
用于供macro按照哪个序列进行展开


用法：
BOOST_PP_SEQ_FOR_EACH是一个重复项的宏。
如果序列是(a)(b)(c)，则展开为：
macro(r, data, a) macro(r, data, b) macro(r, data, c)
```


示例代码：
```
#include <boost/preprocessor/cat.hpp>
#include <boost/preprocessor/seq/for_each.hpp>


#define SEQ (w)(x)(y)(z)


#define MACRO(r, data, elem) BOOST_PP_CAT(elem, data)


BOOST_PP_SEQ_FOR_EACH(MACRO, _, SEQ) // expands to w_ x_ y_ z_
```


```
#include <boost/preprocessor/cat.hpp>
#include <boost/preprocessor/seq/for_each.hpp>


#define SEQ (w)(x)(y)(z)


#define MACRO(r, data, elem) elem::GetInstance()


BOOST_PP_SEQ_FOR_EACH(MACRO, _, SEQ) // expands to w::GetInstance() x::GetInstance() y::GetInstance() z::GetInstance() 
```


## 用宏做函数重载  BOOST_PP_OVERLOAD
```
#include <iostream>
#include <boost/preprocessor/facilities/overload.hpp>
int add(int number1, int number2);


#define MACRO_1(number) MACRO_2(number, 10)
// mmp, 它会先检查add的原型, 然后再去做替换, 看来这里还是
#define MACRO_2(number1, number2) add(number1, number2)
// 多参数的宏展开实现重载
// 若BOOST_PP_OVERLOAD(MACRO_, __VA_ARGS__)参数为一个则生成MACRO_1
// 若BOOST_PP_OVERLOAD(MACRO_, __VA_ARGS__)参数为两个则生成MACRO_2
#define MACRO_ADD_NUMBERS(...) BOOST_PP_OVERLOAD(MACRO_, __VA_ARGS__)(__VA_ARGS__)


int main() {
    std::cout << "MACRO_ADD_NUMBERS(1) = " << MACRO_ADD_NUMBERS(1) << std::endl;
    std::cout << "MACRO_ADD_NUMBERS(1, 2) = " << MACRO_ADD_NUMBERS(1, 2) << std::endl;
    return 0;
}


int add(int number1, int number2) {
    return number1 + number2;
}
```


## 自增变量
__COUNTER__   
The __COUNTER__ symbol is provided by VC++ and GCC, and gives an increasing non-negative integral value each time it is used.