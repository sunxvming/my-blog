#!/bin/bash

date=`date -d '-1 day' +%Y%m%d`
filename=/data/td-agent/gamelog/kbzy-mysql.log.$date.log
workdir=/data/task/roleinfo
destfilename=$workdir/tmp/roleinfo.${date}.log
importcmd="LOAD DATA INFILE '${destfilename}' INTO TABLE roleinfo.roleinfo character set utf8 fields terminated by ',' lines terminated by '\n' (sid,channel,oldsid,dept,machine,uid,roleid,user,rolename,prof,vip,level,jjlv,nuyin,nuyis,diamond,coin,liquan,fusion_coin,purple,orange,red,rongyu,chengjiu,power,isgm,rmb,regtime,exp,club,ism,attbasic,phydef,magdef,attelement,flamedef,thunderdef,frozendef,toxindef,lastlogin) SET time = unix_timestamp('${date}');"

awk -F[=\&] '/roleinfo/  {print $4,$8,$10,$12,$14,$16,$18,$20,$22,$24,$26,$28,$30,$32,$34,$36,$38,$40,$42,$44,$46,$48,$50,$52,$54,$56,$58,$60,$62,$64,$66,$68,$70,$72,$74,$76,$78,$80,$82,$84}'   OFS=","  $filename  >> $destfilename

#sleep 1h
#记录一下load data执行的命令是啥
echo $importcmd >> $workdir/roleinfoerr.log
/usr/local/mysql/bin/mysql -uroot -ps5UK52SlF31W#j5O -e "$importcmd"   #quotation marks must added
#记录一下最终的结果
echo $filename-----success >> $workdir/roleinfo2db.log



###############
#0 1 * * * /data/task/roleinfo/roleinfo2db.sh > /data/task/roleinfo/crontab.log 2>&1（脚本执行的输出和错误也要打印）后面一定要加回车，要不是不执行的