<?php
/**
 * Base.php for tools.
 * @author SamWu
 * @date 2017/7/4 14:08
 * @copyright istimer.com
 */

namespace App\Controllers;

use App\Functions;
use App\Libraries\Bootstrap;
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

	protected $css = array(
		'/statics/bootstrap/css/bootstrap.min.css',
		'/statics/css/sweet-alert.css',
	);
	protected $js = array(
		'/statics/js/jquery-3.2.1.js',
		'/statics/bootstrap/js/bootstrap.min.js',
		'/statics/js/lodash.js',
		'/statics/js/sweet-alert.min.js',
		'/statics/zclip/jquery.zclip.min.js',
		'/statics/js/clipboard.min.js',
	);

	/**
	 * Ctrl constructor.
	 * @param Container $ci
	 */
	public function __construct(Container $ci)
	{
		$this->ci = $ci;
		$this->settings = $this->ci->get('settings');
		$this->menus = $this->getMenus();
		$this->addJs('/statics/js/main.js', time());
		$this->addCss('/statics/css/layout.css', time());
	}

	protected function getMenus()
	{
		$routes = $this->ci->routes;
		$menus = [];
		foreach ($routes as $route) {
			$sub = $route['info'];
			if (isset($sub['menu']) && $sub['menu']) {
				$arr = explode('|', $sub['menu'], 2);
				if (!isset($menus[$arr[0]])) {
					$menus[$arr[0]] = array('name'=>$arr[0], 'url'=>$this->ci->router->pathFor($route['name']), 'sub'=>[]);
				}
				if (isset($arr[1])) {
					$menus[$arr[0]]['sub'][$arr[1]] = ['name' => $arr[1], 'url' => $this->ci->router->pathFor($route['name'])];
				}
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
				return isset($route['info']['menu']) && $route['info']['menu'] ? explode('|', $route['info']['menu']) : [];
			}
		}
		return false;
	}

	protected function addJs($file, $version=0)
	{
		array_push($this->js, $version ? $file.'?'.$version : $file);
		return $this->js;
	}

	protected function addCss($file, $version=0)
	{
		array_push($this->css, $version ? $file.'?'.$version : $file);
		return $this->css;
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
		//$extra['runTime'] = Functions::runTime('run', 1);
		if (func_num_args() == 1) {
			$data = $extra;
		}
		return $this->ci->get('response')->withJson(Functions::formatApiData($param, $data, $extra));
	}

	protected function view($tpl, $data = array())
	{
		$render_data['site'] = Config::get('site');
		$render_data['menus'] = $this->menus;
		$render_data['statics'] = array('css'=>$this->css, 'js'=>$this->js);
		$render_data['Bootstrap'] = new Bootstrap;
		$render_data['Functions'] = new Functions;
		$render_data = array_merge($render_data, $data);
        $render_data['title'] = isset($render_data['current_menu']) ? implode('-',$render_data['current_menu']) : $render_data['site']['title'];
        $render_data['runtime'] = \App\Functions::runTime('run', true);
        return $this->ci->view->render($this->ci->response, $tpl, $render_data);
	}


}