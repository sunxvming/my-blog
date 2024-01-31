## 单元测试
* unittest
python自带的模块
* pytest
三方模块，比自带的功能强大


## 打包
- [[PyInstaller]]

## 数据库
mysql的python客户端目前市场主流有三个
* mysqldb (mysqlclient) 是mysql官方推出基于C库来写mysql连接库，非纯python。
* mysql connector for python 是mysql官方推出的纯python实现的连接库。
* pymysql 是纯python写的主流连接库。

## 数据序列化
- [[python-protobuf]]
- pickle
	- 可以将程序运行中的对象保存为文件。如果加载保存过的pickle文件，可以立刻复原之前程序运行中的对象。