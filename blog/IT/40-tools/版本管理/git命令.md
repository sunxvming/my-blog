【github太慢】


1. 使用github的镜像网站进行访问，github.com.cnpmjs.org，将github.com替换成github.com.cnpmjs.org，之后的各种操作都一样
2. “码云极速下载” 是为了提升国内下载速度的镜像仓库，每日同步一次。 https://gitee.com/mirrors
【资源】

git简明指南   https://rogerdudler.github.io/git-guide/index.zh.html
廖雪峰git教程   http://www.liaoxuefeng.com/
git教程博客  https://www.jianshu.com/p/9685a56bdf7a


【图形化界面工具】
git图形化界面Sourcetree


【三个区】
你的本地仓库由 git 维护的三棵“树”组成。
1. 工作目录(工作区)，它持有实际文件
2. 缓存区（Index），它像个缓存区域，临时保存你的改动
3. 最后是 HEAD，指向你最近一次提交后的结果。
工作区  -- add--> Index(暂存区)  --commit-->   HEAD



【linux设置密码】
git config --global credential.helper 'cache --timeout=3600000'


【基本】

生成密钥对                              ssh-keygen -t rsa -C "sunxvming@gmail.com"

克隆远程仓库                          git clone https://10.12.7.86/xajh/client.git

初始化仓库                            git init
提交到缓存区                          git add *
git add -A    The -A option is shorthand for --all.
this command will stage all files in your repository, which includes all new, modified, and deleted files.


删除文件                                 git  rm  <filename>
误删恢复                              git checkout -- test.txt

提交到head区                          git commit -m "note"


查看工作区状态                        git status
从最近到最远的提交日志        git log
查看某个提交号的内容            git show <ID>
查看命令历史                          git reflog          可以查看提交的版本号

查看文件的提交记录                git blame aa.txt
查看工作区和版本库里面最新版本的区别  git diff HEAD -- readme.txt



【revert】
回退上一次提交     git reset --hard HEAD^  ^^上两个  HEAD~100  上100个
回退指定版本(指定提交号)     git reset --hard 3628164
丢弃工作区的指定文件       git checkout -- <file>     --符号不能少
丢弃工作区的所有文件       git checkout .
把暂存区的修改撤销掉，重新放回工作区  git reset HEAD readme.txt

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过
git clean -fd


删除源       git remote rm origin
添加源       git remote add origin https://github.com/sunxvming/onethink.git  
远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。
推送代码    git push origin master ----->以后直接git push就行，默认push到master


【分支】
创建分支                              git branch xx
切换分支                              git checkout xx
创建并切换                            git checkout -b xx(git checkout -b 9day origin/9day_20190702)
查看所有分支                          git branch   -a    当前分支表有*号标记
查看远程的分支                     git branch  -r
把本地分支推送到远端分支(远端的分支可以是不存在的)     git push origin txboardcast
合并指定分支到当前分支         git merge xx      
冲突后丢弃                          git merge --abort
查看两个分支的diff               git diff branch1  branch2
删除分支                              git branch -d xx   

   ![](https://sunxvming.com/imgs/5c211a2a-e278-4cb5-8122-19b387d8904c.png)Fast-forward快速的合并方式，就是指针变几下就行



因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，
这和直接在master分支上工作效果是一样的，但过程更安全。


  ![](https://sunxvming.com/imgs/7ce6acac-6082-4746-b297-4abc1fe309bb.png)两个文件都被修改了

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突

git status也可以告诉我们冲突的文件



【标签】
标签也是版本库的一个快照。它是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），创建和删除标 签都是瞬间完成
切换到需要打标签的分支上，打的标签默认是在最新一次的commit上打的,就是HEAD指向的位置: git tag v1.0
指定的版本上打标签 ：git tag v0.9 <提交号>
查看标签 ：git tag
查看标签信息 ：git show <tagname>
还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：
$ git tag -a v0.1 -m "version 0.1 released" 3628164
删除标签 ：git tag -d v0.1

git push的时候默认不推送tag的，若推送的话可以用下面的命令
git push --tags
git push origin --tags



【git rebase】
第二种合并分支的方法是 git rebase

Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在此基础上把此分支的提交记录扔上去

Rebase 的优势就是可以创造更线性的提交历史

比如：想把bugFix分支里的工作直接移到 master 分支上，需要在bugFix分支上执行`git rebase master`
现在 bugFix 分支上的工作在 master 的最顶端，但master还没有更新，这是需要 checkout到master然后

git rebase bugfix

【git pull 和 git pull --rebase区别】
git pull = git fetch + git merge      merge会产生一次提交记录
git pull --rebase = git fetch + git rebase
大多数时候，使用 git pull --rebase 是为了使提交线图更好看，从而方便 code review



【git rebase冲突时】
在source tree中找到冲突文件修改并点解决

【交互式的 rebase】
交互式 rebase 指的是使用带参数 --interactive 的 rebase 命令, 简写为 -i

比如：git rebase -i HEAD~4   可以对HEAD前4个节点之后的提交记录进行重新排序



【在提交树上移动】
HEAD是checkout的灵魂

我们在切换分支，和新建分支的时候（创建分支是从HEAD处创建），有没有想过，这些操作操作背后的工作原理是怎样的呢？最大的功臣就是.git目录下的HEAD引用(可以把它想象成一个指针，指向某个分支或提交记录)。
HEAD 总是指向当前分支上最近一次提交记录，比如：当前在master的工作，则HEAD指向的是当前分支名master，而master又指向了当前的最新的一次提交ID

让HEAD指向某次提交：git checkout <提交号>
【相对引用】
指定提交记录哈希值的方式在 Git 中移动不太方便，所以 Git 引入了相对引用，使用相对引用的话，你就可以从一个易于记忆的地方（比如 bugFix 分支或 HEAD）开始计算

使用 ^ 向上移动 1 个提交记录
使用 ~<num> 向上移动多个提交记录，如 ~3
比如：git checkout master^  把HEAD移动到master的父节点上
【强制修改分支位置】
使用相对引用最多的就是移动分支。可以直接使用 -f 选项让分支指向另一个提交。例如:
git branch -f master HEAD~3
上面的命令会将 master 分支强制指向 HEAD 的第 3 级父提交


【撤销变更】
git reset 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。
虽然在你的本地分支中使用 git reset 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！
为了撤销更改并分享给别人，我们需要使用 git revert。比如：git revert HEAD




【整理提交记录】
git cherry-pick <提交号>...  后面可以跟多个提交号

要在心里牢记 cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上（只要不是 HEAD 上游的提交就没问题）。



【Git Describe】

git describe <ref>

<ref> 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位（HEAD）。
它输出的结果是这样的：
<tag>_<numCommits>_g<hash>




【commit的错了，不想push了】
git reset --hard HEAD^ ^^上两个 HEAD~100 上100个


【cherry-pick  合并特定commits 到另一个分支】
比如，feature 分支上的commit 62ecb3很重要，需要合并到主干
git checkout master
git cherry-pick 62ecb3


【忽略文件】
git  建忽略文件   在目录中建.gitignore文件，并写好规则




【git stash】
git stash              存储当前工作目录
git stash list         查看之前存储的所有版本列表
git stash pop [stash_id]       git stash pop stash@{0}       恢复具体某一次的版本,如果不指定stash_id，则默认恢复最新的存储进度
git stash drop [stash_id]       git stash drop stash@{5}     删除一个存储的进度。如果不指定stash_id，则默认删除最新的存储进度。
git stash clear       清除所有的存储进度



【git fetch】
git在本地会保存两个版本的仓库，分为本地仓库和远程仓库。
1、本地仓库就是我们平时 add、commit 的那个仓库。
2、远程仓库可以用git remote -v查看（这里的远程仓库是保存在本地的远程仓库，等同于另一个版本，不是远程的远程仓库）。


说说 fetch 和 pull 的不同:


fetch 只能更新远程仓库的代码为最新的，本地仓库的代码还未被更新，我们需要通过 git merge origin/master 来合并这两个版本，你可以把它理解为合并分支一样的。


【不提交某个文件】
# 执行命令将debug_dofile.lua加入不提交队列
git update-index --assume-unchanged debug_dofile.lua
# 执行命令将debug_dofile.lua取消加入不提交队列
git update-index --no-assume-unchanged debug_dofile.lua





【git回复删除分支】
查看所有的引用变动的日志   git reflog
找到对应的提交记录       git checkout 6c4a469
git checkout -b save




【Git Submodule】
项目中经常会使用到第三方的 git 库, 将三方库整合到项目中最简单的办法就是复制粘贴
也可以使用git-submodule 操作, 直接把第三方的版本库合并到自己的库中.
涉及的配置文件：.gitmodules   .git/config
git submodule update --init   --recursive #更新第三方源码

把其他git工程作为Submodule
git submodule add git@gitlab1.minervagame.com:gm/gm-doc.git doc



[core]
 repositoryformatversion = 0
 filemode = false
 bare = false
 logallrefupdates = true
 symlinks = false
 ignorecase = true
autocrlf = false


【命令别名】
Git 的命令含义明确，但缺点是单词太长，多次操作输入就显得很繁琐，这点就不如 SVN
命令那么简单明了。好在我们可以在 Git 的配置文件“.gitconfig”里为这些命令起别名，
比如把“status”改成“st”，把“commit”改成“ci”。
下面这个就是我常用的一个 Git 配置，里面还有个特别的地方是在“diff”的时候使
用“vimdiff”，用可视化的方式来比较文件的差异，比原始的“diff”更好。
```
[alias]
st = status
ci = commit
br = branch
co = checkout
au = add -u .
ll = log --oneline --graph
d = difftool
[diff]
tool = vimdiff
```


【设置filemode，文件权限变更引起的修改】
```
git config --global core.filemode false
```





【gitdiff】
git diff HEAD 显示工作目录与git 仓库之间的差异；
设置git diff有颜色
```
git config --global color.ui true
```