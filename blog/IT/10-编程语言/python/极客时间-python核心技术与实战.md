## 【基本语法】

```
#!/usr/bin/python
#coding=utf-8
```
Python3.X 源码文件默认使用utf-8编码，所以可以正常解析中文，无需指定 UTF-8 编码。

windows下 `pip install` 下载的目录
```
C:\Python37\Lib\site-packages
```

我们可以使用斜杠（ \）将一行的语句分为多行显示，如下所示：
```
total = item_one + \
        item_two + \
        item_three
```

python 中多行注释使用三个单引号(''')或三个双引号(""")。

`//` 取整除 - 返回商的整数部分 9//2 输出结果 4 , 9.0//2.0 输出结果 4.0




## 01 | 如何逐步突破，成为Python高手？

此教程[github](https://github.com/zwdnet/PythonPractice)


## 02 | Jupyter Notebook为什么是现代Python的必学技术？
按照 Jupyter 创始人 Fernando Pérez 的说法，他最初的梦想是做一个综合 Ju （Julia）、Py （Python）和 R 三种科学运算语言的
计算工具平台，所以将其命名为 Ju-Py-te-R。发展到现在，Jupyter 已经成为一个几乎支持所有语言，能够把软件代码、计算输出、解释文档、多媒体资源整合在一起的多功能科学运算平台。
Jupyter 的优点:
* 整合所有的资源、
* 交互性编程体验、
* 零成本重现结果

常见的场景是，我在论文里看到别人的方法效果很好，可是当我去重现时，却发现需要 pip 重新安装一堆依赖软件。你可以用Binder运行别人的git项目


* Google Colab
[Colaboratory](https://colab.research.google.com/notebooks/welcome.ipynb)是一个免费的 Jupyter 笔记本环境，不需要进行任何设置就可以使用，并且完全在云端运行。

* Jupyter 官方的 Binder 平台
Turn a Git repo into a collection of interactive notebooks
网址：https://mybinder.org/
也是一个在线Jupyter notebook的环境，厉害的是它可以输入github的仓库地址直接在浏览器运行。


* 自己在本地搭jupyter notebook环境
可以参考李笑来的 the-craft-of-selfteaching关于python教程中的Jupyterlab 的安装与配置或者直接去看官网的安装教程
主要步骤：
    + 下载并安装 Anaconda
    + 通过conda install -c conda-forge jupyterlab下载jupyter
    + 命令行输入jupyter lab，浏览器会自动打开http://localhost:8888/lab


Jupyter本地的两种安装办法：
1.安装Anconda。conda包含科学计算的几乎所有包，包含jupyter。
2.仅安装了Python。可以pip install jupyterlab。安装即可。
命令行启动jupyter：jupyter notebook

也可以在vscode中安装jupyter的插件

## 03 | 列表和元组，到底用哪一个？
列表和元组，都是一个可以放置任意数据类型的有序集合。
**相同点**：
Python 中的列表和元组都支持负数索引，-1 表示最后一个元 素，-2 表示倒数第二个元素，以此类推
列表和元组都支持切片操作,   `foo[1:3]`
列表和元组都可以随意嵌套
**不同点**：
列表是动态的，长度大小不固定，可以随意地增加、删减或者改变元素（mutable）。列表的存储空间略大于元 组，性能略逊于元组。
元组是静态的，长度大小固定，无法增加删减或者改变（immutable）。
元组相对于列表更加轻量级，性能稍优。
其区别类似于：类似于c++中vector和数组的方式。

两者也可以通过 list() 和 tuple() 函数相互转换


```
tup = (1, 2, 3, 4)
new_tup = tup + (5, ) # 创建新的元组 new_tup，并依次填充原元组的值

l = [1, 2, 3, 4]
l.append(5) # 添加元素 5 到原列表的末尾
```

### 列表和元组的使用场景
1. 如果存储的数据和数量不变，比如你有一个函数，需要返回的是一个地点的经纬度，然后直接传给前端渲染，那么肯定选用元组更合适。
2. 可变的那只能用列表了


## 04 | 字典(dict)、集合(set)，你真的了解吗？
```
dict:  d1 = {'name': 'jason', 'age': 20, 'gender': 'male'}
set:   s1 = {1, 2, 3}

s = {1,2,3,3,5,6,7}
s.add(7)     // set中有，则不会再加入
```
在Python 3.5（含）以前，字典是不能保证顺序的，键值对A先插入字典，键值对B后插入字典，但是当你**打印**字典的Keys列表时，你会发现B可能在A的前面。但是从Python 3.6开始，**字典是变成有顺序的了**。你先插入键值对A，后插入键值对B，那么当你打印Keys列表的时候，你就会发现B在A的后面。
字典访问可以直接索引键，如果不存在，就会抛出异常.也可以使用 `get(key, default)` 函数来进行索引

想要判断一个元素在不在字典或集合内，我们可以用 `value in dict/set` 来判断。
```
d = {'b': 1, 'a': 2, 'c': 10}
d_sorted_by_key = sorted(d.items(), key=lambda x: x[0]) # 根据字典键的升序排序
d_sorted_by_value = sorted(d.items(), key=lambda x: x[1]) # 根据字典值的升序排序
print(d)
print(d_sorted_by_key)
print(d_sorted_by_value)
# 输出
{'b': 1, 'a': 2, 'c': 10}
[('a', 2), ('b', 1), ('c', 10)]
[('b', 1), ('a', 2), ('c', 10)]
```


不难理解，哈希冲突的发生，往往会降低字典和集合操作的速度。因此，为了保证其高效性，字典和集合内的哈希表，通常会保证其至少留有 1/3 的剩余空间。随着元素的不停插入，当剩余空间小于 1/3 时，Python 会重新获取更大的内存空间，**扩充哈希表**。不过，这种情况下，表内所有的元素位置都会被重新排放。
虽然哈希冲突和哈希表大小的调整，都会导致速度减缓，但均摊复杂度为O(1)。


## 05 | 深入浅出字符串
Python 的字符串是不可变的（immutable）。Python 中字符串的改变，通常只能通过**创建新的**字符串来完成。
```
s = 'hello'
s[0] = 'H'   # 这种做法是错误的
#  这是对的
s = 'H' + s[1:]
s = s.replace('h', 'H')
```
在其他语言中，如 Java，有可变的字符串类型，比如 `StringBuilder`，每次添加、改变或删除字符（串），无需创建新的字符串，时间复杂度仅为 O(1)。但可惜的是，Python 中并没有相关的数据类型。因此，每次想要改变字符串，往往需要 O(n) 的时间复杂度，其中，n 为新字符串的长度。
例外:自从 Python2.5 开始，每次处理字符串的拼接操作时（str1 += str2），Python 首先会检测 str1 还**有没有其他的引用**。如果没有的话，就会尝试原地扩充字符串 buffer 的大小，而不是重新分配一块内存来创建新的字符串并拷贝。
```
l = []
for n in range(0, 100000):
l.append(str(n))
l = ' '.join(l)            #字符串拼接
```
### 字符串的格式化
```
"xxx{},{}".format(a,b)
print('no data available for person with id: {}, name: {}'.format(id, name))
```
使用print方法
python2print可以不加括号，python3必须得加括号。
```
# 格式化输出
print("Couldn't find [%s]" % infile)
# 正则把python2的格式转换成python3的格式
查找目标  print (.*?);?$
替换为     print\($1\)
```







**str和repr的区别**
如果想要自定义类的实例能够被 str() 和 repr() 所调用，那么就需要在自定义类中重载`__str__`和 `__repr__`方法。
* str() 的输出追求可读性，输出格式要便于理解，适合用于输出内容到用户终端。
str 一般用于执行 tostring， 即强制转换为字符串，是类型转换主要手段

* repr() 的输出追求明确性，除了对象内容，还需要展示出对象的数据类型信息，适合开发和调试阶段使用。
repr 一般用于进行 report，即对当前实例进行一个简报，内容应当是对类型和实例结构的反射信息


## 06 | Python “黑箱”：输入与输出
input() 函数输入的类型永远是字符串型`str`,所以要进行转换，把 str 强制转换为 int 用 `int()`，转为浮点数请用 `float()`，而在生产环境中使用强制转换时，请记得加上异常处理`try except`


## 07 | 修炼基本功：条件与循环
Python 中的数据结构只要是可迭代的（iterable），比如列表、集合等等，那么都可以通过下面这种方式遍历：
```
for item in <iterable>:
    ...
```
**字典遍历**
```
 d = {
  "name":"jason",
  "dob":"2000-01-01",
  "gender":"male"
 }
 for k in d:    # 只遍历key
  print(k)

 for v in d.values():
  print(v)

 for k, v in d.items():
  print("keys:{}, values:{}".format(k, v))
```


**通过索引遍历**
```
 # 用索引来循环
 l = [1,2,3,4,5,6,7]
 for index in range(0, len(l)):
  if index < 5:
   print(l[index])


 # 用索引和元素来循环
l = [1,2,3,4,5,6,7]
 for index, item in enumerate(l):
  if index < 5:
   print(item)
```

### list comprehension
在阅读代码的时候，你应该常常会发现，有很多将条件与循环并做一行的操作，例如：
```
expression1 if condition else expression2 for item in iterable
expression for item in iterable if condition
```
上面的表达式叫做：**列表推导式（list comprehension）**
举个例子，比如我们要绘制 y = 2*|x| + 5 的函数图像，给定集合 x 的数据点，需要计算出 y 的数据集合，那么只用一行代码，就可以很轻松地解决问题了：
```
y = [value * 2 + 5 if value > 0 else -value * 2 + 5 for value in x]     #必须得在集合里
```

再比如我们在处理文件中的字符串时，常常遇到的一个场景：将文件中逐行读取的一个完整语句，按逗号分割单词，去掉首位的空字符，并过滤掉长度小于等于 3 的单词，最后返回由单词组成的列表。这同样可以简洁地表达成一行：
```
text = ' Today, is, Sunday'
text_list = [s.strip() for s in text.split(',') if len(s.strip()) > 3]
print(text_list)
['Today', 'Sunday']
```
当然，这样的复用并不仅仅局限于一个循环。比如，给定两个列表 x、y，要求返回 x、y 中所有元素对组成的元祖，相等情况除外。那么，你也可以很容易表示出来：
```
[(xx, yy) for xx in x for yy in y if xx != yy]
```
这样的写法就等价于：
```
l = []
for xx in x:
    for yy in y:
        if xx != yy:
            l.append((xx, yy))
```


## 08 | 异常处理：如何提高程序的稳定性？
* 如果执行到程序中某处抛出了异常，程序就会被**终止**并退出。
* except block 只接受与它相匹配的异常类型并执行，如果程序抛出的异常并不匹配，那么程序照样会终止并退出。
* 当程序中存在多个 except block 时，最多只有一个 except block 会被执行。换句话说，如果多个 except 声明的异常类型都与实际相匹配，那么只有最前面的 except block 会被执行，其他则被忽略。
* Exception 是其他所有非系统异常的基类，能够**匹配任意**非系统异常。
* finally block 中的语句都会被执行，哪怕前面的 try 和 excep block 中使用了 return 语句。

```
import sys
try:
    f = open('file.txt', 'r')
    .... # some data processing
except OSError as err:
    print('OS error: {}'.format(err))
except: #默认的Exception类型的异常
    print('Unexpected error:', sys.exc_info()[0])
finally:
    f.close()
```

### 用户自定义的异常类
实际工作中，如果内置的异常类型无法满足我们的需求，或者为了让异常更加详细、可读，想增加一些异常类型的其他功能，我们可以自定义所需异常类型。不过，大多数情况下，Python 内置的异常类型就足够好了。
```
class MyInputError(Exception):
    """Exception raised when there're errors in input"""
    def __init__(self, value): # 自定义异常类型的初始化
        self.value = value
    def __str__(self): # 自定义异常类型的 string 表达形式
        return ("{} is invalid input".format(repr(self.value)))

try:
    raise MyInputError(1) # 抛出 MyInputError 这个异常
except MyInputError as err:
    print('error: {}'.format(err))
```


## 09 | 不可或缺的自定义函数
### 函数的嵌套
主要有下面两个方面的作用:
* 函数的嵌套能够保证内部函数的隐私。
* 合理的使用函数嵌套，能够提高程序的运行效率。

```
def factorial(input):
    # 输入检查，只运行一次
    if not isinstance(input, int):
        raise Exception("必须输入整数")
    if input < 0:
        raise Exception("输入必须大于等于0")

    # 实际计算
    def inner_factorial(input):
        if input <= 1:
            return 1
        return input*inner_factorial(input-1)

    return(inner_factorial(input))

try:
    print(factorial(12))
except Exception as err:
    print(err)
```


### 函数变量作用域
* 全局变量：定义在整个文件层次上
* 局部变量：定义的函数内部

不能在函数内部随意改变全局变量的值，如果我们一定要在函数内部改变全局变量的值，就必须加上 `global` 这个声明
如果遇到函数内部局部变量和全局变量同名的情况，那么在函数内部，局部变量会覆盖全局变量
对于**嵌套函数**来说，内部函数可以访问外部函数定义的变量，但是无法修改，若要修改，必须加上 `nonlocal` 这个关键字


### 闭包
闭包其实和刚刚讲的嵌套函数类似，不同的是，这里外部函数返回的是一个函数，而不是一个具体的值。返回的函数通常赋于一个变量，这个变量可以在后面被继续执行调用
* 合理地使用闭包，则可以简化程序的复杂度，提高可读性。
* 和上面讲到的嵌套函数优点类似，函数开头需要做一些额外工作，而你又需要多次调用这个函数时，将那些额外工作的代码放在外部函数，就可以减少多次调用导致的不必要的开销，提高程序的运行效率。
* 装饰器也会用到闭包

```
# 闭包，计算n次幂，简化了程序的接口
def nth_power(exp):
    def exponent_of(base):
        return base**exp
    return exponent_of

square = nth_power(2)
cube = nth_power(3)

print(square(2))
print(cube(2))
```


## 10 | 简约不简单的匿名函数
匿名函数,lambda表达式，能让我们的代码更简洁、易读
```
square = lambda x: x**2
square(3)
```
lambda 和常规函数区别：
第一，lambda 是一个表达式（expression），并不是一个语句（statement）。 表达式是语句的一部分。
第二，lambda 的主体是只有一行的简单表达式，并不能扩展成一个多行的代码块。
```
# 列表内部使用
[(lambda x: x*x)(x) for x in range(10)]
# 用作函数参数
l = [(1, 20), (3, 0), (9, 10), (2, -1)]
l.sort(key=lambda x: x[1]) # 按列表中元祖的第二个元素排序
# 让程序简洁
list(map(lambda x: x ** 2, [1, 2, 3, 4, 5]))
# 回调函数
button = Button(
text='This is a button',
command=lambda: print('being pressed')) # 点击时调用 lambda 函数， 就是回调函数
```

### Python 函数式编程
纯函数编程，没有副作用。易于调试和测试
Python 主要提供了这么几个函数：`map()`、`filter()` 和 `reduce()`，通常结合匿名函数lambda 一起使用。
因为 map() 函数直接由 C 语言写的，运行时不需要通过Python 解释器间接调用，并且内部做了诸多优化，所以运行速度最快。
通常来说，在我们想对集合中的元素进行一些操作时，如果操作非常简单，比如相加、累积这种，那么我们优先考虑 map()、filter()、reduce() 这类或者 list comprehension 的形式。

**两种方式的选择**：
在数据量非常多的情况下，比如机器学习的应用，那我们一般更倾向于函数式编程的表示，因为效率更高；
在数据量不多的情况下，并且你想要程序更加 Pythonic 的话，那么 list comprehension 也不失为一个好选择。


## 11 | 面向对象（上）：从生活中的类比说起
* 类中定义常量：
和函数并列地声明并赋值
* 类函数:
类函数的第一个参数一般为 cls，表示必须传一个类进来。类函数最常用的功能是实现不同的 init 构造函数。函数前加`@classmethod`
* 成员函数:
成员函数则是我们最正常的类的函数，第一个参数是self.
* 静态函数:
静态函数则与类没有什么关联，最明显的特征便是，静态函数的第一个参数没有任何特殊性。函数前加`@staticmethod`

```
class Test:
    a = 1    #类中定义常量

    @staticmethod
    def test1():
        print(Test.a)

    @classmethod
    def test2(cls):
        print(cls.a)

    def test3(self):
        print(self.a)

if __name__ == '__main__':
    Test.test1()
    Test.test2()
    Test().test3() # 此处为一个匿名对象
```

在单继承时，`super().__init__()`与`Base.__init__()`是一样的
`super` 是用来解决多重继承问题的，直接用类名调用父类方法在使用单继承的时候没问题，但是如果使用多继承，会涉及到查找顺序（MRO）、重复调用（钻石继承）等种种问题。
MRO 就是类的方法解析顺序表, 其实也就是继承父类方法时的顺序表。


## 12 | 面向对象（下）：如何实现一个搜索引擎？


## 13 | 搭建积木：Python 模块化
### 简单模块化
**模块导入**
* `import moudle_name` 导入整个模块
* `import moudle_name as alias` 导入整个模块，并用别名
* `from module_name import function_name, variable_name, class_name` ，导入模块的一部分

1. 说到最简单的模块化方式，你可以把函数、类、常量拆分到不同的文件，把它们放在同一个文件夹，然后使用
 `from your_file import function_name, class_name` 的方式调用
2. 若出现文件夹，只需要使用 . 代替 / 来表示子目录
3. 如果我们想调用上层目录呢？`sys.path.append("..")` 表示将上级目录也添加到path路径


### 项目模块化
对于一个独立的项目，所有的模块的追寻方式，最好从项目的根目录开始追溯，这叫做**相对的绝对路径**。
Python 解释器在遇到 import 的时候，它会在1.一个特定的列表中寻找模块 2.文件的当前目录。这个特定的列表，可以用下面的方式拿到：
```
print(sys.path)
########## 输出 ##########
['', '/usr/lib/python36.zip', '/usr/lib/python3.6', '/usr/lib/python3.6/lib-dynload', '/usr/local/lib/python3.6/dist-packages', '/usr/lib/python3/dist-packages']
```

### 神奇的 `if __name__ == '__main__'`
import 在导入文件的时候，会自动把所有**暴露在外面的代码**全都执行一遍。因此，如果你要把一个东西封装成模块，又想让它可以执行的话，你必须将要执行的代码放在 `if __name__ == '__main__'`下面。
__name__ 作为 Python 的**魔术内置参数**，本质上是模块对象的一个属性。
我们使用 `import` 语句时，__name__ 就会被赋值为该模块的名字，自然就不等于__main__了


## 15 | Python对象的比较、拷贝
## '==' VS 'is'
`==`操作符比较对象之间的值是否相等
而`is`操作符比较的是对象的身份标识是否相等，即它们是否是同一个对象，是否指向同一个内存地址。
在 Python 中，每个对象的身份标识，都能通过函数 `id(object)` 获得。因此，'is'操作符，相当于比较对象之间的 ID 是否相等
比较操作符'is'效率优于'=='，因为'is'操作符**无法被重载**，执行'is'操作只是简单的获取对象的 ID，并进行比较
出于对性能优化的考虑，Python 内部会对 -5 到 256 的整型维持一个数组，起到一个缓存的作用。这样，每次你试图创建一个 -5 到 256 范围内的整型数字时，Python 都会从这个数组中返回相对应的**引用**，而不是重新开辟一块新的内存空间。


在实际工作中，当我们比较变量时，使用'=='的次数会比'is'多得多，因为我们一般**更关心两个变量的值**，而不是它们内部的存储地址。但是，当我们比较一个变量与一个单例（singleton）时，通常会使用'is'。一个典型的例子，就是检查一个**变量是否为 None**：`if a is None:`


### 浅拷贝和深度拷贝
浅拷贝:可变对象拷贝对象的引用，而不拷贝引用的内存,拷贝前的可变对象类型值变了，拷贝后的值也跟着变。
深拷贝：重新分配一块内存，创建一个新的对象，并且将原对象中的元素，以**递归的方式**，通过创建新的子对象拷贝到新对象中。因此，新对象和原对象没有任何关联。

```
l1 = [1, 2, 3]
l2 = l1         # 没有开辟内村，创建了一个l1的引用
l2 = list(l1)   # 开辟了新内村

import copy           #copy.copy()，适用于任何数据类型
l1 = [1, 2, 3]
l2 = copy.copy(l1)
```

```
# 深拷贝
import copy
l1 = [[1, 2], (30, 40)]
l2 = copy.deepcopy(l1)
```


## 16 | 值传递，引用传递or其他，Python里参数是如何传递的？
* 变量的赋值，只是表示让变量指向了某个对象，并不表示拷贝对象给变量；而一个对象，可以被多个变量所指向。
* 可变对象（列表，字典，集合等等）的改变，会影响所有指向该对象的变量。
* 对于不可变对象（字符串，整型，元祖等等），所有指向该对象的变量的值总是一样的，也不会改变。但是通过某些操作（+= 等等）更新不可变对象的值时，会**返回一个新的对象**。
* 变量可以被删除，但是**对象无法被删除**。对象要等垃圾回收机制清理。


### Python 函数的参数传递
准确地说，Python 的参数传递是赋值传递 （pass by assignment），或者叫作对象的引用传递（pass by object reference）。Python 里所有的数据类型都是对象，所以参数传递时，只是让新变量与原变量指向相同的对象而已，并不存在值传递或是引用传递一说。
* 如果对象是可变的，当其改变时，所有指向这个对象的变量都会改变。
* 如果对象不可变，简单的赋值只能改变其中一个变量的值（创建了新的对象），其余变量则不受影响。


如果你想通过一个函数来**改变某个变量的值**，通常有两种方法。
* 一种是直接将可变数据类型（比如列表，字典，集合）当作参数传入，直接在其上修改；
* 第二种则是创建一个新变量，来保存修改后的值，然后将其返回给原变量。在实际工作中，我们更倾向于使用后者，因为其表达清晰明了，不易出错。


## 17 | 强大的装饰器
所谓的装饰器，其实就是通过装饰器函数，来**修改原函数的一些功能**，使得原函数不需要修改，就能增加新的功能。合理使用装饰器，往往能极大地提高程序的可读性以及运行效率。
### 简单的装饰器
```
def my_decorator(func):
    def wrapper():
        print('wrapper of decorator')
        func()
    return wrapper

def greet():
    print('hello world')

greet = my_decorator(greet)
greet()

# 输出
wrapper of decorator
hello world
```
这里的函数 my_decorator() 就是一个装饰器，它把真正需要执行的函数 greet() 包裹在其中，并且改变了它的行为，但是原函数 greet() 不变。
**更简单的写法：**
```
def my_decorator(func):
    def wrapper():
        print('wrapper of decorator')
        func()
    return wrapper

@my_decorator
def greet():
    print('hello world')

greet()
```
这里的`@`，我们称之为语法糖，`@my_decorator`就相当于前面的greet=my_decorator(greet)语句，只不过更加简洁。


### 带有参数的装饰器
```
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print('wrapper of decorator')
        func(*args, **kwargs)
    return wrapper
```

### 带有自定义参数的装饰器
```
def repeat(num):
    def my_decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(num):
                print('wrapper of decorator')
                func(*args, **kwargs)
        return wrapper
    return my_decorator


@repeat(4)
def greet(message):
    print(message)

greet('hello world')

# 输出：
wrapper of decorator
hello world
wrapper of decorator
hello world
wrapper of decorator
hello world
wrapper of decorator
hello world
```
### 类装饰器
类装饰器主要依赖于函数`__call_()`，每当你调用一个类的实例时，函数__call__()就会被执行一次。
```
class Count:
    def __init__(self, func):
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):
        self.num_calls += 1
        print('num of calls is: {}'.format(self.num_calls))
        return self.func(*args, **kwargs)

@Count
def example():
    print("hello world")

example()
```
### 装饰器的嵌套
```
@decorator1
@decorator2
@decorator3
def func():
等价于：decorator1(decorator2(decorator3(func)))，解释器的规则是由函数开始，由近到远
```

### 装饰器用法实例
身份认证、日志记录（比如打印函数的执行时间）、输入合理性检查、缓存装饰器


## 18 | [名师分享] metaclass，是潘多拉魔盒还是阿拉丁神灯？
YAMLObject 的一个超越变形能力，就是它的任意子类支持序列化和反序列化（serialization & deserialization）


## 19 | 深入理解迭代器和生成器
### 迭代器
迭代器（iterator）提供了一个 next 的方法，调用这个方法后，你要么得到这个容器的下一个对象，要么得到一个 StopIteration 的错误。你不需要像列表一样**指定元素的索引**，因为字典和集合这样的容器并没有索引一说。比如，字典采用哈希表实现，那么你就只需要知道，next 函数可以**不重复不遗漏地一个一个拿到所有元素**。
而可迭代对象，通过 `iter()` 函数返回一个**迭代器**，再通过 `next()` 函数就可以实现遍历。`for in` 语句将这个过程隐式化
```
i = iter([1, 2, 3, 4])
print(next(i))
print(next(i))
print(next(i))
```
判断一个对象是否可以迭代  `isinstance(obj, Iterable)`。


### 生成器
生成器是**懒人版本的迭代器**。
声明一个迭代器很简单，`[i for i in range(100000000)]`就可以生成一个包含一亿元素的列表。
始化了一个生成器：`(i for i in range(100000000))`,会返回一个generator object
在你调用 `next()` 函数的时候，才会生成下一个变量
**迭代器是一个有限集合，生成器则可以成为一个无限集**。我只管调用 next()，生成器根据运算会自动生成新的元素，然后返回给你。
```
def generator():
    i = 1
    while True:
        yield i
        i += 1
g = generator()
print(next(g))
print(next(g))
print(next(g))
# output 1 2 3
```


## 20 | 揭秘 Python 协程
协程是实现并发编程的一种方式，其底层的实现为事件循环机制。
```
asyncio.create_task(worker_1()) # 创建任务
asyncio.run(main())  # 启动任务
```

```
import asyncio
 
async def worker_1():
    print('worker_1 start')
    await asyncio.sleep(1)
    print('worker_1 done')
 
async def worker_2():
    print('worker_2 start')
    await asyncio.sleep(2)
    print('worker_2 done')
 
async def main():
    task1 = asyncio.create_task(worker_1())
    task2 = asyncio.create_task(worker_2())
    print('before await')
    await task1
    print('awaited worker_1')
    await task2
    print('awaited worker_2')
 
%time asyncio.run(main())
 
########## 输出 ##########
 
before await
worker_1 start
worker_2 start
worker_1 done
awaited worker_1
worker_2 done
awaited worker_2
Wall time: 2.01 s
```
`async` 修饰词声明异步函数，而**调用异步函数**，我们便可得到一个协程对象（coroutine object）,而并不会真正执行这个函数。
协程调用：
* await 执行的效果，和 Python 正常执行是一样的，也就是说程序会阻塞在这里，进入被调用的协程函数，执行完毕返回后再继续，而这也是 await 的字面意思。代码中 await asyncio.sleep(sleep_time) 会在这里休息若干秒
* 通过 asyncio.create_task() 来创建任务
* 需要 asyncio.run 来触发运行。asyncio.run 这个函数是 Python 3.7 之后才有的特性，可以让 Python 的协程接口变得非常简单。一个非常好的编程规范是，asyncio.run(main()) 作为主程序的入口函数，在程序运行周期内，只调用一次 asyncio.run


总结：
* 协程和多线程的区别，主要在于两点，一是协程为**单线程**；二是协程**由用户决定**，在哪些地方交出控制权，切换到下一个任务。
* 协程的写法更加简洁清晰，把 async / await 语法和 create_task 结合来用，对于中小级别的并发需求已经毫无压力。
* 写协程程序的时候，你的脑海中要有清晰的**事件循环概念**，知道程序在什么时候需要暂停、等待 I/O，什么时候需要一并执行到底。


请一定不要轻易炫技。多线程模型也一定有其优点，一个真正牛逼的程序员，应该懂得，在什么时候用什么模型能达到工程上的最优，而不是自觉某个技术非常牛逼，所有项目创造条件也要上。技术是工程，而工程则是时间、资源、人力等纷繁复杂的事情的折衷。


## 21 | Python并发编程之Futures
### 区分并发和并行
并发通常应用于 I/O 操作频繁的场景，比如你要从网站上下载多个文件，I/O 操作的时间可能会比 CPU 运行处理的时间长得多。
而并行则更多应用于 CPU heavy 的场景，比如 MapReduce 中的并行计算，为了加快运行速度，一般会用多台机器、多个处理器来完成。

同一时刻，Python 主程序只允许有一个线程执行，所以 Python 的并发，是通过多线程的切换完成的。
事实上，Python 的解释器并不是线程安全的，为了解决由此带来的 race condition 等问题，Python 便引入了**全局解释器锁**，也就是同一时刻，只允许一个线程执行。当然，在执行 I/O 操作时，如果一个线程被 block 了，全局解释器锁便会被释放，从而让另一个线程能够继续执行。


## 22 | 并发编程之Asyncio
事实上，Asyncio 和其他 Python 程序一样，是单线程的，它只有一个主线程，但是可以进行多个不同的任务（task），这里的任务，就是特殊的 future 对象。这些不同的任务，被一个叫做 event loop 的对象所控制。你可以把这里的任务，类比成多线程版本里的多个线程。
为了简化讲解这个问题，我们可以假设任务只有两个状态：一是预备状态；二是等待状态。event loop 会维护两个任务列表，分别对应这两种状态；并且选取预备状态的一个任务（具体选取哪个任务，和其等待的时间长短、占用的资源等等相关），使其运行，一直到这个任务把控制权交还给 event loop 为止。
当任务把控制权交还给 event loop 时，event loop 会根据其是否完成，把任务放到预备或等待状态的列表，然后遍历等待状态列表的任务，查看他们是否完成。
如果完成，则将其放到预备状态的列表；
如果未完成，则继续放在等待状态的列表。
而原先在预备状态列表的任务位置仍旧不变，因为它们还未运行。


Asyncio 中的任务，在运行过程中不会被打断，因此不会出现 race condition 的情况。尤其是在 I/O 操作 heavy 的场景下，Asyncio 比多线程的运行效率更高。因为 Asyncio 内部任务切换的损耗，远比线程切换的损耗要小；并且 Asyncio 可以开启的任务数量，也比多线程中的线程数量多得多。


Asyncio 有缺陷吗？
* 实际工作中，想用好 Asyncio，特别是发挥其强大的功能，很多情况下必须得有相应的 Python 库支持。比如http库中的requests不支持asyncio，aiohttp支持。
* 另外，使用 Asyncio 时，因为你在任务的调度方面有了更大的自主权，写代码时就得更加注意，不然很容易出错。


多线程还是 Asyncio？
如果是 I/O bound，并且 I/O 操作很慢，需要很多任务/线程协同实现，那么使用 Asyncio 更合适。
如果是 I/O bound，但是 I/O 操作很快，只需要有限数量的任务/线程，那么使用多线程就可以了。
如果是 CPU bound，则需要使用**多进程**来提高程序运行效率。


## 23 | 你真的懂Python GIL（全局解释器锁）吗？
### GIL是什么？
GIL（Global Interpreter Lock，即全局解释器锁），是最流行的 Python 解释器 CPython 中的一个技术术语。本质上是类似操作系统的 Mutex。每一个 Python **线程**，在 CPython 解释器中执行时，都会先锁住自己的线程，阻止别的线程执行。
当然，CPython 会做一些小把戏，轮流执行 Python 线程。这样一来，用户看到的就是“伪并行”——Python 线程在交错执行，来模拟真正并行的线程。
GIL会在遇到io的时候也会自动释放，给其他线程执行的机会


### 为什么存在？
CPython使用**引用计数**来管理内存，当引用计数只有 0 时，则会自动释放内存。
如果有两个 Python 线程同时引用了 a，就会造成引用计数的 race condition，引用计数可能最终只增加 1，这样就会造成内存被污染。因为第一个线程结束时，会把引用计数减少 1，这时可能达到条件释放内存，当第二个线程再试图访问 a 时，就找不到有效的内存了。
所以说，CPython 引进 GIL 其实主要就是这么两个原因：
* 一是设计者为了规避类似于内存管理这样的复杂的竞争风险问题（race condition）；
* 二是因为 CPython 大量使用 C 语言库，但大部分 C 语言库**都不是原生线程安全的**（线程安全会降低性能和增加复杂度）。


### GIL如何运行
每一个线程在开始执行时，都会锁住 GIL，以阻止别的线程执行；同样的，每一个线程执行完一段后，会释放 GIL，以允许别的线程开始利用资源。
CPython 中还有另一个机制，叫做 `check_interval`，意思是 CPython 解释器会去轮询检查线程 GIL 的锁住情况。每隔一段时间，Python 解释器就会**强制当前线程去释放** GIL，这样别的线程才能有执行的机会。

GIL 的设计，主要是为了方便 **CPython 解释器**层面的编写者，而不是 Python 应用层面的程序员。作为 Python 的使用者，我们还是需要 lock 等工具，来确保线程安全。


### 如何绕过 GIL？
事实上，很多高性能应用场景都已经有大量的 **C实现的** Python 库，例如 NumPy 的矩阵运算，就都是通过 C 来实现的，**并不受 GIL 影响**。
所以，大部分应用情况下，你并不需要过多考虑 GIL。因为如果多线程计算成为性能瓶颈，往往已经有 Python 库来解决这个问题了。
如果你的应用真的对性能有超级严格的要求，可以把关键性能（performance-critical）代码在 C++ 中实现（不再受 GIL 所限），然后再提供 Python 的调用接口。
总的来说，你只需要重点记住，绕过 GIL 的大致思路有这么两种就够了：
* 绕过 CPython，使用 JPython（Java 实现的 Python 解释器）等别的实现；
* 把关键性能代码，放到别的语言（一般是 C++）中实现。


## 24 | 带你解析 Python 垃圾回收机制
### 计数引用
Python 中**一切皆对象**。因此，你所看到的一切变量，本质上都是对象的一个指针。
`sys.getrefcount()` 这个函数，可以查看一个变量的引用次数。getrefcount 本身也会引入一次计数。
手动释放内存
先调用 `del a` 来删除一个对象；然后强制调用 `gc.collect()`，即可手动启动垃圾回收。


### 循环引用
如果有两个对象，它们互相引用，并且不再被别的对象所引用，那么它们应该被垃圾回收吗？  能。
Python 使用**标记清除**（mark-sweep）算法和**分代收集**（generational），来启用针对循环引用的自动垃圾回收。
* 标记清除算法
我们先用图论来理解不可达的概念。对于一个有向图，如果从一个节点出发进行遍历，并标记其经过的所有节点；那么，在遍历结束后，所有没有被标记的节点，我们就称之为**不可达节点**。显而易见，这些节点的存在是没有任何意义的，自然的，我们就需要对它们进行垃圾回收。循环引用的对象除其本身外不为其他的对象引用，所以**会被标记成不可达**。之后会被清理
* 分代收集算法(一个优化手段)
Python 将所有对象分为**三代**。刚刚创立的对象是第 0 代；经过一次垃圾回收后，依然存在的对象，便会依次从上一代挪到下一代。而每一代启动自动垃圾回收的**阈值**，则是可以单独指定的。当垃圾回收器中新增对象减去删除对象达到相应的阈值时，就会对这一代对象启动垃圾回收。
事实上，分代收集基于的思想是，新生的对象更有可能被垃圾回收，而存活更久的对象也有更高的概率继续存活。因此，通过这种做法，可以节约不少计算量，从而提高 Python 的性能。
如果垃圾回收启动太频繁，会造成程序性能低下，分代收集也是为了提高性能，因此不立刻回收没关系，只要一定时间或者一定阈值之后回收都没问题。内存泄漏是这部分内存永远不再被回收，越攒越多，直到撑爆内存。

### 调试内存泄漏
**objgraph**，一个非常好用的可视化引用关系的包。
两个有用的函数
* show_refs()，它可以生成清晰的引用关系图。
* show_backrefs()，比上一个输出的信息更加丰富。


## 25 | 答疑（二）：GIL与多线程是什么关系呢？
**问题一**：列表 self append 无限嵌套的原理
```
x = [1]
x.append(x)
x
[1, [...]]
```
![](https://sunxvming.com/imgs/bfce539e-04cf-42fb-96b7-8f41f16357da.png)
这里，x 指向一个列表，列表的第一个元素为 1；执行了 append 操作后，第二个元素又反过来指向 x，即指向了 x 所指向的列表，因此形成了一个无限嵌套的循环：[1, [1, [1, [1, …]]]]。
不过，虽然 x 是无限嵌套的列表，但 x.append(x) 的操作，并不会递归遍历其中的每一个元素。它只是扩充了原列表的第二个元素，并将其指向 x，因此不会出现 stack overflow 的问题，自然不会报错。
为什么 len(x) 返回的是 2？我们还是来看 x，虽然它是无限嵌套的列表，但 x 的 top level 只有 2 个元素组成，第一个元素为 1，第二个元素为指向自身的列表，因此 len(x) 返回 2。


**问题四**：多进程与多线程的应用场景
如果你想对 CPU 密集型任务加速，使用多线程是无效的，请使用多进程。这里所谓的 CPU 密集型任务，是指会消耗大量 CPU 资源的任务，比如求 1 到 100000000 的乘积，或者是把一段很长的文字编码后又解码等等。


使用多线程之所以无效，原因正是我们前面刚讲过的，Python 多线程的本质是多个线程互相切换，但**同一时刻仍然只允许一个线程运行**。因此，你使用多线程，和使用一个主线程，本质上来说并没有什么差别；反而在很多情况下，因为线程切换带来额外损耗，还会降低程序的效率。

而如果使用多进程，就可以允许多个进程之间 in parallel 地执行任务，所以能够有效提高程序的运行效率。

至于 I/O 密集型任务，如果想要加速，请优先使用多线程或 Asyncio。当然，使用多进程也可以达到目的，但是完全没有这个必要。因为对 I/O 密集型任务来说，**大多数时间都浪费在了I/O等待上**。因此，在一个线程/任务等待I/O时，我们只需要切换线程/任务去执行其他 I/O 操作就可以了。


不过，如果 I/O 操作非常多、非常 heavy，需要建立的连接也比较多时，我们一般会选择 Asyncio。因为 **Asyncio 的任务切换更加轻量化**，并且**它能启动的任务数也远比多线程启动的线程数要多**。当然，如果 I/O 的操作不是那么的 heavy，那么使用多线程也就足够了。


## 26 | [名师分享] 活都来不及干了，还有空注意代码风格？！
在 Google，对于编程规范的信仰，可能超出很多人的想象，我给你简单介绍几点。
1. 每一个语言都有专门的委员会（Style Committee）制定全公司强制的编程规范，和负责在编程风格争议时的仲裁人（Style Arbiters）。
2. 在每个语言相应的编程规范群里，每天都有大量的讨论和辩论。新达成的共识会被写出“大字报”张贴在厕所里，以至于每个人甚至来访者都能用坐着的时候那零碎的 5 分钟阅读。
3. 每一个代码提交，类似于 Git 里 diff 的概念，都需要至少两次代码评审（code review），一次针对业务逻辑，一次针对可读性（readability review）。所谓的可读性评审，着重在代码风格规范上。只有通过考核的人，才能够成为可读性评审人（readability reviewer）。
4. 有大量的开发自动化工具，确保以上的准则得到强制实施。例如，代码提交前会有 linter 做静态规则检查，不通过是无法提交代码的。


python的两个规范：
《8 号 Python 增强规范》（Python Enhacement Proposal #8），以下简称 PEP8；
《Google Python 风格规范》（Google Python Style Guide）


统一的编程规范为什么重要？
用一句话来概括，统一的编程规范能提高开发效率。而开发效率，关乎三类对象，也就是阅读者、编程者和机器。他们的优先级是阅读者的体验 > 编程者的体验 > 机器的体验。


### 阅读者的体验 > 编程者的体验
Google Style 2.2 条规定，Python 代码中的 import 对象，只能是 package 或者 module。
```
# 错误示例
from mypkg import Obj
from mypkg import my_func
 
my_func([1, 2, 3])
 
# 正确示例
import numpy as np
import mypkg
 
np.array([6, 7, 8])
```
因为 my_func 这样的名字，如果没有一个 package name 提供上下文语境，读者很难单独通过 my_func 这个名字来推测它的可能功能，也很难在 debug 时根据 package name 找到可能的问题。


### 编程者的体验 > 机器的体验
```
# 错误示例
result = [(x, y) for x in range(10) for y in range(5) if x * y > 10]
# 正确示例
result = []
for x in range(10):
  for y in range(5):
     if x * y > 10:
       result.append((x, y))
```

### 机器的体验也很重要
is 和 == 的使用区别
比较值的时候用 `==`
当你和 None 比较时候永远使用 is。

```
# 错误示例
x = MyObject()
print(x == None)


# 正确示例
x = MyObject()
print(x is None)
```

Python 中还有隐式布尔转换
```
# 错误示例,  调用这个时pay(“Andrew”, 0)， 0会被当做false
def pay(name, salary=None):
 if not salary:
   salary = 11
 print(name, "is compensated", salary, "dollars")
 
# 正确示例
def pay(name, salary=None):
 if salary is not None:
   salary = 11
 print(name, "is compensated", salary, "dollars")
```

不规范的编程习惯也会导致程序效率问题
```
# 错误示例, `keys()` 方法会在遍历前生成一个临时的列表，导致上面的代码消耗大量内存并且运行缓慢。
adict = {i: i * 2 for i in xrange(10000000)}
for key in adict.keys():
   print("{0} = {1}".format(key, adict[key]))
# 正确示例
for key in adict:
```

### 整合进开发流程的自动化工具
一旦确定了整个团队同意的代码规范，就一定要强制执行。停留在口头和大脑的共识，只是水中月镜中花。如何执行呢？靠强制代码评审和强制静态或者动态 linter。
在代码评审工具里，添加必须的编程规范环节；
把团队确定的代码规范写进 [Pylint](https://www.pylint.org/) 里，能够在每份代码提交前自动检查，不通过的代码无法提交。
整合之后，你的团队工作流程就会变成这样：
![](https://sunxvming.com/imgs/91edff14-4004-4dcf-b9b9-c478fd8af5da.jpg)


## 33 | 带你初探量化世界
随着数据处理技术的飞速发展，和量化交易模型研究理论的逐渐成熟，现金股票交易、债券市场、期货市场以及投行的相当一部分业务，都在朝着自动化的方向迈进。


交易员这个行业本身，对自身素质要求是极高的。除了要具备扎实的专业素养（包括金融功底、数理逻辑、分析能力、决策能力），对心理素质的要求也非常高。这种直接和钱打交道、并直面人性深处欲望的行业，也因此吸引了无数高手的参与，很多人因此暴富，也有不少人破产，一无所有。


对算法交易系统来说，API 只是最下层的结构。通常而言，一个基本的交易系统应该包括：行情模块、策略模块和执行模块。为了辅助策略的开发，通常还有回测系统辅助。


## 34 | RESTful & Socket: 搭建交易执行层核心


## 35 | RESTful & Socket: 行情数据对接和抓取


## 41 | 硅谷一线互联网公司的工作体验



