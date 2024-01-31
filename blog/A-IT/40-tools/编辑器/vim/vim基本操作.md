![20130614153609171.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20130614153609171.png)



vim编辑器3种模式:命令模式、编辑模式、尾行模式


## 插入模式
* i 在光标处插入  I 在一行前插入
* a  在光标后插入  A在一行最后插入
* o  在当前行后插入一个新行  O  在当前行前插入一个新行
* cw  删除当前光标之后的一个word，并插入。C删除到末尾。  c还可以配合 e b 0 $等，cc替换当前行
* s 清除当前光标对应的字符,并进入编辑模  S 清除当前行，并进入编辑模式,功能等同于cc
* r + 字符   替换光标处的字符， R 可连续替换多个字符

## 光标移动

上下左右移动 kjhl

【单词级移动】
* w  移到下个单词首 W  移到下个单词首，按空格分。
* e  移到本单词尾  E  移到本单词尾，按空格分。
* b  移到本单词首  B 移到本单词首，按空格分。

【行级移动】
* 0  数字零，到行头
* $  到本行行尾
* ^  到本行第一个不是blank字符的位置（所谓blank字符就是空格，tab，换行，回车等）
* g_  到本行最后一个不是blank字符的位置。用的不多。

【句和段移动】
( 和 ) 移到上一句和下一句
{ 和 } 移到上一段和下一段

【屏级移动】
H  移到本屏幕第一行
L  移到本屏幕最后一行

【文章级移动】
G  移到文章末尾
gg  移到文章开头
NG 或 Ngg 或 :N    到第 N 行      
:set nu  显示行号
查看当然光标所在的行    Ctrl+g

【其他光标移动】
`%` : 匹配括号移动，包括 `(, {, [`. （使用时需要把光标先移到括号上）
`*` 和 `#`: 匹配光标当前所在的单词，移动光标到下一个（或上一个）匹配单词,类似于查找上一下下一个单词


zz: 将当前行置于屏幕中间
zt: 将当前行置于屏幕顶端
zb：将当前行置于屏幕底端

ctrl-e  屏幕向下移
ctrl-y  屏幕向上移

gd - Go to definition, 跳转到定义。

【光标移动+命令】
你一定要记住光标的移动，因为很多命令都可以和这些移动光标的命令连动。很多命令都可以如下来干：

```
<start position><command><end position>
```

例如 `0y$` 命令意味着：
0  先到行头
y  从这里开始拷贝
$  拷贝到本行最后一个字符
你可可以输入 `ye`，从当前位置拷贝到本单词的最后一个字符。



## 删除
d + 光标快捷移动键,   光标跳到哪儿,就能快速删到哪.  
x 删除当前字符
daw  删除一个word， delete  a word
dd 删除一行
d$  删除到行尾   D删除到行尾
全部删除：按esc键后，先按gg（到达顶部），然后dG




## 复制
yy 复制一行
y3y 3yy 复制3行
y + 快捷移动键快速复制
yiw  复制当前单词，viwp替换其他地方的第一个单词，viw"0p替换其他地方第n个出现的单词     iw表示inner word
全部复制  ggyG  :%y

v + 光标快捷移动键 + y

v代表可视化的选择,选中之后可以复制，删除，变大小写等
ctrl + v 按块选择
V 大写v， 选择当前行

下面的命令也会被复制：d (删除 )， v (可视化的选择)

## 可视模式
v代表可视化的选择,选中之后可以复制，删除，变大小写等
变大小写  `~`
增加缩进` > `
减少缩进` < `



【复制替换操作】
`yiw`  `ciw<C-r>0`    `.`  `.`代表重复替换之前的
参考： [Replace a word with yanked text](https://vim.fandom.com/wiki/Replace_a_word_with_yanked_text)


粘贴  p
p/P都可以，p是表示在当前位置之后，P表示在当前位置之前

u  undo  U 撤销当前行的修改
`<C-r>  redo

## 重复
N<command>  重复某个命令N次
2dd 或d2d 删除2行
3p  粘贴文本3次
10 i abc [ESC]  会写下 “abc abc abc abc abc abc abc abc abc abc“
.  重复上一个命令

## 替换
r + 字符   替换光标处的字符
R 可连续替换多个字符

## 有效的命令组合
xp 交换两个字符
ddp  交换两行

u  撤消
J  合并两行
gU (变大写)
gu (变小写)




## 保存/退出/改变文件(Buffer)
* :e <path/to/file>  打开一个文件
* :w  存盘
* :saveas <path/to/file>  另存为 <path/to/file>
* :x， ZZ 或 :wq  保存并退出 (:x 表示仅在需要时保存，ZZ不需要输入冒号并回车)
* :q!  退出不保存 :qa! 强行退出所有的正在编辑的文件，就算别的文件有更改。
* :bn 和 :bp  你可以同时打开很多文件，使用这两个命令来切换下一个或上一个文件。
:wq  存盘 + 退出 (:w 存盘, :q 退出)




## 查找

查找当前单词  `*  #`
按下`g*`即可查找光标所在单词的字符序列，每次出现前后字符无要求。 即foo bar和foobar中的foo均可被匹配到。

/pattern  搜索 pattern 的字符串,n查找下一个  N查找上一个
？进行反向查找
要回到您之前的位置按 CTRL-O (按住 Ctrl 键不放同时按下字母 o)。重复按可以回退更多步。CTRL-I 会跳转到较新的位置。

Vim查找支持正则表达式，例如`/vim$`匹配行尾的"vim"。 需要查找特殊字符需要转义，例如`/vim\$`匹配`vim$`。

大小写敏感查找
在查找模式中加入\c表示大小写不敏感查找，\C表示大小写敏感查找。例如：
/foo\c  将会查找所有的"foo","FOO","Foo"等字符串。


## 替换
`s（substitute）`令用来查找和替换字符串。语法如下：

`{作用范围}s/{目标}/{替换}/{替换标志}`
例如:%s/foo/bar 会在全局范围(%)查找foo并替换为bar

i表示大小写不敏感查找，I表示大小写敏感：
`%s/foo/bar/i`
等效于模式中的\c（不敏感）或\C（敏感）
`%s/foo\c/bar`

当光标就在那个单词上的话，可以在敲完%s/之后使用如下组合命令将它粘贴到命令里
`<Ctrl+R> <Ctrl+W>`

## 在 VIM 内执行外部命令的方法
:!ls <回车>


## 分屏操作
:sp  上下分屏,后可跟文件名
:vsp 左右分屏,后可跟文件名   或ctrl+w v
Ctr+w+w: 在多个窗口切换

vim -O file1 file2 ...  垂直分屏
vim -o file1 file2 ... 水平分屏

## 多窗口
“:tabnew”，新建一个编辑窗口，也就是支持多标签操作，多个标签可以用“gt”切换。


“Ctrl+P”是 vi 内置的“代码补全”功能，对我们程序员来说特别有用。只要写上开头
的一两个字符，再按“Ctrl+P”，vi 就可以提示出文件里曾经出现的词，这样，在写长名
字时，就再也不用害怕了。
不过，vi 的“代码补全”功能还是比较弱的，不是基于语法分析，而是简单的文本分词，

可以随时用“Ctrl+Z”暂停 vi，把它放到后台，然后执行各种 Shell 操作，在需要的时
候，只要敲一个“fg”命令，就可以把 vi 恢复回来。这在调试的时候非常有用，改改代码，运行一下，看看情况再切回来继续改，不用每次重复
vi 打开源文件，而且可以保留编辑的“现场”。

`:r FILENAME` 可提取磁盘文件 FILENAME 并将其插入到当前文件的光标位置后面

## 代码编辑
za是打开/关闭折叠， zf%是对匹配的内容创建折叠

## vimrc基本配置
```
"==================="
" 最简配置"
"==================="
set nu "显示行号"
sy on "语法高亮"
set ruler "显示当前光标位置"
set smartindent  "为C程序提供自动缩进"
set shiftwidth=4  "当使用移动(shift)命令时移动的字符数"
set tabstop=4  "设置制表停止位(tabstop)的长度"
set expandtab  "设置用空格代替tab"
set listchars=tab:>-,trail:~  "设置不可见字符显示符号"
set nolist  "不显示非可见字符"
set pastetoggle=<F9> "插入模式 和 插入(粘贴) 模式中切换, 防止从windows复制过来时多出好多缩进"
set showcmd"显示连续指令

"==================="
"1.基本设置"
"==================="
set nocp "使用vim而非vi"
set wildmenu "按TAB键时命令行自动补齐"
set ignorecase "搜索时不区分大小写，用:set ignorecase 命令。使用 :set noignorecase 恢复区分大小写。还可以使用简写（:set ic 和 :set noic）"
set visualbell "禁止响铃"
set autoread "文件在Vim之外修改过，自动重新读入"
set autowrite "设置自动保存内容"
set autochdir "当前目录随着被编辑文件的改变而改变"
set mouse=a "开启鼠标支持"
map 9 $"通过9跳转到行末尾,0默认跳转到行首"
map <silent>  <C-A>  gg v G"Ctrl-A 选中所有内容"
inoremap jj <ESC>
filetype on "启动文件类型检查,根据文件的类型，进行不同的操作"
filetype plugin on "运行vim加载文件类型插件"

"==================="
" 程序开发相关的设置"
"==================="
set foldmethod=marker



"================="
" 当前文件内搜索选项"
"================="
set hlsearch "开启搜索结果的高亮显示"
set incsearch "边输入边搜索(实时搜索)"


"=========================="
" 不要交换文件和备份文件，减少冲突"
"=========================="
set noswapfile
set nobackup
set nowritebackup

```





## 参考链接
- [简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html),by 酷壳 – CoolShell
- [Vim实用技巧](https://book.douban.com/subject/25869486/),by Drew Nei
- [Vim 配置入门](http://www.ruanyifeng.com/blog/2018/09/vimrc.html),by 阮一峰