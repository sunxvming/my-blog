简述
CentOS 7 中默认安装了 Python，版本比较低（2.7.5），为了使用新版 3.x，需要对旧版本进行升级。
由于很多基本的命令、软件包都依赖旧版本，比如：yum。所以，在更新 Python 时，建议不要删除旧版本（新旧版本可以共存）。


【查看 Python 版本号】
```
当 Linux 上安装 Python 后（默认安装），只需要输入简单的命令，就可以查看 Python 的版本号：
# python -V
Python 2.7.5
或者是：
# python --version
Python 2.7.5
可以看出，系统自带的 Python 版本是 2.7.5。
```


【下载新版本】
```
进入 Python下载页面，选择需要的版本。
这里，我选择的版本是 3.5.2 。
# wget https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz
【解压缩】
下载完成之后，进行解压缩：


# tar -zxvf Python-3.5.2.tgz
```


【安装配置】
```
进入解压缩后的目录，安装配置：
# cd Python-3.5.2/
# ./configure 
执行 ./configure 时，如果报错：


configure: error: no acceptable C compiler found in $PATH
说明没有安装合适的编译器。这时，需要安装/升级 gcc 及其它依赖包。


# yum install make gcc gcc-c++ 
完成之后，重新执行：


# ./configure --prefix=/usr/local/python3 --enable-optimizations
```
【编译 & 安装】
```
配置完成之后，就可以编译了：


# make 
漫长的等待……完成后，安装：


# make install 
验证
安装成功以后，就可以查看 Python 的版本了：


# python -V
Python 2.7.5
# python3 -V
Python 3.5.2
一个是旧版本 2.x，另外一个是新版本 3.x。


注意：在 /usr/local/bin/ 下有一个 python3 的链接，指向 bin 目录下的 python 3.5。
```

【设置 3.x 为默认版本】
```
查看 Python 的路径，在 /usr/bin 下面。可以看到 python 链接的是 python 2.7，所以，执行 python 就相当于执行 python 2.7。


# ls -al /usr/bin | grep python
-rwxr-xr-x.  1 root root      11216 12月  1 2015 abrt-action-analyze-python
lrwxrwxrwx.  1 root root          7 8月  30 12:11 python -> python2
lrwxrwxrwx.  1 root root          9 8月  30 12:11 python2 -> python2.7
-rwxr-xr-x.  1 root root       7136 11月 20 2015 python2.7
将原来 python 的软链接重命名：


# mv /usr/bin/python /usr/bin/python.bak
将 python 链接至 python3：


# ln -s /usr/local/bin/python3 /usr/bin/python
这时，再查看 Python 的版本：


# python -V
Python 3.5.2
输出的是 3.x，说明已经使用的是 python3了。


ln -s /usr/local/python/bin/pip3 /usr/bin/pip
```

【配置 yum为python2.x】
```
升级 Python 之后，由于将默认的 python 指向了 python3，yum是python编写， 不能正常使用，其他用python2.7编写的可能也不能用，需要编辑 yum 的配置文件：
# vi /usr/bin/yum
同时修改：
# vi /usr/libexec/urlgrabber-ext-down
将 #!/usr/bin/python 改为 #!/usr/bin/python2.7，保存退出即可。
```



