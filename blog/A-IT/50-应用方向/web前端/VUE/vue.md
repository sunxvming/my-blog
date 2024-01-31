Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统。

模板,框架自定义的模板，你写好模板后框架会自动给你渲染成最终的html
  Vue把DOM给隐藏了起来，用户只需要 操作vue对象即可

双向数据绑定
  那些地方需要进行数据的绑定：
    html中标签的属性
    css的class
    标签内容
    表单元素内容
    标签中的事件
      click、select、submit...
  v-bind  属性中绑定变量
  v-on    绑定事件
  v-model 绑定表单元素

  {{}}    标签之间绑定变量
  注：每个绑定都只能包含单个表达式

组件
  自定义
  组件间的数据传递
    通过props从父组件传递到子组件
  自定义事件
  自定义指令
  组件的声明周期
    钩子函数


单页面应用
  路由
  动态路由



## 组件化应用构建
组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件**构建大型应用**。
组件其实就是对重用的组件和页面的封装



【指令】
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
```
v-bind, 用来绑定数据  
<!-- 完整语法 -->
<a v-bind:href="url"> ... </a>
<!-- 缩写 -->
<a :href="url"> ... </a>
<!-- 动态参数的缩写 -->
<a :[key]="url"> ... </a>

v-on， 用来绑定事件
<!-- 完整语法 -->
<a v-on:click="doSomething"> ... </a>
<!-- 缩写 -->
<a @click="doSomething"> ... </a>
<!-- 动态参数的缩写 -->
<a @[event]="doSomething"> ... </a>


v-model  用在表单控件元素上实现双向绑定

v-if
v-for
v-once
  当数据改变时，插值处的内容不会更新
v-html
  需要解析html结构使用v-html 
v-txt
  解析文本使用v-text
```

组件
  全局组件
    // 注册
    Vue.component('runoob', {
      template: '<h1>自定义组件!</h1>'
    })
    // 创建根实例
    new Vue({
      el: '#app'
    })
  局部组件
    new Vue({
      el: '#app',
      components: {
        // <runoob> 将只在父模板可用
        'runoob': Child
      }
    })
  父子组件的数据传递
    prop 是子组件用来接受父组件传递过来的数据的一个自定义属性。



组件的各种property (属性)
    data,methods,props...


组件的生命周期
    每个组件有自己的生命周期，用户可以在声明**周期的不同阶段**添加自己的钩子函数代码



## 计算属性
计算属性在处理一些复杂逻辑时是很有用的。就是把值的结果用方法进行了封装处理
我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。

## 监听属性watch
就是对数据的变化加一个回调函数


## 关键方法
Vue.use()  使     用加载其他组件
Vue.component()   全局注册常用组件




## vue-router使用
路由不同的页面也就是加载不同的组件。


路由的三个基本概念：
* router：它是一条路由，test按钮 => test内容，这是一条route，test1按钮 => test1内容，这是另一条路由。
* routers：它是一组路由，把上面的每一条路由组合起来，形成一个数组。[{test按钮 => test内容}, {test1按钮 => test1内容}]。
* router：它是一个机制，想当于一个管理者，它来管理路由。当用户点击test按钮时，router去routes中查找，找到对应的test内容。



在vue-router中，由两个标签<router-view>和<router-link>来对应点击和显示部分；<router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是在点击后匹配的内容显示在什么地方；<router-link>还有一个非常重要的属性to，定义点击之后跳到哪里去。



### 路由执行过程

1. 首先定义route，它是一个对象，由两部分组成：path、component；
```
const routes = [
  { path: '/home', component: Home },
  { path: '/list', component: List }
]
```


2. 创建router对路由进行管理，由构造函数new vueRouter()创建，接收routes参数，代码如下：
```
const router = new VueRouter({
  routes: routes   // 简写routers
})
```

3. 配置完成后把router实例注入到vue根实例中，开始使用，代码如下：
```
const app = new Vue({
  router
}).$mount('#app')
```

4. 执行过程：
当点击router-link标签时，会寻找它的to属性，它的 to 属性和 js 中配置的路径{ path: '/home', component: Home} path 一一对应，从而找到了匹配的组件， 最后再把组件渲染到 <router-view> 标签所在的地方。




vue中的main.js，在这里简单介绍一下：
1. main.js在渲染的时候会被webpack引入变成app.js文件。
2. app.js文件在index.html中会被引入。
3. 执行流程：项目加载的过程是index.html -> main.js -> app.vue -> index.js -> xxx.vue，如果main.js里面有钩子，会先走钩子。



代码跳转
router 会在所有Vue组件中绑定一个`$router`属性，使用 `this.$router.push`方法跳转，`$router`就是配置路由时的那个router对象

```
// 写法一
this.$router.push('/XXX/XXX全路径')

// 写法二
this.$router.push({
    path:'/XXX/XXX全路径',
})

//通过name跳转
this.$router.push({
    name:'AAAAAA',
})
```


## vuex
每一个 Vuex 应用的核心就是 store（仓库）。store基本上就是一个容器，它包含着你的应用中大部分的状态 (state)

Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。





## 怎么去看vue的项目
先从入口看，入口会由路由进行分发

