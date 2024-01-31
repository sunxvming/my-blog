
some note copy from [EffectiveModernCppChinese](https://github.com/racaljk/EffectiveModernCppChinese)

一、类型推导
1. 理解模板类型推导
2. 理解auto类型推导
3. 理解decltype
4. 学会查看类型推导结果

二、auto
5. 优先考虑auto而非显式类型声明
6. auto推导若非己愿，使用显式类型初始化惯用法

三、移步现代C++
7. 区别使用()和{}创建对象
8. 优先考虑nullptr而非0和NULL
9. 优先考虑别名声明而非typedefs
10. 优先考虑限域枚举而非未限域枚举
11. 优先考虑使用delete而非使用未定义的私有声明
12. 使用override声明重载函数
13. 优先考虑const_iterator而非iterator
14. 如果函数不抛出异常请使用noexcept
15. 尽可能的使用constexpr
16. 确保const成员函数线程安全
17. 理解特殊成员函数函数的生成

四、智能指针
18. 对于占有性资源使用std::unique_ptr
19. 对于共享性资源使用std::shared_ptr
20. 对于类似于std::shared_ptr的指针使用std::weak_ptr可能造成悬置
21. 优先考虑使用std::make_unique和std::make_shared而非new
22. 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数


五、右值引用，移动语意，完美转发
23. 理解std::move和std::forward
24. 区别通用引用和右值引用
25. 对于右值引用使用std::move，对于通用引用使用std::forward
26. 避免重载通用引用
27. 熟悉重载通用引用的替代品
28. 理解引用折叠
29. 认识移动操作的缺点
30. 熟悉完美转发失败的情况


六、Lambda表达式
31. 避免使用默认捕获模式
32. 使用初始化捕获来移动对象到闭包中
33. 对于std::forward的auto&&形参使用decltype
34. 有限考虑lambda表达式而非std::bind


七、并发API
35. 优先考虑基于任务的编程而非基于线程的编程
36. 如果有异步的必要请指定std::launch::threads
37. 从各个方面使得std::threads unjoinable
38. 知道不同线程句柄析构行为
39. 考虑对于单次事件通信使用void
40. 对于并发使用std::atomic，volatile用于特殊内存区

八、微调
41. 对于那些可移动总是被拷贝的形参使用传值方式
42. 考虑就地创建而非插入

#### 一、类型推导

**1. 理解模板类型推导**

其他之前说过了，主要是T有三种情况：1.指针或引用。2.通用的引用。3.既不是指针也不是引用
    
    template<typename T>
    void f(T& param);   //param是一个引用
    
    int x = 27; // x是一个int
    const int cx = x; // cx是一个const int
    const int& rx = x; // rx是const int的引用
    上面三种在调用f的时候会编译出不一样的代码：
    f(x);  // T是int，param的类型时int&
    f(cx); // T是const int，param的类型是const int&
    f(rx); // T是const int， param的类型时const int&
    
    template<typename T>
    void f(T&& param); // param现在是一个通用的引用
    
    template<typename T>
    void f(T param); // param现在是pass-by-value

如果用数组或者函数指针来调用的话，模板会自动抽象成指针。如果模板本身是第一种情况（指针或引用），那么就会自动编译成数组

**2. 理解auto类型推导**

auto关键字的类型推倒和模板差不多，auto就相当于模板中的T，所以：

    auto x = 27; // 情况3（x既不是指针也不是引用）
    const auto cx = x; // 情况3（cx二者都不是）
    const auto& rx = x; // 情况1（rx是一个非通用的引用）
    
    auto&& uref1 = x; // x是int并且是左值，所以uref1的类型是int&
    auto&& uref2 = cx; // cx是int并且是左值，所以uref2的类型是const int&
    auto&& uref3 = 27; // 27是int并且是右值， 所以uref3的类型是int&&
在花括号初始化的时候，推倒的类型是std::initializer_list的一个实例，但是如果把相同的类型初始化给模板，则是失败的，

    auto x = { 11, 23, 9 }; // x的类型是std::initializer_list<int>
    template<typename T> void f(T param); // 和x的声明等价的模板
    f({ 11, 23, 9 }); // 错误的！没办法推导T的类型
    
    template<typename T> void f(std::initializer_list<T> initList);
    f({ 11, 23, 9 }); // T被推导成int，initList的类型是std::initializer_list<int>

**3. 理解decltype**

    template<typename Container, typename Index> // works, but requires refinements
    auto authAndAccess(Container& c, Index i) -> decltype(c[i])
    {
        authenticateUser();
        return c[i];
    }
    在上面的这段代码里面，C++14可以把后面的->decltype(c[i])删掉，但是auto实际推倒的类型是container而不带引用。因为 authAndAccess(d, 5) = 10这样是编译器不允许的情况。
如果想要返回引用的话，需要将上面的那一段代码重写成下面的样子：
    
    template<typename Container, typename Index> // works, but still requires refinements
    decltype(auto) authAndAccess(Container& c, Index i)
    {
        authenticateUser();
        return c[i];
    }
如果想要这个函数既返回左值（可以修改）又可以返回右值（不能修改）的话，可以用下面的写法：
    
    template<typename Container, typename Index>
    decltype(auto) authAndAccess(Container&& c, Index i){//C++14
        authenticateUser();
        return std::forward<Container>(c)[i];
    }
decltype的一些让人意外的应用：
    
    decltype(auto) f2(){
        int x = 0 ;
        return x;     // 返回的是int;
    }
    decltype(auto) f2(){
        int x = 0;
        return (x);   //返回的是int&
    }

**4. 学会查看类型推导结果**

其实就是使用IDE编辑器来进行鼠标悬停/debug模式/运行时typeid输出等操作来查看类型

需要知道的是，编译器报告出来的数据类型并不一定正确，所以还是需要对C++标准的类型推倒熟悉

#### 二、auto

**5. 优先考虑auto而非显式类型声明**

没有初始化auto的时候，会从编译器阶段就报错;
可以让lambda表达式更加稳定，更加快速，需要更少的资源，避免类型截断的问题，变量声明引起的歧义：
    
    std::vector<int> v;
    unsigned sz = v.size(); //在32位下运行良好，因为此时size()返回的size_type是32位的，unsigned也是32位的，但是在64位上就不行了，size_type会变成64位，而unsigned仍然是32位
    auto     sz = v.size(); //在64位机器上仍然表现良好

**6. auto推导若非己愿，使用显式类型初始化惯用法**

    std::vector<bool> features(const Widget& w);
    Widget w;
    auto highPriority = features(w)[5]
    
    processWidget(w, highPriority); // 未定义的行为，因为这个时候highPriority已经不是bool类型的了，这个时候返回的是一个std::vector<bool>::reference对象（内嵌在std::vector<bool>中的对象）
如果用：
    
    bool highPriority = features(w)[5];的时候，因为编译器看到bool，所以会发生隐式转换，将reference转换成bool类型
当然也有强制变成bool 的方法：
    
    auto highPriority = static_cast<bool>(features(w)[5]);


#### 三、移步现代C++

**7. 区别使用()和{}创建对象**

大括号{}，更像是一种通用的，什么时候初始化都能用的东西，但是大括号会进行类型检查：
    
    double x, y, z;
    int sum1{x+y+z}; //错误，因为double之和可能无法用int表达（超出int范围）

小括号()和等于号=在更多时候是无法使用的，并且小括号很容易被认为是一个函数。但是这两个不会进行类似上面的类型检查：
    
    class Widget{
        int x{0}; //right
        int y = 0;//right
        int z(0); //错！
    };
    
    std::atomic<int> ai2(0); //right
    std::atomic<int> ai3 = 0; //错！
    
    Widget w1(10); //调用w1的构造函数

大括号和小括号的另一个区别是带有`std::initializer_list<long double>` 的时候，会自动调用大括号，反之没区别：
    
    class Widget{
    public:
        Widget(int i, bool b);
        Widget(std::initializer_list<long double> il);
    };
    
    Widget w1(10, true); //调用第一个构造函数
    Widget w2{10, true}; //调用第二个构造函数


**8. 优先考虑nullptr而非0和NULL**

编译器扫到一个0，发现有一个指针用到了他，所以才勉强强行将0解释为空指针，而NULL也是如此，这就会造成一些细节上的不确定性。

使用nullptr不仅可以避免一些歧义，还可以让代码更加清晰，而且nullptr是无法被解释为整数的，可以避免很多问题
**9. 优先考虑别名声明而非typedefs**

别名声明可以让函数指针变得更容易理解：

    // FP等价于一个函数指针，这个函数的参数是一个int类型和
    // std::string常量类型，没有返回值
    typedef void (*FP)(int, const std::string&); // typedef
    // 同上
    using FP = void (*)(int, const std::string&); // 声明别名
并且类型别名可以实现别名模板，而typedef不行：
    
    template<typname T> // MyAllocList<T>
    using MyAllocList = std::list<T, MyAlloc<T>>; // 等同于std::list<T,MyAlloc<T>>
    MyAllocList<Widget> lw; // 终端代码
模板别名还避免了::type的后缀，在模板中，typedef还经常要求使用typename前缀：
    
    template<class T>
    using remove_const_t = typename remove_const<T>::type

**10. 优先考虑限域枚举(enmus)而非未限域枚举(enum)**

    enum Color { black, white, red}; // black, white, red 和 Color 同属一个定义域
    auto white = false; // 错误！因为 white 在这个定义域已经被声明过
    
    enum class Color { black, white, red}; // black, white, red作用域为 Color
    auto white = false; // fine, 在这个作用域内没有其他的 "white"

C++98 风格的 enum 是没有作用域的 enum

有作用域的枚举体的枚举元素仅仅对枚举体内部可见。只能通过类型转换（ cast ）转换
为其他类型

有作用域和没有作用域的 enum 都支持指定潜在类型。有作用域的 enum 的默认潜在类型是 int 。没有作用域的 enum 没有默认的潜在类型。

有作用域的 enum 总是可以前置声明的。没有作用域的 enum 只有当指定潜在类型时才可以前置声明。
**11. 优先考虑使用delete来禁用函数而不是声明成private却又不实现**

    template <class charT, class traits = char_traits<charT> >
    class basic_ios : public ios_base {
    public:
        basic_ios(const basic_ios& ) = delete;
        basic_ios& operator=(const basic_ios&) = delete;
    };
delete的函数不能通过任何方式被使用，即使是其他成员函数或者friend，都是不行的，但是如果只是声明成privatre，编译器只会报警说是private的。

delete的另一个优势就是任何函数都可以delete，但是只有成员函数才能是private的，例如：
    
    bool isLucky(int number); // 原本的函数
    bool isLucky(char) = delete; // 拒绝char类型
上面这一段代码如果只是声明成private的话，会被重载

**12. 使用override声明重载函数**

只有当基类和子类的虚函数完全一样的时候，才会出现覆盖的情况，如果不完全一样，则会重载：
    
    class Base{
    public:
        virtual void doWork();
    };
    class Derived: public Base{
    public:
        virtual void doWork();   //会覆盖基类
    };
    
    class Derived:public Base{
    public:
        virtual void doWork()&&; //不会发生覆盖，而是会重载
    };
所以尽量要在需要重写的函数后面加上override

**13. 优先考虑const_iterator而非iterator**

C++98中const_iterator不太好用，但是C++11中很方便

**14. 如果函数不抛出异常请使用noexcept**

因为对于异常本身来说，会不会发生异常往往是人们所关心的事情，什么样的异常反而是不那么关心的，因此noexcept和const是同等重要的信息
并且加上noexcept关键字，会让编译器对代码的优化变强。

对于像swap这样需要进行异常检查的函数（还有移动操作函数，内存释放函数，析构函数），如果有noexcept关键字的话，会让代码效率提升非常大。当然，noexcept用的时候必须保证函数真的不会抛出异常

**15. 尽可能的使用constexpr**

constexpr：表示的值不仅是const，而且在编译阶段就已知其值了，他们因为这样的特性就会被放到只读内存里面，并且因为这个特性，constexpr的值可以用在数组规格，整形模板实参中：
    
    constexpr auto arraySize = 10;
    std::array<int, arraySize> data2;

但是对于constexpr的函数来说，如果所有的函数实参都是已知的，那这个函数也是已知的，如果所有实参都是未知的，编译无法通过，
在调用constexpr函数时，入股传入的值有一个或多个在编译期未知，那这个函数就是个普通函数，如果都是已知的，那这个函数也是已知的。

使用constexpr会让客户的代码得到足够的支持，并且提升程序的效率

**16. 确保const成员函数线程安全**

    class Polynomial{
    public:
        using RootsType = std::vector<double>;
        RootsType roots() const{
            if(!rootAreValid){
                rootsAreValid = true;
            }
            return rootVals;
        }
    private:
        mutable bool rootsAreValid{false};
        mutable RootsType rootVals{};
    }

在上面那段代码中，虽然roots是const的成员函数，但是成员变量是mutable的，是可以在里面改的，如果这样做的话，就无法做到线程安全，并且编译器在看到const的时候还认为他是安全的。这个时候只能加上互斥量 std::lock_guard<std::mutex> g(m); mutable std::mutex m;

当然，除了上面添加互斥量的做法以外，成本更低的做法是进行std::atomic的操作（但是仅适用于对单个变量或内存区域的操作）：
    
    class Point{
    public:
        double distanceFromOrigin() const noexcept{
            ++callCount;
            return std::sqrt((x*x) + (y * y));
        }    
    private:
        mutable std::atomic<unsigned> callCount{0};
        double x, y;
    };

**17. 理解特殊成员函数函数的生成**

特殊成员函数包括默认构造函数，析构函数，拷贝构造函数，拷贝赋值运算符（这些函数只有在需要的时候才会生成），以及最新的移动构造函数和移动赋值运算符

三大律：如果你声明了拷贝构造函数，赋值运算符重载，析构函数中的任何一个，都需要把其他几个补全，如果不想自己写的话，也要写上=default（如果不声明的话，编译器很有可能不会生成另外几个函数的默认函数）

对于成员函数模板来说，在任何情况下都不会抑制特殊成员函数的生成

#### 四、智能指针

**18. 对于占有性资源使用std::unique_ptr**

资源是独占的，不允许拷贝，允许进行move
std::unique_ptr是一个具有开销小，速度快，move-only特定的智能指针，使用独占拥有方式来管理资源

默认情况下，释放资源由delete来完成，也可以指定自定义的析构函数来替代，但是具有丰富状态的deleters和以函数指针作为deleters增大了std::unique_ptr的存储开销

很容易将一个std::unique_ptr转化为std::shared_ptr

**19. 对于共享性资源使用std::shared_ptr**

+ std::shared_ptr是原生指针的两倍大小，因为他们内部除了包含一个原生指针以外，还包含了一个引用计数
+ 引用计数的内存必须被动态分配，当然用make_shared来创建shared_ptr会避免动态内存的开销。
+ 引用计数的递增和递减必须是原子操作。
+ std::shared_ptr为了管理任意资源的共享式内存管理，提供了自动垃圾回收的便利
+ std::shared_ptr 是 std::unique_ptr 的两倍大，除了控制块，还有需要原子引用计数操作引起的开销
+ 资源的默认析构一般通过delete来进行，但是自定义的deleter也是支持的。deleter的类型对于 std::shared_ptr 的类型不会产生影响
+ 避免从原生指针类型变量创建 std::shared_ptr

**20. 对于类似于std::shared_ptr的指针使用std::weak_ptr可能造成悬置**

weak_ptr通常由一个std::shared_ptr来创建，他们指向相同的地方，但是weak_ptr并不会影响到shared_ptr的引用计数：
    
    auto spw = std::make_shared<Widget>();//spw 被构造之后被指向的Widget对象的引用计数为1(欲了解std::make_shared详情，请看Item21)
    std::weak_ptr<Widget> wpw(spw);//wpw和spw指向了同一个Widget,但是RC(这里指引用计数，下同)仍旧是1
    spw = nullptr;//RC变成了0，Widget也被析构，wpw现在处于悬挂状态
    if(wpw.expired())... //如果wpw悬挂...
那么虽然weak_ptr看起来没什么用，但是他其实也有一个应用场合（用来做缓存）：
    
    std::unique_ptr<const Widget> loadWidget(WidgetID id); //假设loadWidget是一个很繁重的方法，需要对这个方法进行缓存的话，就需要用到weak_ptr了：
    
    std::shared_ptr<const Widget> fastLoadWidget(WidgetId id){
        static std::unordered_map<WidgetID,
        std::weak_ptr<const Widget>> cache;
        auto objPtr = cache[id].lock();//objPtr是std::shared_ptr类型指向了被缓存的对象(如果对象不在缓存中则是null)
        if(!objPtr){
            objPtr = loadWidget(id);
            cache[id] = objPtr;
        }   //如果不在缓存中，载入并且缓存它
        return objPtr;
    }
+ std::weak_ptr 用来模仿类似std::shared_ptr的可悬挂指针
+ 潜在的使用 std::weak_ptr 的场景包括缓存，观察者列表，以及阻止 std::shared_ptr 形成的环

**21. 优先考虑使用std::make_unique和std::make_shared而非new**

+ 和直接使用new相比，使用make函数减少了代码的重复量，提升了异常安全度，并且，对于std::make_shared以及std::allocate_shared来说，产生的代码更加简洁快速
+ 也会存在使用make函数不合适的场景：包含指定自定义的deleter,以及传递大括号initializer的需要
+ 对于std::shared_ptr来说，使用make函数的额外的不使用场景还包含

    (1)带有自定义内存管理的class
    (2)内存非常紧俏的系统，非常大的对象以及比对应的std::shared_ptr活的还要长的std::weak_ptr

**22. 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数**

impl类的做法：之前写到过，就是把对象的成员变量替换成一个指向已经实现的类的指针，这样可以减少build的次数
    
    class Widget{ //still in header "widget.h"
    public:
        Widget();
        ~Widget(); //dtor is needed-see below
    private:
        struct Impl; //declare implementation struct and pointer to it
        std::unique_ptr<Impl> pImpl;
    }
    
    #include "widget.h" //in impl,file "widget.cpp"
    #include "gadget.h"
    #include <string>
    #include <vector>
    struct Widget::Impl{
        std::string name; //definition of Widget::Impl with data members formerly in Widget
        std::vector<double> data;
        Gadget g1,g2,g3;
    }
    Widget::Widget():pImpl(std::make_unique<Impl>())
    Widget::~Widget(){} //~Widget definition，必须要定义，如果不定义的话会报错误，因为在执行Widget w的时候，会调用析构，而我们并没有声明，所以unique_ptr会有问题

+ Pimpl做法通过减少类的实现和类的使用之间的编译依赖减少了build次数
+ 对于 std::unique_ptr pImpl指针，在class的头文件中声明这些特殊的成员函数，在class
的实现文件中定义它们。即使默认的实现方式(编译器生成的方式)可以胜任也要这么做
+ 上述建议适用于 std::unique_ptr ,对 std::shared_ptr 无用


#### 五、右值引用，移动语意，完美转发

**23. 理解std::move和std::forward**

首先move不move任何东西，forward也不转发任何东西，在运行时，不产生可执行代码，这两个只是执行转换的函数（模板），std::move无条件的将他的参数转换成一个右值，forward只有当特定的条件满足时才会执行他的转换，下面是std::move的伪代码：
    
    template<typename T>
    typename remove_reference<T>::type&& move(T&& param){
        using ReturnType = typename remove_reference<T>::type&&; //see Item 9
        return static_cast<ReturnType>(param);
    }

**24. 区别通用引用和右值引用**

    void f(Widget&& param);       //rvalue reference
    Widget&& var1 = Widget();     //rvalue reference
    auto&& var2 = var1;           //not rvalue reference
    template<typename T>
    void f(std::vector<T>&& param) //rvalue reference
    template<typename T>
    void f(T&& param);             //not rvalue reference

+ 如果一个函数的template parameter有着T&&的格式，且有一个deduce type T.或者一个对象被生命为auto&&,那么这个parameter或者object就是一个universal reference.
+ 如果type的声明的格式不完全是type&&,或者type deduction没有发生，那么type&&表示的是一个rvalue reference.
+ universal reference如果被rvalue初始化，它就是rvalue reference.如果被lvalue初始化，他就是lvaue reference.

**25. 对于右值引用使用std::move，对于通用引用使用std::forward**

右值引用仅会绑定在可以移动的对象上，如果形参类型是右值引用，则他绑定的对象应该是可以移动的

+ 通用引用在转发的时候，应该进行向右值的有条件强制类型转换（用std::forward）
+ 右值引用在转发的时候，应该使用向右值的无条件强制类型转换（用std::move)
+ 如果上面两个方法使用反的话，可能会导致很麻烦的事情（代码冗余或者运行期错误）

在书中一直在强调“move”和"copy"两个操作的区别，因为move在一定程度上会效率更高一些

但是在局部对象中这种想法是错误的：
    
    Widget MakeWidget(){
        Widget w;
        return w; //复制，需要调用一次拷贝构造函数
    }
    
    Widget MakeWidget(){
        Widget w;
        return std::move(w);//错误！！！！！！！会造成负优化
    }

因为在第一段代码中，编译器会启用返回值优化（return value optimization RVO）,这个优化的启动需要满足两个条件：
+ 局部对象类型和函数的返回值类型相同
+ 返回的就是局部对象本身

而下面一段代码是不满足RVO优化的，所以会带来负优化

所以：如果局部对象可以使用返回值优化的时候，不应该使用std::move 和std:forward

**26. 避免重载通用引用**

主要是因为通用引用（特别是模板），会产生和调用函数精确匹配的函数，例如现在有一个：
    
    template<typename T>
    void log(T&& name){}
    
    void log(int name){}
    
    short a;
    log(a);

这个时候如果调用log的话，就会产生精确匹配的log方法，然后调用模板函数

而且在重载过程当中，通用引用模板还会和拷贝构造函数，复制构造函数竞争（这里其实有太多种情况了），只举书上的一个例子：
    
    class Person{
    public:
        template<typename T> explicit Person(T&& n): name(std::forward<T>(n)){} //完美转发构造函数
        explicit Person(int idx); //形参为int的构造函数
    
        Person(const Person& rhs) //默认拷贝构造函数（编译器自动生成）
        Person(Person&& rhs); //默认移动构造函数（编译器生成）
    };
    
    Person p("Nancy");
    auto cloneOfP(p);  //会编译失败，因为p并不是const的，所以在和拷贝构造函数匹配的时候，并不是最优解，而会调用完美转发的构造函数

**27. 熟悉重载通用引用的替代品**

这一条主要是为了解决26点的通用引用重载问题提的几个观点，特别是对构造函数（完美构造函数）进行解决方案

+ 放弃重载，采用替换名字的方案
+ 用传值来替代引用（可以提升性能但却不用增加一点复杂度
+ 采用impl方法：
 ```
template<typename T>
void logAndAdd(T&& name){
	logAndAddImpl(
		std::forward<T>(name), 
		std::is_integral<typename std::remove_reference<T>::type>() //这一句只是为了区分是否是整形
	); 
}
```
+ 对通用引用模板加以限制（使用enable_if）
  
    class Person{
    public:
        template<typename T,
                 typename = typename std::enable_if<condition>::type>//这里的condition只是一个代号，condition可以是：!std::is_same<Person, typename std::decay<T>::type>::value,或者是：!std::is_base_of<Person, typename std::decay<T>::type>::value&&!std::is_integral<std::remove_reference_t<T>>::value
        explicit Person(T&& n);
    }
//说实话这个代码的可读性emmmmmmmm，大概还是我太菜了。。。。

**28. 理解引用折叠**

在实参传递给函数模板的时候，推导出来的模板形参会把实参是左值还是右值的信息编码到结果里面：
    
    template<typename T>
    void func(T&& param);
    
    Widget WidgetFactory() //返回右值
    Widget w;
    
    func(w);               //T的推到结果是左值引用类型，T的结果推倒为Widget&
    func(WidgetFactory);   //T的推到结果是非引用类型（注意这个时候不是右值），T的结果推到为Widget
C++中，“引用的引用”是违法的，但是上面T的推到结果是Widget&时，就会出现 void func(Widget& && param);左值引用+右值引用

所以事实说明，编译器自己确实会出现引用的引用（虽然我们并不能用），所以会有一个规则（我记得C++ primer note里面也讲到过）
+ 如果任一引用是左值引用，则结果是左值引用，否则就是右值引用
+ 引用折叠会在四种语境中发生：模板实例化，auto类型生成、创建和运用typedef和别名声明，以及decltype

**29. 认识移动操作的缺点**

+ 假设移动操作不存在，成本高，未使用
+ 对于那些类型或对于移动语义的支持情况已知的代码，则无需做上述假定

原因在于C++11以下的move确实是低效的，但是C++11及以上的支持让move操作快了一些，但是更多时候编写代码并不知道代码对C++版本的支持，所以要做以上假定

**30. 熟悉完美转发失败的情况**

    template<typename T>
    void fwd(T&& param){           //接受任意实参
        f(std::forward<T>(param)); //转发该实参到f
    }
    
    template<typename... Ts>
    void fwd(Ts&&... param){        //接受任意变长实参
        f(std::forward<Ts>(param)...);
    }

完美转发失败的情况：
    
    （大括号初始化物）
    f({1, 2, 3}); //没问题，{1, 2, 3}会隐式转换成std::vector<int>
    fwd({1, 2, 3}) //错误，因为向为生命为std::initializer_list类型的函数模板形参传递了大括号初始化变量，但是之前说如果是auto的话，会推到为std::initializer_list,就没问题了。。。
    
    （0和NULL空指针）
    （仅仅有声明的整形static const 成员变量）：
    class Widget{
    public:
        static const std::size_t MinVals = 28; //仅仅给出了声明没有给出定义
    };
    fwd(Widget::MinVals);      //错误，应该无法链接，因为通常引用是当成指针处理的，而也需要指定某一块内存来让指针指涉
    
    （重载的函数名字和模板名字）
    void f(int (*fp)(int));
    int processValue(int value);
    int processValue(int value, int priority);
    fwd(processVal); //错误，光秃秃的processVal并没有类型型别
    
    （位域）
    struct IPv4Header{
        std::uint32_t version:4,
        IHL:4,
        DSCP:6,
        ECN:2,
        totalLength:16;
    };
    
    void f(std::size_t sz); IPv4Header h;
    fwd(h.totalLength); //错误
+ 最后，所有的失败情形实际上都归结于模板类型推到失败，或者推到结果是错误的。

#### 六、Lambda表达式

**31. 避免使用默认捕获模式**

主要是使用显式捕获的时候，可以比较明显的让用户知道变量的声明周期：
    
    void addDivisorFilter(){
        auto divisor = computeDivisor(cal1, cal2);
        filters.emplace_back([&](int value){return value % divisor == 0;}) //危险，因为divisor在闭包里面很容易空悬，生命周期会结束
    }
如果用显式捕获的话：

    filters.emplace_back([&divisor](int value){return value % divisor == 0;}) //仍然很危险，但是起码很明显
最好的做法就是传一个this进去：

    void Widget::addFilter() const{
        auto currentObjectPtr = this;    //这样就把变量的声明周期和object绑定起来了
        filters.emplace_back([currentObjectPtr](int value){
            return value % currentObjectPtr->advisor == 0;
        })
    }

**32. 使用初始化捕获来移动对象到闭包中**

    auto func = [pw = std::make_unique<Widget>()]{    //初始化捕获（广义lambda捕获），适用于C++14及其以上
        return pw->isValidated() && pw->isArchived();
    };
    
    auto func = std::bind([](const std::unique_ptr<Widget>& data){}, std::make_unique<Widget>()); // C++11的版本，和上面的含义一样

**33. 对于std::forward的auto&&形参使用decltype**

在C++14中，我们可以在lambda表达式里面使用auto了，那么我们想要把传统的完美转发用lambda表达式写出来应该是什么样子的呢：
    
    class SomeClass{
    public:
        template<typename T>
        auto operator()(T x) const{
            return func(normalize(x));
        }
    }
    
    auto f=[](auto&& x){
        return func(normalize(std::forward<decltype(x)>(x)));
    };

**34. 优先考虑lambda表达式而非std::bind**

+ lambda表达式具有更好的可读性，表达力也更强，有可能效率也更高
+ 只有在C++11中，bind还有其发挥作用的余地 

#### 七、并发API

**35. 优先考虑基于任务的编程而非基于线程的编程**

基于线程的代码：
    
    int doAsyncWork();
    std::thread t(doAsyncWork);

基于任务的代码：
    
    auto fut = std::async(doAsyncWork);

我们应该优先考虑基于任务的方法（后面这个），首先async是能够获得doAsyncWork的返回值的，并且如果里面有异常的话，也可以捕捉得到。而且更重要的是，使用后面这种方法可以将线程管理的责任交给std标准库来，不需要自己解决死锁，负载均衡，新平台适配等问题

另外，软件线程（操作系统线程或者系统线程）是操作系统的跨进程管理线程，能够创建的数量比硬件线程要多，但是是一种有限资源，当软件线程没有可用的时候，就会直接抛出异常，即使被调用函数式noexcept的。

下面是几种直接使用线程的情况（当然这些情况并不常见）：
+ 需要访问底层线程实现的API（pthread或者Windows线程库）
+ 需要并且开发者有能力进行线程优化
+ 需要实现C++并发API中没有的技术

**36. 如果有异步的必要请指定std::launch::threads**

+ std::launch::async：指定的时候意味着函数f必须以异步方式进行，即在另一个线程上执行
+ std::launch::deferred 则指f只有在get或者wait函数调用的时候同步执行，如果get或者wait没有调用，则f不执行
+ 如果不指定策略的话（默认方法），则系统会按照自己的估计来推测需要进行什么样的策略（会带来不确定性），感觉还是很危险的！！！所以尽量在使用的时候指定是否是异步或者是同步
  
    auto fut = std::async(f);
    if(fut.wait_for(0s) == std::future_statuc::deferred){....}    //判断是否是同步（是否推迟了）
    else{
        while{fut.wait_for(100ms) != std::future_status::ready}{}//不可能死循环，因为之前有过判断是否是同步
    }

**37. 从各个方面使得std::threads unjoinable**

每一个std::thread类型的对象都处于两种状态：joinable和unjoinable

+ joinable：对应底层已运行、可运行或者运行结束的出于阻塞或者等待调度的线程
+ unjoinable： 默认构造的std::thread, 已move的std::thread, 已join的std::thread, 已经分离的std::thread
+ 如果某一个std::thread是joinable的，然后他被销毁了，会造成很严重的后果，（比如会造成隐式join（会造成难以调试的性能异常）和隐式detach（会造成难以调试的未定义行为）），所以我们要保证thread在所有路径上都是unjoinable的：
  
    class ThreadRAII{
    public:
        enum class DtorAction{join, detach};
        ThreadRAII(std::thread&& t, DtorAction a):action(a), t(std::move(t)){} //把线程交给ThreadRAII处理
        ~THreadRAII(){
            if(t.joinable()){
                if(action == DtorAction::join){
                    t.join();
                }
                else{
                    t.detach();                  //保证所有路径出去都是不可连接的
                }
            }
        }
    private:
        DtorAction action;
        std::thread t;    //成员变量最后声明thread
    }

**38. 知道不同线程句柄析构行为**

     _____           ___返回值___  std::promise _______
    |调用方|<--------|被调用方结果|<------------|被调用方|

因为被调用函数的返回值有可能在调用方执行get前就执行完毕了，所以被调用线程的返回值会保存在一个地方，所以会存在一个"共享状态"

所以在异步状态下启动的线程的共享状态的最后一个返回值是会保持阻塞的，知道该任务结束，返回值的析构函数在常规情况下，只会析构返回值的成员变量

**39. 考虑对于单次事件通信使用void**

对于我们在线程中经常使用的flag标志位：
    
    while(!flag){}

可以用线程锁来代替,这个时候等待，不会占用本该进行计算的某一个线程资源：
    
    bool flag(false);
    std::lock_guard<std::mutex> g(m);
    flag = true;

不过使用标志位的话也不太好，如果使用std::promise类型的对象的话就可以解决上面的问题，但是这个途径为了共享状态需要使用堆内存，而且只限于一次性通信
    
    std::promise<void> p;
    void react();    //反应任务
    void detect(){  //检测任务
        std::thread t([]{
            p.get_future().wait();
            react();           //在调用react之前t是暂停状态
        });
        p.set_value();  //取消暂停t
        t.join();       //把t置为unjoinable状态
    }   

**40. 对于并发使用std::atomic，对特殊内存区使用volatile**

atomic原子操作（其他线程只能看到ai的值是0 或者10）:
    
    std::atomic<int> ai(0);
    ai = 10;                 //将ai原子的设置为10

volatile 类型值（其他线程可以看到vi取任何值）：
    
    volatile int vi(0);      //将vi初始化为0
    vi = 10;                 //将vi的值设置为10，如果两个线程同时执行vi++的话，就可能会出现11和12两种情况

volatile的作用：告诉编译器正在处理的变量使用的是特殊内存，不要在这个变量上做任何优化
    
    volatile int x;
    auto y = x; //读取x，（这个时候auto会把const和volatile的修饰词丢弃掉，所以y的类型是int
    y = x;      //再次读取x，这个时候不会被优化掉

#### 八、微调

**41. 对于那些可移动总是被拷贝的形参使用传值方式**

一般来说，我们写函数的时候是不用按值传递的，但是如果形参本身就是要拷贝或者移动的话，是可以按值来传递的，三种操作的成本如下：

+ 重载操作：对于左值是一次复制，对于右值是一次移动
+ 使用万能引用：左值是一次复制，右值是一次移动
+ 按值传递：左值是一次复制加一次移动，右值是两次移动

所以按值传递的应用场景：移动操作成本低廉，形参是可以复制的，因为这两种情况同时满足的时候，按值传递效率并不会低太多

**42. 考虑就地创建而非插入**

+ 插入方法： push_back()等
+ 就地创建方法：emplace_back()等

考虑以下代码：
    
    std::vector<std::string> vs;
    vs.push_back("xyz");

上面这一段代码一共有三个步骤：
+ 从xyz变量出发，创建从const char到string的临时变量temp，temp是个右值
+ temp被传递给push_back的右值重载版本，在内存中为vector构造一个x的副本，创建一个新的对象
+ 在push_back完成的时候，temp被析构

如果用emplace_back的话，就不会产生任何临时对象，因为emplace_back使用了完美转发方法，这样就会大大提升代码的效率

在以下情况下，创建插入会比插入更高效（其实如果不是出现拒绝添加新值的情况的话，置入永远比插入要好一些）：
+ 要添加的值是以构造而不是复制的方式加入到容器中的
+ 传递的实参类型和容器内本身的类型不同
+ 容器不太可能由于出现重复情况而拒绝添加的新值（例如map）