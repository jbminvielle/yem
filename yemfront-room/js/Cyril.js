if(typeof YEM == 'undefined') YEM = {};

YEM.Cyril = new Object();

YEM.Cyril.currentTagId = null;
YEM.Cyril.currentCallback = null;
YEM.Cyril.listeningEl = null;


YEM.Cyril.listenTo = function(tagId, callback){
	if(tagId) YEM.Cyril.currentTagId = tagId; else  YEM.Cyril.currentTagId = null;

	YEM.Cyril.currentCallback = callback;

	// 1) create a hidden listen element

	YEM.Cyril.listeningEl = document.createElement("input");
	YEM.Cyril.listeningEl.setAttribute('type', 'text');
	YEM.Cyril.listeningEl.setAttribute('id', 'speechRecognition');
	YEM.Cyril.listeningEl.setAttribute('x-webkit-speech');
	document.body.appendChild(YEM.Cyril.listeningEl);

	// 1.5) Clinking on the mic
	//document.getElementById("speechRecognition").focus();

	//simulateClick(1,1);

	// 2) listening the onchange
	YEM.Cyril.listeningEl.setAttribute('onwebkitspeechchange', 'YEM.Cyril.SpeechChanged()');
}

YEM.Cyril.SpeechChanged = function() {
	var answer = YEM.Cyril.listeningEl.value;
	answer = answer.charAt(0).toUpperCase() + answer.slice(1);

	// 3) Writing in the good tag and delete created one
	if(YEM.Cyril.currentTagId != null)
		document.getElementById('speech_'+YEM.Cyril.currentTagId).value = answer;
	YEM.Cyril.listeningEl.parentNode.removeChild(YEM.Cyril.listeningEl);
	YEM.Cyril.currentCallback(answer);
}


function simulateClick(x, y) {

    var el = document.createElement("div");
	el.setAttribute('id', 'ghostClick');
	document.body.appendChild(el);

    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0,
        false, false, false, false, 0, null);

    el.dispatchEvent(evt);
}

// HTMLElement.prototype.click = function() {
// var evt = this.ownerDocument.createEvent('MouseEvents');
// evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
// this.dispatchEvent(evt);
// }
// }
