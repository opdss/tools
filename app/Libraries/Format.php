<?php
/**
 * Format.php for tools.
 * @author SamWu
 * @date 2018/3/16 18:25
 * @copyright boyaa.com
 */
namespace App\Libraries;

class Format
{
    private static $errMsg = array();

    public static function getErrMsg()
	{
    	return self::$errMsg;
	}

    public static function compressJson($json)
    {
        $json = json_decode($json);
        //isJson()
        if ($json) {
            return json_encode($json);
        }
        array_push(self::$errMsg, json_last_error_msg());
        return false;
    }

    public static function formatJson($json, $unescapeUnicode = false, $unescapeSlashes = false)
    {
        $json = json_decode($json);
        if (!$json) {
            array_push(self::$errMsg, json_last_error_msg());
            return false;
        }
        $json = json_encode($json);
        $result = '';
        $pos = 0;
        $strLen = strlen($json);
        $indentStr = '    ';
        $newLine = "\n";
        $outOfQuotes = true;
        $buffer = '';
        $noescape = true;
        for ($i = 0; $i < $strLen; $i++) {
            $char = substr($json, $i, 1);
            if ('"' === $char && $noescape) {
                $outOfQuotes = !$outOfQuotes;
            }
            if (!$outOfQuotes) {
                $buffer .= $char;
                $noescape = '\\' === $char ? !$noescape : true;
                continue;
            } elseif ('' !== $buffer) {
                if ($unescapeSlashes) {
                    $buffer = str_replace('\\/', '/', $buffer);
                }
                if ($unescapeUnicode && function_exists('mb_convert_encoding')) {
                    $buffer = preg_replace_callback('/(\\\\+)u([0-9a-f]{4})/i', function ($match) {
                        $l = strlen($match[1]);
                        if ($l % 2) {
                            return str_repeat('\\', $l - 1) . mb_convert_encoding(
                                    pack('H*', $match[2]),
                                    'UTF-8',
                                    'UCS-2BE'
                                );
                        }

                        return $match[0];
                    }, $buffer);
                }

                $result .= $buffer . $char;
                $buffer = '';
                continue;
            }
            if (':' === $char) {
                $char .= ' ';
            } elseif (('}' === $char || ']' === $char)) {
                $pos--;
                $prevChar = substr($json, $i - 1, 1);
                if ('{' !== $prevChar && '[' !== $prevChar) {
                    $result .= $newLine;
                    for ($j = 0; $j < $pos; $j++) {
                        $result .= $indentStr;
                    }
                } else {
                    $result = rtrim($result);
                }
            }
            $result .= $char;
            if (',' === $char || '{' === $char || '[' === $char) {
                $result .= $newLine;
                if ('{' === $char || '[' === $char) {
                    $pos++;
                }
                for ($j = 0; $j < $pos; $j++) {
                    $result .= $indentStr;
                }
            }
        }
        return $result;
    }

	/**
	 * 美化HTML显示
	 *
	 * @param string $str html内容
	 * @param boolean $strip_attr 是否过滤标签属性
	 * @return string
	 */
    public static function formatHtml($str, $strip_attr = false)
	{
			if (empty($str)) {
				return '';
			}
			preg_match_all('/(\<[\/]?\w+([^>]*)>)([^\<]*)/', $str, $matchs);
			$beauty_str = '';  // 格式后html
			$space = "   ";  // 空格符
			$space_times = 0;  // 空格数量
			foreach ($matchs[1] as $key => $value) {
				if (strpos($value, '</') === 0) {  // 结束标签
					$space_times --;  // 空格 -1
					$beauty_str .= str_repeat($space, $space_times) . $value . PHP_EOL;
					continue;
				}
				if ($strip_attr === true) {  // 过滤标签属性
					$style = $matchs[2][$key];
					$replace = '';
					if (strpos($value, '<img') === 0) {  // 处理图片
						preg_match('/(src=\S+)/', $style, $style_matchs);
						$replace = ' ' . $style_matchs[0];
					}
					$value = str_replace($style, $replace, $value);
				}
				$beauty_str .= str_repeat($space, $space_times) . $value;  // 开始标签
				if (strpos($value, '<img') === 0 || strpos($value, '<br') === 0) {  // 图片/br换行
					$beauty_str .= PHP_EOL;
					continue;  // 没有内容,直接跳过循环
				}
				// 判断是否换行
				if (!isset($matchs[3][$key]) || empty($matchs[3][$key])) {  // 没有内容/空内容
					if (strpos($matchs[1][$key + 1], '</') === false) {  // 下一个标签不是结束标签
						$beauty_str .= PHP_EOL;
					}
					$space_times ++;
					continue;
				} else if (!empty($matchs[3][$key])) {  // 有内容
					$beauty_str .= PHP_EOL;
				} else if (isset($matchs[1][$key + 1])) {
					if (strpos($matchs[1][$key + 1], '</') === false) {  // 下一个标签不是结束标签
						$beauty_str .= PHP_EOL;
					}
				}
				$beauty_str .= str_repeat($space, $space_times + 1) . $matchs[3][$key] . PHP_EOL;  // 内容显示
				$space_times ++;  // 空格 +1
			}
			return $beauty_str;
	}
}
