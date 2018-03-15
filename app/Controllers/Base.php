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

class Base
{
	/**
	 * @var Container
	 */
	protected $ci;

	protected $settings;

	/**
	 * Ctrl constructor.
	 * @param Container $ci
	 */
	public function __construct(Container $ci)
	{
		$this->ci = $ci;
		$this->settings = $this->ci->get('settings');
	}

	protected function getMenus()
	{
		$routes = $this->ci->routes;
		$menus = [];
		$i = 0;
		foreach ($routes as $route) {
			$sub = $route['subInfo'];
			if (isset($sub['menu']) && $sub['menu']) {
				$arr = explode('|', $sub['menu'], 2);
				if (!isset($menus[$arr[0]])) {
					$menus[$i] = array('name'=>$arr[0], 'url'=>$this->ci->router->pathFor($route['name']), 'sub'=>[]);
				}
				$menus[$i]['sub'][] = ['name'=>$arr[1], 'url'=>$this->ci->router->pathFor($route['name'])];
			}
			$i++ ;
		}
		var_dump($menus);
		return $menus;
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
		$render_data = Config::get('siter');
		$render_data = array_merge($render_data, $data);
		return $this->ci->view->render($this->ci->response, $tpl, $render_data);
	}

}