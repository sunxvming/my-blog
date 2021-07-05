
## 什么是RST？

reStructuredText 是扩展名为 .rst 的纯文本文件，含义为"重新构建的文本"，也被简称为：RST 或 reST； 是 Python 编程语言的 Docutils 项目的一部分。 该项目类似于 Java 的 JavaDoc。 Docutils 能够从 Python 程序中提取注释和信息，格式化成程序文档。 .rst 文件类似于.md(Markdown)文件，是轻量级标记语言的一种， 被设计为容易阅读和编写的纯文本，并且可以借助 Docutils 这样的程序进行文档处理， 可以方便地转换为 HTML , Latex, Markdown 等多种格式。




## 什么是Sphinx？
sphinx是一种基于Python的文档工具，它可以令人轻松的撰写出清晰且优美的文档，新版的Python3文档就是由sphinx生成的，并且它已成为Python项目首选的文档工具，同时它对C/C++项目也有很好的支持。


## 安装
* 需要安装python
* 安装sphinx
```
pip install sphinx
```




## 使用


将rst文件转换成html文件
```
python -m sphinx -b html .  "c:\xxx\docs\_build\html"
# 或者
sphinx-build -b html sourcedir builddir
```

## vscode预览rst文件插件
- reStructuredText


## 参考链接
- [Sphinx初尝](https://zh-sphinx-doc.readthedocs.io/en/latest/tutorial.html)