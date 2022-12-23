当编译时包含cgo的第三方库代码时编译时提示
```
build constraints exclude all Go files
```
加上如下的编译环境变量参数即可解决
```
CGO_ENABLED=1
```