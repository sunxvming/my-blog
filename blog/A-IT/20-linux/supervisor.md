【所遇到的问题】

如果使用过Laravel队列的朋友应该发现，queue:listen是线性执行的，即一个任务做完以后才会读取下一条任务。这样并不能满足我们日常的异步耗时任务处理的需求，于是有人建议启动多个queue:listen。

php artisan queue:listen && php artisan queue:listen ...
这样虽然理论上是可行的，因为在异步队列的帮助下，程序并不会出现冲突。但是由于PHP本身对内存处理的缺陷，很难保证一个长期运行在后台的程序不出现内存泄露，例如queue:listen这样的死循环程序。因此在正式环境中我们更倾向于使用多个queue:work并行执行异步队列中的任务。queue:work只是读取队首的一项任务，执行完成后即结束程序，如果没有任务也会结束程序。这个方式类似于PHP对于WEB请求的处理，不会出现内存泄露。


【特点】
Supervisor是一个**进程控制系统**，由python编写，它提供了大量的功能来实现对进程的管理。
优点：1.可并行启动多个  2.自动重启

程序的多进程启动，可以配置同时启动的进程数，而不需要一个个启动
程序的退出码，可以根据程序的退出码来判断是否需要自动重启
程序所产生日志的处理
进程初始化的环境，包括目录，用户，umask，关闭进程所需要的信号等等
手动管理进程(开始，启动，重启，查看进程状态)的web界面，和xmlrpc接口

Supervisor 是一个 C/S 模型的程序，`supervisord` 是 server 端，`supervisorctl` 是 client 端。

Supervisor服务管理的进程程序，它们作为supervisor的子进程来运行，而supervisor是父进程。supervisor来监控管理子进程的启动关闭和异常退出后的自动启动。
如果Supervisor

【下载】
```
# 以下方式都可以
yum install supervisor -y
apt-get install supervisor  -y
pip install supervisor
```
配置文件在`/etc/supervisord.conf`,`/etc/supervisord.d/`下，其中前者include后者。

若没有配置文件的话可以通过如下命令来生成配置文件：
`echo_supervisord_conf > /etc/supervisor/supervisord.conf`


【配置】
[program:laravelworker]
process_name=%(program_name)s_%(process_num)02d
command=/opt/lampp/bin/php /opt/lampp/htdocs/project/activity/gamecenter/artisan queue:work --sleep=3 --tries=1 --daemon
autostart=true
autorestart=true
user=root
numprocs=10           //启动的进程数
redirect_stderr=true
stdout_logfile=/tmp/larvaelworker.log





【Supervisor 常用命令】
supervisord -c /etc/supervisord.conf    启动
supervisorctl shutdown      关闭
supervisorctl reload        重新载入配置

supervisorctl status  查看所有进程状态
supervisorctl restart <application name> ;重启指定应用
supervisorctl stop <application name> ;停止指定应用
supervisorctl start <application name> ;启动指定应用
supervisorctl restart all ;重启所有应用
supervisorctl stop all ;停止所有应用
supervisorctl start all ;启动所有应用

注意：在新增或修改配置文件后，要使用supervisorctl update命令，使用此命令后会自动加载新的配置，并且启动该进程。



【systemctl方式启动】
systemctl enable/start/stop supervisord


【web控制界面】
```
[inet_http_server]         ; inet (TCP) server disabled by default
port=*:9001        ; (ip_address:port specifier, *:port for all iface)
username=user              ; (default is no username (open server))
password=123               ; (default is no password (open server))
```










