#/bin/bash

srcs=`find -name "*.mkd"`

for s in ${srcs}
do
    echo "\033[32mChecking ${s}\033[0m"
    parent_path=`dirname ${s}`
    locallinks=`sed -n -e "s/\(.*\[.*\](\(.*\)).*\)/\2/gp" $s | grep -v "http"`
    for link in ${locallinks}
    do
        if [ ! -f ${parent_path}/${link} ]; then
            echo "\033[01;31m${parent_path}/${link} does not exsit.\033[0m"
        fi
    done
done

