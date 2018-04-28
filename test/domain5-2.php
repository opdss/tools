<?php
/**
 * Created by PhpStorm.
 * User: wuxin
 * Date: 2018/4/22
 * Time: 15:16
 */

var_dump($argv);exit;

$arr = range('a', 'z');
$api = 'http://panda.www.net.cn/cgi-bin/check.cgi?area_domain=';

$start = range('u', 'z');

$domain = [];
$i = 0;
foreach ($arr as $a) {
	foreach ($arr as $b) {
		foreach ($arr as $c) {
			foreach ($arr as $d) {
				$dd = $a . $b . $c . $d . '.com';
				$res = iCurl($api . $dd);
				$_arr = simplexml_load_string($res);
				$original = (string)($_arr->original);
				if (substr($original, 0, 3) == '210') {
					echo $dd . ' => ' . $original . PHP_EOL;
					file_put_contents('./domain5-2.log', $dd . PHP_EOL, FILE_APPEND);
				} else {
					echo $dd . ' => ' . $original . PHP_EOL;
				}
				if ($i++ > 10000) {
					sleep(1);
				}
			}
		}
	}
}


function iCurl($url, $data = null, $method = 'get', array $headers = array(), $cookies = null, array $options = array(), &$info = null)
{
	$method = strtoupper($method);
	if ($data) {
		if ($method == 'GET') {
			$data = is_array($data) ? http_build_query($data) : $data;
			$url = strpos($url, '?') !== false ? $url . '&' . $data : $url . '?' . $data;
			$curl = curl_init($url);
		} else {
			$curl = curl_init($url);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
	} else {
		$curl = curl_init($url);
	}
	//设置选项
	curl_setopt_array($curl, array(
		CURLOPT_TIMEOUT => 30, //超市时间
		CURLOPT_CUSTOMREQUEST => $method,// 请求方法
		CURLOPT_RETURNTRANSFER => true,// 返回内容
		CURLOPT_HEADER => false,// 返回header
		CURLOPT_FOLLOWLOCATION => true,// 自动重定向
		CURLOPT_SSL_VERIFYPEER => false,// 不校验证书
	));

	//设置头信息
	if (!empty($headers)) {
		$_headers = [];
		foreach ($headers as $name => $value) { //处理成CURL可以识别的headers格式
			$_headers[] = $name . ':' . $value;
		}
		curl_setopt($curl, CURLOPT_HTTPHEADER, $_headers);
	}
	//设置cookie
	if (!empty($cookies)) {
		$_cookies = '';
		if (is_array($cookies)) {
			foreach ($cookies as $name => $value) {
				$_cookies .= "{$name}={$value}; ";
			}
		} else {
			$_cookies = $cookies;
		}
		curl_setopt($curl, CURLOPT_COOKIE, $_cookies);
	}
	//其他特殊选项
	if (!empty($options)) {
		curl_setopt_array($curl, $options);
	}
	//执行请求
	$output = curl_exec($curl);
	$info = curl_getinfo($curl);
	curl_close($curl);
	if ($info['http_code'] == 200) {
		return $output;
	}
	$info['output'] = $output;
	return null;
}
