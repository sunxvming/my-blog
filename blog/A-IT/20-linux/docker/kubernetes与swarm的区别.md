1. 资源占用。k8s要比较多。在阿里云上租的2核4G用k8s有点撑不住，什么都不干主节点和工作节点都要10%的CPU，50%的内存，就那么一直占着，难怪阿里的k8s最低的节点都是4核8G。


2. 上容器的过渡性。从实体服务器到容器可能有一个过渡期，象我在尝试应用Docker时，现在系统有不适合的地方需要考虑很多手段如何在不增加费用的情况下平滑过渡。这时swarm胜出。因其贴近原始的Docker，如redis、rabbitmq，使用Docker的端口配置可以临时将服务搬到Docker而不需改动其他服务的配置，因端口可以原封的对应，但k8s的service只能使用主机30000开始的端口。


3. 费用比。k8s需要多一些。一是因为其资源占用比较高，二是k8s默认master节点不安装pod，按高可用性要求3个master再加上worker的机器，这个费用就有点高了。我利用swarm搭建的环境只使用三台服务器，三台都作为master使用，因swarm默认master也会安装container，默认我就省了worker的费用。




## 相关链接
- [Docker Swarm vs kubernetes ](https://zhuanlan.zhihu.com/p/569264851)