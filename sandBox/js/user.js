function User() {

	this.currentID;
	this.currentName;
	this.humeur;
	this.answer;

}




User.getAnswer = function(){
	$("#reponse").change(function(){
		this.answer = $("#reponse").value;
	});
	
}
