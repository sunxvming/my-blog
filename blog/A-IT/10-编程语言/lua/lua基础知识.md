## lua如何实现类
1.创建一个_class函数
    a)在函数中创建一个table，并把`__index`字段设置成自己，目的是让生成的对象把自己的原表设置成这个table
    b)继承其他类(把父类的字段都复制过来)
2.创建一个Object基类，实现一个new方法，new方法会创建一个table，并设置table的原表为当前的类，并return



## 数据结构

【table也可以做key】
原理可能是每个table都有一个唯一的码，用这个码作为table的key
```lua
local cfg = { a = 'aaa', b = 'bbb', c = 'ccc'}
local a = {}
a[cfg] = 11111
print(a[cfg])
```


注意传值的方式
local cfg = { a = 'aaa', b = 'bbb', c = 'ccc'}
local cfg2 = cfg
cfg2.a = 'ccc'        会改变cfg的值
cfg2 = {d = 'ddd'}    不会
cfg2 = 1              不会



x = 5
a = {} -- 空表
b = { key = x, anotherKey = 10 } -- 字符串作键
c = { [x] = b, ["string"] = 10, [34] = 10} -- 变量和字面量作键  , 注意：不要用未赋值的变量做key    
 
local i = {[1]=1,[2]=2,1111}
print(i[1])  -- 1111        i[2] -- 2   原因是1 被覆盖 掉了


```
a = { x = 400, y = 300, [20] = "foo" }
b = { 20, 30, 40 }
c = {[111] = 111, [222] = 222}
for key, value in pairs(c) do           ipairs 只对b有效
  print(key, value)
end
```


a = {[2] = 123, [3] = 345}
dump(#a)         索引不是从1开始的话长度就是零


Lua的table操作：
t = { 24, 25, 8, 13, 1, 40 }
table.insert(t, 50) -- 附加50
table.insert(t, 3, 89) -- 在索引3处插入89
table.remove(t, 2) -- 删除第2项
table.sort(t) -- 使用 < 运算符排序
local s = table.concat( t, '\n' )




## 变长参数
```
do 
    function foo(...) 
        for i = 1, select('#', ...) do   //get the count of the params 
            local arg = select(i, ...)   //select the param 
            print("arg", arg); 
        end 
    end 
    foo(1, 2, nil, 4); 
end  

function f(...)
    for i,v in pairs({...}) do
        print(i..'--------'..v)
    end
end

```
变长参数`unpack({...})`  如果中间有nil后边的就会被 丢弃掉



## 错误处理
【pcall】
 指的是 protected call 类似其它语言里的 try-catch, 使用pcall 调用函数，如果函数 f 中发生了错误， 它并不会抛出一个错误，而是返回错误的状态, 为被执行函数提供一个保护模式，**保证程序不会意外终止**
```lua
local success, resultOrErrorMessage = pcall( f , arg1,···)
// success: 没有错误返回 true,  有错误返回 false
// resultOrErrorMessage: 发生错误返回错误信息，否则返回函数调用返回值
```


【xpcall】
`xpcall` ，xpcall 中的 "x" 代表 "eXtended"，即扩展的意思。允许你指定一个专门用于处理错误的函数。这有助于更灵活地处理错误情况。
```lua
function myfunction ()
   n = n/nil
end
 
function myerrorhandler( err )   -- err 是异常的信息
   print( "ERROR:", err )
end
 
local success, resultOrErrorMessage =  xpcall( myfunction, myerrorhandler )
print( status, resultOrErrorMessage)
```

print(debug.traceback())   可以打印调用栈







【heredoc】
```
html = [[
<html>
<head></head>
<body>
    <a href="http://www.w3cschool.cc/">w3cschool菜鸟教程</a>
</body>
</html>
]]
```

在对一个数字字符串上进行 算术操作 时，Lua 会尝试将这个数字字符串转成一个数字:


使用 # 来计算字符串的长度，放在字符串前面，如下实例：
```lua
len = "www.w3cschool.cc"
print( #len )
print(#" www.w3cschool.cc")
```

```
t[i]  =>  t.i    
```

当索引为 字符串类型 时的一种简化写法


a, b, c = 0
print(a,b,c)             --> 0   nil   nil
上面最后一个例子是一个 常见的错误情况 ，注意：如果要对多个变量赋值必须依次对每个变量赋值。

赋值语句不会返回所赋的值 ，所以foo(a = 3)和a = b = 1导致语法错误。


x, y = y, x                     -- swap 'x' for 'y'
a[i], a[j] = a[j], a[i]         -- swap 'a[i]' for 'a[j]'


```lua
repeat
   print("a的值为:", a)
   a = a + 1
until( a > 15 )
```


^指数运算，例如10 ^ 2输出100，大多数语言中，^表示XOR。




```
_G
里面存了所有的全局变量：
a = 3
print(_G.a) -- 3
_G.b = 4
print(b) -- 4
print(_G._G == _G) -- true
```


## 命令行
命令行参数存储在arg表中，假定你有一个foo.lua脚本：
print(arg[-1], arg[0])
for i, v in ipairs(arg) do print(v) end


----------------------------
文件中的`...`
由于文件以函数的方式加载，所以我们可以用上...。假定bar.lua内容如下：
print(...) -- 输出所有传递给该文件函数的 参数
以如下语句加载：
 
loadfile("bar.lua")(1, 2, 3, 4)
输出为1 2 3 4.


## 函数
```lua
function foo()
  local x, y = something(4, 5)
  return x ^ y
end
 
function something(arg1, arg2)
  local ret1 = (arg1 * arg2) ^ 2
  local ret2 = (arg1 - arg2) ^ 2
  return ret1 + ret2, ret1 * ret2
end
```
上面的代码说明 定义函数的先后顺序 没有关系，这和C、C++等编译型语言不同。


## 正则
```
a = '<text textColor=0xffff00 text=尊貴的VIP>'
b = '<btn text=點擊查看 noboard=true textSize=14 tasktype=comactfirst arg1=$id underline=true textColor=0x00ff00 >'
```
 
-- 括号代表要匹配的内容
-- .代表任意
-- %s代表空格
-- %>特殊的字符要转义
pat = 'text=(.-)%s'    
pat1 = 'text=(.-)%>'
 
aa = string.gsub(a,pat1,'')
print(aa)
string.gsub("hello 42", "(%d+)", "%1 3") -- hello 42 3     --   %1 代表的是 被匹配的字符串
string.gsub("heLLo", "(%u)", "") -- heo


-- 4 + 4 = 8       还能传回调
string.gsub("2 + 2 = 4", "(%d)", function(s)
  return s * 2
end)
 
-- 打印每个单词
for w in string.gmatch("good morning chaps", "%w+") do
  print(w)
end

