
## 单文件作为模块
可以将代码保存到一个名为 mycode.py 的文件中 —— 这样可以被外部调用的 .py 文件，有个专门的称呼，模块（Module）
### 简单模块化
**模块导入**
* `import moudle_name` 导入整个模块
* `from mycode import *` 全部导入
* `import moudle_name as alias` 导入整个模块，并用别名
* `from mycode import is_prime as isp` 导入单个并别名
* `from module_name import function_name, variable_name, class_name` ，导入模块的一部分
* `import foo.bar 或者 from foo import bar`  导入 `foo` 这个目录中的 `bar.py` 这个模块文件

1. 说到最简单的模块化方式，你可以把函数、类、常量拆分到不同的文件，把它们放在同一个文件夹，然后使用
 `from your_file import function_name, class_name` 的方式调用
2. 若出现文件夹，只需要使用 . 代替 / 来表示子目录
3. 如果我们想调用上层目录呢？`sys.path.append("..")` 表示将上级目录也添加到path路径

### 模块文件系统目录检索顺序
对于一个独立的项目，所有的模块的追寻方式，最好从项目的根目录开始追溯，这叫做**相对的绝对路径**。
Python 解释器在遇到 import 的时候，它会在1.一个特定的列表中寻找模块 2.文件的当前目录。这个特定的列表，可以用下面的方式拿到：
```
print(sys.path)
########## 输出 ##########
['', '/usr/lib/python36.zip', '/usr/lib/python3.6', '/usr/lib/python3.6/lib-dynload', '/usr/local/lib/python3.6/dist-packages', '/usr/lib/python3/dist-packages']
```

> * 先去看内建模块里有没有你所指定的名称；
> * 如果没有，那么就按照 `sys.path` 所返回的目录列表顺序去找。

可以通过以下代码查看你自己当前机器的 `sys.path`：
```python
import sys
sys.path
```
在 `sys.path` 所返回的目录列表中，你**当前的工作目录**排在第一位。
有时，你需要指定检索目录，因为你知道你要用的模块文件在什么位置，那么可以用 `sys.path.append()` 添加一个搜索位置：
```python
import sys
sys.path.append("/My/Path/To/Module/Directory")
import my_module
```



dir() 函数
你的函数，保存在模块里之后，这个函数的用户（当然也包括你），可以用 dir() 函数查看模块中可访问的变量名称和函数名称，返回一个list
```python
import math
print(dir(math))
```


## `__name__`的作用
import 在导入文件的时候，会自动把所有**暴露在外面的代码**全都执行一遍。因此，如果你要把一个东西封装成模块，又想让它可以执行的话，你必须将要执行的代码放在 `if __name__ == '__main__'`下面。
`__name__` 作为 Python 的**魔术内置参数**，本质上是模块对象的一个属性。
我们使用 `import` 语句时，`__name__` 就会被赋值为该模块的名字，自然就不等于__main__了。
而当一个模块**被命令行运行**的时候，这个模块的 `__name__` 就被 Python 解释器设定为 `'__main__'`。
```python
if __name__ == '__main__':
    main()
```
这么做的结果是：
> 1. 当 Python 文件被当作模块，被 `import` 语句导入时，`if` 判断失败，`main()` 函数不被执行；
> 2. 当 Python 文件被 `python -m` 或`python xx.py`运行的时候，`if` 判断成功，`main()` 函数才被执行。


## 目录作为模块
### `__init__.py`作用

1. 标识该目录是一个python的模块包
这个文件其实可以什么也不定义；可以只是一个空文件，但是必须存在。如果 `__init__.py` 不存在，这个目录就仅仅是一个目录，而不是一个包，它就不能被导入或者包含其它的模块和嵌套包。

2. 简化模块导入操作
如果目录中包含了 `__init__.py` 时，当用 `import` 导入该目录时，会执行 `__init__.py` 里面的代码。这样我们可以在里面添加简化模块导入的代码。

3. 导入模块中的所有内容
```python
from mypackage import *
```
`__init__.py` 中还有一个重要的变量，叫做 `__all__`。
`__all__` 关联了一个模块列表，当执行 `from xx import *` 时，就会导入列表中的模块。
比如：
```python
__all__ = ['subpackage_1', 'subpackage_2']
```

可以去python的内置库看例子，windows下位于：`Python311\Lib`