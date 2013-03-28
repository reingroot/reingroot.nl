<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('nl2p'))
{
	function nl2p($string, $line_breaks = true, $xml = true) {

		$string = str_replace(array('<p>', '</p>', '<br>', '<br />'), '', $string);

		// It is conceivable that people might still want single line-breaks
		// without breaking into a new paragraph.
		if ($line_breaks == true)
		{
			return '<p>'.preg_replace(array("/([\n]{2,})/i", "/([^>])\n([^<])/i"), array("</p>\n<p>", '$1<br'.($xml == true ? ' /' : '').'>$2'), trim($string)).'</p>';
		} else {
			return '<p>'.preg_replace(array("/([\n]{2,})/i", "/([\r\n]{3,})/i","/([^>])\n([^<])/i"),
										array("</p>\n<p>", "</p>\n<p>", '$1<br'.($xml == true ? ' /' : '').'>$2'),
										trim($string)).'</p>';
		}
	}
}

if ( ! function_exists('print_r_formatted'))
{
	function print_r_formatted($array2print="")
	{
		echo "<p>";
		print_r($array2print);
		echo "</p>";
	}
}