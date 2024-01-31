1.  `show variables;`查看profiling 是否是on状态；
2. 如果是off，则 用`set profiling = 1;`开启
3. 执行自己的sql语句；
4. `show profiles;` 就可以查到sql语句的执行时间；