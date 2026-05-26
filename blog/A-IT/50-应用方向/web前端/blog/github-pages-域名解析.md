# 一、A 记录方式（根域名）

例如：

```text
sunxvming.cn
    A
→ 185.199.108.153
```

加入 HTTPS 后，完整链路：

```text
浏览器访问：
https://sunxvming.cn
        ↓
DNS 查询：
sunxvming.cn 的 IP 是什么？
        ↓
DNS 返回：
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
        ↓
浏览器连接：
185.199.xxx.xxx:443
        ↓
TLS 握手（HTTPS）
        ↓
浏览器发送 SNI：
sunxvming.cn
        ↓
GitHub Pages 返回：
sunxvming.cn 的 HTTPS 证书
        ↓
TLS 建立成功
        ↓
浏览器发送 HTTP 请求：
Host: sunxvming.cn
        ↓
GitHub Pages 根据 Host 找到你的博客
        ↓
返回网页内容
```

---

# 二、CNAME 方式（www 子域名）

例如：

```text
www.sunxvming.cn
    CNAME
→ sunxvming.github.io
```

加入 HTTPS 后：

```text
浏览器访问：
https://www.sunxvming.cn
        ↓
DNS 查询：
www.sunxvming.cn 的 IP 是什么？
        ↓
DNS 返回：
CNAME → sunxvming.github.io
        ↓
浏览器继续查询：
sunxvming.github.io 的 IP 是什么？
        ↓
GitHub DNS 返回：
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
        ↓
浏览器连接：
185.199.xxx.xxx:443
        ↓
TLS 握手（HTTPS）
        ↓
浏览器发送 SNI：
www.sunxvming.cn
        ↓
GitHub Pages 返回：
www.sunxvming.cn 的 HTTPS 证书
        ↓
TLS 建立成功
        ↓
浏览器发送 HTTP 请求：
Host: www.sunxvming.cn
        ↓
GitHub Pages 根据 Host 找到你的博客
        ↓
返回网页内容
```

---

# 三、HTTPS 比 HTTP 多了什么？

相比普通 HTTP：

```text
浏览器
↓
TCP连接
↓
直接发 HTTP 请求
```

HTTPS 会多一层：

```text
TLS 握手
```

即：

```text
TCP连接
↓
TLS 握手
↓
验证证书
↓
协商加密密钥
↓
再发送 HTTP 请求
```

---

# 四、SNI 是 HTTPS 能共享 IP 的关键

HTTPS 时代最大的变化是：

服务器必须在 TLS 阶段就知道：

```text
你访问的是哪个域名
```

否则：

服务器不知道该返回哪个证书。

所以现代浏览器会在 TLS 握手时发送：

```text
SNI (Server Name Indication)
```

例如：

```text
SNI: www.sunxvming.cn
```

GitHub Pages 才知道：

```text
应该返回：
www.sunxvming.cn 的证书
```

---

# 五、Host 与 SNI 的区别

很多人容易混。

实际上：

|阶段|字段|作用|
|---|---|---|
|TLS 阶段|SNI|选择 HTTPS 证书|
|HTTP 阶段|Host|选择具体网站|

---

# 六、完整 HTTPS 请求实际上是这样

```text
1. DNS解析
2. TCP连接
3. TLS ClientHello
      SNI=www.sunxvming.cn
4. 服务器返回证书
5. TLS建立完成
6. HTTP请求
      Host: www.sunxvming.cn
7. 返回网页
```

---

# 七、为什么 GitHub Pages 必须“正确配置域名”才能开启 HTTPS

因为 GitHub 在签发证书前，需要验证：

```text
这个域名确实指向 GitHub Pages
```

GitHub 会检查：

- DNS 是否正确
    
- 是否解析到 GitHub IP
    
- Host 是否匹配
    
- 是否存在冲突记录
    

只有验证成功：

GitHub 才会：

- 自动申请 Let's Encrypt
    
- 自动部署证书
    

否则就会出现你看到的：

```text
Enforce HTTPS — Unavailable
```

---

# 八、最终你的网站实际上是这样的

```text
用户
 ↓
DNS
 ↓
GitHub Pages 共享IP
 ↓
TLS(SNI区分网站)
 ↓
HTTP(Host区分网站)
 ↓
你的博客
```

所以：

即使全球几百万 GitHub Pages 网站：

```text
都共享同一批 IP
```

仍然能正确工作。