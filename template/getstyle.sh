#/bin/bash

src=$1
style="style.css"

while [ "`dirname ${src}`" != "." ]
do
    style=../${style}
    src=`dirname ${src}`
done

#echo ${style}
sed -i -e "s,style\.css,${style},g" $1
