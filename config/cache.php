<?php
/**
 * cache.php for deploy.
 * @author SamWu
 * @date 2017/12/5 17:38
 * @copyright boyaa.com
 */

return array(

	'handler' => 'redis',
	'host' => '127.0.0.1',
	'password' => 'XIN~!@#$%^&*123',
	'port' => 6379,
	'timeout' => 0,
	'prefix' => 'mySSO_Cache:',
	/*'handler' => 'file',
	'backupHandler' => 'dummy',
	'path' => CACHE_DIR,
	'prefix' => 'isnoter_',*/

	/*'host' => '127.0.0.1',
	'port' => 11211,
	'weight' => 1,
	'raw' => false,

	'host' => '127.0.0.1',
	'password' => null,
	'port' => 6379,
	'timeout' => 0,*/
);