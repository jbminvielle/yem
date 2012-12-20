//Namespace YEM
if(typeof YEM == 'undefined') YEM = {};

/* --------------------

Cyril (as Siri-like or Cyril Lignac) is the class managing the speecj recognition
(speech field creation, Damerau-Levenshtein distance algorythm)


----------------------- */


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

	// 2) listening the onchange and the onsubmit
	YEM.Cyril.listeningEl.setAttribute('onwebkitspeechchange', 'YEM.Cyril.speechChanged()');
	YEM.Cyril.listeningEl.setAttribute('onchange', 'YEM.Cyril.speechChanged()');
}

YEM.Cyril.speechChanged = function() {
	var answer = YEM.Cyril.listeningEl.value;
	answer = answer.charAt(0).toUpperCase() + answer.slice(1);

	// 3) Writing in the good tag and delete created one
	if(YEM.Cyril.currentTagId != null)
		document.getElementById('speech_'+YEM.Cyril.currentTagId).value = answer;
	YEM.Cyril.listeningEl.parentNode.removeChild(YEM.Cyril.listeningEl);
	YEM.Cyril.currentCallback(answer);
}

YEM.Cyril.damerauLevenshteinDistance = function(source, target) {
	if (!source || source.length === 0)
		if (!target || target.length === 0)
			return 0;
		else
			return target.length;
	else if (!target)
		return source.length;
			
	var sourceLength = source.length;
	var targetLength = target.length;
	var score = [];

	var INF = sourceLength + targetLength;
	score[0] = [INF];
	for (var i=0 ; i <= sourceLength ; i++) { score[i + 1] = []; score[i + 1][1] = i; score[i + 1][0] = INF; }
	for (var i=0 ; i <= targetLength ; i++) { score[1][i + 1] = i; score[0][i + 1] = INF; }

	var sd = {};
	var combinedStrings = source + target;
	var combinedStringsLength = combinedStrings.length;
	for(var i=0 ; i < combinedStringsLength ; i++) {
		var letter = combinedStrings[i];
		if (!sd.hasOwnProperty(letter))
			sd[letter] = 0;
	}

	for (var i=1 ; i <= sourceLength ; i++) {
		var DB = 0;
		for (var j=1 ; j <= targetLength ; j++) {
			var i1 = sd[target[j - 1]];
			var j1 = DB;

			if (source[i - 1] == target[j - 1]) {
				score[i + 1][j + 1] = score[i][j];
				DB = j;
			}
			else 
				score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;
				
			score[i + 1][j + 1] = Math.min(score[i + 1][j + 1], score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1));
		}
		sd[source[i - 1]] = i;
	}
	return score[sourceLength + 1][targetLength + 1];
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
