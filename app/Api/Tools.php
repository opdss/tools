<?php
/**
 * Tools.php for tools
 * @author SamWu
 * @date 2018/4/11 11:48
 * @copyright boyaa.com
 */

namespace App\Api;

use App\Libraries\Config;
use App\Libraries\ICard;
use Slim\Http\Request;
use Slim\Http\Response;

class Tools extends Base
{
	/**
	 * 解析身份证
	 * @pattern /api/ic/parse
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function idCard(Request $request, Response $response, $args)
	{
		$ic = $request->getParam('ic');
		$data = ICard::isIC($ic, true);
		return $this->json($data === false ? 1 : $data);
	}

	/**
	 * @pattern /api/ic/gen
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function genIdCard(Request $request, Response $response, $args)
	{
		$number = (int)$request->getParam('number');
		$number = min($number, 100);
		$zone = (int)$request->getParam('zone');
		$bothday = $request->getParam('bothday');
		$sex = (int)$request->getParam('sex');
		$config = ['sex' => $sex];
		if ($zone) {
			$config['zone'] = $zone;
		}
		if ($bothday) {
			$config['bothday'] = $bothday;
		}

		if ($number) {
			$data = ICard::multiGenIC($number, $config);
		} else {
			$data = ICard::genIC($config);
		}
		if ($data === false) {
			$errInfo = ICard::getErrInfo();
			$this->ci->logger->error(json_encode($errInfo, JSON_UNESCAPED_UNICODE), $request->getParams());
			return $this->json(1, array_pop($errInfo));
		}
		return $this->json($data);
	}

	/**
	 * @pattern /api/ic/zone
	 * @method get|post
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function zone(Request $request, Response $response, $args)
	{
		$kw = $request->getParam('kw');
		$number = (int)$request->getParam('number');
		$areazone = Config::get('areazone');
		$data = array();
		$i = 0;
		//if ($kw) {
		foreach ($areazone as $k => $v) {
			if (!$kw || strpos($v, $kw) !== false) {
				$i++;
				if ($number && $i > $number) {
					break;
				}
				$data[] = array(
					'code' => $k,
					'zone' => $v
				);
			}
		}
		//}
		return $this->json($data);
	}

	/**
	 * @pattern /api/portscan
	 * @method get|post
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function portScan(Request $request, Response $response, $args)
	{
		$server_name= $request->getParam('server_name');
		$server_port = $request->getParam('server_port');
		$server_port = explode(',', $server_port);
		$ports = [];
		if (!$server_name) {
			return $this->json(40001);
		}
		foreach ($server_port as $item) {
			if (strpos($item, '-') !== false) {
				$arr = array_map('intval', explode('-', $item, 2));
				if (!$arr[0] || !$arr[1]) {
					continue;
				}
				$ports = array_merge($ports, range(min($arr[0], $arr[1]), max($arr[0], $arr[1])));
			} elseif(intval($item)) {
				$ports[] = intval($item);
			}
		}
		if (empty($ports)) {
			return $this->json(1, '端口错误！');
		}
		if (count($ports) > 20) {
			return $this->json(1, '端口最多10个！');
		}
		$data = [];
		$portInfo = Config::get('tcpUdpPort');
		foreach ($ports as $port) {
			if (false !== $res = $this->soc($server_name, $port)) {
				$_arr = array('port' => $port, 'isOpen'=>true, 'result' => $res);
				$_arr['info'] = isset($portInfo[$port]) ? $portInfo[$port][0] : '';
			} else {
				$_arr = array('port' => $port, 'isOpen'=>false, 'result' => $res);
				$_arr['info'] = '';
			}
			$data[] = $_arr;
		}
		//var_dump($data);exit;
		return $this->json($data);
	}

	private function soc($server, $port)
	{
		$fp = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if ($fp) {
			if (!@socket_connect($fp, $server, $port)) {
				return false;
			}
			$msg = "get\r\n";
			$return = '';
			socket_send($fp, $msg, strlen($msg), MSG_EOR);
			socket_recv($fp, $return, 1024,MSG_PEEK);
			return $return
				//? @iconv("gbk", "utf-8//ignore", explode(' ', explode("\r\n", $return)[0])[0])
				//?  explode(' ', explode("\r\n", $return)[0])[0]
				?  ''
				: '';
		}
		return false;
	}
}