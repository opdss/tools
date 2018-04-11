<?php
/**
 * Tools.php for tools
 * @author SamWu
 * @date 2018/4/11 11:48
 * @copyright boyaa.com
 */
namespace App\Api;

use App\Libraries\ICard;
use Slim\Http\Request;
use Slim\Http\Response;

class Tools extends Base
{
	/**
	 * 解析身份证
	 * @pattern /api/idcard
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
	 * @pattern /api/genicard
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function genIdCard(Request $request, Response $response, $args)
	{
		$number = (int)$request->getParam('number');
		$zone = (int)$request->getParam('zone');
		$bothday = $request->getParam('bothday');
		$sex = (int)$request->getParam('sex');
		$config = ['sex'=>$sex];
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
		return $this->json($data === false ? 1 : $data);
	}
}