 【php数组与内存】
```
$startMemory = memory_get_usage();
$array = range(1, 100000);
echo memory_get_usage() - $startMemory, ' bytes';
```
How much would you expect it to be? Simple, one integer is 8 bytes (on a 64 bit unix machine and using the long type) and you got 100000 integers, so you obviously will need 800000 bytes. That’s something like 0.76 MBs.
 but this gives me 14649024 bytes. Yes, you heard right, that’s 13.97 MB - 18 times more than we estimated.
因为要存其他额外的信息，所以多了很多其他的空间，就是c要实现数组结构要维护其他很多的额外信息







