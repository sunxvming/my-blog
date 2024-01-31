samba是Linux下实现不同的系统之间互相共享文件的软件
### 1.下载及安装Samba
```
yum -y install samba
```
### 2.配置Samba
**改配置，先备份**。
配置的访问目录为/data1，供在windows下访问。步骤如下：
1.在/etc/samba/smb.conf文件的末尾之添加如下字段：

```
[root]
comment = root
path = /data1
creat mask = 64
writeable = yes
browseable = yes
available = yes
admin users = root
public = yes
guest ok = yes
```
2.Linux中/etc/passwd里的用户和Samba里的用户几乎没啥关系，硬说有的话，那就是：Samba的所有用户都必须是系统里已存在的用户。我们要授权系统用户访问Samba的话，通过命令：
```
smbpasswd -a root#添加用户root到Samba用户数据库中
```
这条命令输入完后，会提示为新建的用户root设置访问密码。最后再执行一下`service smb restart`（ubuntu下是smbd）命令就OK了。至此，Samba服务器就架设好了


3.若出现不能访问，或者是没有权限可能是以下的原因：
* 防火墙的问题
* SELinux问题，默认的，SELinux禁止网络上对Samba服务器上的共享目录进行写操作。确保setlinux关闭，可以用setenforce 0命令执行


4.最后在Windows系统里，访问结果如下：
使用如下访问：
```
\\192.168.85.128\root
```
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/24271de2-ce92-441a-a148-b14f9daaa2a4.png)


5. 这些弄好之后在windows上进行 映射网络驱动
右击此电脑，添加网络驱动
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/a2845685-d1af-4264-99dd-860ce08b3d9b.png)



