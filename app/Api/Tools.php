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
}