<?php
/**
 * Created by PhpStorm.
 * User: wuxin
 * Date: 2018/4/20
 * Time: 20:47
 */
namespace App\Controllers;

use App\Libraries\Config;
use Slim\Http\Request;
use Slim\Http\Response;

class Doc extends Base
{

	/**
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function jquery(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('doc/jquery.twig', $data);
	}

    /**
     * @pattern /ascii.html
     * @menu  手册/文档|Ascii码参考
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function ascii(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['ascii'] = Config::get('ascii');
        return $this->view('doc/ascii.twig', $data);
    }

    /**
     * @pattern /nbsp.html
     * @menu  手册/文档|HTML实体名称
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function nbsp(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['nbsp'] = Config::get('nbsp');
        return $this->view('doc/nbsp.twig', $data);
    }

    /**
     * @pattern /contenttype.html
     * @menu  手册/文档|contentType类型
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function contentType(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['contentType'] = Config::get('contentType');
        return $this->view('doc/contentType.twig', $data);
    }

    /**
     * @pattern /httpcode.html
     * @menu  手册/文档|http状态码
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function httpCode(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['httpCode'] = Config::get('httpCode');
        return $this->view('doc/httpCode.twig', $data);
    }

    /**
     * @pattern /httpmethod.html
     * @menu  手册/文档|http请求方法
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function httpMethod(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['httpMethod'] = Config::get('httpMethod');
        return $this->view('doc/httpMethod.twig', $data);
    }

    /**
     * @pattern /tcpudpport.html
     * @menu  手册/文档|TCP/UDP常见端口
     * @link http://www.jsons.cn/portcode/
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function tcpUdpPort(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $data['tcpUdpPort'] = Config::get('tcpUdpPort');
        return $this->view('doc/tcpUdpPort.twig', $data);
    }
}