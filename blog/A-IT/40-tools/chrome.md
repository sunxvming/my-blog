> 小事儿用百度，大事儿用谷歌，这个大家都知道，但是google有一些高级的搜索语法和搜索技巧可能大家还不太了解，这么俺在这里就给大伙总结了一下，希望大家多多运用下面的技巧，假以时日，必能百搜百中。

## 快捷键
`ctrl + -/+` 缩写或放大,或ctrl+滚轮
`ctrl + L` 选中浏览器地址栏
`tab`   可以从地址栏的焦点移动到下一个
`ctrl + tab 或 ctrl + shift tab` 切换tab
`ctrl + t` 打开一个新tab
`ctrl + w` 关闭一个tab

## 实用的功能
### 阅读清单
添加：右键点击相应标签页 然后 添加到阅读清单
查看：点击“侧边栏”图标 ![](https://storage.googleapis.com/support-kms-prod/Pwg2wh6CWlXKeSZsQhqaYcrEAQ1rvwMfXSXx)。依次点击向下箭头然后 阅读清单。


## 好用的插件
### Vimium
```
刷新 r

【移动】
向下/上/左/右移动  j/k/h/l
向下/上跳动  d/u
回到顶/尾部  gg/G

【搜索】
搜索剪贴板关键字 在当前/新窗口  p/P
查找书签  b/B（当前/新窗口打开）
将焦点聚集在第一个输入框  gi  (2gi就是第二个输入框)

【标签】
新建tab ctrl + t
关闭tab ctrl + w
选择左/右标签 J/K  或ctrl+tab


【编辑操作】
复制当前链接 yy

```


###  Tampermonkey 
Tampermonkey  是一款免费的浏览器扩展和最为流行的用户脚本管理器

如何让脚本使用所有地址？
见下方的@match，这样可以匹配所有模式
```js
// ==UserScript==
// @name         make can copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match      http://*/*
// @match      https://*/*
// @match      file://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    console.log("can copy");
    var eles = document.getElementsByTagName('*');
    for (var i = 0; i < eles.length; i++) {
        eles[i].style.userSelect = 'text';
    }
})();
```

## 搜索技巧
### 关键词的逻辑关系
* and
xx 空格 xx，关键字越多越精确，要善于总结关键字,一般也是最常用的技巧
* or
xx OR xx， OR 一定要【大写】
* not
xx -xx， （-后面没有空格）从搜索结果中排除特定字词，如： android 网络定位时 -GPS， 搜索结果不带GPS
* 近义词
~ 紧挨着关键词之前放波浪号 ~ 表示搜索同义词。
有了这个功能，你就不必用 OR 写一堆关键词。因为 Google 是足够聪明的，知道哪些词汇是近义词。 如： ~college
### 括号的使用
如果你需要混用上述几种语法，就得考虑使用括号——看起来清晰而且不容易搞错不同语法的优先级。
举例：
关键词1 关键词2 (关键词3 OR 关键词4)

### 用通配符 * 进行模糊匹配
如：神舟\*号
星号也可以配合刚才提到的 site: 语法一起使用
关键词 site:sina.com.\* \*可以是cn hk tw

### 精确搜索
所谓的精确搜索，就是采用某些特定语法，尽量缩小搜索结果的范围，使结果更加符合自己的预期

* **限定关键词的排列**
使用"" 搜索完全匹配的结果， "关键字"，通过给关键字加双引号的方法，得到的搜索结果就是完全按照关键字的顺序来搜，以此来排除搜索选项。
如：android 网络定位， 会出来android 网络定位，但顺序先后不固定，加上双引号关键词顺序就固定了

* **限定搜索的网站**
在相应网站或网域前加上“site:”。例如：site:youtube.com 或 site:.gov。 如： unity site:zhihu.com
还可以限制网站的目录名 例如：site:sunxvming.com/articles

* **限定搜索的网页元素**
1. 只搜索标题
用如下语法，要求 关键词2 必须在标题中，关键词1 可以在任何网页的地方
关键词1 intitle:关键词2
用如下语法，则要求两个关键词都在标题中
allintitle:关键词1 关键词2
出现在title中的结果质量一般会更高
2. 只搜索网页正文
语法同上，使用 intext: 和 allintext: 语法。
3. 只搜索网页的 URL 网址（网页的网址，就是你在浏览器地址栏里面看到的那串）
语法同上，使用 inurl: 和 allinurl: 语法。
4. 只搜索网页中的超链接,（使用此语法，只搜索网页中可以点击的链接的文字）
语法同上，使用 inanchor: 和 allinanchor: 语法。

* **限定文件格式**
使用filetype指定文件类型 如： 深入理解android filetype:pdf 完美世界 研报 filetype:pdf 注：只有Google支持的filetype才可用，比较常用的文件格式有：pdf、doc、rtf、ppt、xls



### 禁用“国别重定向”
Google 通常会根据“发起搜索的 IP 地址”来进行“国别重定向”。
比如：天朝的网民不翻墙直接访问 Google 搜索，就会被重定向到 Google 的香港站点；或者给你重定向到google.cn上，感觉上就想是上了个假的google。
要想禁止国别重定向可以点击如下网址http://www.google.com/ncr
ncr=no country redirect不做国家跳转

### 使用加密搜索
Google 大概是在 2011 年开始提供基于 HTTPS 的加密搜索。在那之前，主流的搜索引擎都是明文搜索的。
为啥 Google 要提供 HTTPS 的加密搜索捏？主要目的是：避免你的搜索行为被别人监控。
加密搜索后
1. 你在搜索引擎上搜了哪些关键字，监控者是看不到的
2. 搜索引擎返回给你的查询结果，监控者是看不到的
不过现在google和百度都是默认https的连接，都是加了密的，如果浏览器网址旁边有个小锁子说明就是加密的连接
* 加密搜索能规避浏览器的监控吗？
答案是：不能！
前几年 360 浏览器就被曝光过严重的用户隐私问题。它的行为很恶劣，会把用户访问的每一个网址都收集下来，然后发送到 360 自己的服务器上。这种情况下，加密搜索是帮不了你的。因为浏览器可以直接拿到地址栏里面的内容（也就是网址）。如果你使用搜索引擎，那么，根据相应的网址就可以判断出你输入了哪些搜索关键字。

### 技术搜索
- 如果想要知道某个技术的大概资料，可以在技术前面加上 `awesome` ，比如 `awesome emacs`
- 如果想要知道一些常规的命令行操作，可以使用 `cheat sheet` ，比如 `emacs cheat sheet`

### 其他搜索技巧
* 搜索图片
图片可以加筛选器进行各种条件的筛选
* 以图搜图
可以支持url 和图片上传
* 搜索论文用google学术
搜索的时候可以选择作者什么的以缩小范围


