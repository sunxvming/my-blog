## 编译
用vcpkg包管理来编译即可，很方便。

- [osgEarth源码编译（Win10+VS2019+OSG3.6.5+osgEarth2.10.0）](https://blog.csdn.net/Alexabc3000/article/details/118882997)


OsgEarth运行时报错：
```
Fontconfig error: Cannot load default config file: No such file: (null) 
```

需要增加如下的环境变量
`FONTCONFIG_FILE`
```
D:\program\vcpkg\installed\x64-windows\etc\fonts\fonts.conf
```



如何有两个屏幕，运行osgEarth例子的时候会闪退，换成一个屏幕就可以了


## 使用
**创建osgViewer---->创建MapNode--->设置MapNode中的Map---->设置Earth操作器---->设置场景参数----->run**

- MapNode是继承自osg的Node，是osgEarth中地球节点，你所添加的影像，DEM，模型都包含在MapNode中，因为它们都加入到Map中，Map则类似二维中的Map可以添加各种图层。
- 剩余的不管是模型节点Node，或者是标注Node，还是其他的都是可以直接添加到MapNode中或者另外的Group中。
- Earth操作器则和其他osg操作器一样，只不过专门为三维地球浏览定制，具体参数可以设置。
- 场景参数则主要有自动地形裁剪，最小裁剪像素等其他优化场景的参数。



## 运行问题
Cannot find proj.db" Error
需要设置环境变量
`PROJ_LIB`: `D:\program\vcpkg\packages\proj_x64-windows\share\proj`




## 相关概念
  
CRS（Coordinate Reference System）和 SRS（Spatial Reference System）都是用于描述和定义地理空间数据坐标系统的术语。它们在地理信息系统（GIS）和地理空间数据处理中经常被提及。

### CRS（Coordinate Reference System）坐标参考系统：

CRS 是用于描述地理空间数据坐标系统的概念。它定义了在地球表面上定位点位置的方式，以及如何将地理坐标（经度和纬度）转换为投影坐标（x、y、z 等）或其他坐标系统。CRS 包括了两种主要类型：

1. **地理坐标参考系统（Geographic CRS）**：用经度和纬度描述地球表面上（球面的）的点位置，常用的经纬度坐标系就属于地理 CRS 的一种。
    
2. **投影坐标参考系统（Projected CRS）**：基于地理 CRS，通过某种地图投影方法将球面地图投影到平面上，如 UTM（通用横轴墨卡托投影）等。这种投影方式将地球上的经纬度坐标转换为平面上的 x 和 y 坐标。
    

### SRS（Spatial Reference System）空间参考系统：

SRS 是地理空间数据的参考系统，它是 CRS 的一个更宽泛的概念。SRS 不仅涵盖了 CRS，还包括了其他地理空间数据处理中的参考系统，例如大地水准面（Datum）、坐标轴方向等。

### 区别：
- **范围不同**：CRS 是描述地理坐标系统的概念，SRS 则更广泛，包括了 CRS 以及其他空间参考系统。
- **概念不同**：CRS 关注地理坐标系统（如投影方式、地理坐标），而 SRS 是一个更泛化的术语，可以涵盖更多的空间参考相关的概念。
    
在实际使用中，两者通常被交替使用，因为 CRS 是 SRS 的一个子集，描述了地理坐标系统的一部分。但需要注意的是，在特定的 GIS 应用程序或标准中，它们可能会有稍微不同的定义和用法。



## 其他类似的三维数字地球库
- CesiumJS：CesiumJS 是一个用于创建地理信息系统的JavaScript库，提供了基于WebGL的高性能三维地球和地图。它支持大规模数据可视化、地理空间分析等功能，并且在 Web 浏览器中运行。与osgEarth不同，CesiumJS是基于Web技术的。


[github：Awesome GIS.](https://github.com/sshuair/awesome-gis#data)







## 数字地图的公司

- [三维地图北京东方地博科技发展有限公司](http://www.freethtech.com/index.htm)，北京的一家公司