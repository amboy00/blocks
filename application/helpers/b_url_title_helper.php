<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');



if(!function_exists('url_title'))
{
  function url_title($str, $separator = 'dash')
  {
    $charset = config_item('charset');
    $separator = ($separator == 'underscore') ? '_' : '-';
    $str = strtolower(htmlentities($str, ENT_COMPAT, $charset));
    $str = preg_replace('/&(.)(acute|cedil|circ|lig|grave|ring|tilde|uml);/', "$1", $str);
    $str = preg_replace('/([^a-z0-9]+)/', $separator, html_entity_decode($str, ENT_COMPAT, $charset));
    $str = trim($str, $separator);
    return $str;
  }
} 

