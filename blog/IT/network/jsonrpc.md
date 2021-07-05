jsonrpc协议描述官网：   https://www.jsonrpc.org/


* 用curl请求jsonrpc
```
curl  -d '{"jsonrpc": "2.0", "id":"curltest", "method": "jsonrpc_test", "params": {"param1":"aaa"} }' -H 'content-type: text/plain;' \
http://192.168.1.11:8080
```


* 用postman请求
方式选择post，Body中选raw的方式