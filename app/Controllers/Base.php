<?php
/**
 * Base.php for tools.
 * @author SamWu
 * @date 2017/7/4 14:08
 * @copyright istimer.com
 */

namespace App\Controllers;

use App\Functions;
use App\Libraries\Config;
use Slim\Container;
use Slim\Http\Request;

class Base
{
	/**
	 * @var Container
	 */
	protected $ci;

	protected $settings;

	protected $menus;

	/**
	 * Ctrl constructor.
	 * @param Container $ci
	 */
	public function __construct(Container $ci)
	{
		$this->ci = $ci;
		$this->settings = $this->ci->get('settings');
		$this->menus = $this->getMenus();
	}

	protected function getMenus()
	{
		$routes = $this->ci->routes;
		$menus = [];
		foreach ($routes as $route) {
			$sub = $route['subInfo'];
			if (isset($sub['menu']) && $sub['menu']) {
				$arr = explode('|', $sub['menu'], 2);
				if (!isset($menus[$arr[0]])) {
					$menus[$arr[0]] = array('name'=>$arr[0], 'url'=>$this->ci->router->pathFor($route['name']), 'sub'=>[]);
				}
				$menus[$arr[0]]['sub'][$arr[1]] = ['name'=>$arr[1], 'url'=>$this->ci->router->pathFor($route['name'])];
			}
		}
		return $menus;
	}

	protected function getCurrentMenu(Request $request)
	{
		$currentRouteName = $request->getAttribute('route')->getName();
		$routes = $this->ci->routes;
		foreach ($routes as $route) {
			if ($route['name'] == $currentRouteName) {
				return isset($route['subInfo']['menu']) && $route['subInfo']['menu'] ? explode('|', $route['subInfo']['menu']) : [];
			}
		}
		return false;
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

	protected function view($tpl, $data = array())
	{
		$render_data['site'] = Config::get('site');
		$render_data['menus'] = $this->menus;
		$render_data = array_merge($render_data, $data);
		return $this->ci->view->render($this->ci->response, $tpl, $render_data);
	}

}