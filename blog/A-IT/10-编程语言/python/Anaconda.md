## 下载并安装
[Anaconda](https://www.anaconda.com) 是目前最方便的 Python 发行版，搭载了很多我们终将必用的软件包，除了 Python 之外，还有 [R 语言](https://www.r-project.org/)，还包括 [Pandoc](https://pandoc.org/)，[NumPy](http://www.numpy.org/)，[SciPy](https://www.scipy.org/)，[Matplotlib](https://matplotlib.org/)…… 等等。

下载并安装的话windows去官网直接下载安装包安装，linux的话去官网查看如何安装。



windows下安装完成后需要配置环境变量
```
C:\ProgramData\anaconda3
C:\ProgramData\anaconda3\Scripts
```

虚拟环境安装的目录为：
```
C:\Users\sunxv\.conda
```

anaconda会非常吃硬盘空间，用过一段时间后，其中安装目录`C:\ProgramData\anaconda3`的大小为：10G作用，有三个虚拟环境大概也是10G左右


###  HttpError
出现HttpError的时候可能是下载地址的channel有问题，在conda安装好之后，默认的镜像是官方的，由于官网的镜像在境外,访问太慢或者不能访问，为了能够加快访问的速度，这里选择了清华的的镜像。在命令行中运行(设置清华的镜像)
```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
```
###  SSLError 
这个问题是缺少ssl的dll，去官网下载 [OpenSSL](https://slproweb.com/products.html) 的 Windows 安装包,安装之后问题便解决了



### fatal error C1083: 无法打开包括文件: “sys/un.h”: No such file or directory......
fatal error C1083: 无法打开包括文件: “sys/un.h”: No such file or directory...... ImportError: DLL load failed: 找不到指定的模块
这是因为找不到所需lib的路径，需要添加`Anaconda3\Library\bin`路径到Path



## 基本命令

查看所有环境
conda info --envs

创建环境
conda create -n 环境名  python=x.x

激活环境
conda activate 环境名

退出当前环境
deactivate 环境名

删除环境
conda remove -n 环境名 --all



## 包含依赖项的环境文件
**使用conda**：如果您使用的是conda环境管理器，您可以使用以下命令创建一个包含依赖项的环境文件：

```bash
conda list --export > environment.yml
```

这将生成一个`environment.yml`文件，其中包含了当前环境中的所有包及其版本。然后，您可以在其他机器上使用conda创建相同的环境：

```bash
conda env create -f environment.yml
```

这将根据`environment.yml`文件创建一个新的conda环境，其中包含了与原始环境相同的依赖项。


## 在bat脚本中运行
```
@echo off

REM 若脚本路径带中文，报找不到文件的错误，用下面的命令指定编码为 UTF-8
chcp 65001


REM 设置Conda环境， 若不加call，则进入conda的环境中而不能执行之后的命令
call activate myenv

REM 运行 Python 脚本（这里假设脚本名称是 myscript.py）
python myscript.py

REM 关闭 Conda 环境
call conda deactivate
```



## linux上安装Anaconda

- [Installing on Linux — Anaconda documentation](https://docs.anaconda.com/free/anaconda/install/linux/)

下载地址：[官网下载 地址](https://repo.anaconda.com/archive/)

[Index of /anaconda/ | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/anaconda/)



尝试版本：
Anaconda3-2021.05-Linux-aarch64.sh

arm平台有专门的anaconda

叫做miniconda，用法和anaconda差不多





[阿里国产arm架构安装pytorch一次踩坑记录_pytorch arm-CSDN博客](https://blog.csdn.net/aiaidexiaji/article/details/130056643)