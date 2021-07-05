

## 插件系统
eos基本代码架构采用插件系统
包括插件的注册、初始化、开启、停止


插件模板：template_plugin插件要按照何种格式实现
基类插件：chain_plugin net_plugin http_plugin wallet_plugin
派生类插件：
封装类插件：xx_api_plugin  对外提供接口




1、EOS采用插件化设计，插件是一种高度解耦的设计模式，它把不同的程序功能模块独立开来，需要时再进行自由组合；


2、插件的原理是：
所有插件继承自同一个基类，这个基类会定义一系列生命周期函数，插件子类需要实现这些函数；
一般会有插件管理器来管理插件，比如注册到主程序中，或从主程序中注销；
主程序也会定义一系列生命周期函数，这些函数内部一般是对注册了的插件进行遍历，调用它们公共接口的函数；
这样主程序和插件就绑定到了一起，主程序一个生命周期函数的调用，会让注册了的插件的对应生命周期函数都得到调用；
不需要使用插件时可以注销，这样就实现了即插即用的灵活设计。


3.plugin的生命周期
    注册（register_plugin）
    配置（set_program_options）   设置命令行参数
    初始化（plugin_initialize）
    启动（plugin_startup）
    关闭（plugin_shutdown）




application类就是一个插件管理器，它定义了一组管理插件的函数：register_plugin()、find_plugin()、get_plugin()等；


application::register_plugin
    new出plugin并放到plugins的map中，注册依赖的插件register_dependencies












## 源码


### 服务器端如何注册http请求的响应
```
http_plugin::add_api
    add_handler
        my->url_handlers[url] = my->make_app_thread_url_handler(priority, handler);




http_plugin::plugin_startup
    application::post( int priority, Func&& func ) 向io_serv中添加任务
        http_plugin_impl::create_server_for_endpoint
            websocketpp::server::set_http_handler
                http_plugin_impl::handle_http_request
                    1.得到请求的url并找到其handler
                    2.得到http的请求体并调用相应的handler处理http请求
```






```
chain_api_plugin
    plugin_startup  主要注册http rpc方法
```










### cleos和nodeos交互
```
get_info()
    call(url, get_info_func).as<eosio::chain_apis::read_only::get_info_results>();
        eosio::client::http::do_http_call(*sp, fc::variant(v), print_request, print_response );
            do_connect(socket, url);       asio连接
            do_txrx(socket, request, status_code);    asio socket发送http协议包，接收http响应包并解析
```




### keosd
```
wallet_plugin
    wallet_manager  主要实现逻辑在这个里面
wallet_api_plugin
    注册http接口处理方法
http_plugin
    1.监听http接口
    2.注册http接口
```






【net_plugin】
```
根据p2p-listen-endpoint启动监听
根据p2p-peer-address连接peer节点
    connection::connect
        boost::asio::async_connect
            c->start_session()
                connection::start_read_message()
                    boost::asio::async_read
                        conn->process_next_message(message_length)
```






## 基础合约


eosio.bios
通过这个合约，可以控制其它账户的资源分配和权限。
setprods 用来设置区块生产者（bp）节点。


检测、设置指定账户的权限；
限制指定账户或全局的资源使用；
设置区块生产者。




msig  多签，系统更新的时候需要2/3+1的BP节点多签

























