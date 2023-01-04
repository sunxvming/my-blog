## 内部类的概念
类的本质是一个命名空间。
如果一个类定义在另一个类的内部，这个内部类就叫做内部类。注意此时这个内部类是一个独立的类，它不属于外部类，只是包含在外部类的命名空间中。
注意内部类可以直接访问外部类中的static、枚举成员，不需要外部类的对象/类名。
内部类和友元类很像很像。只是内部类比友元类多了一点权限：可以不加类名的访问外部类中的static、枚举成员。其他的都和友元类一样。


## 在堆中创建内部类对象
```
class A
{
public: class B{};
};
int _tmain(int argc, _TCHAR* argv[])
{
       A::B*b=new A::B();
       return 0;
}
```


## 内部类可以现在外部类中声明，然后在外部类外定义
```
class A
{
private: static int i;
public: class B;
};
class A::B{
public:void foo(){cout<<i<<endl;}//!!!这里也不需要加A::i.
};
int A::i=3;
```


## sizeof(外部类)=外部类，和内部类没有任何关系
```
class A
{
public:
       class B{int o;};
};
int _tmain(int argc, _TCHAR* argv[])
{
       cout<<sizeof(A)<<endl;//1
       return 0;
}
```