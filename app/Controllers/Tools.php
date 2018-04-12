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
	 * @menu 实用工具|身份证校验与生成
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function idCard(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/js/bootstrap.autocomplete.js');
		$this->addJs('/statics/bootstrap-select/bootstrap-select.js');
		$this->addCss('/statics/bootstrap-select/bootstrap-select.css');
		$this->addJs('/statics/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js');
		$this->addJs('/statics/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js');
		$this->addCss('/statics/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css');
		return $this->view('tools/idcard.twig', $data);
	}

	/**
	 * 时间戳
	 * @pattern /timestamp.html
	 * @menu 实用工具|时间戳处理
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function timestamp(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/bootstrap-select/bootstrap-select.js');
		$this->addCss('/statics/bootstrap-select/bootstrap-select.css');
		return $this->view('tools/timestamp.twig', $data);
	}
}