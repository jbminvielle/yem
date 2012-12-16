if(typeof YEM == 'undefined') YEM = {};

YEM.Cyril = new Object();

YEM.Cyril.currentTagId = null;
YEM.Cyril.currentCallback = null;
YEM.Cyril.listeningEl = null;


YEM.Cyril.listenTo = function(tagId, callback){
	YEM.Cyril.currentTagId = tagId;
	YEM.Cyril.currentCallback = callback;

	// 1) create a hidden listen element

	YEM.Cyril.listeningEl = document.createElement("input");
	YEM.Cyril.listeningEl.setAttribute('type', 'text');
	YEM.Cyril.listeningEl.setAttribute('id', 'speechRecognition');
	YEM.Cyril.listeningEl.setAttribute('x-webkit-speech');
	document.body.appendChild(YEM.Cyril.listeningEl);

	// 1.5) Clinking on the mic
	document.getElementById("speechRecognition").focus();

	// 2) listening the onchange
	YEM.Cyril.listeningEl.setAttribute('onwebkitspeechchange', 'YEM.Cyril.SpeechChange()');
}

YEM.Cyril.SpeechChange = function() {
	var answer = document.getElementById("speechRecognition").value;
	
	// 3) Writing in the good tag and delete created one
	document.getElementById('speech_'+YEM.Cyril.currentTagId).value = answer;
	YEM.Cyril.listeningEl.parentNode.removeChild(YEM.Cyril.listeningEl);
	YEM.Cyril.currentCallback(answer);
}