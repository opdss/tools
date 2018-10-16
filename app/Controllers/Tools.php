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
	 * @menu 实用工具|Unix时间戳转换
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function timestamp(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		$this->addStaticsDir('bootstrap-datetimepicker');
		$this->addJs('/statics/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js');
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
	 * @link http://tool.oschina.net/diff
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

	/**
	 * 文件对比
	 * @pattern /img2base64.html
	 * @link http://tool.oschina.net/encrypt?type=4
	 * @menu 实用工具|图片/BASE64转换
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function img2base64(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/img2base64.twig', $data);
	}

	/**
	 * 进制转换
	 * @pattern /hexconvert.html
	 * @link http://tool.oschina.net/hexconvert/
	 * @menu 实用工具|进制转换
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function hexConvert(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		return $this->view('tools/hexconvert.twig', $data);
	}

	/**
	 * 端口扫描
	 * @pattern /scanport.html
	 * @link https://tool.lu/portscan/
	 * @menu 实用工具|端口扫描
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function scanPort(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/scanPort.twig', $data);
	}

	/**
	 * whois查询
	 * //@pattern /whois.html
	 * @link https://tool.lu/portscan/
	 * @menu 实用工具|端口扫描
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function whois(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('tools/whois.twig', $data);
	}

	/**
	 * 端口扫描
	 * //@pattern /httptest.html
	 * @link http://www.atool.org/httptest.php
	 * @menu 实用工具|http接口调试|new
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function httpTest(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		return $this->view('tools/httpTest.twig', $data);
	}

	/**
	 * 在线正则测试
	 * //@pattern /regex.html
	 * @link http://www.atool.org/httptest.php
	 * @menu 实用工具|在线正则测试|new
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function regex(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		$this->addStaticsDir('xregexp');
		return $this->view('tools/regex.twig', $data);
	}
}