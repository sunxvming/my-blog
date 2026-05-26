

## issues 模版
在GitHub代码库中，引入代码库维护者定制的 **issues 模版**和 **pull request 模版**，让人们可以有针对性的提供某类问题的准确信息，从而在后续维护中能够进行有效地对话和改进，而不是杂乱无章的留言。

一. 在当前工程的根目录下添加下面的文件：
- Bug report:   `.github/ISSUE_TEMPLATE/bug_report.md`
- Feature request: `.github/ISSUE_TEMPLATE/feature_request.md`


二. 在github的Settings页面可以看到Issues的设置，进去可以看到github会识别这两个文件并生成相应的模板

![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251125172003.png)


![image.png](https://sxm-upload-e383a8b8-13b6-4243-b006-9dd061056eb0.oss-cn-beijing.aliyuncs.com/imgs-25d2a8f0-6458-4bca-a92f-6d0ff90484a3/20251125171625.png)


## github action


**GitHub Actions** 是 GitHub 提供的自动化 CI/CD（持续集成 / 持续部署）服务。

它允许你在提交代码、推送标签、创建 release、提交 PR 等事件发生时，自动执行一段你配置好的脚本，例如：

- 自动编译项目
- 自动运行测试
- 自动打包发布
- 自动部署到服务器

你完全可以把它理解为：
> **一个运行在 GitHub 云端的自动任务系统**  
> 类似于 Jenkins、GitLab CI、Azure Pipelines，但集成度更高。

---

**`.github/workflows/release.yml` 是什么文件？**

GitHub Actions 的所有工作流（workflow）都放在：

```
.github/workflows/
```
因此：
```
.github/workflows/release.yml
```

就是一个 **GitHub Actions 工作流文件**。



###  什么是“工作流文件 (workflow)”？

一个 `.yml` 工作流文件描述：
- **什么时候触发**（如 push、tag、PR）
- **在什么环境执行**（如 Ubuntu、Windows、macOS）
- **执行哪些步骤**（安装依赖、编译、打包、发布等等）
    

例如，一个典型的 `release.yml` 用于：
- **在 tag v1.0.0 创建后自动打包发布 Release**
- 或自动上传构建产物
- 或自动编译你的 Obsidian / Electron / Node 项目并发布
    

示例内容可能像这样：
```yml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: build/*.zip
```


