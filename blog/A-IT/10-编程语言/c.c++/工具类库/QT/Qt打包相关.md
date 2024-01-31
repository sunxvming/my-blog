## windeployqt的使用
开发的Qt程序在运行时会依赖QT本身的一些动态库，QT自带了windeployqt.exe工具可以实现自动将所需的QT依赖库拷贝过来

以下是实现这个功能的bat脚本
```
echo off
echo Setting up environment for Qt usage...
set PATH=D:\program\Qt\Qt5.12.12\5.12.12\mingw73_64\bin;%PATH%      rem 此行目录为QT的安装目录，需要自行调整
echo bat与exe放在同一个目录
for /f "delims=" %%A in ('dir /b *.exe') do windeployqt %%A
echo pause
```

**存在的问题**
1. windeployqt可能并不会把所有的qt依赖库都复制进来，此时需要手动复制
2. 非Qt依赖库也不会复制进来，需手动复制

**如何找到缺失的dll库**
在配置好了的依赖库的环境变量的情况下是不会报dll缺失的错误的，此时可以把环境变量先改为不生效，以验证缺失哪些动态库


## 在其他电脑上无法运行的问题
现象：
运行程序时，在其他电脑中一闪而过，没有任何报错和打印输出

解决：
使用gdb调试程序，在这里会多一些程序的运行信息，并且可以用bt来打印错误堆栈
得到如下报错
```
Starting program: C:\Users\HANLU\Desktop\videoPlayer\VideoPlayer.exe
[New Thread 1524.0x536c]
[New Thread 1524.0x2f64]
[New Thread 1524.0x50ec]
[New Thread 1524.0x5128]
warning: qt.qpa.plugin: Could not find the Qt platform plugin "windows" in ""
warning: This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

gdb: unknown target exception 0xc0000602 at 0x7ffade16d8b2

Thread 1 received signal ?, Unknown signal.
0x00007ffade16d8b2 in RaiseFailFastException () from C:\WINDOWS\System32\KernelBase.dll
(gdb) bt
#0  0x00007ffade16d8b2 in RaiseFailFastException () from C:\WINDOWS\System32\KernelBase.dll
#1  0x000000006b78f464 in qt_message_fatal (context=..., message=...) at global\qlogging.cpp:1898
#2  0x000000006b78fe5f in QMessageLogger::fatal (this=this@entry=0xc0f790,
    msg=msg@entry=0x183d27c <QSurfaceFormat::setDefaultFormat(QSurfaceFormat const&)::__PRETTY_FUNCTION__+1948> "%s")
    at global\qlogging.cpp:888
#3  0x00000000014023ff in init_platform (pluginNamesWithArguments=..., platformPluginPath=..., platformThemeName=...,
    argc=@0xc0fd90: 1, argv=argv@entry=0x1ffec410) at kernel\qguiapplication.cpp:1219
#4  0x0000000001402f65 in QGuiApplicationPrivate::createPlatformIntegration (this=0x1ffec4c0)
    at kernel\qguiapplication.cpp:1392
#5  0x0000000001403109 in QGuiApplicationPrivate::createEventDispatcher (this=<optimized out>)
    at kernel\qguiapplication.cpp:1409
#6  0x000000001312b9c2 in QApplicationPrivate::createEventDispatcher (this=0xc0f180) at kernel\qapplication.cpp:185
#7  0x000000006b91f8ba in QCoreApplicationPrivate::init (this=this@entry=0x1ffec4c0)
    at kernel\qcoreapplication.cpp:858
#8  0x000000000140558e in QGuiApplicationPrivate::init (this=0x1ffec4c0) at kernel\qguiapplication.cpp:1438
#9  0x000000001312c958 in QApplicationPrivate::init (this=0x1ffec4c0) at kernel\qapplication.cpp:558
#10 0x000000001312ca07 in QApplication::QApplication (this=0xc0fd60, argc=@0xc0fd90: 1, arg
```

最终发现是少了`platforms/qwindowsd.dll`这个dll插件，这是因为在复制程序的dll依赖时没有用windeployqt去复制导致上面的插件没有复制过来


