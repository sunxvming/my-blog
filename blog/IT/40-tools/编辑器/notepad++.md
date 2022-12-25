【插件】
可以手动去notepad++插件的官方网站下载：http://sourceforge.net/projects/npp-plugins/files/
Notepad++自带了插件管理工具，Plugins -> Plugin Manager -> Show Plugin Manager-> Avaliable一栏显示当前可用的插件列表，选中你要的插件，然后点击下面的Install即可自动下载和安装。列表里的都是官方认可的插件，品质较好。当然也可以自己去网上下载插件放到目录里面去。


目录：Notepad++\plugins
插件的使用都是在插件的菜单下面
Compare   用来比较文本差异的

Explorer   目录树
NppExec   显示控制台输出的
NppAStyle  格式化代码的


【新建工程】
1."视图"->"工程"->"工程面板"

2. 在左侧工程面板上右击红色工作区，选择"增加新工程"

3.给新工程命名，并在新工程上右击，选择"从目录添加文件"
注意： 如果涉及到工程中文件的删除或者增加操作，需手动更新工程， 不能自动更新，这是Notepade++的一个缺陷吧。



【书签功能】
Ctrl+F2添加删除书签（或点击行号的位置），F2光标移动到上一个书签，Shift+F2光标移动到下一个书签。


【多视图】
tab页右击，复制到另一个视图


【列编辑】
开头的列插入， alt + c，       alt+光标


【块匹配】
选择一个括号，按Ctrl+b会跳转到与它对应的另外一半括号处。此处括号包括"("和"{"。


【颜色标记】
就是给内容用不同的颜色做标记，用法就是选择要标记的文本然后点击右键->Style token，选择一个标记即可。也可以通过点击右键选择删除颜色标记Remove style。


【将Tab转换成空格】
这个对于编写程序来说是非常有用的，一般项目里都不允许使用Tab键作为缩进而是使用空格，但是按Tab键缩进确实非常方便。在首选项->语言页面可以选择“以空格代替Tab”，同时可以配置一个Tab键替换成几个空格。这样就可以很方便的按Tab键进行缩进，按Shift+Tab进行反向缩进了。


【快捷键】
跳到某行：  ^g  
折叠所有层次： Alt+0
展开所有层次： Alt+shift+0
复制当前行： Ctrl+d
删除当前行： Ctrl+l
删除到行首： Ctrl+Shift+BackSpace
删除到行尾： Ctrl+Shift+Delete
向后回滚： Ctrl+z，
向前回滚： Ctrl+y。
下一个文档： 　Ctrl+Tab  


【正则匹配替换】
```
_sys:browse( "https://gamevip.duowan.com" )     ==》    _sys:browse( "https://gamevip.duowan.com"  ,true)

_sys:browse\((.*)\)      _sys:browse\($1 ,true\)       括号要转义

-----------------------------------
artifactprint = {all = true, id = "artifactprint", level = 210, name = _T"神器玄印", }     ==》    artifactprint =  神器玄印

\{.*_T"(.*)",      $1      大括号也要转移



type='.*?',      匹配 type='killmonster',monid=3070103,marker='mon_3070_3',num=10      ？代表是非贪婪模式的



_DSC0007.JPG  --》     ![](images/_DSC0002.JPG)
(_.*JPG)  --》  ![]\(images/$1\)
```
【运行程序】

1.打开Notepad++：
2. 按下F5，或者打开Run->Run…
3. 这一步是最关键的，将下列语句拷贝粘贴至输入框中：
cmd /k Python "$(FULL_CURRENT_PATH)" & PAUSE & EXIT   
单击Save…
注意：如果安装了lua解释器：可以修改为：cmd /k lua "$(FULL_CURRENT_PATH)" & PAUSE & EXIT
4. 在Shortcut窗口的设置：
Shortcut窗口只是为了设置运行此命令的快捷键
其中，Name可以随便输入（例如：Run Python），
快捷键也可以选择，唯一的规则就是，不要跟已经设置的冲突，否则将不会起效，而且此快捷键可以修改
，所以无须担心（例如Ctrl+F5）。
设置完以后，单击OK保存此命令。
5.关闭Run…窗口
6. 测试是否设置成功。
写下python语句 (此为python 2.x语法)：
Print“Hello World!”
7. 保存为.py
8. 在notepad++上按下 Ctrl+F5，看看结果。
二、原理：
cmd /k python "$(FULL_CURRENT_PATH)" & PAUSE & EXIT  
 
cmd /k的含义是执行后面的命令，并且执行完毕后保留窗口. (也就是说，cmd表示打开Command Prompt窗
 
口，且运行跟在/k后边的命令—python)
cmd /k python == 开始 –> 运行 –> 输入cmd –> 输入python
$(FULL_CURRENT_PATH)的含义是当前文件的完整路径，这是 Notepad++ 的宏定义
&是连接多条命令
PAUSE表示运行结束后暂停，等待一个任意按键
EXIT表示关闭命令行窗口 （如果使用 cmd /c 就可以省掉 EXIT 了。）




自动去空格
管理快捷键

 













