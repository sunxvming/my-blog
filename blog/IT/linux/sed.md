sed 意为流编辑器（Stream Editor），在Shell脚本和Makefile中作为过滤器使用非常普遍，也就
是把前一个程序的输出引入sed的输入，经过一系列编辑命令转换为另一种格式输
出。 sed 和 vi 都源于早期UNIX的 ed 工具，所以很多 sed 命令和 vi 的末行命令是相同的
sed基本上就是玩正则模式匹配，所以，玩sed的人，正则表达式一般都比较强。


## 格式
sed 命令行的基本格式为
```
sed option 'script' file1 file2 ...
sed option -f scriptfile file1 file2 ...
```
script的格式为：/pattern/action
pattern为正则表达式，默认使用Basic正则表达式规范
sed程序一行一行读出待处理文件，如果某一行 与 pattern 匹配，则执行相应的 action ，如果一条命令没有 pattern 而只有 action ，
这个 action 将 作用于待处理文件的每一行。


## 模式
* /pattern/p 
打印匹配 pattern 的行
* /pattern/d 
删除匹配 pattern 的行
 sed 命令不会修改原文件，删除命令只表示某些行不打印输出，而不是从原文件中删去
* /pattern/s/pattern1/pattern2/
查找符合 pattern 的行，将该行第一个匹 配 pattern1 的字符串替换为 pattern2
* /pattern/s/pattern1/pattern2/g
查找符合 pattern 的行，将该行所有匹 配 pattern1 的字符串替换为 pattern2
 sed "s/my/Hao Chen's/g" pets.txt
默认是打印改变的内容，不改变原文件，可以使用文件重定向，也可以 使用-i直接改变文件内容 sed -i "s/my/Hao Chen's/g" pets.txt     


## sed的命令
### a命令和i命令
a命令就是append， i命令就是insert，它们是用来添加行的。如：
```
# 第二行之前插入aaaaa
sed '2i aaaaaa' test.txt
# 第二行之前插入aaaaa
sed '2a aaaaaa' test.txt
# 注意其中的/fish/a，这意思是匹配到/fish/后就追加一行
sed"/fish/a This is my monkey, my monkey's name is wukong"my.txt
```


## 正则表达式的东西：
* `^` 表示一行的开头。如：`/^#/` 以#开头的匹配。
* `$` 表示一行的结尾。如：`/}$/` 以}结尾的匹配。
* `\<` 表示词首。 如 `\<abc` 表示以 abc 为首的詞。
* `\>` 表示词尾。 如 `abc\>` 表示以 abc 結尾的詞。
* `.` 表示任何单个字符。
* `*` 表示某个字符出现了0次或多次。
* `[ ]` 字符集合。 如：[abc]表示匹配a或b或c，还有[a-zA-Z]表示匹配所有的26个字符。如果其中有^表示反，如[^a]表示非a的字符


## 多个匹配
如果我们需要一次替换多个模式，如：第一个模式把第一行到第三行的my替换成your，第二个则把第3行以后的This替换成了That
```
sed '1,3s/my/your/g; 3,$s/This/That/g'my.txt
```
上面的命令等价于：（注：下面使用的是sed的-e命令行参数）
```
sed -e '1,3s/my/your/g' -e '3,$s/This/That/g' my.txt
```




【在每一行最前面加点东西】
```
sed 's/^/#/g' trans.sh
```
【在每一行最后面加点东西】
```
sed 's/$/#/g' trans.sh
```
【指定行数的替换：只替换2到3行内容】
```
sed "2,3s/#/abcde/g" trans.sh
```
【最后一行添加文字】
```
sed '$a\wwwwww' test.txt
```
$ 匹配文件的最后一行位置
a 命令在后面append


【删除最后一行】
```
sed  '$d'  test.txt
```


【删除指定模式】
```
sed -i '/^.host:/d' /etc/fstab 
```
【只替换每一行的第一个匹配的a】
```
sed 's/a/A/1' test.txt
```
把1替换成2就是第二个，3g就是替换第3个以后匹配的



