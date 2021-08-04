[TOC]


# 第一类：对文字样式的编辑

-------------------------------
**演示粗体**

*演示斜体*


# 我展示的是一级标题


# 第二类：对段落的编辑
* 演示列表
*  列表还可以有层级
    
> 这是引用文字的效果
    
    缩进表引用块


# 第三类：插入文章其他元素


[少数派](https://sspai.com)


![](https://cdn.sspai.com/attachment/thumbnail/2016/11/04/264631b984633898c415a818b181e5205653e_mw_640.jpg)







```
    const char* wasm_context::get_action_data(){
        std::string  abi;
        read_and_validate_abi (contract_abi_, abi);
        std::vector<char> v_abi(abi.begin(),abi.end());
        std::vector<char> action_data = wasm::abi_serializer::pack(v_abi, action_, action_data_, max_serialization_time);
        return action_data.data();
    }
```

`Ctrl+Alt+N`


##  插入链接

### 参考形式
链接名称可以用字母、数字和空格，但是不分大小写



我使用 [Google][1] 进行学术搜索多一些,使用 [百度][2]进行日常搜索多一些，很少使用[Bing][3] .
我不能一边使用 [百度搜索][2] 一边骂他不如 [Google][1]，我们需要学会的是利用资源。

[1]: https://www.google.com/ "Google"
[2]: https://www.baidu.com/ "Baidu Search"
[3]: https://cn.bing.com/ "Bing Search"


早饭后，我打开 [每日英语听力][TING] 学习英语。遇到不懂的英语单词，我借助 [欧路在线词典][zxB]
查看释义并加入生词本，方便使用 [客户端][khd] 随时记忆单词。

[ting]: https://dict.eudic.net/ting "每日英语听力 - 欧路词典"
[zxb]: https://dict.eudic.net/ "《欧路词典》在线版"
[khd]: https://www.eudic.net/v4/en/app/eudic "《欧路词典》英语翻译软件官方主页"




### 自动链接
Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用 < > 包起来，Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，邮址的自动链接也很类似，例如：
<http://example.com/>
<address@example.com>




<audio src="./abc.mp3" controls="controls">