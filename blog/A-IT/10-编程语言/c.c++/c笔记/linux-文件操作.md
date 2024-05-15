## Linux文件概念
Linux系统上的文件部分类型说明
* 普通文件。
就是储存到磁盘上大家所操作的各种数据文件；
* 管道文件。
是一个从一端发送数据，从另一端接收数据的通道；
* 目录
也叫目录文件，是包含了保存在目录中文件的列表；
* 设备文件
是一种特殊文件，提供了大多数物理设备的接口；
* 符号链接
包含了到另一个人文件的连接，类似于windows的快捷方式；
* 套接口
套接口更像管道文件，但可以让处于不同机器上的进程通讯。

文件描述符是个很小的正整数，它是一个索引值，指向内核为每个进程所维护的该进程打开文件的记录表。
例如：每个进程启动时都打开3个文件：
标准输入文件（stdin 0）
标准输出(stdout 1)
标准出错(stderr 2)
编程中应该使用`<unistd.h>`中定义的STDIN_FILENO、 STDOUT_FILENO、 STDERR_FILENO代替数字0、1、2。

## 打开和关闭文件描述符
```c
int open(const char *pathname, int flags);
int close(int fd);
```
Open失败后会返回-1，并设置errno变量。
在一个文件描述符用完后一定要用close()函数关闭它，这样才能保证该进程对文件所有加的锁全部被释放

## 读写文件描述符
```c
ssize_t read(int fd, void *buf, size_t count);
ssize_t write(int fd, void *buf, size_t count);
```
read例子：
```c
int main()
{
    char s[] = "abc.txt";
    int fd = open(s, O_RDONLY);
    if (fd == -1)
    {
        printf("error is %s\n", strerror(errno));
    }
    else
    {
        printf("success fd=%d\n", fd);
        char buf[100];
        memset(buf, 0, sizeof(buf));
        while (read(fd, buf, sizeof(buf)) > 0)
        {
            printf("%s", buf);
            memset(buf, 0, sizeof(buf));
        }
        close(fd);
    }
    return 0;
}
```
write例子：
```c
int main()
{
    char s[] = "abc.txt";
    int fd = open(s, O_RDWR | O_APPEND);
    if (fd == -1)
    {
        printf("error is %s\n", strerror(errno));
    }
    else
    {
        printf("success fd=%d\n", fd);
        char buf[100];
        memset(buf, 0, sizeof(buf));
        strcpy(buf, “hello world\n");
        int i = write(fd, buf, strlen(buf));
        close(fd);
    }
    return 0;
```
## 获取文件信息
```c
int fstat(int fd, struct stat *buf)
int stat(const char *path, struct stat *buf);
```
Struct stat定义如下：
```c
struct stat {
              dev_t st_dev; /* ID of device containing file */
              ino_t st_ino; /* inode number */
              mode_t st_mode; /* protection */
              nlink_t st_nlink; /* number of hard links */
              uid_t st_uid; /* user ID of owner */
              gid_t st_gid; /* group ID of owner */
              dev_t st_rdev; /* device ID (if special file) */
              off_t st_size; /* total size, in bytes */
              blksize_t st_blksize; /* blocksize for filesystem I/O */
              blkcnt_t st_blocks; /* number of blocks allocated */
              time_t st_atime; /* time of last access */
              time_t st_mtime; /* time of last modification */
              time_t st_ctime; /* time of last status change */
          };
```
为了正确解释文件类型，有一套宏能够计算stat接口的**st_mod**成员。
```c
/*
S_ISREG(m) is it a regular file?
S_ISDIR(m) directory?
S_ISCHR(m) character device?
S_ISBLK(m) block device?
S_ISFIFO(m) FIFO (named pipe)?
S_ISLNK(m) symbolic link? (Not in POSIX.1-1996.)
S_ISSOCK(m) socket? (Not in POSIX.1-1996.)
*/
```
## 库函数和系统调用的区别
定义和来源：
- 库函数：库函数是由C标准库或其他库提供的函数，可以在程序中调用。C标准库提供了许多常用的库函数，如`printf`、`scanf`、`malloc`等。其他库（例如数学库、字符串处理库等）也可以提供自定义的库函数。
- 系统函数：系统函数是由**操作系统提供的函数**，用于访问操作系统的功能和服务。这些函数提供了操作系统级别的操作，如文件操作、进程管理、网络通信等。

跨平台性：
- 库函数：C标准库函数通常是跨平台的，也就是说，它们在不同的操作系统和编译器上都有相同的接口和功能。
- 系统函数：系统函数的接口和功能可能因操作系统的不同而有所变化。因此，在跨平台开发时，需要注意系统函数的兼容性和可移植性。

功能范围：
- 库函数：库函数提供了通用的功能，例如输入输出、字符串处理、数学运算等。这些函数是C语言提供的基本工具，可以在不同的应用中使用。
- 系统函数：系统函数提供了访问操作系统底层功能的接口，例如文件读写、进程管理、网络通信等。这些函数涉及到操作系统的内核级别操作，通常用于实现更高级别的功能。
* 库函数对系统函数进行了适当的封装，I/O操作进行缓冲，减少了系统调用开销


## 库函数的文件IO操作：
```c
FILE *p fopen(const char *path, const char *mode);
int fclose(FILE *stream);
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
size_t fwrite(void *ptr, size_t size, size_t nmemb, FILE *stream);
int fprintf(FILE *stream, const char *fromat,…);
int fscanf(FILE *stream, const char *fromat,…);
char fgets(char *s, int size, FILE *stream);
int fputs(const char *s, FILE *stream);
//文件目录
int remove(const char *pathname);
int rename(const char *oldpath, const char *newpath);
char *getcwd(char *buf，size_t size); //获取当前工作路径
DIR *opendir(const char *pathname);
struct dirent *readdir(DIR *dir);
int closedir(DIR *dir);
```
程序中记录日志的功能：
```c
void writelog(const char *log)
{
    time_t tDate;
    struct tm *eventTime;
    time(&tDate);
    eventTime = localtime(&tDate);
    int iYear = eventTime->tm_year + 1900;
    int iMon = eventTime->tm_mon + 1;
    int iDay = eventTime->tm_mday;
    int iHour = eventTime->tm_hour;
    int iMin = eventTime->tm_min;
    int iSec = eventTime->tm_sec;
    char sDate[16];
    sprintf(sDate, "%04d-%02d-%02d", iYear, iMon, iDay);
    char sTime[16];
    sprintf(sTime, "%02d:%02d:%02d", iHour, iMin, iSec);
    char s[1024];
    sprintf(s, "%s %s %s\n", sDate, sTime, log);
    FILE *fd = fopen("my.log", "a+");
    fputs(s, fd);
    fclose(fd);
}
```
获取目录列表例子:
```c
int main(int argc, char *argv[])
{
    if (argc < 2)
        return 0;
    DIR *dp;
    struct dirent *dirp;
    dp = opendir(argv[1]);
    if (dp == NULL)
    {
        printf("error is %s\n", strerror(errno));
        return 0;
    }
    while((dirp = readdir(dp)) != NULL)
    {
        printf("%s\n", dirp->d_name);
    }
    closedir(dp);
    return 0;
}
```