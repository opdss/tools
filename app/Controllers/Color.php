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
use App\Models\IdcardAreazone;
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
	 * http://www.bootcss.com/p/websafecolors/
	 * @pattern /color.html
	 * @menu 色彩工具|web颜色
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('https://cdn.bootcss.com/bootstrap-colorpicker/3.0.0-beta.1/js/bootstrap-colorpicker.min.js');
		$this->addCss('https://cdn.bootcss.com/bootstrap-colorpicker/3.0.0-beta.1/css/bootstrap-colorpicker.min.css');
		$data['color'] = Config::get('color');
		return $this->view('color/index.twig', $data);
	}

	/**
	 * 调色板
	 * //@menu 色彩工具|调色板
	 * @pattern /color/picker.html
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function picker(Request $request, Response $response, $args)
	{
		$arr = IdcardAreazone::all()->toArray();
		$data = [];
		foreach ($arr as $item) {
			$data[$item['zone']] = $item['areazone'];
		}
		file_put_contents(CACHE_DIR.'areazone.php', "<?php \nreturn ".var_export($data, 1).';');exit;
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addJs('/statics/js/colorpicker.min.js');
		return $this->view('color/picker.twig', $data);
	}

}