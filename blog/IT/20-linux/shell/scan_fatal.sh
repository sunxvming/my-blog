#!/bin/bash
shdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
gamedir=/data/sm
date=`date -d '-1 day' +%Y%m%d`
#date=`date +%Y%m%d`
logpat=${date}*
fatallog=$shdir/fatal-${date}.log
if [  -f $fatallog ];then
	rm -f $fatallog
fi
for game in `ls $gamedir`; do
	logs=${gamedir}/${game}/logs/$logpat
	grep fatal ${logs} | awk -F[" "] '{$1=$2=$3=""; print $0}'  >> ${fatallog}tmp
done
awk -F[,] '!a[$1]++{b[$1]=$0}END{for(i in a) printf "%9s %s\n",a[i],b[i]}'  ${fatallog}tmp | sort -nr  > $fatallog
rm -f ${fatallog}tmp



# awk -F[,] '{print $1,$2}' aa | awk '{print $5,$4}' | sort -nr > bb   被排序的数字要放在最前面
#
#
#
#
#
#
#