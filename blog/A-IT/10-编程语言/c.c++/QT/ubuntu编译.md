
## 编译QT源码

### **1. 安装依赖**

Qt WebEngine 编译依赖较多，首先安装基本开发工具和依赖库：

```bash
sudo apt update
sudo apt install -y build-essential perl python3 git cmake \
    libgl1-mesa-dev libx11-dev libxext-dev libx11-xcb-dev libxcb1-dev \
    libxcb-keysyms1-dev libxcb-image0-dev libxcb-shm0-dev libxcb-icccm4-dev \
    libxcb-sync-dev libxcb-xfixes0-dev libxcb-shape0-dev libxcb-randr0-dev \
    libxcb-render-util0-dev libxcb-glx0-dev libxrender-dev libxkbcommon-dev \
    libfontconfig1-dev libfreetype6-dev libdbus-1-dev libssl-dev \
    libasound2-dev libpulse-dev libjpeg-dev libpng-dev libglib2.0-dev \
    libatk1.0-dev libxcomposite-dev libxdamage-dev libxrandr-dev \
    libdrm-dev bison flex gperf python3-pip ninja-build libnss3-dev \
    libxslt1-dev
```

> **说明**：
> - `libnss3-dev`、`libxslt1-dev`、`ninja-build` 是 WebEngine 编译必备的。
> - 其他是 Qt 基础模块和 OpenGL/X11 相关。

### **2. 下载 Qt 5.15.2 源码**
你可以从官方 Qt 仓库或档案下载源码：
```bash
wget https://download.qt.io/archive/qt/5.15/5.15.2/single/qt-everywhere-src-5.15.2.tar.xz
tar xf qt-everywhere-src-5.15.2.tar.xz
cd qt-everywhere-src-5.15.2
```

### **3. 配置环境**

Qt WebEngine 需要 Python3 和 Ninja 构建工具：
```bash
export PATH=/usr/bin:$PATH
```

然后创建一个构建目录：
```bash
mkdir build
cd build
```

### **4. 配置 Qt 构建选项**
使用 `configure` 配置 Qt

```bash
../configure -prefix /opt/Qt5.15.2 \
    -opensource -confirm-license \
    -nomake tests -nomake examples \
    -opengl desktop \
```

参数说明：
- `-prefix` ：安装路径
- `-opensource` ：开源版本
- `-nomake tests/examples` ：不编译测试和示例，加快编译
- `-opengl desktop` ：使用桌面 OpenGL
    

### **5. 编译 Qt**
推荐使用 Ninja 或 Make：
```bash
make -j$(nproc)
```

或如果你安装了 Ninja：
```bash
ninja
```


### **6. 安装 Qt**
编译完成后：
```bash
sudo make install
```
或者：
```bash
sudo ninja install
```
安装完成后，Qt 会在 `/opt/Qt5.15.2` 下。



### **7. 配置环境变量**
为了使用刚编译的 Qt：
```bash
export PATH=/opt/Qt5.15.2/bin:$PATH
export LD_LIBRARY_PATH=/opt/Qt5.15.2/lib:$LD_LIBRARY_PATH
```

可以加到 `~/.bashrc` 或 `~/.zshrc`，方便永久使用。

### **8. 验证安装**
```bash
qmake -v
```
输出应该类似：
```
QMake version 3.1
Using Qt version 5.15.2 in /opt/Qt5.15.2/lib
```



## 单独安装qwebengine

你现在遇到的错误：
```
ERROR: Unknown command line option '-webengine'
```

说明在 **Qt 5.15.18 的源码里，`configure` 不再直接接受 `-webengine` 参数**了。

从 Qt 5.15.x 后期版本开始，**Qt WebEngine 被拆分成一个单独模块**，不能像早期版本那样直接用 `-webengine` 启用。也就是说：

- 你需要先编译 Qt 基础模块（`qtbase` 等），然后在 **单独的构建目录**里编译 Qt WebEngine。
- `-webengine` 选项在 configure 中已经废弃，所以会报“Unknown command line option”。
    

### **正确的做法（Qt 5.15.18）：

1. 编译 Qt 基础模块（不加 `-webengine`）：
```bash
cd ~/work/qt/qt-everywhere-src-5.15.18/build
../configure -prefix /opt/Qt5.15.18 \
    -opensource -confirm-license \
    -nomake tests -nomake examples \
    -opengl desktop
make -j$(nproc)
sudo make install
```

2. 单独编译 Qt WebEngine
Qt WebEngine 在 `qtwebengine` 子目录下，需要单独生成构建目录：

```bash
cd ~/work/qt/qt-everywhere-src-5.15.18/qtwebengine
mkdir build-webengine
cd build-webengine
/opt/Qt5.15.18/bin/qmake ..  # 使用你刚安装的 Qt qmake
make -j$(nproc)
sudo make install
```


### 创建swapfile增加交换内存
非常重要：Qt WebEngine 编译 Chromium，非常耗时间和内存（建议 16GB 内存以上）
内存不够会直接 OOM 崩溃。

在我的ubuntu虚拟机上因为OOM，gcc进程被杀掉，后来用`make -j1` 一点点编译，编了得有三四个小时

```
# 查看当前 swap 使用情况
swapon -s
# 停用swap
sudo swapoff /swapfile

# 重新创建swap
sudo rm /swapfile            # 删除旧的
sudo fallocate -l 16G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 最后确认内存
free -h
```



## Qt WebEngine 依赖Nodejs

你这次的问题已经非常清楚了：

```
Note: The following modules are not being compiled in this configuration:
    webenginecore
    webengine
    webenginewidgets

WARNING: Nodejs is required to build QtWebEngine.
WARNING: QtWebEngine will not be built.
```

也就是说：**QtWebEngine 根本没开始编译**，因为少关键依赖，尤其是 **nodejs**（必须）和一些媒体库（可选）。

---

### **必须安装的依赖**

请先执行：
```bash
sudo apt update
sudo apt install -y nodejs npm ninja-build python3
```

然后检查 nodejs 版本：
```bash
node -v
```

必须 ≥ **v10**，如果太低，直接装官方 node：

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

---

### 安装 Qt WebEngine 必备的多媒体、字体、图形库

```bash
sudo apt install -y \
    libnss3-dev libxss-dev libasound2-dev libx11-dev libx11-xcb-dev \
    libxcomposite-dev libxrandr-dev libxdamage-dev libxtst-dev \
    libdbus-1-dev libxt-dev libxfixes-dev libxext-dev libxrender-dev \
    libjpeg-dev libpng-dev libcups2-dev libxslt1-dev \
    libevent-dev libminizip-dev libwebp-dev libopus-dev \
    libvpx-dev libsnappy-dev liblcms2-dev libharfbuzz-dev
```

这些库会让 `Optional system libraries` 那一堆 **从 no → yes**，从而启用 webenginecore。

---

### 重新配置 QtWebEngine（关键步骤）

你当前路径正确：  
`~/work/qt/qt-everywhere-src-5.15.18/qtwebengine/build-webengine`

先清理旧缓存：

```bash
rm -rf ./*  # 清空 build-webengine 目录内容
```

重新执行 qmake：

```bash
/opt/Qt5.15.18/bin/qmake ..
```

如果输出里：  
✅ `webenginecore = yes`  
✅ `webenginewidgets = yes`  
就成功了。

---

### 开始编译

```bash
make -j$(nproc)
```



### 安装
```bash
sudo make install
```

### 验证是否成功

```bash
ls /opt/Qt5.15.18/lib | grep WebEngine
```

如果有：
```
libQt5WebEngine.so
libQt5WebEngineCore.so
libQt5WebEngineWidgets.so
```


