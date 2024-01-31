#!/bin/bash



# 查看所指定文件的编码格式
# find . -type f -iname '*.md' -exec file -i {} \;



# find命令解释
# -type f 查找type为普通类型的文档。
# -iname  按照名字找，且忽略大小写 
# -exec 执行之后的命令


# sh命令解释 
# sh命令后的-- 表示后面跟的是参数，类似于shell脚本的参数
# sh -c 'echo $0 $1 $2' -- aa bb
# 输出：-- aa bb



find . -type f -iname '*.md' -exec sh -c 'iconv -f $(file -bi "$1" |sed -e "s/.*[ ]charset=//") -t utf-8 -o /tmp/converted "$1" && mv /tmp/converted "$1" ' -- {} \;

