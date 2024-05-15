XFCE和Xserver都是与桌面环境和图形显示相关的软件。

XFCE是一个轻量级的桌面环境，它提供了一套用户界面、窗口管理器和一些基本的应用程序，如文件管理器、终端模拟器等。它被设计为使用较少的系统资源，以提供高效和快速的桌面体验。XFCE使用X Window System作为图形显示系统。

X Window System，通常简称为X11或X，是一个用于图形显示的软件系统。它提供了图形显示、窗口管理和用户输入的功能，允许在不同的计算机上运行图形应用程序并显示到本地或远程的显示设备上。X Window System使用Xserver作为图形服务器，负责管理图形显示、窗口和用户输入。

因此，Xserver是X Window System的一个重要组成部分，它负责接收和处理来自应用程序的图形请求，并将图形数据发送到显示设备上。XFCE作为一个桌面环境，依赖于Xserver来提供图形显示功能。


启动xfce命令`sudo sudo startxfce4




## vnc远程linux

**VNC简介**
VNC (Virtual Network Console)，即虚拟网络控制台，它是一款基于 UNIX 和 Linux 操作系统的优秀远程控制工具软件，由著名的 AT&T 的欧洲研究实验室开发，远程控制能力强大，高效实用，并且免费开源。

VNC基本上是由两部分组成：一部分是客户端的应用程序(vncviewer)；另外一部分是服务器端的应用程序(vncserver)。

**vncserver使用**
第一次运行vncserver时，它会创建一个默认启动脚本。按照提示进行配置密码什么的。
配置完成后就可以用`vncserver`进行启动
启动后可以用`ps aux|grep vnc` 查看启动的端口


**vncviewer的使用**
输入`ip:port`, 然后再按提示输入密码就可以连接了。

