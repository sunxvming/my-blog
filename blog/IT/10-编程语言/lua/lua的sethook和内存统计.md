> 本文通过lua的debug.sethook()和collectgabage()的结合使用来达到统计内存的作用，以便知道自己的程序在文件的什么地方会分配大量的内存
### 什么是钩子(hook)？
顾名思义，就是用来钩东西的东西，是一个实实在在的东西。而在程序界，钩子是虚的，一般就是在某处钩个函数什么的，当某处发生了什么事件后，钩在这里的函数也会被执行。在lua里，sethook是放在debug库里的，说明它的主要功能是用来调试用的。lua里的sethook一般是钩在三种事件中的：
* 调用一个函数时
* 从一个函数内返回时
* 每当 Lua 进入新的一行时
也就是说，每当上述事件发生后事先够好的钩子函数都会被执行。lua的官方文档是这样说滴：
> debug.sethook ([thread,] hook, mask [, count])
> Sets the given function as a hook. The string mask and the number count describe when the hook will be called. The string mask may have the following characters, with the given meaning:
>
> * "c": the hook is called every time Lua calls a function;
> * "r": the hook is called every time Lua returns from a function;
> * "l": the hook is called every time Lua enters a new line of code.
### 怎么统计内存
接下来再说什么统计内存，lua里有个collectgabage()函数，调用collectgabage("count")将会返回当前所占用的内存。说到这里有没有产生灵感呢？统计内存就是统计出程序在某某处产生了多少的内存，结合上面的设置钩子的函数可以很容易想到在Lua进入新的一行时设置一个钩子函数，里面所作的内容是统计内存的增长量。用上述说的可以实现程序每执行新的一行就统计一下内存，但是还缺一个东西，那就是我怎么知道是那个代码文件的哪行呢。不怕，文件可以通过debug.getinfo来获取，行号可以通过钩子函数的第二个参数得到。详见[lua官方文档](http://www.lua.org/manual/5.1/manual.html#pdf-debug.sethook)到这里该有的东西都就有了，剩下的就是组织编写调试代码喽。
### 放码过来
```
local memStat = { }    -- 记录每一行代码的内存状况 k = [文件名--行号] v = {执行次数，内存量}
local currentMem = 0   -- 当前内存量
------------------------------
-- 钩子函数，作用是统计每行的内存增长量
------------------------------
local function RecordAlloc(event, lineNo)
    local memInc = collectgarbage("count") - currentMem
    -- 没涨内存就不统计
    if (memInc <= 1e-6) then
        currentMem = collectgarbage("count")
        return
    end
    local s = debug.getinfo(2, 'S').source
    s = string.format("%s--%d", s, lineNo )   -- 文件名--行号
    local item = memStat[s]
    if (not item) then
        memStat[s] = { s, 1, memInc }
    else
        item[2] = item[2] + 1
        item[3] = item[3] + memInc
    end
    -- 最后再读一次内存，忽略本次统计引起的增长
    currentMem = collectgarbage("count")
end
------------------------------
-- 挂上钩子
------------------------------
function RecordStart()
    memStat = { }
    currentMem = collectgarbage("count")
    debug.sethook(RecordAlloc, 'l')
end
------------------------------
-- 摘掉钩子
------------------------------
function RecordStop()
    debug.sethook()
    local sorted = { }
    for k, v in pairs(memStat) do
        table.insert(sorted, v)
    end
    table.sort(sorted, function(a, b) return a[3] > b[3] end)
    dump(sorted)
end
------------------------------
-- 测试代码
------------------------------
RecordStart()
for i = 1,1000 do
    local t1 = {1,2,3,4,5,6,7,8}
end
for i = 1,1000 do
    local t1 = {a='a',b='b',c='c',d='d',e='e',f='f',g='g',h='h'}
end
RecordStop()
```

