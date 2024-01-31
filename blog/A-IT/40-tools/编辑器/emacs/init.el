(put 'downcase-region 'disabled nil)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;  配置插件源 && 自动下载插件
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 (when (>= emacs-major-version 24)
     (require 'package)
     (package-initialize)
     (setq package-archives '(("gnu"   . "http://elpa.emacs-china.org/gnu/")
		      ("melpa" . "http://elpa.emacs-china.org/melpa/"))))

;; 注意 elpa.emacs-china.org 是 Emacs China 中文社区在国内搭建的一个 ELPA 镜像

 ;; cl - Common Lisp Extension
 (require 'cl)

 ;; Add Packages
 (defvar my/packages '(
		;; --- Auto-completion ---
           company
	       company-lua
		;; --- Better Editor ---
		hungry-delete
		swiper
		counsel
		smartparens
		;; --- Major Mode ---
		lua-mode
		
		;; --- Minor Mode ---
		;;nodejs-repl
		;;exec-path-from-shell
		;; --- Themes ---
		monokai-theme
		;; solarized-theme
		) "Default packages")

 (setq package-selected-packages my/packages)

 (defun my/packages-installed-p ()
     (loop for pkg in my/packages
	   when (not (package-installed-p pkg)) do (return nil)
	   finally (return t)))

 (unless (my/packages-installed-p)
     (message "%s" "Refreshing package database...")
     (package-refresh-contents)
     (dolist (pkg my/packages)
       (when (not (package-installed-p pkg))
	 (package-install pkg))))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; 一些自己的偏好配置
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;加载主题
;;(load-theme 'misterioso 1)

;;字体 字体大小
;;(set-default-font "-outline-Courier New-normal-normal-normal-mono-19-*-*-*-c-*-iso8859-1")
;;(set-foreground-color "#E0DFDB")
(set-background-color "#CCE8CC")

;;显示时间
(display-time)

;;显示行号列号，只在底部显示
(column-number-mode t)

;;左侧也显示行号
(global-linum-mode t)


;;显示匹配的括号
(show-paren-mode t)

;;菜单栏变小
(tool-bar-mode -1)

;;不要总是没完没了的问yes or no, 为什么不能用 y/n
(fset 'yes-or-no-p 'y-or-n-p)

;;关闭烦人的出错时的提示声
;;(setq visible-bell t)

;;关闭起动时的那个“开机画面”
;;(setq inhibit-startup-message t)

;;用一个很大的 kill ring. 这样防止我不小心删掉重要的东西。
(setq kill-ring-max 200)

;;把 fill-column 设为 60. 这样的文字更好读
(setq default-fill-column 60)

;; 关闭文件滑动控件
(scroll-bar-mode -1)



;; 更改光标的样式 。首先是在对象是一个缓冲区局部变量（Buffer-local variable）的时
;;比如这里的 cursor-type ，我们需要区分 setq 与 setq-default ： setq 设置当前
;;冲区（Buffer）中的变量值， setq-default 设 置的为全局的变量的值
(setq-default cursor-type 'bar)
(set-cursor-color "#000000")


;; 关闭启动帮助画面
(setq inhibit-splash-screen 1)

;; 快速打开配置文件
(defun open-init-file()
  (interactive)
  (find-file "~/.emacs.d/init.el"))

;; 这一行代码，将函数 open-init-file 绑定到 <f2> 键上
(global-set-key (kbd "<f2>") 'open-init-file)

;; 开启全局 Company 补全 注： 直接(global-company-mode t)不行，会报这个函数找不到
;; 猜测是company模块还没有加载的原因
(add-hook 'after-init-hook 'global-company-mode)


;; 关闭自动备份，自动备份会生成 xxx~ 的文件
(setq make-backup-files nil)

;; linux下解决emacs的backspace键变成了ctrl+h （C+h）键
(global-set-key "\C-h" 'backward-delete-char-untabify)
(global-set-key "\d" 'delete-char)


;;最近打开文件
(require 'recentf)
(recentf-mode 1)
(setq recentf-max-menu-item 10)
(global-set-key (kbd "C-x C-r") 'recentf-open-files)

;;使用下面的配置文件将删除功能配置成与其他图形界面的编辑器相同，即当你选中一段文字
;;之后输入一个字符会替换掉你选中部分的文字。
(delete-selection-mode 1)


;;开启全屏
;;(setq initial-frame-alist (quote ((fullscreen . maximized))))

;;高亮当前行
(global-hl-line-mode 1)

;;indent 
(setq-default indent-tabs-mode nil)

(setq default-tab-width 4)






