<?php
global $objModulo;
switch($objModulo->getId()){
    case 'sesion':
        $objModulo->addVar("result", true);
    break;
}
?>