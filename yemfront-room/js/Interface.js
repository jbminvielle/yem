//Namespace YEM
if(typeof YEM == 'undefined') YEM = {};

/* --------------------

Interface is the module which touch the DOM.
Interface is mainly the interface with the templater Mustache

----------------------- */

YEM.Interface = new Object();

YEM.Interface.ShowTemplate = function(jsonobj, template){
		var templ = $("#template_"+template).html();

    	var html = Mustache.to_html(templ, jsonobj);
    	$('#screen').remove;
   		$('#screen').html(html);
}

