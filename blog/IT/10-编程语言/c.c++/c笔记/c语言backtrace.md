## 向文件中输出栈调用信息
```
#include <stdio.h>
#include <stdlib.h>
#include <execinfo.h>
#include <signal.h>


void dump(int signo)
{
        fprintf(stderr,"catch Segmentation fault!!!\n");
#define SIZE 100
        FILE *fh;
        if(!(fh = fopen("./dbg_msg.log", "w+")))
                exit(0);
        void *buffer[100];
        int nptrs;
        nptrs = backtrace(buffer,SIZE);
        backtrace_symbols_fd(buffer, nptrs, fileno(fh));
        fflush(fh);
        exit(-1);
}


int main(){
   signal(SIGSEGV, &dump); 
   char *p;  
   p = NULL;  
   *p = 'x';  
   printf("%c", *p);  
   return 0;
}
```
打印格式
```
./main[0x4010b9]
/lib64/libc.so.6(+0x36400)[0x7f8d88b87400]
./main[0x401117]
/lib64/libc.so.6(__libc_start_main+0xf5)[0x7f8d88b73555]
./main[0x400db9]
```
打印的是程序的地址，需要用工具把地址转成文件的行号
```
addr2line -e <带符号库> <内存地址>
addr2line -e main 0x4010b9
addr2line -e main 0x401117
addr2line -e main 0x400db9
```


## muduo网络库中的实现
```
// 代码位置：muduo/base/CurrentThread.h

string stackTrace(bool demangle)
{
  string stack;
  const int max_frames = 200;
  void* frame[max_frames];
  int nptrs = ::backtrace(frame, max_frames);
  char** strings = ::backtrace_symbols(frame, nptrs);
  if (strings)
  {
    size_t len = 256;
    char* demangled = demangle ? static_cast<char*>(::malloc(len)) : nullptr;
    for (int i = 1; i < nptrs; ++i)  // skipping the 0-th, which is this function
    {
      if (demangle)
      {
        // https://panthema.net/2008/0901-stacktrace-demangled/
        // bin/exception_test(_ZN3Bar4testEv+0x79) [0x401909]
        char* left_par = nullptr;
        char* plus = nullptr;
        for (char* p = strings[i]; *p; ++p)
        {
          if (*p == '(')
            left_par = p;
          else if (*p == '+')
            plus = p;
        }

        if (left_par && plus)
        {
          *plus = '\0';
          int status = 0;
          char* ret = abi::__cxa_demangle(left_par+1, demangled, &len, &status);
          *plus = '+';
          if (status == 0)
          {
            demangled = ret;  // ret could be realloc()
            stack.append(strings[i], left_par+1);
            stack.append(demangled);
            stack.append(plus);
            stack.push_back('\n');
            continue;
          }
        }
      }
      // Fallback to mangled names
      stack.append(strings[i]);
      stack.push_back('\n');
    }
    free(demangled);
    free(strings);
  }
  return stack;
}
```



