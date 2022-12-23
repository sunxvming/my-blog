容器虚拟化的是操作系统而不是硬件，容器之间是共享同一套操作系统资源的。虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统。因此容器的隔离级别会稍低一些。




## 概念
* Docker 镜像(Images)   
Docker 镜像是用于创建 Docker 容器的模板，比如 Ubuntu 系统。                                                                                                                                                                                                                                                            
* Docker 容器(Container)  
容器是独立运行的一个或一组应用，是镜像运行时的实体。                                                                                                                                                                                                                                                                           
* Docker 客户端(Client)
Docker 客户端通过命令行或者其他工具使用 Docker SDK (https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。                                                                                                                                                                                                         
* Docker 主机(Host)      
一个物理或者虚拟的机器用于执行 Docker  守护进程和容器。                                                                                                                                                                                                                                                                
* Docker Registry       
Docker 仓库用来保存镜像，可以理解为代码控制中的代码仓库。


* Docker Hub([https://hub.docker.com](https://hub.docker.com/)) 
提供了庞大的镜像集合供使用。一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。
          






## 安装
使用官方安装脚本自动安装
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```


启动docker
```
systemctl enable docker
systemctl start docker
```


安装Docker Compose
Linux 上我们可以从 Github 上下载它的二进制包来使用，最新发行的版本地址：https://github.com/docker/compose/releases。
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```






## 使用
```
# 前台运行
docker run ubuntu:15.10 /bin/echo "Hello world"


# 交互式的运行
docker run -i -t ubuntu:15.10 /bin/bash


# 后台运行
docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"


# 后台运行，并绑定端口 -P
docker run -d -P training/webapp python app.py


# 后台运行，并绑定指定端口，--name可以指定名字
docker run -d -p 5000:5000  --name webapp training/webapp python app.py
```






## 常用命令
```
Docker Hub  https://hub.docker.com/


docker image ls
    列出镜像


docker pull ubuntu
    拉取最新版本的镜像
docker rmi ubuntu
    删除镜像


创建镜像
    1、从已经创建的容器中更新镜像，并且提交这个镜像
    2、使用 Dockerfile 指令来创建一个新的镜像






docker ps
docker logs -f 容器ID/容器名
    查看容器内的标准输出
docker stop  容器ID/容器名
docker start 容器ID/容器名
docker restart 容器ID/容器名


docker attach
    进入在后台运行的容器，果从这个容器退出，会导致容器的停止
docker exec
    docker exec -it 243c32535da7 /bin/bash， 进入在后台运行的容器，如果从这个容器退出，容器不会停止
docker import/export
    导入/导出容器
docker rm -f 容器ID/容器名
    删除容器,删除容器时，容器必须是停止状态，否则会报如下错误
docker top 容器ID/容器名
    查看容器内的进程    
```








## 参考链接
- [docker/getting-started](https://github.com/docker/getting-started)


- [容器技术原理(一)：从根本上认识容器镜像](https://waynerv.com/posts/container-fundamentals-learn-container-with-oci-spec/)



