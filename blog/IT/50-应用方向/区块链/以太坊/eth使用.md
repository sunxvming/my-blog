cpp-ethereum
----------------
## 相关信息
数据目录：
windows下目录
C:\Users\sunxv\AppData\Roaming\Web3
    
    
* cpp-ethereum架构：
https://ethdocs.org/en/latest/ethereum-clients/cpp-ethereum/architecture.html
    
    
* jsonrpc 接口文档    
https://ethereumbuilders.gitbooks.io/guide/content/en/index.html
    
    


## 搭建私有链


### 1.配置文件设置
见文末config.json


### 2.启动程序
./aleth --config config.json -m on -a 00b99ed83a12d5d20aae7db4168c581b6ee01d87 --no-discovery --pin --unsafe-transactions


其他命令行参数
--network-id 1108 --ipc --listen 30307 --port 30307 -d ipctest  --db-path db






## json rpc接口
* 获取账户列表
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://127.0.0.1:8545


* 得到块高度
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'  http://127.0.0.1:8545






## ethereum-console
连接到cpp-ethereum的工具，因安装过程多次失败，弃之








## 测试账户
account2
0x00b99ed83A12D5D20AAE7Db4168c581B6Ee01D87


account3
0x9ee26cD93fB26B6948500892ee75ba9399927D10


account1
0x57fE2bf5d51Eed594a9c07064aaEd7410d403523






## MetaMask连接私有链
在网络设置中选择：自定义RPC




### 使用remix部署和执行合约
```
1.编写合约
2.编译合约
3.部署合约
    1.environment选择Injected Web3
    2.连接MetaMask
    3.MetaMask显示一笔部署合约交易
4.合约部署完毕
    Deployed Contracts下面显示合约的名字和地址
5.调用合约    
    在Deployed Contracts下面执行合约
6.remix中的合约如何保存在本地
    需要用到remixd
```




先看项目代码里面的doc文档




```
Dependencies
    use Hunter package manager
Database Layout
    use k-v database include three： 
        Blocks
            BlockChain class.
        Extras
        State 
            State class 
            Merkle Patricia Trie implemenation is in TrieDB.h.
```


   


交易的代码
1.普通的交易
2.创建智能合约的交易
3.执行智能合约的交易










虚拟机执行的几个相关区


栈区
内存区
storage区




nohup python3 -u init.py runserver  --host 172.19.3.68 --port 8080






## config.json
```
{
  "sealEngine": "Ethash",
  "params": {
    "accountStartNonce": "0x00",
    "maximumExtraDataSize": "0x20",
    "homesteadForkBlock": "0x00",
    "daoHardforkBlock": "0x00",
    "EIP150ForkBlock": "0x00",
    "EIP158ForkBlock": "0x00",
    "byzantiumForkBlock": "0x00",
    "constantinopleForkBlock": "0x00",
    "constantinopleFixForkBlock": "0x00",
    "istanbulForkBlock": "0x00",
    "minGasLimit": "0x5208",
    "maxGasLimit": "0x7fffffffffffffff",
    "tieBreakingGas": false,
    "gasLimitBoundDivisor": "0x0400",
    "minimumDifficulty": "0x100000",
    "difficultyBoundDivisor": "0x0800",
    "durationLimit": "0x0d",
    "blockReward": "0x4563918244F40000",
    "networkID" : "0x42",
    "chainID": "0x42",
    "allowFutureBlocks" : false
  },
  "genesis": {
    "nonce": "0x0000000000000042",
    "difficulty": "0x100000",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "author": "0x0000000000000000000000000000000000000000",
    "timestamp": "0x5A5B92D7",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x655741534d2074657374206e6574776f726b2030",
    "gasLimit": "0x989680"
  },
  "accounts": {
    "00b99ed83a12d5d20aae7db4168c581b6ee01d87": {
        "balance" : "0x200000000000000000000000000000000000000000000000000000000000000"
    }
  }
}
```

























