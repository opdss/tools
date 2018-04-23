<?php
/**
 * Base.php for tools.
 * @author SamWu
 * @date 2017/7/4 14:08
 * @copyright istimer.com
 */

namespace App\Api;

use App\Functions;
use Slim\Container;

class Base
{
	/**
	 * @var Container
	 */
	protected $ci;

	protected $settings;

	/**
	 * Base constructor.
	 * @param Container $ci
	 */
	public function __construct(Container $ci)
	{
		$this->ci = $ci;
		$this->settings = $this->ci->get('settings');
	}

	/**
	 * 返回json
	 * @param $param
	 * @param array $data
	 * @return mixed
	 */
	protected function json($param, $data = array())
	{
		$extra = array();
		$extra['runTime'] = Functions::runTime('run', 1);
		if (func_num_args() == 1) {
			$data = $extra;
		}
		return $this->ci->get('response')->withJson(Functions::formatApiData($param, $data, $extra));
	}

	/**
	 * @pattern /api/routes
	 * @param $request
	 * @param $response
	 * @param $args
	 */
	public function routes($request, $response, $args)
	{
		$kw = trim($request->getParam('kw'));
		$routes = $this->ci->routes;
		$data = [];
		//if ($kw) {
			foreach ($routes as $route) {
				if (isset($route['info']['menu']) && !empty($route['info']['menu'])) {
					$menu_name = explode('|', $route['info']['menu'], 2);
					$menu_name = isset($menu_name[1]) ? $menu_name[1] : $menu_name[0];
					if ($kw) {
						if (strpos($menu_name, $kw) !== false) {
							$data[] = array(
								'name' => $menu_name,
								'url' => $this->ci->router->pathFor($route['name'])
							);
						}
					} else {
						$data[] = array(
							'name' => $menu_name,
							'url' => $this->ci->router->pathFor($route['name'])
						);
					}
				}
			}
		//}
		return $this->json($data);
	}
}