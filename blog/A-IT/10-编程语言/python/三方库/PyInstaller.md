
## 安装
```
pip install pyinstaller
# 安装成功：
pyinstaller -version
```
## 使用
```
pyinstaller -F helloworld.py
```
相关参数：
* -F 表示打包成单独的 .exe 文件，这时生成的 .exe 文件会比较大，而且运行速度回较慢。仅仅一个 helloworld 程序，生成的文件就 5MB 大。
* -i 还可以指定可执行文件的图标；
* -w 表示去掉控制台窗口，这在 GUI 界面时非常有用。不过如果是命令行程序的话那就把这个选项删除吧！



PyInstaller 会对脚本进行解析，并做出如下动作：
1、在脚本目录生成 helloworld.spec 文件； 
2、创建一个 build 目录； 
3、写入一些日志文件和中间流程文件到 build 目录； 
4、创建 dist 目录； 
5、生成可执行文件到 dist 目录；



注意事项
1. 直接运行最终的 .exe 程序，可能会出现一闪而过的情况，这种情况下要么是程序运行结束（比如直接打印的 helloWorld），要么程序出现错误退出了。这种情况下，建议在命令行 cmd 下运行 .exe 文件，这时就会有文本输出到窗口；
2. 写代码的时候应当有个良好的习惯，用什么函数导什么函数，不要上来 import 整个库，最后你会发现你一个 100KB 的代码打包出来有 500MB；
3. 当你的代码需要调用一些图片和资源文件的，这是不会自动导入的，需要你自己手动复制进去才行。不然 exe 文件运行时命令窗口会报错找不到这个文件。


## 在包中导入其他资源：
假设程序中需要引入一个 test.txt 文件，首先我们运行：
```
pyi-makespec -F helloworld.py
```
此时会生成一个 .spec 文件，这个文件会告诉 pyinstaller 如何处理你的脚本，pyinstaller 创建一个 exe 的文件就是依靠它里面的内容进行执行的。


正常情况下你不需要去修改这个 spec 文件，除非你需要打包一个 dll 或者 so 文件或者其他数据文件。
那么我们就需要修改这个 spec 文件：
```
a = Analysis(['helloworld.py'],
             pathex=['/home/test'],
             binaries=[],
             datas=[], ### <------- 改修改为：


a = Analysis(['helloworld.py'],
             pathex=['/home/test'],
             binaries=[],
             datas=[('test.txt','.')], ## <---- 修改此处添加外部文件
```
然后在生成 exe 文件：
```
pyinstaller helloworld.spec
```
然后生成的文件就可以正常引入外部文件了。



## 兼容问题
在win11上用python311用pyinstaller打包成单独的exe，在win7上运行报如下的错误：

问题一：Error loading Python DLL
首先是出现以下这个问题，Error loading Python DLL xxx python311.dll，LoadLibrary: PyInstaller: FormatMessageW failed.

**出错原因**
发现是因为 Python 3.9 不再支持 win7 了，需要把 Python 版本降到 **Python3.8** 及以下。

**解决方案**
1. 用anaconda重新建立虚拟环境，这次注意设置下python的版本
```shell
conda create -n xxx python=3.8
```

2. 安装下你需要的依赖库，比如:
```shell
 pip install -r requirements.txt
```


## 其他问题
在打了一个从视频流中进行物体识别的包，因为依赖的库有opencv、pytorch等，而他们有依赖很多其他的库，导致打完的包体有三百多M，在运行的时候前边有一段时间没有反应。后来发现是在运行打包的程序时，python的打包程序会先把python程序依赖的解释器、库、三方的python包解压到类似 `C:\Users\sunxv\AppData\Local\Temp\_MEI676042` 这样的目录。所以会导致程序有一段解压的时间消耗。



## linux下使用
```
pyinstaller -D -F -n main -c "main.py"
```
- `-D`：这个参数告诉PyInstaller生成一个包含所有依赖项的目录，而不是单个的可执行文件。生成的文件夹通常在`dist`目录下。
- `-F`：这个参数告诉PyInstaller生成一个单个的可执行文件，而不是一个包含多个文件的目录。
- `-n main`：这个参数指定了生成的可执行文件的名称为"main"。如果没有指定该参数，默认情况下，PyInstaller会使用脚本文件的名称来命名生成的可执行文件。
- `-c`：这个参数告诉PyInstaller在控制台窗口中打开生成的可执行文件。



pyinstaller -D -F  -c "gen_proto_data_from_file.py"
pyinstaller -F  "gen_proto_data_from_file.py"
## 参考链接
- [Python程序打包成exe可执行文件](https://blog.csdn.net/zengxiantao1994/article/details/76578421)