

## 插件开发
1. 新建一个测试的obsidian的仓库，在仓库的`.obsidian\plugins`路径下面创建obsidian插件的工程
2. 执行`npm run dev`，这个命令会监控源码的改动，并编译main.js
3. 执行 `npm run build`, 这个会编译最终需要的 `main.js`, `styles.css`
4. 执行`npm run version`, 这个会把`package.json`中的文件的版本号复制到`manifest.json`中

obsidian插件最终需要的文件有如下几个：
- main.js： 插件的主程序
- styles.css： 插件的样式文件
- manifest.json： 插件的信息，包括名字、描述、版本、github地址等


### 开发调试工具
[Hot-Reload](https://github.com/pjeby/hot-reload) 插件会在您的源码发生改变时重新加载插件。就是自动加载插件，不用手动去重新加载插件


## 插件发布

插件发布是在github上进行的，步骤如下：

1. 所有代码都提交完了之后，修改下面文件的版本号，版本号+1
```
manifest.json
package.json
```

2. 代码提交后分支，分支的名字就是上面的版本号

3. 推送分支后会在github后台自动执行`.github/workflows/release.yml`，这个工作流文件会自动创建一个草稿的release，并打包上传最终的发布版本文件。

4. 编辑release的草稿，填写Release title和Release notes 并提交就完成最终的发布了








## Monaco Editor
[IStandaloneEditorConstructionOptions | Monaco Editor API](https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html#unicodeHighlight)，编辑器的相关设置
[monaco-editor 编辑器 - 知乎](https://zhuanlan.zhihu.com/p/590230766)

可以查看 monaco 支持哪些 actions
`editor.getSupportedActions();`

## 参考的其他插件
csv-obsidian
ini-obsidian
obsidian-code-files
obsidian-image-toolkit






## 插件的推广
- [官方社区(英文)  Obsidian Forum](https://forum.obsidian.md/c/share-showcase/9)
- [discard讨论区](https://discord.com/channels/686053708261228577/855181471643861002)
- [Obsidian 中文论坛](https://forum-zh.obsidian.md/top?period=monthly)

## 参考链接
- [Obsidian 插件开发文档 | Obsidian 插件开发文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)
- [obsidian - Developer Documentation](https://docs.obsidian.md/Home)
- [obsidianmd/obsidian-api: Type definitions for the latest Obsidian API.](https://github.com/obsidianmd/obsidian-api)
- [obsidian-tools/obsidian-tools: An unofficial collection of tools that helps you build plugins for obsidian.md](https://github.com/obsidian-tools/obsidian-tools)

