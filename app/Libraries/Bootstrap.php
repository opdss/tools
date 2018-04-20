<?php
/**
 * Bootstrap.php for tools.
 * @author SamWu
 * @date 2018/3/19 14:51
 * @copyright boyaa.com
 */

namespace App\Libraries;

class Bootstrap
{
	public static function iconBtn($icon, array $arr = array(), $hasTip = true)
	{
		$icons = array(
			'copy' => '复制文本内容',
			'remove' => '清除文本内容',
			'retweet' => '文本置换',
			'cloud' => '读取链接内容',
		);
		//if ($icon == 'copy') $hasTip = false;
		if (!isset($arr['title']) && isset($icons[$icon])) {
			$arr['title'] = $icons[$icon];
		}
		$class = '';
		if ($arr) {
			foreach ($arr as $k => $v) {
				$class .= ' ' . $k . '="' . $v . '"';
			}
		}
		$tip = $hasTip ? ' data-toggle="tooltip" data-placement="top"' : '';
		$html = '<button type="button" class="btn btn-default btn-xs btn-' . $icon . '" ' . $tip . ' ' . $class . '>';
		$html .= '<span class="glyphicon glyphicon-' . $icon . '"></span>';
		$html .= '</button>';
		return $html;
	}

	public static function textarea($id, $rows = 10, $val = '')
	{
		$html = '<textarea class="form-control" rows="' . $rows . '" id="' . $id . '">' . $val . '</textarea>';
		return $html;
	}

	public static function input($id)
	{
		$html = '<input class="form-control" id="' . $id . '"></input>';
		return $html;
	}

	public static function button($arr, $name = '提交', $style = 'primary')
	{
		$class = '';
		if (isset($arr['class'])) {
			$class = $arr['class'];
			unset($arr['class']);
		}
		$attr = '';
		if ($arr) {
			foreach ($arr as $k => $v) {
				$attr .= ' ' . $k . '="' . $v . '"';
			}
		}
		$html = '<button class="btn btn-' . $style . ' ' . $class . '" ' . $attr . ' >' . $name . '</button>';
		return $html;
	}

	public static function span($name, $label = 'success', $id = '')
	{
		$html = '<span class="label label-' . $label . '" id="' . $id . '">' . $name . '</span>';
		return $html;
	}
}