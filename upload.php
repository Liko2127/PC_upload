<?php

$acceptTypes0 = $_POST["acceptTypes"];
if($acceptTypes0 != "*") {
	$acceptTypes = explode(",",$acceptTypes0);
}
else {
	$acceptTypes = "*";
}

$forcenom = $_POST["forcenom"];
$remplace = $_POST["remplace"];
$destup = $_POST["destup"];
$maxsize = $_POST["maxsize"];
$message_erreur_type = stripslashes($_POST["message_erreur_type"]);
$message_erreur_maxsize = stripslashes($_POST["message_erreur_maxsize"]);
$message_erreur_already = stripslashes($_POST["message_erreur_already"]);

$extension0 = explode(".", $_FILES["file"]["name"]);
$extension = end($extension0);

$code_retour = "";

if($_FILES["file"]["size"] > $maxsize && $maxsize != 0) {
	$code_retour = "0";
	$alerte = str_replace("{size_file}",$_FILES["file"]["size"],$message_erreur_maxsize);
	$alerte = str_replace("{max_size_file}",$maxsize,$alerte);	
	$message_retour = $alerte;
}
if(!in_array($extension, $acceptTypes) && $acceptTypes != "*" && $code_retour == "") {
	$code_retour = "0";
	$alerte = str_replace("{accept_type_file}",$acceptTypes0,$message_erreur_type);
	$alerte = str_replace("{type_file}",$extension,$alerte);
	$message_retour = $alerte;
	
}
if($_FILES["file"]["error"] > 0 && $code_retour == "") {
	$code_retour = "0";
	$message_retour = $_FILES["file"]["error"];
}
if($code_retour == "") {
	if($forcenom != "") {
		$nom_fichier = $forcenom;
	}
	else {
		$nom_fichier = $_FILES["file"]["name"];
	}
	
	if((file_exists($destup . $nom_fichier) && $remplace == "false" && $forcenom == "")) {
		$code_retour = "0";
		$alerte = str_replace("{name_file}",$nom_fichier,$message_erreur_already);
		$message_retour = $alerte;
	}
	else {
		move_uploaded_file($_FILES["file"]["tmp_name"],$destup . $nom_fichier);
		$code_retour = "1";
		$message_retour = $nom_fichier;
	}
}

$retour = array();
$retour["code"] = $code_retour;
$retour["message"] = $message_retour;

echo json_encode($retour);

?>