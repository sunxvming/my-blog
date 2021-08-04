星际文件系统IPFS（InterPlanetary File System）是一个面向全球的、点对点的分布式版本文件系统
IPFS官网：https://ipfs.io/
Filecoin官网：https://filecoin.io/
Filecoin是IPFS激励层的加密数字货币（即代币），有点类似于以太坊平台上的以太币。


## IPFS 想要做什么
在官网的有这样两个描述：
A peer-to-peer hypermedia protocol
designed to make the web faster, safer, and more open.
IPFS aims to replace HTTP and build a better Web for all of us.


当然，要完全取代 HTTP 还有一段路要走，最大的坎是怎样让‍‍主流的浏览器支持 IPFS 协议，‍‍现在是通过 HTTP 网关的方式访问 IPFS 网上面存在的文件。
未来 IPFS 能取代 Http 的话？就是通过网络浏览器里直接输入 ipfs://文件hash 访问内容，‍‍目前这种方式访问 IPFS 必须依靠浏览器插件 ipfs 伴侣， 并且这个插件的使用不广泛。
即未来期望的访问方式是这样的：
ipfs://Qme2qNy61yLj9hzDm4VN6HDEkCmksycgSEM33k4eHCgaVu


而现在通过网关访问是这样的：
https://ipfs.io/ipfs/QmdAN5UoXP9sJq1vHsBx417ykAjS4tcWWpL6GKY627jnHF


在 IPFS 的网络里，是根据内容寻址，每一个‍‍上传到 IPFS 上面去的文件、文件夹，都是以 Qm 为开头字母的哈希值，无需知道文件存储在哪里，通过哈希值就能够找到这个文件，这种方式叫内容寻址。


## IPNS
在 IPFS 中，一个文件的哈希值完全取决于其内容，修改它的内容，其相应的 Hash 值也会发生改变。这样有一个优点是保证文件的不可篡改，提高数据的安全性。 但同时我们在开发应用（如网站）时，经常需要更新内容发布新版本，如果每次都让用户每次在浏览器中输入不同的 IPFS 地址来访问更新后内容的网页，这个体验肯定是无法接受的。
IPFS 提供了一个解决方案 IPNS(Inter-Planetary Naming System)，他提供了一个被私钥限定的 IPNS 哈希 ID（通常是 PeerID），其用来指向具体 IPFS 文件哈希，当有新的内容更新时，就可以更新 IPNS 哈希 ID 的指向。说白了就是又在中间加了一层。
通过 IPNS 访问文件的方式如下：
利用插件访问：ipns://QmYM36s4ut2TiufVvVUABSVWmx8VvmDU7xKUiVeswBuTva
利用网关访问： http://127.0.0.1:8080/ipns/QmYM36s4ut2TiufVvVUABSVWmx8VvmDU7xKUiVeswBuTva


## IPFS的应用案例
* IPFS音乐播放器
IPFS音乐播放器网址：https://diffuse.sh/
GitHub地址：https://github.com/icidasset/diffuse


* IPFS视频在线播放器
号称是国内第一个IPFS应用
IPFS视频在线播放器网址：http://www.ipfs.guide/
GitHub地址：https://github.com/download13/ipfstube
可用于测试的电影视频Hash（这里只列举两部）：
神秘巨星：QmWBbKvLhVnkryKG6F5YdkcnoVahwD7Qi3CeJeZgM6Tq68
盗梦空间：QmQATmpxXvSiQgt9c9idz9k3S3gQnh7wYj4DbdMQ9VGyLh


## IPFS的安装
* IPFS Desktop
可以直接安装IPFS节点桌面管理软件来体验一下。该软件可以方便地运行和管理自己的节点，查看IPFS节点资源信息
GitHub地址：
https://github.com/ipfs-shipyard/ipfs-desktop
* Go-IPFS
https://dist.ipfs.io/#go-ipfs
如果打不开，可以试着去Github查看安装方法
GitHub地址：https://github.com/ipfs/go-ipfs




## 浏览器查看文件
https://ipfs.io/ipfs/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D
电影的可以直接在浏览器中查看，比如：
https://ipfs.io/ipfs/QmQATmpxXvSiQgt9c9idz9k3S3gQnh7wYj4DbdMQ9VGyLh








## IPFS与以太坊DApp开发实战
* IPFS与以太坊DApp结合的好处
在以太坊平台上，往区块链写入数据需要花费以太币，调用智能合约执行每一行代码的时候，都需要一定量的gas交易费。区块链存储大数据成本很高，而且不合理。
可以先将文件存储到IPFS，然后得到文件的Hash存储到以太坊区块链中。读取文件的时候，从以太坊区块链中获取文件的Hash，再通过Hash来读取IPFS网络上的文件。
使用官方提供的ipfs-api，可以很方便地在代码中操作节点将数据上传到IPFS，或者通过Hash从IPFS读取数据。


## IPFS未来
IPFS 是一项非常激动人心的技术，尽管它仍在发展的早期（区块链也是），还有很多问题需要我们一起解决，如 NAT 穿透问题，浏览器支持问题，内容存储激励问题，存储数据安全与隐私保护问题。
但是通过 IPFS + 区块链将真正创建 Web3.0 时代的应用，这是一个完全可信的、自运转（不停机）的应用，它可以做什么我不知道，我对未来充满期待。