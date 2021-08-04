## 进程缺点
* 创建进程的过程会带来一定的开销 ，要复制整个内存区域
* 进程间数据交换比较麻烦
* 若进程比较多，线程的上下文切换将是很大的开销


## 线程概念
线程是允许应用程序并发执行多个任务的一种机制。
为了保持多进程的优点，同时在一定程度上克服其缺点，人们引入的线程（Thread）的概念。这是为了将进程的各种劣势降至最低程度（不是直接消除）而设立的一种「轻量级进程」。

由于同一进程的多个线程共享同一地址空间，因此Text Segment、Data Segment都是共享的，
如果定义一个函数，在各线程中都可以调用，
如果定义一个全局变量，在各线程中都可以访问到，除此之外，各线程还共享以下进程资源和环境：
* 文件描述符表
* 每种信号的处理方式（ SIG_IGN 、 SIG_DFL 或者自定义的信号处理函数）
* 当前工作目录
* 用户id和组id


但有些资源是每个线程各有一份的：
* 线程id
* 上下文，包括各种寄存器的值、程序计数器和栈指针
* 栈空间
* errno 变量
* 信号屏蔽字
* 调度优先级


我们将要学习的线程库函数是由POSIX标准定义的，称为POSIX thread或者pthread。
在Linux上线程函数位于 libpthread 共享库中，因此在编译时要加上 -lpthread 选项
## 线程控制
线程的状态:
new-->runnable(on run queue)-->running-->blocked-->running-->dead
### 创建线程
```
#include <pthread.h>
int pthread_create(pthread_t *restrict thread,
const pthread_attr_t *restrict attr,
void *(*start_routine)(void*), void *restrict arg);
```
返回值：成功返回0，失败返回错误号。


### 设置线程属性
可以使用pthread_attr_t结构修改线程默认属性，并把这些属性与创建的线程联系起来
可以使用pthread_attr_init函数初始化pthread_attr_t结构。
调用pthread_attr_init以后，pthread_arrt_t的结构所包含的内容就是操作系统实现支持线程所有属性的默认值。如果要修改其中个别属性的值，需要调用其他函数。
```
int pthread_attr_destroy(pthread_attr_t *attr);
int pthread_attr_init(pthread_attr_t *attr);
int pthread_attr_setdetachstate(pthread_attr_t *attr, int detachstate);

```
函数pthread_attr_init初始化attr结构。
函数pthread_attr_destroy释放attr内存空间。
pthread_attr_t的结构对于应用程序来讲是不透明的，应用程序不需要了解有关结构的内部组成。
以前介绍了pthread_detach函数的概念，可以通过`pthread_attr_t`在创建线程的时候就指定线程属性为`detach`，而不用创建以后再去修改线程属性。




### 分离线程pthread_detach()
函数原型：int pthread_detach(pthread_t tid);
使用方法：
子线程中加入代码 pthread_detach(pthread_self())
pthread_self()获取当前的线程号

或者父线程调用 pthread_detach(thread_id)（非阻塞，可立即返回）
一旦线程成为可分离线程之后，,如果其他线程调用pthread_join失败，返回EINVAL
可分离线程的使用场景
1、主线程不需要等待子线程
2、主线程不关心子线程的返回码


### 线程比较
```
int pthread_equal(pthread_t th1,pthread_t th2);
```
pthread_equal函数比较th1与th2是否为同一个线程，由于不可以将pthread数据类型认为是整数，所以也不能用比较整数的方式比较pthread_t


### 终止线程
如果需要只终止某个线程而不终止整个进程，可以有三种方法：
* 从线程函数 return 。这种方法对主线程不适用，从 main 函数 return 相当于调用 exit 。
* 一个线程可以调用 pthread_cancel 终止同一进程中的另一个线程。
* 线程可以调用 pthread_exit 终止自己
```
#include <pthread.h>
void pthread_exit(void *value_ptr);
```
value_ptr 是 void * 类型，和线程函数返回值的用法一样，其它线程可以调用 pthread_join 获得这个指针。
```
#include <pthread.h>
int pthread_join(pthread_t thread, void **value_ptr);
```
一个线程所使用的内存资源在应用pthread_join调用之前不会被重新分配，所以对于每个线程必须调用一次pthread_join函数。pthread_join会释放线程资源.
调用该函数的线程将**挂起**等待，直到id为 thread 的线程终止。 thread 线程以不同的方法终止，通
过 pthread_join 得到的终止状态是不同的，总结如下：
* 如果 thread 线程通过 return 返回， value_ptr 所指向的单元里存放的是 thread 线程函数的返回值。
* 如果 thread 线程被别的线程调用 pthread_cancel 异常终止掉， value_ptr 所指向的单元里存放的是常数 PTHREAD_CANCELED 。
* 如果 thread 线程是自己调用 pthread_exit 终止的， value_ptr 所指向的单元存放的是传给 pthread_exit 的参数。
 例子：
```
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
void *thr_fn1(void *arg)
{
    printf("thread 1 returning\n");
    return (void *)1;
}
void *thr_fn2(void *arg)
{
    printf("thread 2 exiting\n");
    pthread_exit((void *)2);
}
void *thr_fn3(void *arg)
{
    while(1) {
        printf("thread 3 writing\n");
        sleep(1);
    }
}
int main(void)
{
    pthread_t tid;
    void *tret;
    pthread_create(&tid, NULL, thr_fn1, NULL);
    pthread_join(tid, &tret);
    printf("thread 1 exit code %d\n", (int)tret);
    pthread_create(&tid, NULL, thr_fn2, NULL);
    pthread_join(tid, &tret);
    printf("thread 2 exit code %d\n", (int)tret);
    pthread_create(&tid, NULL, thr_fn3, NULL);
    sleep(3);
    pthread_cancel(tid);
    pthread_join(tid, &tret);
    printf("thread 3 exit code %d\n", (int)tret);
    return 0;
}
```
## 工作（Worker）线程模型
下面的示例是计算从 1 到 10 的和，但并不是通过 main 函数进行运算，而是创建两个线程，其中一个线程计算 1 到 5 的和，另一个线程计算 6 到 10 的和，main 函数只负责输出运算结果。这种方式的线程模型称为「工作线程」

```
#include <stdio.h>
#include <pthread.h>
void *thread_summation(void *arg);
int sum = 0;
int main(int argc, char *argv[])
{
    pthread_t id_t1, id_t2;
    int range1[] = {1, 5};
    int range2[] = {6, 10};
    pthread_create(&id_t1, NULL, thread_summation, (void *)range1);
    pthread_create(&id_t2, NULL, thread_summation, (void *)range2);
    pthread_join(id_t1, NULL);
    pthread_join(id_t2, NULL);
    printf("result: %d \n", sum);
    return 0;
}
void *thread_summation(void *arg)
{
    int start = ((int *)arg)[0];
    int end = ((int *)arg)[1];
    while (start <= end)
    {
        sum += start;
        start++;
    }
    return NULL;
}
```


## 线程安全问题

线程安全函数被多个线程同时调用也不会发生问题。反之，非线程安全函数被同时调用时会引发问题。

幸运的是，大多数标准函数都是线程安全函数。操作系统在定义非线程安全函数的同时，提供了具有相同功能的线程安全的函数。比如，
```
struct hostent *gethostbyname(const char *hostname);
```
同时，也提供了同一功能的安全函数：
```
struct hostent *gethostbyname_r(const char *name,
                                struct hostent *result,
                                char *buffer,
                                int intbuflen,
                                int *h_errnop);
```
线程安全函数结尾通常是 `_r` 。但是使用线程安全函数会给程序员带来额外的负担，可以通过以下方法自动将 gethostbyname 函数调用改为 gethostbyname_r 函数调用。
声明头文件前定义 `_REENTRANT` 宏。
无需特意更改源代码加，可以在编译的时候指定编译参数定义宏。
```
gcc -D_REENTRANT mythread.c -o mthread -lpthread
```


## 线程间同步
### mutex(锁)--> 做互斥用
多个线程同时访问共享数据时可能会冲突，这跟前面讲信号时所说的可重入性是同样的问题。
对于多线程的程序，访问冲突的问题是很普遍的，解决的办法是引入互斥锁（Mutex，Mutual
Exclusive Lock），获得锁的线程可以完成“读-修改-写”的操作，然后释放锁给其它线程，没有
获得锁的线程只能等待而不能访问共享数据，这样**“读-修改-写”三步操作组成一个原子操作**，要
么都执行，要么都不执行，不会执行到中间被打断，也不会在其它处理器上并行做这个操作。
Mutex用 pthread_mutex_t 类型的变量表示，可以这样初始化和销毁：
```
#include <pthread.h>
int pthread_mutex_destroy(pthread_mutex_t *mutex);
int pthread_mutex_init(pthread_mutex_t *restrict mutex,
const pthread_mutexattr_t *restrict attr);
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
```
Mutex的加锁和解锁函数：
```
#include <pthread.h>
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_trylock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);
```
返回值：成功返回0，失败返回错误号。
一个线程可以调用pthread_mutex_lock获得Mutex，如果这时另一个线程已经调
用pthread_mutex_lock获得了该Mutex，则当前线程需要挂起等待，直到另一个线程调
用pthread_mutex_unlock释放Mutex，当前线程被唤醒，才能获得该Mutex并继续执行。
如果一个线程既想获得锁，又不想**挂起等待**，可以调用pthread_mutex_trylock，如果Mutex已经
被另一个线程获得，这个函数会失败返回`EBUSY`，而不会使线程挂起等待。
加锁例子：
```
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <errno.h>
#include <unistd.h>
#include <string.h>
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;//初始化了一个MUTEX锁
int count = 0;
void *func1(void *arg)
{
    int *a = (int *) arg;
    printf("thread%d start\n", *a); //如果次线程被cancel掉的话，可能会出现死锁
    int i;
    for (i = 0; i < 10; i++)
    {
        printf("thread%d is running\n", *a);
        sleep(1);
        pthread_mutex_lock(&mutex); //给mutex加锁,这是一条原子操作，不可能出现两个线程同时执行这个代码
        count++; //这段代码受到保护，永远只有一个线程可以操作
        pthread_mutex_unlock(&mutex); //给mutex解锁
    } //加锁的代码多了会是程序的运行效率降低
    printf("thread%d end\n", *a);
    pthread_exit(NULL);
}
int main(int arg, char * args[])
{
    printf("process start\n");
    pthread_t thr_d1, thr_d2;
    int i[2];
    i[0] = 1;
    i[1] = 2;
    pthread_create(&thr_d1, NULL, func1, &i[0]);
    pthread_create(&thr_d2, NULL, func1, &i[1]);
    pthread_join(thr_d1, NULL);
    pthread_join(thr_d2, NULL);
    printf("process end\n");
    return 0;
}
```
#### 死锁
* 情形一：如果同一个线程先后两次调用lock，在第二次调用时，由于锁已经被占用，该线程
会挂起等待别的线程释放锁，然而锁正是被自己占用着的，该线程又被挂起而没有机会释放
锁，因此就永远处于挂起等待状态了
* 情形二：交叉死锁，线程A获得了锁1，线程B获得了锁2，这时线程A调用lock试图获得锁2，结果是需要挂起等
待线程B释放锁2，而这时线程B也调用lock试图获得锁1，结果是需要挂起等待线程A释放锁1，于是线程A和B都永远处于挂起状态了
#### 避免死锁：
1. 写程序时应该尽量避免同时获得多个锁，如果一定有必要这么做，则有一个原则：如果所有线
程在需要多个锁时都按相同的先后顺序（常见的是按Mutex变量的地址顺序）获得锁，则不会出现死锁。
2. 如果要为所有的锁确定一个先后顺序比较困难，则应该尽量使用pthread_mutex_trylock调
用代替pthread_mutex_lock调用，以免死锁


### 条件变量(Condition Variable)--> 做线程同步用
线程间的同步还有这样一种情况：线程A需要等某个条件成立才能继续往下执行，现在这个条件
不成立，线程A就阻塞等待，而线程B在执行过程中使这个条件成立了，就唤醒线程A继续执
行。在pthread库中通过条件变量（Condition Variable）来阻塞等待一个条件，或者唤醒等待这
个条件的线程。Condition Variable用 pthread_cond_t 类型的变量表示，可以这样初始化和销毁：
```
#include <pthread.h>
int pthread_cond_destroy(pthread_cond_t *cond);
int pthread_cond_init(pthread_cond_t *restrict cond,
const pthread_condattr_t *restrict attr);
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
```
Condition Variable操作列函数：
```
#include <pthread.h>
int pthread_cond_timedwait(pthread_cond_t *restrict cond,
    pthread_mutex_t *restrict mutex,
    const struct timespec *restrict abstime);
int pthread_cond_wait(pthread_cond_t *restrict cond,
    pthread_mutex_t *restrict mutex);
int pthread_cond_broadcast(pthread_cond_t *cond);       //唤醒一个
int pthread_cond_signal(pthread_cond_t *cond);              //唤醒所有等待的线程
```
一个线程可以调用 pthread_cond_wait 在一个Condition Variable上阻塞等待，这个函数做以下三步操作：
1. 释放Mutex  2. 阻塞等待   3. 当被唤醒时，重新获得Mutex并返回


假设想实现一个简单的消费者生产者模型，一个线程往队列中放入数据，一个线程往队列中取数据，取数据前需要判断一下队列中确实有数据，由于这个队列是线程间共享的，所以，需要使用互斥锁进行保护，一个线程在往队列添加数据的时候，另一个线程不能取，反之亦然。
```
#include <stdlib.h>
#include <pthread.h>
#include <stdio.h>
struct msg {
    struct msg *next;
    int num;
};
struct msg *head;
pthread_cond_t has_product = PTHREAD_COND_INITIALIZER;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
void *consumer(void *p)
{
    struct msg *mp;
    for (;;) {
        pthread_mutex_lock(&lock);
        while (head == NULL)
        pthread_cond_wait(&has_product, &lock);
        mp = head;
        head = mp->next;
        pthread_mutex_unlock(&lock);
        printf("Consume %d\n", mp->num);
        free(mp);
        sleep(rand() % 5);
    }
}
void *producer(void *p)
{
    struct msg *mp;
    for (;;) {
        mp = malloc(sizeof(struct msg));
        mp->num = rand() % 1000 + 1;
        printf("Produce %d\n", mp->num);
        pthread_mutex_lock(&lock);
        mp->next = head;
        head = mp;
        pthread_mutex_unlock(&lock);
        pthread_cond_signal(&has_product);
        sleep(rand() % 5);
    }
}
int main(int argc, char *argv[])
{
    pthread_t pid, cid;
    srand(time(NULL));
    pthread_create(&pid, NULL, producer, NULL);
    pthread_create(&cid, NULL, consumer, NULL);
    pthread_join(pid, NULL);
    pthread_join(cid, NULL);
    return 0;
}
```
### Semaphore(信号量)--> 既能做互斥又能做线程同步
信号量用在多线程多任务同步的，一个线程完成了某一个动作就通过信号量告诉别的线程，别的线程再进行某些动作
Mutex变量是非0即1的，可看作一种**资源的可用数量**，初始化时Mutex是1，表示有一个可用资
源，加锁时获得该资源，将Mutex减到0，表示不再有可用资源，解锁时释放该资源，
将Mutex重新加到1，表示又有了一个可用资源。
信号量（Semaphore）和Mutex类似，表示可用资源的数量，和Mutex不同的是这个数量可以大于1。
信号量是一个整数 count，提供两个原子(atom，不可分割)操作：P 操作和 V 操作，或是说 wait 和 signal 操作。
* P操作 (wait操作)：count 减1；如果 count < 0 那么挂起执行线程；
* V操作 (signal操作)：count 加1；如果 count <= 0(说明有其他的线程在等待) 那么唤醒一个执行线程；  


特别的,count 等于1的信号量保证了只有一个线程能进入临界区, 这种信号量被称为binary semaphore, 跟mutex是等价的。
而当count大于1的时候，说明条件满足，可以有多个线程进入临界区，进入临界后要注意线程安全问题，


```
#include <semaphore.h>
int sem_init(sem_t *sem, int pshared, unsigned int value);
int sem_wait(sem_t *sem);
int sem_trywait(sem_t *sem);
int sem_post(sem_t * sem);
int sem_destroy(sem_t * sem);
```
#### 场景一：
条件变量中的生产者－消费者的例子是基于链表的，其空间可以动态分配，现在基于固定大小的环形队列重写这个程序：
```
#include <stdlib.h>
#include <pthread.h>
#include <stdio.h>
#include <semaphore.h>
#define NUM 5
int queue[NUM];
sem_t blank_number, product_number;
void *producer(void *arg)
{
    int p = 0;
    while (1) {
        sem_wait(&blank_number);
        //加锁

        queue[p] = rand() % 1000 + 1;    
         //解锁

        printf("Produce %d\n", queue[p]);
        sem_post(&product_number);
        p = (p+1)%NUM;
        sleep(rand()%5);
    }
}
void *consumer(void *arg)
{
    int c = 0;
    while (1) {
        sem_wait(&product_number);
        printf("Consume %d\n", queue[c]);
        //加锁
        queue[c] = 0;
         //解锁
        sem_post(&blank_number);
        c = (c+1)%NUM;
        sleep(rand()%5);
    }
}
int main(int argc, char *argv[])
{
    pthread_t pid, cid;
    sem_init(&blank_number, 0, NUM);
    sem_init(&product_number, 0, 0);
    pthread_create(&pid, NULL, producer, NULL);
    pthread_create(&cid, NULL, consumer, NULL);
    pthread_join(pid, NULL);
    pthread_join(cid, NULL);
    sem_destroy(&blank_number);
    sem destroy(&product number);
    return 0;
}
```
#### 场景二：
最典型的使用semaphore的场景： a源自一个线程，b源自另一个线程，计算c = a + b也是一个线程。（即一共三个线程）
显然，第三个线程必须等第一、二个线程执行完毕它才能执行。 在这个时候，我们就需要调度线程了：让第一、二个线程执行完毕后，再执行第三个线程。 此时，就需要用semaphore了。
```
int a, b, c;
void geta()
{
    a = calculatea();
    semaphore_increase();
}


void getb()
{
    b = calculateb();
    semaphore_increase();
}




void getc()
{
    semaphore_decrease();
    semaphore_decrease();
    c = a + b;
}


t1 = thread_create(geta);
t2 = thread_create(getb);
t3 = thread_create(getc);
thread_join(t3);


// semaphore的机制我在这里就不讲了，百度一下你就知道。
// semaphore_increase对应sem_post
// semaphore_decrease对应sem_wait
```
这就是semaphore最典型的用法。 说白了，**调度线程**，就是：一些线程生产（increase）同时另一些线程消费（decrease），semaphore可以让生产和消费保持合乎逻辑的执行顺序。
简而言之，锁是服务于共享资源的；而semaphore是服务于多个线程间的执行的逻辑顺序的。




#### 被”抛弃”的信号量
semaphore同时具有了mutex和condition_variable的功能, 这使得人们使用semaphore的时候很难区分某个semaphore是用来互斥的, 还是用来同步的.
而大部分情况下, semaphore都是用来互斥的, 而一个binary semaphore可以另一个线程加锁, 在另一个线程解锁的行为, 很容易导致错误. mutex则规定了在哪个线程加锁, 就得在哪个线程解锁, 否则未定义行为, 用错就挂, 至少容易发现错误. 这使得linux kernel也大范围弃用semaphore




### 其它线程间同步机制
如果共享数据是只读的，那么各线程读到的数据应该总是一致的，不会出现访问冲突。只要有
一个线程可以改写数据，就必须考虑线程间同步的问题。由此引出了读者写者锁（**Reader-Writer Lock**）的概念，Reader之间并不互斥，可以同时读共享数据，而Writer是独占的（exclusive），在Writer修改数据时其它Reader或Writer不能访问数据，可见Reader-Writer
Lock比Mutex具有更好的并发性。

