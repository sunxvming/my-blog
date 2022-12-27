## 使用mavicat连接redshift
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/03fde49b-f29f-4259-b998-4da7a0278abd.png)




## Redshift 与PoetgreSQL 
Redshift 是基于 Amazon 云平台(AWS) 的数据仓库，是基于 PoetgreSQL 为基础的，换句话说就是云环境下的 PostgreSQL。但是又有很一个根本的区别：MPP （Massively Parallel Processing)  海量并行处理，它在表的设计如存储，与PostgreSQL 是不同的，主要就是它是居于高性能多节点的存储方式，通常用来设计 PB级别的数据仓库。Redshift 是目前我接触到的数据仓库里查询性能最快的（相同价格下），但是它的设计和优化也是相当复杂的，它与传统数据库/数据仓库的最大不同就是应为使用了 Columnar index 技术，它在建表是的分布、排序策略等都与 PostgreSQL 不同。



