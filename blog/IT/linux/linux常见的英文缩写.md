su：Swith user  切换用户，切换到root用户
cat: Concatenate  串联
uname: Unix name  系统名称
df: Disk free  空余硬盘
du: Disk usage 硬盘使用率
chown: Change owner 改变所有者
chgrp: Change group 改变用户组
ps：Process Status  进程状态
tar：Tape archive 解压文件
chmod: Change mode 改变模式
umount: Unmount 卸载
ldd：List dynamic dependencies 列出动态相依
insmod：Install module 安装模块
rmmod：Remove module 删除模块
lsmod：List module 列表模块
alias :Create your own name for a command
bash :GNU Bourne-Again Shell  linux内核
grep:global regular expression print
httpd :Start Apache
ipcalc :Calculate IP information for a host
ping :Send ICMP ECHO_Request to network hosts
reboot: Restart your computer
sudo:Superuser do
 
/bin = BINaries
/dev = DEVices
/etc = 存放配置文件的地方。配置文件的目录
       Editable Text Configuration 初期etcetra directory（ETCetera）,后来"Editable Text Configuration" 或者 "Extended Tool Chest"。
/opt = Optional application software packages
pwd  =  print working Directory (打印工作目录)。
/lib = LIBrary
/proc = PROCesses
/sbin = Superuser BINaries
/tmp = TeMPorary
/usr = Unix Shared Resources
/var = VARiable ? 是储存各种变化的文件，比如log等等
FIFO = First In, First Out
GRUB = GRand Unified Bootloader
IFS = Internal Field Seperators
LILO = LInux LOader
MySQL = My最初作者的名字SQL = Structured Query Language
PHP = Personal Home Page Tools = PHP Hypertext Preprocessor
PS = Prompt String
Perl = "Pratical Extraction and Report Language" = "Pathologically Eclectic Rubbish Lister"
Python Monty Python's Flying Circus
Tcl = Tool Command Language
Tk = ToolKit
VT = Video Terminal
YaST = Yet Another Setup Tool
apache = "a patchy" server
apt = Advanced Packaging Tool
ar = archiver
as = assembler
bash = Bourne Again SHell
bc = Basic (Better) Calculator
bg = BackGround
cal = CALendar
cat = CATenate
cd = Change Directory
chgrp = CHange GRouP
chmod = CHange MODe
chown = CHange OWNer
chsh = CHange SHell
cmp = compare
cobra = Common Object Request Broker Architecture
comm = common
cp = CoPy
cpio = CoPy In and Out
cpp = C Pre Processor
cups = Common Unix Printing System
cvs = Current Version System
daemon = Disk And Execution MONitor
dc = Desk Calculator
dd = Disk Dump
df = Disk Free
diff = DIFFerence
dmesg = diagnostic message
du = Disk Usage
ed = editor
egrep = Extended GREP
elf = Extensible Linking Format
elm = ELectronic Mail
emacs = Editor MACroS
eval = EVALuate
ex = EXtended
exec = EXECute
fd = file descriptors
fg = ForeGround
fgrep = Fixed GREP
fmt = format
fsck = File System ChecK
fstab = FileSystem TABle
fvwm = F*** Virtual Window Manager
gawk = GNU AWK
gpg = GNU Privacy Guard
groff = GNU troff
hal = Hardware Abstraction Layer
joe = Joe's Own Editor
ksh = Korn SHell
lame = Lame Ain't an MP3 Encoder
lex = LEXical analyser
lisp = LISt Processing = Lots of Irritating Superfluous Parentheses
ln = LiNk
lpr = Line PRint
ls = list
lsof = LiSt Open Files
m4 = Macro processor Version 4
man = MANual pages
mawk = Mike Brennan's AWK
mc = Midnight Commander
mkfs = MaKe FileSystem
mknod = MaKe NODe
motd = Message of The Day
mozilla = MOsaic GodZILLa
mtab = Mount TABle
mv = MoVe
nano = Nano's ANOther editor
nawk = New AWK
nl = Number of Lines
nm = names
nohup = No HangUP
nroff = New ROFF
od = Octal Dump
passwd = PASSWorD
pg = pager
pico = PIne's message COmposition editor
pine = "Program for Internet News & Email" = "Pine is not Elm"
ping =  Packet InterNet Grouper
pirntcap = PRINTer CAPability
popd = POP Directory
pr = pre
printf = PRINT Formatted
ps = Processes Status
pty = pseudo tty
pushd = PUSH Directory
pwd = Print Working Directory
rc = runcom = run command, shell
rev = REVerse
rm = ReMove
rn = Read News
roff = RunOFF
rpm = RPM Package Manager = RedHat Package Manager
rsh, rlogin, = Remote
rxvt = ouR XVT
sed = Stream EDitor
seq = SEQuence
shar = SHell ARchive
slrn = S-Lang rn
ssh = Secure SHell
ssl = Secure Sockets Layer
stty = Set TTY
su = Substitute User
svn = SubVersioN
tar = Tape ARchive
tcsh = TENEX C shell
telnet = TEminaL over Network
termcap = terminal capability
terminfo = terminal information
tr = traslate
troff = Typesetter new ROFF
tsort = Topological SORT
tty = TeleTypewriter
twm = Tom's Window Manager
tz = TimeZone
udev = Userspace DEV
ulimit = User's LIMIT
umask = User's MASK
uniq = UNIQue
vi = VIsual = Very Inconvenient
vim = Vi IMproved
wall = write all
wc = Word Count
wine = WINE Is Not an Emulator
xargs = eXtended ARGuments
xdm = X Display Manager
xlfd = X Logical Font Description
xmms = X Multimedia System
xrdb = X Resources DataBase
xwd = X Window Dump
yacc = yet another compiler compiler
/var 包含系统一般运行时要改变的数据。通常这些数据所在的目录的大小是要经常变化或扩充的。原来 /var 目录中有些内容是在 /usr 中的，但为了保持 /usr 目录的相对稳定，就把那些需要经常改变的目录放到 /var 中了。每个系统是特定的，即不通过网络与其他计算机共享。下面列出一些重要的目录 ( 一些不太重要的目录省略了 ) 。
1. /var/catman ： 包括了格式化过的帮助 (man) 页。帮助页的源文件一般存在 /usr/man/catman 中；有些 man 页可能有预格式化的版本，存在 /usr/man/cat 中。而其他的 man 页在第一次看时都需要格式化，格式化完的版本存在 /var/man 中，这样其他人再看相同的页时就无须等待格式化了。 (/var/catman 经常被清除，就像清除临时目录一样。 )
2. /var/lib ： 存放系统正常运行时要改变的文件。
3. /var/local ： 存放 /usr/local 中安装的程序的可变数据 ( 即系统管理员安装的程序 ) 。注意，如果必要，
即使本地安装的程序也会使用其他 /var 目录，例如 /var/lock 。
4. /var/lock ： 锁定文件。许多程序遵循在 /var/lock 中产生一个锁定文件的约定，以用来支持他们正在使用某个特定的设备或文件。其他程序注意到这个锁定文件时，就不会再使用这个设备或文件。
5. /var/log ： 各种程序的日志 (log) 文件，尤其是 login (/var/log/wtmplog 纪录所有到系统的登录和注销 ) 和 syslog (/var/log/messages 纪录存储所有核心和系统程序信息 ) 。 /var/log 里的文件经常不确定地增长，应该定期清除。
6. /var/run ： 保存在下一次系统引导前有效的关于系统的信息文件。例如， /var/run/utmp 包含当前登录的用户的信息。
7. /var/spool ： 放置 “ 假脱机 (spool)” 程序的目录，如 mail 、 news 、打印队列和其他队列工作的目录。每个不同的 spool 在 /var/spool 下有自己的子目录，例如，用户的邮箱就存放在 /var/spool/mail 中。
8. /var/tmp ： 比 /tmp 允许更大的或需要存在较长时间的临时文件。注意系统管理员可能不允许 /var/tmp 有很旧的文件。
 
/etc 文件系统
/etc 目录包含各种系统配置文件，下面说明其中的一些。其他的你应该知道它们属于哪个程序，并阅读该程序的 man 页。许多网络配置文件也在 /etc 中。
1. /etc/rc 或 /etc/rc.d 或 /etc/rc?.d ： 启动、或改变运行级时运行的脚本或脚本的目录。
2. /etc/passwd ： 用户数据库，其中的域给出了用户名、真实姓名、用户起始目录、加密口令和用户的其他信息。
3. /etc/fdprm ： 软盘参数表，用以说明不同的软盘格式。可用 setfdprm 进行设置。更多的信息见 setfdprm 的帮助页。
4. /etc/fstab ： 指定启动时需要自动安装的文件系统列表。也包括用 swapon -a 启用的 swap 区的信息。
5. /etc/group ： 类似 /etc/passwd ，但说明的不是用户信息而是组的信息。包括组的各种数据。
6. /etc/inittab ： init 的配置文件。
7. /etc/issue ： 包括用户在登录提示符前的输出信息。通常包括系统的一段短说明或欢迎信息。具体内容由系统管理员确定。
8. /etc/magic ： “file” 的配置文件。包含不同文件格式的说明， “file” 基于它猜测文件类型。
9. /etc/motd ： motd 是 message of the day 的缩写，用户成功登录后自动输出。内容由系统管理员确定。常用于通告信息，如计划关机时间的警告等。
10. /etc/mtab ： 当前安装的文件系统列表。由脚本 (scritp) 初始化，并由 mount 命令自动更新。当需要一个当前安装的文件系统的列表时使用 ( 例如 df 命令 ) 。
11. /etc/shadow ： 在安装了影子 (shadow) 口令软件的系统上的影子口令文件。影子口令文件将 /etc/passwd 文件中的加密口令移动到 /etc/shadow 中，而后者只对超级用户 (root) 可读。这使破译口令更困难，以此增加系统的安全性。
12. /etc/login.defs ： login 命令的配置文件。
13. /etc/printcap ： 类似 /etc/termcap ，但针对打印机。语法不同。
14. /etc/profile 、 /etc/csh.login 、 /etc/csh.cshrc ： 登录或启动时 bourne 或 cshells 执行的文件。这允许系统管理员为所有用户建立全局缺省环境。
15. /etc/securetty ： 确认安全终端，即哪个终端允许超级用户 (root) 登录。一般只列出虚拟控制台，这样就不可能 ( 至少很困难 ) 通过调制解调器 (modem) 或网络闯入系统并得到超级用户特权。
16. /etc/shells ： 列出可以使用的 shell 。 chsh 命令允许用户在本文件指定范围内改变登录的 shell 。提供一
台机器 ftp 服务的服务进程 ftpd 检查用户 shell 是否列在 /etc/shells 文件中，如果不是，将不允许该用户登录。
17. /etc/termcap ： 终端性能数据库。说明不同的终端用什么 “ 转义序列 ” 控制。写程序时不直接输出转义
序列 ( 这样只能工作于特定品牌的终端 ) ，而是从 /etc/termcap 中查找要做的工作的正确序列。这样，多数的程序可以在多数终端上运行。