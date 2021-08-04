
Ajax    Asynchronous JavaScript and XML

Js会阻塞后面的js代码执行和html代码的渲染.而用异步传输数据,不会阻塞后面js代码执行和html代码的渲染.

 

* XMLHttpRequest的属性

responseText: 服务器响应的主体信息,body信息. 

responseXML: 对于大量的格式化文档,可以用XML来传输或交换,由后台程序把数据封装在XML文档时, js接收XML对象并解析该内容.

status: 是服务器的返回状态码,     例:  200,成功, 403 forbidden 禁止, 404 not found未找到 50X系列,内部服务器错误

statusText: 服务器返回的状态码,对应的文字描述

readyState: XMLHttpRequest对象自身的状态码,0,4   [0,1,4], [2,3,4]

onreadystatechange : 事件属性,绑定当XMLHttpRequest对象的状态发生变化的时候,激发的函数

 

* XMLHttpRequest的方法

open('请求方式',url, 同步/异步); false->同步, true->异步

send(null/参数), 参数的写法:k1=v1&k2=v2&kn=vn.....

setRequestHeader(key,value); 设置请求的头信息

Abort: 忽略,不要再进行下去了,到此为止

getResponseHeader: 获取响应的某个头信息

getAllResponseHeaders: 获取响应的所有头信息

 

在javascript里,如果把json格式的字符串转成数组或对象?

答: 把该字符串表达式执行一下.

把json格式的字符串,用()包起来,再eval执行一下.                用JSON对象去解析

```

xhr.onreadystatechange = function () { // json 格式

    if(this.readyState == 4) {

        var tmp = eval('(' + this.responseText + ')');

        console.log(tmp);

    }

}   

```







XMLHttpRequest例子：

```

function tel() {

    var phone = false;




    if(window.XMLHttpRequest) {

        phone = new XMLHttpRequest();

    } else {

        phone = new window.ActiveXObject('Microsoft.XMLHttp');

    }

    return phone;

}




function chkuser() {

    var un = document.getElementsByName('username')[0];

    var uri = 'finduser.php'; // 号码

    var cu = document.getElementById('cu');

    // 造手机

    var nokia = tel();

    if(nokia == false) {

        alert('浏览器不支持ajax');

        return;

    }

    // 拨号,POST

    // 第3个参数代表同步,false/异步 true

    nokia.open('POST',uri,false);

    

    nokia.onreadystatechange = function () {

        // 当手机的状态 readyState==4的时候,才说明对方正常回应了.

        if(nokia.readyState == 4) {

            // 读取短信内容(响应内容)

            // alert(nokia.responseText);

            if(nokia.responseText == 0) {

                cu.innerHTML = '<font color="green">用户名可用</font>'

            } else {

                alert (nokia.responseText);

                cu.innerHTML = '<font color="red">用户名不可用</font>'

            }

        }

    }

    // 发送,就是按k1=v1&k2=v2&k3=v3这个形式拼接起来就可以了.

    // 注意:当POST请求,要加上下一行,即声明http请求的头信息.

    nokia.setRequestHeader('content-type','application/x-www-form-urlencoded');

    nokia.send('username=' + un.value);

}

</script>




</head>

    <body>

        <h2>ajax验证用户名</h2>

        <input type="text" name="username" onblur="chkuser()" /><span id="cu"></span>




    </body>

</html>

```







Ajax完成jsonp

```

$("#getJsonpByJquery").click(function () {

    $.ajax({

        url: 'http://localhost:2701/home/somejsonp',

        dataType: "jsonp",

        jsonp: "callback",

        success: function (data) {

            console.log(data)

        }

    })

})

```

　　

