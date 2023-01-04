
## 资源链接
- [laravel5.8中文文档](https://learnku.com/docs/laravel/5.8/)




## 问题
如果有报错且页面空白没有输出
1.看`php.ini`里面的display_error
2.`./config/app.php env debug=>true`
3.`storage/logs里面的权限问题`

```
chmod -R 666 logs/  # 日志文件可读可写
chmod 777 logs/     # 目录可读可写可执行
```

## 目录结构
composer.json   composer的配置文件
vendor          依赖包存放的目录

laravel依赖的包通过composer来进行管理和下载。
依赖包通过使用`composer require`命令下载到`vendor`目录下。

**Laravel 如何使用 vendor 里面的包的？**
直接在控制器中 use 你引入的 composer 包就可以了

以 QueryList 为例，在 composer 安装之后，在控制器中

```
use QL\QueryList;
```

<button class="copy-code-button ui label" style="position: absolute; top: 20px; right: 1px; display: none;">Copy</button>

包的使用

```
QueryList::get();
```


## 命令行
```
# 数据库迁移
php artisan migrate      数据库迁移（建数据库的表，数据库本身不建立，得手动建）
php artisan db:seed      数据库里面插入数据(默认 DatabaseSeeder )
php artisan db:seed --class=UserTableSeeder   指定执行某个表


# 创建数据库迁移
php artisan make:migration create_users_table --create=users
php artisan make:migration add_votes_to_users_table --table=users

# 创建seed
php artisan make:seeder UsersTableSeeder

# 创建controller
php artisan make:controller Home/UserController         命名空间要大写

# 创建model
php artisan make:model Article    也可以指定命名空间  Models\Auth

# 创建中间件
php artisan make:middleware OldMiddleware


php artisan down（up）         开启关闭维护模式

php artisan queue:work --daemon --sleep=3 --tries=1
使用队列时，如果队列的代码改了的话，需要重启一下队列的监听器，要不然的话修改是不会生效的

# 框架加速操作
php artisan config:cache     将所有的配置文件缓存到单个文件。通过此命令将所有的设置选项合并成一个文件，让框架能够更快速的加载。
```



## 路由
请求的分诊台，指导请求具体往哪里走
```
Route::get('/a/b', function () {
    return view('welcome');
});
Route::get('/', function () {
    return 'Hello World';
});
Route::match(['get','post'],'/', function () {
    return view('welcome');
});
Route::any('foo', function () {
    return 'Hello World';
});
Route::get('user/profile', 'UserController@showProfile')->name('profile');  // name是为路由的命个名
```

prefix为前缀，namespace为controller的命名空间
```
Route::group(['prefix' => 'admin','middleware' => 'auth','namespace' => 'Home'], function(){
    Route::get('/home/user', ['uses'=>'UserController@index']);
});
```


防跨网站请求伪造
```
{{ csrf_field() }}
```

## controller
请求的处理者
所在目录
```
app/Http/Controllers
```
```
$r = $Request->all();                  全部get post
$ids = $Request->get('ids');           特定get post
$request->input( 'iscopy' ),           特定get post
$name = $request->input('name', 'Sally');      默认值
$input = $request->input('products.0.name');   数组用点形式

$uri = $request->path();       得到uri
$request->is('admin/*')        uri模式判断
$url = $request->url();
$name = $request->name;            属性方式访问
$request->isMethod('post')

$request->has('name')

$input = $request->only(['username', 'password']);

$input = $request->except('credit_card');

$value = $request->cookie('name');


重定向         return redirect('act/index');
返回json信息   return response()->json(['name' => 'Abigail', 'state' => 'CA']);
下载文件       return response()->download($pathToFile, $name, $headers);


# 文件上传
$file = $request->file('photo');

if ($request->hasFile('photo')) {
    //
}
if ($request->file('photo')->isValid()) {
    //
}
$request->file('photo')->move($destinationPath, $fileName);
```

## model
查
```
# model对象直接操作
$act = Act::find($id);
Flight::all();

$Act = Act::where('id','>',0)->where('status','>=',0);
$Act->where( 'name', 'like', '%'.$name.'%' );
$actlist = $Act->orderBy('id','desc')->get();


# table对象操作
$user = DB::table('users')->where('name', 'John')->first();
DB::table('acts')->where('status','>=',0)->orderBy('id','desc')->paginate( 30 )


# sql语句直接操作
$actlist =  DB::select(
"select * from acts where ((start_time >= ? and start_time <= ?) or (end_time >= ? and end_time <= ?)) and status =99 and id !=$id",
[$act->start_time,$act->end_time,$act->start_time,$act->end_time]
);
```

添加
```
# model对象直接操作
$flight = new Flight;
$flight->name = $request->name;
$flight->save();

# table对象操作
DB::table('users')->insert([
    'name' => str_random(10),
    'email' => str_random(10).'@gmail.com',
    'password' => bcrypt('secret'),
]);
```



修改
```
$act = Act::find($id);
$act->status = 9;//等同步
$act->save( );
```



条件修改
```
App\Flight::where('active', 1)
    ->where('destination', 'San Diego')
    ->update(['delayed' => 1]);


Act::whereIn('id',$ids)->update([
     'status' => 9
]);
```


删除
```
$flight = App\Flight::find(1);
$flight->delete();
$deletedRows = App\Flight::where('active', 0)->delete();

App\Flight::destroy(1);  也是删除
```


事务
laravel 提供专门的闭包的数据库事务,可以自动回滚事务也可以手动回滚事务
```
//自动回滚事务
DB::transaction(function () {
    DB::table('users')->update(['posts' => 1]);
    DB::table('posts')->save();
});
```

若在闭包中使用外部变量，需要使用use来使用闭包外部定义的变量的.
```
public function update(Post $post)
    {
        DB::transaction(function ()use($post){
            $post->update(\request(['title','content']));
        });
    }
```


## view
```
return view(
    'act.index',
    ['actlist'=> DB::table('acts')->where('status','>=',0)->orderBy('id','desc')->paginate( 30 )
    ]
);
if (view()->exists('emails.customer')) {
```

把数据共享给所有视图

你可以选择直接写在 AppServiceProvider 或是自己生成一个不同的服务提供者来放置这些代码

你可以放置任何你想要的 PHP 代码到 Blade 显示的语法里面： 目前的 UNIX 时间戳为:
```
{{ time() }}。


{{ $name or 'Default' }}
```


```
@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>没有用户</p>
@endforelse
```
```
@include('view.name', ['some' => 'data'])
```

```
404页面要放在views/error中
在http/kernel中命名中间件

<link rel="stylesheet" href="{{ asset("assets/stylesheets/dashboard.css") }}" /> asset是从public目录下开始的
```



## 其他
```
$this->dispatch(new SyncActJob( $act->id, 'updatefeast' ));  添加任务队列

得到配置            $value = config('app.timezone');
修改配置            config(['app.timezone' => 'America/Chicago']);
抛服务器异常        abort(403, 'Unauthorized action.');
```


## 路径
一、public_path('uploads');  说明：public文件路径
二、base_path('xx');
三、app_path('xx');
四、resource_path('xx');

public目录
通常，浏览器需要直接访问的所有内容都在公共目录中。 这通常意味着:JavaScript, CSS，图像，也许是一些视频或音频文件。

resources目录
资源/资产是指那些必须首先编译或缩小的东西。 资源/资产中会有一些LESS或SASS文件它们会被编译并缩小到一个CSS文件，放到公共目录中。



使用dd()函数，将感兴趣的数据输出到浏览器上,快速查看变量的内容
```
$items = array( 'items' => ['Pack luggage', 'Go to airport', 'Arrive in San Juan']);
dd($items);
```
使用Log输出感兴趣的信息，Log信息会记录到storage/logs/laravel.log文件中，可以使用Debugbar等查看Log信息
可以使用tail -f 命令查看storage/logs/laravel.log文件中加入的log信息



## 日志
```
use Illuminate\Support\Facades\Log;

Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```


## laravel debugbar


## 自动类加载
在composer.json下面配置了要自动加载的类，如下所示：
```
    "autoload": {
        "classmap": [
            "database/seeds",
            "database/factories"
        ],
        "psr-4": {
            "App\\": "app/"
        }
    }
```
执行`composer install/require`更新自动加载，更新执行`composer dump-autoload`。composer会扫描指定目录下以.php 或.inc 结尾的文件中的 class，生成 class 到指定 file path 的映射，并加入新生成的`vendor/composer/autoload_classmap.php` 文件中。

`dump-autoload` 是用来生成自动加载的
执行 `composer dump-autoload` 后`vendor/composer/autoload_classmap.php`，会删除，然后重新建立的

