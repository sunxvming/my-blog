## 介绍
[gRPC](https://github.com/grpc/grpc) - An RPC library and framework

## 为什么使用grpc?
主要包括以下两点原因：
* gRPC可以通过protobuf来定义接口，从而可以有更加严格的接口约束条件。
* 通过protobuf可以将数据序列化为二进制编码，这会大幅减少需要传输的数据量，从而大幅提高性能
* 支持http 2.0标准化协议。

http/2带来了网络性能的巨大提升，下面列举一些个人觉得比较重要的细节：
http/2对每个源只需创建一个持久连接，在这一个连接内，可以并行的处理多个请求和响应，而且做到不相互影响。
允许客户端和服务端实现自己的数据流和连接流控制，这对我们传输大数据非常有帮助。

## 使用场景
1.  需要对接口进行严格约束的情况，比如我们提供了一个公共的服务，很多人，甚至公司外部的人也可以访问这个服务，这时对于接口我们希望有更加严格的约束，我们不希望客户端给我们传递任意的数据，尤其是考虑到安全性的因素，我们通常需要对接口进行更加严格的约束。这时gRPC就可以通过protobuf来提供严格的接口约束。
2.  对于性能有更高的要求时。有时我们的服务需要传递大量的数据，而又希望不影响我们的性能，这个时候也可以考虑gRPC服务，因为通过protobuf我们可以将数据压缩编码转化为二进制格式，通常传递的数据量要小得多，而且通过http2我们可以实现异步的请求，从而大大提高了通信效率。

## 编译grpc
- [官网入门教程,C++ Quick start](https://www.grpc.io/docs/languages/cpp/quickstart/)
- [grpc examples](https://github.com/grpc/grpc/tree/master/examples)

注意：
git源码依赖的其他项目比较多，大都在third_party目录下，这里引了好多其他的github项目，所以在拉代码的时候要把其他的github项目也拉过来，国内github的网络不好，拉的要有耐心。

## gRPC四类服务方法
gRPC 允许你定义四类服务方法：

### 1. 单项 RPC
即客户端发送一个请求给服务端，从服务端获取一个应答，就像一次普通的函数调用。
```
rpc SayHello(HelloRequest) returns (HelloResponse){
}
```

### 2. 服务端流式 RPC
即客户端发送一个请求给服务端，可获取一个数据流用来读取一系列消息。客户端从返回的数据流里一直读取直到没有更多消息为止。
```
rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse){
}
```

### 3. 客户端流式 RPC
即客户端用提供的一个数据流写入并发送一系列消息给服务端。一旦客户端完成消息写入，就等待服务端读取这些消息并返回应答。
```
rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse) {
}
```

### 4. 双向流式 RPC
即两边都可以分别通过一个读写数据流来发送一系列消息。这两个数据流操作是相互独立的，所以客户端和服务端能按其希望的任意顺序读写，例如：服务端可以在写应答前等待所有的客户端消息，或者它可以先读一个消息再写一个消息，或者是读写相结合的其他方式。每个数据流里消息的顺序会被保持。
```
rpc BidiHello(stream HelloRequest) returns (stream HelloResponse){
}
```

## gRPC HelloWorld实例详解
### 1.  通过protobuf来定义数据类型和接口
```
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
### 2.  用protocol buffer 编译器 protoc 生成相应的数据类型类
```
protoc --cpp_out=. *.proto
```
生成的文件的后缀为：pb.h、pb.cc  比如：helloworld.pb.h
### 3.  用protocol buffer 编译器 protoc 生成客户端、服务端的接口代码，生成的代码包括客户端的存根和服务端要实现的抽象接口
```
protoc --grpc_out=. --plugin=protoc-gen-grpc=`which grpc_cpp_plugin` *.proto
```
生成的文件的后缀为：grpc.pb.h、grpc.pb.cc  比如：helloworld.grpc.pb.h
在helloworld.grpc.pb.h文件中，include了helloworld.pb.h，因为在接口定义中用的数据类型是protobuf定义的
### 4.  编写gRPC server端代码
```cpp
#include <iostream>
#include <memory>
#include <string>

#include <grpcpp/grpcpp.h>
#include <grpcpp/health_check_service_interface.h>
#include <grpcpp/ext/proto_server_reflection_plugin.h>

#ifdef BAZEL_BUILD
#include "examples/protos/helloworld.grpc.pb.h"
#else
#include "helloworld.grpc.pb.h"
#endif

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using helloworld::HelloRequest;
using helloworld::HelloReply;
using helloworld::Greeter;

// Logic and data behind the server's behavior.
class GreeterServiceImpl final : public Greeter::Service {
  Status SayHello(ServerContext* context, const HelloRequest* request,
                  HelloReply* reply) override {
    std::string prefix("Hello ");
    reply->set_message(prefix + request->name());
    return Status::OK;
  }
};

void RunServer() {
  std::string server_address("0.0.0.0:50051");
  GreeterServiceImpl service;

  grpc::EnableDefaultHealthCheckService(true);
  grpc::reflection::InitProtoReflectionServerBuilderPlugin();
  ServerBuilder builder;
  // Listen on the given address without any authentication mechanism.
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
  // Register "service" as the instance through which we'll communicate with
  // clients. In this case it corresponds to an *synchronous* service.
  builder.RegisterService(&service);  // 向rpc框架注册rpc接口
  // Finally assemble the server.
  std::unique_ptr<Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address << std::endl;

  // Wait for the server to shutdown. Note that some other thread must be
  // responsible for shutting down the server for this call to ever return.
  server->Wait();
}

int main(int argc, char** argv) {
  RunServer();

  return 0;
}
```

### 5.  编写gRPC client端代码
```cpp
#include <iostream>
#include <memory>
#include <string>

#include <grpcpp/grpcpp.h>

#ifdef BAZEL_BUILD
#include "examples/protos/helloworld.grpc.pb.h"
#else
#include "helloworld.grpc.pb.h"
#endif

using grpc::Channel;
using grpc::ClientContext;
using grpc::Status;
using helloworld::HelloRequest;
using helloworld::HelloReply;
using helloworld::Greeter;

class GreeterClient {
 public:
  GreeterClient(std::shared_ptr<Channel> channel)
      : stub_(Greeter::NewStub(channel)) {}

  // Assembles the client's payload, sends it and presents the response back
  // from the server.
  std::string SayHello(const std::string& user) {
    // Data we are sending to the server.
    HelloRequest request;
    request.set_name(user);

    // Container for the data we expect from the server.
    HelloReply reply;

    // Context for the client. It could be used to convey extra information to
    // the server and/or tweak certain RPC behaviors.
    ClientContext context;

    // The actual RPC.
    Status status = stub_->SayHello(&context, request, &reply);

    // Act upon its status.
    if (status.ok()) {
      return reply.message();
    } else {
      std::cout << status.error_code() << ": " << status.error_message()
                << std::endl;
      return "RPC failed";
    }
  }

 private:
  std::unique_ptr<Greeter::Stub> stub_;
};

int main(int argc, char** argv) {
  // Instantiate the client. It requires a channel, out of which the actual RPCs
  // are created. This channel models a connection to an endpoint specified by
  // the argument "--target=" which is the only expected argument.
  // We indicate that the channel isn't authenticated (use of
  // InsecureChannelCredentials()).
  std::string target_str;
  std::string arg_str("--target");
  if (argc > 1) {
    std::string arg_val = argv[1];
    size_t start_pos = arg_val.find(arg_str);
    if (start_pos != std::string::npos) {
      start_pos += arg_str.size();
      if (arg_val[start_pos] == '=') {
        target_str = arg_val.substr(start_pos + 1);
      } else {
        std::cout << "The only correct argument syntax is --target=" << std::endl;
        return 0;
      }
    } else {
      std::cout << "The only acceptable argument is --target=" << std::endl;
      return 0;
    }
  } else {
    target_str = "localhost:50051";
  }
  GreeterClient greeter(grpc::CreateChannel(
      target_str, grpc::InsecureChannelCredentials()));
  std::string user("world");
  std::string reply = greeter.SayHello(user);
  std::cout << "Greeter received: " << reply << std::endl;

  return 0;
}
```




```
package sudoku;
option cc_generic_services = true;
option java_generic_services = true;
option py_generic_services = true;

message SudokuRequest {
  required string checkerboard = 1;
}

message SudokuResponse {
  optional bool solved = 1 [default=false];
  optional string checkerboard = 2;
}

service SudokuService {
  rpc Solve (SudokuRequest) returns (SudokuResponse);
}
```


在使用 Protocol Buffers (protobuf) 的 gRPC 中，`service` 定义会在 C++ 中生成两个主要的类：
1. **服务接口类 (Stub Interface Class)**:
    - 这是客户端使用的类，通常以 `Stub` 为后缀。这个类提供了与服务交互的方法，每个 RPC 方法在 `service` 中都会有对应的函数。
    - 例如，对于你定义的 `SudokuService` 服务，protobuf 编译器会生成一个 `SudokuService::Stub` 类。这个类提供了 `Solve` 方法，客户端可以通过这个方法来调用远程的 gRPC 服务。
2. **服务基类 (Service Base Class)**:
    - 这是服务端使用的类，通常以 `Service` 为后缀。这个类定义了一个虚方法 (virtual method) 对应每个 RPC 方法，服务端可以继承这个类并实现这些虚方法来处理请求。
    - 例如，protobuf 编译器会生成一个 `SudokuService::Service` 类。服务端可以继承这个类并实现 `Solve` 方法，用于处理数独求解的逻辑。

- **存根（Stub）**：在RPC中，存根是一个客户端代理，它代表了服务端的一个实例。客户端通过调用存根的方法来间接调用服务端的方法。存根负责将客户端的请求序列化为网络可传输的格式，发送到服务端，然后接收服务端的响应并反序列化，最后将结果返回给客户端。

### 具体生成的类
- **`SudokuService::Stub`**:
    - 客户端使用的类。它提供了同步和异步两种方式来调用远程的 `Solve` 方法。客户端可以使用这个类的实例与远程服务器进行通信。
- **`SudokuService::Service`**:
    - 服务端使用的类。服务端需要继承这个类，并重写 `Solve` 方法以实现实际的服务逻辑。



当你使用 Protocol Buffers 编译器 (`protoc`) 生成 gRPC 代码时，它会为 `SudokuService` 生成 C++ 代码，包括 `SudokuService::Stub` 和 `SudokuService::Service` 类。虽然具体的生成代码可能会因 protobuf 和 gRPC 版本而有所不同，但下面是一个典型的 `SudokuService::Stub` 和 `SudokuService::Service` 类的代码结构示例。

### 1. `SudokuService::Stub` 类

`SudokuService::Stub` 类是客户端使用的，用于向服务器发起 RPC 请求。
```cpp
class SudokuService::Stub final : public ::grpc::internal::StubInterface {
public:
  // 创建 Stub 对象
  Stub(const std::shared_ptr< ::grpc::ChannelInterface>& channel) 
    : ::grpc::internal::StubInterface(channel) {}

  // Solve 方法的同步调用版本
  ::grpc::Status Solve(::grpc::ClientContext* context, const ::SudokuRequest& request, ::SudokuResponse* response) {
    return ::grpc::internal::BlockingUnaryCall(channel_.get(), rpcmethod_Solve_, context, request, response);
  }

  // Solve 方法的异步调用版本（客户端使用）
  std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::SudokuResponse>> AsyncSolve(::grpc::ClientContext* context, const ::SudokuRequest& request, ::grpc::CompletionQueue* cq) {
    return ::grpc::internal::ClientAsyncResponseReaderFactory< ::SudokuResponse>::Create(channel_.get(), cq, rpcmethod_Solve_, context, request, true);
  }

  // 异步调用版本的非阻塞方式
  std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::SudokuResponse>> PrepareAsyncSolve(::grpc::ClientContext* context, const ::SudokuRequest& request, ::grpc::CompletionQueue* cq) {
    return ::grpc::internal::ClientAsyncResponseReaderFactory< ::SudokuResponse>::Create(channel_.get(), cq, rpcmethod_Solve_, context, request, false);
  }

private:
  // Solve 方法的定义
  const ::grpc::internal::RpcMethod rpcmethod_Solve_ = 
    ::grpc::internal::RpcMethod("SudokuService/Solve", ::grpc::internal::RpcMethod::NORMAL_RPC, channel_);
};
```

### 2. `SudokuService::Service` 类

`SudokuService::Service` 类是服务端使用的，服务端通过继承该类并实现虚方法来处理客户端的请求。

```cpp
class SudokuService::Service : public ::grpc::Service {
public:
  Service() {
    AddMethod(new ::grpc::internal::RpcServiceMethod(
      "SudokuService/Solve",
      ::grpc::internal::RpcMethod::NORMAL_RPC,
      new ::grpc::internal::RpcMethodHandler< SudokuService::Service, ::SudokuRequest, ::SudokuResponse>(
        std::mem_fn(&SudokuService::Service::Solve), this)));
  }

  // 需要服务端重写的虚方法
  virtual ::grpc::Status Solve(::grpc::ServerContext* context, const ::SudokuRequest* request, ::SudokuResponse* response) {
    // 默认返回未实现状态，必须由服务端实现这个方法
    return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
  }
};
```
### 代码解释

- **`SudokuService::Stub` 类**:
    
    - **`Stub` 构造函数**: 用于初始化与 gRPC 服务器的通道（`channel`）。
    - **`Solve` 方法**: 同步调用版本使用 `BlockingUnaryCall` 发起 gRPC 请求；异步版本有两种形式，一种是阻塞调用（等待结果），另一种是非阻塞调用（准备好后由用户处理结果）。
    - **`rpcmethod_Solve_`**: 定义了 RPC 方法的具体实现细节，包括方法名和调用类型。
- **`SudokuService::Service` 类**:
    
    - **`AddMethod` 方法**: 将 `Solve` 方法添加到服务中，这里指定了该方法是一个普通的（同步的）RPC 调用。
    - **`Solve` 虚方法**: 服务端需要重写这个虚方法，以实现具体的数独求解逻辑。如果服务端没有实现该方法，默认会返回未实现的状态。