//sleep

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}




//Namespace YEM
if(typeof YEM == 'undefined') YEM = {};

/* --------------------

Interface is the module which touch the DOM.
Interface is mainly the interface with the templater Mustache

----------------------- */

YEM.Interface = new Object();

YEM.Interface.ShowTemplate = function(jsonobj, template, templcallback){

		var templ = $("#template_"+template).html();

    	var html = Mustache.to_html(templ, jsonobj);

    	$('#screen').toggleClass("fadeout");
    	
		window.setTimeout(function(){
			$('#screen').html(html);
			$('#screen').toggleClass("fadeout");
			$('#screen').toggleClass("fadein");
			window.setTimeout(function(){
				$('#screen').toggleClass("fadein");
				if(templcallback) templcallback();
			}, 500)
		}, 500)
}

