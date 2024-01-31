## 01｜各平台下的 Vim 安装方法：上路前准备好你的宝马


linux安装图形界面的vim
我们先执行 sudo apt update 来确保更新环境，然后使用 sudo apt install vim-
gtk3 安装 GTK3 版本的 Vim（或者其他你需要的版本）。如果你安装了图形界面的版
本，不必单独再另外安装其他版本的 Vim，因为图形版本的 Vim 也是可以纯文本启动的。
事实上，在 Ubuntu 上，vim 和 gvim 都是指向同一个应用程序的符号链接，且 gvim 的
执行效果和 vim -g 相同