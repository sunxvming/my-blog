## ziw笔记内容的存储

.ziw 文件的名称就你是笔记的标题，文件夹的名称也和你在 Wiz 中笔记目录文件夹中的名称一样，所以你不需要额外的软件就能直接在电脑中找到你自己的笔记。.ziw 文件实际上是 .zip 文件，你可以直接用解压软件解压，里面是网页文件（html）、样式文件（css）和图片，还有一些 Wiz 要用到的数据文件。html 就是你的笔记，纯明文的。所以 Wiz 不存在导出的问题，你要备份的话，只要把网络上面的笔记都同步到本地，备份那个 My Konwledge 文件夹就可以了。如果你要拿到笔记，直接在文件夹中找就可以了。




## wiz笔记markdown图片问题
wiz笔记没有做专门的图床，引用图片有两种方式，
1. 直接在md文件中插入图片，图片的保存是由wiz笔记维护的
2. 用editor.md插件中的图片上传，可以生成如下的链接
`![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/_u5FAE_u4FE1_u622A_u56FE_20210322113442.png)`



## 文件导出
wiz笔记可以导出md、html、pdf等格式的文件。
其中html文件的引用的图片是本地文件。比如：
`<img src="file:///C:/Users/sunxv/Desktop/wiz/c.c++//c零碎知识点.md_files/fa0dc94f-7b4b-44b8-ab25-04cef657d891.png"> `

wiz笔记导出的时候要从服务器重新拉取一遍，以防有的文章在本地没有的情况。

## 存在的问题

### editor.md编辑图片丢失问题
用editor.md编辑后，图片变成
`![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/_u5FAE_u4FE1_u622A_u56FE_20210322113442.png)`
链接的形式，但是查看文件的原始文件xx.md.wiz中的index_files图片目录不见了，然后图片的链接找不到图片，图片就显示不了了。




## 新的为知笔记
新版的数据文件存放的位置如下：
C:\Users\sunxv\AppData\Roaming\WizNote\Service Worker