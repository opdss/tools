<?php
/**
 * Format.php for tools.
 * @author SamWu
 * @date 2018/3/13 18:29
 * @copyright boyaa.com
 */
namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Format
 * @package App\Controllers
 */
class Format extends Base
{
	/**
	 * @pattern /format
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
	    return self::toJson($request, $response, $args);
	}

	/**
	 * to_json
	 * @pattern /format/json.html
	 * @menu 格式化工具|json格式化
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function toJson(Request $request, Response $response, $args)
	{
        $data['current_menu'] = $this->getCurrentMenu($request);
		return $this->view('format/json.twig', $data);
	}

    /**
     * //@pattern /format/xml.html
     * @menu 格式化工具|xml格式化
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toXml(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('format/xml.twig', $data);
    }


    /**
     * //@pattern /format/html.html
     * @menu 格式化工具|html格式化
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toHtml(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('format/html.twig', $data);
    }

    /**
     * //@pattern /format/js.html
     * @menu 格式化工具|js格式化
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toJs(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('format/html.twig', $data);
    }

    /**
     * //@pattern /format/css.html
     * @menu 格式化工具|css格式化
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toCss(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        return $this->view('format/html.twig', $data);
    }
}