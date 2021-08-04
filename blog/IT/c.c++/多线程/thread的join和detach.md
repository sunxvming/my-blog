## join
### 正常情况
阻塞当前线程，直至所有线程都完成。该方法简单暴力，主线程等待子进程期间什么都不能做。thread::join()会清理子线程相关的内存空间，此后thread object将不再和这个子线程相关了，即thread object不再joinable了，所以join对于一个子线程来说只可以被调用一次，为了实现更精细的线程等待机制，可以使用条件变量等机制。
```
#include <iostream>
#include <thread>
#include <chrono>
 
void foo()
{
    std::cout << "foo is started\n";
    // 模拟昂贵操作
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "foo is done\n";
}
 
void bar()
{
    std::cout << "bar is started\n";
    // 模拟昂贵操作
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "bar is done\n";
}
 
int main()
{
    std::cout << "starting first helper...\n";
    std::thread helper1(foo);
 
    std::cout << "starting second helper...\n";
    std::thread helper2(bar);
 
    std::cout << "waiting for helpers to finish...\n" << std::endl;
    helper1.join();
    helper2.join();
 
    std::cout << "done!\n";
}
```
运行结果：
```
starting first helper...
starting second helper...
foo is started
waiting for helpers to finish...
bar is started


foo is done
bar is done
done!
```
### thread中有异常
 异常环境下join，假设主线程在一个函数f()里面创建thread object,接着f()又调用其它函数g(),那么确保在g()以任何方式下退出主线程都能join子线程。如：若g()通过异常退出，那么f()需要捕捉异常后join.
```
#include<iostream>  
#include<boost/thread.hpp>  
void do_something(int& i){  
    i++;  
}  
class func{  
    public:  
        func(int& i):i_(i){}  
        void operator() (){  
            for(int j=0;j<100;j++)  
                do_something(i_);  
        }  
    public:  
        int& i_;  
};  
void do_something_in_current_thread(){}  
void f(){  
    int local=0;  
    func my_func(local);  
    boost::thread t(my_func);  
    try{  
        do_something_in_current_thread();  
    }  
    catch(...){  
        t.join();//确保在异常条件下join子线程  
        throw;  
    }  
    t.join();  
}  
int main(){  
    f();  
    return 0;  
}
```
上面的方法看起来笨重，有个解决办法是采用RAII(资源获取即初始化)，将一个thread object通过栈对象A管理，在栈对象A析构时调用thread::join.按照局部对象析构是构造的逆序，栈对象A析构完成后再析构thread object。如下：


```
#include<iostream>  
#include<boost/noncopyable.hpp>  
#include<boost/thread.hpp>  
using namespace std;  
class thread_guard:boost::noncopyable{  
    public:  
        explicit thread_guard(boost::thread& t):t_(t){}  
        ~thread_guard(){  
            if(t_.joinable()){//检测是很有必要的，因为thread::join只能调用一次，要防止其它地方意外join了  
               t_.join();  
            }  
        }  
        //thread_guard(const thread_guard&)=delete;//c++11中这样声明表示禁用copy constructor需要-std=c++0x支持，这里采用boost::noncopyable已经禁止了拷贝和复制  
        //thread_guard& operator=(const thread_guard&)=delete;  
    private:  
        boost::thread& t_;  
};  
void do_something(int& i){  
    i++;  
}  
class func{  
    public:  
        func(int& i):i_(i){}  
        void operator()(){  
            for(int j=0;j<100;j++)  
                do_something(i_);  
        }  
    public:  
        int& i_;  
};  
void do_something_in_current_thread(){}  
void fun(){  
    int local=0;  
    func my_func(local);  
    boost::thread t(my_func);  
    thread_guard g(t);  
    do_something_in_current_thread();  
}  
int main(){  
    fun();  
    return 0;  
}
```
## detach
当使用detach()函数时，主调线程继续运行，被调线程驻留后台运行，主调线程无法再取得该被调线程的控制权。当主调线程结束时，由运行时库负责清理与被调线程相关的资源。使用detach(),main函数不用等待线程结束才能结束。有时候线程还没运行完，main函数就已经结束了。
```
#include <iostream>
#include <chrono>
#include <thread>
 
void independentThread() 
{
    std::cout << "Starting concurrent thread.\n";
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Exiting concurrent thread.\n";
}
 
void threadCaller() 
{
    std::cout << "Starting thread caller.\n";
    std::thread t(independentThread);
    t.detach();
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "Exiting thread caller.\n";
}
 
int main() 
{
    threadCaller();
    std::this_thread::sleep_for(std::chrono::seconds(5));
    std::cout << "back to main.\n";
}
```
运行结果：
```
Starting thread caller.
Starting concurrent thread.
Exiting thread caller.
Exiting concurrent thread.
back to main.
```
 如果注释掉main函数里的std::this_thread::sleep_for(std::chrono::seconds(5)); 即不等待independentThread 执行完。运行结果如下：
```
Starting thread caller.
Starting concurrent thread.
Exiting thread caller.
back to main.
```

