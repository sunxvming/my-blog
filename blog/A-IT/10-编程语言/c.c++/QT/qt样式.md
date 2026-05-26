Qt 的 样 式 表 主 要 是 受 到 CSS 的 启 发 ， 通 过 调 用 QWidget::setStyleSheet() 或QApplication::setStyleSheet()，你可以为一个独立的子部件、整个窗口，甚至是整个应用程序指定一个样式表。



**选择器（selector ）**
选择特定的类，一般为一个可以定制样式表的 Qt 类。所谓的选择器可以理解为 CSS 中的选择器，他指定了一类部件进行设计。


**辅助控制器（sub-control)**
辅助控制器 一词是相对于选择器存在的，可以理解为我们选择了一个部件，例如一个QCheckBox， 这个部件它分为两个部分，文本部分和可以点击的小窗口的部分。而这个可点击的小窗口部分我们要单独的设置，就要再次分离出来，就需要::indicator(QCheckBox 有这个辅助控制器)来设置
```
QCheckBox::indicator{
	width:20px;
	height:20px;
}
```
辅助控制器是用 :: 双冒号进行指定。
如果没有::indicator 那么我们这个小例子将是对整个 QCheckBox 设置的，使用了辅助控制器
的时候就自动分离出这个小窗口，对小窗口进行设置

**属性和值**
每一个窗口部件都会有属于他们自己的属性。值, 是属性 : 后面跟随的一组数字，颜色或者是一个 bool 类型等这些我们称它为值，这些值决定了窗口部件的最终的展示效果。


**状态（pseudo-states ）**
除了辅助控制器对一个部件的分离，样式表还可以根据窗口部件的各个状态来设置窗口。
例如 hover 表示鼠标划过时的状态，例子如下：
```
QCheckBox:hover{
	color: red;
}
```


**逻辑否（！）**
有时候我们在设置某种状态的属性时，希望同时在某些非（！）的状态下设置，这个时候
我们就要用（！）来选择某种状态，比如!checked 、!has-children（没有子目录）等等


 **盒模型（ The Box Model ）**
 如果没有指定他们四个，则默认是四个重合在一起的。
 ![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20250707093540.png)

**角弧度**
窗口部件四个角弧度。radius 设置角的弧度，如 border-radius:4px;角的弧度是 4px。

**背景色和前景色**
部件的前景色用于绘制窗口部件上面的文本，可以通过 color 属性指定。
背景色用于绘制窗口部件的填充矩形，可以通过 background-color 属性指定。
背景图片使用 background-image 属性定义，它用于绘制由 background-origin 指定在盒模式
中四个区域的图片开始显示的起点位置。背景图片在盒模式域内的对齐和平铺方式可以通过
background-position 和 background-repeat 属性指定


**（# ）**
指定某一个按钮，#号后面是指定类的对象名。要知道代码才能运用。




## 参考链接
[Qt界面优化_吕世雄的技术博客_51CTO博客](https://blog.51cto.com/u_15855358/13458684)
