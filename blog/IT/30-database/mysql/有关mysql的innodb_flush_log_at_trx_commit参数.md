## 一、参数解释  


0：log buffer将每秒一次地写入log file中，并且log file的flush(刷到磁盘)操作同时进行。该模式下在事务提交的时候，不会主动触发写入磁盘的操作。


1：每次事务提交时MySQL都会把log buffer的数据写入log file，并且flush(刷到磁盘)中去，该模式为系统默认。


2：每次事务提交时MySQL都会把log buffer的数据写入log file，但是flush(刷到磁盘)操作并不会同时进行。该模式下，MySQL会每秒执行一次 flush(刷到磁盘)操作。


## 二、参数修改


找到mysql配置文件mysql.ini，修改成合适的值，然后重启mysql。


## 三、注意事项


 当设置为0，该模式速度最快，但不太安全，mysqld进程的崩溃会导致上一秒钟所有事务数据的丢失。


 当设置为1，该模式是最安全的，
 但也是最慢的一种方式。在mysqld 服务崩溃或者服务器主机crash的情况下，binary log 只有可能丢失最多一个语句或者一个事务。。


 当设置为2，该模式速度较快，也比0安全，只有在操作系统崩溃或者系统断电的情况下，上一秒钟所有事务数据才可能丢失。


## 四、其他相关查找资料时候看到其他文章说
 innodb_flush_log_at_trx_commit和sync_binlog 两个参数是控制MySQL 磁盘写入策略以及数据安全性的关键参数，当两个参数都设置为1的时候写入性能最差，推荐做法是**innodb_flush_log_at_trx_commit=2，sync_binlog=500 或1000  


 ## 参考链接
- [【MySQL】sync_binlog innodb_flush_log_at_trx_commit 浅析 ](http://blog.itpub.net/22664653/viewspace-1063134/)
- [快马加鞭 – MYSQL RDS 写入性能参数优化 ](https://aws.amazon.com/cn/blogs/china/mysql-rds-write-performance-parameter-optimization/)