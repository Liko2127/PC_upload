PC_upload
=========

Jquery plugin : Upload HTML5

Plugin simple permettant l'upload d'un fichier en HTML5 avec progression de l'upload.

Inclu script serveur en PHP.

OPTIONS :

acceptTypes: ["pdf","jpg","png"], // extensions acceptées - ["*"] pour accepter tous les types de fichier, ["pdf","jpg,"gif,...] pour définir les extensions souhaitées - défaut ["*"]
		
url: "./upload.php", // chemin vers le script serveur - défaut "./upload.php"
		
forcenom: "", // saisir le nom du fichier sauvegardé sur le serveur (pour remplacer un existant par exemple) - nom avec l'extension (ex : "fichier.pdf") - Si renseigné et qu'un fichier porte le même nom sur le serveur il sera remplacé
		
remplace: false, // permet definir le comportement en cas de fichier déjà existant sur le serveur (true - écrasera un fichier existant avec le même nom que celui envoyé) - inutile si forcenom est définit.
		
destup: "./files/", // chemin d'upload relatif par rapport au script serveur (ou absolut "/var/www/upload/")
		
maxsize: 20971520, // poid maximum d'un fichier en octet - 0 pour illimité - 20971520 = 20Mo
		
data: {
	// Possibilité d'ajouter les variables de son choix, elle seront envoyées en POST au script serveur
	// var1: valeur1,
	// var2: valeur2,
	// ...
}, // variables envoyées en POST au script serveur

onstart: function() {}, // this représente l'objet définit

onprogress: function(retour) {}, // this représente l'objet définit, retour est un objet - retour.pourcentage : pourcentage de progression (int) - retour.envoyees : octets envoyées (int) - retour.total : taille totale du fichier en octet (int)
		
onend: function(retour) {}, // this représente l'objet définit, retour est un objet json - retour.code : 0(erreur), 1 (succès) - retour.message : texte de retour
		
message_erreur_type: "", // message d'erreur en cas de type de fichier non accepté - "{type_file}" sera remplacé par le type du fichier, "{accept_type_file}" sera remplacé par le(s) type(s) accepté(s)
	
message_erreur_maxsize: "", // message d'erreur en cas de fichier trop lourd - "{max_size_file}" sera remplacé par la taille maximum définie (maxsize), "{size_file}" sera remplacé par la taille du fichier en octets
		
message_erreur_already: "" // message d'erreur en cas d'existance d'un fichier du même nom du le serveur (si remplace est à false et forcenom non défini) - ({name_file} sera remplacé par le nom du fichier envoyé
