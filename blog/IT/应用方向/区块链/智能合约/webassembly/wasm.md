## 02 | 历史篇：为什么会有 WebAssembly 这样一门技术？
1. 为了构建更高性能的 Web 应用


### 慢的原因？
1.Web应用规模越来越大
现代的大多数网页，都会使用较新的 JavaScript 语法标准进行开发，然后在发布时使用诸
如 Babel 等工具，将这些新的 JavaScript 语法转换为对应的 ES5 旧版本语法，来兼容旧
版本浏览器。但这样做，产生的各类 Polyfill 代码，会极大地增加整个 Web 应用的体积。


2.JavaScript 的弱类型之殇
变量具体类型的推导过程，会被推迟到代码的实际运行时再进行。会带来额外的运行时性能开销。
以x + y为例，+号两边的类型可以是多种的，当引擎执行时就得具体的来判断两边是什么类型，
然后在再决定用什么方式来操作。


2. 将其它语言的代码移植的web端




## 03 | WebAssembly 是一门新的编程语言吗？
Wasm 是一种基于堆栈机模型设计的 V-ISA 指令集
”Wasm 被设计成为一种编程语言的可移植编译目标“
其中的这些虚拟指令无法被真实的物理 CPU 硬件直接执行


### 常见的计算模型
* 累加器机模型
    缺点：内部只有一个累加器寄存器可用于暂存数据，因此在指令的执行过程
    中，可能会频繁请求机器的线性内存，从而导致一定的性能损耗。
    优点：指令最多只能有一个操作数，指令较为精简
* 堆栈机
    简单且易于实现，对应生成的指令代码长短大小适中
    无法直接对位于栈底的数据进行操作，因此在某些情况下，机器会使用额外的指令来进
    行栈数据的交换过程，从而损失了一定的执行效率    
* 寄存器机
    使用多个寄存器作为数据的存储和交换容器。
    指令的长度增加
    过于灵活的数据操作，也意味着寄存器的分配和使用规则变得复杂
    众多的数据暂存容器，给予了寄存器机更大的优化空间




ISA（Instruction Set Architecture，指令集架构）  指应用在实际物理架构上的指令集
V-ISA 指应用于虚拟架构体系的指令集




04 | WebAssembly 模块的基本组成结构到底有多简单？


单体 Section
Type Section
Start Section
Global Section
Custom Section


互补 Section


Import Section 和 Export Section


Import Section
定义了所有从外界宿主环境导入到模块对象中的资
源，这些资源将会在模块的内部被使用
目的是：是希望能够在 Wasm 模块之间，以及 Wasm 模块与宿主环境之间共享代码和数据




Function Section 和 Code Section




Table Section 和 Element Section




Memory Section 和 Data Section




05 | 二进制编码：WebAssembly 微观世界的基本数据规则是什么？










06 | WAT：如何让一个 WebAssembly 二进制模块的内容易于解读？
wat是Wasm的文本表示
S表达式（S-Expression）是一种用于表达树形结构化数据的记号方式
S- 表达式被用于 Lisp 语言，表达其源代码以及所使用到的字面量数据
对一个 “S- 表达式” 的求值会从最内层的括号表达式开始，从内到外，最后计算出整个表达式的值


WAT 与 WAST
“.wast” 为后缀的文本文件通常表示着 “.wat” 的一个超集
.wast文件中可能会包含有一些，基于 WAT 可读文本格式代码标准扩展而来的其他语法结
构。比如一些与“断言”和“测试”有关的代码，而这部分语法结构并不属于 Wasm 标准
的一部分。








07 | WASI：你听说过 WebAssembly 操作系统接口吗？
WASI（WebAssembly System Interface，Wasm 操作系统接口）




08 | API：在 WebAssembly MVP 标准下你能做到哪些事？


09 | WebAssembly 能够为 Web 前端框架赋能吗？    







