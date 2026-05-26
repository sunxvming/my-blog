

## PlantUml
[plantUml官网](https://plantuml.com/zh/)
uml 界的 markdown, 写起图来让人欲罢不能.
vscode有插件，插件名字：PlantUML
chrome也有插件




## startuml
StarUML是一款开放源码的UML开发工具

## vscode插件
可以使用vscode中的插件：PlantUML
插件可以预览、导出各种格式的图片

其中默认导出的png图片质量较差，可以用下面的语句进行设置

修改下默认的dpi
skinparam dpi 300

插入到 `@startuml` 和 `@enduml`之间



问题描述：
vscode使用plantuml在导出png图片时大小超过一定限制会被截取，不能输出完整的图片。

解决思路：
在运行plantuml.jar时添加参数 -DPLANTUML_LIMIT_SIZE=8129 ，将限制长度增加，从而达到导出图不被截取的目的。

解决方案：

使用快捷键ctrl+, 打开vscode设置，按图示进入setting.json
![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20240729103058.png)


## 网站
https://plantuml.com/zh/
代码中同样可以用 `skinparam dpi 150` 设置导出的图片质量


