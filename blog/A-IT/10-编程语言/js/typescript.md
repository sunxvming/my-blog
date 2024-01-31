
## 类型系统



## 面向对象

### 箭头函数
箭头函数通常用于匿名函数、回调函数、事件处理器等情况，以确保函数内部的 this 与外部作用域保持一致。然而，当需要访问对象的属性时，应该谨慎使用箭头函数，因为它可能导致与预期不一致的结果。
```ts
const person = {
  name: "John",
  sayHello: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

person.sayHello(); // 输出 "Hello, my name is John"
```

```ts
const person = {
  name: "John",
  sayHello: () => {
    console.log(`Hello, my name is ${this.name}`);
  }
};

person.sayHello(); // 输出 "Hello, my name is undefined",  因为外部作用域中没有this变量
```



## 模块，模块导入导出
export default
只能有一个默认导出，import使用时不用加括号
```ts
// 导出函数：
// myFunction.ts
export default function myFunction() {
  console.log('This is my function');
}

// 在其他模块中：
// main.ts
import myFunction from './myFunction';  // import的时候不用加括号

myFunction(); // 调用默认导出的函数
```

## 异步编程
### Promise
Promise 是用于处理异步操作的一种机制，它可以帮助您更容易地处理异步任务，避免了回调地狱（callback hell）的问题

**基本使用**
```ts
const myPromise = new Promise((resolve, reject) => {
  // 异步操作，例如网络请求或文件读取
  setTimeout(() => {
    const data = 'Promise resolved data';
    resolve(data); // 异步操作成功时调用 resolve
    // 或者在失败时调用 reject
  }, 1000);
});

myPromise
  .then((result) => {
    console.log('Promise resolved with result:', result);
  })
  .catch((error) => {
    console.error('Promise rejected with error:', error);
  });
```

**链式使用**
您可以通过链式调用 then 方法来处理多个异步操作。每个 then 方法返回一个新的 Promise，可以继续在其上进行操作。
```ts
myPromise
  .then((result) => {
    console.log('Step 1:', result);
    return 'Step 2 data';
  })
  .then((result) => {
    console.log('Step 2:', result);
  })
  .catch((error) => {
    console.error('Promise rejected with error:', error);
  });
//output:
// Step 1: Promise resolved data
// Step 2: Step 2 data
```

**Promise.all**
允许您同时处理多个 Promise，只有当所有 Promise 都成功时才会触发成功回调，如果有一个失败，则触发失败回调。
```ts
const promise1 = Promise.resolve('Promise 1 data');
const promise2 = Promise.resolve('Promise 2 data');
const promise3 = Promise.reject('Promise 3 error');

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log('All promises resolved:', results);
  })
  .catch((error) => {
    console.error('At least one promise rejected:', error);
  });

```

**Promise.race**
允许您等待多个 Promise 中的第一个完成的结果，无论成功还是失败。
```ts
const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1'), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2'), 500));

Promise.race([promise1, promise2])
  .then((result) => {
    console.log('First promise resolved:', result);
  })
  .catch((error) => {
    console.error('All promises rejected:', error);
  });
```



### async await
`async` 和 `await` 是用于处理异步操作的语法糖，它们使异步代码更具可读性和可维护性。
它使异步代码更加清晰和易于理解，避免了回调地狱，并使错误处理更加方便。是现代 JavaScript 和 TypeScript 中处理异步操作的推荐方法。

**async** 是 Promise 的语法糖：async 函数本质上是一个返回 Promise 对象的函数。当函数被声明为 async 时，它会自动将函数的返回值包装在一个 Promise 中，使其具有 Promise 的行为，可以通过 await 等待异步操作的结果。
```ts
async function fetchData() {
  // 异步操作
  return 'Data';
}
```
上述代码中的 fetchData 函数会隐式地返回一个 Promise，因此您可以使用 await 来等待其结果。

**await** 是 Promise 的语法糖：await 关键字用于等待一个 Promise 被 resolved，并将 Promise 的结果解析为值。它可以替代传统的 Promise .then() 调用，使异步代码更具可读性。
```ts
async function fetchData() {
  const result = await someAsyncFunction();
  return result;
}
```


调用异步函数时，可以像调用普通函数一样使用 await 来等待异步操作的返回值。
await针对所跟不同表达式的处理方式：
- Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。
- 非 Promise 对象：直接返回对应的值。

**基本使用**
```ts
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    // 在这里可以使用 response 数据，而不用回调函数
    const data = await response.json();
    return data;
  } catch (error) {    //如果 await 的 Promise 被 rejected，它将抛出一个异常,这里需要捕获
    console.error('An error occurred:', error);
    throw error; // 可选：重新抛出异常以供上层处理
  }
}
```

**并行执行多个异步操作**
```ts
async function fetchAllData() {
  const promise1 = fetchData('https://api.example.com/data1');
  const promise2 = fetchData('https://api.example.com/data2');
  const [data1, data2] = await Promise.all([promise1, promise2]);
  console.log('Data 1:', data1);
  console.log('Data 2:', data2);
}
```

**使用箭头函数**：
```ts
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};
```


## 构建工具



## 类和接口的区别

在 TypeScript 中，类（`class`）和接口（`interface`）都用于定义对象的结构和行为，但它们有一些重要的区别：

1. **目的不同**：
    - 类（`class`）：类主要用于创建对象的构造函数，并包含对象的属性和方法。类用于创建实际的对象实例，可以实例化（`new`）并使用。
    - 接口（`interface`）：接口主要用于定义对象的形状（结构）和契约（约定），但它们不创建实际的对象。接口用于描述对象应该具有的属性和方法，以便在编译时进行类型检查。
        
2. **实例化**：
    - 类可以被实例化，而接口不能。类的实例是真正的对象，可以在运行时创建和操作。
    - 接口在运行时不会生成任何 JavaScript 代码，它们只用于编译时类型检查。
        
3. **继承**：
    - 类可以相互继承，一个类可以继承另一个类的属性和方法，从而创建更复杂的类。
    - 接口可以相互继承，一个接口可以继承另一个接口，从而扩展接口的结构。
        
4. **多重继承**：
    - 类支持单一继承，一个类只能继承自一个父类。
    - 接口支持多重继承，一个类可以实现多个接口，从而获得多个接口定义的属性和方法。
        
5. **属性实现**：
    - 类中的属性可以有具体的实现（赋予初始值），而接口中的属性只是声明，不包含实际的实现。
    - 接口中的属性通常没有初始值，因为接口只定义了对象的形状。
        
6. **构造函数**：
    - 类可以定义构造函数，用于初始化对象的属性。
    - 接口不能定义构造函数，因为它们不创建对象。
        
7. **访问修饰符**：
    - 类可以使用访问修饰符（如 `public`、`private`、`protected`）来控制属性和方法的可访问性。
    - 接口中的属性和方法默认为 `public`，不能包含访问修饰符。
        
8. **实例方法**：
    - 类中的方法可以包含实际的实现逻辑，可以操作对象的属性和状态。
    - 接口中的方法只是声明，不包含实际的实现，需要在实现接口的类中提供方法的具体实现。