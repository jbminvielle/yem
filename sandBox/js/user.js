if(typeof YEM == 'undefined') YEM = {};

YEM.User= function() {

	this.ID;
	this.name;
	this.surname;
	this.questionsAnswered = [];
	this.states = [];
}

YEM.User.prototype.getAnswer = function(){
	$("#reponse").change(function(){
		this.answer = $("#reponse").value;
	});
}

YEM.User.prototype.setName = function(name) {
	this.name = name.charAt(0).toUpperCase() + name.slice(1); //capitalise
}

YEM.User.prototype.setId = function(id) {
	this.id = id;
}