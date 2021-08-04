Code is read much more often than it is written.
### 一、程序的版式
#### 1.空行
* 函数与函数之间都要加空行；
* 函数内部代码概念与逻辑之间，逻辑段落小节之间，都应该加空行；
* 注释行之前。
#### 2.空格
需加空格：
关键字，运算符号，逗号","后
注释后，如： -- xxxx
不加空格：
* 函数名之后不要留空格，紧跟左括号"("；
* 左括号"(" 向后紧跟，紧跟处不留空格；
* 右括号")"、逗号","、分号";"，向前紧跟，紧跟处不留空格；
* 字符串连接符".."前后不加空格；
* "["，"]"这类操作符前后不加空格；
#### 3.长行拆分
长表达式要在低优先级操作符处拆分成新行，操作符放在新行之首（以便突出操作符）。
```
-- 良好的风格
if veryLongerVariable1 >= veryLongerVariable2
 and veryLongerVariable3 <= veryLongerVariable5
 and veryLongerVariable4 <= veryLongerVariable6 then
 doo()
end
```
#### 4.使用缩进
### 二、命名规则
#### 1.共性规则
* 命名应当直观且可拼读，可望文知意；
* "min-length && max-information"原则；
* 采用英文单词或单词组合，英文单词不要复杂，但用词需准确，切忌使用汉语拼音命名；
* 切勿为了避免命名过长而随意截取单词，以丢失可读性；
#### 2.变量命名
使用 "名词" 或是 "形容词+名词" 命名；
使用小驼峰法命名；
为了可读性，尽量避免变量名中出现标号，如value1， value2；
不要出现仅靠部分字母大小写区分的相似的变量；
除非是局部变量功能等价全局变量，不然局部变量不要与已有的全局变量同名；
```
local data          -- 良好的风格
local oldData      -- 良好的风格
local newData      -- 良好的风格
local pairs = pairs -- 良好的风格
local posx,posX    -- 不良的风格
local btn1,btn2    -- 不良的风格
local TABLE = {}    -- 不良的风格
local uILabel      -- 不良的风格
```
i,k,v,t,_常做临时变量(t 代表table, _ 代表哑变量)
#### 3.常量
单词均大写，单词用下划线("_")分割；
### 三、编码技巧
#### 1.警惕临时变量
字符串的连接 ..
由于字符串的管理机制，字符串在使用..连接时，会产生新的对象。由于lua在VM内对相同的string永远只保留一份唯一copy。
这样，所有字符串比较就可以简化为地址比较。这也是lua的table工作很快的原因之一。这种string管理的策略，跟 java 等一样，所以跟
java一样，应该尽量避免在循环内不断的连接字符串
-- 这样会生成21份string的copy，但实际上我们只需要最后那一份
local description ＝ ""
for i = 1,20 do
 description = description.."xxx"
end
如果是轻量级的简单连接还是可以使用的，因为影响不大，但要是大量的类似拼接，推荐使用string.format
#### 2.这种table传参会生成临时的table
函数传参数
```
function func({x,y})
 ...
end
```
```
function func(x,y)
 ...
end
```
这些临时构造的对象往往要到 gc 的时候才被回收，过于频繁的gc有时候正是效率瓶颈。
#### 3.警惕循环语句中table的重复创建
比如：
```
for i = 1, 100 do
 local t = {a = 'aa', b = 'bb'}
 ...
end
```
在每次循环中lua底层都会生成一张临时表，等到gc的时候才会清理掉。
把循环中的table提取到外层可以避免这种情况，比如：
```
local t = {}
for i = 1, 100 do
 t.a = 'aa'
 t.b = 'bb'
 ...
end
```
#### 4.函数的优化思考
开销大的函数，调用次数低的话，可以不做优化；
开销较小的函数，但调用频率很高，则从如何降低调用频率以及减少函数的开销两个角度去思考优化；
#### 5.提交代码的检查
提交代码前，在svn commit中验证提交的代码，去掉或注释掉无关的代码，保证提交的代码无误；
#### 6.应该尽量使用local变量而非global变量。
global 变量实际上是放在一张全局的table里的。global变量实际上是利用一个string(变量名作 key)去访问这个table。
被多次读取的 global 变量，都应该提取出来放到local变量中，以提高效率。
#### 7.善用do end
```
local v
do
  local x = u2*v3-u3*v2
  local y = u3*v1-u1*v3
  local z = u1*v2-u2*v1
  v = {x,y,z}
end
```
```
local count
do
  local x = 0
  count = function() x = x + 1; return x end
end
```
#### 8.Lua 成语
and and or may be used for terser code:
```
x = x or "idunno"
print(x == "yes" and "YES!" or x)
```
Clone a small table t (warning: this has a system dependent limit on table size; it was just over 2000 on one system):
```
u = {unpack(t)}
```
Determine if a table t is empty
```
if next(t) == nil then ...
```

