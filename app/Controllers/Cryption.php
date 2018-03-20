<?php
/**
 * Cryption.php for tools.
 * @author SamWu
 * @date 2018/3/15 12:18
 * @copyright boyaa.com
 */
namespace App\Controllers;

use App\Libraries\Bootstrap;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Cryption
 * @package App\Controllers
 */
class Cryption extends Base
{
	/**
	 * @pattern /cryption.html
	 * @menu 加解密工具|index
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	/*public function index(Request $request, Response $response, $args)
	{
        return self::genPwd($request, $response, $args);
	}*/

    /**
     * 随机密码
     * @pattern /cryption/pwd.html
     * @menu 加解密工具|生成随机密码
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function genPwd(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);
    }

    /**
     * @pattern /cryption/md5.html
     * @menu 加解密工具|md5摘要
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function md5(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $this->addJs('/statics/js/jquery.md5.js');
        return $this->view('cryption/md5.twig', $data);
    }

    /**
     * @pattern /cryption/base64.html
     * @menu 加解密工具|base64编解码
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function base64(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $this->addJs('/statics/js/base64.js', time());
        return $this->view('cryption/base64.twig', $data);
    }

    /**
     * @pattern /cryption/urlcode.html
     * @menu 加解密工具|url编解码
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function urlcode(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/urlcode.twig', $data);
    }

    /**
     * @pattern /cryption/des.html
     * @menu 加解密工具|des加解密
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function des(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/des.twig', $data);
    }

    /**
     * @pattern /cryption/aes
     * @menu 加解密工具|aes加解密
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function aes(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);
    }
}