rsync is an open source utility that provides fast incremental file transfer

Rsync(Remote Synchronize) 是一个远程资料同步工具，可通过LAN/WAN快速同步多台主机，Rsync使用“Rsync演算法”来使本地主机和远程主机之间达到同步，这个演算法并不是每次都整份传送，它只传送两台计算机之间所备份的资料不同的部分，因此速度相当快。
另外，与**SCP**相比，传输速度不是一个层次级的。我们在局域网时经常用Rsync和SCP传输大量Mysql数据，发现Rsync至少比Scp快20倍以上，所以大家如果需要在Linux/Unix服务器之间互传海量资料，Rsync是非常好的选择。


### samba+inotify+rsync
Windows上添加一个文件，samba的机器上（机器A）增加文件，和samba同等的机器上（机器B）通过机器A的inotify监控到文件的变化，再通过rsync同步到机器B上，机器B是为了做一个web服务器以供用户浏览文件
机器A：samba+inotify+rsync的client端
机器B：rsync的服务端进程要开启，以供机器A连接复制