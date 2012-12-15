var User = new Object();

User.currentID ='';
User.currentName ='';
User.humeur = '';
User.answer ='';




User.getAnswer = function(){
	$("#reponse").change(function(){
		this.answer = $("#reponse").value;
	});
	
}
