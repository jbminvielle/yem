var Interface = new Object();




Interface.playS = function(){

};










Interface.ShowTemplate = function(jsonobj, template){
		// $("body").children("div").remove();
		// var output = Mustache.render(Webservice.getTemplate= function(templatenb), jsonobj);
		// $("body").append(output);

		var templ = $("#template").html();
    	var html = Mustache.to_html(templ, jsonobj);
    	$('#screen').remove;
   		$('#screen').html(html);
}

