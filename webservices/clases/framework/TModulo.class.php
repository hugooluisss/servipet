<?php
/**
* TModulo
* O tambien conocida como layout
* @author     Hugo Luis Santiago Altamirano hugooluisss@gmail.com
* @license    openSource
* @version    1.0, 28/agosto/2012
**/
class TModulo{
    private $idModulo;
    private $dataReturn;
	
	public function __construct($id = null){
        $this->setId($id);
        $this->dataReturn = array();
	}
	
	public function setId($id = null){
		if ($id == '')
			return false;

		global $conf;
        if (count($conf[$id]) == 0) return false;
        
        $this->idModulo = $id;
        foreach($conf[$id] as $key => $val){
            $this->$key = $val;
        }
		
		return true;
	}
	
	private function setControlador($ruta){
		unset($this->controlador);
		$this->controlador = $ruta;
		
		return true;
	}
	
	public function getRutaControlador(){
		if (isset($this->controlador))
			return $this->controlador;
		
		return '';
	}
	
	public function getId(){
		return $this->idModulo;
	}
	
	public function getAction(){
		return $_POST['action'] == ''?$_GET['action']:$_POST['action'];
    }

    public function addVar($nombre = '', $datos){
        if ($nombbre == '') return false;
        $this->dataReturn[$nombre] = $datos;
    }

    public function __destruct(){
        echo json_encode($this->dataReturn);
    }
}