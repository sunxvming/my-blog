前言:VMware在设置centos6共享文件夹的时候，只需要安装vmware-tools，然后在vmware里面配置共享文件夹即可，但是对于centos7，设置完之后，并不能如愿的将我们共享的目录显示在/mnt/hgfs目录下，这里我们需要自己进行挂载，以下进行挂载讲解，共享文件夹设置需要先安装VMware-tools，至于怎么安装VMware-tools这里不再说明。


## 步骤一：VMware设置共享文件夹

运行linux系统，如果以上步骤在linux系统开机的时候进行的则重启linux系统


输入命令`vmware-hgfsclient`查看共享目录是否已经设置成功



## 步骤二：手动挂载共享目录
1. 在mnt目录下创建hgfs目录

2. 输入vmhgfs-fuse .host:/VMShare /mnt/hgfs进行手动挂载，其中VMShare是共享文件夹名，/mnt/hgfs是挂载目录名

3.查看效果，我们在windows下，给D盘的VMware文件夹添加一个demo.txt的文件，然后在linux系统里面查看
到这里手动挂载已经成功，但是这种挂载每次关机就会失效，我们还得重新执行一次自定挂载命令


## 步骤三：自动挂载共享目录
用vim打开/etc/fstab文件，添加一行挂载信息
.host:/VMShare /mnt/hgfs fuse.vmhgfs-fuse allow_other,defaults 0 0

使用mount -a指令让刚刚写入的挂载信息立即生效


## 步骤四：卸载共享目录
1. 使用umount /mnt/hgfs卸载刚刚挂载的目录
2. 永久卸载就直接把/etc/fstab文件里面相关挂载记录删除即可

