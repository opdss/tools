<?php
/**
 * Format.php for tools.
 * @author SamWu
 * @date 2018/3/13 18:29
 * @copyright boyaa.com
 */
namespace App\Api;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Format
 * @package App\Controllers
 */
class Format extends Base
{
	protected $action = array(
		'compress',
		'format'
	);

	/**
	 * to_json
	 * @pattern /api/format[/]
	 * @method POST|GET
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
		//$res  = \App\Libraries\Format::compressHtml('var a=1;');var_dump($res);exit;
		$type = $request->getParam('type');
		$data = trim($request->getParam('data'));
		$action = $request->getParam('action');
		if (empty($data)) {
			return $this->json(1, '请输入要处理得数据!');
		}
		$method = $action.ucfirst($type);
		$format = new \App\Libraries\Format;
		if (!method_exists($format, $method)) {
			return $this->json(1, '不支持当前数据处理');
		}
		$res = call_user_func(array($format, $method), $data);
		if (!$res) {
			$errInfo = $format::getErrInfo();
			return $this->json(1, end($errInfo));
		}
		return $this->json(array('result'=>$res));
	}
}