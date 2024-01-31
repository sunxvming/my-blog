> 本文记录了unity打ios包的相关知识点，以及我的之前的一个mmo游戏项目中的打包脚本，项目所用的unity版本为5.6.6f2


## 一:申请开发者账号
打包的时候需要苹果的开发者账号，时间差不多得两周到一个月左右，得提前准备好申请需要的材料以加快申请的速度。、
公司的开发者账号只有一个，但是开发一个项目是需要多人配合的，总不能所以人都用同一个公司的开发者账号吧。这时需要把开发人员的账号添加到公司的开发者账号的team中。

## 二:mac系统版本的选择
mac系统的版本要和unity版本一直才能不出问题，这个系统不匹配的问题恰好被我给碰到了。
运行unity时黑屏先查看错误日志，网上查了下是缺少某些文件，按照网上的做法创建文件夹并复制文件即可，后来发现unity中的Assets文件下的东西都无法显示，查了下原来是macos10.13的版本的新的文件格式不支持老的unity编辑器，后来系统换成10.12.6的就好了。换苹果系统一开始是自己网上找教程弄的，但当时下载苹果系统特别慢，反正折腾了一个下午也没弄好，第二天直接58同城上花160块钱找了个专门按系统俩小时就弄好了，哈哈哈哈
> Editor的日志存放目录 ~/Library/Logs/Unity/Editor.log

## 三:远程连接软件
Windows远程连mac可以用vnc的软件，百度一下按教程设置一下就可以了

## 四:unity破解
下载mac的版本时要注意有普通版本fxx的和补丁版本pxx的，
Mac破解方法:
去网上搜索 https://ceeger.com/forum/read.php?tid=23396&uid=24111
首先 - 替换破解补丁Unity文件:
1.找到- 应用程序
2.双击Unity文件夹
3.右键单击Unity文件, 并选择显示包内容
4.双击contents文件夹
5.双击MacOS文件夹
6.右键Unity文件选择拷贝, 并粘贴到桌面作为你的备份
7.返回刚才的文件夹, 里面的Unity文件可以删掉了.
8.从下载的破解压缩包里拖拽Unity破解补丁文件到刚才的文件夹内即可.
然后- 替换破解补丁\*.ulf 文件:
1.打开Finder, 在顶部菜单出选择 前往>电脑, 打开后选择磁盘, 双击资源库(不是隐藏的那个资源库,请看清楚)
2.找到双击 Application Support文件夹
3.找到并双击Unity文件夹, 如果没有该文件夹, 请创建名为Unity的文件夹
4.右键文件夹内的 \*.ulf文件, 选择拷贝, 并粘贴到桌面作为你的备份
5.返回刚才的文件夹, 里面的\*.ulf文件可以删掉了.
6.从下载的破解压缩包里拖拽 \*.ulf到刚才的文件夹内即可.

## 五:设置文件隐藏
打包的时候若不想把某个文件夹打进去的话，可以把文件设成隐藏的，用mv命令可以实现
mv testflod .testflod

## 六:打包出现的问题
### 1.SDK设置
Showing Recent Issues
Error: There is no SDK with the name or path '/Users/mac/Downloads/SimplestPluginExample/XCodePlugin/macosx10.5'
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/d4404ca8-a261-402f-a052-0ee491bda10c.png)

### 2.bitcode设置
*** does not contain bitcode. You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), obtain an updated library from the vendor, or disable bitcode for this target. for architecture armv7
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/34a101fd-893f-4172-a26d-8ba7a2372cd4.png)

### 3.导入库文件
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/55049109-aeb1-472f-935c-809247a370db.png)

### 4.其中一个闪退的问题
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/DF30C54B-458E-3B90-49AD-08A5C8E481A7.jpg)

### 5.打ipa包签名问题
CodeSign 的时候好像会让你输用户的密码，命令行没输就会出错了，下面的命令就是设置下不验证密码
```
security unlock-keychain -p 123456 ~/Library/Keychains/login.keychain
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k 123456 ~/Library/Keychains/login.keychain
security set-keychain-settings ~/Library/Keychains/login.keychain
```
### 6.设置打的版本是测试版还是发布版
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/5bf70dc6-6981-47cc-ba83-ff2719c27c96.png)

### 7.调试静态库的代码
luajit的源代码放到xcode工程的plugins/iOS/ 中即可
xcode工程添加预定义编译宏 --> Bulid Setting” --> Preprocessor Macros。
需要删除的文件 ljamalg.c luajit.c 需要添加到文件 lj_vm.S

## 七:ios静态库相关
查看静态库 (.a文件）所支持的cup架构: file xx mac下可以使用 otool -hv xx lipo -info xx
1.查看静态库支持的CPU架构
lipo -info libname.a(或者libname.framework/libname)
2.合并静态库
lipo -create 静态库存放路径1 静态库存放路径2 ... -output 整合后存放的路径
lipo -create libname-armv7.a libname-armv7s.a libname-i386.a -output libname.a
framework 合并(例util.framework)
lipo -create arm7/util.framework/util i386/util.framework/util -output util.framework
3.静态库拆分
lipo 静态库源文件路径 -thin CPU架构名称 -output 拆分后文件存放路径 架构名为armv7/armv7s/arm64等，与lipo -info 输出的架构名一致
lipo libname.a -thin armv7 -output libname-armv7.a
1.依赖的库查询:otool -L xxx
2.查汇编代码:otool -tV ex

## 八:自动打包脚本
### shell脚本
```
#!/bin/sh
SHDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
UNITY_PATH=/Applications/Unity/Unity.app/Contents/MacOS/Unity
PROJECT_PATH=${SHDIR}/../client/
UNITY_LOG_PATH=${SHDIR}/build-ios-exe-output/unity_log.txt
XCODE_PATH=${SHDIR}/build-ios-exe-output/xcode
UNITY_METHOD_NAME=RiseTool.BuildIOSXcode
rm -rf $XCODE_PATH
$UNITY_PATH -quit -batchmode -logFile $UNITY_LOG_PATH -projectPath $PROJECT_PATH -executeMethod $UNITY_METHOD_NAME -outputPath $XCODE_PATH
echo 'step1:export xcode success!!!'
#------------------------
scheme_name="Unity-iPhone"
export_plist=${SHDIR}/build-ios-exe-output/ExportOptions.plist
project_name="Unity-iPhone.xcodeproj"
ipa_dir=${SHDIR}/build-ios-exe-output/ipa
configuration="Debug"
#configuration="Release"
archivePath=${XCODE_PATH}/build/${scheme_name}.xcarchive
rm -rf $ipa_dir
cd $XCODE_PATH
xcodebuild clean
xcodebuild archive -project "${project_name}" -scheme "${scheme_name}" -configuration "$configuration" -archivePath "${archivePath}"
xcodebuild -exportArchive -archivePath "${archivePath}" -exportPath "${ipa_dir}" -exportOptionsPlist "${export_plist}"
echo 'step2:build ipa success!!!'
open ${ipa_dir}
```
### unity中对应的打包方法
```
[MenuItem("Tools/打版/ios生成xcode")]
public static void BuildIOSXcode()
{
 string outputPath = EditorConfig.buildPath + "build-ios-exe-output/xcode";
 string[] ss = System.Environment.GetCommandLineArgs();
 for (int i = 0; i < ss.Length; i++)
 {
  if (ss[i] == "-outputPath")
  {
   outputPath = ss[i + 1];
  }
 }
 outputPath = outputPath.Replace('\\', '/');
 List<string> levels = new List<string>();
 foreach (EditorBuildSettingsScene scene in EditorBuildSettings.scenes)
 {
  if (!scene.enabled) continue;
  levels.Add(scene.path);
 }
 EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.iOS, BuildTarget.iOS);
 string res = BuildPipeline.BuildPlayer(levels.ToArray(), outputPath, BuildTarget.iOS, BuildOptions.None);
 if (res.Length > 0)
  throw new Exception("BuildPlayer failure: " + res);
}
```
### 使用PostProcessBuild设定Xcode Project
unity提供一套api去修改xcode项目工程配置以及修改plist文件内容(当unity build结束后, 会自动回调OnPostProcessBuild),可以在这个方法中添加配置xcode的方法
```
public class IosBuildScript : UnityEngine.MonoBehaviour
{
    [UnityEditor.Callbacks.PostProcessBuild(999)]
    public static void OnPostprocessBuild(UnityEditor.BuildTarget BuildTarget, string path)
    {
#if UNITY_IPHONE || UNITY_IOS
        if (BuildTarget == UnityEditor.BuildTarget.iOS)
        {
            UnityEngine.Debug.Log("OnPostprocessBuild : path1" + path);
            // /Users/mac/project/trunk/risexcode/build/build-ios-exe-output/xcode
            //添加系统framework
            string projPath = UnityEditor.iOS.Xcode.PBXProject.GetPBXProjectPath(path);
            UnityEditor.iOS.Xcode.PBXProject proj = new UnityEditor.iOS.Xcode.PBXProject();
            UnityEngine.Debug.Log("OnPostprocessBuild : path2" + projPath);
            // /Users/mac/project/trunk/risexcode/build/build-ios-exe-output/xcode/Unity-iPhone.xcodeproj/project.pbxproj
            proj.ReadFromString(System.IO.File.ReadAllText(projPath));
            string target = proj.TargetGuidByName(UnityEditor.iOS.Xcode.PBXProject.GetUnityTargetName());
            //添加库
            proj.AddFrameworkToProject(target, "CoreTelephony.framework", false);
            proj.AddFrameworkToProject(target, "libstdc++.6.0.9.tbd", false);
            proj.AddFrameworkToProject(target, "Security.framework", false);
            proj.AddFrameworkToProject(target, "CoreAudio.framework", false);
            //证书，签名，相关
            proj.SetBuildProperty(target, "DEVELOPMENT_TEAM", "ZGFZTGAMFM");
            proj.SetBuildProperty(target, "ENABLE_BITCODE", "NO");
            proj.SetBuildProperty(target, "VALID_ARCHS", "arm64");
            System.IO.File.WriteAllText(projPath, proj.WriteToString());
            //Handle info.plist
            string plistPath = path + "/Info.plist";
            UnityEditor.iOS.Xcode.PlistDocument plist = new UnityEditor.iOS.Xcode.PlistDocument();
            plist.ReadFromString(System.IO.File.ReadAllText(plistPath));
            UnityEditor.iOS.Xcode.PlistElementDict rootDict = plist.root;
            rootDict.SetString("NSMicrophoneUsageDescription", "测试腾讯云游戏语音录音");
            System.IO.File.WriteAllText(plistPath, plist.WriteToString());
        }
#endif
    }
}
```

## 九:ios包的下载过程
如何实现在网页中点击链接即可下载ios的ipa包呢？步骤如下:
网页中的链接协议如下:
itms-services:///?action=download-manifest&url=https://res1-mfwz.top1game.com/sjzs/mfwziOS.plist
就是通过这个链接找到plist文件(plist需要放在https的服务器上)，plist文件中再说明下载的ipa包的具体位置，plist文件格式如下:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>items</key>
    <array>
        <dict>
            <key>assets</key>
            <array>
                <dict>
                    <key>kind</key>
                    <string>software-package</string>
                    <key>url</key>
      <string>https://res1-mfwz.top1game.com/sjzs/mfwz.ipa</string>
                </dict>
                <dict>
                    <key>kind</key>
                    <string>full-size-image</string>
                    <key>needs-shine</key>
                    <true/>
                    <key>url</key>
                    <string>https://res1-mfwz.top1game.com/sjzs/120.png</string>
                </dict>
                <dict>
                    <key>kind</key>
                    <string>display-image</string>
                    <key>needs-shine</key>
                    <true/>
                    <key>url</key>
                    <string>https://res1-mfwz.top1game.com/sjzs/72.png</string>
                </dict>
            </array>
            <key>metadata</key>
            <dict>
                <key>bundle-identifier</key>
  <string>com.fancyguo.pxjy</string>
                <key>bundle-version</key>
                <string>1.0</string>
                <key>kind</key>
                <string>software</string>
                <key>subtitle</key>
                <string>魔法王座助手</string>
                <key>title</key>
                <string>魔法王座助手</string>
            </dict>
        </dict>
    </array>
</dict>
</plist>
```

