popen可以让你在 C++ 程序中执行 shell 命令，并且得到命令执行的结果

## popen使用
以下是对popen的封装，输入是执行的命令，输出是命令执行的结果
```
#include <iostream>
#include <stdexcept>
#include <stdio.h>
#include <string>


std::string exec(const char* cmd)  // cmd 是你要执行的命令
{
    char buffer[128];
    std::string result ;  // result 保存命令执行的结果


    FILE* pipe = popen(cmd, "r");


    if (!pipe) 
        throw std::runtime_error("popen() failed!");


    try 
    {
        while (fgets(buffer, sizeof buffer, pipe) != NULL) 
        {
            result += buffer ;
        }
    } 
    catch (...) 
    {
        pclose(pipe);
        throw ;
    }


    pclose(pipe);


    return result ;
}
```
C++11写法
```
#include <cstdio>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>
#include <array>


std::string exec(const char* cmd)  // cmd 是你要执行的命令
{
    std::array<char, 128> buffer ;
    std::string result ;  // result 保存命令执行的结果


    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);


    if (!pipe) 
    {
        throw std::runtime_error("popen() failed!");
    }


    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) 
    {
        result += buffer.data();
    }


    return result ;
}
```

## Linux的system()和popen()差异
system()、popen()给我们处理了fork、exec、waitpid等一系列的处理流程，让我们只需要关注最后的返回结果(函数的返回值)即可。

### system()、popen()源码
```
int system(const char *command)
{
    struct sigaction sa_ignore, sa_intr, sa_quit;
    sigset_t block_mask, orig_mask;
    pid_t pid;

    sigemptyset(&block_mask);
    sigaddset(&block_mask, SIGCHLD);
    sigprocmask(SIG_BLOCK, &block_mask, &orig_mask);        //1. block SIGCHLD

    sa_ignore.sa_handler = SIG_IGN;
    sa_ignore.sa_flags = 0;
    sigemptyset(&sa_ignore.sa_mask);
    sigaction(SIGINT, &sa_ignore, &sa_intr);                //2. ignore SIGINT signal
    sigaction(SIGQUIT, &sa_ignore, &sa_quit);                //3. ignore SIGQUIT signal

    switch((pid = fork()))
    {
        case -1:
            return -1;
        case 0:
            sigaction(SIGINT, &sa_intr, NULL); 
            sigaction(SIGQUIT, &sa_quit, NULL); 
            sigprocmask(SIG_SETMASK, &orig_mask, NULL);
            execl("/bin/sh", "sh", "-c", command, (char *) 0);
            exit(127);
        default:
            while(waitpid(pid, NULL, 0) == -1)    //4. wait child process exit
            {
                if(errno != EINTR)
                {
                    break;
                }
            }
    }
}
return 0;
```

```
static pid_t    *childpid = NULL;  
                        /* ptr to array allocated at run-time */  
static int      maxfd;  /* from our open_max(), {Prog openmax} */  

#define SHELL   "/bin/sh"  

FILE *  
popen(const char *cmdstring, const char *type)  
{  
    int     i, pfd[2];  
    pid_t   pid;  
    FILE    *fp;  

            /* only allow "r" or "w" */  
    if ((type[0] != 'r' && type[0] != 'w') || type[1] != 0) {  
        errno = EINVAL;     /* required by POSIX.2 */  
        return(NULL);  
    }  

    if (childpid == NULL) {     /* first time through */  
                /* allocate zeroed out array for child pids */  
        maxfd = open_max();  
        if ( (childpid = calloc(maxfd, sizeof(pid_t))) == NULL)  
            return(NULL);  
    }  

    if (pipe(pfd) < 0)  
        return(NULL);   /* errno set by pipe() */  

    if ( (pid = fork()) < 0)  
        return(NULL);   /* errno set by fork() */  
    else if (pid == 0) {                            /* child */  
        if (*type == 'r') {  
            close(pfd[0]);  
            if (pfd[1] != STDOUT_FILENO) {  
                dup2(pfd[1], STDOUT_FILENO);  
                close(pfd[1]);  
            }  
        } else {  
            close(pfd[1]);  
            if (pfd[0] != STDIN_FILENO) {  
                dup2(pfd[0], STDIN_FILENO);  
                close(pfd[0]);  
            }  
        }  
            /* close all descriptors in childpid[] */  
        for (i = 0; i < maxfd; i++)  
            if (childpid[ i ] > 0)  
                close(i);  

        execl(SHELL, "sh", "-c", cmdstring, (char *) 0);  
        _exit(127);  
    }  
                                /* parent */  
    if (*type == 'r') {  
        close(pfd[1]);  
        if ( (fp = fdopen(pfd[0], type)) == NULL)  
            return(NULL);  
    } else {  
        close(pfd[0]);  
        if ( (fp = fdopen(pfd[1], type)) == NULL)  
            return(NULL);  
    }  
    childpid[fileno(fp)] = pid; /* remember child pid for this fd */  
    return(fp);  
}  
```

popen如何获取命令执行的结果？
命令执行时会将命令的结果输出到标准输出中，通过在父进程中创建一个管道，然后将标准输出到这个管道中，然后父进程从这个管道中读取结果。

### 执行流程
从上面的源码可以看到system和popen都是执行了类似的运行流程，大致是`fork->execl->return`。但是我们看到system在执行期间调用进程会一直等待shell命令执行完成(waitpid等待子进程结束)才返回，但是popen无须等待shell命令执行完成就返回了。我们可以理解system为串行执行，在执行期间调用进程放弃了”控制权”，popen为并行执行。
popen中的子进程没人给它”收尸”了啊？是的，如果你没有在调用popen后调用pclose那么这个子进程就可能变成”僵尸”。
上面我们没有给出pclose的源码，其实我们根据system的源码差不多可以猜测出pclose的源码就是system中第4部分的内容。
