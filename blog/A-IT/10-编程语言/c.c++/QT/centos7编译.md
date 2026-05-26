
1. 安装qtcreator和qt，用官方的的安装包进行安装就行
2. 安装vscode，最新版本的vscode要求的libc的版本比较高，所以不能直接在centos7上用，所有可以下载一个版本比较低的vscode
3. 编译的时候需要用cmake，默认的cmake是2.x版本的，需要下载3.x版本的，可以下载一个预编译好的cmake
4. centos的gcc的默认版本是4.8，只能支持到c++14的版本，需要升级gcc的版本，可以升级到gcc8，他是支持c++17的
5. 在qtcreator中设置Kit，包括cmake、gcc、g++的位置
6. 编译的时候cmake找库的时候还是用的老版本的cmake的配置，所以得在cmakelist中指定新qt的新的cmake的位置：`set(CMAKE_PREFIX_PATH "/opt/Qt5.13.0/5.13.0/gcc_64/lib/cmake")
7. cmakelist中设置 `set(Qt5_DIR "/opt/Qt5.15.2/5.15.2/gcc_64/lib/cmake/Qt5")`




遇到问题
vmware虚拟机下的CentOS7下Qt用QwebEngine加载CesiumJS，报 WebGL初始化失败
```
ContextResult::kFatalFailure: ES3 is blacklisted/disabled/unsupported by drive
```

表示 WebGL 初始化失败，底层 Chromium 引擎拒绝启用 GPU 加速。
这是由于虚拟机环境下的 OpenGL / GPU 加速能力不足或被黑名单屏蔽 导致的。

查看 OpenGL 版本支持
```
[admin@localhost ~]$ glxinfo | grep "OpenGL"
OpenGL vendor string: VMware, Inc.
OpenGL renderer string: llvmpipe (LLVM 7.0, 256 bits)
OpenGL version string: 2.1 Mesa 18.3.4
OpenGL shading language version string: 1.20
OpenGL extensions:
```
说明 OpenGL 版本太低（Cesium 需要 OpenGL 3.3 及以上，Qt WebEngine 对 WebGL2 也要求至少 3.0）。
并且OpenGL renderer string: llvmpip 说明是cpu模拟渲染的
所以得需要升级opengl并且得是GPU渲染的。


后来换了一个物理机redhat7的便好了

