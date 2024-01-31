
## 使用Crypto++库实现AES加密
高级加密标准（英语：Advanced Encryption Standard，缩写：AES），在密码学中又称 Rijndael 加密法，是美国联邦政府采用的一种区块加密标准。


默认密钥长度
AES 可使用16，24，或32字节密钥（分别对应128，192和256位）。 Crypto++ 库缺省的密钥长度是16字节，也就是 AES:: DEFAULT_KEYLENGTH。


块大小
块大小被 AES::BLOCKSIZE 宏决定，对于 AES 加密，它始终是16字节。


ECB和CBC模式
对于 ECB 和 CBC 模式，你处理的数据必须是块大小的倍数。或者，你可以用 StreamTransformationFilter 围绕这个模式对象，并把它作为一个过滤器对象。StreamTransformationFilter 能够缓存数据到块中并根据需要填充。