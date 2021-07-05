简介
EOSVM是EOS的下一代虚拟机，其目标是支持合约的JIT执行。在当前的EOS中，虽然也支持JIT执行，但是存在安全隐患，因此无法在关键节点使用。


JIT执行至少需要解决下面几个问题:


1. 内存越界访问


2. 异常捕获


3. ABI匹配


下面看看EOSVM是如何解决这些问题的。


内存越界访问
EOS合约使用C/C++，因此需对指针类访问做安全检查，否则通过指针越界访问，将产生不可期望的结果。


EOSVM设定合约运行环境为32位机器，但是EOSVM运行环境需为64位。也正是通过这个机制，可以高效的控制内存使用。


首先，EOSVM使用mmap方法为合约映射一块略大于4G大小的虚拟地址，作为合约可访问的数据边界。当合约内访问某个地址的数据时，实际上是访问基于该虚拟地址的偏移。因为合约的运行环境设定是32位，所以不存在越界访问的问题。


比如，有如下合约代码：


uint64_t* pointer = (uint64_t*)0xf12345678;
uint64_t value = *pointer;
因为合约执行环境设定为32位，即sizeof(uint64_t*)值为4，所以pointer的值为0x12345678。假设mmap的申请的虚拟地址为0xa00000000,则*pointer其实访问的是*(uint64_t*)0xa12345678。因为pointer最大为0xffffffff,因此不会超过4G的大小。而这些转换将在WASM->JIT编译期由EOSVM完成，因此是安全的。


此外, mmap仅仅是做地址映射，使用前并不会做实际内存分配，所以并不会造成内存浪费。同时，对未分配的页面设置权限，还可进一步限制合约访问。


异常捕获
JIT执行的另一个问题是异常捕获。因为机器指令是节点翻译的，因此不会有非法机器指令。但是类似于除零异常、读取未分配页面等，必须要做捕获和处理。


这里要利用linux下的signal机制，通过signal来捕获各种硬件异常，并配合sigsetjmp/siglongjmp转化为C++的异常。


简易示意代码如下:
```
sigjmp_buf dest;
int gsig;
void signal_handler(int sig)
{
    gsig = sig;
    siglongjmp(dest, sig);
}
void contract_exec()
{
    ...
    a = 0;
    b /= a;
    ...
}
void vm_call()
{
    std::signal(SIGFPE, &signal_handler);
    try {
        if((sig = sigsetjmp(dest, 1)) == 0)
            contract_exec();
        else
            throw gsig;
    }
    catch(int sig) {
        std::cout << "catch: sig=" << sig << std::endl;
    }
}
```
ABI匹配
合约需要访问VM提供的API来使用更复杂的功能，这里就涉及到参数匹配的问题。


有两个地方可以做限制:


1. 对于合约调用和合约声明不一致，在wasm->jit转换时可以检测到。


2. 对于调用未声明API，在函数表解析时即可检测到。


3. 对API访问做一个总入口，做参数数量检测。


并且EOSVM对参数做了限制，只能传值不可传指针，这样也避免了指针的隐患。