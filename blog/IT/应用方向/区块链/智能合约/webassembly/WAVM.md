## WAVM
[WAVM](https://github.com/WAVM/WAVM) is a WebAssembly virtual machine, designed for use in non-web applications.Its implementation depends on LLVM.
此项目是一个个人的项目，大部分代码由一个人开发完成，它作为一个学习WebAssembly、编译原理和llvm的一个项目还是不错的。

### 编译wavm
编译文档：Doc/Building.md

```
cmake3 ..  -G "Unix Makefiles" -DLLVM_DIR=/data/llvm-6.0.0.src/build/lib/cmake/llvm
make -j4
```

### 编译llvm
编译llvm，编译版本用release的，要不然编译的文件会很大
```
cmake3  -DCMAKE_BUILD_TYPE=Release -G "Unix Makefiles" ..
make -j4
```


### 运行WAVM中的例子
```
wavm run helloworld.wast
wavm run zlib.wasm
wavm run trap.wast
wavm run echo.wast "Hello, world!"
wavm run helloworld.wast | wavm run examples/tee.wast
wavm run --enable simd blake2b.wast
wavm assemble test.wast test.wasm
wavm disassemble hello.wasm hello.wast
```


### WebAssembly后缀类型
WebAssembly text file: WAST/WAT
WebAssembly binary file: WASM




### 编译 C/C++ 为 WebAssembly
教程资源
* MDN
https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm
* Emscripten
https://emscripten.org/docs/getting_started/
* Outside the web: standalone WebAssembly binaries using Emscripten
https://v8.dev/blog/emscripten-standalone-wasm
* wasi文档
https://github.com/WebAssembly/WASI/


### 把c++代码编译成wasm并用wavm运行
```
#include <stdio.h>

int main(int argc, char ** argv) {
  printf("Hello World\n");
}
```


```
# 编译为wasm
emcc -O3 hello.c -o hello.wasm


# 用wavm运行wasm
wavm run hello.wasm
```