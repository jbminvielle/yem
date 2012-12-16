var user = new User();
var i=2;


$("#reponse").change(function(){
  user.humeur = Webservice.kinect();
  Interface.ShowTemplate(user, scan);
  while(i!="last"){

  	Interface.ShowTemplate(i, question);
  	var answer = user.getAnswer();
  	i = Webservice.nextQuestion(answer);

  }


});

Interface.ShowTemplate(null, 'waiter');

onclick { //ou autre évènement qui lance le process

	// étape 1
	Interface.ShowTemplate(null, 'bonjour');

	//on crée un utilisateur pour stocker ses infos
	var currentUser = new User(prénom);


	// étape 2
	Interface.playStreaming();

	// on dit à l’interface de lire le flux vidéo de la kinect
	currentUser.humeur = Webservice.kinect(‘launchAcquisition’);

	// on récupère ce que pond l’algo de la kinect comme humeur
	// simplifié hein (obligatoirement synchrone si on fait ça)

	var reactionServerToUser = [];

	var i = 0;

	reactionServerToUser[0] = Webservice.server(‘saveHumeur’, {‘humeur’: currentUser.humeur});

	Interface.stopStreaming();

	//étape 3 : un boucle qui s’execute au moins une fois

	Do {

	var servResp = reactionServerToUser[i];

	//styliser l’écran avec reactionServerToHumeur.style ?

	Interface.template(‘titre’, servResp.title);

	Interface.template(‘question’, servResp.question);

	{...}

	// normalement un bon moteur de template on devrait pouvoir

	// faire “Interface.template(servResp);”

	//get reponse text with speak I/O

	currentUser.reponse[i] = Cyril.listen();

	//on envoie la réponse du user et on stocke la réponse du

	//serv dans la prochaine reactionServerToUser

	var nextRéponseServ = Webservice.server(‘saveQuestion’, {‘réponse’: currentUser.reponse[i], ‘noRéponse’: i});

	reactionServerToUser[i+1] = nextRéponseServ.status;

	i++;

	} while (nextRéponseServ.status == ‘newQuestion’)

	//étape 4

	var lastReactionServer = reactionServerToUser[i];

	Interface.showVideo(lastReactionServer.video);

	Interface.showMeats(lastReactionServer.meats);

	Interface.meat.onClick(function() {

		Webservice.server(‘confirmMeat’, {meat: this.id});

		Interface.showScreen(‘merci’);

	});

}