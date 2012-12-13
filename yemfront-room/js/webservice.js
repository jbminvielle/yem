var Webservice = new Object();

Webservice.getTemplate = function(template){
							 
		$.ajax({ 
		   url: "bdd.php",
		   data: { value : template }
		   success: function(mov){
		   		result = mov;
		   }
		});
		return result; 
	});



};

Webservice.getPlate = function(type){
							 
		$.ajax({ 
		   url: "bdd.php",
		   data: { value : type }
		   success: function(mov){
		   		result = mov;
		   }
		});
		return result; 
	});



};
