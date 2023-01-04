```
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}
```
这个是在转json的时候用到的
如果一个域不是以大写字母开头的，那么转换成json的时候，这个域是被忽略的。
如果没有使用json:"name"tag，那么输出的json字段名和域名是一样的。


还有其他作用，比如：
```
type Person struct {
    Name string    `json:"name"`
    Age  int       `json:"age" valid:"1-100"`
}
```