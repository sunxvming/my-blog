> 本文记录了unity打安卓包的相关知识点，以及我的之前的一个mmo游戏项目中的打包脚本，项目所用的unity版本为5.6.6f2

打包的原则：
1.越早越好。打包的功能要越早越好，因为越往后游戏工程里的资源就越多。一是打包速度慢，二调试更加麻烦
2.定时打包。打包的功能完成后，要定期进行打包，比如每天晚上打一个包，这样可以及时发现打包的问题，同时可以发现游戏中的问题
### 一：依赖环境
#### 1.一台做版机
专门打游戏安装包的电脑，配置要高，i7处理器 + 独立显卡 + ssd硬盘
你要弄个低配的电脑打个一两个G的资源，起码得个一俩小时的。
那打个包为啥还得要好显卡呀，因为打包的时候处理资源很多操作是在显卡上进行的。
#### 2.安装jdk1.8
jdk1.9有坑，可能会缺少rt.jay的jay包,而发生错误。
设置环境变量
```
JAVA_HOME D:\Program Files(x86)\Java\jdk1.8.0_144
CLASSPATH %JAVA_HOME%\jre\lib\rt.jay;
Path %JAVA_HOME%\bin
```
#### 3.安装andriod SDK
单独下载andriod sdk没的地方没发现，于是下载了andriod studio, 这里面就包含着andriod SDK
设置环境变量
```
ANDROID_SDK_HOME D:\Android\sdk
Path %ANDROID_SDK_HOME%\platform-tools;%ANDROID_SDK_HOME%\tools
```
#### 4.设置unity
![](http://www.sunxvming.com/wp-content/uploads/2019/10/c144cc20-32ab-48e0-a809-aaf6daa61155.png)
### 二：andriod studio的基本使用
#### 1.什么时候需要andriod studio
i.有些功能在unity层是实现不了的，比如：。需要修改安卓的MainActivity文件，这时就需要用andriod studio生成.class，然后放到Assets\Plugins\Android\bin目录下
ii.调试安卓包的时候也会用到andriod studio
#### 2.常用工具
![](http://www.sunxvming.com/wp-content/uploads/2019/10/973e8690-04f9-45a4-8cd8-0fe18caac0f6.png)
* Android SDK Manager
主要是下载和管理sdk的
* AVD(Android Virtual Device) Manager
管理模拟器的，创建一个，然后点这里的运行就可以出来一个andriod模拟器了
![](http://www.sunxvming.com/wp-content/uploads/2019/10/bb3058b1-4db9-454b-9afd-08d2439e473a.png)
* 模拟器添加APK文件的方法
1.将要安装的apk文件放在sdk文件的platform-tools文件下 例：D:\Android\Sdk\platform-tools
2.命令行下，在Android\Sdk\platform-tools 目录下执行
```
adb install xxx.apk //出现success就添加成功了。
```
* android device monitor
监控模拟器信息的
![](http://www.sunxvming.com/wp-content/uploads/2019/10/52b1d9bc-dfa8-42e8-a334-c963c60fd596.png)
文件管理显示空白：参考网上的替换了monitor中的ddmlib.jar这个包后就好了
data目录下空白：是因为没有权限，执行如下命令即可：
 adb shell
 su root
 chmod 777 /data
#### 3.安卓编译和生成.class文件
编译后的.class文件是放在项目的build目录下，intermediates\classes\debug\com\example\qud\testpage，
在debug目录下执行
.class文件打jar包命令：
```
jar -cvf class.jar com -- jar包会生成在当前目录下
```
打jar包的时候要去掉R文件以及其他不需要的class文件，因为unity也会根据res下的目录和文件生成R文件
#### 4.安卓包解压后的目录结构
安卓打包apk的解压目录(最简包，什么都不包括）
![](http://www.sunxvming.com/wp-content/uploads/2019/10/01510f2c-ca36-46a6-912c-b48144ff0399.png)
unity打包的解压目录
![](http://www.sunxvming.com/wp-content/uploads/2019/10/eceac7b0-cbb9-4627-aef7-78ae39b3153d.png)
多的内容为asserts和lib目录，lib中的内容如下:
libmain.so libmono.so libunity.so
#### 5.android资源文件
Android资源文件大致可以分为两种：
一：res目录下存放的可编译的资源文件：
这种资源文件系统会在R.java里面自动生成该资源文件的ID，所以访问这种资源文件比较简单，通过R.XXX.ID即可；
二：assets目录下存放的原生资源文件：
因为系统在编译的时候不会编译assets下的资源文件，所以我们不能通过R.XXX.ID的方式访问它们。那我么能不能通过该资源的绝对路径去访问它们呢？因为apk安装之后会放在/data/app/**.apk目录下，以apk形式存在，asset/res和被绑定在apk里，并不会解压到/data/data/YourApp目录下去，所以我们无法直接获取到assets的绝对路径，因为它们根本就没有。
还好Android系统为我们提供了一个AssetManager工具类。list返回文件列表 open打开指定文件的文件流
#### 6.android工程作为插件导入untiy
文件结构如下：
```
Assets
 Plugins
  Android
   bin --目录下放编译后的class文件
   res -- 放android工程的res文件
   AndroidManifest.xml
```
untiy在打包的时候会在项目的Temp目录下生成临时文件以进行打包操作，若碰到奇怪问题，把目录下的文件都删除试试。
#### 7.studio gradle构建工具报错
```
gradle project sync failed.Basic functionality(e.g.editing,debugging) will not work properly.
```
解决方案：进入项目目录下，找到 gradle\wrapper\gradle-wrapper.properties 文件，记事本打开，内容如下：
`#Sun Sep 04 23:25:42 CST 2016
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https://services.gradle.org/distributions/gradle-2.14.1-all.zip
最后一句，https://services.gradle.org/distributions/gradle-2.14.1-all.zip
studio会下载上面的Gradle，不知道什么原因下载不下来，我们可以手动下载这个版本的Gradle，无需解压直接拷贝到
C:\Users\qud\.gradle\wrapper\dists\gradle-3.3-all\55gk2rcmfc6p2dg9u9ohc3hw9下即可，重启studio，问题解决
### 三：打包时可能会遇到问题
#### 1.tools版本太高
打包是报如下错误：
![](http://www.sunxvming.com/wp-content/uploads/2019/10/4a163601-9145-4035-bc64-4b90933c5962.png)
```
Error:Invalid command android
UnityEditor.BuildPlayerWindow:BuildPlayerAndRun()
```
原因是
Unity在编译时会调用Android SDK tools中的android命令，而在新版本的Android SDK tools 中，android这个命令已经废弃了，导致Unity 无法正常编译。所以下载一个旧版本的tools就行，然后替换下面的目录就行
![](http://www.sunxvming.com/wp-content/uploads/2019/10/ae8be862-4763-4e9f-8bf2-3b6cf1965cab.png)
换成tools_r25.2.3-windows.zip 这版本的就不会报错了。
### 四：如何一键打包
#### 1.apk自动打包脚本
bat脚本，功能是在命令行下，调用unity编辑器中自定义的打apk包的c#的方法。
```
@echo off
del /f /s /q %cd%\build-android-exe-output\*.*
echo build start: %time%
set UNITY_PATH=%UnityPath%
set UNITY_LOG_PATH=%cd%\build-android-exe-output\unity_log.txt
set EXPORT_PATH=%cd%\build-android-exe-output\rise.apk
set Local_Path=%cd%\..\client
cd %Local_Path%
set UNITY_PROJECT_PATH=%cd%
cd ..
:: 隐藏 Assets\Resources
attrib +h %Local_Path%\Assets\Resources\*.* /S /D
set UNITY_METHOD_NAME=RiseTool.BuildAndroidAPK
svn revert -R %UNITY_PROJECT_PATH%
svn cleanup --remove-unversioned %UNITY_PROJECT_PATH%
svn cleanup --remove-ignored %UNITY_PROJECT_PATH%\Assets\StreamingAssets
%UNITY_PATH% -quit -batchmode -logFile %UNITY_LOG_PATH% -projectPath %UNITY_PROJECT_PATH% -executeMethod %UNITY_METHOD_NAME% -outputPath %EXPORT_PATH%
if %errorlevel% == 0 (echo successed ) else (echo fail please see unity_log.txt)
echo build end: %time%
pause
```
C#中对应的打apk包的方法
```
    [MenuItem("Tools/打版/android打apk包")]
    public static void BuildAndroidAPK()
    {
        string outputPath = EditorConfig.buildPath + "build-android-exe-output/rise.exe";
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
        EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.Android, BuildTarget.Android);
        PlayerSettings.applicationIdentifier = "com.qudao.rise";
        EditorUserBuildSettings.development = true;
        EditorUserBuildSettings.allowDebugging = true;
        EditorUserBuildSettings.connectProfiler = true;
        PlayerSettings.MTRendering = true;
        string res = BuildPipeline.BuildPlayer(levels.ToArray(), outputPath, BuildTarget.Android, BuildOptions.None);
        if (res.Length > 0)
            throw new Exception("BuildPlayer failure: " + res);
    }
```
#### 2.ab包自动打包脚本
于上面的bat脚本类似，也是在命令行里掉unity编辑器中的C#方法
```
@echo off
echo build start: %time%
set UNITY_PATH=%UnityPath%
set UNITY_LOG_PATH=%cd%\build-android-ab-output\unity_log.txt
set Local_Path=%cd%\..\client\
cd %Local_Path%
set UNITY_PROJECT_PATH=%cd%
cd ..
set UNITY_METHOD_NAME=RiseTool.BuildAndroid
svn revert -R %UNITY_PROJECT_PATH%
svn cleanup --remove-unversioned %UNITY_PROJECT_PATH%
svn cleanup --remove-ignored %UNITY_PROJECT_PATH%\Assets\StreamingAssets
%UNITY_PATH% -quit -batchmode -logFile %UNITY_LOG_PATH% -projectPath %UNITY_PROJECT_PATH% -executeMethod %UNITY_METHOD_NAME%
if %errorlevel% == 0 (echo successed ) else (echo fail please see unity_log.txt)
echo build end: %time%
pause
```
打ab包的逻辑比较复杂，在这里就不全部列出所有代码了
```
[MenuItem("Tools/打版/android打ab包")]
public static void BuildAndroid()
{
 EditorSceneManager.OpenScene("Assets/Scenes/game.unity");
 byteKind = 32;
 //BuildByteCode();
 BuildAltas(BuildTarget.Android);
 // ReplaceAlphaTex();
 // GenImageSetFile(BuildTarget.Android);
 // TextureImportSetting.SetImageSetImportFormat(BuildTarget.Android);
 // AndroidAddMatTool.PrefabAddMat();
 CreateAssetBundle.BuildAndroid();
}
```
### 五：如何真机调试
1.手机的开发者模式打开用调试模式
2.在device monitor中不显示手机的话，可以下载一个豌豆荚然后会自动装驱动，之后就可以连接上device monitor了 3.看文件时看不了，是因为需要root权限，手机的su一般是被干掉的，可以下载一个一键root的软件工具，然后su root
