
- [osg下载 Stable releases](https://www.openscenegraph.com/index.php/download-section/stable-releases)
- [osg中文社区](http://www.osgchina.org/)
- [osg英文官网](https://www.openscenegraph.com/)



## 设置的环境变量

Path
```
# release版
D:\program\vcpkg\installed\x64-windows\bin
D:\program\vcpkg\installed\x64-windows\plugins\osgPlugins-3.6.5
# debug版
D:\program\vcpkg\installed\x64-windows\debug\bin
D:\program\vcpkg\installed\x64-windows\debug\plugins\osgPlugins-3.6.5
```

release版、debug版都设置了，用cmake编译的时候才能根据当前编译的是debug还是release找到对应版本的依赖。
下面是lib库的打印

```
message(STATUS "OPENSCENEGRAPH_LIBRARIES=====: ${OPENSCENEGRAPH_LIBRARIES}")

[cmake] -- OPENSCENEGRAPH_LIBRARIES=====: optimized;D:/program/vcpkg/installed/x64-windows/lib/osg.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgd.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/osgDB.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgDBd.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/osgGA.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgGAd.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/osgUtil.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgUtild.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/osgViewer.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgViewerd.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/osgText.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/osgTextd.lib;optimized;D:/program/vcpkg/installed/x64-windows/lib/OpenThreads.lib;debug;D:/program/vcpkg/installed/x64-windows/debug/lib/OpenThreadsd.lib
```


OSG_FILE_PATH
```
D:\project\c++\OpenSceneGraph-Data
D:\project\c++\OpenSceneGraph-Data\Images
```

OSG_NOTIFY_LEVEL
```
NOTICE
```





## osg编译成静态库
osg默认是编译成动态库的，编译静态库需要手动进行设置，参考：
[OSG3.4.0静态库编译（VS2019） - 3D入魔 - 博客园](https://www.cnblogs.com/mazhenyu/p/17160663.html)




## 代码使用

设置窗口大小
```
viewer.setUpViewInWindow(100, 100, width, height);
```


Viewer::Viewer继承osgViewer::View



## 出现的问题
把自己的osgEarth程序编译好复制到其他电脑上执行，程序报错，提示缺少xxxd.dll的动态库，因为自己编译的是debug版本的，而这太电脑是个新电脑，没有安装c++的开发环境，所有也就没有debug版本的一些dll库。

然后又编译了release版本的程序，上面的问题便解决了。

但是又报了如下的错误
```
Fontconfig error: Cannot load default config file: No such file: (null)
Windows Error #127: [Screen #0] ChooseMatchingPixelFormat() - wglChoosePixelFormatARB extension not found, trying GDI. Reason: 找不到指定的程序。

Rendering in software: pixelFormatIndex 1
Windows Error #127: [Screen #0] GL3: wglCreateContextAttribsARB not available.. Reason: 找不到指定的程序。

Windows Error #127: [Screen #0] ChooseMatchingPixelFormat() - wglChoosePixelFormatARB extension not found, trying GDI. Reason: 找不到指定的程序。

Rendering in software: pixelFormatIndex 3
Windows Error #127: [Screen #0] GL3: wglCreateContextAttribsARB not available.. Reason: 找不到指定的程序。

Warning 1: PROJ: proj_create_from_database: Cannot find proj.db
Warning 1: PROJ: proj_create_from_database: Cannot find proj.db
Warning: detected OpenGL error 'invalid enumerant' at Before Renderer::compile
```

经过网上搜索说是显卡驱动版本太低了，但是这太电脑装的是新的nvidia 3060的显卡，应该不会太低呀。
后来打开设备管理器-->显示适配器，里面有两块显卡，然后我就禁用掉了其中的集成显卡，然后重启电脑。重启后就一直卡在启动界面了。然后想进入bios中打开被禁用的显卡，但是没找到地方。经过另一个人的提醒，是不是显示屏接到了集显上了。恍然大悟，于是把显示屏接到独显上再次启动就好了。
## 参考文档
[OpenSceneGraph: Class List](https://podsvirov.github.io/osg/reference/openscenegraph/annotated.html)