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
 * Class Index
 * @package App\Controllers
 */
class Index extends Base
{
	/**
	 * @pattern [/]
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
		//var_dump();exit;
		/*$routes = $this->ci->get('routes');
		foreach ($routes as $item) {

		}
		$data = [];*/
		return $this->view('index.twig');
	}

    /**
     * @pattern /test[/]
     * @param Request $request
     * @param Response $response
     * @param $args
     */
    public function test(Request $request, Response $response, $args)
    {
        return $this->view('layout.twig', []);
    }

	/**
	 * routes
	 * @pattern /routes
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function routes(Request $request, Response $response, $args)
	{
		$type = $request->getParam('type');
		$routes = $this->ci->offsetGet('routes');
		if ($type == 'api') {
			foreach ($routes as $k => $v) {
				if (substr($v['pattern'], 0, 4) != '/api') {
					unset($routes[$k]);
				}
			}
		}
		return $this->json($routes);
	}

}