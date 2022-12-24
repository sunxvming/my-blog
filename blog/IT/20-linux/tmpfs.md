## 什么是tmpfs？
tmpfs是一种基于内存的文件系统，它和虚拟磁盘ramdisk比较类似，但不完全相同，和ramdisk一样，tmpfs可以使用RAM，但它也可以使用swap分区来存储。而且传统的ramdisk是个块设备，要用mkfs来格式化它，才能真正地使用它；而tmpfs是一个文件系统，并不是块设备，只是安装它，就可以使用了。tmpfs是最好的基于RAM的文件系统。


## linux系统自带的tmpfs
du -h
```
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        4.2G     0  4.2G   0% /dev
tmpfs           4.2G  2.2G  2.1G  52% /dev/shm
tmpfs           4.2G   13M  4.2G   1% /run
tmpfs           4.2G     0  4.2G   0% /sys/fs/cgroup
tmpfs           860M     0  860M   0% /run/user/0
```
用的时候一般没必要自己创建一个tmpfs，可以直接使用/dev/shm。这个里面是没有东西的。
/dev/shm/ 目录，其实是利用内存虚拟出来的磁盘空间，通常是总物理内存的一半！ 由于是透过内存仿真出来的磁盘，因此你在这个目录底下建立任何数据文件时，访问速度是非常快速的！
(在内存内工作) 不过，也由于他是内存仿真出来的，因此这个文件系统的大小在每部主机上都不一样，而且建立的东西在下次开机时就消失了！ 因为是在内存中嘛！


> * devfs是文件系统形式的device manager。
> * tmpfs存在在内存和swap中，因此只能保存临时文件。
> * devtmpfs是改进的devfs，也是存在内存中，挂载点是/dev/

## 创建和挂载 tmpfs 文件系统
```
mount -F tmpfs [-o size=number]  swap mount-point

# -o size=number
# 指定 TMPFS 文件系统的大小限制（以 MB 为单位）。

# mount-point
# 指定在其中挂载 TMPFS 文件系统的目录。
```
验证是否已创建 TMPFS 文件系统
mount -v
