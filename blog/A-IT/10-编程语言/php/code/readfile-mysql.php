<?php
date_default_timezone_set("PRC");
set_time_limit(0);
error_reporting(0);
$host       = '127.0.0.1';
$username   = 'root';
$passwd     = 's5UK52SlF31W#j5O';
$dbname     = 'gamelog';


$link = mysql_connect($host, $username, $passwd);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($dbname, $link);
mysql_query("set names 'utf8'");

//*****************************************

$other_log = ['interface', 'sid', 'oldsid', 'user', 'roleid', 'dept', 'channel', 'time', 'uid', 'machine', 'netw', 'type', 'rolename', 'prof', 'level', 'ip', 'guild', 'vip_level', 'vip', 'money', 'amount', 'balance', 'order', 'kind', 'reason', 'item_num', 'taskid', 'result', 'usetime', 'jumpn', 'startt', 'sweepn', 'award', 'opid', 'bef_num', 'num', 'onlinetime', 'rolecount', 'regtime', 'ziz', 'wear', 'power'];
$item_log = ['dept', 'sid', 'user', 'oldsid', 'roleid', 'time', 'vip', 'level', 'itemid', 'op', 'reason', 'amount', 'channel'];
$resource_log = ['dept', 'sid', 'user', 'oldsid', 'roleid', 'time', 'channel', 'kind', 'vip', 'op', 'reason', 'amount', 'balance', 'level', 'item_id', 'item_num'];

/*
    入库array
  $insertarr = [
      'item_log'=>[
          ['xx','yy'],
          ['xx','yy'],
          ['xx','yy']
      ],
      'other_log'=>[
          ['xx','yy'],
          ['xx','yy'],
          ['xx','yy']
      ]
  ];
*/


$count = 0;
$insertNum = 0;
$lastpos = 0;
$date = date('Ymd');
$begin = time();

$sql = 'select * from log_offset where logname = '.$date;
$res = mysql_query($sql);
$offsetinfo = mysql_fetch_assoc($res);
if(!empty($offsetinfo)){
    $lastpos = $offsetinfo['logoffset'];
}else{
    mysql_query("insert into log_offset values($date,0,0)");
}


$insertarr = [
    'item_log'=>[],
    'resource_log'=>[],
    'other_log'=>[]
];

while (true) {


    $date = date('Ymd');
    $file   =  '/data/td-agent/gamelog/kbzy-mysql.log.'.$date.'.log';


    $sql = 'select * from log_offset where logname = '.$date;
    $res = mysql_query($sql);
    $offsetinfo = mysql_fetch_assoc($res);
    if(empty($offsetinfo)){
        mysql_query("insert into log_offset values($date,0,0)");
    }


    usleep(300000); //0.3 s

    clearstatcache(false, $file);
    $len = filesize($file);
    if ($len < $lastpos) {        //change new file
        $lastpos = 0;
    }
    if($len > $lastpos) {         //file update
        $f = fopen($file, "r");
        if ($f === false)
            die('can not open file');
        fseek($f, $lastpos);

        while (!feof($f)) {

            $s = fgets($f, 4096);

            $dest = [];
            $a1 = explode('&',$s);
            foreach($a1 as $v){
                $temp = explode('=',$v);
                $dest[$temp[0]] = $temp[1];
            }


            if($dest['interface'] == 'item_log'){
                $fieldMap = $item_log;
                $final = [];
                foreach($fieldMap as $v){
                    $final[] = $dest[$v];
                }
                $insertarr['item_log'][]=$final;

            }elseif($dest['interface'] == 'resource'){
                $fieldMap = $resource_log;
                $final = [];
                foreach($fieldMap as $v){
                    $final[] = $dest[$v];
                }
                $insertarr['resource_log'][]=$final;
            }else{
                $fieldMap = $other_log;
                $final = [];
                foreach($fieldMap as $v){
                    $final[] = $dest[$v];
                }
                $insertarr['other_log'][]=$final;
            }


            foreach($insertarr as $k=>$v) {

                if(count($v) == 800) {

                    //---------------拼sql---------------
                    $sql = "INSERT INTO " .$k. " (`" . implode('`,`', $$k) . "`) VALUES ";

                    $values = '';
                    foreach ($v as $sub) {
                        $values .= "('" . implode("','", $sub) . "'),";
                    }
                    $values = rtrim($values, ",");

                    $sql .= $values;


                    $result = mysql_query($sql);
                    if($result === false){
                        $errInfo = "err:".$sql ."Invalid query: " . mysql_error()."\n";
                        file_put_contents('/root/runinfo/'.$date.'-error',$errInfo);
                        die;
                    }
                    //---------------拼sql---------------
                    $sql = "update log_offset set logoffset=".ftell($f).", curlines=$count where logname=$date";
                    mysql_query($sql);


                    $insertNum++;
                    $insertarr[$k] = [];
                }
            }



            if($count%100000==0){

                $now = time();
                echo 'date:'.$date;
                echo "\t";
                echo 'total_num:'.$count;
                echo "\t";
                echo 'insert_num:'.$insertNum;
                echo "\t";
                echo 'time:'.($now-$begin);
                echo "\n";
            }
            $count++;

        }

        $lastpos = ftell($f);
        fclose($f);
    }

}





