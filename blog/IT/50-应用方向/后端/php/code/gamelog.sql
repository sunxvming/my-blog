drop database if exists gamelogtest;
create database gamelogtest CHARACTER SET = 'UTF8';

use gamelogtest;

DROP TABLE IF EXISTS `item_log`;
CREATE TABLE `item_log` (
    `dept` varchar(20) NOT NULL DEFAULT '',
    `sid` bigint DEFAULT NULL,
    `user` varchar(255) NOT NULL DEFAULT '',
    `oldsid` bigint  NULL,
    `roleid` bigint  NULL,
    `time` int unsigned DEFAULT NULL,
    `vip` int(11) DEFAULT NULL,
    `level` int(11) DEFAULT NULL,
    `itemid` varchar(255) NOT NULL DEFAULT '',
    `op` int(2) DEFAULT NULL,
    `reason` varchar(30) NOT NULL DEFAULT '',
    `amount` int(11) DEFAULT NULL,
    `channel` varchar(30) NOT NULL DEFAULT '',

    KEY `user` (`user`,`time`),
    KEY `roleid` (`roleid`,`time`)
)ENGINE=myisam 
PARTITION BY RANGE (`time`)( 
	PARTITION d201607p29 VALUES LESS THAN (unix_timestamp('2016-07-29')),
	PARTITION d201607p30 VALUES LESS THAN (unix_timestamp('2016-07-30')),
	PARTITION d201607p31 VALUES LESS THAN (unix_timestamp('2016-07-31')),
	PARTITION pextent VALUES LESS THAN maxvalue 	
);

DROP TABLE IF EXISTS `resource_log`;
CREATE TABLE `resource_log` (
  `dept` varchar(20) NOT NULL DEFAULT '',
  `sid` bigint DEFAULT NULL,
  `user` varchar(255) NOT NULL DEFAULT '',
  `oldsid` bigint DEFAULT NULL,
  `roleid` bigint DEFAULT NULL,
  `time` int unsigned DEFAULT NULL,
  `channel` varchar(30) NOT NULL DEFAULT '',
  `kind` varchar(255) NOT NULL DEFAULT '',
  `vip` int(11) DEFAULT NULL,
  `op` int(2) DEFAULT NULL,
  `reason` varchar(30) NOT NULL DEFAULT '',
  `amount` int(11) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `level` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `item_num` int(11) DEFAULT NULL,

  KEY `user` (`user`,`time`),
  KEY `roleid` (`roleid`,`time`)
)ENGINE=myisam 
PARTITION BY RANGE (`time`)( 
	PARTITION d201607p29 VALUES LESS THAN (unix_timestamp('2016-07-29')),
	PARTITION d201607p30 VALUES LESS THAN (unix_timestamp('2016-07-30')),
	PARTITION d201607p31 VALUES LESS THAN (unix_timestamp('2016-07-31')),
	PARTITION pextent VALUES LESS THAN maxvalue 	
);

DROP TABLE IF EXISTS `other_log`;
CREATE TABLE `other_log` (
  `interface` varchar(30) NOT NULL DEFAULT '',
  `sid` bigint DEFAULT NULL,
  `oldsid` bigint DEFAULT NULL,
  `user` varchar(255) NOT NULL DEFAULT '',
  `roleid` bigint DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT '',
  `channel` varchar(30) NOT NULL DEFAULT '',
  `time` int unsigned DEFAULT NULL,
  `uid` varchar(255) NOT NULL DEFAULT '',
  `machine` varchar(255) NOT NULL DEFAULT '',
  `netw` varchar(255) NOT NULL DEFAULT '',
  `type` int(11) DEFAULT NULL,
  `rolename` varchar(255) NOT NULL DEFAULT '',
  `prof` varchar(30) NOT NULL DEFAULT '',
  `level` int(11) DEFAULT NULL,
  `ip` varchar(20) NOT NULL DEFAULT '',
  `guild` varchar(255) NOT NULL DEFAULT '',
  `vip_level` int(11) DEFAULT NULL,
  `vip` int(11) DEFAULT NULL,
  `money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` int(11) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `order` varchar(30) NOT NULL DEFAULT '',
  `kind` varchar(80) NOT NULL DEFAULT '',
  `reason` varchar(30) NOT NULL DEFAULT '',
  `item_num` int(11) DEFAULT NULL,
  `taskid` varchar(255) NOT NULL DEFAULT '',
  `result` varchar(255) NOT NULL DEFAULT '',
  `usetime` varchar(255) NOT NULL DEFAULT '',
  `jumpn` int(11) DEFAULT NULL,
  `startt` int(11) DEFAULT NULL,
  `sweepn` int(11) DEFAULT NULL,
  `award` varchar(255) NOT NULL DEFAULT '',
  `opid` varchar(255) NOT NULL DEFAULT '',
  `bef_num` int(11) DEFAULT NULL,
  `num` varchar(255) NOT NULL DEFAULT '',
  `onlinetime` int(11) DEFAULT NULL,
  `rolecount` varchar(255) NOT NULL DEFAULT '',
  `regtime` int(10) unsigned DEFAULT NULL,
  `ziz` int(11) DEFAULT NULL,
  `wear` int(11) DEFAULT NULL,
  `power` int(11) DEFAULT NULL,

  KEY `user` (`user`,`interface`,`time`),
  KEY `roleid` (`roleid`,`interface`,`time`)
)ENGINE=myisam 
PARTITION BY RANGE (`time`)( 
	PARTITION d201607p29 VALUES LESS THAN (unix_timestamp('2016-07-29')),
	PARTITION d201607p30 VALUES LESS THAN (unix_timestamp('2016-07-30')),
	PARTITION d201607p31 VALUES LESS THAN (unix_timestamp('2016-07-31')),
	PARTITION pextent VALUES LESS THAN maxvalue 		
);


DROP TABLE IF EXISTS `log_offset`;
CREATE TABLE `log_offset` (
  `logname` bigint(20) NOT NULL,
  `logoffset` bigint(20) NOT NULL,
  `curlines` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;







