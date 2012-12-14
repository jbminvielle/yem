var user = new User();
var i=2;
user.currentID = 1335443;
user.currentName ='Joséphine Bobol';


$("#button").click(function() {
  user.humeur = Webservice.kinect();
  Interface.ShowTemplate(user, 1);
  while(i!="last"){

  	Interface.ShowTemplate(i, question);
  	var answer = user.getAnswer();
  	i = Webservice.nextQuestion(answer);




  }


});)

