在图形化界面下的shell中，用 emacs 命令默认会打开一个图形化的新窗口，用 emacs -nw 命令会直接在shell中打开emacs。
但是每次都要加上 -nw 很麻烦，所以希望 emacs 命令就能直接在shell中运行emacs（可能是我比较死脑筋）。
方法就是用 alias 把emacs命令替换掉，添加到./bashrc中
 # alias emacs='emacs -nw'

