## 安装vscode Go工具包

在 VS Code 中，使用快捷键：command+shift+P，然后键入：go:install/update tools，将所有插件都勾选上，然后点击 OK 即开始安装。


可以在这里查看到 vscode-go 插件使用的所有工具列表：https://github.com/golang/vscode-go/blob/master/docs/tools.md，将依赖的工具大概分成了 4 大类：工具链、文档类、格式化类和诊断类。


最终下载的go工具会在这个目录下`C:\Users\DELL\go\bin`





```
// 自动完成未导入的包。
"go.autocompleteUnimportedPackages": true,
```





