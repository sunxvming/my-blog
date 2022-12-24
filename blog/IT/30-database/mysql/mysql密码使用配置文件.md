### 1. 创建配置文件并写入配置，推荐位置：/etc/mysql/mysqlpassword.cnf
```
[mysqldump]
# use for mysqldump
user=root
password="mkF34ml>ttuEaa"
host=xxx.com
[client]
# use for mysql
user=root
password=mkF34ml>ttuEaa
host=xxx.com
```


###   2. mysql中使用 
```
mysql --defaults-extra-file=/etc/mysql/mysqlpassword.cnf  [all other options]
```


###   3. mysqldump中使用
```
mysqldump --defaults-extra-file=/etc/mysql/mysqlpassword.cnf gm sys_menu > menu.sql
```



