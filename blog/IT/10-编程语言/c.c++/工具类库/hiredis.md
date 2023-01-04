而Hiredis是一个Redis的C客户端库函数，基本实现了Redis的协议的最小集。在C/C++开发中如果要使用Redis，则Hiredis是比较常用到的。
Hiredis就是一个C库函数，提供了基本的操作函数：
比如数据库连接、发送命令、释放资源：
```
/**连接数据库*/
redisContext *redisConnect(const char *ip, int port);
/**发送命令请求*/
void *redisCommand(redisContext *c, const char *format, ...);
void *redisCommandArgv(redisContext *c, int argc, const char **argv, const size_t *argvlen);
void redisAppendCommand(redisContext *c, const char *format, ...);
void redisAppendCommandArgv(redisContext *c, int argc, const char **argv, const size_t *argvlen);
/*释放资源*/
void freeReplyObject(void *reply);
void redisFree(redisContext *c);
```
在使用时，一般顺序为先用 redisConnect 连接数据库，然后用 redisCommand 执行命令，执行完后用 freeReplyObject 来释放redisReply对象，最后用 redisFree 来释放整个连接。


命令执行函数返回的其实是一个指向redisReply对象的指针，redisReply对象是存储Redis操作返回结果的结构体：
```
/* This is the reply object returned by redisCommand() */
typedef struct redisReply {
    /*命令执行结果的返回类型*/
    int type; /* REDIS_REPLY_* */
    /*存储执行结果返回为整数*/
    long long integer; /* The integer when type is REDIS_REPLY_INTEGER */
    /*字符串值的长度*/
    size_t len; /* Length of string */
    /*存储命令执行结果返回是字符串*/
    char *str; /* Used for both REDIS_REPLY_ERROR and REDIS_REPLY_STRING */
    /*返回结果是数组的大小*/
    size_t elements; /* number of elements, for REDIS_REPLY_ARRAY */
    /*存储执行结果返回是数组*/
    struct redisReply **element; /* elements vector for REDIS_REPLY_ARRAY */
} redisReply;
```





