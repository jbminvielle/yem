if(typeof YEM == 'undefined') YEM = {};

YEM.User= function() {

	this.ID;
	this.name;
	this.surname;
	this.questionsAnswered;
	this.answers;
	this.states;
}

YEM.User.prototype.getAnswer = function(){
	$("#reponse").change(function(){
		this.answer = $("#reponse").value;
	});
}

YEM.User.prototype.setId = function(id) {
	this.id = id;
}