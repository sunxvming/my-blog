## 模拟多态
```php
<?php
class wine {
    public function adv($sub) {
        $obj = new $sub();
        $obj->adv();
    }
}


class kouzi {
    public function adv() {
        echo '生活,离不开那口子';
    }
}
class jinjiu {
    public function adv() {
        echo '劲酒虽好,不要贪杯哟';
    }
}
class erguotou {
    public function adv() {
        echo '56度,闷倒驴';
    }
}
// 在开发中,假设有两拨人,一是开发酒类广告词的,一类是广告的调用者.


// 作为调用者
// 只关心酒类,不关心酒的子类,调用酒类的广告方法
// 不关心子类如何实现的.
$owine = new wine();
$owine->adv('kouzi');


// 从开发广告词的角度看,不必理解外界调用子类.
// 开发新酒类广告词,只需要满足:和父类的方法一样,就有机会被外界所调用.


// 新增洋河
class yanghe {
    public function adv() {
        echo '洋河大典!蓝色经典';
    }
}
$owine->adv('yanghe');
?>
```

## 模拟重载
在php中，不支持重载，一个类中，根本就不可以定义多个同名方法——这直接是语法错误。
```php
// 通过PHP的魔术方法,来模拟方法重载
// 当调用不存在的方法时,__call会被自动调用, 还会自动传给__call两个参数,
// 分别代表被调用的不存在的方法名和调用时传递的参数

class sharp {
    public function __call($m,$arg) {
        $cnt = count($arg);
        if($cnt == 3) {
            // 计算3角形面积
            return $arg[0] + $arg[1] + $arg[2];
        } else if($cnt == 4) {
            return $arg[0] * $arg[1] * $arg[2] * $arg[3];
        } else {
            return '未知类型';
        }


    }
}
$sharp = new sharp();
echo $sharp->area(1,2,3,4);
```




## 单例模式
```php
<?php
// 单例第1步, 不允许类进行new操作.
// 单例模式第2步,在类内部开启一个接口,来实例化对象.
// 单例模式第3步,加判断,判断该类的实例是否已经存在.
class mysql {
    public $rand;
    public static $ins = null;

    // 没有对象存在的时候,能调用此方法.
    public static function getIns() {
        if(self::$ins) {
            return self::$ins;
        }
        self::$ins = new mysql();
        return self::$ins;
    }
    protected function __construct() {
        $this->rand = rand(10000,99999);
    }
}

$m1 = mysql::getIns();
$m2 = mysql::getIns();
print_r($m1);
print_r($m2);
```



