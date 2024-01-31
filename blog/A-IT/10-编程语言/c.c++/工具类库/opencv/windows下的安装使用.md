## 一、VS + 预编译的vs版本的opencv

### VS直接建立opencv的实例工程
设置文件夹目录 `D:\program\opencv\build\include`
设置库文件目录 `D:\program\opencv\build\x64\vc15\lib`
添加lib库 `opencv_world460d.lib`
设置环境变量 `D:\program\opencv\build\x64\vc15\bin`

### vs+cmake
1. 用cmake的gui程序生成vs工程
2. 在vscode中用cmake插件生成工程

	
## 二、mingw+源码编译opencv
使用cmake+mingw编译opencv的源码
在vscode中用cmake插件生成工程并编译


## 三、最简单的例子
C++
```cpp
#include <opencv2/opencv.hpp>  
#include <opencv2/core/core.hpp>  
#include <opencv2/highgui/highgui.hpp>  
#include <opencv2/imgproc.hpp>  
#include<iostream>  
using namespace std;
using namespace cv;
int main()
{
    Mat image = imread("C:/Users/sunxv/Desktop/aa.png");
    imshow("Show Window", image);
    waitKey(0);
    return 0;
}
```

cmakelists
```cmake
cmake_minimum_required(VERSION 3.0.0)
project(cvTest VERSION 0.1.0)

# message("$ENV{PATH}")

# 设置OpenCVConfig.cmake所在路径
set(OpenCV_DIR D://program//opencv//build-mingw//install//x64//mingw//lib)

find_package(OpenCV REQUIRED)

message("=============================")
message("${OpenCV_INCLUDE_DIRS}")
message("${OpenCV_LIBS}")


include_directories(${OpenCV_INCLUDE_DIRS})
add_executable(cvTest main.cpp)
target_link_libraries(cvTest  ${OpenCV_LIBS})
```

## 参考链接
- [Qt、MinGW编译OpenCV 4.5.4（包含opencv_contrib）详细过程_觉皇嵌入式的博客-CSDN博客](https://blog.csdn.net/qq153471503/article/details/123542363)
- [Windows安装OpenCV——利用MinGW+CMake从源码编译_HNU跃鹿战队的博客-CSDN博客](https://blog.csdn.net/NeoZng/article/details/122778711)