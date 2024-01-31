这种算法的核心思想在于模拟一个轮盘赌游戏。整个轮盘的刻度范围等于总权重，每个元素的权重决定了它在轮盘上的刻度区域。随机数的落在某个刻度区域，对应于选择了相应的元素。
也可这样模拟：每一段为一个概率区间，可以看作一个小球从天上落下来，看落在哪个区间上。算法的核心是判断小球落在的那个区间。
那如何判断呢？
假如权重为{20, 30, 50}，权重区间为`| 20 |   30   |     50      |`随机值为25。那就是落到了第二个区间。从头开始遍历概率区间，累加每个元素的权重值，判断累加值是否超过或等于随机数生成的随机数。首次超过的就是随机到的概率区间。
```lua
--返回权重随机区间 r=math.weight({20, 30, 50})20%=1,30%=2,50%=3
function math.weight( ratetb )
 if #ratetb == 1 then return 1 end
 local ttr = 0
 for _, v in ipairs( ratetb ) do
  ttr = ttr + v
 end
 local rr = math.random( ttr )
 local count = 0
 for i, v in ipairs( ratetb ) do
  count = count + v
  if count >= rr then
   return i
  end
 end
end
```





