var user = new User();
var i=2;


$("#reponse").change(function(){
  //user.humeur = Webservice.kinect();
  //Interface.ShowTemplate(user, scan);
  while(i!="last"){

  	Interface.ShowTemplate({nom : coucou, question: coucoucou}, question);
  	var answer = user.getAnswer();
  	i = Webservice.nextQuestion(answer);

  }


});

