if(typeof YEM == 'undefined') YEM = {};

YEM.Cyril = new Object();

YEM.Cyril.listenTo = function(tagId, callback){
	// 1) create a hidden listen element

	var listeningEl = document.createElement("input");
	listeningEl.setAttribute('type', 'text');
	listeningEl.setAttribute('id', 'speechRecognition');
	listeningEl.setAttribute('x-webkit-speech');
	document.body.appendChild(listeningEl);

	// 2) listening the onchange
	$('#speechRecognition').change(function(){
		var answer = document.getElementById("speechRecognition").value;

		// 3) Writing in the good tag and delete created one
		document.getElementById('speech_'+tagId);
		listeningEl.parentNode.removeChild(listeningEl);
		callback(answer);
	});
}
