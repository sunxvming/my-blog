在docker中安装mysql
```
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```



运行镜像报错
```
2023-04-21 10:13:15 [FATAL tini (7)] exec /bin/entrypoint.sh failed: No such file or directory
```
原因是：这个问题可能是由于 Windows 和 Unix/Linux 操作系统之间的行末符不同导致的。在 Windows 中，行末符通常是 "\r\n"，而在 Unix/Linux 中，行末符通常是 "\n"。
用dos2unix转换一下就行
