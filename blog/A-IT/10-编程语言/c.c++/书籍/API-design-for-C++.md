
## 1. Introduction
### What are APIs?
#### Contracts and contractors
The passage uses the analogy of hiring contractors to illustrate how APIs let developers delegate complex tasks, avoid dealing with low-level details, and integrate specialized components—much like building a house by coordinating experts rather than doing everything yourself.
#### APIs in C++
A C++ API will therefore generally include the following elements:  
1. Headers/Modules: A collection of .h header files or module interface units that  define the interface and allow client code to be compiled against that interface.  
2. Libraries: One or more static or dynamic library files that provide an implementation for the API (e.g., .a, .lib, .dll, .dylib, etc. files). 
3. Documentation
4. Example(It's better to have it.)

In fact,  many software engineers prefer to expand the acronym API as **abstract programming interface** instead of application programming interface.

> TIP: An API is a logical interface to a software component that hides the internal details required to implement it.

### What's different about API design?
- An API is an interface designed for developers, in much the same way that a GUI is  an interface designed for end users.
- Multiple applications can share the same API.
- You must strive for backward compatibility whenever you change an API.
- Owing to the backward compatibility requirement, it is critical to have a change  control process in place.
- APIs tend to live for a long time.
- The need for good documentation is paramount when writing an API, particularly if you don’t provide the source code for your implementation.
- The need for automated testing is similarly very high.

> TIP: An API describes software used by other engineers to build their applications. As such, it must be well-designed, documented, regression tested, and stable between releases.

### Why should you use APIs?
#### More robust code
- Hides implementation. By hiding the implementation details of your module, you  gain the flexibility to change the implementation at a future date without causing  an upheaval for your users.
- Increases longevity.
- Promotes modularization.
- Reduces code duplication.
- Removes hardcoded assumptions.
	- For example, a GetLogFilename() API call could be used to replace the hardcoded  “myprogram.log” string.
- Easier to change the implementation.
- Easier to optimize.
#### Code reuse
Code reuse is the use of existing software to build new software. It’s one of the holy grails  of modern software development. APIs provide a mechanism to enable code reuse.
In essence, software development has become a lot more modular with the use of distinct components that form the building blocks of an application and talk together via their published APIs.
One of the difficulties in achieving code reuse, however, is that you must often come up with a more general interface than you originally intended.
#### Parallel development
Good APIs let developers work independently by providing stable contracts that hide implementation details and support parallel development.

For example, let's say that you are working on a string encryption algorithm that another developer wants to use to write data out to a configuration file.
```cpp
#include <string.h>
class StringEncryptor
{
public:
	/// set the key to use for the Encrypt() and Decrypt() calls
	void SetKey(const std::string &key);
	/// encrypt an input string based upon the current key
	std::string Encrypt(const std::string &str) const;
	/// decrypt a string using the current key - calling
	/// Decrypt() on a string returned by Encrypt() will
	/// return the original string for the same key.
	std::string Decrypt(const std::string &str) const;
};

void StringEncryptor::SetKey(const std::string &key)  
{}  
std::string StringEncryptor::Encrypt(const std::string &str)  
{  
	return str;  
}  
std::string StringEncryptor::Decrypt(const std::string &str)  
{  
	return str;  
}
```
In this way, your colleague can use this API and proceed with the work without being held up by your progress.
The important point is that you  have a stable interfaceda contractdon which you both agree, and that it behaves  appropriately, such as Decrypt(Encypt("Hello")) == "Hello".

### When should you avoid APIs?
- **License restrictions.** An API may provide everything you need for functionality, but  the license restrictions may be prohibitive for your needs.
- **Functionality mismatch**. An API may appear to solve a problem that you have but  may do it in a way that doesn’t match the constraints or functional requirements  of your application.
- **Lack of source code.** Although there are many open source APIs, sometimes the  best API for your case may be a closed source offering.
- **Lack of documentation**. An API may appear to fulfill a need that you have in your application, but if the API has poor or nonexistent documentation, then you may decide to look elsewhere for a solution.

### API examples
#### Layers of APIs
- OS APIs. Every OS must provide a set of standard APIs to allow programs to access  OS-level services.
- Language APIs. The C language is supported by the C Standard Library, implemented as the libc library and associated man pages.
- Image APIs. Gone are the days when developers needed to write their own image  reading and writing routines.
- 3D graphics APIs. The two classic real-time 3D graphics APIs are OpenGL and  DirectX.
- GUI APIs. Any application that wants to open its own window needs to use a GUI  tool kit. This is an API that provides the ability to create windows, buttons, text  fields, dialogues, icons, menus, and so on.Some popular  C/C++ GUI APIs include the wxWidgets library, Qt Company’s Qt API, GTKþ, and  X/Motif.
#### A real-life example
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251128155643.png)

### Libraries, frameworks, and software development kits
- Library : reusable code you call.
- Framework : structured environment that calls your code.
- SDK : full kit containing libraries, frameworks, tools, and documentation.

### File formats and network protocols

**File Formats** = Rules for Saving and Loading Data
A file format defines a standard way to store data on disk.
Example: JPEG/JFIF defines exactly how image data and headers are arranged in a .jpg file.

**Network Protocols** = Rules for Sending Data Over the Network
Client–server systems or peer-to-peer systems exchange data using an agreed-upon network protocol.
Examples:HTTP、FTP


How File Formats / Protocols resemble APIs?
They look like APIs because they define a standard interface for information exchange:
- They specify what data looks like.
- They must remain backward compatible.
- Changes must respect existing users.

But they are not APIs because they are not code you link into your program.

> TIP: Whenever you create a file format or client/server protocol, you should also create an API for it(创建对应的API接口去操作他们). This allows the details of the specification, and any future changes to it, to be centralized and hidden.

## 2. Qualities

### Model the problem domain
#### Provide a good abstraction
An API should provide a logical abstraction for the problem that it solves. That is, it  should be formulated in terms of high-level concepts that make sense in the chosen problem domain, rather than exposing low-level implementation issues. You should be  able to give your API documentation to a nonprogrammer, and that person should be  able to understand the concepts of the interface and how it’s meant to work.

For example, let’s consider an API for a simple address book program. Conceptually,  an address book is a container for the details of multiple people. 
It seems logical, then,  that our API should provide an AddressBook object that contains a collection of Person  objects.

This initial design can be represented visually using a notation called Unified Modeling Language (UML)
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251128161930.png)

#### Model the key objects
An API should also model the key objects for the problem domain. This process is often  called object-oriented design or object modeling because it aims to describe the hierarchy of objects in the specific problem domain. The goal of object modeling is to  identify the collection of major objects, the operations they provide, and how they relate  to each other.

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251128171718.png)

#### Solve the core problems
The main reason to develop an API is to solve some related set of problems. So, it must  be clear to your users how they can apply your design to achieve that goal. We just saw  how you can model the key objects for your problem domain, but the users of your API  also need to know how to create those objects and how to call the methods on those  objects to complete their tasks.

To design a good API, you must demonstrate how it solves the core problems of the domain. Sequence diagrams help by showing step-by-step how objects interact to achieve real tasks. This reveals missing functions and ensures the API is usable for its intended purpose.

### Hide implementation details
#### Physical hiding: Declaration versus definition

> TIP: Physical hiding means storing internal details in a separate file (.cpp) from the public interface (.h).

C++20. This feature modules provides an alternative to the use of header files.  However, you can still perform physical hiding with modules by putting your declarations in your module interface unit and definitions in your module implementation unit.
#### Logical hiding: Encapsulation

> TIP: Encapsulation is the process of separating the public interface of an API from its underlying implementation.

> TIP: Logical hiding means using the C++ language features of protected and private to restrict access to internal details

#### Hide member variables
Someof the additionalbenefits  of using getter/setter routines, rather than directly exposing member variables, include:
* Validation.
* Lazy evaluation.
* Caching.
* Extra computation.
* Notifications. 数据变了可以通知其他模块
* Debugging.
* Synchronization.
* Finer access control.
* Maintaining invariant relationships.

If you make a variable protected, then it can be accessed directly by any  clients that subclass your class, and then exactly the same arguments apply as for the  public case.

> TIP: Data members of a class should always be declared **private**, never public or protected.

#### Hide implementation methods

- APIs should expose **only what the client needs**.
- Hide all implementation details and helper functions.
- Never return non-const pointers/references to private members.
- Use the **Pimpl idiom** to hide private data completely.
- This makes your API easier to maintain, modify, and evolve without breaking clients.


> TIP: Never return non-const pointers or references to private data members. This breaks encapsulation.

> TIP: Prefer declaring private functionality as static functions within the .cpp file rather than exposing them in public headers as private methods. (Using the Pimpl idiom is even better, though).



#### Hide implementation classes

Some classes exist **only to support your implementation** and should not be exposed in the public API. Exposing them:
- Increases API complexity
- Risks users depending on internal details
- Makes future refactoring harder
- Hiding implementation classes keeps your API **clean, maintainable, and stable**.
- Users should only see **what they need to use**, not internal helpers.
- This allows you to **change internal structures** freely without breaking client code.

### Minimally complete

> TIP: Remember Occam’s razor: plurality should not be posited without necessity.

#### Don't overpromise
The key point is that once you release an API and have clients using it, adding new functionality is easy but removing functionality is really difficult. The best advice then is: when in doubt, leave it out 

> TIP: When in doubt, leave it out! Minimize the number of public classes and functions in your API

#### Don't repeat yourself
Some common ways to address code duplication are:
- Function Refactoring
- Class Abstractions
- Dependency Injection: This is where the functionality is defined in a single object  and that object is passed into the method calls where the functionality is needed.
- Automation: In cases where duplication is unavoidable, you can define a single  source of truth for the functionality and write automation tools to generate the  other code from that source of truth.

A good way to think about this is to ask yourself: if you needed to make a change to  how something works, would you have to update multiple places in your code to make  that change?

#### Convenience APIs
On the one hand, there’s the argument that an API should provide only one way to  perform one task.This ensures that the API is minimal, singularly focused, consistent,and easy to understand.

However, on the other hand, there is also the argument that an API should make  simple things easy to do. 

**Real-world Example: OpenGL / GLU / GLUT**

OpenGL (Core API)
- Low-level primitives: points, lines, polygons.
- Very powerful but verbose; e.g., creating a sphere requires manually defining polygons.

GLU (Convenience API)
- Built on top of OpenGL.
- Provides higher-level functions like quadric surfaces, camera positioning, and sphere creation.

GLUT (Even Higher-Level)
- Another layer on top of OpenGL/GLU.
- Provides window management, event handling, and pre-defined geometric primitives.

Summary
- Core API: Minimal, primitive, consistent.
- Convenience API: Optional, higher-level wrappers for common tasks.
- Keep convenience separate to maintain focus and reduce complexity.
- This strategy improves usability for a wide range of clients without compromising maintainability.


> TIP: Add convenience APIs as separate modules or libraries that sit on top of your minimal core API.（接口的易用性和基础性的结合）

#### Add virtual functions judiciously
you should be aware of the potential pitfalls:
- You can implement seemingly innocuous changes to your base classes that have a  detrimental impact on your clients.
- Your clients may use your API in ways that you never intended or imagined.
- Clients may extend your API in incorrect or error-prone ways. For example, you  may have a thread-safe API but, depending upon your design, a client could override a virtual function and provide an implementation without performing the  appropriate mutex locking operations, opening the potential for difficult-to-debug  race conditions.
- Overridden functions may break the internal integrity of your class.

In addition to these API-level behavioral concerns, there are the standard matters  about which you should be aware when using virtual functions in C++:
- Virtual function calls must be resolved at runtime by performing a vtable lookup,  whereas nonvirtual function calls can be resolved at compile time.
- The use of virtual functions increases the size of an object, typically by the size of  a pointer to the vtable.（对创建的大量小对象有影响）
- Adding, reordering, or removing a virtual function will break binary compatibility.
- Virtual functions cannot always be inlined.

> TIP: Avoid declaring functions as overridable (virtual) until you have a valid and compelling need to do so

### Easy to use
A well-designed API should make simple tasks easy and obvious. For example, it should  be possible for a client to look at the method signatures of your API and be able to glean   how to use it without any additional documentation.

#### Discoverable
A discoverable API is one in which users can work out how to use the API on their own  without any accompanying explanation or documentation.

#### Difficult to misuse

> TIP: Prefer the use of enums over Booleans and integers to improve code readability.

```cpp
// bad
std::string FindString(const std::string &text,  
	bool search_forward,  
	bool case_sensitive);

FindString(text, true, false);
	
// good
enum class SearchDirection {  
	Forward,  
	Backward  
};  
enum class CaseSensitivity {  
	Sensitive,  
	Insensitive  
};  
std::string FindString(const std::string &text,  
	SearchDirection direction,  
	CaseSensitivity case_sensitivity);
	
FindString(text, SearchDirection::Forward, CaseSensitivity::Insensitive);
```



> TIP: Avoid functions with multiple parameters of the same type.

Using this design, clients can create a new Date object with the following unambiguous and easy to understand syntax. Also, any attempts to specify the values in a  different order will result in a **compile-time error**:


```cpp
// bad
class Date
{
public:
	Date(int year, int month, int day);
	...
};

Data(2012,12,12);

// good
class Year
{
public:
    explicit Year(int y) :
    mYear(y)
    {}
    int GetYear() const { return mYear; }
private:
    int mYear;
};

class Month
{
public:
    explicit Month(int m) :
    mMonth(m)
    {}
    
    int GetMonth() const { return mMonth; }
    static Month Jan() { return Month(1); }
    static Month Feb() { return Month(2); }
    static Month Mar() { return Month(3); }
    static Month Apr() { return Month(4); }
    static Month May() { return Month(5); }
    static Month Jun() { return Month(6); }
    static Month Jul() { return Month(7); }
    static Month Aug() { return Month(8); }
    static Month Sep() { return Month(9); }
    static Month Oct() { return Month(10); }
    static Month Nov() { return Month(11); }
    static Month Dec() { return Month(12); }
private:
    int mMonth;
};

class Day
{
public:
    explicit Day(int d) :
    mDay(d)
    {}
    int GetDay() const { return mDay; }
private:
    int mDay;
};

class Date  
{  
public:  
	Date(const Year &y, const Month &m, const Day &d);  
	...  
};

Date birthday(Year(1976), Month::Jul(), Day(7));
```

#### Consistent

A consistent API:
* Uses uniform naming
* Keeps parameter order predictable
* Provides consistent interfaces across related classes
* Follows familiar language/platform idioms
* Avoids duplicate ways to perform the same task

```cpp
// 两个函数的srd dist参数的顺序不一致，很容易出错
void bcopy(const void *s1, void *s2, size_t n);
char *strncpy(char *restrict s1, const char *restrict s2, size_t n);

// 一个是size bytes，一个是(count * size) bytes，参数含义不连续
void *malloc(size_t size);
void *calloc(size_t count, size_t size);  
```

> TIP: Use consistent function naming and parameter ordering.



#### Orthogonal

In terms of API design, orthogonality means that methods do not have side effects.
As a result, making a  change to the implementation of one part of the API should have no effect on other parts  of the API
Furthermore, code that does not create side  effects, or relies upon the side effects of other code, is much easier to develop, test,  debug, and change because its effects are more localized and bounded.


An example: 
Perhaps you’ve stayed in a motel where the controls  of the shower are very unintuitive. You want to be able to set the power and the temperature of the water, but instead you have a single control that seems to affect both  properties in a complex and nonobvious way.
也就是你调水量大小温度也会跟着变，反之亦然。

```cpp
class CheapMotelShower  
{  
public:  
	float GetTemperature() const; // units = Fahrenheit  
	float GetPower() const; // units = percent, 0..100  
	void SetPower(float p);  
private:  
	float mTemperature;  
	float mPower;  
};

float CheapMotelShower::GetTemperature() const  
{  
	return mTemperature;  
}  
float CheapMotelShower::GetPower() const  
{  
	return mPower;  
}  
void CheapMotelShower::SetPower(float p)  
{  
	if (p < 0) {  
		p = 0;  
	}  
	if (p > 100) {  
		p = 100;  
	}  
	mPower = p;  
	mTemperature = 42.0f + sin(p / 38.0f) * 45.0f;  
}
```


> TIP: An orthogonal API means that functions do not have side effects.

#### Robust resource allocation
One of the trickiest aspects of programming in Cþþ is memory management.
most C++ bugs arise from some kind of misuse of pointers or references, such as:
* Null dereferencing: trying to use -> or * operators on a nullptr.
* Double freeing: calling delete or free() on a block of memory twice.
* Accessing invalid memory: trying to use -> or * operators on a pointer that hasnot yet been allocated or that has already been freed.
* Mixing allocators: using delete to free memory that was allocated with malloc(), orusing free() to return memory allocated with new.
* Incorrect array deallocation: using the delete operator, instead of delete [], to freean array.
* Memory leaks: not freeing a block of memory when you are finished with it.


If your API involves any resource allocation, you should:
- Provide a wrapper class where  
    **constructor = acquire resource**  
    **destructor = release resource**
- Optionally provide a `Release()` method for manual control.
- Keep destructors non-throwing (they must never raise exceptions).

> TIP: Return a dynamically allocated object using a smart pointer wherever possible.

> TIP: Think of resource allocation and deallocation as object construction and destruction.



#### Platform independent
A well-designed Cþþ API should always avoid platform-specific `#if/#ifdef` lines in its  public headers that produce different APIs on different platforms or that produce  different APIs in debug versus release builds.

```cpp
// bad:This poor design creates a different API on different platforms.
class MobilePhone  
{  
public:  
	bool StartCall(const std::string &number);  
	bool EndCall();  
// 下面的把现实给暴露出来了	
#if defined TARGET_OS_IPHONE   
	bool GetGPSLocation(double &lat, double &lon);  
#endif  
};

// good
class MobilePhone  
{  
public:  
	bool StartCall(const std::string &number);  
	bool EndCall();  
	bool HasGPS() const;  
	bool GetGPSLocation(double &lat, double &lon);  
};

bool MobilePhone::HasGPS() const  
{  
#if defined TARGET_OS_IPHONE  
	return true;  
#else  
	return false;  
#endif  
}
```

> TIP: Never put platform-specific #if or #ifdef statements into your public APIs. It exposes implementation details and makes your API behave differently on differently platforms

### Loosely coupled

> TIP: Good APIs exhibit loose coupling and high cohesion.

One way to think of coupling is that given two components, A and B, how much code  in B must change if A changes.

#### Coupling by name only
If class A only needs to know the name of class B (i.e., it does not need to know the size of  class B or call any methods in the class), then class A does not need to depend upon the  full declaration of B.In these cases, you can use a forward declaration for class B rather  than including the entire interface

> TIP: Use a forward declaration for a class unless you actually need to #include its full definition.


#### Reducing class coupling
> TIP: Prefer using nonmember nonfriend functions instead of member functions to reduce coupling.

```cpp
// bad
class MyObject
{
public:
	void PrintName() const;
	std::string GetName() const;
	...
protected:
	...
private:
	std::string mName;
	...
};


// good, PrintName()只需要用MyObject的接口，不需要知道它的实现
class MyObject  
{  
public:  
	std::string GetName() const;  
	...  
protected:  
	...  
private:  
	std::string mName;  
	...  
};  
void PrintName(const MyObject &obj);
```

#### Intentional redundancy

Normally, good software engineering practice aims to remove redundancy: to ensure  that each significant piece of knowledge or behavior is implemented only once (Pierce,  2002). However, reuse of code implies coupling, and sometimes it’s worth the cost to add  a small degree of duplication to sever an egregious coupling relationship

> TIP: Data redundancy can sometimes be justified to reduce coupling between classes.

```cpp
// bad, 依赖于ChatUser
class TextChatLog  
{  
public:  
	bool AddMessage(const ChatUser &user, const std::string &msg);  
	int GetCount() const;  
	std::string GetMessage(int index);  
private:  
	struct ChatEvent  
	{  
		ChatUser mUser;  
		std::string mMessage;  
		size_t mTimestamp;  
	};  
	std::vector<ChatEvent> mChatEvents;  
};

// good
class TextChatLog  
{  
public:  
	bool AddMessage(const std::string &user, const std::string &msg);  
	int GetCount() const;  
	std::string GetMessage(int index);  
private:  
	struct ChatEvent  
	{  
		std::string mUserName;    // 增加了冗余，但减少了耦合
		std::string mMessage;  
		size_t mTimestamp;  
	};  
	std::vector<ChatEvent> mChatEvents;  
};
```

#### Manager classes
A manager class is one that owns and coordinates several lower-level classes. This can be  used to break the dependency of one or more classes upon a collection of low-level. classes. 
This is often implemented using a Facade design pattern, which I’ll cover in the  chapter on Patterns, or a Mediator design pattern. The difference between the two is that  a Fac¸ade exposes only existing functionality in a different way whereas a Mediator adds  new functionality.

before

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251201163002.png)

after
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251201163018.png)

> TIP: Manager classes can reduce coupling by encapsulating several lower-level classes. They can be implemented using the Fac¸ade or Mediator design patterns.

#### Callbacks, observers, and notifications

最主要的是可以让low-level的代码在适当时机调用high-leve的代码。
可以使两个模块的耦合更低

 **1. Callback Functions (C-Style)**

A callback is simply a **function pointer** passed into another module.
Module A gives Module B a function pointer.
Module B calls it when needed, without depending on A's headers.
This breaks cyclic dependencies and keeps modules decoupled.


 **Basic C++11 callback example**
```cpp
class ModuleB {
public:
    using CallbackType = void (*)(const std::string&, void*);

	// The `closure` is arbitrary user data (context), passed through to the callback.
    void SetCallback(CallbackType cb, void* closure) {
        mCallback = cb;
        mClosure = closure;
    }

    void InvokeCallback(const std::string& name) {
        if (mCallback) {
            mCallback(name, mClosure);
        }
    }

private:
    CallbackType mCallback = nullptr;
    void* mClosure = nullptr;  
};
```


 **2. Observer Pattern (Object-Oriented Callbacks)**

The observer pattern uses **objects**, not raw function pointers.
You define an abstract base class:

```cpp
class Observable {
public:
    virtual ~Observable() {}
    virtual void CallbackMethod(const std::string&) = 0;
};
```

A concrete observer implements it:

```cpp
class MyObserver : public Observable {
public:
    MyObserver(int data) : mData(data) {}
    void CallbackMethod(const std::string& name) override {
        std::cout << name << ": " << mData << "\n";
    }
private:
    int mData;
};
```

Module B stores the observer:

```cpp
class ModuleB {
public:
    void SetObserver(std::shared_ptr<Observable> cb) {
        mObserver = cb;
    }
    void InvokeObserver(const std::string& name) {
        if (mObserver) mObserver->CallbackMethod(name);
    }
private:
    std::shared_ptr<Observable> mObserver;
};
```


 **3. Notifications (Signals and Slots / Event Buses)**

Callbacks and observers usually:
* involve one sender
* and one receiver

**Example with `boost::signals2`**
```cpp
class MySlot {
public:
    void operator()() const {
        std::cout << "MySlot called!" << std::endl;
    }
};

MySlot slot;
boost::signals2::signal<void()> signal;

signal.connect(slot); // register slot
signal();             // emit → calls all connected slots
```

| Technique                         | Use Case                           | Pros                     | Cons                              |
| --------------------------------- | ---------------------------------- | ------------------------ | --------------------------------- |
| **Callback Function**             | Simple notifications, C-style APIs | Fast, low overhead       | Unsafe `void*`, hard with objects |
| **Observer Pattern**              | OOP callback design                | Strongly typed, safe     | Slightly more boilerplate         |
| **Signals/Slots (Notifications)** | Many listeners, large systems      | Very flexible, decoupled | Extra library or framework needed |

### Stable, documented, and tested



## 3. Patterns
### Pimpl idiom
#### Using pimpl
```cpp
// autotimer.h
#include <string>
class AutoTimer
{
public:
	explicit AutoTimer(const std::string &name);
	~AutoTimer();
private:
	class Impl;    //内部类声明
	Impl *mImpl;
};
// ------------------------
class AutoTimer::Impl
{
public:
    /// Return how long the object has been alive
    double GetElapsed() const
    {
#ifdef _WIN32
        return (GetTickCount() - mStartTime) / 1e3;
#else
        struct timeval end_time;
        gettimeofday(&end_time, nullptr);
        double t1 = mStartTime.tv_usec / 1e6 + mStartTime.tv_sec;
        double t2 = end_time.tv_usec / 1e6 + end_time.tv_sec;
        return t2 - t1;
#endif
    }

    std::string mName;
#ifdef _WIN32
    DWORD mStartTime;
#else
    struct timeval mStartTime;
#endif
};

AutoTimer::AutoTimer(const std::string &name) :
    mImpl(new AutoTimer::Impl())
{
    mImpl->mName = name;
#ifdef _WIN32
    mImpl->mStartTime = GetTickCount();
#else
    gettimeofday(&mImpl->mStartTime, nullptr);
#endif
}

AutoTimer::~AutoTimer()
{
    std::cout << mImpl->mName << ": took " << mImpl->GetElapsed()
              << " secs" << std::endl;
    delete mImpl;
}

```


> TIP: When using the pimpl idiom, prefer to use a private nested implementation class. Only use a public nested Impl class (or a public nonnested class) if other classes or free functions in the .cpp must access Impl members.

Another design question worth considering is how much logic to locate in the Impl  class. Some options include: 
1. Only private member variables,  
2. Private member variables and methods, or      **recommend**
3. All methods of the public class, such that the public methods are simply thin  wrappers on top of equivalent methods in the Impl class.
#### Copy semantics

A Cþþ compiler will create a copy constructor and assignment operator for your class if  you don’t explicitly define them.
so， 得处理Impl的指针的问题：
- Make your class uncopyable.   使用std::unique_ptr
- Explicitly define the copy semantics.
	- 值语义：create a  copy of the Impl object instead of just copying the pointer
	- 引用语义：智能指针

#### Pimpl and smart pointers
One of the inconvenient and error-prone aspects of pimpl is the need to allocate and  deallocate the implementation object.

> TIP: Think about the copy semantics of your pimpl classes, and favor the use of a shared or unique pointer to manage initialization and destruction of the implementation pointer.

#### Advantages of pimpl
- Information hiding.
- Reduced coupling.
- Faster compiles.
- Greater binary compatibility.  

#### Disadvantages of pimpl

#### Opaque pointers in C
### Singleton
#### Implementing singletons in C++

> TIP: Declare the constructor, destructor, copy constructor, and assignment operator to be private (or protected) to enforce the Singleton property. Or delete the copy constructor and assignment operator with the delete specifier.

#### Singletons and thread safety

```cpp
Singleton &Singleton::GetInstance()
{
	static Singleton instance;
	return instance;
}
```

Under these early versions of the standard,if two threads happened to call our  GetInstance() method at the same time, then the instance could be constructed twice, or  it could be used by one thread before it had been fully initialized by the other thread.

This issue was addressed in the Cþþ11 standard, which states that only one thread  can enter the initialization of a static and that the compiler must not introduce any  deadlocks around its initialization. So the previous implementation of GetInstance() is  thread-safe as of Cþþ11.


#### Singleton versus dependency injection
Dependency injection is a technique in which an object is passed into a class (injected),  rather than having the class create and store the object itself.

Dependency injection can be viewed as a way to avoid the proliferation of singletons  by encouraging interfaces that accept the single instance as an input rather than  requesting it internally via a GetInstance() method.
依赖注入可以被看作是避免单例泛滥的一种方式通过鼓励接口接受单个实例作为输入，而不是通过GetInstance（）方法在内部请求它。

> TIP: Dependency injection reduces coupling between objects and makes it easier to support unit testing


#### Singleton versus Monostate
The Monostate pattern allows multiple instances of a class to be created in which all  of those instances use the same static data.
```cpp
// monostate.h
class Monostate
{
public:
	int GetTheAnswer() const { return sAnswer; }
private:
	static int sAnswer;
};

// monostate.cpp
int Monostate::sAnswer = 42;
```

#### Singleton versus session state
In a recent retrospective interview, the authors of the original design patterns book  stated that the only pattern they would consider removing from the original list is  Singleton. This is because it’s essentially a way to store global data and tends to be an  indicator of poor design

> TIP: There are several alternatives to the Singleton pattern, including dependency injection,the Monostate pattern, and the use of a session context

### Factory Methods
#### Abstract base classes and interfaces
#### Simple factory example
#### Extensible factory example
### API wrapping patterns
#### The Proxy pattern
#### The Adapter pattern
#### The Façade pattern
### Observer pattern
#### Model–View–Controller
#### Implementing the Observer pattern
#### Push versus pull observers
## Design
### A case for good design
#### Accruing technical debt
#### Paying back the debt
#### Design for the long term
### Gathering functional requirements
#### What are functional requirements?
#### Example functional requirements
#### Maintaining the requirements
### Creating use cases
#### Developing use cases
#### Use case templates
#### Writing good use cases
#### Requirements and agile development
### Elements of API design
### Architecture design
#### Developing an architecture
#### Architecture constraints
#### Identifying the major abstractions
#### Inventing the key objects
#### Architectural patterns
#### Communicating the architecture
### Class design
#### Object-oriented concepts
#### Class design options
#### The SOLID principles
#### Using inheritance
#### Liskov substitution principle
#### ### Private inheritance
#### ### Composition
#### The open/closed principle
#### The Law of Demeter
#### Class naming
### Function design
#### Function design options
#### Function naming
#### Function parameters
#### Error handling
## Styles
### Flat C APIs
#### ANSI C features
#### Benefits of an ANSI C API
#### Writing an API in ANSI C
#### Calling C functions from C++
#### Case study: FMOD C API
### Object-oriented C++ APIs
#### Advantages of object-oriented APIs
#### Disadvantages of object-oriented APIs
#### Case study: FMOD C++ API
### Template-based APIs
#### An example template-based API
#### Templates versus macros
#### Advantages of template-based APIs
#### Disadvantages of template-based APIs
### Functional APIs
#### Functional programming concepts
#### An example functional API
#### Advantages of functional APIs
#### Disadvantages of functional APIs
### Data-driven APIs
#### Advantages of data-driven APIs
#### Disadvantages of data-driven APIs
#### Supporting variant argument lists
#### Case study: FMOD data-driven API
#### Data-driven Web services
#### Idempotency
## C++ usage
### Namespaces
### Constructors and assignment
#### Defining constructors and assignment
#### The explicit keyword
### Const correctness
#### Method const correctness
#### Parameter const correctness
#### Return value const correctness
### Templates
#### Template terminology
#### Implicit instantiation API design
#### Explicit instantiation API design
### Operator overloading
#### Overloadable operators
#### Free operators versus member operators
#### Adding operators to a class
#### Operator syntax
#### Conversion operators
### Function parameters
#### Pointer versus reference parameters
#### Default arguments
### Avoid #define for constants
### Avoid using friends
### Exporting symbols
### Coding conventions
## C++ revisions
### Which C++ revision to use
### C++11 API features
#### Move constructors and the Rule of Five
#### Default and deleted functions
#### Object construction
#### Initializer list constructors
#### Smart pointers
#### Enum classes
#### Override and final specifiers
#### The noexcept specifier
#### Inline namespaces
#### Type aliases with using
#### User-defined literals
#### Alternate function style
#### Tuples
#### Constant expressions
#### The nullptr keyword
#### Variadic templates
#### Migrating to C++11
### C++14 API features
#### The auto return type
#### The deprecated attribute
#### Variable templates
#### Const expression improvements
#### Binary literals and digit separators
#### Migrating to C++14
### C++17 API features
#### Inline variables
#### String views
#### Optional
#### Any
#### Variant
#### Nested namespaces
#### Fold expressions
#### Checking for header availability
#### Byte type
#### The maybe_unused attribute
#### Migrating to C++17
### C++20 API features
#### Modules
#### ### Named Modules
#### ### Header units
#### The spaceship operator
#### Constraints and concepts
#### Abbreviated function templates
#### The consteval specifier
#### The constinit specifier
#### Migrating to C++20
### C++23 API features
#### Expected values
#### Multidimensional subscript operator
#### Preprocessor directives
#### Migrating to C++23
## Performance
### Pass input arguments by const reference
### Minimize #include dependencies
#### Avoid “Winnebago” headers
#### Forward declarations
#### Redundant #include guards
### Declaring constants
#### The constexpr, consteval, and constinit keywords
### Initialization lists
### Memory optimization
### Don't inline functions until you need to
### Copy on write
### Iterating over elements
#### Iterators
#### Random access
#### Array references
#### Extern templates
### Performance analysis
#### Time-based analysis
#### Memory-based analysis
#### Multithreading analysis
## Concurrency
### Multithreading with C++
### Terminology
#### Data races and race conditions
#### Thread safety
#### Reentrancy
#### Asynchronous tasks
#### Parallelism
### Accessing shared data
#### Stateless APIs
#### Initializing shared data
#### Synchronized data access
### Concurrent API design
#### Concurrency best practices
#### Thread-Safe Interface pattern
## Versioning
### Version numbers
#### Version number significance
#### Esoteric numbering schemes
#### Creating a version API
### Software branching strategies
#### Branching strategies
#### Branching policies
#### APIs and parallel branches
#### File formats and parallel products
### Life cycle of an API
### Levels of compatibility
#### Backward compatibility
#### Functional compatibility
#### Source compatibility
#### Binary/application binary interface compatibility
#### ### Binary incompatible API changes
#### ### Binary compatible API changes
#### Forward compatibility
### How to maintain backward compatibility
#### Adding functionality
#### Changing functionality
#### Deprecating functionality
#### Removing functionality
#### Inline namespaces for versioning
### API reviews
#### The purpose of API reviews
#### Prerelease API reviews
#### Precommit API reviews
## Documentation
### Reasons to write documentation
#### Defining behavior
#### Documenting the interface's contract
#### Communicating behavioral changes
#### What to document
### Types of documentation
#### Automated API documentation
#### Overview documentation
#### Examples and tutorials
#### Release notes
#### License information
### Documentation usability
#### Inclusive language
### Using Doxygen
#### The configuration file
#### Comment style and commands
#### API comments
#### File comments
#### Class comments
#### Method comments
#### Enum comments
#### ### Sample header with documentation
## Testing
### Reasons to write tests
### Types of API testing
#### Unit testing
#### Integration testing
#### Performance testing
### Writing good tests
#### Qualities of a good test
#### What to test
#### Focusing the testing effort
#### Working with quality assurance
### Writing testable code
#### Test-driven development
#### Stub and mock objects
#### Testing private code
#### Using assertions
#### Contract programming
#### Record and playback functionality
#### Supporting internationalization
### Automated testing tools
#### Test harnesses
#### Code coverage
#### Bug tracking
#### Continuous build system
## Objective-C and Swift
### Interface design in C++ and Objective-C
### Data hiding in Objective-C
### Objective-C behind a C++ API
### C++ behind an Objective-C API
### C++ behind a Swift API
## Scripting
### Adding script bindings
#### Extending versus embedding
#### Advantages of scripting
#### Language compatibility issues
#### Crossing the language barrier
### Script binding technologies
#### Boost Python
#### Simplified wrapper and interface generator
#### Python-SIP
#### Component object model automation
#### Common object request broker architecture
### Adding Python bindings with Boost Python
#### Building Boost Python
#### Wrapping a C++ API with Boost Python
#### Constructors
#### Extending the Python API
#### Inheritance in C++
#### Cross-language polymorphism
#### Supporting iterators
#### Putting it all together
### Adding Ruby bindings with SWIG
#### Wrapping a C++ API with SWIG
#### Tuning the Ruby API
#### Constructors
#### Extending the Ruby API
#### Inheritance in C++
#### Cross-language polymorphism
#### Putting it all together
## Extensibility
### Extending via plugins
#### Plugin model overview
#### Plugin system design issues
#### Implementing plugins in C++
#### The plugin API
#### An example plugin
#### The Plugin manager
#### Plugin versioning
### Extending via inheritance
#### Adding functionality
#### Modifying functionality
#### Inheritance and the standard library
#### Inheritance and enums
#### The Visitor pattern
### Extending via templates
#### Policy-based templates
#### The curiously recurring template pattern
## A: Libraries
### Static libraries
### Dynamic libraries
### Dynamic libraries as plugins
### Importing and exporting functions
### The Dynamic Link Library entry point
### Creating libraries on Windows
### Useful Windows utilities
### Loading plugins on Windows
### Creating static libraries on Linux
### Creating dynamic libraries on Linux
### Shared library entry points
### Useful Linux utilities
### Loading plugins on Linux
### Finding dynamic libraries at run time
### Creating static libraries on macOS
### Creating dynamic libraries on macOS
### Frameworks on macOS
### Text-based InstallAPI
### Finding dynamic libraries at run time
