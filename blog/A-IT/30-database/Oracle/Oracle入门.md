
用户密码
orcl  123456


点击口令管理，取消锁定 SCOTT，对应的默认初始密码为 tiger，点击确定。

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20250807092615.png)















## 导入导出
exp SXM/123456@orcl OWNER=SXM FILE=tables.dmp ROWS=N


## windows上的启动
启动脚本
```bat
:: 取得管理员权限
:Main
@echo off
cd /d "%~dp0"
cacls.exe "%SystemDrive%\System Volume Information" >nul 2>nul
if %errorlevel%==0 goto Admin
if exist "%temp%\getadmin.vbs" del /f /q "%temp%\getadmin.vbs"
echo Set RequestUAC = CreateObject^("Shell.Application"^)>"%temp%\getadmin.vbs"
echo RequestUAC.ShellExecute "%~s0","","","runas",1 >>"%temp%\getadmin.vbs"
echo WScript.Quit >>"%temp%\getadmin.vbs"
"%temp%\getadmin.vbs" /f
if exist "%temp%\getadmin.vbs" del /f /q "%temp%\getadmin.vbs"
exit
:Admin

:: 手动启动 oracle 服务,因安装环境不同,需将下列服务名称替换成自己的
net start "OracleServiceORCL"
net start "OracleOraDb11g_home1TNSListener"
net start "OracleOraDb11g_home1ClrAgent"

:: 如果需要使用控制台服务，将下面这行前面的 :: 删掉,并将服务名称替换成自己的
net start "OracleDBConsoleorcl"
pause
```



- [启动windows环境下的oracle的三种方式_windows启动oracle-CSDN博客](https://blog.csdn.net/m0_37941483/article/details/95238426)




## 同义词名

-----------------
CREATE SYNONYM WFDISC FOR IDCX.WFDISC;
CREATE SYNONYM SITE FOR STATIC.SITE;


CREATE SYNONYM IN_ARRIVAL FOR SEL3.ARRIVAL;
CREATE SYNONYM IN_ASSOC   FOR SEL3.ASSOC;
CREATE SYNONYM IN_ORIGIN  FOR SEL3.ORIGIN;
CREATE SYNONYM IN_ORIGERR FOR SEL3.ORIGERR;


CREATE SYNONYM OUT_ARRIVAL FOR LEB.ARRIVAL;
CREATE SYNONYM OUT_ASSOC   FOR LEB.ASSOC;
CREATE SYNONYM OUT_ORIGIN  FOR LEB.ORIGIN;
CREATE SYNONYM OUT_ORIGERR FOR LEB.ORIGERR;

## 学习资料

- [Oracle 11g安装配置完美教程 - Windows（上）-阿里云开发者社区](https://developer.aliyun.com/article/1266361)
- [Oracle 11g安装配置完美教程 - Windows（下）-阿里云开发者社区](https://developer.aliyun.com/article/1266362?spm=5176.26934562.main.3.8e5271c6YZoMO6)
- [windows安装Oracle11下载地址以及安装步骤带图详解每个步骤_widows上oralce 11安装-CSDN博客](https://blog.csdn.net/qq_55629923/article/details/127514889)
- [Navicat for oracle创建数据库_navicat oracle 创建数据库-CSDN博客](https://blog.csdn.net/qiushisoftware/article/details/100734470)
- [使用navicat创建Oracle数据库\[通俗易懂\]-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2155752)
- [Navicat使用笔记05---Navicat 创建oracle表空间、新建用户、授权 - 雨后观山色 - 博客园](https://www.cnblogs.com/luckyplj/p/11365245.html)


表空间
- [探秘Oracle表空间、用户、表之间的关系 - 灰信网（软件开发博客聚合）](https://freesion.com/article/8362791744/)