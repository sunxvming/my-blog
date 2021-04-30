### glob  
函数查找匹配指定模式的文件名或目录。功能强大
```
#include <glob.h>
int glob(const char *pattern, int flags,int errfunc(const char *epath, int eerrno),glob_t *pglob);
```


### system
属于stdlib.h中的，linux下，system（）会调用fork（）产生子进程，由子进程来用exec调用/bin/sh -c string来执行参数string字符串所代表的命令，此命令执行完后随即返回原调用的进程


```
system("start notepad");   多个进程的打开(异步的打开)
system("notepad") 单个的打开(同步的打开)

system("pause");      cmd窗口的停止
system("explorer.exe  C:\\Program Files"); 打开资源管理器并进入相应的目录
```
