## 多线程相关知识点

### async
但还是基于那个原则，我建议你**不要直接使用 thread 这个“原始”的线程概念**(因为抽象层次太低了)，最好把它隐藏到底层，因为**看不到的线程才是好线程**。

具体的做法是调用函数 `async()`，它的含义是**异步运行一个任务**，隐含的动作是启动一个线程去执行，但不绝对保证立即启动（也可以在第一个参数传递 launch::async，要求立即启动线程）。
大多数 thread 能做的事情也可以用 async() 来实现，但不会看到明显的线程：
```c++
auto task = [](auto x) // 在线程里运行的lambda表达式
{
    this_thread::sleep_for( x * 1ms); // 线程睡眠
    cout << "sleep for " << x << endl;
    return x;
};
auto f = std::async(task, 10); // 启动一个异步任务
f.wait(); // 等待任务完成
assert(f.valid()); // 确实已经完成了任务
cout << f.get() << endl; // 获取任务的执行结果
```
其实，这还是函数式编程的思路，在更高的抽象级别上去看待问题，异步并发多个任务，让**底层去自动管理线程**，要比我们自己手动控制更好（比如内部使用线程池或者其他机制）。
`async()` 会返回一个 `future` 变量，可以认为是代表了执行结果的“期货”，如果任务有返回值，就可以用成员函数 get() 获取。
不过要特别注意，get() 只能调一次，再次获取结果会发生错误，抛出异常   `std::future_error`。
另外，这里还有一个很隐蔽的“坑”，如果你**不显式获取 async() 的返回值**（即 future 对象），它就会同步阻塞直至任务完成（由于临时对象的析构函数），于是“async”就变成了“sync”。
所以，即使我们不关心返回值，也总要用 auto 来配合 async()，避免同步阻塞

### call_once
程序免不了要初始化数据，这在多线程里却是一个不大不小的麻烦。因为线程并发，如果没有某种同步手段来控制，会导致初始化函数多次运行。
C++ 提供了“仅调用一次”的功能，可以很轻松地解决这个问题
```c++
static once_flag flag;

auto f = []()
{
	cout << "tid=" <<
		this_thread::get_id() << endl;


	std::call_once(flag,
		[](){
			cout << "only once" << endl;
		}
	);
};

thread t1(f);
thread t2(f);

t1.join();
t2.join();
```

### 线程局部存储(thread local storage)
这个功能在 C++ 里由关键字 `thread_local` 实现，它是一个和 static、extern 同级的变量存储说明，有 thread_local 标记的变量在每个线程里都会有一个独立的副本，是“线程独占”的，所以就不会有竞争读写的问题。   
linux下的有`__thread`关键字
```c++
thread_local int n = 0;

auto f = [&](int x)
{
	n += x;


	cout << n;    //在程序执行后，我们可以看到，两个线程分别输出了 10 和 20，互不干扰。
	cout << ", tid=" <<
		this_thread::get_id() << endl;
};


thread t1(f, 10);
thread t2(f, 20);


t1.join();
t2.join();
```
和 call_once() 一样，thread_local 也很容易使用。但它的应用场合不是那么显而易见的，这要求你对线程的共享数据有清楚的认识，区分出独占的那部分，消除多线程对变量的并发访问

### 虚假唤醒
在不同的语言，甚至不同的操作系统上，条件锁都会产生虚假唤醒（spurious wakeup）现象。所有语言的条件锁库都推荐用户把wait()放进循环里：
```c++
while (!cond) {   //目的是非真的时候继续等待
    lock.wait();
}
```
在多核处理器下，pthread_cond_signal可能会激活多于一个线程（阻塞在条件变量上的线程）。结果是，当一个线程调用pthread_cond_signal()后，多个调用pthread_cond_wait()或pthread_cond_timedwait()的线程返回。这种效应成为”虚假唤醒”(spurious wakeup)。
虽然虚假唤醒在pthread_cond_wait函数中可以解决，为了发生概率很低的情况而降低边缘条件（fringe condition）效率是不值得的，纠正这个问题会降低对所有基于它的所有更高级的同步操作的并发度。所以pthread_cond_wait的实现上没有去解它。

**一个队列的例子：**
当一个队列（或者缓冲区）在多线程环境下被共享时，虚假唤醒可能会发生。考虑一个生产者-消费者的场景，其中多个生产者线程向队列中添加数据，多个消费者线程从队列中取出数据。使用条件变量来同步生产者和消费者线程时，虚假唤醒可能会导致消费者在队列为空时被唤醒，尽管队列仍然为空。为了避免这种情况，消费者线程在等待条件变量前会**检查队列是否为空**，如果为空则继续等待，直到有数据可供消费。这样可以确保在唤醒时真正有数据可供消费。
```c++
#include <iostream>
#include <pthread.h>
#include <queue>
#include <unistd.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
std::queue<int> dataQueue;

void* producer(void* arg) {
    for (int i = 0; i < 5; ++i) {
        pthread_mutex_lock(&mutex);
        dataQueue.push(i);
        pthread_cond_signal(&cond); // 唤醒等待的消费者
        pthread_mutex_unlock(&mutex);
        usleep(500000); // 模拟生产速度
    }
    return nullptr;
}

void* consumer(void* arg) {
    while (true) {
        pthread_mutex_lock(&mutex);
        while (dataQueue.empty()) {
            pthread_cond_wait(&cond, &mutex); // 等待条件变量，释放锁并等待唤醒
        }
        int data = dataQueue.front();
        dataQueue.pop();
        pthread_mutex_unlock(&mutex);

        std::cout << "Consumer: Processed data " << data << std::endl;
        usleep(1000000); // 模拟消费速度
    }
    return nullptr;
}

int main() {
    pthread_t producerThread, consumerThread1, consumerThread2;

    pthread_create(&producerThread, nullptr, producer, nullptr);
    pthread_create(&consumerThread1, nullptr, consumer, nullptr);
    pthread_create(&consumerThread2, nullptr, consumer, nullptr);

    pthread_join(producerThread, nullptr);
    pthread_join(consumerThread1, nullptr);
    pthread_join(consumerThread2, nullptr);

    return 0;
}
```




### mutex和spinlock
mutex和spinlock都是用于多进程多线程编程中用于实现临界区互斥访问的同步机制，只是在**lock失败的时候**处理方式有所不同。
- **Mutex（互斥锁）**：互斥锁是一种阻塞式的同步机制。当线程尝试获取锁时，如果锁已经被其他线程占用，该线程会进入阻塞状态，直到锁被释放。互斥锁的实现涉及操作系统的系统调用，可以确保资源不被多个线程同时访问。
- **Spinlock（自旋锁）**：自旋锁是一种忙等待的同步机制。当线程尝试获取锁时，如果锁已经被其他线程占用，该线程会一直循环等待，不会阻塞。自旋锁的实现通常使用原子操作来确保只有一个线程能够成功获取锁。

* mutex：一旦上锁失败就会进入sleep，让其他thread运行，这就需要内核将thread切换到sleep状态，如果mutex又在很短的时间内被释放掉了，那么又需要将此thread再次唤醒，这需要消耗许多CPU指令和时间，这种消耗还不如让thread去轮讯。
* spinlock: 如果其他占用锁的thread解锁的时间很长的话，这种spinlock进行轮讯的方式将会浪费很多CPU资源。


### 多线程相关的头文件
```
<atomic>：该头文主要声明了两个类, std::atomic 和 std::atomic_flag，另外还声明了一套 C 风格的原子类型和与 C 兼容的原子操作的函数。
<thread>：该头文件主要声明了 std::thread 类，另外 std::this_thread 命名空间也在该头文件中。
<mutex>：该头文件主要声明了与互斥量(mutex)相关的类，包括 std::mutex 系列类，std::lock_guard, std::unique_lock, 以及其他的类型和函数。
<condition_variable>：该头文件主要声明了与条件变量相关的类，包括 std::condition_variable 和 std::condition_variable_any。
<future>：该头文件主要声明了 std::promise, std::package_task 两个 Provider 类，
以及 std::future 和 std::shared_future 两个 Future 类，另外还有一些与之相关的类型和函数，std::async() 函数就声明在此头文件中。
```

## 一.thread

### std::thread
拷贝构造函数(被禁用)，thread 不可被拷贝构造。
拷贝赋值操作被禁用，thread 不可被拷贝。


### 创建线程
* 函数
```cpp
void do_some_work();
std::thread my_thread(do_some_work);
```

* 函数对象
```cpp
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
```cpp
std::thread my_thread([]{
  do_something();
  do_something_else();
});
```


启动了线程，你需要明确是要等待线程结束，还是让其自主运行如果std::thread对象销毁之前还没有做出决定，程序就会终止，std::thread的析构函数会调用std::terminate()
### std::this_thread
std::this_thread::yield
std::this_thread::get_id
std::this_thread::sleep_for
std::this_thread::sleep_for(std::chrono::seconds(5));
std::this_thread::sleep_until

### 成员函数
* get_id()        获取线程 ID。
* joinable()     检查线程是否可被 join。
* join()           Join 线程。
* detach()      Detach 线程

```c++
void myFunction(int value) {
    // 线程要执行的代码
    // ...
}

int main() {
    int myValue = 42;
    std::thread myThread(myFunction, myValue); // 创建线程并传递参数
    // ...
    
    myThread.join(); // 等待线程结束
    return 0;
}
```

### thread中有异常时join
 异常环境下join，假设主线程在一个函数f()里面创建thread object,接着f()又调用其它函数g(),那么确保在g()以任何方式下退出主线程都能join子线程。如：若g()通过异常退出，那么f()需要捕捉异常后join.
```cpp
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

```cpp
#include <iostream>
#include <thread>

class thread_guard {
public:
    explicit thread_guard(std::thread& t) : thread_(t) {}

    ~thread_guard() {
        if (thread_.joinable()) {
            thread_.join();
        }
    }

    // 禁止拷贝和移动
    thread_guard(const thread_guard&) = delete;
    thread_guard& operator=(const thread_guard&) = delete;

private:
    std::thread& thread_;
};

void worker_function() {
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Worker thread completed." << std::endl;
}

int main() {
    std::thread worker_thread(worker_function);
    thread_guard guard(worker_thread);

    // 主线程继续执行其他操作
    std::cout << "Main thread." << std::endl;

    // worker_thread 在 thread_guard 的析构函数中自动 join

    return 0;
}
```


## 二.mutex
### Mutex 系列类(四种)
#### 1.std::mutex，最基本的 Mutex 类。
std::mutex不允许拷贝构造，也不允许 move 拷贝

lock()
调用后3种情况：1.mutex没被锁，得锁 2.mutex被别的线程锁住，阻塞 3.mutex被当前线程锁住，死锁

try_lock()
调用后3种情况：1.mutex没被锁，得锁 2.mutex被别的线程锁住，返回 false 3.mutex被当前线程锁住，死锁

```cpp
std::mutex myMutex;
int sharedValue = 0;

void incrementSharedValue() {
    myMutex.lock(); // 锁定互斥锁
    sharedValue++;
    myMutex.unlock(); // 解锁互斥锁
}

int main() {
    std::thread t1(incrementSharedValue);
    std::thread t2(incrementSharedValue);

    t1.join();
    t2.join();

    std::cout << "Shared value: " << sharedValue << std::endl;

    return 0;
}
```

#### 2.std::recursive_mutex，递归 Mutex 类
允许同一个线程对互斥量多次上锁（即递归上锁）
std::recursive_mutex 释放互斥量时需要调用与该锁层次深度相同次数的 unlock()，可理解为 lock() 次和 unlock() 次数相同
```cpp
#include <iostream>
#include <thread>
#include <mutex>

class Logger {
public:
    void log(const std::string& message) {
        std::lock_guard<std::recursive_mutex> lock(mutex_);
        std::cout << getTimeStamp() << " [Thread " << std::this_thread::get_id() << "] " << message << std::endl;
    }

    void logWithPrefix(const std::string& prefix, const std::string& message) {
        std::lock_guard<std::recursive_mutex> lock(mutex_);
        log(prefix + ": " + message);  // 不用怕死锁了
    }

private:
    std::string getTimeStamp() {
        // 获取时间戳
        return "[timestamp]";
    }

private:
    std::recursive_mutex mutex_;
};

int main() {
    Logger logger;

    std::thread t1([&logger] {
        logger.log("This is a log message from thread 1.");
        logger.logWithPrefix("INFO", "This is an information message from thread 1.");
    });

    std::thread t2([&logger] {
        logger.log("This is a log message from thread 2.");
        logger.logWithPrefix("WARNING", "This is a warning message from thread 2.");
    });

    t1.join();
    t2.join();

    return 0;
}
```

#### 3.std::time_mutex，定时 Mutex 类
std::time_mutex比 std::mutex 多了两个成员函数，try_lock_for()，try_lock_until()。

* try_lock_for 
`try_lock_for` 方法会等待一段指定的时间，如果在这段时间内获取到了锁，则返回 `true`，表示成功获取锁。如果超过指定时间还没有获取到锁，则返回 `false`，表示未成功获取锁。
```cpp
std::timed_mutex myTimedMutex;

if (myTimedMutex.try_lock_for(std::chrono::seconds(2))) {
    // 成功获取锁，执行操作
    myTimedMutex.unlock();
} else {
    // 未成功获取锁，在等待时间内没有获取到
}
```

* try_lock_until 
`try_lock_until` 方法会等待直到指定的时间点，如果在这个时间点之前获取到了锁，则返回 `true`，表示成功获取锁。如果直到指定时间点仍然没有获取到锁，则返回 `false`，表示未成功获取锁。
```cpp
std::timed_mutex myTimedMutex;
auto timeout = std::chrono::steady_clock::now() + std::chrono::seconds(2);

if (myTimedMutex.try_lock_until(timeout)) {
    // 成功获取锁，执行操作
    myTimedMutex.unlock();
} else {
    // 未成功获取锁，在指定时间点之前没有获取到
}
```

#### 4.std::recursive_timed_mutex，定时递归 Mutex 类。
std::time_mutex和std::recursive_mutex结合

#### 5.shared_mutex(读写锁) 
C++11 标准库引入了类似于 pthread_rwlock 的读写锁的概念，称为 std::shared_mutex。std::shared_mutex 允许多个线程同时共享读访问，并在需要时独占写访问。这种锁的设计能够提高并发性，允许多个线程并发地读取数据，但在写入数据时仍然保持独占访问。
```cpp
#include <iostream>
#include <thread>
#include <shared_mutex>

std::shared_mutex rwLock;
int data = 0;

void reader() {
    std::shared_lock<std::shared_mutex> lock(rwLock);
    std::cout << "Reader: Data is " << data << std::endl;
}

void writer() {
    std::unique_lock<std::shared_mutex> lock(rwLock);
    data++;
    std::cout << "Writer: Data is updated to " << data << std::endl;
}

int main() {
    std::thread readers[3];
    std::thread writers[2];

    for (int i = 0; i < 3; ++i) {
        readers[i] = std::thread(reader);
    }

    for (int i = 0; i < 2; ++i) {
        writers[i] = std::thread(writer);
    }

    for (int i = 0; i < 3; ++i) {
        readers[i].join();
    }

    for (int i = 0; i < 2; ++i) {
        writers[i].join();
    }

    return 0;
}
```

### Lock 类（两种）
lock_guard和unique_lock的区别

1. **锁的灵活性**：
    - `std::lock_guard`：是一个简单的互斥锁管理类，只提供了锁定和解锁的功能。一旦创建了 `std::lock_guard` 对象，它会在构造函数中锁定互斥锁，在析构函数中解锁互斥锁。由于其在构造函数和析构函数中自动处理锁的生命周期，因此没有手动的锁定和解锁操作。
    - `std::unique_lock`：提供了更大的灵活性。除了自动锁定和解锁外，`std::unique_lock` 还可以在构造函数中选择是否锁定互斥锁，并在适当的时候使用 `lock()` 和 `unlock()` 方法手动控制锁的范围。此外，`std::unique_lock` 还可以在构造函数中指定锁的延迟和适当的策略，如 `std::defer_lock`（延迟锁定）和 `std::adopt_lock`（假定已锁定）等。
2. **锁定状态的改变**：
    - `std::lock_guard`：一旦创建，会立即锁定互斥锁，无法手动解锁，只有在对象生命周期结束时才会解锁互斥锁。
    - `std::unique_lock`：可以在对象生命周期内多次锁定和解锁互斥锁，根据需要更灵活地控制锁定状态。可以在不同的作用域中锁定和解锁，从而降低锁定的范围。
3. **性能**：
    - `std::lock_guard`：由于其自动锁定和解锁的特性，在大多数情况下更轻量级，性能上可能更好。
    - `std::unique_lock`：由于其灵活性和更多的功能，可能在某些情况下稍微比 `std::lock_guard` 更重，因此在性能敏感的场景中，需要考虑其性能开销。


```c++
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

### 函数
* std::call_once，如果多个线程需要同时调用某个函数，call_once可以保证多个线程对该函数只调用一次。
* std::try_lock，尝试同时对**多个互斥量**上锁。
* std::lock，可以同时对多个互斥量上锁。


## 三.future
Futures 会将处于等待状态的操作包裹起来放到队列中，这些操作的状态随时可以查询，当然它们的结果（或是异常）也能够在操作完成后被获取。

### std::future
std::future 可以用来获取**异步任务的结果**，因此可以把它当成一种简单的线程间同步的手段。
std::future 通常由某个 Provider 创建，你可以把 Provider 想象成一个**异步任务的提供者**

Provider 在某个线程中设置共享状态的值，与该共享状态相关联的 std::future 对象调用 get（通常在另外一个线程中）获取该值
一个有效(valid)的 std::future 对象通常由以下三种 Provider 创建，并和某个共享状态相关联
* std::async() 
* std::promise::get_future()
* std::packaged_task::get_future()

#### future相关方法
```
* std::future<T>::get()
* std::future::valid    Checks if the future refers to a shared state.
* std::future::wait()   等待与当前std::future 对象相关联的共享状态的标志变为 ready，如没有ready则阻塞
* std::future::wait_for()
* std::future::wait_until()
```


```c++
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

    bool x = fut.get();         // retrieve return value， 没有值时会被阻塞

    std::cout << "\n444444443 " << (x ? "is" : "is not") << " prime.\n";

    return 0;
}
```

### promise
和Future配对，作为一种future的Provider,表示对future的承诺。
Promise的使用是很简单的：首先是创建Promise，然后从它“提取”出一个Future,最后在适当的时候**向Promise填充**一个值或者是异常。
promise 对象可以保存某一类型 T 的值，该值可被 future 对象读取（可能在另外一个线程中），因此 promise 也提供了一种**线程同步**的手段。
可以通过 get_future 来获取与该 promise 对象相关联的 future 对象

通过promise的set_value许诺，然后通过future获取期值
```c++
void print_int(std::future<int>& fut) {
    int x = fut.get();     // 获取共享状态的值,没有的时候会被阻塞
    std::cout << "value: " << x << '\n'; // 打印 value: 10.
}

int main ()
{
    std::promise<int> prom;   // 生成一个 std::promise<int> 对象.
    std::future<int> fut = prom.get_future(); // 和 future 关联.
    std::thread t(print_int, std::ref(fut)); // 将 future 交给另外一个线程t.
    prom.set_value(10); // promise用来设置共享状态的值，future用来获取共享状态的值
    t.join();
    return 0;
}
```


### packaged_task 
即异步等待一个**任务**完成，并获取其结果
std::packaged_task包装一个**可调用的对象**，并且允许异步获取该可调用对象产生的结果
可以通过 std::packged_task::get_future 来获取与共享状态相关联的 std::future 对象
```cpp
// count down taking a second for each value:
int countdown (int from, int to) {
    for (int i=from; i!=to; --i) {
        std::cout << i << '\n';
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    std::cout << "Finished!\n";
    return from - to;
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




## 四.condition_variable

std::condition_variable_any的wait函数能够接受不论什么 lockable參数
std::condition_variable  仅仅能接受 std::unique_lock<std::mutex>类型的參数

### std::condition_variable::wait() 
#### 1.unconditional     
```cpp
void wait (unique_lock<mutex>& lck);
```
在线程被阻塞时，该函数会自动调用 lck.unlock() 释放锁，使得其他被阻塞在锁竞争上的线程得以继续执行。另外，一旦当前线程获得通知(notified，通常是另外某个线程调用 `notify_*` 唤醒了当前线程)，wait() 函数也是自动调用 lck.lock()，使得 lck 的状态和 wait 函数被调用时相同。

#### 2.predicate   
```cpp
template <class Predicate>
  void wait (unique_lock<mutex>& lck, Predicate pred);
```
在第二种情况下（即设置了 Predicate），只有当 pred 条件为 false 时调用 wait() 才会阻塞当前线程，true的时候不阻塞，直接返回。并且在收到其他线程的通知后只有当 pred 为 true 时才会被解除阻塞
```cpp
std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker_thread() {
    std::this_thread::sleep_for(std::chrono::seconds(2));

    std::unique_lock<std::mutex> lck(mtx);
    ready = true;
    cv.notify_one();
}

int main() {
    std::thread worker(worker_thread);

    std::unique_lock<std::mutex> lck(mtx);
    cv.wait(lck, []{ return ready; }); // 等待条件变量满足

    std::cout << "Worker thread finished." << std::endl;

    worker.join();

    return 0;
}
```

### std::condition_variable::wait_for() 
wait_for 可以指定一个时间段，在当前线程收到通知或者指定的时间 rel_time 超时之前，该线程都会处于阻塞状态。而一旦超时或者收到了其他线程的通知，wait_for 返回，剩下的处理步骤和 wait() 类似
```cpp
std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker_thread() {
    std::this_thread::sleep_for(std::chrono::seconds(2));

    std::unique_lock<std::mutex> lck(mtx);
    ready = true;
    cv.notify_one();
}

int main() {
    std::thread worker(worker_thread);

    std::unique_lock<std::mutex> lck(mtx);
    std::cv_status status = cv.wait_for(lck, std::chrono::seconds(3));

    if (status == std::cv_status::no_timeout) {
        std::cout << "Worker thread finished." << std::endl;
    } else {
        std::cout << "Timeout occurred." << std::endl;
    }

    worker.join();

    return 0;
}
```

### std::condition_variable::wait_until
wait_until 可以指定一个时间点,效果和wait_for类似 

### std::condition_variable::notify_one()
唤醒某个等待(wait)线程。如果当前没有等待线程，则该函数什么也不做，如果同时存在多个等待线程，则唤醒某个线程是不确定的(unspecified)。

### std::condition_variable::notify_all() 
唤醒所有的等待(wait)线程。如果当前没有等待线程，则该函数什么也不做。

## 五.atomic
所谓原子（atomic），在多线程领域里的意思就是不可分的。操作要么完成，要么未完成，不能被任何外部操作打断，总是有一个确定的、完整的状态。所以也就不会存在竞争读写的问题，不需要使用互斥量来同步，成本也就更低。
目前，C++ 只能让一些最基本的类型原子化，
和普通变量的区别是，**原子变量禁用了拷贝构造函数**，所以在初始化的时候不能用“=”的赋值形式，只能用圆括号或者花括号。
最基本的用法是把原子变量当作线程安全的**全局计数器或者标志位**，这也算是“初心”吧。
但它还有一个更重要的应用领域，就是实现高效的无锁数据结构（lock-free）。
但我强烈不建议你自己尝试去写无锁数据结构，因为无锁编程的难度比使用互斥量更高，可能会掉到各种难以察觉的“坑”（例如 ABA）里，最好还是用现成的库。
遗憾的是，标准库在这方面帮不了你，虽然网上可以找到不少开源的无锁数据结构，但经过实际检验的不多，我个人觉得你可以考虑 boost.lock_free。

锁是一种**悲观的策略**。它总是假设每一次的临界区操作会产生冲突，因此，必须对每次操作都小心翼翼。如果有多个线程同时需要访问临界区资源，就宁可牺牲性能让线程进行等待，所以说锁会阻塞线程执行。而无锁是一种**乐观的策略**，它会假设对资源的访问时没有冲突的。既然没有冲突，自然不需要等待，所以所有的线程都可以在不停顿的状态下执行。无锁的策略使用**CAS**（compare and swap）比较交换技术来鉴别线程冲突，一旦检测到冲突产生，就**重试当前操作**直到没有冲突为止。
对CAS的理解，CAS是一种无锁算法，CAS有3个操作数，内存值V，旧的预期值A，要修改的新值B。当且仅当预期值A和内存值V相同时，将内存值V修改为B，否则什么都不做。
```java
//AtomicInteger.conpareAndSet(int expect, indt update)
public final boolean compareAndSet(int expect, int update) {
        return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
}
```
第一个参数expect为期望值，如果期望值跟内存值还是一致，进行update赋值，如果期望值不一致，证明数据被修改过，返回fasle，取消赋值。



```c++
static atomic_flag flag {false};
static atomic_int n;


auto f = [&]()
{
	auto value = flag.test_and_set();

	if (value) {
		cout << "flag has been set." << endl;
	} else {
		cout << "set flag by " <<
			this_thread::get_id() << endl;
	}

	n += 100;

	this_thread::sleep_for(n.load() * 10ms);
	cout << n << endl;
};

thread t1(f);
thread t2(f);

t1.join();
t2.join();
```
## 六.信号量
c++11中有互斥和条件变量**但是并没有信号量**，但是利用互斥和条件变量很容易就能实现信号量。
信号量是一个整数 count，提供两个原子(atom，不可分割)操作：P 操作和 V 操作，或是说 wait 和 signal 操作。
* P操作 (wait操作)：count 减1；如果 count < 0 那么挂起执行线程；
* V操作 (signal操作)：count 加1；如果 count <= 0(说明有其他的线程在等待) 那么唤醒一个执行线程；  

```cpp
class semaphore
{
public:
    semaphore(int value = 1) :count(value) {}
    void wait()
    {
        unique_lock<mutex> lck(mtk);
        if (--count < 0)    //资源不足挂起线程
            cv.wait(lck);
    }

    void signal()
    {
        unique_lock<mutex> lck(mtk);
        if (++count <= 0)   //有线程挂起，唤醒一个, 说明有其他的线程在等待
            cv.notify_one();
    }

private:
    int count;
    mutex mtk;
    condition_variable cv;
};
```



## 参考链接
- [Cpp-Concurrency-in-Action github第二版翻译](https://github.com/xiaoweiChen/CPP-Concurrency-In-Action-2ed-2019)



















