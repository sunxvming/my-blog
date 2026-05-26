[Get started with CMake Tools on Linux](https://code.visualstudio.com/docs/cpp/cmake-linux)


在 `CMakePresets.json` 中，环境变量的设置主要涉及两个阶段：**配置阶段**（Configure）和**构建阶段**（Build）。它们分别对应 `configurePresets` 和 `buildPresets`。


|特性|配置阶段 (`configurePresets`)|构建阶段 (`buildPresets`)|
|---|---|---|
|**目的**|为 CMake **配置**（生成构建系统）设置环境，影响 `CMakeLists.txt` 的执行|为**编译和链接**过程设置环境，影响编译器（如 `cl.exe`, `gcc`）和构建工具（如 `ninja`, `make`）的行为|
|**环境变量**|影响 CMake 本身、查找包（`find_package`）、检测编译器特性等|影响编译器查找头文件（`INCLUDE`）、链接库（`LIB`），以及工具运行路径（`PATH`）等|
|**设置位置**|`configurePresets` 中的 `environment` 字段|`buildPresets` 中的 `environment` 字段|




## CMakePresets.json例子
```json
{
  "version": 6,
  "configurePresets": [
    {
      "name": "MSVC22-x64-base",
      "hidden": true,
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/out/build/${presetName}",
      "cacheVariables": {
        "CMAKE_INSTALL_PREFIX": "${sourceDir}/out/install/${presetName}",
        "CMAKE_C_COMPILER": "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.35.32215/bin/Hostx64/x64/cl.exe",
        "CMAKE_CXX_COMPILER": "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.35.32215/bin/Hostx64/x64/cl.exe"
      },
      "environment": {
        "Qt5_DIR": "D:/program/Qt/Qt5.12.12/5.12.12/msvc2017_64",
        "PATH": "C:/Program Files/CMake/bin;C:/Program Files (x86)/Windows Kits/10/bin/10.0.22000.0/x64;",
        "LIB": "C:/Program Files (x86)/Windows Kits/10/lib/10.0.22000.0/ucrt/x64;C:/Program Files (x86)/Windows Kits/10/lib/10.0.22000.0/um/x64;C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.35.32215/lib/x64;",
        "INCLUDE": "C:/Program Files/Microsoft Visual Studio/2022/Community/VC/Tools/MSVC/14.35.32215/include;C:/Program Files (x86)/Windows Kits/10/include/10.0.22000.0/ucrt;C:/Program Files (x86)/Windows Kits/10/include/10.0.22000.0/um;C:/Program Files (x86)/Windows Kits/10/include/10.0.22000.0/shared;"
      }
    },
    {
      "name": "MSVC22-Debug-x64",
      "displayName": "Ninja MSVC Debug x64",
      "inherits": "MSVC22-x64-base",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug",
        "CMAKE_RUNTIME_OUTPUT_DIRECTORY": "${sourceDir}/bin/Debug",
        "CMAKE_LIBRARY_OUTPUT_DIRECTORY": "${sourceDir}/lib/Debug"
      }
    },
    {
      "name": "MSVC22-Release-x64",
      "displayName": "Ninja MSVC Release x64",
      "inherits": "MSVC22-x64-base",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Release",
        "CMAKE_RUNTIME_OUTPUT_DIRECTORY": "${sourceDir}/bin/Release",
        "CMAKE_LIBRARY_OUTPUT_DIRECTORY": "${sourceDir}/lib/Release"
      }
    }
  ],
  "buildPresets": [
    {
      "name": "MSVC22-Debug-x64",
      "displayName": "Build Ninja MSVC debug x64",
      "configurePreset": "MSVC22-Debug-x64",
      "jobs": 24
    },
    {
      "name": "MSVC22-Release-x64",
      "displayName": "Build Ninja MSVC release x64",
      "configurePreset": "MSVC22-Release-x64",
      "jobs": 24
    }
  ]
}
```


编译脚本
```sh
@echo off
setlocal

:: 如果没有参数，默认执行 Debug
if "%~1"=="" (
    echo === Build Debug ===
    cmake --preset MSVC22-Debug-x64
    cmake --build --preset MSVC22-Debug-x64
    goto :eof
)

:: 如果参数是 -R，则执行 Release
if /I "%~1"=="-R" (
    echo === Build Release ===
    cmake --preset MSVC22-Release-x64
    cmake --build --preset MSVC22-Release-x64
    goto :eof
)

:: 其他情况：提示错误
echo [ERROR] Unknown parameter: %~1
echo Usage: %~nx0 [-R]
echo   (no args)   -> Debug build
echo   -R          -> Release build

endlocal
```