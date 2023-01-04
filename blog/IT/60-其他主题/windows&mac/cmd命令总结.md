
## 前言

批处理文件（batch file）包含一系列 DOS 命令，通常用于自动执行重复性任务。用户只需双击批处理文件便可执行任务，而无需重复输入相同指令。编写批处理文件非常简单，但难点在于确保一切按顺序执行。编写严谨的批处理文件可以极大程度地节省时间，在应对重复性工作时尤其有效。


> 在 Windows 中善用批处理可以简化很多重复工作


## [](https://wsgzao.github.io/post/windows-batch/#%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95 "更新记录")更新记录


2016 年 03 月 29 日 - 初稿


阅读原文 - [https://wsgzao.github.io/post/windows-batch/](https://wsgzao.github.io/post/windows-batch/)


**扩展阅读**


如何编写批处理文件 - [http://zh.wikihow.com](http://zh.wikihow.com/) / 编写批处理文件 
批处理常用命令总结 - [http://xstarcd.github.io/wiki/windows/windows\_cmd\_summary.html](http://xstarcd.github.io/wiki/windows/windows_cmd_summary.html)


## [](https://wsgzao.github.io/post/windows-batch/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%89%B9%E5%A4%84%E7%90%86 "什么是批处理")什么是批处理


批处理(Batch)，也称为批处理脚本。顾名思义，批处理就是对某对象进行批量的处理。批处理文件的扩展名为 bat。


目前比较常见 的批处理包含两类：DOS 批处理和 PS 批处理。PS 批处理是基于强大的图片编辑软件 Photoshop 的，用来批量处理图片的脚本；而 DOS 批处理则是基于 DOS 命令的，用来自动地批量地执行 DOS 命令以实现特定操作的脚本。这里要讲的就是 DOS 批处理。


批处理是一种简化的脚本语言，它应用于 DOS 和 Windows 系统中，它是由 DOS 或者 Windows 系统内嵌的命令解释器（通常是 [COMMAND.COM](http://command.com/) 或者 CMD.EXE）解释运行。类似于 Unix 中的 Shell 脚本。批处理文件具有. bat 或者. cmd 的扩展名，其最简单的例子，是逐行书写在命令行中会用到的各种命令。更复杂的情况，需要使用 if，for，goto 等命令控制程序的运行过程，如同 C，Basic 等中高级语言一样。如果需要实现更复杂的应用，利用外部程序是必要的，这包括系统本身提供的外部命令和第三方提供的工具或者软件。


批处理文件，或称为批处理程序，是由一条条的 DOS 命令组成的普通文本文件，可以用记事本直接编辑或用 DOS 命令创建，也可以用 DOS 下的文本编辑器 Edit.exe 来编辑。在 “命令提示” 下键入批处理文件的名称，或者双击该批处理文件，系统就会调用 Cmd.exe 运行该批处理程序。一般情况下，每条命令占据一行；当然也可以将多条命令用特定符号（如：&、&&、|、|| 等）分隔后写入同一行中；还有的情况就是像 if、for 等较高级的命令则要占据几行甚至几十几百行的空间。


系统在解释运行批处理程序时，首先扫描整个批处理程序，然后从第一行代码开始向下逐句执行所有的命令，直至程序结尾或遇见 exit 命令或出错意外退出。


## [](https://wsgzao.github.io/post/windows-batch/#%E6%89%B9%E5%A4%84%E7%90%86%E5%91%BD%E4%BB%A4%E7%AE%80%E4%BB%8B "批处理命令简介")批处理命令简介


- echo
- rem
- pause
- call
- start
- goto
- set


[http://xstarcd.github.io/wiki/windows/windows\_cmd\_summary\_commands.html](http://xstarcd.github.io/wiki/windows/windows_cmd_summary_commands.html)


## [](https://wsgzao.github.io/post/windows-batch/#%E6%89%B9%E5%A4%84%E7%90%86%E7%AC%A6%E5%8F%B7%E7%AE%80%E4%BB%8B "批处理符号简介")批处理符号简介


- 回显屏蔽 @
- 重定向 1 >与>>
- 重定向 2 <
- 管道符号 |
- 转义符 ^
- 逻辑命令符包括：&、&&、||


[http://xstarcd.github.io/wiki/windows/windows\_cmd\_summary\_symbols.html](http://xstarcd.github.io/wiki/windows/windows_cmd_summary_symbols.html)


## [](https://wsgzao.github.io/post/windows-batch/#%E5%B8%B8%E7%94%A8-DOS-%E5%91%BD%E4%BB%A4 "常用 DOS 命令")常用 DOS 命令


**文件夹管理**


- cd 显示当前目录名或改变当前目录。
- md 创建目录。
- rd 删除一个目录。
- dir 显示目录中的文件和子目录列表。
- tree 以图形显示驱动器或路径的文件夹结构。
- path 为可执行文件显示或设置一个搜索路径。
- xcopy 复制文件和目录树。


**文件管理**


- type 显示文本文件的内容。
- copy 将一份或多份文件复制到另一个位置。
- del 删除一个或数个文件。
- move 移动文件并重命名文件和目录。(Windows XP Home Edition 中没有)
- ren 重命名文件。
- replace 替换文件。
- attrib 显示或更改文件属性。
- find 搜索字符串。
- fc 比较两个文件或两个文件集并显示它们之间的不同


**网络命令**


- ping 进行网络连接测试、名称解析
- ftp 文件传输
- net 网络命令集及用户管理
- telnet 远程登陆
- ipconfig 显示、修改 TCP/IP 设置
- msg 给用户发送消息
- arp 显示、修改局域网的 IP 地址 - 物理地址映射列表


**系统管理**


- at 安排在特定日期和时间运行命令和程序
- shutdown 立即或定时关机或重启
- tskill 结束进程
- taskkill 结束进程(比 tskill 高级，但 WinXPHome 版中无该命令)
- tasklist 显示进程列表(Windows XP Home Edition 中没有)
- sc 系统服务设置与控制
- reg 注册表控制台工具
- powercfg 控制系统上的电源设置


> 对于以上列出的所有命令，在 cmd 中输入命令 +/? 即可查看该命令的帮助信息。如 find /?


## [](https://wsgzao.github.io/post/windows-batch/#Windows-Batch-%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4 "Windows Batch 常用命令")Windows Batch 常用命令

```
1 echo 和 @ 
回显命令  
@                     #关闭单行回显 
echo off              #从下一行开始关闭回显 
@echo off             #从本行开始关闭回显。一般批处理第一行都是这个 
echo on               #从下一行开始打开回显 
echo                  #显示当前是 echo off 状态还是 echo on 状态 
echo.                 #输出一个” 回车换行”，空白行  
 #(同 < span class="built\_in">echo, echo; echo\+ echo\[ echo\] echo/ echo) 
 
2 errorlevel 
echo %errorlevel% 
 每个命令运行结束，可以用这个命令行格式查看返回码  
 默认值为 < span class="number">0，一般命令执行出错会设 errorlevel 为 < span class="number">1 
 
3 dir 
显示文件夹内容  
dir                  #显示当前目录中的文件和子目录 
dir /a               #显示当前目录中的文件和子目录，包括隐藏文件和系统文件 
dir c: /a:d          #显示 C 盘当前目录中的目录 
dir c: /a:-d         #显示 C 盘根目录中的文件 
dir c: /b/p         #/b 只显示文件名，/p 分页显示 
dir \*.exe /s         #显示当前目录和子目录里所有的. exe 文件 
 
4 cd 
 切换目录  
cd                  #进入根目录 
cd                   #显示当前目录 
cd /d d:sdk         #可以同时更改盘符和目录 
 
5 md 
 创建目录  
md d:abc          #如果 d:a 不存在，将会自动创建中级目录 
\# 如果命令扩展名被停用，则需要键入 mkdir abc。 
 
6 rd 
 删除目录  
rd abc               #删除当前目录里的 abc 子目录，要求为空目录 
rd /s/q d:temp      #删除 d:temp 文件夹及其子文件夹和文件，/q 安静模式 
 
7 del 
 删除文件  
del d:test.txt      #删除指定文件，不能是隐藏、系统、只读文件 
del /q/a/f d:temp\*.\* 
 删除 d:temp 文件夹里面的所有文件，包括隐藏、只读、系统文件，不包括子目录  
del /q/a/f/s d:temp\*.\* 
 删除 d:temp 及子文件夹里面的所有文件，包括隐藏、只读、系统文件，不包括子目录  
 
8 ren 
 重命名命令  
ren d:temp tmp      #支持对文件夹的重命名 
 
9 cls 
 清屏  
 
10 type 
 显示文件内容  
type c:boot.ini     #显示指定文件的内容，程序文件一般会显示乱码 
type \*.txt           #显示当前目录里所有. txt 文件的内容 
 
11 copy 
 拷贝文件  
copy c:test.txt d:test.bak 
 复制 c:test.txt 文件到 d: ，并重命名为 test.bak 
copy con test.txt 
从屏幕上等待输入，按 Ctrl+Z 结束输入，输入内容存为 test.txt 文件  
con 代表屏幕，prn 代表打印机，nul 代表空设备 
copy 1.txt + 2.txt 3.txt 
 合并 1.txt 和 2.txt 的内容，保存为 3.txt 文件  
 如果不指定 3.txt ，则保存到 1.txt 
copy test.txt + 
复制文件到自己，实际上是修改了文件日期  
 
12 title 
 设置 < span class="built\_in">cmd 窗口的标题  
title 新标题         #可以看到 < span class="built\_in">cmd 窗口的标题栏变了 
 
13 ver 
 显示系统版本  
 
14 label 和 vol 
 设置卷标  
vol                  #显示卷标 
label                #显示卷标，同时提示输入新卷标 
label c:system       #设置 C 盘的卷标为 system 
 
15 pause 
 暂停命令  
 
16 rem 和 :: 
 注释命令  
 注释行不执行操作  
 
17 date 和 time 
 日期和时间  
date           #显示当前日期，并提示输入新日期，按 "回车" 略过输入 
date/t         #只显示当前日期，不提示输入新日期 
time           #显示当前时间，并提示输入新时间，按 "回车" 略过输入 
time/t         #只显示当前时间，不提示输入新时间 
 
18 goto 和 : 
 跳转命令  
:label         #行首为: 表示该行是标签行，标签行不执行操作 
goto label     #跳转到指定的标签那一行 
 
19 find (外部命令) 
 查找命令  
find "abc" c:test.txt 
 在 c:test.txt 文件里查找含 abc 字符串的行  
 如果找不到，将设 errorlevel 返回码为 1 
find /i “abc” c:test.txt 
查找含 abc 的行，忽略大小写  
find /c "abc" c:test.txt 
 显示含 abc 的行的行数  
 
20 more (外部命令) 
 逐屏显示  
more c:test.txt     #逐屏显示 c:test.txt 的文件内容 
 
21 tree 
 显示目录结构  
tree d:             #显示 < span class="title">D 盘的文件目录结构 
 
22 & 
 顺序执行多条命令，而不管命令是否执行成功  
 
23 && 
 顺序执行多条命令，当碰到执行出错的命令后将不执行后面的命令  
find "ok" c:test.txt && echo 成功 
 如果找到了 "ok" 字样，就显示 "成功"，找不到就不显示  
 
24 || 
 顺序执行多条命令，当碰到执行正确的命令后将不执行后面的命令  
find "ok" c:test.txt || echo 不成功 
 如果找不到 "ok" 字样，就显示 "不成功"，找到了就不显示  
 
25 | 
 管道命令  
dir \*.\* /s/a | find /c ".exe" 
 管道命令表示先执行 dir 命令，对其输出的结果执行后面的 find 命令  
 该命令行结果：输出当前文件夹及所有子文件夹里的.exe 文件的个数  
type c:test.txt|more 
 这个和 more c:test.txt 的效果是一样的  
 
26 > 和 >> 
 输出重定向命令  
\> 清除文件中原有的内容后再写入 
\>> 追加内容到文件末尾，而不会清除原有的内容 
 主要将本来显示在屏幕上的内容输出到指定文件中  
 指定文件如果不存在，则自动生成该文件  
type c:test.txt >prn 
 屏幕上不显示文件内容，转向输出到打印机  
echo hello world\>con 
 在屏幕上显示 < span class="title">hello world，实际上所有输出都是默认 >con 的  
copy c:test.txt f: >nul 
 拷贝文件，并且不显示 "文件复制成功" 的提示信息，但如果 < span class="title">f 盘不存在，还是会显示出错信息  
copy c:test.txt f: >nul 2>nul 
 不显示”文件复制成功”的提示信息，并且 < span class="title">f 盘不存在的话，也不显示错误提示信息  
echo ^^W ^> ^W\>c:test.txt 
 生成的文件内容为 ^W > W 
^ 和 > 是控制命令，要把它们输出到文件，必须在前面加个 ^ 符号  
 
27 < 
 从文件中获得输入信息，而不是从屏幕上  
 一般用于 date time label 等需要等待输入的命令  
@echo off 
echo 2005-05-01>temp.txt 
date <temp.txt 
del temp.txt 
 这样就可以不等待输入直接修改当前日期  
 
28 %0 %1 %2 %3 %4 %5 %6 %7 %8 %9 %\* 
 命令行传递给批处理的参数  
%0 批处理文件本身 
%1 第一个参数 
%9 第九个参数 
%\* 从第一个参数开始的所有参数 
 
 批参数 (%n) 的替代已被增强。您可以使用以下语法: 
 
 %~1          - 删除引号 (")，扩充 %1 
 %~f1         - 将 %1 扩充到一个完全合格的路径名 
 %~d1         - 仅将 %1 扩充到一个驱动器号 
 %~p1         - 仅将 %1 扩充到一个路径 
 %~n1         - 仅将 %1 扩充到一个文件名 
 %~x1         - 仅将 %1 扩充到一个文件扩展名 
 %~s1         - 扩充的路径指含有短名 
 %~a1         - 将 %1 扩充到文件属性 
 %~t1         - 将 %1 扩充到文件的日期 / 时间 
 %~z1         - 将 %1 扩充到文件的大小 
 %~$PATH : 1 - 查找列在 PATH 环境变量的目录，并将 %1 
 扩充到找到的第一个完全合格的名称。如果环境 
 变量名未被定义，或者没有找到文件，此组合键会 
 扩充到空字符串 
 
 可以组合修定符来取得多重结果: 
 
 %~dp1        - 只将 %1 扩展到驱动器号和路径  
 %~nx1        - 只将 %1 扩展到文件名和扩展名 
 %~dp$PATH:1 - 在列在 PATH 环境变量中的目录里查找 %1， 
 并扩展到找到的第一个文件的驱动器号和路径。 
 %~ftza1      - 将 %1 扩展到类似 DIR 的输出行。 
 可以参照 call/? 或 for/? 看出每个参数的含意  
echo load"%%1""%%2">c:test.txt 
 生成的文件内容为 load "%1" "%2" 
批处理文件里，用这个格式把命令行参数输出到文件  
 
29 if 
 判断命令  
if "%1"=="/a" echo 第一个参数是 /a 
if /i "%1" equ "/a" echo 第一个参数是 /a 
/i 表示不区分大小写，equ 和 == 是一样的，其它运算符参见 if/? 
if exist c:test.bat echo 存在 < span class="title">c:test.bat 文件 
if not exist c:windows ( 
 echo 不存在 < span class="title">c:windows 文件夹 
 ) 
if exist c:test.bat ( 
 echo 存在 < span class="title">c:test.bat 
 ) else ( 
 echo 不存在 < span class="title">c:test.bat 
 ) 
 
30 setlocal 和 endlocal 
 设置”命令扩展名”和”延缓环境变量扩充” 
SETLOCAL ENABLEEXTENSIONS             #启用 "命令扩展名" 
SETLOCAL DISABLEEXTENSIONS            #停用 "命令扩展名" 
SETLOCAL ENABLEDELAYEDEXPANSION       #启用 "延缓环境变量扩充" 
SETLOCAL DISABLEDELAYEDEXPANSION      #停用 "延缓环境变量扩充" 
ENDLOCAL                              #恢复到使用 < span class="title">SETLOCAL 语句以前的状态  
“命令扩展名” 默认为启用  
“延缓环境变量扩充” 默认为停用  
 批处理结束系统会自动恢复默认值  
 可以修改注册表以禁用 "命令扩展名"，详见 cmd /? 。所以用到 "命令扩展名" 的程  
 序，建议在开头和结尾加上 SETLOCAL ENABLEEXTENSIONS 和 ENDLOCAL 语句，以确  
 保程序能在其它系统上正确运行  
"延缓环境变量扩充" 主要用于 if 和 for 的符合语句，在 set 的说明里有其实用例程 
 
31 set 
 设置变量  
 引用变量可在变量名前后加 % ，即 % 变量名 % 
set                     #显示目前所有可用的变量，包括系统变量和自定义的变量  
echo %SystemDrive%      #显示系统盘盘符。系统变量可以直接引用 
set p                   #显示所有以 < span class="title">p 开头的变量，要是一个也没有就设 < span class="title">errorlevel\=1 
set p\=aa1bb1aa2bb2      #设置变量 < span class="title">p，并赋值为 = 后面的字符串，即 < span class="title">aa1bb1aa2bb2 
echo %p%                #显示变量 < span class="title">p 代表的字符串，即 < span class="title">aa1bb1aa2bb2 
echo %p:~6%             #显示变量 < span class="title">p 中第 6 个字符以后的所有字符，即 < span class="title">aa2bb2 
echo %p:~6,3%           #显示第 6 个字符以后的 3 个字符，即 < span class="title">aa2 
echo %p:~0,3%           #显示前 3 个字符，即 < span class="title">aa1 
echo %p:~-2%            #显示最后面的 2 个字符，即 < span class="title">b2 
echo %p:~0,-2%          #显示除了最后 2 个字符以外的其它字符，即 < span class="title">aa1bb1aa2b 
echo %p:aa\=c%           #用 < span class="title">c 替换变量 < span class="title">p 中所有的 < span class="title">aa，即显示 < span class="title">c1bb1c2bb2 
echo %p:aa\=%            #将变量 < span class="title">p 中的所有 < span class="title">aa 字符串置换为空，即显示 1bb12bb2 
echo %p:\*bb\=c%          #第一个 < span class="title">bb 及其之前的所有字符被替换为 < span class="title">c，即显示 < span class="title">c1aa2bb2 
set p\=%p:\*bb\=c%         #设置变量 < span class="title">p，赋值为 %p:\*bb\=c% ，即 < span class="title">c1aa2bb2 
set /a p\=39             #设置 < span class="title">p 为数值型变量，值为 39 
set /a p\=39/10          #支持运算符，有小数时用去尾法，39/10=3.9，去尾得 3，p\=3 
set /a p\=p/10           #用 /a 参数时，在 = 后面的变量可以不加 % 直接引用 
set /a p\=”1&0″          #” 与”运算，要加引号。其它支持的运算符参见 < span class="title">set/? 
set p\=                  #取消 < span class="title">p 变量  
set /p p\= 请输入 
 屏幕上显示”请输入”，并会将输入的字符串赋值给变量 < span class="title">p 
注意这条可以用来取代 choice 命令  
 注意变量在 if 和 for 的复合语句里是一次性全部替换的，如  
@echo off 
set p\=aaa 
if %p%==aaa ( 
 echo %p% 
 set p\=bbb 
 echo %p% 
 ) 
 结果将显示  
aaa 
aaa 
 因为在读取 if 语句时已经将所有 %p% 替换为 < span class="title">aaa 
这里的 "替换"，在 /? 帮助里就是指 "扩充"、"环境变量扩充" 
可以启用”延缓环境变量扩充”，用 ! 来引用变量，即 ! 变量名! 
@echo off 
SETLOCAL ENABLEDELAYEDEXPANSION 
set p\=aaa 
if %p%==aaa ( 
 echo %p% 
 set p\=bbb 
 echo !p! 
 ) 
ENDLOCAL 
结果将显示  
aaa 
bbb 
 还有几个动态变量，运行 set 看不到  
%CD%                   #代表当前目录的字符串 
%DATE%                 #当前日期 
%TIME%                 #当前时间 
%RANDOM%               #随机整数，介于 0~32767 
%ERRORLEVEL%           #当前 ERRORLEVEL 值 
%CMDEXTVERSION%        #当前命令处理器扩展名版本号 
%CMDCMDLINE%           #调用命令处理器的原始命令行 
 可以用 < span class="title">echo 命令查看每个变量值，如 echo %time% 
注意 %time% 精确到毫秒，在批处理需要延时处理时可以用到  
 
32 start 
 批处理中调用外部程序的命令，否则等外部程序完成后才继续执行剩下的指令  
 
33 call 
 批处理中调用另外一个批处理的命令，否则剩下的批处理指令将不会被执行  
 有时有的应用程序用 < span class="title">start 调用出错的，也可以 < span class="title">call 调用  
 
34 choice (外部命令) 
 选择命令  
 让用户输入一个字符，从而选择运行不同的命令，返回码 < span class="title">errorlevel 为 1234…… 
win98 里是 < span class="title">choice.com 
win2000pro 里没有，可以从 < span class="title">win98 里拷过来  
win2003 里是 < span class="title">choice.exe 
choice /N /C y /T 5 /D y\>nul 
 延时 5 秒  
 
35 assoc 和 ftype 
 文件关联  
assoc 设置'文件扩展名'关联，关联到'文件类型' 
ftype 设置'文件类型'关联，关联到'执行程序和参数' 
 当你双击一个.txt 文件时，windows 并不是根据.txt 直接判断用 notepad.exe 打开  
 而是先判断.txt 属于 txtfile '文件类型' 
再调用 txtfile 关联的命令行 txtfile\=%SystemRoot%system32NOTEPAD.EXE %1 
可以在 "文件夹选项"→"文件类型" 里修改这 2 种关联  
assoc            #显示所有'文件扩展名'关联 
assoc .txt       #显示.txt 代表的'文件类型'，结果显示 .txt\=txtfile 
assoc .doc       #显示.doc 代表的'文件类型'，结果显示 .doc\=Word.Document.8 
assoc .exe       #显示.exe 代表的'文件类型'，结果显示 .exe\=exefile 
ftype            #显示所有'文件类型'关联 
ftype exefile    #显示 < span class="title">exefile 类型关联的命令行，结果显示 exefile\="%1" %\* 
assoc .txt\=Word.Document.8 
 设置.txt 为 < span class="title">word 类型的文档，可以看到.txt 文件的图标都变了  
assoc .txt\=txtfile 
 恢复.txt 的正确关联  
ftype exefile\="%1" %\* 
 恢复 exefile 的正确关联  
 如果该关联已经被破坏，可以运行 [command.com](http://command.com/) ，再输入这条命令  
 
36 pushd 和 popd 
 切换当前目录  
@echo off 
c: & cd & md mp3        #在 C: 建立 mp3 文件夹 
md d:mp4                #在 D: 建立 mp4 文件夹 
cd /d d:mp4             #更改当前目录为 d:mp4 
pushd c:mp3             #保存当前目录，并切换当前目录为 c:mp3 
popd                     #恢复当前目录为刚才保存的 d:mp4 
 
37 for 
 循环命令  
 这个比较复杂，请对照 for/? 来看  
for %%i in (c: d: e: f:) do echo %%i 
 依次调用小括号里的每个字符串，执行 do 后面的命令  
 注意 %%i，在批处理中 for 语句调用参数用 2 个 % 
默认的字符串分隔符是 "空格键"，"Tab 键"，"回车键" 
for %%i in (\*.txt) do find "abc" %%i 
对当前目录里所有的 < span class="title">txt 文件执行 find 命令  
for /r . %%i in (\*.txt) do find "abc" %%i 
 在当前目录和子目录里所有的.txt 文件中搜索包含 abc 字符串的行  
for /r . %%i in (.) do echo %%~pni 
 显示当前目录名和所有子目录名，包括路径，不包括盘符  
for /r d:mp3 %%i in (\*.mp3) do echo %%i\>>d:mp3.txt 
 把 d:mp3 及其子目录里的 < span class="title">mp3 文件的文件名都存到 d:mp3.txt 里去  
for /l %%i in (2,1,8) do echo %%i 
 生成 2345678 的一串数字，2 是数字序列的开头，8 是结尾，1 表示每次加 1 
for /f %%i in ('set') do echo %%i 
对 set 命令的输出结果循环调用，每行一个  
for /f "eol\=P" %%i in ('set') do echo %%i 
 取 set 命令的输出结果，忽略以 P 开头的那几行  
for /f %%i in (d:mp3.txt) do echo %%i 
 显示 d:mp3.txt 里的每个文件名，每行一个，不支持带空格的名称  
for /f "delims\=" %%i in (d:mp3.txt) do echo %%i 
 显示 d:mp3.txt 里的每个文件名，每行一个，支持带空格的名称  
for /f "skip\=5 tokens\=4" %%a in ('dir') do echo %%a 
 对 dir 命令的结果，跳过前面 5 行，余下的每行取第 4 列  
 每列之间的分隔符为默认的 "空格" 
可以注意到 dir 命令输出的前 5 行是没有文件名的  
for /f "tokens\=1,2,3 delims\=-" %%a in ('date /t') do ( 
 echo %%a 
 echo %%b 
 echo %%c 
 ) 
 对 date /t 的输出结果，每行取 1、2、3 列  
 第一列对应指定的 %%a ，后面的 %%b 和 %%c 是派生出来的，对应其它列  
 分隔符指定为 - 和 "空格"，注意 delims\=- 后面有个 "空格" 
其中 tokens\=1,2,3 若用 tokens\=1-3 替换，效果是一样的  
for /f "tokens\=2\* delims\=-" %%a in ('date /t') do echo %%b 
 取第 2 列给 %%a ，其后的列都给 %%b 
 
38 subst (外部命令) 
映射磁盘。 
subst z: serverd      #这样输入 < span class="title">z: 就可以访问 < span class="title">serverd 了  
subst z: /d              #取消该映射 
subst                    #显示目前所有的映时 
 
39 xcopy (外部命令) 
 文件拷贝  
xcopy d:mp3 e:mp3 /s/e/i/y 
 复制 d:mp3 文件夹、所有子文件夹和文件到 e: ，覆盖已有文件  
 加 /i 表示如果 e: 没有 mp3 文件夹就自动新建一个，否则会有询问
```

