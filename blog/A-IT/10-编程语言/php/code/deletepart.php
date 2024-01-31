<?php
set_time_limit(0);
error_reporting(0);
date_default_timezone_set("PRC");


$host       = '127.0.0.1';
$username   = 'root';
$passwd     = 's5UK52SlF31W#j5O';
$dbname     = 'gamelog';
$table      = ['item_log','other_log','resource_log'];

$link = mysql_connect($host, $username, $passwd);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($dbname, $link);
mysql_query("set names 'utf8'");


foreach($table as $v){
	
	$query_part_sql = "SELECT
	  partition_name part, 
	  partition_expression expr, 
	  partition_description descr, 
	  FROM_DAYS(partition_description) lessthan_sendtime, 
	  table_rows 
	FROM
	  INFORMATION_SCHEMA.partitions 
	WHERE
	  TABLE_SCHEMA = SCHEMA() 
	  AND TABLE_NAME='$v' order by descr asc";

	$res = mysql_query($query_part_sql);

	
	$all_part_arr = [];
	while($data = mysql_fetch_assoc($res)){    
		$all_part_arr[] = $data;
	}

	//delete 5 oldest partition
	for($i = 0;$i<5;$i++){
		$sql = "alter table $v drop partition {$all_part_arr[$i][part]}";
		echo $sql."\n";
		//mysql_query($sql);
	}	
}






















