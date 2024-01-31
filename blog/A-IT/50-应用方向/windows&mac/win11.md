
## terminal中文乱码

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20231114170455.png)


## win11改变右键风格
命令汇总：（执行完之后，重启电脑生效）  **Win11变为Win10右键风格命令：**
 ``` reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve ``` 
**Win11恢复Win11右键风格命令：**
 ``` reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f ```



## 浏览器无法打开本地md文件
**解决浏览器打开本地md文件变成直接下载**
换成win11后之前用的chrome的插件markdown viewer突然不能用了，如果用浏览器直接打开本地文件的话会变成直接下载了。
原因是

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230117202228.png)
注册表中的`.md`后缀的Content Type变成了`application/md`了，修改成`text/markdown`就好了。


## 微软UWP
问题：在开代理的情况下，Microsoft to-do、邮件、日历等UWP均无法正常同步。

UWP 的缩写代表 "Universal Windows Platform"，即通用 Windows 平台。
UWP 是微软在 Windows 10 中引入的新概念，由于所有 UWP 应用均运行在被称为 App Container 的虚拟沙箱环境中，其安全性及纯净度远胜于传统的 EXE 应用。但 App Container 机制同时也阻止了网络流量发送到本机（即 loopback）， 使大部分网络抓包调试工具无法对 UWP 应用进行流量分析。同样的，该机制也阻止了 UWP 应用访问 localhost，即使你在系统设置中启用了DAILI，也无法令 UWP 应用访问本地DAILI服务器，十分恼人。
 
其实 Windows 10 自带了一款名为 CheckNetIsolation.exe 的命令行工具可以帮助我们将 UWP 及 Windows 8 Metro 应用添加到排除列表。


微软在 Windows 8 以后就引入了 UWP 应用的概念，这些应用都运行在沙盘中，相比较来说确实是比较安全的，但又由于没法接触到系统，有些在系统里面的设置就没法沿用了，譬如网络。就像你本来科学上网好好的，用 UWP 就老是提示连接超时，这时候你需要 [EnableLoopback Utility](https://www.apprcn.com/enableloopback-utility.html) 这款工具了。
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20231011101513.png)

**EnableLoopback Utility** 的时候方法很简单，找到需要联网的 UWP 应用，勾选前面的框框，再点击「Save Changes」就行了。

**EnableLoopback Utility** 的原理很简单，为了安全起见，微软不允许 UWP 应用的流量指向本地，而这个工具则打破了这个限制，所以你就可以愉快地畅游互联网了。不过也要注意的是，并不是所有的应用都可以通过这个方法，不过也就只有那么一少部分应用不行而已。问题：在开DAILI的情况下，Microsoft to-do、邮件、日历等UWP均无法正常同步。


UWP 的缩写代表 "Universal Windows Platform"，即通用 Windows 平台。
UWP 是微软在 Windows 10 中引入的新概念，由于所有 UWP 应用均运行在被称为 App Container 的虚拟沙箱环境中，其安全性及纯净度远胜于传统的 EXE 应用。但 App Container 机制同时也阻止了网络流量发送到本机（即 loopback）， 使大部分网络抓包调试工具无法对 UWP 应用进行流量分析。同样的，该机制也阻止了 UWP 应用访问 localhost，即使你在系统设置中启用了DAILI，也无法令 UWP 应用访问本地DAILI服务器，十分恼人。
 
其实 Windows 10 自带了一款名为 CheckNetIsolation.exe 的命令行工具可以帮助我们将 UWP 及 Windows 8 Metro 应用添加到排除列表。


微软在 Windows 8 以后就引入了 UWP 应用的概念，这些应用都运行在沙盘中，相比较来说确实是比较安全的，但又由于没法接触到系统，有些在系统里面的设置就没法沿用了，譬如网络。就像你本来科学上网好好的，用 UWP 就老是提示连接超时，这时候你需要 [EnableLoopback Utility](https://www.apprcn.com/enableloopback-utility.html) 这款工具了。
![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20231011101513.png)

**EnableLoopback Utility** 的时候方法很简单，找到需要联网的 UWP 应用，勾选前面的框框，再点击「Save Changes」就行了。

**EnableLoopback Utility** 的原理很简单，为了安全起见，微软不允许 UWP 应用的流量指向本地，而这个工具则打破了这个限制，所以你就可以愉快地畅游互联网了。不过也要注意的是，并不是所有的应用都可以通过这个方法，不过也就只有那么一少部分应用不行而已。

## terminal
Ctrl+Shift+T  打开新窗口
`explorer.exe .`     terminal中打开文件资源管理器

## Scoop 
懂不懂，先装上，这样你就完成了该工具学习的第一步


[Scoop](https://scoop.sh/) 是一个用于 Windows 操作系统的命令行包管理器。它的主要目标是简化在 Windows 上安装、升级和管理软件应用程序的过程，类似于在Linux上的包管理器（例如APT、Yum、Homebrew等）。

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