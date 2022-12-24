懂不懂，先装上，这样你就完成了该工具学习的第一步


一、确认powershell版本大于等于5.0
cmd命令行下进入powershell
```
# 确认powershell版本大于等于5.0
PS C:\Users\24305> $psversiontable.psversion.major
```
二、允许powershell执行本地脚本
```
C:\Users\24305> set-executionpolicy remotesigned -scope currentuser
```


三、安装scoop
```
C:\Users\24305> iwr -useb get.scoop.sh | iex
```