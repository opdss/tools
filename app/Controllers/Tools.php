<?php
/**
 * Tools.php for tools.
 * @author SamWu
 * @date 2018/3/20 16:02
 * @copyright boyaa.com
 */

namespace App\Controllers;

use App\Libraries\Config;
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
		//$this->addJs('https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js');
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
		$this->addStaticsDir('bootstrap-select');
		$this->addStaticsDir('ajax-bootstrap-select');
		$this->addStaticsDir('bootstrap-datetimepicker');
		$this->addJs('/statics/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js');
		return $this->view('tools/idcard.twig', $data);
	}

	/**
	 * 时间戳
	 * @pattern /timestamp.html
	 * @menu 实用工具|Unix时间处理
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function timestamp(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		$data['timezone'] = Config::get('timezone');
		return $this->view('tools/timestamp.twig', $data);
	}

	/**
	 * 时间戳
	 * https://www.bejson.com/othertools/keycodes/
	 * @pattern /keycode.html
	 * @menu 实用工具|获取键盘按键值
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function keyCode(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/keycode.twig', $data);
	}

	/**
	 * 文件对比
	 * @pattern /diff.html
	 * http://tool.oschina.net/diff
	 * @menu 实用工具|文件对比
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function diff(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
        $this->addStaticsDir('mergely');
		return $this->view('tools/diff.twig', $data);
	}
}