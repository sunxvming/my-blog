换成win11后之前用的chrome的插件markdown viewer突然不能用了，如果用浏览器直接打开本地文件的话会变成直接下载了。
原因是

![image.png](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/20230117202228.png)
注册表中的`.md`后缀的Content Type变成了`application/md`了，修改成`text/markdown`就好了。