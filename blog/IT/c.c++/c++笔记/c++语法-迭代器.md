## boost中的iterator_facade使用


### iterator_traits
标准库的std::iterator_traits接受一个迭代器（或指针）类型，可以获得迭代器（或指针）所必备的五个类型信息：iterator_category（迭代器的分类）、value_type（迭代器所指的值类型）、reference（迭代器的值引用类型）、pointer（迭代器的指针类型）、difference_type（迭代器的距离类型），但是标准中把这五个类型揉成一团，从模板元编程的角度看不符合元函数的规范定义，是非标准元函数。   
iterator_traits库把std::iterator_traits中揉成一团的元数据分解开来，形成了五个标准元函数，功能是完全相同的。
```
* iterator_category<I> ：返回迭代器的分类
* iterator_value<I> ：返回迭代器的值类型
* iterator_reference<I> ：返回迭代器的值引用类型
* iterator_pointer<I> ：返回迭代器的指针类型
* iterator_difference<I> ：返回迭代器的距离类型
```

这五个元函数其实也是调用了标准的iterator_traits:
```
template<class Iterator>
struct iterator_value
{
    typedef typename iterator_traits<Iterator>::value_type type;
};
```
这个库位于名字空间boost，需要包含头文件<boost/iterator/iterator_traits.hpp>




### iterator_facade
iterator_facade是一个重要组件，它使用外观模式提供一个辅助类，能够容易地创建符合标准的迭代器。iterator_facade定义了数个迭代器的核心接口，用户只需实现这些核心功能就可以编写正确且完备的迭代器。   
iterator_facade要求用户的迭代器类必须实现下面五个功能（共六个接口，但依据迭代器的类型某些函数不实现）。


* 解引用：deference()，实现可读迭代器和可写迭代器必需
* 相等比较：equal()，实现单遍迭代器必需
* 递增：increment()，实现可递增迭代器和前向遍历迭代器必需
* 递减：decrement()，实现双向遍历迭代器必需
* 距离计算：advance()和distance_to()，实现随机访问遍历迭代器必需


这些核心操作将被iterator_facade用来实现迭代器的外部接口，所以通常它们都是private的。   
为了使iterator_facade访问这些核心操作函数，库又提供了一个辅助类boost::iterator_core_access，它定义了可以访问private核心操作的若干静态成员函数，用户迭代器要把它声明为友元。   
iterator_facade基于迭代器核心操作实现迭代器功能，类摘要如下：


```
template<
    class Derived,  //子类的名字，用户正在编写的自己的迭代器
    class Value,    //迭代器的值类型
    class CategoryOrTraversal,  //迭代器的分类
    class Reference = Value&,
    class Difference = ptrdiff_t,
>
class iterator_facade
{
public:
    //迭代器各种必需的类型定义
    typedef remove_const<Value>::type   value_type;
    typedef Reference                   reference;
    typedef Value*                      pointer;
    typedef Difference                  difference_type;
    typedef some_define                 iterator_category;


    //迭代器的各种操作定义
    Reference   operator*() const;
    some_define operator->() const;
    some_define operator[](difference_type n) const;
    Derived&    operator++();
    Derived     operator++(int);
    Derived&    operator--();
    Derived     operator--(int);
    Derived&    operator+=(difference_type n);
    Derived&    operator-=(difference_type n);
    Derived     operator-(difference_type n) const;
};
```



例一：编写一个可写单遍迭代器

```
template<typename T>
class vs_iterator :
    public boost::iterator_facade<      //基类链技术继承
    vs_iterator<T>, T,                  //子类名和值类型
    boost::single_pass_traversal_tag>   //单遍迭代器类型
{
private:
    std::vector<T>&     v;              //容器的引用
    size_t              current_pos;    //迭代器的当前位置
public:
    typedef boost::iterator_facade<vs_iterator<T>, T,boost::single_pass_traversal_tag> super_type;
    typedef vs_iterator                 this_type;  //定义自身的别名
    typedef typename super_type::reference reference;   //使用基类的引用类型


    vs_iterator(std::vector<T> &_v,size_t pos = 0) :
        v(_v), current_pos(pos)
    {}
    vs_iterator(this_type const& other) :
        v(other.v), current_pos(other.current_pos)
    {}
    void operator=(this_type const& other)
    {
        this->v = other.v;
        this->current_pos = other.current_pos;
    }


private:
    friend class boost::iterator_core_access;   //必需的友元声明


    reference dereference() const               //解引用操作
    {
        return v[current_pos];
    }


    void increment()                            //递增操作
    {
        ++current_pos;
    }


    bool equal(this_type const& other) const    //比较操作
    {
        return this->current_pos == other.current_pos;
    }
};


int main()
{
    std::vector<int> v{ 1,2,3,4,5 };
    vs_iterator<int> vsi(v), vsi_end(v, v.size());


    *vsi = 9;
    std::copy(vsi, vsi_end, std::ostream_iterator<int>(std::cout, ","));
    return 0;
}
```
例二：定义一个每次跳跃式前进N个位置的步进迭代器step_iterator：
```
template<typename T,std::ptrdiff_t N = 2>           //缺省一次前进两步
class step_iterator :
    public boost::iterator_facade<                  //基类链技术继承
    step_iterator<T>,                               //子类名
    typename boost::iterator_value<T>::type const,  //元函数获得值类型
    boost::single_pass_traversal_tag>               //单遍迭代器类型
{
private:
    T                   m_iter;                     //迭代器位置


public:
    typedef boost::iterator_facade<step_iterator<T>, typename boost::iterator_value<T>::type const, boost::single_pass_traversal_tag> super_type;
    typedef step_iterator                   this_type;  //定义自身的别名
    using typename super_type::reference;               //使用基类的引用类型


    step_iterator(T x) :m_iter(x) {}
    step_iterator(this_type const& other) = default;        //拷贝构造，使用default
    this_type& operator=(this_type const& other) = default; //赋值函数


private:
    friend class boost::iterator_core_access;   //必需的友元声明


    reference dereference() const               //解引用操作
    {
        return *m_iter;
    }


    void increment()                            //递增操作
    {
        std::advance(m_iter,N);
    }


    bool equal(this_type const& other) const    //比较操作
    {
        return m_iter == other.m_iter;
    }
};


int main()
{
    char s[] = "12345678";
    std::copy(s, s + 8, std::ostream_iterator<char>(std::cout));
    step_iterator<char*> first(s), last(s + 8); //用char*迭代，默认步长2
    std::copy(first, last, std::ostream_iterator<char>(std::cout));
    return 0;
}
```


## 参考链接
- [C++自定义迭代器（STL自定义迭代器)的实现详解
](http://c.biancheng.net/view/471.html)