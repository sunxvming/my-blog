

## 介绍
Typora Typora 是一款支持实时预览的 Markdown 文本编辑器。界面很简洁，评价很好。
MarkdownPad 一款全功能的编辑器，被很多人称赞为Windows 平台最好用的markdown编辑器
【好用的Markdown编辑器一览】
https://www.williamlong.info/archives/4319.html



## 浏览器无法打开本地md文件

chorme浏览器的插件是：Markdown Viewer

**解决浏览器打开本地md文件变成直接下载**
换成win11后之前用的chrome的插件markdown viewer突然不能用了，如果用浏览器直接打开本地文件的话会变成直接下载了。
原因是

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20230117202228.png)
注册表中的`.md`后缀的Content Type变成了`application/md`了，修改成`text/markdown`就好了。






## markdown演示
```
[TOC]

# 一级标题
## 二级标题
### 三级标题

**粗体**
*斜体*

* 无序列表
* 无序列表 


1. 有序列表
2. 有序列表


> 引用文字



链接： [少数派](https://sspai.com)


表格
-----------------------------
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |


快状引用，比如快捷键
`Ctrl+Alt+N`


参考链接样式：数字型
---------------------------
我使用 [Google][1] 进行学术搜索多一些,使用 [百度][2]进行日常搜索多一些，很少使用[Bing][3] .
我不能一边使用 [百度搜索][2] 一边骂他不如 [Google][1]，我们需要学会的是利用资源。

[1]: https://www.google.com/ "Google"
[2]: https://www.baidu.com/ "Baidu Search"
[3]: https://cn.bing.com/ "Bing Search"


参考链接样式：字母引用型
---------------------------
早饭后，我打开 [每日英语听力][TING] 学习英语。遇到不懂的英语单词，我借助 [欧路在线词典][zxB]
查看释义并加入生词本，方便使用 [客户端][khd] 随时记忆单词。

[ting]: https://dict.eudic.net/ting "每日英语听力 - 欧路词典"
[zxb]: https://dict.eudic.net/ "《欧路词典》在线版"
[khd]: https://www.eudic.net/v4/en/app/eudic "《欧路词典》英语翻译软件官方主页"




自动链接
---------------
Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用 < > 包起来，Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，邮址的自动链接也很类似，例如：
<http://example.com/>
<address@example.com>


多媒体嵌入
--------------
<audio src="./abc.mp3" controls="controls">

```



##  参考链接
- [markdown在线编辑器](https://www.zybuluo.com/mdeditor)

