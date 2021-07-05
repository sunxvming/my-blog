## 多线程相关知识点
### 虚假唤醒（spurious wakeup）
在不同的语言，甚至不同的操作系统上，条件锁都会产生虚假唤醒现象。所有语言的条件锁库都推荐用户把wait()放进循环里：
```
while (!cond) {
    lock.wait();
}
```
在多核处理器下，pthread_cond_signal可能会激活多于一个线程（阻塞在条件变量上的线程）。结果是，当一个线程调用pthread_cond_signal()后，多个调用pthread_cond_wait()或pthread_cond_timedwait()的线程返回。这种效应成为”虚假唤醒”(spurious wakeup)。
虽然虚假唤醒在pthread_cond_wait函数中可以解决，为了发生概率很低的情况而降低边缘条件（fringe condition）效率是不值得的，纠正这个问题会降低对所有基于它的所有更高级的同步操作的并发度。所以pthread_cond_wait的实现上没有去解它。




### mutex和spinlock
mutex和spinlock都是用于多进程/线程间访问公共资源时保持同步用的，只是在**lock失败的时候**处理方式有所不同。
写程序的时候，如果对mutex和spinlock有任何疑惑，请选择使用mutex
* mutex：一旦上锁失败就会进入sleep，让其他thread运行，这就需要内核将thread切换到sleep状态，如果mutex又在很短的时间内被释放掉了，那么又需要将此thread再次唤醒，这需要消耗许多CPU指令和时间，这种消耗还不如让thread去轮讯。
* spinlock: 如果其他thread解锁的时间很长的话，这种spinlock进行轮讯的方式将会浪费很多CPU资源。


## c++多线程相关的头文件
```
<atomic>：该头文主要声明了两个类, std::atomic 和 std::atomic_flag，另外还声明了一套 C 风格的原子类型和与 C 兼容的原子操作的函数。
<thread>：该头文件主要声明了 std::thread 类，另外 std::this_thread 命名空间也在该头文件中。
<mutex>：该头文件主要声明了与互斥量(mutex)相关的类，包括 std::mutex 系列类，std::lock_guard, std::unique_lock, 以及其他的类型和函数。
<condition_variable>：该头文件主要声明了与条件变量相关的类，包括 std::condition_variable 和 std::condition_variable_any。
<future>：该头文件主要声明了 std::promise, std::package_task 两个 Provider 类，
以及 std::future 和 std::shared_future 两个 Future 类，另外还有一些与之相关的类型和函数，std::async() 函数就声明在此头文件中。
```

## 一.thread

### std::thread
拷贝构造函数(被禁用)，thread 不可被拷贝构造。
拷贝赋值操作被禁用，thread 不可被拷贝。


### std::this_thread
std::this_thread::yield
std::this_thread::get_id
std::this_thread::sleep_for
    std::this_thread::sleep_for(std::chrono::seconds(5));
std::this_thread::sleep_until


### 成员函数
* get_id()
获取线程 ID。
* joinable()
检查线程是否可被 join。
* join()
Join 线程。
* detach()
Detach 线程




## 二.mutex


### Mutex 系列类(四种)


#### 1.std::mutex，最基本的 Mutex 类。
std::mutex不允许拷贝构造，也不允许 move 拷贝


lock()
调用后3种情况：1.mutex没被锁，得锁 2.mutex被别的线程锁住，阻塞 3.mutex被当前线程锁住，死锁


try_lock()
调用后3种情况：1.mutex没被锁，得锁 2.mutex被别的线程锁住，返回 false 3.mutex被当前线程锁住，死锁


#### 2.std::recursive_mutex，递归 Mutex 类
允许同一个线程对互斥量多次上锁（即递归上锁）
std::recursive_mutex 释放互斥量时需要调用与该锁层次深度相同次数的 unlock()，可理解为 lock() 次数和 unlock() 次数相同




#### 3.std::time_mutex，定时 Mutex 类
std::time_mutex比 std::mutex 多了两个成员函数，try_lock_for()，try_lock_until()。


* try_lock_for 
函数接受一个时间范围，表示在这**一段时间范围**之内线程如果没有获得锁则被**阻塞住**
（与 std::mutex 的 try_lock() 不同，try_lock 如果被调用时没有获得锁则直接返回 false），如果在此期间其他线程释放了锁，则该线程可以获得对互斥量的锁，如果超时（即在指定时间内还是没有获得锁），则返回 false。




* try_lock_until 
函数则接受一个**时间点**作为参数，在指定时间点未到来之前线程如果没有获得锁则被阻塞住，如果在此期间其他线程释放了锁，则该线程可以获得对互斥量的锁，如果超时（即在指定时间内还是没有获得锁），则返回 false。




#### 4.std::recursive_timed_mutex，定时递归 Mutex 类。
std::time_mutex和std::recursive_mutex结合






### Lock 类（两种）


#### 1. std::lock_guard
与Mutex RAII 相关，方便线程对互斥量上锁。
构造函数
* locking 初始化
explicit lock_guard (mutex_type& m);
lock_guard 对象管理 Mutex 对象 m，并在构造时对 m 进行上锁（调用 m.lock()）。
* adopting初始化
lock_guard (mutex_type& m, adopt_lock_t tag);
lock_guard 对象管理 Mutex 对象 m，与 locking 初始化(1) 不同的是， Mutex 对象 m 已被当前线程锁住。
* 拷贝构造
lock_guard (const lock_guard&) = delete;
lock_guard 对象的拷贝构造和移动构造(move construction)均被禁用，因此 lock_guard 对象不可被拷贝构造或移动构造。




#### 2.std::unique_lock
unique_lock 是 lock_guard 的升级加强版，它具有 lock_guard 的所有功能，同时又具有其他很多方法，使用起来更强灵活方便，能够应对更复杂的锁定需要。
顾名思义，unique_lock 对象以独占所有权的方式（ unique owership）管理 mutex 对象的上锁和解锁操作，所谓独占所有权，就是没有其他的 unique_lock 对象同时拥有某个 mutex 对象的所有权。


构造函数更加丰富
default (1)    
locking (2)    
try-locking (3)    
deferred (4)    
adopting (5)    
locking for (6)    
locking until (7)    


创建时可以不锁定（通过指定第二个参数为std::defer_lock），而在需要时再锁定
不可复制，可移动


```
#include <mutex>
#include <thread>
#include <chrono>
 
struct Box {
    explicit Box(int num) : num_things{num} {}
 
    int num_things;
    std::mutex m;
};
 
void transfer(Box &from, Box &to, int num)
{
    // 仍未实际取锁
    std::unique_lock<std::mutex> lock1(from.m, std::defer_lock);
    std::unique_lock<std::mutex> lock2(to.m, std::defer_lock);
 
    // 锁两个 unique_lock 而不死锁
    std::lock(lock1, lock2);
 
    from.num_things -= num;
    to.num_things += num;
 
    // 'from.m' 与 'to.m' 互斥解锁于 'unique_lock' 析构函数
}
 
int main()
{
    Box acc1(100);
    Box acc2(50);
 
    std::thread t1(transfer, std::ref(acc1), std::ref(acc2), 10);
    std::thread t2(transfer, std::ref(acc2), std::ref(acc1), 5);
 
    t1.join();
    t2.join();
}
```






其他类型，用于构造函数时的构造
std::once_flag
std::adopt_lock_t
std::defer_lock_t
std::try_to_lock_t


### 函数


* std::try_lock，尝试同时对**多个互斥量**上锁。
* std::lock，可以同时对多个互斥量上锁。
* std::call_once，如果多个线程需要同时调用某个函数，call_once可以保证多个线程对该函数只调用一次。














## 三.future
表示带有延迟的操作
Futures 会将处于等待状态的操作包裹起来放到队列中，这些操作的状态随时可以查询，当然它们的结果（或是异常）也能够在操作完成后被获取。

### std::future
std::future 可以用来获取**异步任务的结果**，因此可以把它当成一种简单的线程间同步的手段。
std::future 通常由某个 Provider 创建，你可以把 Provider 想象成一个异步任务的提供者,
Provider 在某个线程中设置共享状态的值，与该共享状态相关联的 std::future 对象调用 get（通常在另外一个线程中）获取该值
一个有效(valid)的 std::future 对象通常由以下三种 Provider 创建，并和某个共享状态相关联
* std::async 函数
* std::promise::get_future，get_future 为 promise 类的成员函数，
* std::packaged_task::get_future，此时get_future为 packaged_task 的成员函数


#### future相关方法
* std::future<T>::get()
* std::future::valid  Checks if the future refers to a shared state.
* std::future::wait() 等待与当前std::future 对象相关联的共享状态的标志变为 ready，如没有ready则阻塞
* std::future::wait_for()
* std::future::wait_until()


```
// future example
#include <iostream>             // std::cout
#include <future>               // std::async, std::future
#include <chrono>               // std::chrono::milliseconds


// a non-optimized way of checking for prime numbers:
bool
is_prime(int x)
{
    for (int i = 2; i < x; ++i)
        if (x % i == 0)
            return false;
    return true;
}

int
main()
{
    // call function asynchronously:
    std::future < bool > fut = std::async(is_prime, 444444443);

    // do something while waiting for function to set future:
    std::cout << "checking, please wait";
    std::chrono::milliseconds span(100);
    while (fut.wait_for(span) == std::future_status::timeout)
        std::cout << '.';

    bool x = fut.get();         // retrieve return value

    std::cout << "\n444444443 " << (x ? "is" : "is not") << " prime.\n";

    return 0;
}
```


### promise
和Future配对，作为一种future的Provider,表示对future的承诺。
Promise的使用是很简单的：首先是创建Promise，然后从它“提取”出一个Future,最后在适当的时候**向Promise填充**一个值或者是异常。
promise 对象可以保存某一类型 T 的值，该值可被 future 对象读取（可能在另外一个线程中），因此 promise 也提供了一种**线程同步**的手段。
可以通过 get_future 来获取与该 promise 对象相关联的 future 对象


```
#include <iostream>       // std::cout
#include <functional>     // std::ref
#include <thread>         // std::thread
#include <future>         // std::promise, std::future


void print_int(std::future<int>& fut) {
    int x = fut.get(); // 获取共享状态的值,没有的时候会被阻塞
    std::cout << "value: " << x << '\n'; // 打印 value: 10.
}


int main ()
{
    std::promise<int> prom; // 生成一个 std::promise<int> 对象.
    std::future<int> fut = prom.get_future(); // 和 future 关联.
    std::thread t(print_int, std::ref(fut)); // 将 future 交给另外一个线程t.
    prom.set_value(10); // promise用来设置共享状态的值，future用来获取共享状态的值
    t.join();
    return 0;
}
```


### packaged_task 
即异步等待一个**任务**完成，并获取其结果
std::packaged_task包装一个可调用的对象，并且允许`异步`获取该可调用对象产生的结果
可以通过 std::packged_task::get_future 来获取与共享状态相关联的 std::future 对象
```
#include <iostream>     // std::cout
#include <future>       // std::packaged_task, std::future
#include <chrono>       // std::chrono::seconds
#include <thread>       // std::thread, std::this_thread::sleep_for


// count down taking a second for each value:
int countdown (int from, int to) {
    for (int i=from; i!=to; --i) {
        std::cout << i << '\n';
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    std::cout << "Finished!\n";
    return from - to;
}


int main ()
{
    // 设置 packaged_task
    std::packaged_task<int(int,int)> task(countdown);
    // 获得与 packaged_task 共享状态相关联的 future 对象.
    std::future<int> ret = task.get_future();
    //创建一个新线程完成计数任务.
    std::thread th(std::move(task), 10, 0);

    int value = ret.get();   // 等待任务完成并获取结果.

    std::cout << "The countdown lasted for " << value << " seconds.\n";

    th.join();
    return 0;
}
```




## 四.condition_variable


std::condition_variable_any的wait函数能够接受不论什么 lockable參数
std::condition_variable 仅仅能接受 std::unique_lock<std::mutex>类型的參数




### std::condition_variable::wait() 
#### 1.unconditional     
```
void wait (unique_lock<mutex>& lck);
```
在线程被阻塞时，该函数会自动调用 lck.unlock() 释放锁，使得其他被阻塞在锁竞争上的线程得以继续执行。另外，一旦当前线程获得通知(notified，通常是另外某个线程调用 `notify_*` 唤醒了当前线程)，wait() 函数也是自动调用 lck.lock()，使得 lck 的状态和 wait 函数被调用时相同。


#### 2.predicate   
``` 
template <class Predicate>
  void wait (unique_lock<mutex>& lck, Predicate pred);
```
在第二种情况下（即设置了 Predicate），只有当 pred 条件为 false 时调用 wait() 才会阻塞当前线程，true的时候不阻塞，直接返回。并且在收到其他线程的通知后只有当 pred 为 true 时才会被解除阻塞






### std::condition_variable::wait_for() 
wait_for 可以指定一个时间段，在当前线程收到通知或者指定的时间 rel_time 超时之前，该线程都会处于阻塞状态。而一旦超时或者收到了其他线程的通知，wait_for 返回，剩下的处理步骤和 wait() 类似


### std::condition_variable::wait_until
wait_until 可以指定一个时间点,效果和wait_for类似 




### std::condition_variable::notify_one()
唤醒某个等待(wait)线程。如果当前没有等待线程，则该函数什么也不做，如果同时存在多个等待线程，则唤醒某个线程是不确定的(unspecified)。




### std::condition_variable::notify_all() 
唤醒所有的等待(wait)线程。如果当前没有等待线程，则该函数什么也不做。








## 五.atomic


## 六.信号量
c++11中有互斥和条件变量但是并没有信号量，但是利用互斥和条件变量很容易就能实现信号量。
信号量是一个整数 count，提供两个原子(atom，不可分割)操作：P 操作和 V 操作，或是说 wait 和 signal 操作。
* P操作 (wait操作)：count 减1；如果 count < 0 那么挂起执行线程；

* V操作 (signal操作)：count 加1；如果 count <= 0 那么唤醒一个执行线程；


```
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>


using namespace std;


class semaphore
{
public:
    semaphore(int value = 1) :count(value) {}


    void wait()
    {
        unique_lock<mutex> lck(mtk);
        if (--count < 0)//资源不足挂起线程
            cv.wait(lck);
    }


    void signal()
    {
        unique_lock<mutex> lck(mtk);
        if (++count <= 0)//有线程挂起，唤醒一个
            cv.notify_one();
    }


private:
    int count;
    mutex mtk;
    condition_variable cv;
};
```



























