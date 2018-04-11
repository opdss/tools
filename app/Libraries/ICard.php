<?php
/**
 * ICard.php for tools
 * @author SamWu
 * @date 2018/4/11 14:16
 * @copyright boyaa.com
 */
namespace App\Libraries;

class ICard
{
	private static $pow = array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);//权重
	private static $szVerCode = array('1','0','x','9','8','7','6','5','4','3','2');//检验码

	private static $areaZone = null;

	private static $errInfo = array();

	private static $config = array(
		'zone' => null,
		'sex' => null,
		'bothday' => null,
		'maxDay' => null,
		'minDay' => null,
		'areazone' => null,
	);

	private static function setConfig(array $config=array())
	{
		self::$config['areazone'] = array_keys(self::getAreaZone());
		self::$config['maxDay'] = date('Ymd');
		self::$config['minDay'] = '19000101';

		if (empty($config)) {
			return true;
		}

		if (isset($config['zone'])) {
			if (!in_array($config['zone'], self::$config['areazone'])) {
				self::setErrInfo($config['zone'] . ' 身份证地区不合法');
				return false;
			}
			self::$config['zone'] = $config['zone'];
		}

		if (isset($config['bothday'])) {
			$bothday = $config['bothday']; //如果是数组，则生日在这两个数组之间的范围
			if (is_array($bothday)) {
				if (!self::isDate($bothday[0], self::$config['maxDay'], self::$config['minDay']) || !self::isDate($bothday[1], self::$config['maxDay'], self::$config['minDay'])) {
					self::setErrInfo(json_encode($bothday).' 生日不合法');
					return false;
				}
				if ($bothday[0] > $bothday[1]) {
					self::$config['maxDay'] = $bothday[0];
					self::$config['minDay'] = $bothday[1];
				} else {
					self::$config['maxDay'] = $bothday[1];
					self::$config['minDay'] = $bothday[0];
				}
			} else {
				if (!self::isDate($bothday, self::$config['maxDay'], self::$config['minDay'])) {
					self::setErrInfo($bothday.' 生日不合法');
					return false;
				}
				self::$config['bothday'] = $bothday;
			}
		}

		if (isset($config['sex'])) {
			self::$config['sex'] = intval($config['sex']);
		}
		return true;
	}

	public static function genIC($config=array())
	{
		if ($config !== false) {
			if (!self::setConfig($config)) {
				return false;
			}
		}

		$zone = self::$config['zone'] ?: self::$config['areazone'][rand(0, count(self::$config['areazone'])-1)];
		$bothday = self::$config['bothday'] ?: date('Ymd', rand(strtotime(self::$config['minDay']), strtotime(self::$config['maxDay'])));
		$ic = $zone . $bothday . sprintf('%02d', rand(0, 99));
		$sex_arr = array([0,2,4,6,8], [1,3,5,7,9]);
		$sex = self::$config['sex'] ? $sex_arr[intval(self::$config['sex'])%2][rand(0, 4)] : rand(0, 9);
		$ic .= $sex;

		$sum = 0;
		for ($i = 0; $i < 17; $i++) {
			$sum += $ic[$i] * self::$pow[$i];
		}
		$ic = $ic.self::$szVerCode[$sum % 11];
		return array(
			'ic' => $ic,
			'zone' => self::$areaZone[$zone],
			'bothday' => date('Y-m-d', strtotime($bothday)),
			'sex' => $sex%2 ? '男' : '女'
		);
	}

	public static function multiGenIC($num, $config=array())
	{
		if (!self::setConfig($config)) {
			return false;
		}
		$num = intval($num);
		$data = [];
		for ($i=0; $i<$num; $i++) {
			$icData = self::genIC(false);
			if (isset($data[$icData['ic']])) {
				$num = $num+1;
				continue;
			}
			$data[$icData['ic']] = $icData;
		}
		return $data;
	}

	/**
	 * 严格校验身份证
	 * @param $ic
	 * @param bool $return 是否返回解析结果
	 * @return array|bool
	 */
	public static function isIC($ic, $return=false)
	{
		if (!self::verifyPow($ic)) {
			self::setErrInfo('IC:'.$ic.' 权校验失败');
			return false;
		}
		$zone = substr($ic, 0, 6);
		$areazone = self::getAreaZone();//读取身份证地区配置
		if (!isset($areazone[$zone])) {
			self::setErrInfo('IC:'.$ic.' 身份证地区校验失败');
			return false;
		}

		$date = substr($ic, 6, 8);
		if (!self::isDate($date, date('Ymd'), '19000101')) {
			self::setErrInfo('IC:'.$ic.' 生日校验失败');
			return false;
		}
		if (!$return) {
			return true;
		}

		return array(
			'ic' => $ic,
			'zone' => $areazone[$zone],
			'bothday' => date('Y-m-d', strtotime($date)),
			'sex' => substr($ic, 16, 1)%2 ? '男' : '女'
		);
	}

	/**
	 * 计算身份证权重是否正确
	 * @param $ic
	 * @return bool
	 */
	public static function verifyPow($ic)
	{
		if (strlen($ic) != 18) {
			return false;
		}
		$sum = 0;
		for ($i = 0; $i < 17; $i++) {
			$sum += $ic[$i] * self::$pow[$i];
		}
		return strtolower($ic[17]) == self::$szVerCode[$sum % 11];
	}

	/**
	 * 判断 `19911123` 这样的日期是否合法
	 * @param $date
	 * @param null $max
	 * @param null $min
	 * @return bool
	 */
	public static function isDate($date, $max=null, $min=null)
	{
		if (!is_numeric($date) || strlen($date)!=8 || ($max && $date>$max) || ($min && $date<$min)) {
			return false;
		}
		$year = intval(substr($date, 0, 4));
		$isRun = ($year%100 != 0 && $year%4 == 0) || ($year%400 == 0);
		$month = intval(substr($date, 4, 2));
		if ($month < 1 || $month > 12) {
			return false;
		}

		$day = intval(substr($date, 6, 2));
		if (
			$day < 1
			|| (in_array($month, array(1, 3, 5, 7, 8, 10, 12)) && $day > 31)
			|| (in_array($month, array(4, 6, 9, 11)) && $day > 30)
			|| ($month == 2 && (($isRun && $day > 29) || (!$isRun && $day > 28)))
		) {
			return false;
		}
		return true;
	}

	private static function setErrInfo($info)
	{
		array_push(self::$errInfo, $info);
	}

	public static function getErrInfo()
	{
		return self::$errInfo;
	}

	public static function getAreaZone()
	{
		if (self::$areaZone == null) {
			self::$areaZone = Config::get('areazone');//读取身份证地区配置
			if (empty(self::$areaZone)) {
				throw new \Exception('areazone为空，配置读取错误');
			}
		}
		return self::$areaZone;
	}
}