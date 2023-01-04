今天在熟悉项目的过程中发现了sql的一个函数，觉得挺有意思的，这边就记录一下


当我们使用SQL语句查询的时候，总会遇到对区间进行分组查询的需求的，这时候我们就需要用到interval和elt两个函数来组合完成


 


首先介绍一下这两个函数


1.elt（）


   ELT(N,str1,str2,str3,...)


如果N= 1，返回str1，如果N= 2，返回str2，等等。如果N小于1或大于参数个数，返回NULL。ELT()是FIELD()反运算。
```
mysql> select ELT(1, 'ej', 'Heja', 'hej', 'foo');


        -> 'ej'


mysql> select ELT(4, 'ej', 'Heja', 'hej', 'foo');


        -> 'foo'
```
 


2.interval（）


    Return the index of the argument that is less than the first argument（小于后面的某个参数，就返回这个参数的前一个位置数字）


    INTERVAL(N,N1,N2,N3,...)


Returns 0 if N < N1, 1 if N < N2 and so on or -1 if N is NULL. All arguments are treated as integers. It is required that N1 < N2 < N3 < ... < Nn for this function to work correctly. This is because a binary search is used (very fast).
```
mysql> SELECT INTERVAL(23, 1, 15, 17, 30, 44, 200); （23小于30，30的位置是4，于是返回3）


        -> 3


mysql> SELECT INTERVAL(10, 1, 10, 100, 1000);


        -> 2


mysql> SELECT INTERVAL(22, 23, 30, 44, 200);


        -> 0
```
 


在项目中的运用，业务场景：根据申报条件个数和申报类型进行去查询每个分组的政策数量
```
SELECT


    elt ( INTERVAL ( condition_count, 0, 3, 5.01, 8.01, 10.1 ), '少于3个条件', '少于5个条件', '少于8个条件', '少于10个条件', '多于10个条件' ) AS difficult,


    subsidy_type,


    count( 1 ) num


FROM policy_info


GROUP BY difficult, subsidy_type
```