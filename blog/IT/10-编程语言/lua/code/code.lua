-------------------------------------
-- 循环打印
-------------------------------------
function print_r (t, indent)
  local indent=indent or ''
  for key,value in pairs(t) do
    io.write(indent,'[',tostring(key),']') 
    if type(value)=="table" then 
		io.write(':\n')
		print_r(value,indent..'\t')
    else 
		io.write(' = ',tostring(value),'\n')
	end
  end
end



-------------------------------------
-- 根据ascii码找到非法字符
-------------------------------------
local s = "sdfgdfg"
if s:find'[\32-\47]' or s:find'[\58-\64]' or s:find'[\91-\96]' or s:find'[\123-\127]' then
print('hahahhahahah')
end



-------------------------------------
-- 已知平面上3点求过三点多圆心和半径
-------------------------------------
local getCircle = function(x1,y1,x2,y2,x3,y3)
    local m1, n1, m2, n2, a1, b1, a2, b2, x0, y0, r
    -- p1 p2中点
    m1 = (x1 + x2) / 2
    n1 = (y1 + y2) / 2
    -- p2 p3中点
    m2 = (x2 + x3) / 2
    n2 = (y2 + y3) / 2
    -- p1 p2中垂线 y=a1x+b1
    a1 = -(x2 - x1)/(y2 - y1);
    b1 = n1 - a1*m1
    -- p2 p3中垂线 y=a2x+b2
    a2 = -(x3 - x2)/(y3 - y2)
    b2 = n2 - a2*m2
    -- 圆心 (x0,y0)
    x0 = (b2 - b1) / (a1 - a2)
    y0 = a1 * x0 + b1
    -- 半径
    r = math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0))
    -- table.dump{getCircle='getCircle',x=x0,y=y0,r=r}
    return x0, y0, r
end


-------------------------------------
-- 根据屏幕上y坐标移动距离计算圆弧上各个点的坐标
-------------------------------------
function OperationTotalCZView.SetPos(deltaY)
	-- circleY是圆心y坐标
	-- first_y
    local first_y = 0 
    local cos1 = math.sqrt(1 - (math.abs(circleY - first_y)/ridus)^2)    -- 1 - sinx^2
    local cos2 = math.sqrt(1 - (math.abs(circleY - (first_y + deltaY))/ridus)^2)

    first_y = first_y + deltaY * (cos1 + cos2)/2
    local first_radian = math.asin((first_y - circleY)/ridus)  -- 根据正弦求弧度

    local y_pos = {}  
    for i = 1, BTNUUM do
        local y = ridus * math.sin(first_radian + RADIAN*(i - 1))    --根据弧度求不同点的y坐标
        y_pos[i] = circleY + y
    end

    for i = 1, BTNUUM do
        local btn = GetWindow(i .. gBtn)
        if btn then
            local y = y_pos[i]
            local x = circleX - math.sqrt( math.abs(ridus^2 - (y - circleY )^2 ) )  -- 把y坐标带入圆方程求x坐标
            btn:setPosition(CEGUI.UVector2(CEGUI.UDim(0, x - (btn_width/2 - btn_width_offset) ), CEGUI.UDim(0, y - btn_height/2)))          
        end   
    end    
end



-------------------------------------
-- 禁掉全局的_G,以达到控制访问的作用，主要逻辑就是把_G封一层，间接的操作_G
-- 1.设置_G的metatable。在全局中添加新变量如foo = 'abc' 将走到_G元表的__newindex方法中，然后报错，若foo本来就在_G中
--  将不会走到__newindex
-- 2.创建newG变量用于保存程序中新添加的全局变量
-- 3.设置_G的key"_G"为newG。  设置之前_G._G = _G  _G._G._G = _G  设置之后_G._G = oldG
-------------------------------------
setmetatable( _G, {__newindex = function(tb, k, v)
 print('g read only!!')
end, __index = function( tb, k )
 return rawget(tb, k)
end})

local oldG = _G
local newG = setmetatable( {}, { __newindex = function(tb, k, v)
 rawset(oldG, k, v)
end, __index = function( tb, k )
 return rawget(oldG, k)
end} )

rawset( _G, "_G", newG )
_G.a = 'aaaaaa'


-------------------------------------
-- 把坐标点倒过来
-------------------------------------
function reversepoint(Path)
	local path1 = {}
	for i =1, #Path/2 do
		path1[ i * 2 - 1 ] = Path[ #Path - (i-1)*2 - 1 ]
		path1[ i * 2 ] = Path[ #Path - (i-1)*2 ]
	end 
	return path1
end	



-------------------------------------
-- 时间相关
-------------------------------------
–- 获取当前的格林尼治时间，获取当前时间的秒表示 示例：1457412434
os.time()

–- 当前日期的字符串表示 示例：03/08/16 12:47:14
os.date()

–- %x 日期，示例：03/08/16
os.date(“%x”, os.time())

–- %X 时间，示例：12:47:14
os.date(“%X”, os.time())

–- %c 日期和时间 ，示例：03/08/16 12:47:14
os.date(“%c”, os.time())
 
–- 函数os.clock返回执行该程序CPU花去的时钟秒数
os.clock()
	local x1 = os.clock()
	local s = 0
	for i = 1, 10000000 do
		s = s + i
	end
	local x2 = os.clock()
	print(string.format("cost time: %.2f\n", x2 - x1))

-- 根据当前时间计算当日24点时间(get24Time()):
function get24Time(timeNow)
    local time = timeNow --（当前时间）
    local date = os.date("*t", time )
    local next_date = {}
    next_date.year = date.year
    next_date.month = date.month
    next_date.day = date.day + 1
    next_date.hour = 0
    next_date.min = 0
    next_date.sec = 0
    local time24Today = os.time(next_date)
return time24Today --当日24点的时间

--计算两个时间戳之间的天数，使用上文的get24Time()
function getDayCounts(time_before, time_now)
    local old_time = time_before --第一个时间
    local now_time = time_now --第二个时间戳
    local old_time_to24 = get24Time(old_time)
    local day_count = math.floor((now_time - old_time_to24)/86400)
	return day_count --天数
end



