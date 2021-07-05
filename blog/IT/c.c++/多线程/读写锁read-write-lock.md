一 综述
    在一些程序中存在读者写者问题，也就是说，对某些资源的访问会  存在两种可能的情况，一种是访问必须是排它行的，就是独占的意思，这称作写操作；另一种情况就是访问方式可以是共享的，就是说可以有多个线程同时去访问某个资源，这种就称作读操作。这个问题模型是从对文件的读写操作中引申出来的。
读写锁比起mutex具有更高的适用性，具有更高的并行性，可以有多个线程同时占用读模式的读写锁，但是只能有一个线程占用写模式的读写锁，读写锁的三种状态：
1. 当读写锁是**写**加锁状态时，在这个锁被解锁之前，所有试图对这个锁加锁的线程都会被阻塞
2. 当读写锁在**读**加锁状态时，所有试图以**读**模式对它进行加锁的线程都可以得到访问权，但是以**写**模式对它进行加锁的线程将会被**阻塞**
3. 当读写锁在**读**模式的锁状态时，如果有另外的线程试图以**写**模式加锁，读写锁通常会阻塞随后的读模式锁的请求，这样可以避免读模式锁长期占用而等待的写模式锁请求则长期阻塞。也就是写模式锁的优先级高
读写锁最适用于对数据结构的**读操作次数多于写操作**的场合，因为，读模式锁定时可以共享，而写模式锁定时只能某个线程独占资源，因而，读写锁也可以叫做个**共享-独占锁**。


处理读者-写者问题的两种常见策略是强读者同步(strong reader synchronization)和强写者同步(strong writer synchronization).    在强读者同步中，总是给读者更高的优先权，只要写者当前没有进行写操作，读者就可以获得访问权限；而在强写者同步中，则往往将优先权交付给写者，而读者只能等到所有正在等待的或者是正在执行的写者结束以后才能执行。关于读者-写者模型中，由于读者往往会要求查看最新的信息记录，所以航班订票系统往往会使用强写者同步策略，而图书馆查阅系统则采用强读者同步策略。
    读写锁机制是由posix提供的，如果写者没有持有读写锁，那么所有的读者多可以持有这把锁，而一旦有某个写者阻塞在上锁的时候，那么就由posix系统来决定是否允许读者获取该锁。
二 读写锁相关的API
1.初始化和销毁读写锁
    对于读写锁变量的初始化可以有两种方式，一种是通过给一个静态分配的读写锁赋予常值PTHREAD_RWLOCK_INITIALIZER来初始化它，另一种方法就是通过调用pthread_rwlock_init()来动态的初始化。而当某个线程不再需要读写锁的时候，可以通过调用pthread_rwlock_destroy来销毁该锁。函数原型如下：
```
#include
int pthread_rwlock_init(pthread_rwlock_t *rwptr, const pthread_rwlockattr_t *attr);
int pthread_rwlock_destroy(pthread_rwlock_t *rwptr);
```
这两个函数如果执行成功均返回0，如果出错则返回错误码。
在释放某个读写锁占用的内存之前，要先通过pthread_rwlock_destroy对读写锁进行清理，释放由pthread_rwlock_init所分配的资源。
在初始化某个读写锁的时候，如果属性指针attr是个空指针的话，表示默认的属性；如果想要使用非默认属性，则要使用到下面的两个函数：
```
#include
int pthread_rwlockattr_init(pthread_rwlockattr_t *attr);
int pthread_rwlockattr_destroy(pthread_rwlockatttr_t *attr);
```
这两个函数同样的，如果执行成功返回0，失败返回错误码。
这里还需要说明的是，当初始化读写锁完毕以后呢，该锁就处于一个非锁定状态。
数据类型为pthread_rwlockattr_t的某个属性对象一旦初始化了，就可以通过不同的函数调用来启用或者是禁用某个特定的属性。
2.获取和释放读写锁
读写锁的数据类型是pthread_rwlock_t,如果这个数据类型中的某个变量是静态分配的，那么可以通过给它赋予常值PTHREAD_RWLOCK_INITIALIZAR来初始化它。pthread_rwlock_rdlock()用来获取读出锁，如果相应的读出锁已经被某个写入者占有，那么就阻塞调用线程。pthread_rwlock_wrlock()用来获取一个写入锁，如果相应的写入锁已经被其它写入者或者一个或多个读出者占有，那么就阻塞该调用线程；pthread_rwlock_unlock()用来释放一个读出或者写入锁。函数原型如下：
```
#include
int pthread_rwlock_rdlock(pthread_rwlock_t *rwptr);
int pthread_rwlock_wrlock(pthread_rwlock_t *rwptr);
int pthread_rwlock_unlock(pthread_rwlock_t *rwptr);
```
这三个函数若调用成功则返回0，失败就返回错误码。要注意的是其中获取锁的两个函数的操作都是阻塞操作，也就是说获取不到锁的话，那么调用线程不是立即返回，而是阻塞执行。有写情况下，这种阻塞式的获取所得方式可能不是很适用，所以，接下来引入两个采用非阻塞方式获取读写锁的函数pthread_rwlock_tryrdlock()和pthread_rwlock_trywrlock(),非阻塞方式下获取锁的时候，如果不能马上获取到，就会立即返回一个EBUSY错误，而不是把调用线程投入到睡眠等待。函数原型如下：
```
#include
int pthread_rwlock_tryrdlock(pthread_rwlock_t *rwptr);
int pthread_rwlock_trywrlock(pthread_rwlock_t *rwptr);
```
同样地，这两个函数调用成功返回0，失败返回错误码。
三 实例
读者-写者模型来实现多线程同步问题
https://github.com/helianthuslulu/LINUX_IPC