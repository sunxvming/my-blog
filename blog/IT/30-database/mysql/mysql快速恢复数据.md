## 1.更改备份参数


mysqldump的--extended-insert参数表示批量插入,会将多个insert语句合并成一个语句,与没有开启-extended-insert的备份导入效率相差3-4倍.
```
mysqldump --extended-insert=true --opt  -hxx -uxx -p xx > log.sql
--opt 这个参数是进行优化
```




## 2.调整MYSQL快速插入参数
如果你的数据库储存引擎是MYISAM参数的话,可以将此参数设置到512M或256M,MyISAM会使用一种特殊的树状缓存来做出更快的批量插入。


```
该值默认是8M = 8388608byte


查看插入缓冲区大小
SHOW VARIABLES LIKE '%bulk%';
设置插入缓冲区大小(全局)


SET GLOBAL bulk_insert_buffer_size =1024*1024*512;
设置插入缓冲区大小(session)


SET bulk_insert_buffer_size =1024*1024*256;
```


## 3.关闭检查项
对于Innodb引擎中,我们可以关闭一些系统检查项来实现更快的插入的方案.
```
//关闭自动提交
SET autocommit=0;


//关闭唯一检查
set unique_checks = 0;


//关闭外键检查
SET foreign_key_checks=0;


//备份的时候开启--extended-insert参数
```




## 参考链接
- [关于Mysql 大型SQL文件快速恢复方案 ](https://segmentfault.com/a/1190000020351889)