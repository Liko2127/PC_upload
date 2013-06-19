////////////////////////////////////////////
//              PC_upload v1              //
////////////////////////////////////////////

// Documentation :
// https://github.com/Liko2127/PC_upload/


(function($) {
	$.fn.PC_upload = function(params) {		
		var celui = this;
		
		var PCUid = $("*[data-PCUid]").length + 1;
		$(this).attr("data-PCUid",PCUid);
		
		params = $.extend({
			progress_barre: null,
			progress_pourcentage: null,
			url: "./upload.php",
			forcenom: "",
			remplace: false,
			destup: "",
			maxsize: 0,
			data: null,
			acceptTypes : "*",
			onstart: function() {
				var celui = this;
				$(this).parent(".PC_upload_btn_browse").fadeOut(500);
				$(this).fadeOut(500);
				if(params.progress_barre != null) {
					setTimeout(function() {
						$(params.progress_barre).fadeIn();
					}, 500);
				}
				if(params.progress_pourcentage != null) {
					setTimeout(function() {
						$(params.progress_pourcentage).fadeIn();
					}, 500);
				}
			},
			onend: function(retour) {
				var celui = this;
				var code = retour.code;
				var message = retour.message;
				if(code == 0) {
					alert(message);
				}
				setTimeout(function() {
					if(params.progress_barre != null) {
						$(params.progress_barre).fadeOut(500);
					}
					if(params.progress_pourcentage != null) {
						$(params.progress_pourcentage).fadeOut(500);
					}
					setTimeout(function() {
						$(celui).parent(".PC_upload_btn_browse").fadeIn();	
						$(celui).fadeIn();	
					}, 500);
				}, 1000);
			},
			message_erreur_type: "Ce type de fichier n'est pas accepté. Type du fichier {type_file} - types acceptés {accept_type_file}",
			message_erreur_maxsize: "La taille du fichier trop importante ({size_file}, maximum: {max_size_file})",
			message_erreur_already: "Le fichier ({name_file} existe déjà)"
		}, params);
		
		if(params.progress_barre != null) {
			if($(params.progress_barre+" .PC_upload_bar").length == 0) {
				$(params.progress_barre).prepend("<div class='PC_upload_bar'></div>");
			}
		}
		
		this.on("change",function() {
			var file = this.files[0];
			
			if(params.acceptTypes != "*") {
				var filename = file.name;
				var parts = filename.split(".");
        		var extension_fichier = parts[(parts.length-1)];
				if($.inArray(extension_fichier, params.acceptTypes)<0) {
					var alerte = params.message_erreur_type;
					alerte = alerte.replace("{type_file}",extension_fichier);
					alerte = alerte.replace("{accept_type_file}",params.acceptTypes);
					alert(alerte);
					$(celui).val("");
					return false;
				}
			}
			if(params.maxsize > 0 && typeof FileReader !== "undefined") {
				var size = file.size;
				if(size > params.maxsize) {
					var alerte = params.message_erreur_maxsize
					alerte = alerte.replace("{size_file}",size);
					alerte = alerte.replace("{max_size_file}",params.maxsize);					
					alert(alerte);
					$(celui).val("");
					return false;
				}
			}
			
			params.onstart.call(celui);
			
			var xhr = new XMLHttpRequest();
						 
			xhr.open('POST', params.url);
			
			xhr.upload.addEventListener("progress", function(e) {
				var loaded = Math.round((e.loaded / e.total) * 100); // on calcul le pourcentage de progression
				if(params.progress_barre != null) {
					$(params.progress_barre).find('.PC_upload_bar').css("width", loaded+"%");
				}
				if(params.progress_pourcentage != null) {
					$(params.progress_pourcentage).html(loaded+"%");
				}
			});
			xhr.onload = function(){
				if(params.progress_barre != null) {
					$(params.progress_barre).find('.PC_upload_bar').css("width", "100%");
				}
				$(celui).val("");
				var retour = this.responseText;
				retour = $.parseJSON(retour);
				if(typeof params.onend == 'function') {
					var callback = params.onend;
					callback.call(celui,retour);
				}
			}
						 
			var form = new FormData();
			form.append('file', file);
				
			form.append('acceptTypes', params.acceptTypes);
			form.append('forcenom', params.forcenom);
			form.append('remplace', params.remplace);
			form.append('destup', params.destup);
			form.append('maxsize', params.maxsize);
			
			form.append('message_erreur_type', params.message_erreur_type);
			form.append('message_erreur_maxsize', params.message_erreur_maxsize);
			form.append('message_erreur_already', params.message_erreur_already);
			
			for(i in params.data) {
				form.append(i, params.data[i]);
			}
		 
			xhr.send(form);
		});
	}
})(jQuery);