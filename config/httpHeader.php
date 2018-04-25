<?php
/**
 * httpHeader.php for tools
 * @author SamWu
 * @date 2018/4/25 15:24
 * @copyright boyaa.com
 */

return array(
	'request' => array (
		0 =>
			array (
				0 => 'Accept',
				1 => '指定客户端能够接收的内容类型',
				2 => 'Accept: text/plain, text/html',
			),
		1 =>
			array (
				0 => 'Accept-Charset',
				1 => '浏览器可以接受的字符编码集。',
				2 => 'Accept-Charset: iso-8859-5',
			),
		2 =>
			array (
				0 => 'Accept-Encoding',
				1 => '指定浏览器可以支持的web服务器返回内容压缩编码类型。',
				2 => 'Accept-Encoding: compress, gzip',
			),
		3 =>
			array (
				0 => 'Accept-Language',
				1 => '浏览器可接受的语言',
				2 => 'Accept-Language: en,zh',
			),
		4 =>
			array (
				0 => 'Accept-Ranges',
				1 => '可以请求网页实体的一个或者多个子范围字段',
				2 => 'Accept-Ranges: bytes',
			),
		5 =>
			array (
				0 => 'Authorization',
				1 => 'HTTP授权的授权证书',
				2 => 'Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
			),
		6 =>
			array (
				0 => 'Cache-Control',
				1 => '指定请求和响应遵循的缓存机制',
				2 => 'Cache-Control: no-cache',
			),
		7 =>
			array (
				0 => 'Connection',
				1 => '表示是否需要持久连接。（HTTP 1.1默认进行持久连接）',
				2 => 'Connection: close',
			),
		8 =>
			array (
				0 => 'Cookie',
				1 => 'HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。',
				2 => 'Cookie: Version=1; Skin=new;',
			),
		9 =>
			array (
				0 => 'Content-Length',
				1 => '请求的内容长度',
				2 => 'Content-Length: 348',
			),
		10 =>
			array (
				0 => 'Content-Type',
				1 => '请求的与实体对应的MIME信息',
				2 => 'Content-Type: application/x-www-form-urlencoded',
			),
		11 =>
			array (
				0 => 'Date',
				1 => '请求发送的日期和时间',
				2 => 'Date: Tue, 15 Nov 2010 08:12:31 GMT',
			),
		12 =>
			array (
				0 => 'Expect',
				1 => '请求的特定的服务器行为',
				2 => 'Expect: 100-continue',
			),
		13 =>
			array (
				0 => 'From',
				1 => '发出请求的用户的Email',
				2 => 'From: user@email.com',
			),
		14 =>
			array (
				0 => 'Host',
				1 => '指定请求的服务器的域名和端口号',
				2 => 'Host: www.zcmhi.com',
			),
		15 =>
			array (
				0 => 'If-Match',
				1 => '只有请求内容与实体相匹配才有效',
				2 => 'If-Match: “737060cd8c284d8af7ad3082f209582d”',
			),
		16 =>
			array (
				0 => 'If-Modified-Since',
				1 => '如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码',
				2 => 'If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT',
			),
		17 =>
			array (
				0 => 'If-None-Match',
				1 => '如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变',
				2 => 'If-None-Match: “737060cd8c284d8af7ad3082f209582d”',
			),
		18 =>
			array (
				0 => 'If-Range',
				1 => '如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag',
				2 => 'If-Range: “737060cd8c284d8af7ad3082f209582d”',
			),
		19 =>
			array (
				0 => 'If-Unmodified-Since',
				1 => '只在实体在指定时间之后未被修改才请求成功',
				2 => 'If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT',
			),
		20 =>
			array (
				0 => 'Max-Forwards',
				1 => '限制信息通过代理和网关传送的时间',
				2 => 'Max-Forwards: 10',
			),
		21 =>
			array (
				0 => 'Pragma',
				1 => '用来包含实现特定的指令',
				2 => 'Pragma: no-cache',
			),
		22 =>
			array (
				0 => 'Proxy-Authorization',
				1 => '连接到代理的授权证书',
				2 => 'Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
			),
		23 =>
			array (
				0 => 'Range',
				1 => '只请求实体的一部分，指定范围',
				2 => 'Range: bytes=500-999',
			),
		24 =>
			array (
				0 => 'Referer',
				1 => '先前网页的地址，当前请求网页紧随其后,即来路',
				2 => 'Referer: http://www.zcmhi.com/archives/71.html',
			),
		25 =>
			array (
				0 => 'TE',
				1 => '客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息',
				2 => 'TE: trailers,deflate;q=0.5',
			),
		26 =>
			array (
				0 => 'Upgrade',
				1 => '向服务器指定某种传输协议以便服务器进行转换（如果支持）',
				2 => 'Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11',
			),
		27 =>
			array (
				0 => 'User-Agent',
				1 => 'User-Agent的内容包含发出请求的用户信息',
				2 => 'User-Agent: Mozilla/5.0 (Linux; X11)',
			),
		28 =>
			array (
				0 => 'Via',
				1 => '通知中间网关或代理服务器地址，通信协议',
				2 => 'Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)',
			),
		29 =>
			array (
				0 => 'Warning',
				1 => '关于消息实体的警告信息',
				2 => 'Warn: 199 Miscellaneous warning',
			),
	),
	'response' => array (
		0 =>
			array (
				0 => 'Accept-Ranges',
				1 => '表明服务器是否支持指定范围请求及哪种类型的分段请求',
				2 => 'Accept-Ranges: bytes',
			),
		1 =>
			array (
				0 => 'Age',
				1 => '从原始服务器到代理缓存形成的估算时间（以秒计，非负）',
				2 => 'Age: 12',
			),
		2 =>
			array (
				0 => 'Allow',
				1 => '对某网络资源的有效的请求行为，不允许则返回405',
				2 => 'Allow: GET, HEAD',
			),
		3 =>
			array (
				0 => 'Cache-Control',
				1 => '告诉所有的缓存机制是否可以缓存及哪种类型',
				2 => 'Cache-Control: no-cache',
			),
		4 =>
			array (
				0 => 'Content-Encoding',
				1 => 'web服务器支持的返回内容压缩编码类型。',
				2 => 'Content-Encoding: gzip',
			),
		5 =>
			array (
				0 => 'Content-Language',
				1 => '响应体的语言',
				2 => 'Content-Language: en,zh',
			),
		6 =>
			array (
				0 => 'Content-Length',
				1 => '响应体的长度',
				2 => 'Content-Length: 348',
			),
		7 =>
			array (
				0 => 'Content-Location',
				1 => '请求资源可替代的备用的另一地址',
				2 => 'Content-Location: /index.htm',
			),
		8 =>
			array (
				0 => 'Content-MD5',
				1 => '返回资源的MD5校验值',
				2 => 'Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==',
			),
		9 =>
			array (
				0 => 'Content-Range',
				1 => '在整个返回体中本部分的字节位置',
				2 => 'Content-Range: bytes 21010-47021/47022',
			),
		10 =>
			array (
				0 => 'Content-Type',
				1 => '返回内容的MIME类型',
				2 => 'Content-Type: text/html; charset=utf-8',
			),
		11 =>
			array (
				0 => 'Date',
				1 => '原始服务器消息发出的时间',
				2 => 'Date: Tue, 15 Nov 2010 08:12:31 GMT',
			),
		12 =>
			array (
				0 => 'ETag',
				1 => '请求变量的实体标签的当前值',
				2 => 'ETag: “737060cd8c284d8af7ad3082f209582d”',
			),
		13 =>
			array (
				0 => 'Expires',
				1 => '响应过期的日期和时间',
				2 => 'Expires: Thu, 01 Dec 2010 16:00:00 GMT',
			),
		14 =>
			array (
				0 => 'Last-Modified',
				1 => '请求资源的最后修改时间',
				2 => 'Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT',
			),
		15 =>
			array (
				0 => 'Location',
				1 => '用来重定向接收方到非请求URL的位置来完成请求或标识新的资源',
				2 => 'Location: http://www.zcmhi.com/archives/94.html',
			),
		16 =>
			array (
				0 => 'Pragma',
				1 => '包括实现特定的指令，它可应用到响应链上的任何接收方',
				2 => 'Pragma: no-cache',
			),
		17 =>
			array (
				0 => 'Proxy-Authenticate',
				1 => '它指出认证方案和可应用到代理的该URL上的参数',
				2 => 'Proxy-Authenticate: Basic',
			),
		18 =>
			array (
				0 => 'refresh',
				1 => '应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）',
				2 => 'Refresh: 5; url=http://www.atool.org/httptest.php            ',
			),
		19 =>
			array (
				0 => 'Retry-After',
				1 => '如果实体暂时不可取，通知客户端在指定时间之后再次尝试',
				2 => 'Retry-After: 120',
			),
		20 =>
			array (
				0 => 'Server',
				1 => 'web服务器软件名称',
				2 => 'Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)',
			),
		21 =>
			array (
				0 => 'Set-Cookie',
				1 => '设置Http Cookie',
				2 => 'Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1',
			),
		22 =>
			array (
				0 => 'Trailer',
				1 => '指出头域在分块传输编码的尾部存在',
				2 => 'Trailer: Max-Forwards',
			),
		23 =>
			array (
				0 => 'Transfer-Encoding',
				1 => '文件传输编码',
				2 => 'Transfer-Encoding:chunked',
			),
		24 =>
			array (
				0 => 'Vary',
				1 => '告诉下游代理是使用缓存响应还是从原始服务器请求',
				2 => 'Vary: *',
			),
		25 =>
			array (
				0 => 'Via',
				1 => '告知代理客户端响应是通过哪里发送的',
				2 => 'Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)',
			),
		26 =>
			array (
				0 => 'Warning',
				1 => '警告实体可能存在的问题',
				2 => 'Warning: 199 Miscellaneous warning',
			),
		27 =>
			array (
				0 => 'WWW-Authenticate',
				1 => '表明客户端请求实体应该使用的授权方案',
				2 => 'WWW-Authenticate: Basic',
			),
	)
);