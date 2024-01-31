enca是Linux下的文件编码转换工具。 enca可能 encoding  Character的缩写。

## 查看文件编码
```
enca -L zh_CN filename
//或
enca filename
```
查看所有
```
enca -L zh_CN `ls`
```

## 编码转换
将当前目录下的所有文件的字符编码转换为 UTF-8 编码
```
enca -L zh_CN -x utf-8 *
//或
enca -x utf-8 *
```