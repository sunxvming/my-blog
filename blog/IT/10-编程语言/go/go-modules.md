## go work
当项目中存在多个module的时候可以使用go work的方式以支持多个module的开发
```
In the root path of the workspace
go work init
go work use [folder-name]
```




## GO111MODULE

开启go modules  `go env -w GO111MODULE=auto`
GO111MODULE是 go modules 功能的开关，在没有go modules机制时，go工程中对于第三方功能包的管理非常复杂，也非常专业，这就导致程序员在进行开发的时候，对于第三方功能包的管理很不方便，所以才有了go modules机制。这个机制的开关是通过GO111MODULE环境变量来配置的。


GO111MODULE=off，无模块支持，go命令行将不会支持module功能，寻找依赖包的方式将会沿用旧版本那种通过vendor目录或者GOPATH模式来查找。
GO111MODULE=on，模块支持，go命令行会使用modules，而一点也不会去GOPATH目录下查找。
GO111MODULE=auto，默认值，go命令行将会根据当前目录来决定是否启用module功能。这种情况下可以分为两种情形：
（1）当前目录在GOPATH/src之外且该目录包含go.mod文件，开启模块支持。
（2）当前文件在包含go.mod文件的目录下面。




## golang 自动下载所有依赖包
### 方法一：
大部分情况下大家下载 Go 项目都是使用`go get`命令，它除了会下载指定的项目代码，还会去下载这个项目所依赖的所有项目。
但是有的时候我们的项目由于各种原因并不是通过`go get`下载的，是通过`git clone`下载的，这样代码下下来就没有依赖包了，没办法编译通过的。这样的话怎么办呢？
> ```hljs
> go get -d -v ./...
> ```


* `-d`标志只下载代码包，不执行安装命令；
* `-v`打印详细日志和调试日志。这里加上这个标志会把每个下载的包都打印出来；
* `./...`这个表示路径，代表当前目录下所有的文件。


### 方法二：
`go mod tidy`


go 11以后启用了go mod功能，用于管理依赖包。
当执行go mod init生成go.mod文件之后，golang在运行、编译项目的时候，都会检查依赖并下载依赖包。
在启动了go mod之后，通过go mod下载的依赖包，不在放在GOPATH/src中，而是放到GOPATH/pkg/mod中。

