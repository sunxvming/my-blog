## vscode账号

用的是microsoft登录，登录的账号是gmail


## 设置硬件加速
1. 系统 >屏幕 > 显示卡 > 选择vscode，设置成高性能
2. 设置中搜索gpu，然后开启gpu
## 常见问题

### vscode 全局搜索ctrl+shift+f无效
是因为和搜狗输入法的简繁切换快捷键冲突了，关掉就好了，也有人是网易云音乐快捷键问题

### 智能提示快捷键`ctrl+space`被输入法占用

`ctrl+space`是windows系统自带的切换输入法的快捷键，在：设置>时间和语言>输入>高级键盘设置>输入语言热键 中可以进行修改。

可以把智能提示弹出框设置为`alt+/` 

设置`tab`键来上下切换智能提示
```
[
    {
        "key": "tab",
        "command": "acceptSelectedSuggestion",
        "when": "suggestWidgetVisible && textInputFocus"
    },
    {
        "key": "shift+tab",
        "command": "acceptSelectedSuggestion",
        "when": "suggestWidgetVisible && textInputFocus"
    },
    {
        "key": "tab",
        "command": "selectNextSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    },
        {
        "key": "shift+tab",
        "command": "selectPrevSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    }
]
```


## 快捷键
打开的命令面板了，输入 `shortcuts` 可查看快捷键 

快捷键设置
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/a4506184-9100-4a13-93c2-d8607d1bccbd.png)
右上角的红圈可以打开json的配置



| 类别      | 快键键                               | 功能                    | 备注                                   |
| --------- | ------------------------------------ | ----------------------- | -------------------------------------- |
| 常用操作  | ctrl + f   ctrl + shift + f          | 查找                    |                                        |
|           | ctrl + h  ctrl + shift + h           | 替换                    |                                        |
|           | "ctrl + \`"                          | 显示console             | -                                      |
|           | F1 或 ctrl + shift + P               | 打开的命令面板了        | -                                      |
|           | ctrl + F4                            | 关闭标签                | -                                      |
|           | ctrl + N                             | 新建                    | -                                      |
|           | ctrl + Tab                           | 切换选项卡              | -                                      |
|           | esc                                  | 关闭搜索栏              | -                                      |
|           | ctrl + .                             | 显示代码操作            | 若不好使，可能是被输入法中的热键占用了 |
|           | alt + Z                              | 行过长的时候自动折行    | -                                      |
|           | shift + alt + F                      | 代码格式化              | -                                      |
|           | alt + /                              | 代码提示                | -                                      |
|           | alt + shift + /                      | copilot代码提示         | -                                      |
|           | ctrl + L                             | clear终端               | 需要自己设置                           |
| 删除      | ctrl + Backspace                     | 删除左边的单词          | -                                      |
|           | ctrl + Delete                        | 删除右边的单词          | -                                      |
|           | ctrl + shift + k                     | 删除当前行              | -                                      |
|           | ctrl + KJ                            | 删至行首                | -                                      |
|           | ctrl + KK                            | 删至行尾                | -                                      |
| 光标/移动 | ctrl + shift + enter                 | 光标插入上一行          | -                                      |
|           | ctrl + enter                         | 光标插入下一行          | -                                      |
|           | ctrl + ←/→                           | 按单词向左/右移动光标   | -                                      |
|           | alt + ←/→                            | 移到上/下一个光标处     | -                                      |
|           | ctrl + shift + \                     | 按括号移动光标          | -                                      |
|           | ctrl + ↑/↓                           | 向上/下移动当前行       | -                                      |
|           | alt + ↑/↓                            | 行上/下移               | -                                      |
|           | alt + 滚轮                           | 快速的滚动              | -                                      |
|           | shift + 滚轮                         | 左右滚动                | -                                      |
|           | home/end                         | 移动到行首/尾                | -                                      |
|           | ctrl + home/end                         | 移动到文档首/尾                | -                                      |
|           | PgUp/PgDn                         | 上下翻页                | -                                      |
|           | ctrl + PgUp/PgDn                         | 切换tab                | -                                      |
| 选中操作  | shift + ↑/↓                          | 按行选中                | -                                      |
|           | shift + ←/→                          | 进行逐字选择            | -                                      |
|           | shif + ctrl + ←/→                    | 进行逐词选择            | -                                      |
|           | ctrl + shift + alt + ↑/↓ 或 鼠标中键 | 列选择快捷键            | -                                      |
|           | double click                         | 选单词                  | -                                      |
|           | triple click                         | 选行                    | -                                      |
|           | ctrl + w      ctrl + shift + w       | 扩展选区的范围          | ExpandRegion插件                       |
| 编辑      | ctrl + shift + U/L                   | 转大/小写，需要自己设置 | -                                      |
|           | ctrl + /                             | 增加/去除注释           | -                                      |
|           | ctrl + [/]                           | 减少/增加缩进           | -                                      |
|           | ctrl + shift + [/]                   | 折叠/展开代码块         | -                                      |
| c++ 相关  | alt + o                              | 头文件源文件切换        | -                                      |
| vim相关   | jj + shift + o                       | 光标插入上一行          | -                                      |
|           | jj + o                               | 光标插入下一行          | -                                      |
|           | ctrl + d                             | 向下翻页                | -                                      |
|           | ctrl + u                             | 向上翻页                | -                                      |
|           | Shift + []                             |  是以「代码块」为单位跳行                | -                                      |
|           | a/i/o  shift + a/i/o                 | 换成插入模式            |                                        |
|           | 15gg                                 | 跳到15行                |                                        |
| bookmark  | ctrl + alt + k                       | 打书签                  | -                                      |
|           | ctrl + alt + J                       | 上一个书签              | -                                      |
|           | ctrl + alt + L                       | 下一个书签              | -                                      |


## 设置
保存时去掉尾部空格
tab替换四个空格
VSCode 打开文件始终在新标签页打开
```
"workbench.editor.enablePreview": false,
```

设置vscode命令行其缓冲区中保留的最大行数
settings中搜索 `Scrollback`


【主题】
sublime mariana 浅黑色的主题
Tiny Light   一款还原Hbuilder“绿柔”主题的vs code主题




## 插件
* Alignment 按等号对齐 alt + =
* Markdown 似乎是自带的
* ExpandRegion 扩展选区的 ctrl + w ctrl + shift + w
* Clipboard-history Ctrl+Shift+V 复制的历史记录
* Peacock
可以设置窗口为不同的颜色，方便区分不同项目
使用此插件后，会在打开的每个项目内创建 .vscode/setting.json文件，
这样不同项目才会生效

* Bracket Pair Colorizer  彩色括号
* Indent Rainbow  彩虹缩进
* Project Manager   
	* 管理多个工程的并且还可以根据tag来进行类别的划分
* GitLens
	* 显示当前代码的最后提交历史
* Bookmarks    

## python
安装python插件，在插件中搜索python，安装星最多的。
按照插件中的说明，设置python的开发环境。

jupyter插件，可以直接在vscode启动jupyter


## vim插件
【设置打开文件的时候我insert mode】
"vim.startInInsertMode": true


【vim不覆盖vscode快捷键】
文件 --> 首选项 --> 设置 -- >扩展 --> vim --> vim.useCtrlkeys  取消勾选

【使用windows剪切板】
文件 --> 首选项 --> 设置 -- >扩展 --> vim --> vim.useSystemClipboard

【插入模式下键位修改】
文件->首选项->设置->文本编辑器，向下拉找到“在setting.json中编辑”
添加到配置的底部
```
    "vim.insertModeKeyBindings": [
        {
            "before": ["j", "j"],
            "after": ["<Esc>"]
        }
    ]
```

【设置vim的某些快捷键不生效】
```
    "vim.handleKeys": {
        "<C-h>": false,
        "<C-f>": false,
        "<C-a>": false,
        "<C-c>": false,
        "<C-v>": false,
        "<Esc>": false,
    }
```


## c++工程配置文件
配置文件位置：.vscode
c++的配置：c_cpp_properties.json
文档：https://code.visualstudio.com/docs/cpp/config-mingw
```
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**",
                "${workspaceFolder}/../llvm-6.0.0.src/include/**",
                "${workspaceFolder}/../eosio.cdt/libraries/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE",
                "WAVM_API="
            ],
            "compilerPath": "C:/mingw-w64/mingw32/bin/g++.exe",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "gcc-x64"
        }
    ],
    "version": 4
}
```



## 设置
快捷键
```
// Place your key bindings in this file to override the defaultsauto[]
[
    {
        "key": "alt+oem_2",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
    },
    {
        "key": "ctrl+space",
        "command": "-editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
    },

    {
        "key": "tab",
        "command": "acceptSelectedSuggestion",
        "when": "suggestWidgetVisible && textInputFocus"
    },
    {
        "key": "shift+tab",
        "command": "acceptSelectedSuggestion",
        "when": "suggestWidgetVisible && textInputFocus"
    },
    {
        "key": "tab",
        "command": "selectNextSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    },
        {
        "key": "shift+tab",
        "command": "selectPrevSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    }


]
```

全局设置
```
{
    "workbench.editorAssociations": {
        "*.ipynb": "jupyter.notebook.ipynb"
    },
    "workbench.colorTheme": "Tiny Light",
    "window.zoomLevel": 1,
    "vim.useSystemClipboard": true,
    "vim.useCtrlKeys": false,
    "editor.codeActionsOnSave": null,

    "vim.insertModeKeyBindings": [
        {
            "before": ["j", "j"],
            "after": ["<Esc>"]
        }
    ],
    "vim.handleKeys": {
        "<C-h>": false,
        "<C-f>": false,
        "<C-a>": false,
        "<C-c>": false,
        "<C-v>": false
    },
    "workbench.editor.enablePreview": false

}
```




## 字体设置
Consolas, 'Courier New', monospace




## 清除终端
设置 - > keyboard Shortcuts -> 搜索 "workbench.action.terminal.clear" ，然后设置快捷键 ctrl + L，和linux保持一致。

