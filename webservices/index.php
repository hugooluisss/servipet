<?php
header("Access-Control-Allow-Origin: *");
#variables
include("aplicacion.php");
header('Content-Type: text/html; charset=UTF-8');
setlocale(LC_CTYPE, "es_ES");
date_default_timezone_set("America/Mexico_City");
date_default_timezone_set("UTC");
ini_set('display_errors', '0');

include('librerias/funciones.php');
$conf = array();
includeDir("config/");

includeDir("clases/framework/");
//includeDir("clases/aplicacion/");

if ($objModulo->getRutaControlador() <> '')
    require('controladores/'.$objModulo->getRutaControlador());
?>
Hola