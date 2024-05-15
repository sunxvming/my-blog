委托是一种存储函数引用的类型，在**事件处理编程**时有重要的用途，**本质就是函数指针进行的封装**


通俗的说，委托是一个可以引用方法的类型，当创建一个委托，也就创建一个引用方法的变量，进而就可以调用那个方法，即委托可以调用它所指的方法。




**【定义委托】**
```
delegate return_type delegate_type(param_type param1,param_type param2);
```
委托的定义非常类似于函数，但不带函数体，且要使用delegate关键字。委托定义需要指明委托名称以及一个返回类型和一个参数列表




**【声明委托变量】**
定义了委托后，就可以声明一个该委托类型的变量
```
delegate_type process;
```




**【初始化委托变量】**
```
process =new delegate_type(Multiply);
```


初始化委托变量时要把一个函数（此处Multiply为一个函数的名称）引用赋给委托变量，此函数需要具有与委托相同的返回类型和参数列表。
还可以用另一种略微简单的语法
```
process = Muiltiply;
```


**【委托的调用】**
有了引用函数的委托变量之后，我们就可以用委托变量调用Muiltiply函数；也可以把委托变量传递给其他函数
```
process(param1,param2);
```


**【代码示例】**
```
namespace Delegate
{


        public delegate int Call(int num1, int num2);//第一步：定义委托类型
        class SimpleMath
        {
            // 乘法方法
            public int Multiply(int num1, int num2)
            {
                return num1 * num2;
            }


            // 除法方法
            public int Divide(int num1, int num2)
            {
                return num1 / num2;
            }
        }
    }
    class Test
    {
        static void Main(string[] args)
        {
            Call objCall;//第二步：声明委托变量
            // Math 类的对象
            SimpleMath objMath = new SimpleMath();
            // 第三步：初始化委托变量，将方法与委托关联起来
            objCall = new Call(objMath.Multiply);


            objCall += objMath.Divide;//向委托增加一个方法
            //objCall -=  objMath.Divide;//向委托减去一个方法


            // 调用委托实例,先执行objMath.Multiply，然后执行objMath.Divide
            int result = objCall(5, 3);
            System.Console.WriteLine("结果为 {0}", result);
            Console.ReadKey();
        }
    }
}
```


**【注意事项】**
委托可以调用多个方法，即一个委托变量可以引用多个函数
无返回值的委托，引用了多少个方法就会执行多少个方法。有返回值的委托同样会执行多个引用的方法，但返回的值是最后一个方法的返回值




**【匿名委托】**
匿名委托使用起来更简洁一点，不用在定义一个专用的委托函数来传递方法，也更可以更好的理解委托


```
//定义委托
delegate string lookMe(string s);


protected void LinkButton1_Click(object sender, EventArgs e)
{
    //匿名委托
    lookMe lm = delegate(string name) { return "亲爱的 " + name + "，请看着我的眼睛！"; };


    //匿名委托调用
    string name1 = "jarod";
    Label1.Text = lm(name1);
}
```


**【内置常用委托】**
c#中给我们内置了几个常用委托`Action、 Action<T>、Func<T>、Predicate<T>`，一般我们要用到委托的时候，尽量不要自己再定义一 个委托了，就用系统内置的这几个已经能够满足大部分的需求，且让代码符合规范。


`Action`封装的方法没有参数也没有返回值，声明原型为：
```
public delegate void Action();
```


`Action<T>`是Action的泛型实现，也是没有返回值，但可以传入最多16个参数，两个参数的声明原型为：
```
public delegate void Action<in T1, in T2>(T1 arg1, T2 arg2);
```




`Func<T>`委托始终都会有返回值，返回值的类型是参数中最后一个，可以传入一个参数，也可以最多传入16个参数，但可以传入最多16个参数，两个参数一个返回值的声明原型为：
```
public delegate TResult Func<in T1, in T2, out TResult>(T1 arg1, T2 arg2);
```


`Predicate<T>`委托表示定义一组条件并确定指定对象是否符合这些条件的方法，返回值始终为bool类型，声明原型为：
```
public delegate bool Predicate<in T>(T obj);

```


**【Action举例】**
```
//普通写法
public void ExecuteA()
{
    Write();
    // A specific work
    Clear();
}

public void ExecuteB()
{
    Write();
    // B specific work
    Clear();
}
```

```
// 用上Action委托的写法
public ASpecificWork()
{
    // do A work
}

public BSpecificWork()
{
    // do B work
}

public void Execute(Action action)
{  
    Write();
    action();
    Clear();
}

Execute(BSpecificWork);
Execute(ASpecificWork);
```











