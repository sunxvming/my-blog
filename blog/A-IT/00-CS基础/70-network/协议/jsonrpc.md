jsonrpc协议描述官网：   https://www.jsonrpc.org/

A light weight remote procedure call protocol.
It is designed to be simple!


* 用curl请求jsonrpc
```
curl  -d '{"jsonrpc": "2.0", "id":"curltest", "method": "jsonrpc_test", "params": {"param1":"aaa"} }' -H 'content-type: text/plain;' \
http://192.168.1.11:8080
```


* 用postman请求
方式选择post，Body中选raw的方式



## JSON-RPC 协议字段描述

### 请求（Request）

| 字段 | 类型 | 是否必须 | 说明 |
|---|---|---|---|
| jsonrpc | string | 是 | JSON-RPC 协议版本，通常为 `"2.0"` |
| method | string | 是 | 要调用的远程方法名 |
| params | object / array | 否 | 调用方法的参数，可以是对象或数组 |
| id | string / number / null | 否 | 请求编号，用于匹配响应结果 |


### 成功响应（Success Response）

| 字段 | 类型 | 是否必须 | 说明 |
|---|---|---|---|
| jsonrpc | string | 是 | JSON-RPC 协议版本，通常为 `"2.0"` |
| result | any | 是 | 方法调用成功后的返回结果 |
| id | string / number / null | 是 | 与请求中的 id 保持一致 |


### 错误响应（Error Response）

| 字段 | 类型 | 是否必须 | 说明 |
|---|---|---|---|
| jsonrpc | string | 是 | JSON-RPC 协议版本，通常为 `"2.0"` |
| error | object | 是 | 错误对象 |
| id | string / number / null | 是 | 与请求中的 id 保持一致 |


## error 对象字段

| 字段 | 类型 | 是否必须 | 说明 |
|---|---|---|---|
| code | int | 是 | 错误码 |
| message | string | 是 | 错误描述 |
| data | any | 否 | 附加错误信息 |


## 常见标准错误码

| 错误码 | 名称 | 说明 |
|---|---|---|
| -32700 | Parse error | JSON 解析错误 |
| -32600 | Invalid Request | 非法请求 |
| -32601 | Method not found | 方法不存在 |
| -32602 | Invalid params | 参数错误 |
| -32603 | Internal error | 内部错误 |
| -32000 ~ -32099 | Server error | 服务端自定义错误 |


正常情况：
```
--> {"jsonrpc": "2.0", "method": "subtract", "params": {"minuend": 42, "subtrahend": 23}, "id": 3}
<-- {"jsonrpc": "2.0", "result": 19, "id": 3}
```


异常情况
```
--> {"jsonrpc": "2.0", "method": "subtract", "params":
<-- {"jsonrpc": "2.0", "error": {"code": -32700, "message": "Parse error"}, "id": null}
```

```
--> {"jsonrpc": "2.0", "method": 1, "params": "bar"}
<-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
```

```
--> {"jsonrpc": "2.0", "method": "foobar", "id": 1}
<-- {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": 1}
```