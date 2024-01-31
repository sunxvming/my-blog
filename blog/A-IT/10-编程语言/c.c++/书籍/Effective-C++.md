
一、让自己习惯C++ (Accustoming Yourself to C++ 11)
1. 视C++ 为一个语言联邦 （View C++ as a federation of languages )
2. 尽量以const, enum, inline替换`#defines`（Prefer consts,enums, and inlines to `#defines`.)
3. 尽可能使用const（Use const whenever possible.)
4. 确定对象被使用前已先被初始化（Make sure that objects are initialized before they're used.)

二、构造/析构/赋值运算 (Constructors, Destructors, and Assignment Operators)
5. 了解C++ 那些自动生成和调用的函数（Know what functions C++ silently writes and calls.)
6. 若不想使用编译器自动生成的函数，就该明确拒绝（Explicitly disallow the use of compiler-generated functions you do not want.)
7. 为多态基类声明virtual析构函数（Declare destructors virtual in polymorphic base classes.)
8. 别让异常逃离析构函数（Prevent exceptions from leaving destructors.)
9. 绝不在构造和析构过程中调用virtual函数（Never call virtual functions during construction or destruction.)
10. 令operator= 返回一个reference to `*this` （Have assignment operators return a reference to `*this`.）
11. 在operator= 中处理“自我赋值” （Handle assignment to self in operator=)
12. 复制对象时勿忘其每一个成分 （Copy all parts of an object)

三、资源管理 (Resource Management)
13. 以对象管理资源 （Use objects to manage resources)
14. 在资源管理类中小心coping行为 （Think carefully about copying behavior in resource-managing classes)
15. 在资源管理类中提供对原始资源的访问（Provide access to raw resources in resource-managing classes)
16. 成对使用new和delete时要采取相同形式 （Use the same form in corresponding uses of new and delete)
17. 以独立语句将newed对象置入智能指针 （Store newed objects in smart pointers in standalone statements)

四、设计与声明 (Designs and Declarations)
18. 让接口容易被正确使用，不易被误用  （Make interfaces easy to use correctly and hard to use incorrectly)
19. 设计class犹如设计type  （Treat class design as type design)
20. 以pass-by-reference-to-const替换pass-by-value  （Prefer pass-by-reference-to-const to pass-by-value)
21. 必须返回对象时，别妄想返回其reference  （Don't try to return a reference when you must return an object)
22. 将成员变量声明为private  （Declare data members private)
23. 以non-member、non-friend替换member函数  （Prefer non-member non-friend functions to member functions)
24. 若所有参数皆需类型转换，请为此采用non-member函数  （Declare non-member functions when type conversions should apply to all parameters)
25. 考虑写出一个不抛异常的swap函数  （Consider support for a non-throwing swap)

五、实现 (Implementations)
26. 尽可能延后变量定义式的出现时间  （Postpone variable definitions as long as possible)
27. 尽量不要进行强制类型转换  （Minimize casting)
28. 避免返回handles指向对象内部成分  （Avoid returning "handles" to object internals)
29. 为“异常安全”而努力是值得的  （Strive for exception-safe code)
30. 透彻了解inlining  （Understand the ins and outs of inlining)
31. 将文件间的编译依存关系降至最低  （Minimize compilation dependencies between files)

六、继承与面向对象设计 (Inheritance and Object-Oriented Design)
32. 确定你的public继承塑模出is-a关系  （Make sure public inheritance models "is-a.")
33. 避免遮掩继承而来的名称  （Avoid hiding inherited names)
34. 区分接口继承和实现继承  （Differentiate between inheritance of interface and inheritance of implementation)
35. 考虑virtual函数以外的其他选择  （Consider alternatives to virtual functions)
36. 绝不重新定义继承而来的non-virtual函数  （Never redefine an inherited non-virtual function)
37. 绝不重新定义继承而来的缺省参数值  （Never redefine a function's inherited default parameter value)
38. 通过复合塑模出has-a或"根据某物实现出"  （Model "has-a" or "is-implemented-in-terms-of" through composition)
39. 明智而审慎地使用private继承  （Use private inheritance judiciously)
40. 明智而审慎地使用多重继承  （Use multiple inheritance judiciously)

七、模板与泛型编程 (Templates and Generic Programming)
41. 了解隐式接口和编译期多态 （Understand implicit interfaces and compile-time polymorphism)
42. 了解typename的双重意义 （Understand the two meanings of typename)
43. 学习处理模板化基类内的名称 （Know how to access names in templatized base classes)
44. 将与参数无关的代码抽离templates （Factor parameter-independent code out of templates)
45. 运用成员函数模板接受所有兼容类型 （Use member function templates to accept "all compatible types.")
46. 需要类型转换时请为模板定义非成员函数 （Define non-member functions inside templates when type conversions are desired)
47. 请使用traits classes表现类型信息 （Use traits classes for information about types)
48. 认识template元编程 （Be aware of template metaprogramming)

八、定制new和delete (Customizing new and delete)
49. 了解new-handler的行为 （Understand the behavior of the new-handler)
50. 了解new和delete的合理替换时机 （Understand when it makes sense to replace new and delete)
51. 编写new和delete时需固守常规（Adhere to convention when writing new and delete)
52. 写了placement new也要写placement delete（Write placement delete if you write placement new)

九、杂项讨论 (Miscellany)
53. 不要轻忽编译器的警告（Pay attention to compiler warnings)
54. 让自己熟悉包括TR1在内的标准程序库 （Familiarize yourself with the standard library, including TR1)
55. 让自己熟悉Boost （Familiarize yourself with Boost)



#### 一、让自己习惯C++ (Accustoming Yourself to C++ 11)

**1. 视C++ 为一个语言联邦 （View C++ as a federation of languages )**
```
主要是因为C++是从四个语言发展出来的：
- C的代码块({}), 语句，数据类型等，
- object-C的class，封装继承多态，virtual动态绑定等，
- template C++的泛型
- STL：容器，迭代器，算法，函数对象等

因此当这四个子语言相互切换的时候，可以更多地考虑高效编程，例如pass-by-value和pass-by-reference在不同语言中效率不同
```
总结：
+ C++高效编程守则视状况而变化，取决于使用哪个子语言


**2. 尽量以const, enum, inline替换`#define`（Prefer consts,enums, and inlines to `#defines`)**
实际是：应该让编译器代替预处理器定义，因为预处理器定义的变量并没有进入到symbol table里面。编译器有时候会看不到预处理器定义

所以用 
```
const double Ratio = 1.653;
```
来代替 
```
#define Ratio 1.653
```
实际上在这个转换中还要考虑到指针，例如需要把指针写成`const char* const authorName = "name";`而不是只用一个const

以及在class类里面的常量，为了防止被多次拷贝，需要定义成类的成员（添加static）例如
```cpp
class GamePlayer{
	static const int numT = 5;
}
```
对于类似函数的宏，最好改用inline函数代替，例如：
```cpp
#define CALL_WITH_MAX(a, b) f((a) > (b) ? (a) : (b))
template<typename T>
inline void callWithMax(const T& a, const T& b){
	f(a > b ? a : b);
}
```
总结：
+ 对于单纯的常量，最好用const和enums替换`#define`， 对于形似函数的宏，最好改用inline函数替换`#define`

**3. 尽可能使用const（Use const whenever possible.)**
const最强的用法是在函数声明时，如果将返回值设置成const，或者返回指针设置成const，可以避免很多用户错误造成的意外。

考虑这样一段代码
```cpp
class CTextBlock{
	public:
		char& operator[](std::size_t position) const{
			return pText[position];
		}
	private:
		char *pText;
}
const CTextBlock cctb("Hello");
char *pc = &cctb[0];
*pc = 'J'
```
这种情况下不会报错，但是一方面声明的时候说了是const，一方面还修改了值。这种逻辑虽然有问题但是编译器并不会报错
但是const使用过程中会出现想要修改某个变量的情况，而另外一部分代码确实不需要修改。这个时候最先想到的方法就是重载一个非const版本。
但是还有其他的方法，例如将非const版本的代码调用const的代码

总结：
+ 将某些东西声明为const可以帮助编译器检查出错误。
+ 编译器强制实施bitwise const，但是编写程序的时候应该使用概念上的常量性。
+ 当const和非const版本有着实质等价的实现时，让**非const版本调用const版本**可以避免代码重复


**4. 确定对象被使用前已先被初始化（Make sure that objects are initialized before they're used)**
如果我们有两个文件A和B，需要分别编译，A构造函数中用到了B中的对象，那么初始化A和B的顺序就很重要了，这些变量称为（**non-local static对象**）。因为静态全局对象的初始化的顺序可能是不确定的。

解决方法是：将每个non-local static对象搬到自己专属的函数内，并且该对象被声明为static，然后这些函数返回一个reference指向他所含的对象，用户调用这些函数，而不直接涉及这些对象（Singleton模式手法）：
```cpp
// 原代码：
"A.h"
class FileSystem{
	public:
		std::size_t numDisks() const;
};
extern FileSystem tfs;
"B.h"
class Directory{
	public:
		Directory(params){
			std::size_t disks = tfs.numDisks(); //使用tfs
		}
}
Director tempDir(params);

// 修改后：
"A.h"
class FileSystem{...}    //同前
FileSystem& tfs(){       //这个函数用来替换tfs对象，他在FileSystem class 中可能是一个static，            
	static FileSystem fs;//定义并初始化一个local static对象，返回一个reference
	return fs;
}
"B.h"
class Directory{...}     // 同前
Directory::Directory(params){
	std::size_t disks = tfs().numDisks();
}
Directotry& tempDir(){   //这个函数用来替换tempDir对象，他在Directory class中可能是一个static，
	static Directory td; //定义并初始化local static对象，返回一个reference指向上述对象
	return td;
}
```
这样做的原理在于C++对于函数内的local static对象会在“该函数被调用期间，且首次遇到的时候”被初始化。当然我们需要避免“A受制于B，B也受制于A”

总结：
+ 为内置型对象进行手工初始化，因为C++不保证初始化他们
+ 构造函数最好使用初始化列初始化而不是复制，并且他们初始化时有顺序的
+ 为了免除跨文件编译的初始化次序问题，应该以local static对象替换non-local static对象

#### 二、构造/析构/赋值运算 (Constructors, Destructors, and Assignment Operators)

**5. 了解C++ 那些自动生成和调用的函数（Know what functions C++ silently writes and calls)**
总结：
+ 编译器可以自动为class生成default构造函数，拷贝构造函数，拷贝赋值操作符，以及析构函数

**6. 若不想使用编译器自动生成的函数，就该明确拒绝（Explicitly disallow the use of compiler-generated functions you do not want)**
这一条主要是针对类设计者而言的，有一些类可能从需求上不允许两个相同的类，例如某一个类表示某一个独一无二的交易记录，那么编译器自动生成的拷贝和复制函数就是无用的，而且是不想要的

总结：
+ 可以将不需要的默认自动生成函数设置成**delete**的

**7. 为多态基类声明virtual析构函数（Declare destructors virtual in polymorphic base classes)**
其主要原因是如果基类没有virtual析构函数，那么派生类在析构的时候，如果是delete 了一个base基类的指针，那么派生的对象就会没有被销毁，引起内存泄漏。
例如：
```cpp
class TimeKeeper{
	public:
	TimeKeeper();
	~TimeKeeper();
	virtual getTimeKeeper();
}
class AtomicClock:public TimeKeeper{...}
TimeKeeper *ptk = getTimeKeeper();
delete ptk;
```    
除析构函数以外还有很多其他的函数，如果有一个函数拥有virtual 关键字，那么他的析构函数也就必须要是virtual的，但是如果class不含virtual函数,析构函数就不要加virtual了，因为一旦实现了virtual函数，那么对象必须携带一个叫做vptr(virtual table pointer)的指针，这个指针指向一个由函数指针构成的数组，成为vtbl（virtual table），这样对象的体积就会变大，例如：
```cpp
class Point{
	public://析构和构造函数
	private:
	int x, y
}
```
本来上面那个代码只占用64bits(假设一个int是32bits)，存放一个vptr就变成了96bits，因此在64位计算机中无法塞到一个64-bits缓存器中，也就无法移植到其他语言写的代码里面了。

总结：
+ 如果一个函数是多态性质的基类，应该有virtual 析构函数
+ 如果一个class带有任何virtual函数，他就应该有一个virtual的析构函数
+ 如果一个class不是多态基类，也没有virtual函数，就不应该有virtual析构函数

**8. 别让异常逃离析构函数（Prevent exceptions from leaving destructors)**
如果在析构函数中发生异常并且允许它传播出去，这可能会导致未定义的行为和资源泄漏,这是因为析构函数未能正常的执行完。尤其是有多个继承层次或者类中包含其他对象。

解决方法为：
原代码：
```cpp
class DBConn{
public:
	~DBConn(){
		db.close();
	}
private:
	DBConnection db;
}
```
修改后的代码：
```cpp
class DBConn{
public:
	void close(){
		db.close();
		closed = true;
	}

	~DBConn(){
		if(!closed){
			try{
				db.close();
			}
			catch(...){
				std::abort();
			}
		}
	}
private:
	bool closed;
	DBConnection db;
}
```
这种做法就可以一方面将close的的方法交给用户，另一方面在用户忽略的时候还能够做“强迫结束程序”或者“吞下异常”的操作。相比较而言，交给用户是最好的选择，因为用户有机会根据实际情况操作异常。

总结：
+ 析构函数不要抛出异常，因该在内部捕捉异常
+ 如果客户需要对某个操作抛出的异常做出反应，应该将这个操作放到普通函数（而不是析构函数）里面

**9. 绝不在构造和析构过程中调用virtual函数（Never call virtual functions during construction or destruction)**
- 在构造函数中避免调用虚拟函数。如果需要执行某些虚拟函数相关的操作，可以考虑将这些操作延迟到构造函数之后的初始化阶段。
- 在析构函数中也应该避免调用虚拟函数。析构函数的主要目标是资源的清理，而不是执行多态操作。如果需要执行多态操作，可以在析构函数外部进行。
- 参见：c++对象模型-构造和析构过程不具有多态性


**10. 令operator= 返回一个reference to `*this` （Have assignment operators return a reference to `*this`)**

主要是为了支持连读和连写，例如：
```cpp
class Widget{
public:
	Widget& operator=(int rhs){return *this;}
}
a = b = c;
```

**11. 在operator= 中处理“自我赋值” （Handle assignment to self in operator=)**

主要是要处理`SomeClass x; x = x;` , `a[i] = a[j]` 或者 `*px = *py`这样的自我赋值。有可能会出现一场安全性问题，或者在使用之前就销毁了原来的对象.
这是一个示例的C++赋值运算符的实现，处理了自我赋值情况：
```cpp
class SomeClass {
public:
    // 赋值运算符
    SomeClass& operator=(const SomeClass& other) {
        // 自我赋值检测
        if (this == &other) {
            return *this; // 如果是自我赋值，直接返回
        }

        // 清理目标对象的资源，如果有的话
        // ...

        // 执行赋值操作
        // ...

        return *this; // 支持链式赋值
    }

    // 其他成员函数和数据成员
};
```

原代码：
```cpp
class Bitmap{...}
class Widget{
private:
	Bitmap *pb;
};
Widget& Widget::operator=(const Widget& rhs){
	delete pb; // 当this和rhs是同一个对象的时候，就相当于直接把rhs的bitmap也销毁掉了
	pb = new Bitmap(*rhs.pb);
	return *this;
}

// 修改后的代码
class Widget{
	void swap(Widget& rhs);    //交换this和rhs的数据
};
Widget& Widget::operator=(const Widget& rhs){
	Widget temp(rhs)           //为rhs数据制作一个副本
	swap(temp);                //将this数据和上述副本数据交换
	return *this;
}//出了作用域，原来的副本销毁

// 或者有一个效率不太高的版本：
Widget& Widget::operator=(const Widget& rhs){
	Bitmap *pOrig = pb;       //记住原先的pb
	pb = new Bitmap(*rhs.pb); //令pb指向 *pb的一个副本
	delete pOrig;            //删除原先的pb
	return *this;
}
```
总结：
+ 确保当对象自我赋值的时候operator=有比较良好的行为，包括两个对象的地址，语句顺序，以及copy-and-swap
+ 确定任何函数如果操作一个以上的对象，而其中多个对象可能指向同一个对象时，仍然正确

**12. 复制对象时勿忘其每一个成分 （Copy all parts of an object)**
总结：
+ 当编写一个copy或者拷贝构造函数，应该确保复制成员里面的所有变量，以及所有基类的成员
+ 不要尝试用一个拷贝构造函数调用另一个拷贝构造函数，如果想要精简代码的话，应该把所有的功能机能放到第三个函数里面，并且由两个拷贝构造函数共同调用
+ 当**新增**一个变量或者继承一个类的时候，很容易出现忘记拷贝构造的情况，所以每增加一个变量都需要在拷贝构造里面修改对应的方法

#### 三、资源管理 (Resource Management)

**13. 以对象管理资源 （Use objects to manage resources)**
在对象销毁时自动调用自动调用析构函数。
总结：
+ 建议使用shared_ptr
+ 如果需要自定义shared_ptr，请通过定义自己的资源管理类来对资源进行管理

**14. 在资源管理类中小心copying行为 （Think carefully about copying behavior in resource-managing classes)**
在资源管理类里面，如果出现了拷贝复制行为的话，需要注意这个复制具体的含义，从而保证和我们想要的效果一样

以下是一些与资源管理类中复制行为相关的考虑事项：
1. **禁止浅复制（Shallow Copy）：** 默认情况下，C++执行浅复制，这意味着它只会复制资源的引用而不是资源本身。如果资源管理类使用浅复制，多个对象可能共享相同的资源，这会导致潜在的资源释放问题。
2. **实施深复制（Deep Copy）或引用计数：** 在资源管理类中，通常需要实施深复制，这意味着在复制对象时，会创建一个独立的资源拷贝。另一种方法是使用引用计数，以确保多个对象可以共享相同的资源，但在不再需要时可以安全地释放。
3. **定义复制构造函数和赋值运算符：** 如果您允许对象复制，确保正确定义复制构造函数和赋值运算符。这些函数应该进行适当的资源管理，以避免资源泄漏。
4. **提供移动语义（Move Semantics）：** 如果您的C++版本支持移动语义（C++11及更高版本），则可以通过定义移动构造函数和移动赋值运算符来改进性能，而不是执行深复制。


**15. 在资源管理类中提供对原始资源的访问（Provide access to raw resources in resource-managing classes)**
这意味着当你编写一个管理底层资源（如内存、文件句柄、数据库连接等）的类时，应该考虑允许客户端代码直接访问这些底层资源，同时也提供了一些安全的方式来访问它们。
例如：
在这个示例中，`FileManager` 类允许客户端代码访问原始文件句柄（`std::ifstream`），同时还提供了更高级别的操作，比如 `readAndPrintFileContents` 函数用于读取和打印文件内容。这种设计允许客户端代码根据需要直接操作原始资源，同时确保资源在 `FileManager` 对象析构时被正确关闭。
```cpp
#include <iostream>
#include <fstream>

class FileManager {
public:
    FileManager(const std::string& filename) {
        file_.open(filename); // 打开文件
        if (!file_.is_open()) {
            throw std::runtime_error("Failed to open file.");
        }
    }

    // 允许客户端代码访问原始文件句柄
    std::ifstream& getRawFileHandle() {
        return file_;
    }

    void readAndPrintFileContents() {
        std::string line;
        while (std::getline(file_, line)) {
            std::cout << line << std::endl;
        }
    }

    ~FileManager() {
        if (file_.is_open()) {
            file_.close(); // 在资源管理类析构函数中关闭文件
        }
    }

private:
    std::ifstream file_;
};

int main() {
    try {
        FileManager manager("example.txt");

        // 客户端代码可以直接访问原始文件句柄
        std::ifstream& fileHandle = manager.getRawFileHandle();
        
        // 执行更高级别的文件操作
        std::string data;
        while (fileHandle >> data) {
            // 处理文件数据
        }
        // 读取并打印文件内容
        manager.readAndPrintFileContents();
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
}
```


**16. 成对使用new和delete时要采取相同形式 （Use the same form in corresponding uses of new and delete)**
总结：
+ 即： 使用new[]的时候要使用delete[], 使用new的时候一定不要使用delete[]

**17. 以独立语句将new的对象置入智能指针 （Store newed objects in smart pointers in standalone statements)**

主要是会造成内存泄漏，考虑下面的代码：
```cpp
int priority();
void processWidget(shared_ptr<Widget> pw, int priority);

processWidget(new Widget, priority());       // 错误，这里函数是explicit的，不允许隐式转换（shared_ptr需要给他一个普通的原始指针
processWidget(shared_ptr<Widget>(new Widget), priority()) // 可能会造成内存泄漏
```
内存泄漏的原因为：先执行new Widget，再调用priority， 最后执行shared_ptr构造函数，那么当priority的调用**发生异常**的时候，new Widget返回的指针就会丢失了。当然不同编译器对上面这个代码的执行顺序不一样。所以安全的做法是：
```cpp
shared_ptr<Widget> pw(new Widget)
processWidget(pw, priority())
```
总结：
+ 凡是有new语句的，尽量放在单独的语句当中，特别是当使用**new出来的对象放到智能指针里面的时候**

#### 四、设计与声明 (Designs and Declarations)

**18. 让接口容易被正确使用，不易被误用  （Make interfaces easy to use correctly and hard to use incorrectly)**

要思考用户有可能做出什么样子的错误，考虑下面的代码：
```cpp
Date(int month, int day, int year);
```
这一段代码可以有很多问题，例如用户将day和month顺序写反（因为三个参数都是int类型的），可以修改成：
```cpp
Date(const Month &m, const Day &d, const Year &y);  //注意这里将每一个类型的数据单独设计成一个类，同时加上const限定符
为了让接口更加易用，可以对month加以限制，只有12个月份
class Month{
	public:
	static Month Jan(){return Month(1);}//这里用函数代替对象，主要是方式第四条：non-local static对象的初始化顺序问题
}
```

而对于一些返回指针的问题函数，例如：
```
Investment *createInvestment();//智能指针可以防止用户忘记delete返回的指针或者delete两次指针，但是可能存在用户忘记使用智能指针的情况，那么方法：
std::shared_ptr<Investment> createInvestment();就可以强制用户使用智能指针
```
总结：
+ “阻止误用”的办法包括建立新类型、限制类型上的操作，束缚对象值，以及消除客户的资源管理责任
+ shared_ptr支持定制删除器，从而防范dll问题，可以用来解除互斥锁等

**19. 设计class犹如设计type  （Treat class design as type design)**
如何设计class：
+ 新的class对象应该被如何创建和构造
+ 对象的初始化和赋值应该有什么样的差别（不同的函数调用，构造函数和赋值操作符）
+ 新的class如果被pass by value（以值传递），意味着什么（copy构造函数）
+ 什么是新type的“合法值”（成员变量通常只有某些数值是有效的，这些值决定了class必须维护的约束条件）
+ 新的class需要配合某个继承图系么（会受到继承类的约束）
+ 新的class需要什么样的转换（和其他类型的类型变换）
+ 什么样的操作符和函数对于此type而言是合理的（决定声明哪些函数，哪些是成员函数）
+ 什么样的函数必须为private的 
+ 新的class是否还有相似的其他class，如果是的话就应该定义一个class template
+ 你真的需要一个新type么？如果只是定义新的derived class或者为原来的class添加功能，说不定定义non-member函数或者templates更好

**20. 以pass-by-reference-to-const替换pass-by-value  （Prefer pass-by-reference-to-const to pass-by-value)**

主要是1.可以提高效率，2.避免基类和子类的参数切割问题
```cpp
bool validateStudent(const Student &s);   //省了很多构造析构拷贝赋值操作
bool validateStudent(s);

subStudent s;
validateStudent(s); //调用后,则在validateStudent函数内部实际上是一个student类型
```

切割的例子,其实就是实现多态：
```cpp
#include <iostream>
#include <string>

class Person {
public:
    Person(const std::string& name) : name_(name) {}
    virtual void introduce() const {
        std::cout << "I am a person named " << name_ << std::endl;
    }

private:
    std::string name_;
};

class Student : public Person {
public:
    Student(const std::string& name, const std::string& major)
        : Person(name), major_(major) {}

    void introduce() const override {
        std::cout << "I am a student named " << getName() << " and my major is " << major_ << std::endl;
    }

    std::string getMajor() const {
        return major_;
    }

private:
    std::string major_;
};

// 通过引用传递 const 引用参数，可以处理 Student 的派生类
void printIntroduction(const Person& person) {
    person.introduce();
}

int main() {
    Person person("Alice");
    Student student("Bob", "Computer Science");

    printIntroduction(person);  // 输出：I am a person named Alice
    printIntroduction(student); // 输出：I am a student named Bob and my major is Computer Science

    return 0;
}
```


对于STL等内置类型，还是以值传递好一些


**21. 必须返回对象时，别妄想返回其reference  （Don't try to return a reference when you must return an object)**
- 很容易返回一个已经销毁的局部变量
- 如果想要在堆上用new创建的话，则用户无法delete

**22. 将成员变量声明为private  （Declare data members private)**
应该将成员变量弄成private，然后用过public的成员函数来访问他们，这种方法的好处在于可以更精准的控制成员变量，包括控制读写，只读访问等。
同时，如果public的变量发生了改变，如果这个变量在代码中广泛使用，那么将会有很多代码遭到了破坏，需要重新写
另外protected 并不比public更具有封装性，因为protected的变量，在发生改变的时候，他的子类代码也会受到破坏

**23. 以non-member、non-friend替换member函数  （Prefer non-member non-friend functions to member functions)**
例如：通常的做法是将输出操作定义为非成员函数，使其独立于类，从而提高了封装性、灵活性和可维护性。
```cpp
class Date {
public:
    Date(int day, int month, int year) : day_(day), month_(month), year_(year) {}

    // 错误的方式：将输出操作作为成员函数
    // 这违反了封装性，因为它需要访问类的私有成员
    void print() const {
        std::cout << day_ << "/" << month_ << "/" << year_ << std::endl;
    }

private:
    int day_;
    int month_;
    int year_;
};

// 正确的方式：将输出操作定义为非成员函数
// 这提高了封装性和灵活性
void printDate(const Date& date) {
    std::cout << date.getDay() << "/" << date.getMonth() << "/" << date.getYear() << std::endl;
}

int main() {
    Date date(4, 9, 2023);

    // 调用非成员函数以打印日期, 或者换成静态方法也行
    printDate(date);

    return 0;
}
```

**24. 若所有参数皆需类型转换，请为此采用non-member函数  （Declare non-member functions when type conversions should apply to all parameters)**

例如想要将一个int类型变量和Rational变量做乘法，如果是成员函数的话，发生隐式转换的时候会因为不存在int到Rational的类型变换而出错：
以全局函数的话有对称性。
```cpp
class Rational{
	public:
	const Rational operator* (const Rational& rhs)const;
}
Rational oneHalf;
result = oneHalf * 2;
result = 2 * oneHalf;//出错，因为没有int转Rational函数

non-member函数
class Rational{}
const Rational operator*(const Rational& lhs, const Rational& rhs){}
```


**25. 考虑写出一个不抛异常的swap函数  （Consider support for a non-throwing swap)**

在 C++11 及更高版本中，std::swap 的实现使用了移动语义，如果类型支持移动构造函数和移动赋值运算符，它将使用这些操作来实现高效的值交换。这意味着如果一个对象具有移动构造函数和移动赋值运算符，那么在进行 std::swap 时，不需要复制对象的内容，而是通过移动数据来完成交换，从而提高性能。
如果一个对象没有移动构造函数，而且在C++11或更高版本中使用`std::swap`，则`std::swap`将回退到使用拷贝构造函数来进行值的交换,会创建一个临时对象并复制内容。这意味着在这种情况下，将会执行对象的拷贝操作来进行交换，而不是移动。

通过自定义swap大幅度提升swap效率的例子。
```cpp
#include <iostream>
#include <utility> // 使用 std::swap
#include <cstring> // 使用 std::strlen

class MyString {
public:
    // 构造函数
    MyString(const char* str = nullptr) {
        if (str) {
            size_ = std::strlen(str);
            data_ = new char[size_ + 1];
            std::strcpy(data_, str);
        } else {
            size_ = 0;
            data_ = nullptr;
        }
    }

    // 析构函数
    ~MyString() {
        delete[] data_;
    }

    // 拷贝构造函数
    MyString(const MyString& other) : size_(other.size_) {
        data_ = new char[size_ + 1];
        std::strcpy(data_, other.data_);
    }

    // 移动构造函数
    MyString(MyString&& other) noexcept : data_(nullptr), size_(0) {
        swap(*this, other); // 调用自定义的 swap 函数
    }

    // 拷贝赋值运算符
    MyString& operator=(const MyString& other) {
        MyString temp(other); // 利用拷贝构造函数创建临时对象
        swap(*this, temp);    // 调用自定义的 swap 函数
        return *this;
    }

    // 移动赋值运算符
    MyString& operator=(MyString&& other) noexcept {
        swap(*this, other); // 调用自定义的 swap 函数
        return *this;
    }

    // 获取字符串长度
    size_t size() const {
        return size_;
    }

    // 获取字符串内容
    const char* c_str() const {
        return data_;
    }

    friend void swap(MyString& first, MyString& second) noexcept {    //友元函数
        using std::swap;
        swap(first.data_, second.data_);
        swap(first.size_, second.size_);
    }

private:
    char* data_;
    size_t size_;
};

int main() {
    MyString str1("Hello");
    MyString str2("World");

    std::cout << "Before swap:" << std::endl;
    std::cout << "str1: " << str1.c_str() << ", size = " << str1.size() << std::endl;
    std::cout << "str2: " << str2.c_str() << ", size = " << str2.size() << std::endl;

    // 使用自定义 swap 函数
    std::swap(str1, str2);

    std::cout << "After swap:" << std::endl;
    std::cout << "str1: " << str1.c_str() << ", size = " << str1.size() << std::endl;
    std.
```
#### 五、实现 (Implementations)

**26. 尽可能延后变量定义式的出现时间  （Postpone variable definitions as long as possible)**
主要是防止变量在定义以后没有使用，影响效率，应该在用到的时候再定义，同时通过default构造而不是赋值来初始化

**27. 尽量不要进行强制类型转换  （Minimize casting)**
主要是因为：
1.从int转向double容易出现精度错误
2.将一个类转换成他的父类也容易出现问题

总结：
+ 尽量避免转型，特别是在注重效率的代码中避免dynamic_cast，试着用无需转型的替代设计
+ 如果转型是必要的，试着将他封装到函数背后，让用户调用该函数，而不需要在自己的代码里面转型
+ 如果需要转型，使用新式的static_cast等转型，比原来的（int）好很多（更明显，分工更精确）

**28. 避免返回handles指向对象内部成分  （Avoid returning "handles" to object internals)**
尽量不要返回指向private变量的指针引用等
```cpp
class Employee {
public:
    Employee(const std::string& name, int age) : name_(name), age_(age) {}

    // 返回指向姓名的"handle"
    const std::string& getName() const {
        return name_;
    }

    // 返回指向年龄的"handle"
    int& getAge() {
        return age_;
    }

private:
    std::string name_;
    int age_;
};
```
Employee 类返回了指向姓名和年龄成员的"handles"，即 getName 返回一个指向姓名的常量引用，getAge 返回一个指向年龄的非常量引用。这会破坏封装性，允许外部代码直接访问和修改员工的姓名和年龄，可能导致不安全性和不可维护性。



**29. 为“异常安全”而努力是值得的  （Strive for exception-safe code)**
异常安全函数具有以下三个特征之一：
1. **基本承诺（Basic Guarantee）**：异常安全函数提供了基本的保证，即如果函数出现异常，程序状态仍然保持一致，不会泄漏资源，但对象的内部状态可能会被修改。这意味着函数会恢复到调用前的状态，但可能不会保持对象的不变性。这是最低级别的异常安全保证。
2. **强烈保证（Strong Guarantee）**：异常安全函数提供了强烈的保证，即如果函数出现异常，程序状态仍然保持一致，对象的内部状态不会被修改，就好像函数从未被调用过一样。这要求函数要具备回滚操作，以确保不会对对象状态产生任何影响。
3. **无异常保证（No-Throw Guarantee）**：某些函数承诺不会抛出异常。这意味着无论输入如何，函数都不会导致异常，通常是通过避免使用可能抛出异常的操作来实现的，例如使用不抛异常的内存分配函数。

原函数：
```cpp
class PrettyMenu{
	public:
	void changeBackground(std::istream& imgSrc); //改变背景图像
	private:
	Mutex mutex; // 互斥器
};

void changeBackground(std::istream& imgSrc){
	lock(&mutex);               //取得互斥器
	delete bgImage;             //摆脱旧的背景图像
	++imageChanges;             //修改图像的变更次数
	bgImage = new Image(imgSrc);//安装新的背景图像
	unlock(&mutex);             //释放互斥器
}
```
   
当异常抛出的时候，这个函数就存在很大的问题：
+ 不泄露任何资源：当new Image(imgSrc)发生异常的时候，对unlock的调用就绝不会执行，于是互斥器就永远被把持住了
+ 不允许数据破坏：如果new Image(imgSrc)发生异常，bgImage就是空的，而且imageChanges也已经加上了
  
修改后代码：
```cpp
void PrettyMenu::changeBackground(std::istream& imgSrc){
	Lock ml(&mutex);    //Lock是第13条中提到的用对象管理资源的类
	bgImage.reset(new Image(imgSrc));
	++imageChanges; //放在后面
}
```



**30. 透彻了解inlining  （Understand the ins and outs of inlining)**
inline 函数的过度使用会让程序的体积变大，内存占用过高
而编译器是可以拒绝将函数inline的，不过当编译器不知道该调用哪个函数的时候，会报一个warning
尽量不要为template或者构造函数设置成inline的，因为template inline以后有可能为每一个模板都生成对应的函数，从而让代码过于臃肿
同样的道理，构造函数在实际的过程中也会产生很多的代码

**31. 将文件间的编译依存关系降至最低  （Minimize compilation dependencies between files)**
这个关系其实指的是一个文件包含另外一个文件的类定义等
那么如何实现解耦呢,通常是将实现定义到另外一个类里面，如下：
```cpp
// 原代码：
class Person{
private
	Dates m_data;
	Addresses m_addr;
}

// 添加一个Person的实现类，定义为PersonImpl，修改后的代码：
// 在下面的设计下,就实现了解耦，即“实现和接口分离”
class PersonImpl;
class Person{
	private:
	shared_ptr<PersonImpl> pImpl;
}



// 与此相似的接口类还可以使用全虚函数
class Person{
	public:
	virtual ~Person();
	virtual std::string name() const = 0;
	virtual std::string birthDate() const = 0;
}
``` 
然后通过继承的子类来实现相关的方法

这种情况下这些virtual函数通常被成为factory工厂函数

总结：
+ 应该让文件依赖于声明而不依赖于定义，可以通过上面两种方法实现
+ 程序头文件应该有且仅有声明, 这个就是个很理想的情况下了。

#### 六、继承与面向对象设计 (Inheritance and Object-Oriented Design)

**32. 确定你的public继承塑模出is-a关系  （Make sure public inheritance models "is-a.")**
public类继承指的是单向的更一般化的，例如：
```
class Student : public Person{...};
```
其意义指的是student是一个person，但是person不一定是一个student。

这里经常会出的错误是，将父类可能不存在的功能实现出来，例如：
```
class Bird{
	virtual void fly();
}
class Penguin:public Bird{...};//企鹅是不会飞的
```
这个时候就需要通过设计来排除这种错误，例如通过定义一个FlyBird

总结：
+ public继承中，意味着每一个Base class的东西一定适用于他的derived class

**33. 避免遮掩继承而来的名称  （Avoid hiding inherited names)**
它强调了在派生类中避免使用相同名称来覆盖基类的成员名称，以免造成名称冲突和混淆。
```cpp
#include <iostream>

class Base {
public:
    void doSomething() {
        std::cout << "Base::doSomething()" << std::endl;
    }
};

class Derived : public Base {
public:
    // 遮蔽了基类的同名函数
    void doSomething() {
        std::cout << "Derived::doSomething()" << std::endl;
    }

    // 使用using声明解决遮蔽问题
    using Base::doSomething;

    // 转交函数解决遮蔽问题
    void callBaseDoSomething() {
        Base::doSomething();
    }
};

int main() {
    Derived derived;
    derived.doSomething(); // 调用Derived类的函数
    derived.callBaseDoSomething(); // 调用Base类的函数
    return 0;
}
```

**34. 区分接口继承和实现继承  （Differentiate between inheritance of interface and inheritance of implementation)**
1. **接口继承（Inheritance of Interface）**：当派生类只继承了基类的接口（即公共函数声明），而不继承实际的实现时，这被称为接口继承。这种情况下，派生类的主要目的是遵循基类的接口规范，并可能提供自己的实现。接口继承是一种高度抽象的关系，用于描述类之间的公共行为。
2. **实现继承（Inheritance of Implementation）**：当派生类不仅继承了基类的接口，还继承了基类的实现细节时，这被称为实现继承。这种情况下，派生类不仅继承了接口规范，还继承了基类的内部实现，可能通过重写或扩展来修改基类的行为。实现继承是一种更紧密的关系，通常用于共享代码和复用现有的实现。

在使用继承时，应该明确目的是进行接口继承还是实现继承，并根据需要采取适当的措施：
- 如果只需要继承接口，应该考虑使用纯虚函数和抽象基类来定义接口规范，而不提供默认实现。
- 如果需要继承实现，应该小心确保派生类确实需要修改或扩展基类的行为，而不是仅仅出于代码复用的目的而继承。如果需要修改行为，可以通过虚函数重写来实现。

**35. 考虑virtual函数以外的其他选择  （Consider alternatives to virtual functions)**
这个建议提醒开发者，在某些情况下，虽然C++中的虚拟函数（virtual functions）是实现多态性的一种强大机制，但也存在一些替代方案，可以更灵活地解决问题。

比如：标准库中的可调用对象
```cpp
// 使用 std::function 实现多态性

// 定义一个可调用对象
struct MyCallable {
    void operator()() {
        std::cout << "Calling MyCallable" << std::endl;
    }
};

int main() {
    std::function<void()> func = MyCallable();
    func(); // 调用可调用对象

    return 0;
}
```


**36. 绝不重新定义继承而来的non-virtual函数  （Never redefine an inherited non-virtual function)**


**37. 绝不重新定义继承而来的缺省参数值  （Never redefine a function's inherited default parameter value)**

```cpp
class Shape{
public:
	enum ShapeColor {Red, Green, Blue};
	virtual void draw(ShapeColor color=Red)const = 0;
};
class Rectangle : public Shape{
public:
	virtual void draw(ShapeColor color=Green)const;//和父类的默认参数不同
}
Shape* pr = new Rectangle; // 注意此时pr的静态类型是Shape，但是他的动态类型是Rectangle
pr->draw();                //virtual函数是动态绑定，而缺省参数值是静态绑定，所以会调用Red
```

**38. 通过复合塑模出has-a或"根据某物实现出"  （Model "has-a" or "is-implemented-in-terms-of" through composition)**
复合：一个类里面有另外一个类的成员，那么这两个类的成员关系就叫做复合（或称聚合，内嵌，内含等）。
我们认为复合的关系是“has a”的概念，
这个建议的核心思想是，尽量使用复合而不是继承，以更灵活、可维护和可扩展的方式构建类之间的关系。

在C++中，继承（inheritance）是一种强耦合的机制，它会将基类的实现细节暴露给派生类，限制了代码的灵活性和可维护性。相反，复合是一种轻量级的机制，允许将一个类的对象嵌入到另一个类中，从而实现了"has-a"或"根据某物实现出"的关系。

```cpp
// 使用复合实现 "has-a" 关系
#include <iostream>

// 定义一个 Engine 类
class Engine {
public:
    void start() {
        std::cout << "Engine started." << std::endl;
    }
};

// 使用复合将 Engine 嵌入到 Car 类中
class Car {
public:
    void start() {
        engine_.start();
        std::cout << "Car started." << std::endl;
    }

private:
    Engine engine_;
};

int main() {
    Car myCar;
    myCar.start(); // 启动汽车，实际上是启动引擎和汽车本身

    return 0;
}
```

**39. 明智而审慎地使用private继承  （Use private inheritance judiciously)**
私有继承（private inheritance）是一种较少使用的继承形式，因为它对类之间的关系进行了强烈限制。通常情况下，应谨慎使用私有继承，确保你真正需要它，以及你了解它的含义和影响。
以下是一些应该考虑使用私有继承的情况：
1. **实现继承**：当你需要重用基类的实现而不继承其接口时，可以考虑私有继承。这种情况下，派生类将成为基类的一种实现方式，但不会继承其接口。
2. **限制接口可见性**：私有继承将基类的公共和保护成员变为私有成员，从而限制了它们的可见性。这可以用于确保某些接口只能在派生类内部使用，而不会暴露给外部。


下面是一个示例，演示了如何在合适的情况下使用私有继承：
```cpp
class Logger {
public:
    void log(const std::string& message) {
        // 实现日志记录逻辑
    }
};

class MyClass : private Logger {
public:
    void doSomething() {
        // 使用基类的日志记录功能
        log("Doing something...");
        // 执行其他操作
    }
};

int main() {
    MyClass myObj;
    myObj.doSomething(); // 调用派生类的函数，间接使用私有继承的功能
    // myObj.log("This won't work"); // 错误，无法直接访问基类的接口
    return 0;
}
```
其实上面改成组合模式，has-a更好一点

**40. 明智而审慎地使用多重继承  （Use multiple inheritance judiciously)**
总结：
+ 多重继承容易产生歧义
+ virtual继承会增加大小、速度、初始化复杂度等成本，如果virtual base class不带任何数据，将是最具使用价值的情况
+ 多重继承的使用情况：当一个类是“public 继承某个interface class”和“private 继承某个协助实现的class”两个相结合的时候。

#### 七、模板与泛型编程 (Templates and Generic Programming)

**41. 了解隐式接口和编译期多态 （Understand implicit interfaces and compile-time polymorphism)**

对于面向对象编程：以显式接口（explicit interfaces）和运行期多态（runtime polymorphism）解决问题：
```cpp
class Widget {
public:
	Widget();
	virtual ~Widget();
	virtual std::size_t size() const;
	void swap(Widget& other); //第25条
}

void doProcessing(Widget& w){
	if(w.size()>10){...}
}
```
+ 在上面这段代码中，由于w的类型被声明为Widget，所以w必须支持Widget接口，我们可以在源码中找出这个接口，看看他是什么样子（explicit interface），也就是他在源码中清晰可见
+ 由于Widget的某些成员函数是virtual，w对于那些函数的调用将表现运行期多态，也就是运行期间根据w的动态类型决定调用哪一个函数

在templete编程中：隐式接口（implicit interface）和编译器多态（compile-time polymorphism）更重要：
```cpp    
template<typename T>
void doProcessing(T& w)
{
	if(w.size()>10){...}
}
```   
+ 在上面这段代码中，w必须支持哪一种接口，由template中执行于w身上的操作来决定，例如T必须支持size等函数。这叫做**隐式接口**
+ 凡涉及到w的任何函数调用，例如operator>，都有可能造成template具现化，使得调用成功，根据不同的T类型调用具现化出来不同的函数，这叫做编译期多态

**42. 了解typename的双重意义 （Understand the two meanings of typename)**
以下是 `typename` 的两种主要用途：

1. **告诉编译器某个名称是一个类型**：这是 `typename` 最常见的用途，它用于告诉编译器某个名称是一个类型而不是变量或函数。这通常用于模板编程中，以明确模板参数中的某个名称是类型。例如：
```cpp
template <typename T>
void foo() {
    typename T::SomeType* ptr; // 告诉编译器 T::SomeType 是一个类型
}
```
2. **告诉编译器某个名称是一个依赖名称**：在模板编程中，编译器需要知道某个名称是否是依赖于模板参数的，以防止解析错误。使用 `typename` 可以明确告诉编译器某个名称是一个依赖名称。例如：
```cpp
template <typename T>
void bar() {
    T::template SomeTemplateType<int> var; // 使用 typename 明确 T::SomeTemplateType 是依赖名称
}
```
    

**43. 学习处理模板化基类内的名称 （Know how to access names in templatized base classes)**

**44. 将与参数无关的代码抽离templates （Factor parameter-independent code out of templates)**


**45. 运用成员函数模板接受所有兼容类型 （Use member function templates to accept "all compatible types.")**

**46. 需要类型转换时请为模板定义非成员函数 （Define non-member functions inside templates when type conversions are desired)**

**47. 请使用traits classes表现类型信息 （Use traits classes for information about types)**

**48. 认识template元编程 （Be aware of template metaprogramming)**

Template metaprogramming是编写执行于编译期间的程序，因为这些代码运行于编译器而不是运行期，所以效率会很高，同时一些运行期容易出现的问题也容易暴露出来
```
template<unsigned n>
struct Factorial{
	enum{
		value = n * Factorial<n-1>::value
	};
};
template<>
struct Factorial<0>{
	enum{ value = 1 };
};                       //这就是一个计算阶乘的元编程
```

#### 八、定制new和delete (Customizing new and delete)

**49. 了解new-handler的行为 （Understand the behavior of the new-handler)**
总结：
+ set_new_handler允许客户制定一个函数，在内存分配无法获得满足时被调用

一个设计良好的new-handler要做下面的事情：
+ 让更多内存可以被使用
+ 安装另一个new-handler，如果目前这个new-handler无法取得更多可用内存，或许他知道另外哪个new-handler有这个能力，然后用那个new-handler替换自己
+ 卸除new-handler
+ 抛出bad_alloc的异常
+ 不返回，调用abort或者exit


**50. 了解new和delete的合理替换时机 （Understand when it makes sense to replace new and delete)**

+ 用来检测运用上的错误，如果new的内存delete的时候失败掉了就会导致内存泄漏，定制的时候可以进行检测和定位对应的失败位置
+ 为了强化效率（传统的new是为了适应各种不同需求而制作的，所以效率上就很中庸）
+ 可以收集使用上的统计数据
+ 为了增加分配和归还内存的速度
+ 为了降低缺省内存管理器带来的空间额外开销
+ 为了弥补缺省分配器中的非最佳对齐位
+ 为了将相关对象成簇集中起来

**51. 编写new和delete时需固守常规（Adhere to convention when writing new and delete)**
+ 重写new的时候要保证49条的情况，要能够处理0bytes内存申请等所有意外情况
+ 重写delete的时候，要保证删除null指针永远是安全的

**52. 写了placement new也要写placement delete（Write placement delete if you write placement new)**

如果operator new接受的参数除了一定会有的size_t之外还有其他的参数，这个就是所谓的palcement new
```
void* operator new(std::size_t, void* pMemory) throw(); //placement new
static void operator delete(void* pMemory) throw();     //palcement delete，此时要注意名称遮掩问题
```

#### 杂项讨论 (Miscellany)

**53. 不要轻忽编译器的警告（Pay attention to compiler warnings)**
+ 严肃对待编译器发出的warning， 努力在编译器最高警告级别下无warning
+ 同时不要过度依赖编译器的警告，因为不同的编译器对待事情的态度可能并不相同，换一个编译器警告信息可能就没有了

**54. 让自己熟悉包括TR1在内的标准程序库 （Familiarize yourself with the standard library, including TR1)**
其实感觉这一条已经有些过时了，不过虽然过时，但是很多地方还是有用的
+ smart pointers
+ tr1::function ： 表示任何callable entity（可调用物，只任何函数或者函数对象）
+ tr1::bind是一种stl绑定器
+ Hash tables例如set，multisets， maps等
+ 正则表达式
+ tuples变量组
+ tr1::array：本质是一个STL化的数组
+ tr1::mem_fn:语句构造上与程艳函数指针一样的东西
+ tr1::reference_wrapper： 一个让references的行为更像对象的东西
+ 随机数生成工具
+ type traits

**55. 让自己熟悉Boost （Familiarize yourself with Boost)**
主要是因为boost是一个C++开发者贡献的程序库，代码相对比较好




