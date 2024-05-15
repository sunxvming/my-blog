<?php
set_time_limit(0);
error_reporting(0);
date_default_timezone_set("PRC");


$host       = '106.75.22.171';
$username   = 'root';
$passwd     = 'asdf1234';
$dbname     = 'gamelog';

//$host       = 'localhost';
//$username   = 'root';
//$passwd     = '123456';
//$dbname     = 'gamelog';

$link = mysql_connect($host, $username, $passwd);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($dbname, $link);
mysql_query("set names 'utf8'");


$op         = $_REQUEST['op'];
$sid        = $_REQUEST['sid'];
$channel    = $_REQUEST['channel'];
$dept       = $_REQUEST['dept'];
$start_time = $_REQUEST['start_time'];
$stop_time  = $_REQUEST['stop_time'];
$user_type  = $_REQUEST['user_type'];
$user_value = $_REQUEST['user_value'];

if(empty($op)||(empty($user_type)&&empty($user_value))||(empty($start_time)&&empty($stop_time))){
    echo  json_encode(
        [
           'code'=>'-1',
            'message'=>'parameter error'
        ]
    );
    exit();
}




$where = '';
if($user_type == 'user'){
    $where = " user = '".$user_value."'";
}elseif($user_type == 'roleid'){
    $where = ' roleid = '.$user_value;
}


if($op != 'resource_log'&& $op != 'item_log' ){
    $where.=" and interface ='".$op."'";
}

if($start_time){
    $where.=' and time >='.$start_time;
}
if($stop_time){
    $where.=' and time <='.$stop_time;
}
if($sid&&$sid!='all'){
    $where.=' and sid ='.$sid;
}
if($channel && $channel !='all'){
    $where.=" and channel ='".$channel."'";
}
if($dept&&$dept!='all'){
    $where.=" and dept ='".$dept."'";
}


if($op == 'resource_log'){
    $table = 'resource_log';
}elseif($op == 'item_log'){
    $table = 'item_log';
}else{
    $table = 'other_log';
}


$sql = "select * from ".$table." where ".$where;
//echo $sql;

$res = mysql_query($sql);




while($data = mysql_fetch_assoc($res)){
    $data['time'] = date('Y-m-d H:i:s',$data['time']);
    $data['rolename'] = urldecode(urldecode($data['rolename']));
    $alldata[]=$data;
}

if(count($alldata) == 0){
    $alldata = [];
}

mysql_free_result($res);

mysql_close();


echo  json_encode(
    [
        'code'=>'0',
        'message'=>'OK',
        'data'=>$alldata
    ]
);
exit();




















