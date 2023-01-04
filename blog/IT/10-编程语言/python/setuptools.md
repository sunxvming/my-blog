## python中安装依赖包的方式

1. 源码包：python setup.py install
2. 在线安装：pip install pkg_name / easy_install pkg_name
在线安装是从PyPI （Python Package Index）来的，官网是：https://pypi.python.org/pypi
执行`pip install pkg_name`命令的时候，它就会去从官方网站搜pkg_name，搜到了就下载压缩包并解压安装，如果没有搜索到就会报错。



曾经 Python 的分发工具是 `distutils`，但它无法定义包之间的依赖关系。
`setuptools` 则是它的增强版，能帮助我们更好的创建和分发 Python 包，尤其是具有复杂依赖关系的包。他还提供了自动包查询程序，用来自动获取包之间的依赖关系，并完成这些包的安装，大大降低了安装各种包的难度，使之更加方便。


## setuptools

一般 Python 安装会自带 setuptools，如果没有可以使用 pip 安装：
```
$ pip install setuptools
```
setuptools 简单易用，只需写一个简短的 setup.py 安装文件，就可以将你 Python 应用打包。
```
# ----- Imports ----- #
from setuptools import setup


# ----- Setup ----- #


setup(
    name='blog-engine',
    version='0.1.0',
    author='sunxvming',
    install_requires=['markdown', 'jinja2']
)
```


安装后的结果:
打包之后多出两个文件夹，分别是xx.egg-info和dist。xx.egg-info是必要的安装信息，
而dist中的压缩包就是安装包，此时默认的egg包，egg包就是zip包，如果需要使用egg包，将egg后缀改成zip解压即可

安装命令：`python setup.py install`















