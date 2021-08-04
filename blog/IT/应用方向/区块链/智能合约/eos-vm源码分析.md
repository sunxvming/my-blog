

## eos-vm
EOS-VM 是纯头文件的，这意味着 EOS-VM 可以被嵌入进几乎所有的 C++项目中。


### 1. 浮点数的支持
对于浮点数，很多开发者往往片面的认为其运算是不精确的，无法用于区块链系统。实际上并非如此，只是对于一些不同的硬件中，因为各种各样的历史原因，硬件中固化的浮点数运算有一些差异，解决这一点最好的方式是使用 softfloat 库，不使用机器硬件提供的浮点数，这样不同的硬件机器上，浮点数运算的结果都是相同的了。当然这里 Block.one 也提到，如果不在乎所有平台上保持浮点数运算的确定性，则可以使用基于硬件的浮点数运算，这样效率会比使用 softfloat 快很多，这种情况一般是节点硬件机器会保持统一的状态下使用的。
在 EOSIO 中其实也集成了 softfloat 库，但是之前的实现是在链中嵌入的，原生的虚拟机中本身不支持，现在并入虚拟机实现，可以降低其他区块链使用 EOS-VM 时的开发成本。


### 2. watchdog 
EOS-VM 增加了 watchdog 机制以确保运行字节码的运行时间限制，这个类似看门狗的机制，会在细粒度上对合约进行资源使用限制。






## 执行流程：
* 1.解析wasm二进制文件，并且生成module对象
* 2.若有HostFunctions，解析HostFunctions::resolve(_mod);
* 3.设置allocator，并初始化
* 4.用registered_host_functions::resolve解析自定义方法
* 5.调用backend的call方法调用指定的方法
    调用execution_context的execute
    




## 各个文件
```
parser.hpp
    解析wasm二进制文件，并且生成module对象
    parse_module(wasm_code_ptr& code_ptr, size_t sz, module& mod)
        parse_section 解析wasm二进制格式的不同段，这个方法是重载的
    
    parse_function_body()
    parse_function_body_code()
        解析函数的body体的指令，parser文件的主要代码量用在处理各个指令上


types.hpp
    用c++的结构来定义wasm的类型，比如func_type、import_entry、table_type、memory_type




watchdog.hpp
    看门狗定时器，指定时间后或除了作用域触发给定的callback






backend.hpp
    backend对象构造时所做的工作：
        1.解析wasm二进制文件，生成module对象 2.向module对象的import_functions中注入自定义的方法
        




host_function.hpp
    1.registered_host_functions 该结构体在 mappings 中保存自定义的方法
    2.通过add接口来实现自定义的方法的添加到mappings中
        rhf_t::add<nullptr_t, &print_num, wasm_allocator>("env", "print_num");
    3.resolve()
        将module中的imports和mappings中的方法关联起来




execution_context.hpp
    execution_context_base
        jit_execution_context
        execution_context
    
    execute(Host* host, Visitor&& visitor, const std::string_view func,Args... args)
    execute(Host* host, Visitor&& visitor, uint32_t func_index, Args... args)
        _mod.get_exported_function(func);  通过module找出执行函数的index
        分两种情况：
            1.imported_function
                
            2.非imported_function
                


allocator.hpp
    执行内存分配的类






opcodes.hpp opcodes_def.hpp
    定义wasm的所有操作码




base_visitor.hpp
    disassembly.hpp
    interpret_visitor.hpp
        解析操作码
            [[gnu::always_inline]] inline void operator()(const i64_mul_t& op) {
             context.inc_pc();
             const auto& rhs = context.pop_operand().to_ui64();
             auto&       lhs = context.peek_operand().to_ui64();
             lhs *= rhs;
            }




```








【维基链】
```
wasm_context_interface
    wasm_context_rpc




    wasm_context
        执行上下文中包含着
        receiver， 
    
        其中拥有wasm_interface对象


wasm_interface.cpp
    validate()  读取并验证wasm是否合法
    execute()    
        pInstantiated_module->apply(pWasmContext);  具体的执行


wasm_runtime.cpp
    instantiate_module()
        创建出backend对象
    apply(wasm::wasm_context_interface *pContext)  
        传入执行的上下文，之后会执行合约的某个action








rpcapiconf.h
    所有rpcapi定义的地方


```


【合约】
```
rpcsubmittx.cpp
    submitsetcodetx()  部署合约
        读取wasm， validate()验证wasm
        读取abi
    submittx()  执行合约
        
```




 
    
【交易】
universaltx.h 
    交易的通用结构
    




【abi】
```
abi_def.hpp
    用struct abi_def来表示abi的结构
wasm_variant.hpp
    json和abi数据类型之间的转换


test_abi.cpp
    测试abi功能


{
"version": "wasm::abi/1.0",
 "types": [{
    "new_type_name": "A",
    "type": "name"
  },{
    "new_type_name": "name",
    "type": "A"
  }],
 "structs": [],
 "actions": [],
 "tables": [],
 "ricardian_clauses": []
}
```





