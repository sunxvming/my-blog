## 使用时遇到的错误
用redis-cli进行数据操作报错(error) MOVED 的解决方法
报错原因：
没有用集群模式连接（连接节点命令 没有加 -c 参数）
解决办法：
用 -c 参数连接redis集群节点：redis-cli -c -h 172.17.0.1 -p 6391






## redis简介


redis是开源,BSD许可,高级的key-value存储系统.

可以用来存储字符串,哈希结构,链表,集合,因此,常用来提供数据结构服务.

 
redis和memcached相比,的独特之处:

1. redis可以用来做存储(storge),
而memccached是用来做缓存(cache)这个特点主要因为其有”持久化”的功能.

2. 存储的数据有”结构”,对于memcached来说,存储的数据,只有1种类型--”字符串”,
而redis则可以存储字符串,链表,哈希结构,集合,有序集合.



## Redis下载安装

### 1. 官网下载最新版或者最新stable版
### 2. 解压源码并进入目录
### 3. 不用configure，直接make
注:易碰到的问题,时间错误.
原因: 源码是官方configure过的,但官方configure时,生成的文件有时间戳信息,
Make只能发生在configure之后,
如果你的虚拟机的时间不对,比如说是2012年
解决: date -s ‘yyyy-mm-dd hh:mm:ss’   重写时间
再 clock -w  写入cmos


### 4. 可选步骤: make test测试编译情况
若出要安装ctl的错$sudo yum install tcl

### 5. 安装到指定的目录,比如 /usr/local/redis
```
make  PREFIX=/usr/local/redis install
```
注: PREFIX要大写


### 6. make install之后,得到如下几个文件:
* redis-benchmark  性能测试工具
* redis-check-aof  日志文件检测工(比如断电造成日志损坏,可以检测并修复)
* redis-check-dump  快照文件检测工具,效果类上，检查rbd日志工具
* redis-cli  客户端
* redis-server 服务端



### 7. 复制配置文件
```
cp /path/redis.conf /usr/local/redis
```

### 8. 启动与连接
```
/path/to/redis/bin/redis-server  ./path/to/conf-file
```
 
### 9. 连接: 用redis-cli
```
/path/to/redis/bin/redis-cli [-h localhost -p 6379 ]
```

### 10. 让redis以后台进程的形式运行
编辑conf配置文件,修改如下内容;
```
daemonize yes
```



## Redis对于key的操作命令

### keys pattern, 查询key

在redis里,允许模糊查询key

有3个通配符 `*, ? ,[  ]`
```
*: 通配任意多个字符
?: 通配单个字符
[ ]: 通配括号内的某1个字符
```
```
keys *            查询所有
keys k*           查询以k开头的key
keys on[eaw]     
keys on?
```

### del key1 key2 ... Keyn
作用: 删除1个或多个键
返回值: 不存在的key忽略掉,返回真正删除的key的数量

 

### rename key newkey
作用: 给key赋一个新的key名
注:如果newkey已存在,则newkey的原值被覆盖

 

### renamenx key newkey 
作用: 把key改名为newkey
返回: 发生修改返回1,未发生修改返回0

注: nx--> not exists, 即, newkey不存在时,作改名动作

 
### move key db
```
# 数据库的概念
redis 127.0.0.1:6379[1]> select 2    # 选库，默认是0库
OK

redis 127.0.0.1:6379[2]> keys *
(empty list or set)

redis 127.0.0.1:6379[2]> select 0
OK

redis 127.0.0.1:6379> keys *
1) "name"
2) "cc"
3) "a"
4) "b"

redis 127.0.0.1:6379> move cc 2  # 将cc移动到2库
(integer) 1

(注意: 一个redis进程,打开了不止一个数据库, 默认打开16个数据库,从0到15编号,如果想打开更多数据库,可以从配置文件修改)
```



### 其他
* randomkey 返回随机key

* exists key
判断key是否存在,返回1/0

* type key
返回key存储的值的类型
有string,link,set,order set, hash

* ttl key
作用: 查询key的生命周期
返回: 秒数
注:对于不存在的key或已过期的key/不过期的key,都返回-1

* expire key 整型值
作用: 设置key的生命周期,以秒为单位

* pexpire key 毫秒数, 设置生命周期

* pttl  key, 以毫秒返回生命周期

* persist key
作用: 把指定key置为永久有效

* Flushdb  清空key


## Redis字符串类型的操作

### set key value [ex 秒数] / [px 毫秒数]  [nx] /[xx]
如: set a 1 ex 10 , 10秒有效
Set a 1 px 9000  , 9毫秒数
注: 如果ex,px同时写,以后面的有效期为准
如 set a 1 ex 100 px 9000, 实际有效期是9000毫秒
nx: 表示key不存在时,执行操作
xx: 表示key存在时,执行操作

 

### mset  multi set , 一次性设置多个键值
例: mset key1 v1 key2 v2 ....


### get key
作用:获取key的值

### mget key1 key2 ..keyn
作用:获取多个key的值

### setrange key offset value
作用:把字符串的offset偏移字节,改成value
注意: 如果偏移量>字符长度, 该字符自动补0x00


### append key value
作用: 把value追加到key的原值上

### getrange key start stop
作用: 是获取字符串中 [start, stop]范围的值
0. 对于字符串的下标,左数从0开始,右数从-1开始
1. start>=length, 则返回空字符串
2. stop>=length,则截取至字符结尾
3. 如果start 所处位置在stop右边, 返回空字符串

### getset key newvalue
作用: 获取并返回旧值,设置新值

### incr key
作用: 指定的key的值加1,并返回加1后的值
注意:
1: 不存在的key当成0,再incr操作
2: 范围为64有符号

### incrby key number
把key增加number

### incrbyfloat key floatnumber
把key增加floatnumber

### decr key
### decrby key number


### getbit key offset
作用:获取值的二进制表示,对应位上的值(从左,从0编号)

### setbit  key offset value
设置offset对应二进制位上的值
返回: 该位上的旧值
注意:
1. 如果offset过大,则会在中间填充0,
2. offset最大大到多少
3. offset最大2^32-1,可推出最大的的字符串为512M

### Setbit 的实际应用

场景: 1亿个用户, 每个用户 登陆/做任意操作  ,记为 今天活跃,否则记为不活跃

每周评出: 有奖活跃用户: 连续7天活动      每月评,等等...

思路:
```
Userid       date            active
1        2013-07-27           1
1       2013-0726             1
```
 
如果是放在表中, 1.表急剧增大, 2.要用group ,sum运算,计算较慢
用: 位图法bit-map
```
Log0721:  '011001...............0'
......
log0726 :   '011001...............0'
Log0727 :  '0110000.............1'
```

1. 记录用户登陆:
每天按日期生成一个位图, 用户登陆后,把user_id位上的bit值置为1
2. 把1周的位图  and 计算,
位上为1的,即是连续登陆的用户

优点:
1. 节约空间, 1亿人每天的登陆情况,用1亿bit,约1200WByte,约10M 的字符就能表示
2. 计算方便



### bitop operation destkey key1 [key2 ...]
对key1,key2..keyN作operation,并将结果保存到 destkey 上。
operation 可以是 AND 、 OR 、 NOT 、 XOR
注意: 对于NOT操作, key不能多个


## link 链表结构

### lpush key value
作用: 把值插入到链接头部

### lindex key index
作用: 返回index索引上的值,
如  lindex key 2

### llen key
作用:计算链接表的元素个数

### lrange key start  stop
作用: 返回链表中[start ,stop]中的元素，即查看元素
规律: 左数从0开始,右数从-1开始,lrange key 0  -1


### rpop key
作用: 返回并删除链表尾元素

### rpush,lpop
不解释

### lrem key count value
作用: 从key链表中删除 value值
注: 删除count的绝对值个value后结束
Count>0 从表头删除
Count<0 从表尾删除

 

### ltrim key start stop
作用: 剪切key对应的链接,切[start,stop]一段,并把该段重新赋给key


### linsert  key after|before search value

作用: 在key链表中寻找’search’,并在search值之前|之后,.插入value
注: 一旦找到一个search后,命令就结束了,因此不会插入多个value

### rpoplpush source dest
作用: 把source的尾部拿出,放在dest的头部,
并返回 该单元值


## 集合 set 相关命令
集合的性质: 唯一性,无序性,确定性
注: 在string和link的命令中,可以通过range 来访问string中的某几个字符或某几个元素
但,因为集合的无序性,无法通过下标或范围来访问部分元素.
因此想看元素,要么随机先一个,要么全选

### sadd key  value1 value2
作用: 往集合key中增加元素

### smembers key
作用: 返回集中中所有的元素，即查看

### scard key
作用: 返回集合中元素的个数

### srem key value1 value2
作用: 删除集合中集为 value1 value2的元素
返回值: 忽略不存在的元素后,真正删除掉的元素的个数

### spop key
作用: 返回并删除集合中key中1个随机元素
随机--体现了无序性

### srandmember key
作用: 返回集合key中,随机的1个元素.

### sismember key  value
作用: 判断value是否在key集合中
是返回1,否返回0


### smove source dest value
作用:把source中的value删除,并添加到dest集合中

### sinter  key1 key2 key3
作用: 求出key1 key2 key3 三个集合中的交集,并返回


### sinterstore dest key1 key2 key3
作用: 求出key1 key2 key3 三个集合中的交集,并赋给dest

### suion key1 key2.. Keyn
作用: 求出key1 key2 keyn的并集,并返回

### sdiff key1 key2 key3
作用: 求出key1与key2 key3的差集
即key1-key2-key3



## order set(有序集合)

### zadd key score1 value1 score2 value2 ..

添加元素   有score才能排序呢,才是有序的
redis 127.0.0.1:6379> zadd stu 18 lily 19 hmm 20 lilei 21 lilei
(integer) 3 # lilei添加了两次


### zrange key start stop [WITHSCORES]

把集合排序后,返回名次[start,stop]的元素
默认是升续排列
Withscores 是把score也打印出来

### zrem key value1 value2 ..
作用: 删除集合中的元素

### zremrangebyscore key min max
作用: 按照socre来删除元素,删除score在[min,max]之间的

redis 127.0.0.1:6379> zremrangebyscore stu 4 10
(integer) 2

redis 127.0.0.1:6379> zrange stu 0 -1
1) "f"

### zremrangebyrank key start end

作用: 按排名删除元素,删除名次在[start,end]之间的
```
redis 127.0.0.1:6379> zremrangebyrank stu 0 1
(integer) 2
```

 

### zrank key member

查询member的排名(升续 0名开始),查询排在第几位

### zrevrank key memeber

查询 member的排名(降续 0名开始)


### zrevrange key start stop    当然按score排序了
作用:把集合降序排列,取名字[start,stop]之间的元素

 
###  zrangebyscore  key min max [withscores] limit offset N 当然按score排序

作用: 集合(升续)排序后,取score在[min,max]内的元素,

并跳过 offset个, 取出N个
```
redis 127.0.0.1:6379> zadd stu 1 a 3 b 4 c 9 e 12 f 15 g

(integer) 6

redis 127.0.0.1:6379> zrangebyscore stu 3 12 limit 1 2 withscores
1) "c"
2) "4"
3) "e"
4) "9"
```

### zcard key

返回元素个数

### zcount key min max

返回[min,max] 区间内元素的数量


### zinterstore destination numkeys key1 [key2 ...]      [WEIGHTS weight [weight ...]]       [AGGREGATE SUM|MIN|MAX]

numkeys 是取几个

求key1,key2的交集,key1,key2的权重分别是 weight1,weight2

聚合方法用: sum |min|max

聚合的结果,保存在dest集合内

 

注意: weights ,aggregate如何理解?

答: 如果有交集, 交集元素又有socre,score怎么处理?
 Aggregate sum->score相加,min求最小score,max最大score

另: 可以通过weigth设置不同key的权重,交集时,key1.socre * key1.weights + key2.socre * key2.weights + ...


详见下例
```
redis 127.0.0.1:6379> zadd z1 2 a 3 b 4 c
(integer) 3

redis 127.0.0.1:6379> zadd z2 2.5 a 1 b 8 d
(integer) 3

redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2
(integer) 2

redis 127.0.0.1:6379> zrange tmp 0 -1
1) "b"
2) "a"

redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"

redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate sum
(integer) 2

redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"

redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate min
(integer) 2

redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "1"
3) "a"
4) "2"

redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 weights 1 2
(integer) 2

redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "5"
3) "a"
4) "7"
```



## Hash 哈希数据类型相关命令
### hset key field value

作用: 把key中 filed域的值设为value

注:如果没有field域,直接添加,如果有,则覆盖原field域的值

### hmset key field1 value1 [field2 value2 field3 value3 ......fieldn valuen]

作用: 设置field1->N 个域, 对应的值是value1->N

(对应PHP理解为  $key = array(file1=>value1, field2=>value2 ....fieldN=>valueN))

### hget key field

作用: 返回key中field域的值

### hmget key field1 field2 fieldN

作用: 返回key中field1 field2 fieldN域的值

### hgetall key

作用:返回key中,所有域与其值

### hdel key field

作用: 删除key中 field域

### hlen key

作用: 返回key中元素的数量

### hexists key field

作用: 判断key中有没有field域

### hinrby key field value

作用: 是把key中的field域的值增长整型值value

### hinrby float  key field value

作用: 是把key中的field域的值增长浮点值value

### hkeys key

作用: 返回key中所有的field

### kvals key

作用: 返回key中所有的value



## Redis 中的事务

Redis与 mysql事务的对比

|      |Mysql             |Redis|
|---- |-----              | ---|
|开启    |start transaction |    muitl|
|语句    |普通sql           | 普通命令|
|失败    |rollback 回滚       |discard 取消|
|成功    |commit             |    exec|

注: rollback与discard 的区别

如果已经成功执行了2条语句, 第3条语句出错.
Rollback后,前2条的语句影响消失.
Discard只是结束本次事务,前2条语句造成的影响仍然还在

注:
在mutil后面的语句中, 语句出错可能有2种情况

1: 语法就有问题,
这种,exec时,报错, 所有语句得不到执行

2: 语法本身没错,但适用对象有问题. 比如 zadd 操作list对象
Exec之后,会执行正确的语句,并跳过有不适当的语句.
(如果zadd操作list这种事怎么避免? 这一点,由程序员负责)

Redis支持简单的事务,Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：
* 批量操作在发送 EXEC 命令前被放入队列缓存。
* 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
* 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。

一个事务从开始到执行会经历以下三个阶段：
* 开始事务。
* 命令入队。
* 执行事务。


思考:

我正在买票
Ticket -1 , money -100

而票只有1张, 如果在我multi之后,和exec之前, 票被别人买了---即ticket变成0了.
我该如何观察这种情景,并不再提交

* 悲观的想法:
世界充满危险,肯定有人和我抢, 给 ticket上锁, 只有我能操作. [悲观锁]

* 乐观的想法:
没有那么人和我抢,因此,我只需要注意,有没有人更改ticket的值就可以了 [乐观锁]

Redis的事务中,启用的是**乐观锁**,只负责监测key没有被改动.**要是改了就不执行了**

 
具体的命令----`watch`命令
```
redis 127.0.0.1:6379> watch ticket
OK

redis 127.0.0.1:6379> multi
OK

redis 127.0.0.1:6379> decr ticket
QUEUED

redis 127.0.0.1:6379> decrby money 100
QUEUED

redis 127.0.0.1:6379> exec
(nil)   // 返回nil,说明监视的ticket已经改变了,事务就取消了.

redis 127.0.0.1:6379> get ticket
"0"

redis 127.0.0.1:6379> get money
"200"
```

* watch key1 key2  ... keyN
作用:监听key1 key2..keyN有没有变化,如果有变, 则事务取消

* unwatch
作用: 取消所有watch监听




## 消息订阅
Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。
Redis 客户端可以订阅任意数量的频道。

* 订阅端: Subscribe 频道名称
* 发布端: publish 频道名称 发布内容

实例：
1. 开启本地 Redis 服务，开启两个 redis-cli 客户端。
2. 在**第一个 redis-cli 客户端**输入 SUBSCRIBE runoobChat，意思是订阅 `runoobChat` 频道。
3. 在**第二个 redis-cli 客户端**输入 PUBLISH runoobChat "Redis PUBLISH test" 往 runoobChat 频道发送消息，这个时候在第一个 redis-cli 客户端就会看到由第二个 redis-cli 客户端发送的测试消息。

## Redis 数据备份与恢复
Redis SAVE 命令用于创建当前数据库的备份。

redis Save 命令基本语法如下：
```
redis 127.0.0.1:6379> SAVE
OK
```
该命令将在 redis 安装目录中创建dump.rdb文件。
恢复数据
如果需要恢复数据，只需将备份文件 (dump.rdb) 移动到 redis 安装目录并启动服务即可。获取 redis 目录可以使用 CONFIG 命令，



## Redis持久化配置

Redis的持久化有2种方式:1.快照  2.是日志


Rdb(Redis DataBase)快照的配置选项
RDB 是 Redis 默认的持久化方案。在指定的时间间隔内，执行指定次数的写操作，则会将内存中的数据写入到磁盘中。即在指定目录下生成一个dump.rdb文件。Redis 重启会通过加载dump.rdb文件恢复数据。

```
// (这3个选项都屏蔽,则rdb禁用)
save 900 1      // 900内,有1条写入,则产生快照
save 300 1000   // 如果300秒内有1000次写入,则产生快照
save 60 10000  // 如果60秒内有10000次写入,则产生快照

 

stop-writes-on-bgsave-error yes  // 后台备份进程出错时,主进程停不停止写入?
rdbcompression yes    // 导出的rdb文件是否压缩
Rdbchecksum   yes //  导入rbd恢复时数据时,要不要检验rdb的完整性
dbfilename dump.rdb  //导出来的rdb文件名
dir ./  //rdb的放置路径
```

Aof (Append Only File) 配置
AOF ：Redis 默认不开启。它的出现是为了弥补RDB的不足（数据的不一致性），所以它采用日志的形式来记录每个写操作，并追加到文件中。Redis 重启的会根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作。

```
appendonly no # 是否打开 aof日志功能
appendfsync always   # 每1个命令,都立即同步到aof. 安全,速度慢
appendfsync everysec # 折衷方案,每秒写1次
appendfsync no      # 写入工作交给操作系统,由操作系统判断缓冲区大小,统一写入到aof. 同步频率低,速度快,


no-appendfsync-on-rewrite  yes: # 正在导出rdb快照的过程中,要不要停止同步aof
auto-aof-rewrite-percentage 100 #aof文件大小比起上次重写时的大小,增长率100%时,重写
auto-aof-rewrite-min-size 64mb #aof文件,至少超过64M时,重写
```



注: 在dump rdb过程中,aof如果停止同步,会不会丢失?
答: 不会,所有的操作缓存在内存的队列里, dump完成后,统一操作.

 

注: aof重写是指什么?
答: aof重写是指把内存中的数据,逆化成命令,写入到.aof日志里.
以解决 aof日志过大的问题.

问: 如果rdb文件,和aof文件都存在,优先用谁来恢复数据?
答: aof

问: 2种是否可以同时用?
答: 可以,而且推荐这么做

问: 恢复时rdb和aof哪个恢复的快
答: rdb快,因为其是数据的内存映射,直接载入到内存,而aof是命令,需要逐条执行


## redis 服务器端命令
```
redis 127.0.0.1:6380> dbsize  // 当前数据库的key的数量
```


Flushall  清空所有库所有键
Flushdb  清空当前库所有键
Showdown [save/nosave]


注: 如果不小心运行了flushall, 立即 shutdown nosave ,关闭服务器
然后 手工编辑aof文件, 去掉文件中的 “flushall ”相关行, 然后开启服务器,就可以导入回原来数据.



 
Slowlog 显示慢查询
注:多慢才叫慢?
答: 由slowlog-log-slower-than 10000 ,来指定,(单位是微秒)

 
服务器储存多少条慢查询的记录?
答: 由 slowlog-max-len 128 ,来做限制


Info [Replication/CPU/Memory..]
查看redis服务器的信息

 


## Redis key 设计技巧
1. 把表名转换为key前缀 如, tag:
2. 第2段放置用于区分区key的字段--对应mysql中的主键的列名,如userid
3. 第3段放置主键值,如2,3,4...., a , b ,c
4. 第4段,写要存储的列名

用户表 user  , 转换为key-value存储
```
userid  username  passworde  email
9       Lisi      1111111    lisi@163.com
```
 

set  user:userid:9:username lisi
set  user:userid:9:password 111111
set  user:userid:9:email   lisi@163.com
keys user:userid:9*

 

注意:
在关系型数据中,除主键外,还有可能其他列也步骤查询,
如上表中, username 也是极频繁查询的,往往这种列也是加了索引的.
转换到k-v数据中,则也要相应的生成一条按照该列为主的key-value
```
Set  user:username:lisi:uid  9 
```
 
这样,我们可以根据username:lisi:uid ,查出userid=9,
再查user:9:password/email ...

 

## php-redis扩展编译

 
1. 到pecl.php.net  搜索redis
2. 下载stable版(稳定版)扩展
3. 解压,
4. 执行/php/path/bin/phpize (作用是检测PHP的内核版本,并为扩展生成相应的编译配置)
5. configure --with-php-config=/php/path/bin/php-config
6. make && make install

 
引入编译出的redis.so插件
1: 编辑php.ini
2: 添加

 

php配置文件
```
extension=php_igbinary.dll
extension=php_redis.dll           windows上要装这两个
http://pecl.php.net/package/redis  官方网站上有安装包
```

redis在php中的的使用
```
// get instance
$redis = new Redis();

 
// connect to redis server
$redis->open('localhost',6380);
$redis->set('user:userid:9:username','wangwu');
var_dump($redis->get('user:userid:9:username'));
```



## 安全问题

### redis设置访问权限
漏洞描述：
redis 默认不需要密码即可访问，黑客直接访问即可获取数据库中所有信息，造成严重的信息泄露。

修复方案：
1. 绑定需要访问数据库的IP
修改 redis.conf 中的 “bind 127.0.0.1” ，改成需要访问此数据库的IP地址。

2. 设置访问密码
在 redis.conf 中找到“requirepass”字段，在后面填上你需要的密码。

> 注：上述两种方法修改后，需要重启redis才能生效。



