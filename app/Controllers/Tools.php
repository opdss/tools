<?php
/**
 * Tools.php for tools.
 * @author SamWu
 * @date 2018/3/20 16:02
 * @copyright boyaa.com
 */
namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class Tools extends Base
{
	/**
	 * 二维码生成
	 * @pattern /qrcode.html
	 * @menu 实用工具|二维码生成
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function qrCode(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/js/qrcode.min.js');
		return $this->view('tools/qrcode.twig', $data);
	}

}