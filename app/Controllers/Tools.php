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

	/**
	 * 身份证校验
	 * @pattern /idcard.html
	 * @menu 实用工具|身份证校验
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function idCard(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/idcard.twig', $data);
	}

	/**
	 * 时间戳
	 * @pattern /time.html
	 * @menu 实用工具|时间戳
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function time(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/genic.twig', $data);
	}

	/**
	 * 生成随机有效身份证号
	 * @pattern /genic.html
	 * @menu 实用工具|身份证生成
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function genIC(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/genic.twig', $data);
	}
}