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
	 * @pattern /format.html
	 * @menu 格式化工具|index
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
	 * @pattern /format/json
	 * @menu format|json
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function toJson(Request $request, Response $response, $args)
	{
		//$subInfo = $this->getCurrentRouteInfo($request);
		//$data['subInfo'] = explode('|', 'format|json');
		return $this->view('format/json.twig');
	}

    /**
     * @pattern /format/xml
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toXml(Request $request, Response $response, $args)
    {
        return $this->view('format/xml.twig');
    }


    /**
     * @pattern /format/html
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toHtml(Request $request, Response $response, $args)
    {
        return $this->view('format/html.twig');
    }

    /**
     * @pattern /format/js
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toJs(Request $request, Response $response, $args)
    {
        return $this->view('format/html.twig');
    }

    /**
     * @pattern /format/css
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toCss(Request $request, Response $response, $args)
    {
        return $this->view('format/html.twig');
    }
}