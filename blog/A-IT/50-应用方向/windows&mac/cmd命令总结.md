
> 在 Windows 中善用批处理可以简化很多重复工作


**文件夹管理**

- cd 显示当前目录名或改变当前目录。
- md 创建目录。
- rd 删除一个目录。
- dir 显示目录中的文件和子目录列表。
- tree 以图形显示驱动器或路径的文件夹结构。
- path 为可执行文件显示或设置一个搜索路径。
- xcopy 复制文件和目录树。


**文件管理**
- type 显示文本文件的内容。
- copy 将一份或多份文件复制到另一个位置。
- del 删除一个或数个文件。
- move 移动文件并重命名文件和目录。(Windows XP Home Edition 中没有)
- ren 重命名文件。
- replace 替换文件。
- attrib 显示或更改文件属性。
- find 搜索字符串。
- fc 比较两个文件或两个文件集并显示它们之间的不同


**网络命令**
- ping 进行网络连接测试、名称解析
- ftp 文件传输
- net 网络命令集及用户管理
- telnet 远程登陆
- ipconfig 显示、修改 TCP/IP 设置
- msg 给用户发送消息
- arp 显示、修改局域网的 IP 地址 - 物理地址映射列表


**系统管理**
- at 安排在特定日期和时间运行命令和程序
- shutdown 立即或定时关机或重启
- tskill 结束进程
- taskkill 结束进程(比 tskill 高级，但 WinXPHome 版中无该命令)
- tasklist 显示进程列表(Windows XP Home Edition 中没有)
- sc 系统服务设置与控制
- reg 注册表控制台工具
- powercfg 控制系统上的电源设置


> 对于以上列出的所有命令，在 cmd 中输入命令 +/? 即可查看该命令的帮助信息。如 `find /?`



## get file list
get_file_list.bat
```
tree /f > list.txt
del  get_file_list.bat
```



```
dir  查看目录  
dir  *.*  /b   只显示文件名，不包括目录
d:   直接移到d盘    
cd\  到根目录   
cd.. 到上层目录
md   新建目录
copy 源...目标...  复制 
move 源...目标...移动文件或目录
rd   删除空目录
del  删除目录或文件
ren  旧名  新名  重命名
cls  清屏

start qserver.exe servertype=ccs   启动一个exe或bat脚本
pause 暂停

:: 无用的显示去掉，不包括 echo 的输出
@echo off

::  覆盖，也有清理原来内容之功效,
echo "aaaaaaa" > a.txt  

:: 追加。不加引号，则输出不加引号的  
echo bbbbbbb >> a.txt  

::cd到脚本执行的目录
cd /d %~dp0  

:: 设置变量
@path = ../server   这样也可以设置变量
echo %path%

:: 设置dos窗口颜色和标题
@color 2e            
@title exportxls

:: 所有输出都定向到文件中
test.bat >a.txt 2>&1   1代表标准输出，2代表错误输出

:: 复制
copy  *.csv  all.csv  就能把所有文件都复制到一个文件中
```









## 常用命令

```
1 echo 和 @ 
回显命令  
@                     #关闭单行回显 
echo off              #从下一行开始关闭回显 
@echo off             #从本行开始关闭回显。一般批处理第一行都是这个 
echo on               #从下一行开始打开回显 
echo                  #显示当前是 echo off 状态还是 echo on 状态 
echo.                 #输出一个” 回车换行”，空白行  
 #(同 < span class="built\_in">echo, echo; echo\+ echo\[ echo\] echo/ echo) 
 
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
copy 1.txt + 2.txt 3.txt 
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
dir \*.\* /s/a | find /c ".exe" 
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
%\* 从第一个参数开始的所有参数 
 
 批参数 (%n) 的替代已被增强。您可以使用以下语法: 
 
 %~1          - 删除引号 (")，扩充 %1 
 %~f1         - 将 %1 扩充到一个完全合格的路径名 
 %~d1         - 仅将 %1 扩充到一个驱动器号 
 %~p1         - 仅将 %1 扩充到一个路径 
 %~n1         - 仅将 %1 扩充到一个文件名 
 %~x1         - 仅将 %1 扩充到一个文件扩展名 
 %~s1         - 扩充的路径指含有短名 
 %~a1         - 将 %1 扩充到文件属性 
 %~t1         - 将 %1 扩充到文件的日期 / 时间 
 %~z1         - 将 %1 扩充到文件的大小 
 %~$PATH : 1 - 查找列在 PATH 环境变量的目录，并将 %1 
 扩充到找到的第一个完全合格的名称。如果环境 
 变量名未被定义，或者没有找到文件，此组合键会 
 扩充到空字符串 
 
 可以组合修定符来取得多重结果: 
 
 %~dp1        - 只将 %1 扩展到驱动器号和路径  
 %~nx1        - 只将 %1 扩展到文件名和扩展名 
 %~dp$PATH:1 - 在列在 PATH 环境变量中的目录里查找 %1， 
 并扩展到找到的第一个文件的驱动器号和路径。 
 %~ftza1      - 将 %1 扩展到类似 DIR 的输出行。 
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
 


32 start 
 批处理中调用外部程序的命令，否则等外部程序完成后才继续执行剩下的指令  
 
33 call 
 批处理中调用另外一个批处理的命令，否则剩下的批处理指令将不会被执行  
 有时有的应用程序用 < span class="title">start 调用出错的，也可以 < span class="title">call 调用  

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
 分隔符指定为 - 和 "空格"，注意 delims\=- 后面有个 "空格" 
其中 tokens\=1,2,3 若用 tokens\=1-3 替换，效果是一样的  
for /f "tokens\=2\* delims\=-" %%a in ('date /t') do echo %%b 
 取第 2 列给 %%a ，其后的列都给 %%b 
 

```




## 参考链接
- [Windows批处理(cmd/bat)常用命令小结 | HelloDog](https://wsgzao.github.io/post/windows-batch/)