rustc
rustfmt
rustup update stable 安装最新稳定版的Rust

cargo new <name> -- lib  创建库

rustup docs --book  Rust包含的一份英文离线版
cargo doc --open 构建所有本地依赖提供的文档

cargo new 创建项目。
cargo build 构建项目。
cargo run 一步构建并运行项目。
cargo check 在不生成二进制文件的情况下构建项目来检查错误。

cargo build --release
在 target/release 而不是 target/debug 下生成可执行文件。这些优化可以让 Rust 代码运行的更快，不过启用这些优化也需要消耗更长的编译时间