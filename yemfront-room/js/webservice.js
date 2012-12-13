var Webservice = new Object();

Webservice.get= function(value1, id1){
							 
		$.ajax({ 
		   url: "bdd.php",
		   data: { value : value1, id : id1 }
		   success: function(mov){
		   		result = mov;
		   }
		});
		return result; 
	});
};

Webservice.kinect = function(){

		$.ajax({ 
		   url: "bdd.php",
		   data: { humeur : humeur }
		   success: function(mov){
		   		result = mov;
		   }
		});
		return result; 
	});

};

Webservice.nextTemplate= function( id1, answer1){
							 
		$.ajax({ 
		   url: "bdd.php",
		   data: { value : actualtemplate, id : id1, answer : answer1 }
		   success: function(mov){
		   		result = mov;
		   }
		});
		return result; 
	});
};

