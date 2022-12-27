# VMware安装ubuntu21,"发生错误，导致虚拟cpu进入关闭状态"
安装时发生如下错误：
![](https://sunxvming.com/imgs/6046a3c1-2d16-47ed-9841-4e15c067bd4c.jpg)


最后发现可能是版本兼容的问题
安装的时候要选择自定义安装，在选择硬件兼容性的时候选择15.X。之前选的典型安装默认的是16.X，可能版本比较高，导致了错误的发生。
![](https://sunxvming.com/imgs/0889c72c-66f2-4efe-ba9c-86fb76e66f29.png)


![](https://sunxvming.com/imgs/2e7ce6c2-a25e-4a3e-8fb1-ab10ba512884.png)






# VMware设置centos7共享文件夹
前言:VMware在设置centos6共享文件夹的时候，只需要安装vmware-tools，然后在vmware里面配置共享文件夹即可，但是对于centos7，设置完之后，并不能如愿的将我们共享的目录显示在/mnt/hgfs目录下，这里我们需要自己进行挂载，以下进行挂载讲解，共享文件夹设置需要先安装VMware-tools，至于怎么安装VMware-tools这里不再说明。


## 步骤一：VMware设置共享文件夹
![](https://sunxvming.com/imgs/e072bfea-06a0-40ea-beeb-8d4da6af8e74.png)
运行linux系统，如果以上步骤在linux系统开机的时候进行的则重启linux系统


输入命令`vmware-hgfsclient`查看共享目录是否已经设置成功
![](https://sunxvming.com/imgs/5e9753a2-6c09-4954-acf2-e5eeff021352.png)


## 步骤二：手动挂载共享目录
1. 在mnt目录下创建hgfs目录
![](https://sunxvming.com/imgs/801c46a1-73ef-4520-bca6-4a939c963a70.png)
2. 输入vmhgfs-fuse .host:/VMShare /mnt/hgfs进行手动挂载，其中VMShare是共享文件夹名，/mnt/hgfs是挂载目录名
![](https://sunxvming.com/imgs/9f4f6e05-f7e9-4906-ad98-5cf1f9ac509a.png)
3.查看效果，我们在windows下，给D盘的VMware文件夹添加一个demo.txt的文件，然后在linux系统里面查看
到这里手动挂载已经成功，但是这种挂载每次关机就会失效，我们还得重新执行一次自定挂载命令


## 步骤三：自动挂载共享目录
用vim打开/etc/fstab文件，添加一行挂载信息
.host:/VMShare /mnt/hgfs fuse.vmhgfs-fuse allow_other,defaults 0 0
![](https://sunxvming.com/imgs/47821ddd-8611-41ef-8450-91357dfe1144.png)
使用mount -a指令让刚刚写入的挂载信息立即生效


## 步骤四：卸载共享目录
1. 使用umount /mnt/hgfs卸载刚刚挂载的目录
2. 永久卸载就直接把/etc/fstab文件里面相关挂载记录删除即可

