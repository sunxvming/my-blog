## 查看alias
`alias`查看所有alias


## 设置alias
Before beginning, create a file called **~/.bash_alias**:

```
$ touch ~/.bash_aliases
```


Then, make sure that this code appears in your **~/.bashrc** file:


```
if [ -e $HOME/.bash_aliases ]; then  
source $HOME/.bash_aliases  
fi
```


## 常用alias
```
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias cmake='cmake3'


alias ll="ls -lha"


## get rid of command not found ##
alias cd..='cd ..'

## a quick way to get out of current directory ##
alias ..='cd ..'
alias ...='cd ../../../'
alias ....='cd ../../../../'
alias .....='cd ../../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../..'
alias note='cd /mnt/d/project/other/my-blog'
```

## 在fish shell中设置alias
```
vim ~/.config/fish/config.fish
```
然后在alias复制到里面


## 参考链接
- [Bash aliases you can’t live without](https://opensource.com/article/19/7/bash-aliases)
- [30 Handy Bash Shell Aliases For Linux / Unix / MacOS](https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html)