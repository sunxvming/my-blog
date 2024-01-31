## word

### 图片的文字环绕
原因：是因为Word中默认插入图片的环绕方式是“嵌入式”，所以不能移动。
解决技巧：只需单击图片，点击【格式】-【环绕文字】按钮，在弹出的菜单中除“嵌入型”之外，随便选择一种文字环绕方式，然后用鼠标左键拖动图片，即可移动图片。



## excel
### 冻结表头
选第几行几列的固定点
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/cf67020c-6bcd-4278-87ba-93caae77d878.png)
![](https://sxm-upload.oss-cn-beijing.aliyuncs.com/imgs/8bf76a47-1823-4209-9617-5d3aeda98d5f.png)
 


 
### WORD字数统计
```
Sub WORD字数统计()
Dim wapp, m, k, word1, i%
Application.ScreenUpdating = False


    With ThisWorkbook.Sheets(1)
        .Range("A2:Z9999").Clear
        Set wapp = CreateObject("Word.Application")
        m = Application.GetOpenFilename(Title:="打开文件", MultiSelect:=True, filefilter:="WORD文件(*.doc*),*.doc*")
        '判断是否选中文件


        If Not IsArray(m) Then
            Application.ScreenUpdating = True
            Exit Sub
        End If


        .Cells(1, 1) = "名称"
        .Cells(1, 2) = "字数"
        i = 2


        For Each k In m
            Set word1 = wapp.documents.Open(k)
            wapp.Windows(1).Visible = True
            .Cells(i, 1) = word1.Name '文件名
            .Cells(i, 2) = word1.BuiltinDocumentProperties(15) '字数
            .Cells(i, 3) = word1.InlineShapes.Count '图片数
            .Cells(i, 4) = word1.tables.Count '表格数
            i = i + 1
            word1.Close False
            Set word1 = Nothing
        Next
    End With


    wapp.Quit
    Set wapp = Nothing
    MsgBox "完成", , "统计完毕"
End Sub
```

Excel -> Alt+F11 -> 插入模块 -> 粘贴代码 -> 运行 -> 选择文件即可






 


 