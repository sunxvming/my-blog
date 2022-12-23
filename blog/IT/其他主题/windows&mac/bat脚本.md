## get file list
```
tree /f > list.txt
del  get_file_list.bat
```


start qserver.exe servertype=ccs   启动一个exe或bat脚本



dir    查看目录  
dir  *.*  /b   只显示文件名，不包括目录
d:  直接移到d盘    cd\ 到根目录   cd.. 到上层目录
md 新建目录
copy  源...目标...  复制 
move 源...目标...移动文件或目录
rd 删除空目录
del 删除目录或文件
ren  旧名  新名  重命名
cls  清屏
format +盘符   格式化磁盘
---------------------------------------------------------------------------------------
tcp/ip命令
ping +ip或域名   查看网络连接  ping 127.0.0.1  本机  他是保留ip
ipconfig 查自己ip  ipconfig/all 更多信息    ipconfig/displaydns  查dns缓存
netstat  显示当前活动的网络连接信息     -a 显示所有连接和监听端口     -n  以数字形式显示地址和端口      -s     显示每个每个协议的使用状态




:: help 可以显示各种命令 for /?  /?是用来查看帮助命令的
:: more 跟linux下相似


:: 无用的显示去掉，不包括 echo 的输出
@echo off


rem 覆盖，也有清理原来内容之功效,
echo "aaaaaaa" > a.txt  


:: 追加,不加引号，则输出不加引号的  
echo bbbbbbb >> a.txt  


pause


::::::::::::::::::::::::::
::@行首有了它的话，这一行的命令就不显示了
@echo off 
netstat -a -n > a.txt 
type a.txt | find "7626" && echo "Congratulations! You have infected GLACIER!" 
del a.txt 
pause & exit 
::::::::::::::::::::::::::




::clean screen 
cls 


:::::::::::::::::::::::::::
if "%1"=="help" goto usage  
::xxx
:usage 
:::::::::::::::::::::::::::


::  test.bat  test aa bb  %1 %2 代表参数


::cd到脚本执行的目录
cd /d %~dp0  
set langs=tw
xcopy /E/Y %langs%.lua ..\jsontmp


@path = ../server   这样也可以设置变量
echo %path%


::::::::::::::::::::
if "%1"=="" goto usage 
if not "%1"=="/?" goto usage 
if exist C:\Progra~1\Tencent\AD\*.gif del C:\Progra~1\Tencent\AD\*.gif 




:: & 这可以说是最简单的一个组合命令了，它的作用是用来连接n个DOS命令，并把这些命令按顺序执行，而不管是否有命令执行失败
:: && dir c:\ > a.txt && dir d:\ >> a.txt   成功才往后执行   || 成功后就不不执行力
 
:: tree 目录树    tree /f  显示当前文件
:: dir e:\code |sort    排序目录名


@color 2e            设置dos窗口颜色和标题
@title exportxls


ren .\merge\merged1.png merged.png 
xcopy  .\merge\merged.png ..\client\res\icon\


^符号可以转意， echo ^| 


test.bat >a.txt 2>&1   1代表标准输出，2代表错误输出，这个是把所有输出都定向到文件中





copy  *.csv  all.csv  就能把所有文件都复制到一个文件中


--------------------------------------------
隐藏文件夹： attrib +s +a +h +r e:\bak\tools
显示文件夹： attrib -a -s -h -r e:\bak\tools

attrib /？ 查看用法



bat文件如下，拖动文件到bat文件就可以删除文件
DEL /F /S /Q \\?\%1

RD /S /Q \\?\%1

del 的参数
/F 强制删除只读文件。

/S 从所有子目录删除指定文件。

/Q 安静模式。删除全局通配符时，不要求确认。





---------------------------------------得到svn版本号
或者   svnversion
::del old ab and copy new ab

set ABPATH=%cd%\..\..\rise-android-ab\tools\nginx-1.12.1\html\Android

set StreamingAssetsPath=%cd%\..\client\Assets\StreamingAssets

RD /S /Q %StreamingAssetsPath%\abs

xcopy /s/e/i/y %ABPATH% %StreamingAssetsPath%\abs



多行命令的
@echo off

for %%i in (aaaaa bbbbbbbb cccccc) do (

    echo %%i

    echo %%i

)

pause














