## 函数调用错误
fwrite(路径，模式）；w写模式，文件的内容就被删掉 得加a模式


## foreach循环后留下悬挂指针
在foreach循环中，如果我们需要更改迭代的元素或是为了提高效率，运用引用是一个好办法：php的引用（就是在变量或者函数、对象等前面加上&符号）
```
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
 $value = $value * 2;
}
// $arr is now array(2, 4, 6, 8)
```
这里有个问题很多人会迷糊。循环结束后，$value并未销毁，$value其实是数组中最后一个元素的引用，这样在后续对$value的使用中，如果不知道这一点，会引发一些莫名奇妙的错误:)

避免这种错误最好的办法就是在循环后立即用unset函数销毁变量：
```
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
    $value = $value * 2;
}
unset($value); // $value no longer references $arr[3]
```