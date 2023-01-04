



## 安装Python的Protobuf包
去官网下载protobuf的源码，需要先编译出protoc
> cd `$PROTOBUF_DIR$`
> cd python
> python setup.py build
> python setup.py test
> python setup.py install


##  编译.proto文件
使用命令：
`protoc -I=$SRC_DIR --python_out=$DST_DIR $SRC_DIR/addressbook.proto`
来编译刚刚的addressbook.proto，其中，`$SRC_DIR`就是addressbook.proto的目录，因为我们使用的Python，所以用了--python_out。命令执行后，将会在`$DST_DIR`产生一个addressbook_pb2.py文件

