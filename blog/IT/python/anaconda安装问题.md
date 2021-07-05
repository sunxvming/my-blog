## 下载并安装 Anaconda
[Anaconda](https://www.anaconda.com) 是目前最方便的 Python 发行版，搭载了很多我们终将必用的软件包，除了 Python 之外，还有 [R 语言](https://www.r-project.org/)，还包括 [Pandoc](https://pandoc.org/)，[NumPy](http://www.numpy.org/)，[SciPy](https://www.scipy.org/)，[Matplotlib](https://matplotlib.org/)…… 等等。

下载并安装的话windows去官网直接下载安装包安装，linux的话去官网查看如何安装。

windows下安装完成后需要配置环境变量
C:\Users\Administrator\Anaconda3;C:\Users\Administrator\Anaconda3\Scripts;



之后用conda下载或更新包的时候可能会出现错误。
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
这是因为找不到所需lib的路径，需要添加Anaconda3\Library\bin路径到Path


