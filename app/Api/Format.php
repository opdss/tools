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
		$type = $request->getParam('type');
		$data = $request->getParam('data');
		$action = $request->getParam('action');
		$method = $action.ucfirst($type);
		$format = new \App\Libraries\Format;
		if (!method_exists($format, $method)) {
			return false;
		}
		$res = call_user_func(array($format, $method), $data);
		if (!$res) {
			$errInfo = $format::getErrInfo();
			return $this->json(1, end($errInfo));
		}
		return $this->json(array('result'=>$res));
	}
}