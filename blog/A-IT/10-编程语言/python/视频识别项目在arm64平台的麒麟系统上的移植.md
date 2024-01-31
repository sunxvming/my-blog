
## 查询依赖库
纯净的python环境中执行程序，找出缺失的库并进行安装，可以用anaconda的创建一个新的python环境。

所需的库如下：
```
pip install opencv-python
pip install torch
pip install torchvision
pip install dill
pip install pandas
pip install requests
pip install PyYAML
pip install Pillow
pip install tqdm
pip install matplotlib
pip install seaborn
pip install easydict
pip install scipy
pip install haversine
```

## 安装anaconda
官网下载anaconda，分不同的版本和平台
在arm64平台的麒麟系统中进行安装，一开始下载的是比较高的版本，安装的时候在conda命令时会报非法指令的错误
后来下载了低版本的anaconda，还是会报非法指令的错误
再后来下载的更低的版本，安装的时候就没有报错了，但是在执行conda init命令的时候，还是会报非法指令的错误，
并且运行pip的时候也会报非法指令的错误，结果就是无用用pip安装离线包

后又使用本机已安装的python3作为运行环境
也可以用本机已安装的pip把anaconda中的pip替换掉继续使用anaconda的python环境

【非法指令的错误】
这个大概是因为预编译好的二进制包所用的编译机器的架构(虽也是arm64)可能出现了本机飞腾2000所没有的指令，可能是本机用的指令集较旧，编译的机器用的较新导致。


## 下载指定版本、指定平台的库

其中easydict为python库的源码的压缩包
```
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 torch
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 opencv-python
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 torchvision
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 dill
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 pandas
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 requests
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 PyYAML
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 Pillow
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 tqdm
pip download  easydict
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 scipy
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 haversine


pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 matplotlib
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 seaborn
pip download --only-binary=:all: --platform=manylinux2014_aarch64 --python-version 38 importlib-resources
```



## 离线安装库
```
pip install --no-index --find-links=file:/whl-file-dir tensorflow
```
其中： 
`--find-links=file:/whl-file-dir`: 指定查找包的链接。这告诉 pip 在指定的目录中查找要安装的包。
`--no-index`: 表示禁用索引，即不从 PyPI（Python Package Index）获取包。通常，pip 会首先尝试从 PyPI 下载并安装包。


【其他库】
报错
```
No module named _bz2
```

bz2库是二进制的动态库，用`find / -name "_bz2*"`进行查找，在`/home/user/anaconda3/lib/python3.8/lib-dynload/`目录下
找到了`_bz2.cpython-38-aarch64-linux-gnu.so`文件
把这个文件拷贝到`/usr/local/python3/lib/python3.8/lib-dynload/`目录下，就可以解决这个问题了



【离线安装easydict】
tar zxvf easydict.tar.gz  
解压后进入easydict目录，里面有setup.py文件，执行命令：
python3 setup.py install



## 参考链接
- [Python pip离线安装package方法总结（以TensorFlow为例） | 毛帅的博客](https://imshuai.com/python-pip-install-package-offline-tensorflow)

