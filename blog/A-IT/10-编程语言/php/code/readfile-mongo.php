<?php

set_time_limit(0);
error_reporting(0);
$host       = '127.0.0.1';
$username   = 'root';
$passwd     = 'asdf1234';
$dbname     = 'gamelogtest';


$m = new MongoClient();    // 连接到mongodb
$db = $m->test;            // 选择一个数据库
$log = $db->log; // 选择集合


$count = 0;
$insertNum = 0;
$lastpos = 0;
$date = date('Ymd');
$begin = time();


while (true) {


    $date = date('Ymd');
    $file   =  '/data/td-agent/gamelog/kbzy-mysql.log.'.$date.'.log';


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
                if($temp[0] == 'time'){
                    $dest[$temp[0]] = (int)$temp[1];
                }else{
                    $dest[$temp[0]] = $temp[1];
                }
            }
            $alldata[] = $dest;

            if($count%200 == 0){
                $log->batchInsert($alldata);
                $alldata=[];
            }

            if($count%10000==0){

                $now = time();
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





