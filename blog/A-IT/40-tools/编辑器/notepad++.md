【插件】
可以手动去[notepad++插件的官方网站](http://sourceforge.net/projects/npp-plugins/files/)下载
Notepad++自带了插件管理工具，`Plugins -> Plugin Manager -> Show Plugin Manager-> Avaliable`一栏显示当前可用的插件列表，选中你要的插件，然后点击下面的Install即可自动下载和安装。列表里的都是官方认可的插件，品质较好。当然也可以自己去网上下载插件放到目录里面去。


插件目录：`Notepad++\plugins`
插件的使用都是在插件的菜单下面

- Compare   用来比较文本差异的
- Explorer   目录树
- NppExec   显示控制台输出的



【书签功能】
Ctrl+F2添加删除书签（或点击行号的位置），F2光标移动到上一个书签，Shift+F2光标移动到下一个书签。


【多视图】
tab页右击，复制到另一个视图


【列编辑】
开头的列插入， alt + c，       alt+光标


【块匹配】
选择一个括号，按`Ctrl+b`会跳转到与它对应的另外一半括号处。此处括号包括"`(`"和"`{`"。


【颜色标记】
就是给内容用不同的颜色做标记，用法就是选择要标记的文本然后点击右键->Style token，选择一个标记即可。也可以通过点击右键选择删除颜色标记Remove style。


【将Tab转换成空格】
这个对于编写程序来说是非常有用的，一般项目里都不允许使用Tab键作为缩进而是使用空格，但是按Tab键缩进确实非常方便。在首选项->语言页面可以选择“以空格代替Tab”，同时可以配置一个Tab键替换成几个空格。这样就可以很方便的按Tab键进行缩进，按Shift+Tab进行反向缩进了。


【快捷键】
跳到某行：   ^g  
折叠所有层次： Alt+0
展开所有层次： Alt+shift+0
复制当前行： Ctrl+d
删除当前行： Ctrl+l
删除到行首： Ctrl+Shift+BackSpace
删除到行尾： Ctrl+Shift+Delete
向后回滚： Ctrl+z，
向前回滚： Ctrl+y。
下一个文档：　Ctrl+Tab 


【正则匹配替换】
```
_sys:browse( "https://gamevip.duowan.com" )     ==》   _sys:browse( "https://gamevip.duowan.com"  ,true)

_sys:browse\((.*)\)      _sys:browse\($1 ,true\)       括号要转义

-----------------------------------
artifactprint = {all = true, id = "artifactprint", level = 210, name = _T"神器玄印", }     ==》   artifactprint =  神器玄印

\{.*_T"(.*)",      $1      大括号也要转移



type='.*?',      匹配 type='killmonster',monid=3070103,marker='mon_3070_3',num=10      ？代表是非贪婪模式的



_DSC0007.JPG  --》    ![](images/_DSC0002.JPG)
(_.*JPG)  --》  ![]\(images/$1\)
```








