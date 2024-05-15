

训练任务的参数
```
python train.py --img 1920 --epochs 3 --data ship.yaml --weights yolov5s.pt  --batch-size 2  --nosave --noval --noautoanchor --noplots --workers 1
```

batch-size 和 workers参数太大的话可能会导致内存太大而崩溃






## 模型文件
YOLO（You Only Look Once）模型通常用于目标检测任务，可以一次性对整个图像进行检测，并且具有较高的检测速度和准确性。在深度学习领域，模型的表示形式可以有多种，如PyTorch的.pt文件和ONNX（Open Neural Network Exchange）的模型文件。
1. **PT文件**：
    - .pt文件通常是PyTorch模型的序列化表示形式，它包含了模型的架构（网络结构）和参数权重。这种表示形式是专门针对PyTorch框架设计的，因此在PyTorch中加载和使用模型非常方便。
    - 当使用YOLO模型时，如果你使用了PyTorch来训练模型，那么你会得到一个.pt文件，其中包含了YOLO模型的架构和相应的权重参数。
2. **ONNX文件**：
    - ONNX（Open Neural Network Exchange）是一种开放的神经网络交换格式，它允许用户在不同的深度学习框架之间交换模型，如PyTorch、TensorFlow、Caffe等。
    - ONNX模型文件包含了模型的计算图（网络结构）以及相应的权重参数。这种格式使得你可以在不同的深度学习框架之间轻松地转换和部署模型。
    - 如果你希望在不同的深度学习框架中使用YOLO模型，或者将YOLO模型与其他模型集成，那么将模型转换为ONNX格式是一个很好的选择。