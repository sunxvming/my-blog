
rmdir /s /q dist
rmdir /s /q build

call conda activate py38
pyinstaller  competition_console.py

copy config.ini dist\competition_console\
copy competition.db3 dist\competition_console\

rmdir /s /q C:\Users\sunxv\Desktop\work\identify_competition\3_competition_console
mkdir C:\Users\sunxv\Desktop\work\identify_competition\3_competition_console
xcopy dist\competition_console C:\Users\sunxv\Desktop\work\identify_competition\3_competition_console /s

cd C:\Users\sunxv\Desktop\work\identify_competition
c:

:: -mx = 0, 1,2,3,4,5,6,7,8,9  0=store 1=fastest 9=ultra
7z a  -mx1 -r 3_competition_console.zip 3_competition_console
