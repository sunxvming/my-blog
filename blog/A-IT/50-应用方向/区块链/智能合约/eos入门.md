

关于eos的编译安装启动部署合约相关的东西可以参考eos官方教程的以下部分：
* [Getting Started Guide](https://developers.eos.io/welcome/latest/getting-started-guide/index)
* [Smart Contract Guides](https://developers.eos.io/welcome/latest/smart-contract-guides/index)


## 相关概念


### 账户、权限
代币是存放在账户里的，转账需要有达到转账权限权重的公钥的才可以


权限信息也是要写到区块里的，通过eos内置的合约来完成




### 交易
Action的含义很简单，它表示单个操作；
Transaction（事务）就是一个或多个 Action 的集合。




## 安装
参考eos代码中的docs文档
eos/docs/00_install/01_build-from-source/02_manual-build/03_platforms/centos-7.7.md


注意事项：
* 最低配置4核8G
* 不能用虚拟机的共享文件，因为其不支持软链接






## Nodeos


### 启动节点
```
 
./nodeos \
  -e -p eosio \
  --plugin eosio::producer_plugin  \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin 


-e [ --enable-stale-production ] 
Enable block production, even if the chain is stale
-p [ --producer-name ] arg 
ID of producer controlled by this node (e.g. inita; may specify multiple times) 
```


数据和配置文件的位置
`/root/.local/share/eosio/nodeos`




启动方式
Nodeos generally runs in two modes:
* Producing Node
* Non-Producing Node




### config.ini配置文件


插件相关配置，设置后就不用在命令行中添加插件的参数了
```
plugin = eosio::producer_plugin
plugin = eosio::chain_api_plugin
plugin = eosio::http_plugin
```






### 启动时的报错
atabase dirty flag set (likely due to unclean shutdown): replay required


run
./nodeos --replay-blockchain --hard-replay-blockchain






## cleos


### 钱包相关命令
cleos wallet list
cleos wallet create


cleos wallet open
cleos wallet lock
cleos wallet unlock


cleos wallet import
cleos wallet remove_key


cleos wallet keys








### 合约相关命令
* 编译
```
eosio-cpp hello.cpp -o hello.wasm
eosio-wasm2wast add.wasm -o add.wast
```


* 部署
```
cleos create account eosio hellohello1 EOS8jJ5J1wPkzQJTsgpC6dt1RqZBd7GxD2uTcELnJDcdPT2Qfcunz -p eosio@active
cleos set contract hello /root/contracts/hello -p hello@active
```


* 执行
```
cleos push action hello hi '["bob"]' -p bob@active
```


注意事项：
* 智能合约需要创建一个账户来部署，并且一个账号只能部署一个合约
* 账户是唯一不可以重复的










## 疑惑处
EOS通过并行链的方式，最高可以达到数百万TPS，并且并行本地链甚至可以达到毫秒级的确认速度。
并行链是什么？？




出块而不产生分叉的一个重要原因，是因为同一时刻只有一个块生产者





























































































