这是fixmail的注册表
```
Windows Registry Editor Version 5.00


[HKEY_CLASSES_ROOT\mailto]
"URL Protocol"=""


[HKEY_CLASSES_ROOT\mailto\mailto]


[HKEY_CLASSES_ROOT\mailto\mailto\shell]


[HKEY_CLASSES_ROOT\mailto\mailto\shell\open]


[HKEY_CLASSES_ROOT\mailto\mailto\shell\open\command]
@="\"D:\\Program Files\\Foxmail 7.2\\Foxmail.exe\" %1"


[HKEY_CLASSES_ROOT\mailto\shell]


[HKEY_CLASSES_ROOT\mailto\shell\open]


[HKEY_CLASSES_ROOT\mailto\shell\open\command]
@="\"D:\\Program Files\\Foxmail 7.2\\Foxmail.exe\" %1"                     // 其中%1是程序的参数


```


这段代码是判断有无程序，没有的话就下载
```
<html>
<head>
<script language="javascript" src="js/jquery-1.7.2.min.js"></script>
</head>
<body>
<a href="#" id='start'>打开程序</a>


</body>
<script >
var mclient = 'http://patch.cdn.topgame.kr/mfwz_kr/mclient/topgame/ark.exe'


checkMicroTimer = null;
var window_focus = true;
$(window).focus(function() {
    window_focus = true;
    console.log('focus')
}).blur(function() {
    clearInterval(checkMicroTimer);
    window_focus = false;
    console.log('blur')
});
function click_down(){
    var url_client = "gameark://";       //这个后面可以加启动程序的参数
    window.location.href = url_client;


    if(checkMicroTimer == null)
    {
        checkMicroTimer = setInterval(function(){
            if(window_focus){
                window.location.href = mclient;
                clearInterval(checkMicroTimer);
                checkMicroTimer = null;
            }
        },1000);
    }
}
document.getElementById("start").onclick = click_down;


</script>
</html>
```


程序对应的注册表信息
```
Windows Registry Editor Version 5.00


[HKEY_CLASSES_ROOT\gameark]
"URL Protocol"=""


[HKEY_CLASSES_ROOT\gameark\gameark]


[HKEY_CLASSES_ROOT\gameark\gameark\shell]


[HKEY_CLASSES_ROOT\gameark\gameark\shell\open]


[HKEY_CLASSES_ROOT\gameark\gameark\shell\open\command]
@="\"C:\\Users\\aa\\fancy\\ark\\ark.exe\""


[HKEY_CLASSES_ROOT\gameark\shell]


[HKEY_CLASSES_ROOT\gameark\shell\open]


[HKEY_CLASSES_ROOT\gameark\shell\open\command]
@="\"C:\\Users\\aa\\fancy\\ark\\ark.exe\""
```