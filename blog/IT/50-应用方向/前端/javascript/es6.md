## import from
```
import Vue from 'vue';
相当于
import Vue from "../node_modules/vue/dist/vue.js";




import router from './router'
等效于
import router from './router/index.js'
```






1.import...from...的from命令后面可以跟很多路径格式，若只给出vue，axios这样的包名，则会自动到node_modules中加载；若给出相对路径及文件前缀，则到指定位置寻找。
2.可以加载各种各样的文件：.js、.vue、.less等等。
3.可以省略掉from直接引入。

