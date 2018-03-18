<?php
/**
 * Conversion.php for tools.
 * @author SamWu
 * @date 2018/3/15 12:17
 * @copyright boyaa.com
 */
namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Format
 * @package App\Controllers
 */
class Conversion extends Base
{
	/**
	 * @pattern /conversion.html
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);

	}

    /**
     * @pattern /conversion/base64
     * @menu 编码转换|Base64编码
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function base64(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);

    }

    /**
     * @pattern /conversion/urlcode
     * @menu 编码转换|url编码
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function urlcode(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('cryption/pwd.twig', $data);

    }

}