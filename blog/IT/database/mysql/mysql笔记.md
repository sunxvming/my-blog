

## 建表
### 字段
时间的字段要注意若设成 timestamp 每次update的时候都会改时间的
Float和Decimal
Float(M,D), M<=23, 4个字节, 24 <=M <=53, 8个字节
Decimal () ,8个字节.
区别: decimal比float精度更高, 适合存储货币等要求精确的数字
### 引擎
MyISAM :
1. 速度快
2. 表级锁定
3. 支持全文索引（fulltext），只支持英文
4. 外键：没有具体的作用只是声明一下。
5. xxx.frm:表结构  xxx.MYD:数据   xxx.MYI:索引


InnoDB  (默认引擎):
1. 配置好了一样快
2. 行级锁定（支持高并发）
3. 支持事务
4. 外键，级联完整性
5. 一张一个文件：比较大


heap/memory : 内存表
优点：速度快
缺点：重启表及数据就没有了


### 外键特点
1. 只能在InnoDB表上建立外键
2. 外键的类型和大小必须和他指向的表的字段要完全一致
3. 外键指向的表的字段必须是主键或者unique
### 索引
#### 索引的类型
普通索引: index
唯一索引: unique index
主键索引: primary key
一张表上,只能有一个主键, 但是可以用一个或多个唯一索引.
全文索引 : fulltext index
#### 联合索引的使用情况：
index a_b(a,b,c)  a,b,c合在一起的索引  ，跟顺序有关
SELECT * FROM user WHERE a = 1               　会
SELECT * FROM user WHERE a =1 OR c=2         不会 因为检查c需要扫描全表
SELECT * FROM user WHERE a = 1 AND b=1　　　　 会
SELECT * FROM user WHERE b = 1                 不会
SELECT * FROM user WHERE b = 1 AND c=1        不会
### 索引的创建原则:
1:不要过度索引
2:在where条件最频繁的列上加.
3:尽量索引散列值,过于集中的值加索引意义不大.
### 修改表语句
查看表的创建过程:
show create table  tableName
增加列
alter table tbName add 列名称 (add之后的旧列名之后的语法和创建表时的列声明一样)
修改列
alter table tbName change 旧列名  新列名 (注:旧列名之后的语法和创建表时的列声明一样)
减少列
alter table tbName drop 列名称;
增加主键
alter table tbName add primary key(主键所在列名);
例:alter table goods add primary key(id)
删除主键
alter table tbName　drop primary key;
增加索引
alter table tbName add [unique|fulltext] index 索引名(列名);
删除索引
alter table tbName drop index 索引名;
清空表的数据
truncate tableName;
## 语句
### select
聚合函数
sum max min count avg
查询出每年龄段的年龄及人数
```
SELECT age,COUNT(id) FROM user GROUP BY age
```
取出男生，女生的平均年龄
```
SELECT gender,AVG(age) FROM user GROUP BY gender
```
列出发表日志最多的１０个用户的姓名及发表的数量
```
SELECT a.user,COUNT(b.id) c
 FROM user a
  LEFT JOIN blog b
ON a.id = b.user_id
  GROUP BY a.id   (只能是a)
ORDER BY c DESC
LIMIT 10
```
列出发表日志数量大于１０个的用户姓名
WHERE:是在聚合函数之前执行
HAVING:是在聚合函数之后执行
```
SELECT a.user,COUNT(b.id) c
 FROM user a
  LEFT JOIN blog b
ON a.id = b.user_id
  GROUP BY a.id
HAVING c > 10
```
显示每个地区的总人口数和总面积．
```
SELECT region, SUM(population), SUM(area) FROM bbc GROUP BY region
```
显示每个地区的总人口数和总面积．仅显示那些面积超过1000000的地区。
在这里，我们不能用where来筛选超过1000000的地区，因为表中不存在这样一条记录。
相反，having子句可以让我们**筛选过滤**成组后的各组数据
```
SELECT region, SUM(population), SUM(area)  FROM bbc GROUP BY region HAVING SUM(area)>1000000
SELECT region, SUM(population), SUM(area) as s FROM bbc GROUP BY region HAVING s >1000000
```
mysql判断某个字段的长度
```
select home_page from aaa表 where char_length(trim(home_page))<10 and char_length(trim(home_page))>1;
```
查询比市场价省钱200元以上的商品及该商品所省的钱(where和having分别实现),因为不存在k这个字段，所以用where不行
```
select goods_id,goods_name,market_price-shop_price  as k from ecs_goods having k >200;
```
查询出2门及2门以上不及格者的平均成绩
```
select name,count(score < 60) as gk ,avg(score) as pj from stu group by name having gk >=2;
```
#### 子查询
where 型子查询: 内层sql的返回值在where后作为条件表达式的一部分
例句: select * from tableA where colA = (select colB from tableB where ...);
from 型子查询:内层sql查询结果,作为一张表,供外层的sql语句再次查询
例句:select * from (select * from ...) as tableName where ....
#### 联合查询
select id,username from member
union
select student_id,sdudent_name from student2;


### 插入
Copy data from more than one table into the new table:
```
SELECT Customers.CustomerName, Orders.OrderID
INTO CustomersOrderBackup2013
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID;
```


### 删除
删除表信息的方式有两种 :
truncate table table_name;
delete * from table_name;
注 : truncate操作中的table可以省略，delete操作中的*可以省略


truncate、delete 清空表数据的区别 :
1. truncate 是整体删除 (速度较快)，delete是逐条删除 (速度较慢)
2. truncate 不写服务器 log，delete 写服务器 log，也就是 truncate 效率比 delete高的原因
3. truncate 不激活trigger (触发器)，但是会重置Identity (标识列、自增字段)，相当于自增列会被置为初始值，又重新从1开始记录，而不是接着原来的 ID数。而 delete 删除以后，identity 依旧是接着被删除的最近的那一条记录ID加1后进行记录。如果只需删除表中的部分记录，只能使用 DELETE语句配合 where条件


## 查看mysql信息
查看mysql的最大连接数
```
show variables like '%max_connections%';
```
Mysql5.5 mysql5.6 mysql5.7：默认的最大连接数都是151
查看服务器响应的最大连接数:
```
show global status like 'Max_used_connections';
```
查看上次的mysql的warming信息
```
show warnings
```
查看编码：出现乱码是记得看一下
```
show variables like 'collation_%';
show variables like 'character_set_%';
```
可以my.ini中：character-set-server=utf8 修改服务器的编码设置



查看数据存储位置：
```
show global variables like "%datadir%";
```


查看所有表
```
select table_name
from information_schema.TABLES 
where TABLE_NAME like 'startup_log_%';
```


### MYSQL中的日志？
普通日志：
错误日志：
bin（二进制）日志 : 记录下：insert,update,grant,delete等会修改数据库的ＳＱＬ语句
慢日志:可以设置一个时间，然后MYSQL服务器会记录下慢于这外时间的SQL语句
## 优化
有些表会会定时产生垃圾数据，要定时清楚垃圾数据，如box_snack表的数据就很大，且很多无用
储存优化：使用最合适的字段类型
## 高级特性
### 视图: view
视图是由查询结果形成的一张虚拟表.
创建语法: Create view 视图名 as  select 语句;
删除语法: Drop view
修改语法：Alter view as select xxxxxx
#### 为什么要视图?
1:可以简化查询
2:可以进行权限控制把表的权限封闭,但是开放相应的视图权限,视图里只开放部分数据
3:大数据分表时可以用到
比如,表的行数超过200万行时,就会变慢,
可以把一张的表的数据拆成4张表来存放.
还可以用视图把4张表形成一张视图
Create view news as  select from n1 union select from n2 union.........
#### 视图与表的关系
视图是表的查询结果,自然表的数据改变了,影响视图的结果.
视图改变了呢?
0: 视图增删改也会影响表
1: 但是,视图并不是总是能增删改的.
答: 视图的数据与表的数据 一一对应时,可以修改.
## 有用特性
### load data infile
导出和导入
```
SELECT * INTO OUTFILE 'd:/data.txt'   FIELDS TERMINATED BY ',' FROM hm_category;
LOAD DATA INFILE 'd:/data.txt' INTO TABLE hm_category
LOAD DATA INFILE '/data/kbzy/roleinfo.log' INTO TABLE roleinfo character set utf8 fields terminated by ',' lines terminated by '\n'
//1.7G 500万条数据 仅用了33秒
```
既然load data infile这么快，可以先读取文件然后拼成csv再写入文件，然后再load，应该是很快的
但是load data的时候会把相应的表锁住，当前表读写都被锁
## 其他操作
### 数据库导出和恢复
例1: 导出mugua库下面的表
Mysqldump -u用户名 -p密码 库名 表1 表2 表3 > 地址/备份文件名称
导出的是建表语句及insert语句
例2:如何导出一个库下面的所有表?
Mysqldump -u用户名 -p密码 库名 > 地址/备份文件名称
例3: 如何导出以库为单位导出?
Mysqldump -u用户名 -p密码 -B 库1 库2 库3 > 地址/备份文件名称
例4: 如何导出所有库?
Mysqldump -u用户名 -p密码 -A > 地址/备份文件名称
恢复
1:登陆到mysql命令行
对于库级的备份文件
Mysql> source 备份文件地址
对于表级的备份文件
Mysql > use 库名
Mysql> source 备份文件地址
2:不登陆到mysql命令行
针对库级的备份文件
Mysql  -u用户名 -p密码 < 库级备份文件地址
针对表级的备份文件
Mysql  -u用户名 -p密码 库名 < 表级备份文件地址




```
mysql -uroot -ps6kj09df@GKGJJjhdfasoqas db_ebpc1 < db_ebpc.sql


mysqldump -t db_ebpc -uroot -ps6kj09df@GKGJJjhdfasoqas --tables t_avg_gas t_count_block t_count_transaction  t_count_transaction_amount t_usdt > db_ebpc.sql
```


### 如何远程访问
删除匿名用户
```
delete from user where user='';
grant all privileges on *.* to 'root'@'%' identified by '123456';
flush privileges;
```
如果需要指定访问主机，可以把%替换为主机的IP或者主机名。另外，
这种方法会在数据库mysql的表user中，增加一条记录。如果不想增加记录，只是想把某个已存在的用户（例如root）
修改成允许远程主机访问，则可以使用如下SQL来完成：
```
update user set host='%' where user='root' and host='localhost';
flush privileges;
```
重启mysql
若不能远程连接，看端口是否开放了
```
# Don't listen on a TCP/IP port at all. This can be a security enhancement,
#skip-networking     配置文件中可能有这种的保护安全的配置，记得留意
```
### 忘记MYSQL密码怎么？
1. 修改my.ini 文件，在文件中添加 skip-grand-tables 。　登录时无需密码
2. update mysql.user set password = password(“1234”);
flush privileges;  // 或　重启服务器
3. 修改my.ini去掉 skip-grand-tables
## 注意事项
###  字段长度的设置要考虑最大长度，以避免存不下
字段长度的设置，活动后台的一个记录错误日志的字段设置的是text类型 65535的长度，记录的是json，但是有个长度超了，就导致报错了
### NULL值和空值
平时我们在使用MySQL的时候，对于MySQL中的NULL值和空值区别不能很好的理解。注意到NULL值是未知的，且占用空间，不走索引，DBA建议建表的时候最好设置字段是NOT NULL 来避免这种低效率的事情的发生。
问题 1： 首先，我们需要搞清楚 "空值" 和"NULL"的概念：
1：空值('')是不占用空间的
2: MySQL中的NULL其实是占用空间的。官方文档说明:
“NULL columns require additional space in the row to record whether their values are NULL. For MyISAM tables, each NULL column takes one bit extra, rounded up to the nearest byte.”
而在MYSQL上，是不建议用NULL，NULL是占用四个字符，记录多了，这个是不必要的损耗，查询的时候，where field is null 或者 field is not null，这样的查询，效率也不是很高的，把字段设为default ''，这样可以where field = '' or field != ''，或者直接不允许为空NOT NULL。
## 其他经验
* 查看别人的数据库的时候，应该从主表开始看，然后再看他关联的表，这样会快一点
* 复杂的程序，简单的sql是web编程的基本原则，各种存储过程、触发器到处飞，苦果只有自己能尝的



