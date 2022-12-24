以下代码为SpaceB类使用TestA命名空间中的SpaceA类的使用方法

SpaceA.h
```
#pragma once
namespace TestA {
    class SpaceA {
    public:
        SpaceA();
        ~SpaceA();

        void print();
    };
}
```
SpaceA.cpp
```
#include "SpaceA.h"
using namespace TestA;

SpaceA::SpaceA() {
}


SpaceA::~SpaceA() {
}

void SpaceA::print() {
    int i = 0;
    i++;
}
```

SpaceB.h
```
#pragma once

//在使用之前声明一下
namespace TestA {
    class SpaceA;
}

namespace TestB {
    class SpaceB {
    public:
        SpaceB();
        ~SpaceB();
        void printB();
    private:
        TestA::SpaceA* a;//使用的时候，必须加上命名空间
    };

}
```
SpaceB.cpp
```
#include "SpaceB.h"
#include "SpaceA.h"
using namespace TestB;
using namespace TestA;

SpaceB::SpaceB() {
    a = new SpaceA;
}

SpaceB::~SpaceB() {
}

void SpaceB::printB() {
    int i = 9;
    i++;
    a->print();
}
```

在使用的时候：
```
#include "SpaceB.h"
using namespace TestB;

int main(int argc, char *argv[]){

    SpaceB b;
    b.printB();
}
```