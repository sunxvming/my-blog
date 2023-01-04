## 二进制工具
###  程序工具
- fresh
go install github.com/pilu/fresh
执行时直接用`fresh`，不用`go run .`


- air
go get -v -u  github.com/cosmtrek/air
比fresh功能稍强一些


- dlv
go的代码调试工具


- staticcheck
go的静态检查工具


- gofmt
gofmt是一个独立的cli程序，而go中还有一个go fmt命令，go fmt命令是gofmt的简单封装。


- golint
Golint 是一个源码检测工具用于检测代码规范。
可以在vscode的go插件的Line Tool中设置中设置是staticcheck、golint以及其他选项


- revive
revive 提供了更多新功能，允许使用 TOML 文件配置 linting 规则，并提供更多规则。


- gotests
自动生成test文件和test方法
在vscode中，选定go文件中的方法右键选择Go:Generate Uint Tests For Function即可生成test方法进行测试。


- godoc、gogetdoc
提取go文档注释的功能，鼠标悬停时显示文档


- goimports
保存的时候自动导入处理包


- gomodifytags 
为结构体添加和去除tag的


- go-outline
Simple utility for extracting a JSON representation of the declarations in a Go source file.


- gopkgs
自动导入依赖的包


- gopls
是Go 团队开发的官方 Go语言服务器。它为任何与LSP兼容的编辑器提供 IDE 功能


- pprof 
性能分析


## 命令行工具
- cobra
Golang 标准库提供了 flag 包能对参数进行解析。但是 flag 包只是一个命令行解析的类库，不支持组织，所以如果想基于 flag 包实现父子命令行工具，显然就不够了。
cobra 是由大名鼎鼎的谷歌工程师 Steve Francia（spf13）开发并开源的一个项目。
cobra 不仅仅能让我们快速构建一个命令行，它更大的优势是能更快地组织起有许多命令行工具，因为从根命令行工具开始，cobra 把所有的命令按照树形结构组织起来了。


## 热更新
- [Hotswap](https://github.com/edwingeng/hotswap),Hotswap 为 go 语言代码热更提供了一套相当完整的解决方案






## http客户端
- [go-resty](https://github.com/go-resty/resty/),readme中有例子用法




## 数据库
- [gorm](https://github.com/go-gorm/gorm)


## 缓存
- [go-redis](https://github.com/go-redis/redis)








## 其他服务
- [gomail](https://github.com/go-gomail/gomail)




## 参考链接
- [vscode-go tools](https://github.com/golang/vscode-go/blob/master/docs/tools.md)

