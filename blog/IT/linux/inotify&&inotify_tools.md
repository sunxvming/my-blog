Inotify 是一种强大的、细粒度的、异步的**文件系统事件监控**机制，linux内核从2.6.13起，加入了Inotify支持，通过Inotify可以监控文件系统中添加、删除，修改、移动等各种细微事件，利用这个内核接口，第三方软件就可以监控文件系统下文件的各种变化情况，而**inotify-tools**就是这样的一个第三方软件。  


## inotify_tools  的安装 
1.apt-get yum 
2.源码安装 ，
```
官网下载  ./configure make && make install  
ll /usr/local/bin/inotifywa*      看是否安装成功 
```


inotify-tools安装完成后，会生成**inotifywait**和**inotifywatch**两个指令，其中，
inotifywait用于等待文件或文件集上的一个特定事件，它可以监控任何文件和目录设置，并且可以递归地监控整个目录树。
inotifywatch用于收集被监控的文件系统统计数据，包括每个inotify事件发生多少次等信息。           


Inotifywait是一个监控等待事件，可以配合shell脚本使用它，下面介绍一下常用的一些参数：
* -m， 即--monitor，表示始终保持事件监听状态。
* -r， 即--recursive，表示递归查询目录。
* -q， 即--quiet，表示打印出监控事件。
* -e， 即--event，通过此参数可以指定要监控的事件，常见的事件有modify、delete、create、attrib，move可表示文件目录重命名等。


更详细的请参看man  inotifywait，或/usr/local/bin/inotifywait  --help         


```
#!/bin/bash
src=/data/smbshare
/usr/local/bin/inotifywait -mrq --timefmt '%d/%m/%y %H:%M' --format '%T %w%f%e' -e modify,delete,create,attrib,move  $src \
| while read files
do
    rsync -vzrtopg --progress --delete --password-file=/etc/rsyncd.secretes   /data/smbshare/ root@10.1.1.144::logs
    echo "${files} was rsynced" >>/tmp/rsync.log 2>&1
done 
```
第一句话的意思：监听文件，有变动时会这样打印    13/08/16 18:03 /data/smbshare/新建文本文档.txtDELETE     
放在>后面的&，表示重定向的目标不是一个文件，而是一个文件描述符。
> 换言之 2>1 代表将stderr重定向到当前路径下文件名为1的regular file中，而2>&1代表将stderr重定向到文件描述符为1的文件(即/dev/stdout)中，这个文件就是stdout在file system中的映射
   