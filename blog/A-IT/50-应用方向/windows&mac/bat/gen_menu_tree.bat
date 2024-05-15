@echo off
setlocal enabledelayedexpansion

rem 设置起始年份和月份
set "start_year=2022"
set "start_month=1"

rem 设置结束年份和月份
set "end_year=2023"
set "end_month=3"

set /a "total_months=((end_year - start_year) * 12) + (end_month - start_month)"


set "script_directory=%~dp0"

rem 设置需要创建的目录数量
set "num_directories=1"


rem 设置目录前缀
set "prefix=QZ-001-"

rem 遍历创建目录
for /l %%i in (1,1,%num_directories%) do (
    set "directory=!prefix!%%i"
    mkdir "!directory!"
    cd "!directory!"
    
    rem 遍历创建子目录
    for /l %%j in (0,1,%total_months%) do (
        set /a "month_count=(start_year)*12+start_month+%%j-1"
        set /a "year=month_count / 12"
        set /a "month=month_count %% 12 + 1"
        if !month! lss 10 (
            set "month=0!month!"
        )
        set "directory_name=!year!!month!"
        mkdir "!directory_name!"
        
        rem 复制文件到创建的目录中    
        rem 随机生成一个 1 到 3 之间的整数
        set /a "random_number=!random! %% 3 + 1"

        rem 根据随机数执行相应的命令
        if !random_number! equ 1 (
            copy "%script_directory%\1.db3" "!directory_name!\"  
            copy "%script_directory%\2.db3" "!directory_name!\"  
            copy "%script_directory%\3.db3" "!directory_name!\"  
        ) else if !random_number! equ 2 (
            copy "%script_directory%\1.db3" "!directory_name!\"  
            copy "%script_directory%\2.db3" "!directory_name!\"  
            copy "%script_directory%\3.db3" "!directory_name!\"  
            copy "%script_directory%\4.db3" "!directory_name!\"  
        ) else (
            copy "%script_directory%\1.db3" "!directory_name!\"  
            copy "%script_directory%\2.db3" "!directory_name!\"  
            copy "%script_directory%\3.db3" "!directory_name!\"  
            copy "%script_directory%\4.db3" "!directory_name!\"  
            copy "%script_directory%\5.db3" "!directory_name!\"  
        )
        
    )
    
    cd ..
)

echo 目录结构已生成完成！
pause
