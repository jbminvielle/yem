if(typeof YEM == 'undefined') YEM = {};

YEM.User= function() {

	this.ID;
	this.name;
	this.surname;
	this.questionsAnswered;
	this.answers;
	this.states;
}




YEM.User.getAnswer = function(){
	$("#reponse").change(function(){
		this.answer = $("#reponse").value;
	});
	
}
