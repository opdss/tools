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
	public function index(Request $request, Response $response, $args)
	{
        return self::genPwd($request, $response, $args);
	}

    /**
     * 随机密码
     * @pattern /cryption/pwd
     * @menu 加解密工具|生成随机密码
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function genPwd(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$data['buttons'] = array(Bootstrap::button(array('id'=>'submit', 'data-obj'=>'#result_textarea'), '生成密码'));
		$data['result_textarea'] = Bootstrap::textarea('result_textarea');
		$data['result_tools'] = array(
			Bootstrap::iconBtn('copy', array('data-obj'=>'#result_textarea')),
			Bootstrap::iconBtn('remove', array('data-obj'=>'#result_textarea')),
		);
        return $this->view('cryption/pwd.twig', $data);
    }

    /**
     * @pattern /cryption/md5
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
		$data['buttons'] = array(Bootstrap::button(array('id'=>'submit', 'data-obj'=>'#origin_textarea|#result_textarea'), 'MD5'));
		$data['origin_textarea'] = Bootstrap::textarea('origin_textarea');
        $data['origin_tools'] = array(
			Bootstrap::iconBtn('copy', array('data-obj'=>'#origin_textarea')),
			Bootstrap::iconBtn('remove', array('data-obj'=>'#origin_textarea')),
			Bootstrap::iconBtn('cloud', array('data-obj'=>'#origin_textarea')),
		);
		$data['result_textarea'] = Bootstrap::textarea('result_textarea');
		$data['result_tools'] = array(
			Bootstrap::iconBtn('copy', array('data-obj'=>'#result_textarea')),
			Bootstrap::iconBtn('remove', array('data-obj'=>'#result_textarea')),
			Bootstrap::iconBtn('retweet', array('data-obj'=>'#origin_textarea|#result_textarea')),
		);
        return $this->view('cryption/md5.twig', $data);
    }

    /**
     * @pattern /cryption/des
     * @menu 加解密工具|des加解密
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function des(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);
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