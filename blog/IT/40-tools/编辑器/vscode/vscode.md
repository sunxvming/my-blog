## vscode账号

用的是microsoft登录，登录的账号是gmail




## 常见问题

### vscode 全局搜索ctrl+shift+f无效
是因为和搜狗输入法的简繁切换快捷键冲突了，关掉就好了，也有人是网易云音乐快捷键问题

### 智能提示快捷键`ctrl+space`被输入法占用
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
快捷键设置
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/a4506184-9100-4a13-93c2-d8607d1bccbd.png)
右上角的红圈可以打开json的配置

ctrl +`` 显示console
F1 或 Ctrl+Shift+P 打开的命令面板了
行过长的时候自动折行: alt + Z
ctrl+.(显示代码操作）   若不好使，可能是被输入法中的热键占用了

列选择快捷键   Alt+Shift+左键,  shift+ctrl+alt+up/down

按住shift滚动滚轮可实现左右滚动
代码格式化： Shift+Alt+F
Ctrl + Tab 切换选项卡
头文件源文件切换 alt+o
ctrl + F4    关闭标签
新建 Ctrl + N
查找 ctrl + f Ctrl+Shift +f
替换 ctrl + h Ctrl+Shift +h
注释 Ctrl + /


删除一行 Ctrl+ Shift +k
删至行首 Ctrl+K Backspace
删至行尾 Ctrl+KK


移到上一个光标处 alt + 左箭头
移到下一个光标处 alt + 右箭头
光标插入上一行 ctrl + shift + enter
光标插入下一行 ctrl + enter
行上移 alt 上
行下移 alt 下
按括号移动光标


选单词 双击
选本行 三击
Ctrl + Shift + ←/→ 进行逐词选择
Shift-上下箭头 按行选中
竖向多行选择 鼠标中键


改为大写 Ctrl+K+U
改为小写 Ctrl+K+L
折叠所有 ^k 1
展开所有 ^k J


esc 关闭（隐藏）搜索栏
设置书签 todo






## 设置
保存时去掉尾部空格
tab替换四个空格
VSCode 打开文件始终在新标签页打开
```
"workbench.editor.enablePreview": false,
```



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
* Indent Rainbow 彩虹缩进
* Project Manager   管理多个工程的
并且还可以根据tag来进行类别的划分
* GitLens   显示当前代码的最后提交历史

## python
安装python插件，在插件中搜索python，安装星最多的。
按照插件中的说明，设置python的开发环境。

jupyter插件，可以直接在vscode启动jupyter


## vim插件
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

