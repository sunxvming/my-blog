

## 简介
Pandoc 的作者是 [John MacFarlane](http://johnmacfarlane.net/)，他是加州大学伯克利分校的哲学系教授。Pandoc 使用 [Haskell](http://www.haskell.org/) 语言编写，被作者用来生成讲义、课件和网站等。该程序开源免费，目前以 GPL 协议托管在 [Github 网站](https://github.com/jgm/pandoc)上。






## 安装
```
sudo yum install pandoc
# 如果想输出PDF，可以安装TeX Live
sudo yum install texlive




sudo apt install pandoc
# 如果想输出PDF，可以安装TeX Live
sudo apt install texlive
```


## 使用


```
# 通用格式
pandoc <files> <options>


# markdown转html
# -s：生成有头尾的独立文件（HTML，LaTeX，TEI 或 RTF），比如html会带有<html><header><body>标签
pandoc input.md -c style.css  -f markdown -t html -s -o input.html


# 指定css样式文件
pandoc demo.md -c style.css -o demo.html
pandoc input.md -c github-pandoc.css  -f markdown -t html -s -o input.html




# 其他参数
-f <format>、-r <format>：指定输入文件格式，默认为 Markdown；


-t <format>、-w <format>：指定输出文件格式，默认为 HTML；


-o <file>：指定输出文件，该项缺省时，将输出到标准输出；


--highlight-style <style>：设置代码高亮主题，默认为 pygments；


-s：生成有头尾的独立文件（HTML，LaTeX，TEI 或 RTF）；


-S：聪明模式，根据文件判断其格式；


--self-contained：生成自包含的文件，仅在输出 HTML 文档时有效；


--verbose：开启 Verbose 模式，用于 Debug；


--list-input-formats：列出支持的输入格式；


--list-output-formats：列出支持的输出格式；


--list-extensions：列出支持的 Markdown 扩展方案；


--list-highlight-languages：列出支持代码高亮的编程语言；


--list-highlight-styles：列出支持的代码高亮主题；


-v、--version：显示程序的版本号；


-h、--help：显示程序的帮助信息。




```







