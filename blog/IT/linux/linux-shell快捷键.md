bash的命令行有很多好用的快捷键操作，使用好了可以少敲好多次键盘。

Bash 默认为 emacs 编辑模式。如果你的 Bash 不在 emacs 编辑模式，可通过`set -o emacs`设置。

`tab`        命令和路径补齐

## 控制命令
`Ctrl-L`        清屏
`Ctrl-C`        取消本次命令编辑
`Ctrl + z`      转到后台运行，`fg`恢复。
`Ctrl + c`      终止当前正在执行的命令
`Ctrl + d`      退出当前 Shell




## 光标移动
`Ctrl-p`         previous
`Ctrl-n`         next
`Ctrl-b`         backward
`Ctrl-f`         forward

`Alt-f`            前移一个单词
`Alt-b`          后退一个单词

`Ctrl-a`         移动到行首
`Ctrl-e`         移动到行尾

## 文本修改
`Ctrl-d`         delete光标后面的
`ctrl-h`         删除光标前边的
`Ctrl + w`       从光标处删除至字首
`Ctrl-U`         清空至行首
`Ctrl-K`         清空至行尾
`Ctrl + y`       粘贴至光标后


## 其他
`Ctrl-r`         搜索某个历史记录，  `ctrl-f` 选中命令
`Ctrl + g`        从历史搜索模式退出
`history`        历史记录

反斜杠`\`     强制换行