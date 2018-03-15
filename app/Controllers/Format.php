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
	 * @menu format|index
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
		$this->getMenus();
	}

	/**
	 * to_json
	 * @pattern /format/json.html
	 * @menu format|json
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function to_json(Request $request, Response $response, $args)
	{

		return $this->view('format/json.twig');
	}

}