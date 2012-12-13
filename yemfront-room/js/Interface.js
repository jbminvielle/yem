var Interface = new Object();




Interface.playS = function(){

};










Interface.ShowTemplate = function(jsonobj, templatenb){
		$("body").children("div").remove();
		var output = Mustache.render(Webservice.get= function("template", templatenb), jsonobj);
		$("body").append(output);
}

