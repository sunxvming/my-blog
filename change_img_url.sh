#!/bin/sh


# 常用参数:
# -r 是递归查找，查找所有文件包含子目录
# -i 忽略大小写
# -n 是显示行号
# -l 只列出匹配的文件名


# 查找 ![](index_files
# grep "\!\[\](index_files" -rn blog

# 查找imgs
# grep grep "imgs" -rn blog

#`![]`这三个符号都需要用`\`进行转义 
# `/`符号也需要用`\`转移

# sed -i "s/\!\[\](index_files/\!\[\](https:\/\/sunxvming.com\/imgs/g" `grep "\!\[\](index_files" -rl blog`


sed -i "s/sunxvming.com\/imgs/sxm-upload.oss-cn-beijing.aliyuncs.com\/imgs/g" `grep "sunxvming.com\/imgs" -rl blog`





