

全面禁止核试验条约(The comprehensive nuclear-test-ban treaty, **CTBT**)要求所有缔约国不能进行“任何武器及非武器核试验”.

全面禁止核试验条约条约组织(The comprehensive nuclear-test-ban treaty Organization, **CTBTO**)临时技术秘书处(Provisional Technical Secretariat，**PTS**)负责监督条约的执行。
其下的国际数据中心(International Data Centre, **IDC**)负责对来自国际监测系统(International Monitoring System, **IMS**)台站数据的接收、处理、分析、报告及归档.同时条约要求IDC要不断进行技术能力的提升(Comprehensive nuclear-test-ban treaty 1996, Protocol, part I, paragraph 18(b)).

不断降低在全球范围内的监测阈值，提高自动处理结果的准确性是IDC一直以来面临的挑战.

IDC目前运行的波形数据(地震、水声和次声，Seismic、Hydro-acoustic、and Infrasonic, **SHI**)处理软件Release 3已经应用近20年([Given, 2011](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bGiven2011))，新的处理算法、软件架构不断出现，PTS也一直进行软件改进以满足监测技术发展而带来的新的需求.
PTS组织召开的国际科学技术大会ISS09(2009 International Scientific Studies Conference)([CTBTO, 2009](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bCTBTO2009))、ISS11、ISS13及ISS15([CTBTO, 2015](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bCTBTO2015))为各国专家共同讨论解决CTBT面临的技术挑战提供了很好的平台，涌现出了很多好的想法，部分算法已引起PTS关注并开始在IDC进行测试评估.



IDC地震数据处理软件最新研究进展

## IDC地震数据处理过程
IDC地震数据处理的目标是在给定的时间期限内产生一系列**描述地震事件的公报**.

- 对于IMS台站获取的数据，首先通过自动处理产生一系列的标准事件公报(Standard Event Bulletin, **SEL**)
- 然后分析员对自动处理公报进行审核和更改，产生审核事件公报(Reviewed Event Bulletin，**REB**)公报.
- 作为IDC的产品，REB中包含事件发生时间、深度、震级、误差和其他事件特征.
- 最后，按照CTBT要求对审核公报的结果进行**筛选处理**，特征明显的天然事件被筛选出去，形成标准筛选事件报告(**SSEB**，Standard Screened Event Bulletin)提供给缔约国做进一步分析.


### 自动处理
自动处理包括台站处理和台网关联处理.

**台站处理**目标是检测信号、参数计算及震相识别.

目前IDC软件中，信号检测采用短时能量和长时能量比值的方法实现，台阵在信号检测前要进行聚束滤波，台阵的方位角慢度采用频率-波数(frequency-wavenumber，_f_-_k_)([Kværna and Doornbos, 1986](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bKv%C3%A6rna1986))分析实现，三分向台站方位角采用极化分析实现，采用AIC (Akaike Information Criterion)([Kværna, 1995](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bKv%C3%A6rna1995))方法进行到时精确估计，通过预设条件和神经网络方法进行初步的震相识别.

**台网关联处理**是从多台检测信号中形成事件.目前IDC软件中采用基于格点搜索的全球关联(Global Association, GA)([Bache _et al_., 1993](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bBache1993); [Le Bras _et al_., 1994](https://html.rhhz.net/dqwlxjz/html/20160506.htm#bLe1994))方法实现事件关联，该方法类似于广义聚束法.预先采用相互覆盖的圆在地球表面建立定位格点文件(在一些了解深度地震活动性的区域还有一些额外的深度格点)，针对每个格点，形成“首震相到达台站列表”，关联时假设每个格点为可能的事件位置，以距离格点最近台站的震相作为驱动震相来预测在格点内发生事件的时间，形成种子事件，然后依据该事件在其他台站搜索相容震相，相容震相越多则事件越可信，由驱动震相和相容震相进行事件重新定位，根据与设定的事件定义标准进行比较形成最终结果.该方法最终给出一个详尽的事件、震相列表.关联处理过程中，需要解决相邻时间段、相邻区域间形成的事件的冲突问题.


