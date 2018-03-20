<?php
/**
 * Markdown.php for tools.
 * @author SamWu
 * @date 2018/3/20 10:44
 * @copyright boyaa.com
 */
namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class Markdown extends Base
{
	/**
	 * @pattern /markdown
	 * @menu MD在线编辑
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
	public function index(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addCss('/statics/markdown/css/editormd.min.css');
		$this->addJs('/statics/markdown/lib/marked.min.js');
		$this->addJs('/statics/markdown/lib/prettify.min.js');
		$this->addJs('/statics/markdown/lib/raphael.min.js');
		$this->addJs('/statics/markdown/lib/underscore.min.js');
		$this->addJs('/statics/markdown/lib/sequence-diagram.min.js');
		$this->addJs('/statics/markdown/lib/flowchart.min.js');
		$this->addJs('/statics/markdown/lib/jquery.flowchart.min.js');
		$this->addJs('/statics/markdown/editormd.min.js');
		return $this->view('markdown/edit.twig');
	}
}