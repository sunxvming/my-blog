- 安装 `sudo apt-get install fish -y`
- 启动  `fish` 
- 退出 `exit`
- 修改fish为默认终端 `chsh -s /usr/bin/fish`,    `chsh -s /bin/bash`

## 增强功能
- 彩色显示，无效命令、路径为红色，有效命令为蓝色
- 自动建议，
	- 在光标后面给出建议，表示可能的选项，颜色为灰色，按下`→`或`ctrl + F`补全，`Alt + →`部分补全
	- 按tab显示部分可选命令，再按tab显示全部命令，用tab和shift+tab进行上下切换
- 方便的配置，通过`fish_config`,可以在web界面进行shell的配置