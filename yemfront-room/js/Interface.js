if(typeof YEM == 'undefined') YEM = {};


YEM.Interface = new Object();

YEM.Interface.ShowTemplate = function(jsonobj, template){
		alert("#template_"+template);
		var templ = $("#template_"+template).html();

    	var html = Mustache.to_html(templ, jsonobj);
    	$('#screen').remove;
   		$('#screen').html(html);
}

