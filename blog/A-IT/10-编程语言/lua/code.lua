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
