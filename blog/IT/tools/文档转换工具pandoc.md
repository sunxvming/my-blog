
## 简介
Pandoc 的作者是 [John MacFarlane](http://johnmacfarlane.net/)，他是加州大学伯克利分校的哲学系教授。Pandoc 使用 [Haskell](http://www.haskell.org/) 语言编写，被作者用来生成讲义、课件和网站等。该程序开源免费，目前以 GPL 协议托管在 [Github 网站](https://github.com/jgm/pandoc)上。






## 安装
```
sudo yum install pandoc
# 如果想输出PDF，可以安装TeX Live
sudo yum install texlive




sudo apt install pandoc
# 如果想输出PDF，可以安装TeX Live
sudo apt install texlive
```


## 使用


```
# 通用格式
pandoc <files> <options>


# markdown转html
# -s：生成有头尾的独立文件（HTML，LaTeX，TEI 或 RTF），比如html会带有<html><header><body>标签
pandoc input.md -c style.css  -f markdown -t html -s -o input.html


# 指定css样式文件
pandoc demo.md -c style.css -o demo.html
pandoc input.md -c github-pandoc.css  -f markdown -t html -s -o input.html




# 其他参数
-f <format>、-r <format>：指定输入文件格式，默认为 Markdown；


-t <format>、-w <format>：指定输出文件格式，默认为 HTML；


-o <file>：指定输出文件，该项缺省时，将输出到标准输出；


--highlight-style <style>：设置代码高亮主题，默认为 pygments；


-s：生成有头尾的独立文件（HTML，LaTeX，TEI 或 RTF）；


-S：聪明模式，根据文件判断其格式；


--self-contained：生成自包含的文件，仅在输出 HTML 文档时有效；


--verbose：开启 Verbose 模式，用于 Debug；


--list-input-formats：列出支持的输入格式；


--list-output-formats：列出支持的输出格式；


--list-extensions：列出支持的 Markdown 扩展方案；


--list-highlight-languages：列出支持代码高亮的编程语言；


--list-highlight-styles：列出支持的代码高亮主题；


-v、--version：显示程序的版本号；


-h、--help：显示程序的帮助信息。
```


## 碰到问题

### markdown列表无法解析
用pandoc将markdown导出成html的时候，无法解析列表，最后发现是空格格式的问题，正常的空格在notepad++中显示的为一个小点，而不正常的就啥也不显示，只是单纯的空白。最终原因是不同的空格形式导致markdown的列表无法解析。如下：
![](https://sunxvming.com/imgs/a2596fdb-317f-4c7c-80c5-b4c19f2bb851.png)



### pandoc1.x和pandoc2.x对于markdown格式的区别
用pandoc1.x将markdown导出html的时候格式没问题，用pandoc2.x导出的时候标题无法识别。原因如下：
Pandoc中支持扩展修订版本的Markdown语法
* 使用pandoc中支持的Markdown语法用 `-f markdown`
* 使用标准Markdown语法用 `-f markdown_strict`

Pandoc所支持的语法各种对标准Markdown语法的扩展可以通过在格式后以`+EXTENSION`添加或`-EXTENSION`去除，如：
* `-f markdown-footnotes` 表示识别除了footnotes扩展之外的所有pandoc Markdown语法
* `-f markdown_strict+footnotes+pipe_tables` 表示识别标准Markdown语法加上footnotes和pipe_tables扩展语法

最终改为`--from=markdown_mmd+hard_line_breaks`的形式就可以了。



