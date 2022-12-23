1.安装scl源：
yum install centos-release-scl scl-utils-build


2.列出scl可用源
yum list all --enablerepo='centos-sclo-rh' | grep "devtoolset-"


3.安装8版本的gcc、gcc-c++、gdb工具链（toolchian）：
yum install -y devtoolset-8-toolchain
scl enable devtoolset-8 bash
gcc --version