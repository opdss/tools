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
use App\Libraries\File;
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

	protected $css = array();
	protected $js = array();

	protected $used = [];
	protected $usedMenus = [];

	/**
	 * Ctrl constructor.
	 * @param Container $ci
	 */
	public function __construct(Container $ci)
	{
		$this->ci = $ci;
		$this->settings = $this->ci->get('settings');

        if (isset($_COOKIE['used'])) {
            $this->used = explode(',', $_COOKIE['used']);
        }

		$this->menus = $this->getMenus();
		$this->addJs('/statics/js/main.js', time());
		$this->addCss('/statics/css/layout.css', time());
		$this->addJs('/statics/js/utils.js', time());
	}

	protected function getMenus()
	{
		$routes = $this->ci->routes;
		$menus = [];
		foreach ($routes as $route) {
			$sub = $route['info'];
			if (isset($sub['menu']) && $sub['menu']) {
                $arr = explode('|', $sub['menu'], 3);
				if (!isset($menus[$arr[0]])) {
					$menus[$arr[0]] = array('name' => $arr[0], 'url' => $this->ci->router->pathFor($route['name']), 'sub' => []);
				}
				if (isset($arr[1])) {
				    $one = ['name' => $arr[1], 'url' => $this->ci->router->pathFor($route['name']), 'three'=>(isset($arr[2]) ? $arr[2] : '')];
                    $menus[$arr[0]]['sub'][$arr[1]] = $one;
                    //添加最近实用
                    if (!empty($this->used) && in_array($route['name'], $this->used)) {
                        array_unshift($this->usedMenus, $one);
                    }
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
			    if (!in_array($currentRouteName, $this->used)) {
                    array_unshift($this->used, $currentRouteName);
                }
                $this->used = array_slice($this->used, 0, 8);
			    setcookie('used', implode(',', $this->used), time()+7200, '/');
				return isset($route['info']['menu']) && $route['info']['menu'] ? explode('|', $route['info']['menu']) : [];
			}
		}
		return false;
	}

	protected function addJs($file, $version = 0)
	{
		array_push($this->js, $version ? $file . '?' . $version : $file);
		return $this->js;
	}

	protected function addCss($file, $version = 0)
	{
		array_push($this->css, $version ? $file . '?' . $version : $file);
		return $this->css;
	}

	protected function addStaticsDir($dir, $dep = 1, $version = 0)
	{
		$statics = Config::get('statics');
		if (isset($statics[$dir])) {
			$files = $statics[$dir];
		} else {
			$path = PUBLIC_DIR . 'statics/'.ltrim($dir, '/');
			$files = File::getFileNames($path, 1, $dep);
		}
		if ($files) {
			foreach ($files as $item) {
				if (substr($item, -3) == '.js') {
					$f = str_replace(PUBLIC_DIR, '/', $item);
					$this->addJs($f, $version);
				} elseif (substr($item, -4) == '.css') {
					$f = str_replace(PUBLIC_DIR, '/', $item);
					$this->addCss($f, $version);
				}
			}
		}
		return $files;
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
		$render_data['statics'] = array('css' => $this->css, 'js' => $this->js);
		$render_data['Bootstrap'] = new Bootstrap;
		$render_data['Functions'] = new Functions;
		$render_data = array_merge($render_data, $data);
		$render_data['title'] = isset($render_data['current_menu']) ? implode('-', array_reverse($render_data['current_menu'])).'-GJX.APP' : $render_data['site']['title'];
		$render_data['keyword'] = isset($render_data['current_menu']) ? implode(',', $render_data['current_menu']).','.$render_data['site']['keyword'] : $render_data['site']['keyword'];
		$render_data['description'] = $render_data['keyword'];
		$render_data['runtime'] = round(\App\Functions::runTime('run', true), 6);
		$render_data['used'] = $this->usedMenus;
		return $this->ci->view->render($this->ci->response, $tpl, $render_data);
	}

}