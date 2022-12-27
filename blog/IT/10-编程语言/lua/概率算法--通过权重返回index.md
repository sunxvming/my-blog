

每一段为一个概率区间，可以看作一个小球从天上落下来，看落在哪个区间上。


![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/3213168.png)
```

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





