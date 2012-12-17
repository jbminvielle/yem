if(typeof YEM == 'undefined') YEM = {};


YEM.Interface = new Object();

YEM.Interface.ShowTemplate = function(jsonobj, template){

		var templ = $("#"+template).html();
		alert(JSON.stringify(jsonobj));
    	var html = Mustache.to_html(templ, jsonobj);
    	$('#screen').remove;
   		$('#screen').html(html);
}

