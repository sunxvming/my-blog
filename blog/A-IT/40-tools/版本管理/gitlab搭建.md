**配置**
```
vim /etc/gitlab/gitlab.rb
```


**启动相关**
```
gitlab-ctl reconfigure     #更改配置后需要执行
gitlab-ctl stop
gitlab-ctl start
```


**更改密码**
```
gitlab-rails console -e production
user = User.where(username:"root").first
user.password = "test"
user.save!
```


**gitlab查查日志**
我们可以用`gitlab-ctl tail` 命令查看实时log。




## 遇到的问题
### 和已经安装的nginx冲突
可以更改gitlab的配置，禁用gitlab自带nginx，并进行相关的配置


### 已添加秘钥，git clone时 Permission Denied (publickey)
可能是因为sshd没有给linux下的gitlab用户登录的权限，给了权限后便可以登录了。


### view raw的时候显示空白，下载文件的时候下载的内容为空
因为没有用gitlab自带的nginx，可能在nginx代理转发的时候出现的问题。后来用了gitlab自带的nginx的配置后便好了




## 参考链接
- [手把手教你搭建gitlab服务器](https://zhuanlan.zhihu.com/p/62042884)
- [搭建 GitLab](https://cloud.tencent.com/document/product/213/47332),by 腾讯云