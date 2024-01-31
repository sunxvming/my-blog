<?php

/**
 * php getcsv.php 要读的文件  表名
 * interface=game_enter&gid=26&sid=1&oldsid=1&user=1|a&roleid=&rolename=&dept=&channel=0&sign=&time=1497927243574002&ip=10.1.35.95&level=0&prof=0&sex=0&client=win32&vip_level=&ttime=0&olineday=0&regtime=1497927243&createtime=0&rolenum=0&rechsum=0&rechnum=0&frechtype=0&uid=&machine=&devh=0&devw=0
 * 把上面那种格式的转成csv格式的
 */

set_time_limit(0);
error_reporting(0);

$file  = $argv[1];
$table = $argv[2];

$other = ['interface', 'sid', 'oldsid', 'user', 'roleid', 'dept', 'channel', 'time', 'uid', 'machine', 'netw', 'type', 'rolename', 'prof', 'level', 'ip', 'guild', 'vip_level', 'vip', 'money', 'amount', 'balance', 'order', 'kind', 'reason', 'item_num', 'taskid', 'result', 'usetime', 'jumpn', 'startt', 'sweepn', 'award', 'opid', 'bef_num', 'num', 'onlinetime', 'rolecount', 'regtime', 'ziz', 'wear', 'power'];
$item_log = ['dept', 'sid', 'user', 'oldsid', 'roleid', 'time', 'vip', 'level', 'itemid', 'op', 'reason', 'amount', 'channel'];
$resource = ['dept', 'sid', 'user', 'oldsid', 'roleid', 'time', 'channel', 'kind', 'vip', 'op', 'reason', 'amount', 'balance', 'level', 'item_id', 'item_num'];

$dist_f  = fopen($table.".csv","w");

$f = fopen($file, "r");

while (!feof($f)) {

	$s = fgets($f, 4096);

	$dest = [];
	$a1 = explode('&',$s);
	foreach($a1 as $v){
		$temp = explode('=',$v);
		$dest[$temp[0]] = $temp[1];
	}


	if($dest['interface'] != 'item_log' && $dest['interface'] != 'resource' && $table == 'other'){
		$final = [];
		foreach($$table as $v){
			$final[] = $dest[$v];
		}
		$s = implode(',',$final);
		$s.="\n";
		fputs($dist_f ,$s);
	}

	if($dest['interface'] == $table){
		$final = [];
		foreach($$table as $v){
			$final[] = $dest[$v];
		}
		$s = implode(',',$final);
		$s.="\n";
		fputs($dist_f ,$s);
	}
}

fclose($f);
fclose($dist_f);








