#!/bin/bash
shdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#$1是文件名
zip=$shdir/$1
cfg=cfg_launch.lua
gatedir=/data/sm/gate
csdir=/data/sm/s99997

# 将服务器的包移到到执行目录
cp $zip $gatedir
cp $zip $csdir


# 修改配置文件的包名
sed -i "s/server.*zip/$1/g" $gatedir/$cfg
sed -i "s/server.*zip/$1/g" $csdir/$cfg

pkill -9 fancy
cd $gatedir
nohup ./fancy-gate &
cd $csdir
sleep 20
nohup ./fancy-sm &


