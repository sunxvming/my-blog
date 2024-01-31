Git 作为一个源码管理系统，不可避免涉及到多人协作。

协作必须有一个规范的工作流程，让大家有效地合作，使得项目井井有条地发展下去。"工作流程"在英语里，叫做"workflow"或者"flow"，原意是水流，比喻项目像水流那样，顺畅、自然地向前流动。

如何设置Git工作流取决于你正在开发的项目、团队的发布计划、团队的规模等等

可能考虑的分支：
线上版本  下一个发布版本  新功能   bug  优化


## 常见的git工作流
本文的三种工作流程，有一个共同点：都采用["功能驱动式开发"](https://en.wikipedia.org/wiki/Feature-driven_development)（Feature-driven development，简称FDD）。

它指的是，需求是开发的起点，先有需求再有功能分支（feature branch）或者补丁分支（hotfix branch）。完成开发后，该分支就合并到主分支，然后被删除。


### 1. 基本的 Git 工作流
所有提交都直接添加到 master 分支。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/21b10162-d243-4b3b-b344-45ba79878e61.jpg)

### 2. Git 功能分支工作流
开发新功能从master抽取分支，开发完毕合并到主干。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/789436e8-8925-40f2-870d-3d593908c7b3.jpg)

### 3. 带有 Develop 分支的 Git 功能分支工作流
Git 功能分支工作流相似，但它的 develop 分支与 master 分支并行存在。
master 分支始终代表生产环境的状态。每当团队想要部署代码到生产环境时，他们都会部署 master 分支。
Develop 分支代表针对下一版本的最新交付的代码。开发人员从 develop 分支创建新分支，并开发新功能。功能开发完毕后，将对其进行测试，与 develop 分支合并，在合并了其他功能分支的情况下使用 develop 分支的代码进行测试，然后与 master 分支合并。
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/b5ac1923-7a8b-482e-90ee-d9721f3fe488.jpg)



### 4. Gitflow 工作流
Gitflow 工作流与我们之前讨论的工作流非常相似，我们将它们与其他两个分支（ release 分支和 hot-fix 分支）结合使用。

**4.1 Hot-Fix 分支**
Hot-fix 分支是唯一一个从 master 分支创建的分支，并且直接合并到 master 分支而不是 develop 分支。仅在必须快速修复生产环境问题时使用。该分支的一个优点是，它使你可以快速修复并部署生产环境的问题，而无需中断其他人的工作流，也不必等待下一个发布周期。

将修复合并到 master 分支并进行部署后，应将其合并到 develop 和当前的 release 分支中。这样做是为了确保任何从 develop 分支创建新功能分支的人都具有最新代码。

**4.2 Release 分支**
在将所有准备发布的功能的代码成功合并到 develop 分支之后，就可以从 develop 分支创建 release 分支了。

Release 分支不包含新功能相关的代码。仅将与发布相关的代码添加到 release 分支。例如，与此版本相关的文档，错误修复和其他关联任务才能添加到此分支。

一旦将此分支与 master 分支合并并部署到生产环境后，它也将被合并回 develop 分支中，以便之后从 develop 分支创建新功能分支时，新的分支能够具有最新代码。

**长期分支**：主分支master、开发分支develop
**短期分支**：功能分支（feature branch）、补丁分支（hotfix branch）、预发分支（release branch）
短期分支一旦完成开发，它们就会被合并进develop或master，然后被删除。



![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/fd73ca22-35e5-4068-9df6-348cecac9883.jpg)



## 5. Git Fork（Github flow） 工作流
Fork 工作流在使用开源软件的团队中很流行。
该流程通常如下所示：
1. 开发人员 fork 开源软件的官方代码库。在他们的帐户中创建此代码库的副本。
2. 然后，开发人员将代码库从其帐户克隆到本地系统。
3. 官方代码库的远端源已添加到克隆到本地系统的代码库中。
4. 开发人员创建一个新的功能分支，该分支将在其本地系统中创建，进行更改并提交。
5. 这些更改以及分支将被推送到其帐户上开发人员的代码库副本。
6. 从该新功能分支创建一个 pull request，提交到官方代码库。
7. 官方代码库的维护者检查 pull request 中的修改并批准将这些修改合并到官方代码库中。





## 参考链接：
- [5 Git workflows and branching strategy you can use to improve your development process](https://zepel.io/blog/5-git-workflows-to-improve-development/)

- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html),by 阮一峰