锁是一种悲观的策略。它总是假设每一次的临界区操作会产生冲突，因此，必须对每次操作都小心翼翼。如果有多个线程同时需要访问临界区资源，就宁可牺牲性能让线程进行等待，所以说锁会阻塞线程执行。而无锁是一种乐观的策略，它会假设对资源的访问时没有冲突的。既然没有冲突，自然不需要等待，所以所有的线程都可以在不停顿的状态下执行。无锁的策略使用CAS（compare and swap）比较交换技术来鉴别线程冲突，一旦检测到冲突产生，就**重试当前操作**直到没有冲突为止。
对CAS的理解，CAS是一种无锁算法，CAS有3个操作数，内存值V，旧的预期值A，要修改的新值B。当且仅当预期值A和内存值V相同时，将内存值V修改为B，否则什么都不做。





```
//AtomicInteger.conpareAndSet(int expect, indt update)
public final boolean compareAndSet(int expect, int update) {
        return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
}
```


第一个参数expect为期望值，如果期望值跟内存值还是一致，进行update赋值，如果期望值不一致，证明数据被修改过，返回fasle，取消赋值。



