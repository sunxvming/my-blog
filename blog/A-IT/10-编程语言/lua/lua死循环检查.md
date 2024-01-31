> 从此向讨人厌的lua死循环说goodbye :)


### 容易查的死循环
像编译型的语言，如c、c++、c#、java一类的，有不错的IDE工具，再用debug模式编译时会把一些debug的信息也编译到执行文件中，借助强大的工具，很容易就可以找出死循环的位置，比如以VS下开发unity为例，当出现死循环时按以下步骤即可找出。
attach上unity进程，运行程序，走到死循环后会卡死，这时打开“调试/窗口/线程"菜单，然后点中断

![](http://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/0e41e0c3-7cb8-4e8c-9757-ea21c0716417.png)
 这时线程窗口会显示执行的线程的调用栈
![](http://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/84e7e9b5-4893-49f7-9cc9-35e079e421c5.png)
### 不好查的死循环
用lua写的程序中要是出现了死循环，一般的表现就是程序卡死或者程序未响应，而你能做的只是静静的看着它静止在哪里，或者打开任务管理器把程序给关掉。由于lua是个脚本语言，调试的工具不是太多，所以定位哪里出现死循环还是比较麻烦的。如果你凭直觉去找可能找半天也不一定能找出来。这时你会
想要是有个工具能再出现死循环的时候直接报错改多好哇！
美梦有时会成真滴，下面的代码让你从此告别死循环。
实现思路其实很简单也很朴素：统计每个循环执行的次数，如果超过一个自己设定次数比如99999次，
就自动抛错。关键是咋实现循环次数的统计呢，难到要向每个循环里都插入计数的代码吗？you are right!
有句话不知阁下听说过没
> 计算机科学领域的任何问题都可以通过增加一个间接的中间层来解决
> Any problem in computer science can be solved by anther layer of indirection


咱们就在读lua文件的时候加了一层，着一层的作用就是把原始的lua文件处理一下插入循环的计数代码，
用到的技术无非就是字符串查找替换，各位看官请看吧！
```
_G._LM = 99999
_G.LOOPDIE = function( )
 Log.fatal( '---LOOP is enter die---_LM=', _LM, debug.traceback( ) )
end
local split = function( s, delimiter )
 if ''== s then return { } end
 local t, i, j, k = { }, 1, 1, 1
 while i <= #s+1 do
  j, k = string:find(s, delimiter, i)
  j, k = j or #s+1, k or #s+1
  t[#t+1] = string:sub(s, i, j-1)
  i = k + 1
 end
 return t
end
_G.CheckLoop = function( cont, file )
 -- if not CHECKLOOP then return cont end
 local data = cont
 local replaceFor = ' local _N = 0 for '
 local replaceDo = ' do _N = _N + 1 if _N == _LM then LOOPDIE() end '
 local replaceWhile = ' local _N=1 while '
 local newdata = { }
 local t = split( data, '\n' )
 for line = 1, #t do
  local linestr = t[line]
  --for循环
  local countfor = 0
  local prefixfor = false
  local forflag = false
  local whileflag = false
  if string.find(linestr, '^for%s+') then
   countfor = countfor + 1
   prefixfor = true
  end
  for s in string.gfind( linestr, '%s+for%s+' ) do
   countfor = countfor + 1
   prefixfor = false
   if( countfor > 1 ) then
    error('please standard to for cause is one line have one for!!!!'..file.. ' line'..line)
   end
  end
  local countdo = 0
  local suffixdo = false
  if string.find(linestr, '(%s+do)$') then
   countdo = countdo + 1
   suffixdo = true
  end
  for s in string.gfind( linestr, '%s+do%s+' ) do
   countdo = countdo + 1
   suffixdo = false
   if( countdo > 1 ) then
    error('please standard to for cause is one line have one do!!!!'..file.. ' line'..line)
   end
  end
  if( countfor == 1 and countdo == 1 ) then
   local newlinestr = ''
   if prefixfor then
    newlinestr = string.gsub( linestr, '^for%s+', replaceFor)
   else
    newlinestr = string.gsub( linestr, '%s+for%s+', replaceFor )
   end
   if suffixdo then
    newlinestr = string.gsub( newlinestr, '%s+do$', replaceDo )
   else
    newlinestr = string.gsub( newlinestr, '%s+do%s+', replaceDo )
   end
   newdata[ #newdata + 1 ] = newlinestr
   forflag = true
  end
  --while循环
  local countwhile = 0
  local prefixwhile = false
  if string.find(linestr, '^while%s+') or string.find(linestr, '^%s*while%(') then
   countwhile = countwhile + 1
   prefixwhile = true
  end
  for s in string.gfind(linestr, '%s+while%s+') do
   countwhile = countwhile + 1
   prefixwhile = false
   if countwhile > 1 then
    error('please standard to while cause is one line have one while!!!'..file..' line'..line)
   end
  end
  if countfor == 1 and countwhile == 1 then
   error('please make sure for loop and while loop only one!!!!'..file..' line'..line)
  end
  if countwhile == 1 and countdo == 1 then
   local newlinestr = ''
   if prefixwhile then
    newlinestr = string.gsub(linestr, '^%s*while', replaceWhile)
   else
    newlinestr = string.gsub(linestr, '%s+while%s+', replaceWhile)
   end
   if suffixdo then
    newlinestr = string.gsub(newlinestr, '%s+do$', replaceDo)
   else
    newlinestr = string.gsub(newlinestr, '%s+do%s+', replaceDo)
   end
   newdata[ #newdata + 1 ] = newlinestr
   whileflag = true
  end
  if not forflag and not whileflag then
   newdata[ #newdata + 1 ] = linestr
  end
 end
 newdata = table.concat( newdata, '\n' )
 return newdata
end
local s = [[
for i = 1, 5 do
    for j = 1, 5 do
        print(i..j)
    end
end
]]
s = CheckLoop(s)
-- dump(s)
local ret, errmsg = loadstring(s, 'error_msg' )
if not ret then
    error(errmsg)
    return
end
ret()
```

