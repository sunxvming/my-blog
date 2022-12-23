```
【编译连接】
as -g --32 -o hello.o hello.s 
ld -m elf_i386 -o hello hello.o


linux下的这个文件下有很多汇编的包含目录，比如unistd_32.h文件里面定义了所有的系统调用号对应的常量 
/usr/include/asm




【指令】
addl subl imull  计算结果一般存在第二个参数中
decl incl
pushl popl
   do pushl , %esp gets subtracted by 4 so that it points to the new top of the stack
movl movb
call ret
je jg jge jl jle jmp
shrl  向右移动




directive
    .section
    .lcomm   
        声明一个.bss段的变量
        .lcomm my_buffer, 500
    .equ  
        allows you to assign names to numbers
        .equ LINUX_SYSCALL, 0x80
    .include
    .globl read_record
    .type read_record, @function
    .rept
        .ascii "Fredrick\0"
        .rept 31 #Padding to 40 bytes
        .byte 0
        .endr    
        
Table of Contents
1 Introduction
    Welcome to Programming 
    Your Tools
2 Computer Architecture 
    Structure of Computer Memory
    The CPU
    Some Terms 
    Interpreting Memory
    Data Accessing Methods
        immediate mode
            movl $1, %eax   $1代表数字1
        register addressing mode
            direct addressing mode
                movl 1, %eax    把地址1的值移到%eax
                movl ADDRESS, %eax  把ADDRESS地址的值移到%eax中
            indexed addressing mode
                multiplier
                movl BEGINNINGADDRESS(,%INDEXREGISTER,WORDSIZE)
                movl string_start(,%ecx,1), %eax
        indirect addressing mode
            
        base pointer addressing mode
            
    Review 
3 Your First Programs
    Entering in the Program
    Outline of an Assembly Language Program
        general-purpose registers
            • %eax
            • %ebx
            • %ecx
            • %edx
            • %edi     可能是data idex的缩写   
            • %esi     变址寄存器是指寄存器ESI、EDI、SI和DI的寄存器，它们主要用于存放存储单元在段内的偏移量
              %cl  first part of %ecx
        special-purpose
            • %ebp     the current base pointer register
            • %esp     the stack register, %esp , always contains a pointer to the current top of the stack
            • %eip     the instruction point
            • %eflags  the status register，别的指令执行完的状态码会存在这里面
        e代表extend，为了跟之前的16位的寄存器区别，64位寄存器以r开头 
        寄存器通常会作为指令的参数
    Planning the Program
    Finding a Maximum Value
        jump
            je
            jg
            jge
            jl
            jle
            jmp
    Addressing Modes 
        general form
            ADDRESS_OR_OFFSET(%BASE_OR_OFFSET,%INDEX,MULTIPLIER)
            FINAL ADDRESS = ADDRESS_OR_OFFSET + %BASE_OR_OFFSET + MULTIPLIER * %INDEX
        direct addressing mode
            movl ADDRESS, %eax
        indexed addressing mode
            movl string_start(,%ecx,1), %eax      如果%ecx的值是2的话，那就是 access the third one， 因为计数是从0开始
        indirect addressing mode
            movl (%eax), %ebx     把%eax的地址的值移到%ebx
        base pointer addressing mode
            movl 4(%eax), %ebx   %eax地址加4然后取地址
        immediate mode
            movl $12, %eax          $12代表数字12
            movl $my_buffer, %ecx   $my_buffer代表my_buffer的地址
        register addressing mode
            movl %eax, %ebx
    Review 
4 All About Functions
    Dealing with Complexity
    How Functions Work
    Assembly-Language Functions using the C Calling Convention
        1.pushes all of the parameters onto the stack in the reverse order 
        2.issues a call instruction 
            pushes the address of the next instruction onto the stack
            modifies the instruction pointer (%eip) to point to the start of the function
        3.the function itself has some work to do    
            pushl %ebp
            movl %esp, %ebp   for access the parameters from the base pointer.
            subl $8, %esp     the function reserves space on the stack for any local variables
                              局部变量有指针，寄存器不会有指针的
        4.When a function is done executing
            stores it’s return value in %eax
            resets the frame stack.  即reset %esp %ebp
            use ret. It returns control back to wherever it was called from           
                movl %ebp, %esp
                popl %ebp
                ret      This pops the top value(return address) off of the stack, and then jumps to it.
        5.after call 
            deal return value, return values are always stored in %eax 
            clean up your stack parameters after a function call returns.
                addl  $8, %esp  #move the stack pointer back  如果调用的时候有参数的话要恢复栈
        stack layout
            Parameter #N     <--- N*4+4(%ebp)
            ...              
            Parameter 2      <--- 12(%ebp)
            Parameter 1      <--- 8(%ebp)
            Return Address   <--- 4(%ebp)
            Old %ebp         <--- (%ebp)
            Local Variable 1 <--- -4(%ebp)
            Local Variable 2 <--- -8(%ebp) and (%esp)    


            argument nums  8(%esp)
            program name   12(%esp)
            first agrs     16(%esp)
            
    A Function Example
    Recursive Functions
    Review 
5 Dealing with Files
    The UNIX File Concept
    Buffers and bss 
        .text .data  .bss
    Standard and Special Files
    Using Files in a Program
        The number of arguments is stored at 8(%esp) , the name of the program is stored at 12(%esp) , and the arguments are stored from 16(%esp) on.
    
6 Reading and Writing Simple Records 
    Writing Records
    Reading Records
    Modifying the Records 
    Review 
7 Developing Robust Programs
    Where Does the Time Go?
    Some Tips for Developing Robust Programs
    Handling Errors Effectively
    Making Our Program More Robust
8 Sharing Functions with Code Libraries
    Using a Shared Library
        编译指令
            as helloworld-lib.s -o helloworld-lib.o
            ld -dynamic-linker /lib/ld-linux.so.2 -o helloworld-lib helloworld-lib.o -lc    
    How Shared Libraries Work 
        ldd ./helloworld-lib  show all dynamic lib  
    Finding Information about Libraries
         Most of your system libraries are in /usr/lib or /lib
    Useful Functions
    Building a Shared Library
9 Intermediate Memory Topics
    How a Computer Views Memory
    The Memory Layout of a Linux Program
    
        environment variables
        ...
        command-line arguments 2
        command-line arguments 1
        program name
        the number of arguments  <--%esp  
        
        .bss
        .data
        .text 
    Every Memory Address is a Lie 
        Earlier we talked about the inaccessible memory between the .bss and the stack, but we didn’t
        talk about why it was there. The reason is that this region of virtual memory addresses hasn’t
        been mapped onto physical memory addresses.


        in order to make the process more efficient, memory is separated out into groups called pages.
        you should try to keep most memory accesses within the same basic range of memory, so you will 
        only need a page or two of memory at a time
    Getting More Memory
        brk
    A Simple Memory Manager
        The allocate_init function
        The allocate function
        The deallocate function
        Performance Issues and Other Problems
            1.每次都要循环一遍
            2.当内存满时，循环每个块的内存时，都要从disk中load出来去检查是否可用
            3.brk的系统调用的次数   They aren’t like functions, because the processor has to switch modes.
            4.空间浪费
    Using our Allocator
        
    More Information
10 Counting Like a Computer135
    Counting
        Counting Like a Human
        Counting Like a Computer
        Conversions Between Binary and Decimal
    Truth, Falsehood, and Binary Numbers
        boolean operators：AND OR NOT XOR
         
            These operations are useful for two reasons:
                • The computer can do them extremely fast
                • You can use them to compare many truth values at the same time     
                
        xorl %eax, %eax  等价于 movl $0, %eax 
        
        XOR的意义：判断两个数的位不同，不同的用1表示
        
        Shift left 10010111 = 00101110
        Rotate left 10010111 = 00101111   左边的移到右边
        
    The Program Status Register 
         carry flag  两个register相加溢出了会设置成这个flag
    Other Numbering Systems
        Floating-point Numbers
        Negative Numbers    
            首位表示符号的问题
                1.电路设计更复杂
                2.会出现两个0，一个正的0和一个负的0。比较的时候就会出问题
            two’s complement representation(二进制补码)
                1. Perform a NOT operation on the number
                2. Add one to the resulting number
            特殊处：    
                首位0为正数，1为负数
                0在二进制补码中视为正数
                把32位的负数转换成64位的时候，左边的要用符号位填上
        x86 processor有一些指令是根据符号不同而不同的        
    Octal and Hexadecimal Numbers 
        0x  0b
    Order of Bytes in a Word
        The x86 processor is a little-endian processor
        当从寄存器写到内存的时候需要转换成大端
    Converting Numbers for Display


11 High-Level Languages
    Compiled and Interpreted Languages
    Your First C Program
    Perl
    Python 


12 Optimization
    When to Optimize
        Optimization is not necessary during early development
        When you optimize, your code generally becomes less clear, because it becomes more complex
    Where to Optimize
        running a profiler to determine which function is cost most
    Local Optimizations(微观层面，比如代码片段上)
       
    Global Optimization(宏观层面，比如架构上)
        
13 Moving On from Here 
    From the Bottom Up
    From the Top Down
    From the Middle Out 
    Specialized Topics 
    Further Resources on Assembly Language 


Appendix
    A GUI Programming
    B Common x86 Instructions 
    C Important System Calls
    D Table of ASCII Codes 
    E C Idioms in Assembly Language 
    F Using the GDB Debugger
    G Document History
    H GNU Free Documentation License
    I Personal Dedication


111    
```