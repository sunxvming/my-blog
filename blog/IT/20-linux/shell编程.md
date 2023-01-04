【参数处理】
shift 命令用于对参数的移动(左移)

向文件追加内容
```
# 向test.txt 文件末尾追加"zzzzzz"
cat >>test.txt<<EOF
zzzzzz
EOF
```


分号是多个语句之间的分隔符
```
if [ XX]; then
它完全等效于下面的两句：
if [ XX]
then
```
```
${var}基本上等价于$var
第一个严谨一些，第二个：
比如$1...$9这个没区别，但是$10呢，${var}的这种就是${10}
而$var却是$10是$1后边带个0。
```


【得到了脚本所在目录的绝对路径】
方法一：
```
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# 上述命令的解释
S0="${BASH_SOURCE[0]}"                    # 得到脚本相对于当前目录的路径，是相对路径
DIRNAME="$( dirname "$S0")"               # 得到脚本的目录名，是相对路径 
DIR="$( cd "$DIRNAME" && pwd)"        # 用cd命令切换到脚本所在目录，再执行pwd命令，
```

方法二：
```
SHDIR=$(dirname `readlink -f $0`)
```


【批量解压】
```
# 解压到的是当前文件夹下
for i in `ls *.tar.gz`
do 
tar zxvf $i
done
```
```
# 解压到的是当前文件夹下
for tar in `find /data/kbzy-bak   -name *.gz`

do
tar zxvf $tar    #犯了个错误，都解压在当前文件夹下来，相同的文件被覆盖掉了
done
```
```
# 解压到tar包所在的目录
for tar in `find /data/kbzy-bak   -name *.gz`
do
echo "processing--->"${tar}

tar zxvf $tar  -C  `dirname $tar `         //解压到它所在的目录
done
```


【生成序列数】
```
s=''

space=' '
for((date=20160615;date<=20160630;date++))
do 
s=${s}' "'${date}'"'
done
echo $s
"20160615" "20160616" "20160617" "20160618" 

```



