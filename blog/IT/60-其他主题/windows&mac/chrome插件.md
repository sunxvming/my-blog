

##  Tampermonkey 
Tampermonkey  是一款免费的浏览器扩展和最为流行的用户脚本管理器


如何让脚本使用所有地址？
见下方的@match，这样可以匹配所有模式
```
// ==UserScript==
// @name         can copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match      http://*/*
// @match      https://*/*
// @match      file://*/*




// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';


    console.log("can copy");
    var eles = document.getElementsByTagName('*');
    for (var i = 0; i < eles.length; i++) {
        eles[i].style.userSelect = 'text';
    }
})();
```