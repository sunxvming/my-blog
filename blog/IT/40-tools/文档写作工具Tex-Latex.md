
## [Tex/Latex](http://www.ctex.org/OnlineDocuments)


Tex是由美国著名计算机教授高德纳(Donald Ervin Knuth)编写的功能强大的排版软件。它在学术界十分流行，特别是数学、物理学和计算机科学界，很多国际知名杂志发表文章均是用Tex的改进版本Latex。Donald最早开始自行编写TEX的原因是当时十分粗糙的排版水平已经影响到他的巨著《计算机程序设计艺术》的印刷质量。他以典型的黑客思维模式，最终决定自行编写一个排版软件：TEX。


LaTeX构筑在Tex基础上，是当今世界上最流行和使用最为广泛的TeX宏集。使用LaTeX基本上不需要使用者自己设计命令和宏等，因为LaTeX已经替你做好了。即使使用者并不是很了解TeX，也可以在短短的时间内生成高质量的文档。其排版功能十分强大，对于生成复杂的数学公式，LaTeX表现的更为出色。但是其系统庞大、难学、标记冗长、太过复杂，不太容易掌握，个人常用其公式部分在轻标记语言中。


简单示例如下：


```
\documentclass[a4paper,12pt,landspace]{ctexart}
\setmainfont{Times New Roman}
\setsansfont{Arial}
\setmonofont{Consolas}
\setCJKmainfont[BoldFont=黑体,ItalicFont=楷体]{宋体}
\setCJKsansfont{黑体}
\setCJKmonofont{楷体}
\title{标题}
\author{lilei}
\date{2014.5}


\begin{document}
\maketitle
\newpage
\tableofcontents


\section{标题1}
测试段落，
\subsection{标题1.1}


\section{标题2}


\end{document}
```