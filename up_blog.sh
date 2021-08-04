#!/bin/sh

# ./batch_mod_file_suffix.sh blog md.txt md
# find ./blog -name "*.md" |xargs dos2unix 
# ./change_img_url.sh
# python md_file_tree.py

git add -A
git commit -m "update blog"
git push





