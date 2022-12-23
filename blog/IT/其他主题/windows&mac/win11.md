命令汇总：（执行完之后，重启电脑生效）  **Win11变为Win10右键风格命令：**
 ``` reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve ``` 
**Win11恢复Win11右键风格命令：**
 ``` reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f ```

