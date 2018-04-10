<?php
/**
 * Color.php for tools
 * @author SamWu
 * @date 2018/4/10 15:09
 * @copyright boyaa.com
 */
namespace App\Controllers;
use App\Functions;
use App\Libraries\Config;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class Color
 * @package App\Controllers
 */
class Color extends Base
{

	/**
	 * web颜色
	 * @pattern /color.html
	 * @menu 色彩工具|web颜色
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		//var_dump(Functions::genFontColor('#000000'));exit;
		//var_dump(Functions::genFontColor('#3fef44'));exit;
		$data['color'] = Config::get('color');
		return $this->view('color/index.twig', $data);
	}

	/**
	 * 调色板
	 * @menu 色彩工具|调色板
	 * @pattern /color/picker.html
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function picker(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/js/colorpicker.min.js');
		return $this->view('color/picker.twig', $data);
	}

}