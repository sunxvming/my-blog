
修改成腾讯云镜像源
1、命令
```
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

2. 验证命令
```
npm config get registry
```
如果返回http://mirrors.cloud.tencent.com/npm/，说明镜像配置成功。