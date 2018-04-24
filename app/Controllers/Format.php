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
	 * //@pattern /format
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function index(Request $request, Response $response, $args)
	{
	    return self::toJson($request, $response, $args);
	}

	/**
	 * to_json
	 * @pattern /format/json.html
	 * @menu 格式化工具|json格式化
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 */
	public function toJson(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('jsonview');
		$this->addStaticsDir('bootstrap-select');
		$data['test'] = <<<EOF
{"name":"工具箱","links":[{"name":"blog","url":"http://www.istimer.com"},{"name":"古诗词","url":"http://www.isnoter.com"}],"url":"http://www.1tools.net","3Q":"谢谢使用，如有意见，反正也没提交入口"}
EOF;
		return $this->view('format/json.twig', $data);
	}

	/**
     * @pattern /format/xml.html
     * @menu 格式化工具|xml格式化
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toXml(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
        $this->addStaticsDir('beautify');
        $this->addStaticsDir('bootstrap-select');
        /*$data['test'] = <<<EOF
<?xml version="1.0" encoding="UTF-8"?><PARAM><DBID>35</DBID><SEQUENCE>atgtca</SEQUENCE><MAXNS>10</MAXNS><MINIDENTITIES>90</MINIDENTITIES><MAXEVALUE>10</MAXEVALUE><USERNAME>admin</USERNAME><PASSWORD>111111</PASSWORD><TYPE>P</TYPE><RETURN_TYPE>2</RETURN_TYPE></PARAM>
EOF;*/

        return $this->view('format/xml.twig', $data);
    }


    /**
     * @pattern /format/html.html
     * @menu 格式化工具|html美化与压缩
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toHtml(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('beautify');
		$this->addStaticsDir('htmlminifier');
		$this->addStaticsDir('bootstrap-select');
		/*$data['test'] = <<<EOF
<!DOCTYPE html><html lang="zh-CN"><head>	<meta charset="utf-8">	<meta http-equiv="X-UA-Compatible" content="IE=edge">	<meta name="viewport" content="width=device-width, initial-scale=1">	<meta name="author" content="1tools">	<meta name="keyword" content="格式化工具,html美化与压缩,工具箱">	<meta name="description" content="格式化工具,html美化与压缩,工具箱">	<meta name="baidu-site-verification" content="4hTtFRZbky" />	<link rel="icon" href="http://img.1tools.net/ico/2tools32.ico">	<title>格式化工具-html美化与压缩</title>	<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">	<link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">	<link href="/statics/css/layout.css?1524126261" rel="stylesheet">	<link href="https://cdn.bootcss.com/bootstrap-select/1.12.4/css/bootstrap-select.min.css" rel="stylesheet">	<script>		var _hmt = _hmt || [];		(function() {			var hm = document.createElement("script");			hm.src = "https://hm.baidu.com/hm.js?80436984ca8f6751c9c798a987c094d8";			var s = document.getElementsByTagName("script")[0];			s.parentNode.insertBefore(hm, s);		})();	</script></head><body><a href="">工具箱</a></body></html>
EOF;*/

        return $this->view('format/html.twig', $data);
    }

    /**
     * @pattern /format/js.html
     * @menu 格式化工具|js美化与压缩
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toJs(Request $request, Response $response, $args)
    {
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('beautify');
		$this->addStaticsDir('bootstrap-select');
		/*$data['test'] = <<<EOF
(function(mod){if(typeof exports=="object"&&typeof module=="object"){mod(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],mod)}else{mod(CodeMirror)}}})(function(CodeMirror){CodeMirror.defineOption("rulers",false,function(cm,val){if(cm.state.rulerDiv){cm.state.rulerDiv.parentElement.removeChild(cm.state.rulerDiv);cm.state.rulerDiv=null;cm.off("refresh",drawRulers)}if(val&&val.length){cm.state.rulerDiv=cm.display.lineSpace.parentElement.insertBefore(document.createElement("div"),cm.display.lineSpace);cm.state.rulerDiv.className="CodeMirror-rulers";drawRulers(cm);cm.on("refresh",drawRulers)}});function drawRulers(cm){cm.state.rulerDiv.textContent="";var val=cm.getOption("rulers");var cw=cm.defaultCharWidth();var left=cm.charCoords(CodeMirror.Pos(cm.firstLine(),0),"div").left;cm.state.rulerDiv.style.minHeight=(cm.display.scroller.offsetHeight+30)+"px";for(var i=0;i<val.length;i++){var elt=document.createElement("div");elt.className="CodeMirror-ruler";var col,conf=val[i];if(typeof conf=="number"){col=conf}else{col=conf.column;if(conf.className){elt.className+=" "+conf.className}if(conf.color){elt.style.borderColor=conf.color}if(conf.lineStyle){elt.style.borderLeftStyle=conf.lineStyle}if(conf.width){elt.style.borderLeftWidth=conf.width}}elt.style.left=(left+col*cw)+"px";cm.state.rulerDiv.appendChild(elt)}}});
EOF;*/

		return $this->view('format/js.twig', $data);
    }

    /**
     * @pattern /format/css.html
     * @menu 格式化工具|css美化与压缩
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     */
    public function toCss(Request $request, Response $response, $args)
    {
        $data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('beautify');
		$this->addStaticsDir('bootstrap-select');
		/*$data['test'] = <<<EOF
.CodeMirror-dialog{position:absolute;left:0;right:0;background:inherit;z-index:15;padding:.1em .8em;overflow:hidden;color:inherit}.CodeMirror-dialog-top{border-bottom:1px solid #eee;top:0}.CodeMirror-dialog-bottom{border-top:1px solid #eee;bottom:0}.CodeMirror-dialog input{border:none;outline:0;background:0 0;width:20em;color:inherit;font-family:monospace}.CodeMirror-dialog button{font-size:70%}
EOF;*/

        return $this->view('format/css.twig', $data);
    }

	/**
	 * //@pattern /format/json2xml.html
	 * @menu 格式化工具|json/xml转换
	 * @param Request $request
	 * @param Response $response
	 * @param $args
	 * @return mixed
	 */
    public function json2xml(Request $request, Response $response, $args)
	{
		$data['current_menu'] = $this->getCurrentMenu($request);
		$this->addStaticsDir('beautify');
		$this->addStaticsDir('bootstrap-select');
		$this->addJs('/statics/js/objTree.js');
		$data['test'] = <<<EOF
{"name":"工具箱","links":[{"name":"blog","url":"http://www.istimer.com"},{"name":"古诗词","url":"http://www.isnoter.com"}],"url":"http://www.1tools.net","3Q":"谢谢使用，如有意见，反正也没提交入口"}
EOF;
		return $this->view('format/json2xml.twig', $data);
	}
}