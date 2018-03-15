<?php
/**
 * Config.php for deploy.
 * @author SamWu
 * @date 2017/7/19 19:49
 * @copyright istimer.com
 */

namespace App\Libraries;

/**
 * Class Config
 * @package App\Libraries
 */
class Config
{
	private static $config = array();
	private static $configDir = null;

	public static function setConfigPath($configDir)
	{
		if (!$configDir || !is_dir($configDir)) {
			return false;
		}
		$configDir = rtrim($configDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
		self::$configDir = $configDir;
		self::_readConfig();
		return true;
	}

	/**
	 * 读取config配置
	 * get('db')
	 * or get('db,menu')
	 * or get(array('db', 'menu'))
	 * or get('db', 'menu')
	 * @param array ...$params
	 * @return array|mixed
	 */
	public static function get(...$params)
	{
		$args = count($params);
		if ($args == 0) {
			return self::$config;
		}
		if (!empty(self::$config)) {
			if ($args == 1) {
				$key = $params[0];
				$key = is_string($key) && strpos($key, ',') !== false ? explode(',', $key) : $key;
				if (is_string($key)) {
					return self::_getConfig($key);
				}
				if (is_array($key)) {
					return self::_getConfigByArr($key);
				}
			}
			if ($args > 1) {
				return self::_getConfigByArr($params);
			}
		}
		return array();
	}

	public static function all()
	{
		return self::get();
	}

	public static function __callStatic($name, $arguments)
	{
		$conf = self::_getConfig($name);
		$data = array();
		if (!empty($conf)) {
			if (is_array($conf) && count($arguments) > 0 && ($key = $arguments[0]) && !is_array($key)) {
				$data = isset($conf[$key]) ? $conf[$key] : $data;
			} else {
				$data = $conf;
			}
		}
		return $data;
	}

	private static function _getConfig($name = null)
	{
		return $name === null ? self::$config : (isset(self::$config[$name]) ? self::$config[$name] : array());
	}

	private static function _getConfigByArr(array $arr)
	{
		$res = array();
		foreach ($arr as $item) {
			$res[$item] = self::_getConfig($item);
		}
		return $res;
	}

	private static function _readConfig()
	{
		if (!self::$configDir) {
			self::$config = array();
			return false;
		}
		if (empty(self::$config)) {
			$config = array();
			$handler = opendir(self::$configDir);
			while (($filename = readdir($handler)) !== false) {//务必使用!==，防止目录下出现类似文件名“0”等情况
				if ($filename != "." && $filename != "..") {
					$php_file = self::$configDir . $filename;
					if (is_file($php_file) && substr($php_file, -4) == '.php') {
						$c = include_once($php_file);
						//is_array($c) AND $config[] = array_merge($c, $config);
						$config[substr($filename, 0, -4)] = $c;
					}
				}
			}
			closedir($handler);
			self::$config = $config;
		}
		return true;
	}
}