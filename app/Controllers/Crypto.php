<?php
/**
 * Crypto.php for tools.
 * @author SamWu
 * @date 2018/3/15 12:18
 * @copyright boyaa.com
 */
namespace App\Controllers;

use App\Libraries\Bootstrap;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Crypto
 * @package App\Controllers
 */
class Crypto extends Base
{
	/**
	 * @pattern /crypto.html
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
     * 密码生成器
	 * http://tool.oschina.net/htpasswd
     * @pattern /crypto/passwd.html
     * @menu 加解密工具|随机密码生成器
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function genPwd(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('crypto/passwd.twig', $data);
    }
    /**
     * htpasswd生成器
	 * http://tool.oschina.net/htpasswd
     * @pattern /crypto/htpasswd.html
     * @menu 加解密工具|htpasswd生成器
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function htPassWd(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/js/sha1.js');
		$this->addJs('/statics/js/javacrypt.js');
		$this->addStaticsDir('bootstrap-select');
        return $this->view('crypto/htpasswd.twig', $data);
    }

    /**
     * @pattern /crypto/md5.html
     * @menu 加解密工具|md5计算
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function md5(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $this->addJs('/statics/js/jquery.md5.js');
        return $this->view('crypto/md5.twig', $data);
    }


	/**
	 * @pattern /crypto/hash.html
	 * @link http://tool.oschina.net/encrypt?type=2
	 * @menu 加解密工具|散列/哈希
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function hash(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		$this->addStaticsDir('crypto-js');
		return $this->view('crypto/hash.twig', $data);
	}

    /**
     * @pattern /crypto/base64.html
     * @menu 加解密工具|base64编解码
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function base64(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
        $this->addJs('/statics/js/base64.js');
        return $this->view('crypto/base64.twig', $data);
    }

    /**
     * @pattern /crypto/urlcode.html
     * @menu 加解密工具|url编解码
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function urlcode(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('bootstrap-select');
		return $this->view('crypto/urlcode.twig', $data);
    }

    /**
     * //@pattern /crypto/des.html
     * @menu 加解密工具|des加解密
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function des(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('crypto/des.twig', $data);
    }

    /**
     * //@pattern /crypto/aes
     * @menu 加解密工具|aes加解密
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function aes(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('crypto/pwd.twig', $data);
    }
}