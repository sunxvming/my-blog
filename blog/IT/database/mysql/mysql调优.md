




![](https://sunxvming.com/imgs/febcc2317d3a83fb85bbe8e34a47486a.png)




数据库引擎
外键约束或者事务处理对于数据完整性是非常重要的，但MyISAM都不支持这些。另外，当有一条记 录在插入或者更新时，整个数据表都被锁定了，当使用量增加的时候这会产生非常差的运行效率。


MyISAM 和 InnoDB的选择
1. 如果你的网站以 读和写为主，同时对事务性要求不高，建议使用MyISAM
2. 如果你的网站对事务性高，比如(转账,付款…)这个表建议使用InnoDB






## 索引
在频繁进行排序或分组（即进行group by或order by操作）的列上建立索引。
1. 在经常查询的字段上加索引, 不经常查询的就不加索引
2. 唯一性差的字段不要加索引.
3. 在join的字段要加索引，如果两张表的join的字段都没有索引的话，每个表的数据量都是1万条，那join的耗时就是10000*10000次，会非常的慢，以至于把数据库的cpu占满
创建索引是以insert开销为代价的




1. 如果是多列索引，只有使用到左边的字段，才会使用索引
2. like 语句 ‘%aa’ 是不会用索引
3. or 要小心使用.是不会用索引




## sql语句优化


避免扫全表的操作
避免困难的正则表达式
MATCHES和LIKE关键字支持通配符匹配，技术上叫正规表达式。但这种匹配特别耗费时间。
例如：SELECT * FROM customer WHERE zipcode LIKE “98_ _ _” 






怎么定位慢查询
配置多少秒为慢查询，日志记录在哪里




show variables like 'long_query_time';








## mysql运行的指标
最大连接数  
```
show variables like '%max_connections%';  
```
当前连接数
```
mysql> show status like 'Threads%';  
    +-------------------+-------+  
    | Variable_name     | Value |  
    +-------------------+-------+  
    | Threads_cached    | 58    |  
    | Threads_connected | 57    |   ###这个数值指的是打开的连接数  
    | Threads_created   | 3676  |  
    | Threads_running   | 4     |   ###这个数值指的是激活的连接数，这个数值一般远低于connected数值  
    +-------------------+-------+  
```

