<?php
Class TBase{
	public function conectaDB($fuente = 'conexion'){
		global $ini;
		$user = $ini[$fuente]['user'];
		$pass = $ini[$fuente]['pass'];
		$server = $ini[$fuente]['server'];
		$baseDatos = $ini[$fuente]['db'];
		
		$db = new mysqli($server, $user, $pass, $baseDatos);
		if ($db->connect_errno) {
			echo "Falló la conexión a MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
			exit(-1);
		}else
			$db->query("SET NAMES utf8");
		
		
		return $db;
	}
	
	function __destruct(){ 
		if ($this->db) $this->db->Close();
	}
}
?>