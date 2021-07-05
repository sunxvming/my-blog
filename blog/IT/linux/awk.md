awk 比 sed 强的地方在于不仅能以行为单位还能以列为单位处理文 件
默认分隔符是连续的空格和Tab
## 格式
```
awk option 'script' file1 file2 ...
awk option -f scriptfile file1 file2 ...
```
script格式为
```
/pattern/{actions}
condition{actions}
```
和 sed 类似， pattern 是正则表达式， actions 是一系列操作。 awk 程序一行一行读出待处理文件，
如果某一行与 pattern 匹配，或者满足 condition 条件，则执行相应的 actions ，如果一条 awk 命令
只有 actions 部分，则 actions 作用于待处理文件的每一行。


处理过程:
```
While(还有下一行) {
    1:读取下一行,并把下一行赋给$0,各列赋给$1,$2...$N变量
    2: 用指定的命令来处理该行
}
```


第1个简单awk脚本
awk  ‘{printf “%s\n” , $1}’ xx.txt    // 把xx.txt的每一行进行输出
排除第一列（打印第2列到最后）：
awk '{$1=""; print $0}'    文件名
排除多列：
awk '{$1=$2=""; print $0}'  文件名