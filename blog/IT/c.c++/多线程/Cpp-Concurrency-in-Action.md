github第二版翻译资源：
https://github.com/xiaoweiChen/CPP-Concurrency-In-Action-2ed-2019





2.1 线程管理的基础
启动线程
* 函数
```
void do_some_work();
std::thread my_thread(do_some_work);
```


* 函数对象
```
class background_task
{
public:
  void operator()() const
  {
    do_something();
    do_something_else();
  }
};


background_task f;
std::thread my_thread(f);
```


* lambda表达式
```
std::thread my_thread([]{
  do_something();
  do_something_else();
});
```


启动了线程，你需要明确是要等待线程结束，还是让其自主运行
如果std::thread对象销毁之前还没有做出决定，程序就会终止
std::thread的析构函数会调用std::terminate()