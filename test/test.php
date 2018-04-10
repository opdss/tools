<?php
/**
 * test.php for tools
 * @author SamWu
 * @date 2018/4/10 17:20
 * @copyright boyaa.com
 */

$file = './color.txt';

$res = file_get_contents($file);

$res = explode("\n", $res);

$data = [];
foreach ($res as $item) {
	$one = explode(',', $item, 5);
	$data[] = array(
		strtolower($one[0]),
		$one[1],
		$one[2],
		str_replace('&', ',', trim($one[3], '"')),
		$one[4],
	);
}

file_put_contents('./config/color.php', "<?php\r\n return ".var_export($data, true).';');