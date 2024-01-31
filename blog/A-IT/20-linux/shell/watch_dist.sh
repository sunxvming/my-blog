#!/bin/sh
#自动删除disk文件和数据库中的表分区
output=`df -H | grep /data | awk '{ print $5 " " $1 }'`

usep=$(echo $output | awk '{ print $1}' | cut -d'%' -f1  )
if [ $usep -ge 60 ]; then
	/opt/lampp/bin/php /root/phpscript/deletepart.php

	logdir=/data/td-agent/gamelog
	i=0
	for file in `ls $logdir`;do
		if [ $i -eq 3 ];then
			break
		fi
		#echo $logdir/$file
		rm -f $logdir/$file
		i=`expr $i + 1`
	done
fi


#  0 1 * * * /data/task/watchdist/watchdist.sh  一点的时候执行