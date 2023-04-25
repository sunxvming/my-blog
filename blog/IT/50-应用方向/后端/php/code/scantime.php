<?php
set_time_limit(0);
date_default_timezone_set("PRC");
/**
 * ����ģʽ����Ч�ʣ�ÿ��10������
 * ��������3000������10��
 */
function http($url, $param, $data = '', $method = 'GET'){
	$opts = array(
		CURLOPT_TIMEOUT        => 10,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
	);

	/* �����������������ض����� */
	$opts[CURLOPT_URL] = $url . '?' . http_build_query($param);

	if(strtoupper($method) == 'POST'){
		$opts[CURLOPT_POST] = 1;
		$opts[CURLOPT_POSTFIELDS] = $data;

		if(is_string($data)){ //����JSON����
			$opts[CURLOPT_HTTPHEADER] = array(
				'Content-Type: application/json; charset=utf-8',
				'Content-Length: ' . strlen($data),
			);
		}
	}
	/* ��ʼ����ִ��curl���� */
	$ch = curl_init();
	curl_setopt_array($ch, $opts);
	$data  = curl_exec($ch);
	$error = curl_error($ch);
	$info = curl_getinfo($ch);
	curl_close($ch);

	//���������׳��쳣
   // if($error) throw new \Exception('����������' . $error);
	if($error) return false;

	return  ['data'=>$data, 'ip'=>$info['primary_ip']];
}

function mutihttp($urls){
  $mh = curl_multi_init();
  $handles = array();

  for($i=0;$i<count($urls);$i++)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $urls[$i]);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_multi_add_handle($mh,$ch);
    $handles[] = $ch;
  }
  $running=null;
  do
  {
    curl_multi_exec($mh,$running);
    // added a usleep for 0.25 seconds to reduce load
    //usleep (250000);
  } while ($running > 0);

  $output = [];
  for($i=0;$i<count($handles);$i++)
  {
	$info = curl_getinfo($handles[$i]);
    $data = curl_multi_getcontent($handles[$i]);
    $output[] = ['data'=>$data, 'ip'=>$info['primary_ip']];
    curl_multi_remove_handle($mh,$handles[$i]);
  }
  curl_multi_close($mh);
  return $output;
}

//////////////////////////////////////////////////////////////////////////

$plat = ['191game','2217','360wan','49you','51wan','7k7k','kugou','sogou','teeqee','wan77','xiyou','yilewan','2144','265g','4399','51','602','duowan','feihuo','swjoy','tencent','xunlei','youxi'];
$stype = [
'cs'=>'http://s%d.mfwz.%s.xiyou-g.com/stat',
'ccs'=>'http://ccs.mfwz.%s.xiyou-g.com/stat'
];
$urls = [];  //��������ķ�����
$ccsurl = [];
$sinfo = [];  //[plat][servertype]��ƽ̨�ķ�������id

foreach($plat as $v){
	$ccs = sprintf($stype['ccs'],$v);
	$sscdata = http($ccs);
	$stat = json_decode($sscdata['data'],true);
	//check stat null
	$sinfo[$v]['cs'] = $stat['css'];
	$urls[] =  $ccs;
}

$timeinfo = [];
$timeinfo[] = ['������ip','������ʱ��','������ʱ���','����ʱ��','����ʱ���','�������'];
foreach($sinfo as $k=>$v){
	foreach($v['cs'] as $subv){
		$urls[] = sprintf($stype['cs'],$subv['id'],$k);
	}
}

$starttime = time();
$datas = mutihttp($urls);
$usetime = time() - $starttime;
foreach($datas as $data){

	$stat = json_decode($data['data'],true);

	$date = explode('-',$stat['nowtime']);
	$servertimestemp = mktime($date[3],$date[4],0,$date[1],$date[2],$date[0]);  //mktime(hour,minute,second,month,day,year,is_dst);
	$servertime = date('Y-m-d H:i:s',$servertimestemp);

	$nowtimestemp = time() - $usetime/2;  //��ǰ���������ʱ����
	$nowtime = date('Y-m-d H:i:s',$nowtimestemp);
	$diff = $servertimestemp-$nowtimestemp;
	if(abs($diff) > 1){
		if($data['ip']){
			$timeinfo[$data['ip']] = ['plat'=>$stat['platform'].'-'.$stat['stype'].$stat['server_id'],'ip'=>$data['ip'],'servertime'=>$servertime,'servertimestemp'=>$servertimestemp,'nowtime'=>$nowtime,'nowtimestemp'=>$nowtimestemp,'diff'=>$diff];
		}
	}
}

$logfile = './timelog/'.date('Y-m-d-Hi',time()).'.csv';
$file = fopen($logfile,"w");
foreach ($timeinfo as $line){
	fputcsv($file,$line);
}
fclose($file);




