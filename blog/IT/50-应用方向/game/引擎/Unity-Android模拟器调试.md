1.打untiy的android包，记得要勾选Development Build和Script Debugging，这样调试的信息才行打进包
2.在模拟器中运行打的包


运行模拟器时，模拟器窗口标题栏会显示模拟器的端口号和AVD名称，这个端口号是它的console端口号，其区间为5554-5584之间的偶数，而5555-5585之间的奇数则是对应的为adb保留的端口号。默认情况下运行第一个模拟器的console port为5554，adb port为5555，第二个模拟器的console port为5556，adb port为5557，依此类推。Console port和adb port用于下面的adb连接：
1、adb tcpip 5555将设备的adb daemon与宿主机的5555端口绑定。如果5555端口已经被占用，可以使用5555-5585之间其它的奇数。
默认情况下第一个模拟器的console port为5554，adb port为5555，因此可以跳过这步。
![](https://sunxvming.com/imgs/a61fdfd5-0b08-4bfa-a5cd-92d53d5cc4df.png)
2、adb connect 127.0.0.1:5555这里通过网络进行adb连接，5555为上一步设置好的模拟器adb port，127.0.0.1为本机环路地址。因为模拟器的adb daemon与本机的5555端口进行了绑定，因此adb连接本机（127.0.0.1/localhost）的5555端口时就是连接了模拟器。
![](https://sunxvming.com/imgs/6cbcdb09-129d-4d65-af16-15279bba948f.png)
3、adb devices查看连接是否建立好。
![](https://sunxvming.com/imgs/43e6182a-0d0f-4534-8c28-0a55a3ed8c85.png)
 3.在vs的debug中attach上要调试的进程
![](https://sunxvming.com/imgs/84abdf30-ef05-42a2-83e6-1f631ab4266e.png)
 
4.需要做的配置工作。
运行项目后，MonoDevelopment或UnityVS的Attach窗口会出现AndroidPlayer一项，这就是我们模拟器上运行的项目了。但如果此时直接Attach会发现Attach不上，我们还需要做些配置工作。
仔细看AndroidPlayer这项会发现有unknown_sdk@10.0.2.15这样的标识，这个10.0.2.15实际上是模拟器自己定义并分配的IP，直接Attach会尝试去连接这个IP，当然无法连接到模拟器，也就无法调试项目了。好在UnityVS有两个很好的功能，一个是列出了调试项目时需要连接模拟器的端口号，即上图的56997，另一个是允许自定义输入IP和端口号来进行远程调试。
1、打开UnityVS的Attach Unity Debugger窗口，记住AndroidPlayer的端口号。
2、打开cmd，输入telnet localhost 5554来进入Android Console，5554即前面提到的模拟器的console port。
3、Android Console中输入redir add tcp:5590:56997，将模拟器56997端口重定向为宿主机的5590端口。这里的56997即第1步需要记住的端口号，5590可以设置为任意你想用的端口号。
![](https://sunxvming.com/imgs/cd89aecd-8cdf-4ce9-b1c2-31cf196a5b9f.jpg)
4、在UnityVS Attach窗口点击“Input IP”，输入127.0.0.1:5590，点击“OK”将会连接到模拟器并Attach项目成功，接下来就可以体验“真机”调试了。
![](https://sunxvming.com/imgs/516e3602-f94c-4e63-ac52-e64b46caf70b.jpg)
 
解决more than one device and emulator问题

1、获取模拟器/设备列表        adb devices
2、指定device来执行             adb -s devicename shell

