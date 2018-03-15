<?php
/**
 * Cryption.php for tools.
 * @author SamWu
 * @date 2018/3/15 12:18
 * @copyright boyaa.com
 */
namespace App\Controllers;

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
	 * @menu cyption|index
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{

	}

    /**
     * 随机密码
     * @pattern /cryption/pwd
     * @menu cyption|index
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function toPwd(Request $request, Response $response, $args)
    {

    }

}