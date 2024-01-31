
我们把一个视频文件编程直播流，需要经过如下3个阶段。
1. 把视频文件变成所需要的直播流格式如RTSP、RTMP（音视频编码器）
2. 通过流媒体服务器，把直播流广播出去（直播服务器环境）
3. 接收端拉取这个直播流。（流媒体播放解码器）


## 音视频编码器
ffmpeg 是一个免费的音频编码库，可以作为音视频编码器内核。
FFmpeg 的命令行参数非常多，可以分成五个部分。
```
ffmpeg {1} {2} -i {3} {4} {5}
```
上面命令中，五个部分的参数依次如下:
```
全局参数
输入文件参数
输入文件
输出文件参数
输出文件
```


FFmpeg 常用的命令行参数如下。

```swift
-c：指定编码器
-c copy：直接复制，不经过重新编码（这样比较快）
-c:v：指定视频编码器
-c:a：指定音频编码器
-i：指定输入文件
-an：去除音频流
-vn： 去除视频流
-preset：指定输出的视频质量，会影响文件的生成速度，有以下几个可用的值 ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow。
-y：不经过确认，输出时直接覆盖同名文件。

主要参数：
-i 设定输入流
-f 设定输出格式
-ss 开始时间
视频参数：
-b 设定视频流量，默认为200Kbit/s
-r 设定帧速率，默认为25
-s 设定画面的宽与高
-aspect 设定画面的比例
-vn 不处理视频
-vcodec 设定视频编解码器，未设定时则使用与输入流相同的编解码器
音频参数：
-ar 设定采样率
-ac 设定声音的Channel数
-acodec 设定声音编解码器，未设定时则使用与输入流相同的编解码器
-an 不处理音频
```

通过下面命令，即可实现把本地视频文件转换成rtsp格式，并推流到rtsp服务器
```
ffmpeg -re -stream_loop -1 -i 你视频的文件名 -c copy -f rtsp rtsp://127.0.0.1:8554/video

#简单对参数说明
-re  是以流的方式读取
-stream_loop -1   表示无限循环读取   -stream_loop 0 不循环   -stream_loop 1 循环一次 
-i  就是输入的文件
-f  格式化输出到哪里
-c copy  直接复制，不经过重新编码（这样比较快）
```


## 直播服务器环境
rtsp server:[MediaMTX](https://github.com/bluenviron/mediamtx),一个rtsp推流服务器
在windows中下载后是一个单独的exe可执行文件，通过CMD启动mediamtx.exe



## 流媒体播放解码器
VLC
通过在VLC中添加rtsp://127.0.0.1:8554/video地址来播放视频



- 推流，指的是把采集阶段封包好的内容传输到服务器的过程。
- 拉流，这个指的是用户端从服务器拉取语音视频流到客户端播放。

可以简单理解为推流，就是将音视频数据推送至某IP的指定端口。拉流就是从该IP指定端口，拉取数据进行播放。那么数据传输过程中，我们可以使用的传输协议有很多，例如RTSP、RTMP、HLS等。




## 如何用ffmpeg抽帧
```sh
@echo off

set "outputDir=out"

if not exist "%outputDir%" (
    echo "out" not exist create...
    mkdir "%outputDir%"
) else (
    echo "out dir exist"
)

:: 按照视频实际的帧数抽帧
ffmpeg -i test.mp4 -vf "select=not(mod(n\,1))" -vsync vfr out/o_%05d.png

pause
```

## 合成视频
```
ffmpeg -r 20 -i o_%05d.png -c:v libx264 -pix_fmt yuv420p   -b:v 10M   output.mp4
```
- `-framerate 20`：设定视频帧率为 30 帧每秒，根据实际需要修改。
- `-i image_%04d.png`：表示输入文件名格式，`%04d` 表示文件名为 `image_0001.png` 到 `image_9999.png`。
- `-c:v libx264`：选择视频编解码器为 H.264。
- `-pix_fmt yuv420p`：指定像素格式为 yuv420p，这在某些播放器上兼容性更好。
- `-b:v 10M` 指定码率，10M/s
- `output.mp4`：输出视频文件名。

## 参考链接
* [如何用 python 做RTSP 视频直播（window篇） - 知乎](https://zhuanlan.zhihu.com/p/636038025)
* [设置VLC播放器进行RTSP推流视频_vlc推流rtsp](https://blog.csdn.net/zyhse/article/details/113757935)