#!/bin/bash
# Change the filename extensions of all files in the directory $1 from $2 to $3
# 用法示例：  ./batch_mod_file_suffix.sh blog md.txt md

find $1 -name "*.$2" | sed "s/.$2\$//g" | xargs -i -t mv {}.$2 {}.$3
