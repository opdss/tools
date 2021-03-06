<?php
/**
 * test.php for tools
 * @author SamWu
 * @date 2018/4/10 17:20
 * @copyright boyaa.com
 */

include '../vendor/autoload.php';

$api = '{"mid":"222918","protocol":1,"api":"22","sig":"9e08ba8409a717d91146ef3a87e87948","sid":233,"vkey":"f4ec9f480218dfc7285c840de5d972c1","version":"7.7.1","langtype":0,"username":"BY-93668","time":1524800782,"mtkey":"f5882197b7612462261b072e8644e782","unid":"134","method":"Upload.PhotoUpload","vmid":"222918","param":{"url":"https://byheadpic-static.boyaagame.com/beauty/photo118/233/366c6_2331524799924.jpg","mid":222918,"type":2,"act":"mdf"}}';


$req = \Opdss\Http\Request::factory();

$body = new \Opdss\Http\RequestMultipartBody();
$body->add('api', $api);
$body->addFile('icon', './test.png', 'test.png');

$res = $req->send('post', 'http://upload.boyaa.info/api/api.php', $body);

var_dump($res->getHeaders());
var_dump($res->getBody());
var_dump($res->getCurlInfo());
exit;






var_dump(range(2, 4));exit;
$fp = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($fp) {
	if (!socket_connect($fp, 'www.istimer.com', '22')) {
		var_dump( socket_strerror(socket_last_error()));
		exit;
	}
	var_dump(2222222);
	var_dump(socket_send($fp, "get\r\n", strlen("get\r\n"), MSG_EOR));
	var_dump(socket_recv($fp, $errno, 1024,MSG_PEEK));
}
var_dump($errno, $errstr);

exit();
$str = <<<EOF
Accept-Ranges	表明服务器是否支持指定范围请求及哪种类型的分段请求	Accept-Ranges: bytes
Age	从原始服务器到代理缓存形成的估算时间（以秒计，非负）	Age: 12
Allow	对某网络资源的有效的请求行为，不允许则返回405	Allow: GET, HEAD
Cache-Control	告诉所有的缓存机制是否可以缓存及哪种类型	Cache-Control: no-cache
Content-Encoding	web服务器支持的返回内容压缩编码类型。	Content-Encoding: gzip
Content-Language	响应体的语言	Content-Language: en,zh
Content-Length	响应体的长度	Content-Length: 348
Content-Location	请求资源可替代的备用的另一地址	Content-Location: /index.htm
Content-MD5	返回资源的MD5校验值	Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
Content-Range	在整个返回体中本部分的字节位置	Content-Range: bytes 21010-47021/47022
Content-Type	返回内容的MIME类型	Content-Type: text/html; charset=utf-8
Date	原始服务器消息发出的时间	Date: Tue, 15 Nov 2010 08:12:31 GMT
ETag	请求变量的实体标签的当前值	ETag: “737060cd8c284d8af7ad3082f209582d”
Expires	响应过期的日期和时间	Expires: Thu, 01 Dec 2010 16:00:00 GMT
Last-Modified	请求资源的最后修改时间	Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT
Location	用来重定向接收方到非请求URL的位置来完成请求或标识新的资源	Location: http://www.zcmhi.com/archives/94.html
Pragma	包括实现特定的指令，它可应用到响应链上的任何接收方	Pragma: no-cache
Proxy-Authenticate	它指出认证方案和可应用到代理的该URL上的参数	Proxy-Authenticate: Basic
refresh	应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）	Refresh: 5; url=http://www.atool.org/httptest.php            
Retry-After	如果实体暂时不可取，通知客户端在指定时间之后再次尝试	Retry-After: 120
Server	web服务器软件名称	Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)
Set-Cookie	设置Http Cookie	Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1
Trailer	指出头域在分块传输编码的尾部存在	Trailer: Max-Forwards
Transfer-Encoding	文件传输编码	Transfer-Encoding:chunked
Vary	告诉下游代理是使用缓存响应还是从原始服务器请求	Vary: *
Via	告知代理客户端响应是通过哪里发送的	Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning	警告实体可能存在的问题	Warning: 199 Miscellaneous warning
WWW-Authenticate	表明客户端请求实体应该使用的授权方案	WWW-Authenticate: Basic
EOF;
$arr = explode("\n", $str);
$data = [];
foreach ($arr as $item) {
    $arr1 = explode("	", $item);
    $data[] = [$arr1[0], $arr1[1], $arr1[2]];
}
var_export($data);



exit;

$file = './color.txt';

$res = file_get_contents($file);

$res = explode("\n", $res);

$data = [];
foreach ($res as $item) {
	$one = explode(',', $item, 5);
	$data[] = array(
		strtolower($one[0]),
		$one[1],
		$one[2],
		str_replace('&', ',', trim($one[3], '"')),
		$one[4],
	);
}

file_put_contents('./config/color.php', "<?php\r\n return ".var_export($data, true).';');