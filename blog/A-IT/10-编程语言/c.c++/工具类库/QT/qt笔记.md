

## Qt-creator
F4    头/源文件切换
F1    查看帮助文档



## 界面编程
两种风格的编程方式：
1. 命令式的
2. 声明试的



## qt功能

### 定时执行功能

#### 使用QTimer类
使用：只需创建一个 QTimer 类对象，然后调用其 start() 函数开启定时器，此后 QTimer 对象就会周期性的发出 timeout() 信号。


#### 利用事件 timerEvent

① 重写 `void timerEvent(QTimerEvent *event);`
② 启动定时器 `startTimer(1000)`，单位是毫秒
③ startTimer 的返回值是定时器的唯一标识，可以用startTimer启动多个timer，然后在timerEvent中使用 `event->timerId()` 做比较，看当前执行的是那个timer的事件




## 相关博文

[API设计原则 – Qt官网的设计实践总结 | 酷 壳 - CoolShell](https://coolshell.org/articles/18024.html)