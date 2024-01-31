## dlv命令的使用
dlv  类似gdb，调试的工具，其命令也和gdb中的类似
启动调试
```
# 编译并调试
dlv debug main.go 
# 调试已经编译好的程序
dlv exec test.exe
```




## vscode断点调试
1. 安装dlv
```
go get -u github.com/go-delve/delve/cmd/dlv@latest
```


2. 在vscode中配置launch.json,vscode可以帮你自动创建
3. 在打开main.go，点击调试按钮，在其他文件运行可能会有错误


配置文件如下
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Package",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${fileDirname}",
            "args": ["app", "state"]
        }
    ]
}
```
如果启动需要加参数，可以在args中配置






## 遇到问题
```
Cannot debug glfw: error reading debug_info: decoding dwarf section line_str at offset 0x0: underflow
```
可能是go的版本和dlv的版本不一致导致的，当时把go和dlv的版本都更新到最新后便解决了。


## 参考链接
- [VS Code 断点调试golang ](https://segmentfault.com/a/1190000018671207)