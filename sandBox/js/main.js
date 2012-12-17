//var i=2;
const WAITINGTIME = 2*1000

// $("#reponse").change(function(){
//   //user.humeur = Webservice.kinect();
//   //Interface.ShowTemplate(user, scan);
//   while(i!="last"){

//   	Interface.ShowTemplate({nom : coucou, question: coucoucou}, question);
//   	var answer = user.getAnswer();
//   	i = Webservice.nextQuestion(answer);

//   }


// });

var YEM = YEM || {}; //Namespace

	// class beginning
	YEM.Main = {
		customer: null,

		launch: function() {
			//YEM.Interface.ShowTemplate(null, 'waiter');
			self.showNameScreen();

			//dev
			self.customer = new YEM.User();
			self.customer.name = 'jbé';
			self.customer.id =  10;
			self.openQuestionForm(null);

		},

		// étape 1

		showNameScreen: function() {

			$('body').ready(function() { //ou autre évènement qui lance le process
				// étape 1
				YEM.Interface.ShowTemplate(null, 'formNom');

				//on crée un utilisateur pour stocker ses infos
				self.customer = new YEM.User();
				
				YEM.Cyril.listenTo('surname', self.saveNameAndGoFurther);
				//customer.id = Webservice.server('createUser');
			});
		},

		saveNameAndGoFurther: function(name) {
			self.customer.name = name;
			YEM.Webservice.server('createUser', {'name': name}, YEM.User.prototype.setId.bind(YEM.Main.customer));
			//prototype.x.bind : see http://joshuakehn.com/2011/10/20/Understanding-JavaScript-Context.html
			//for little explaination
			setTimeout(function() {
				//todo change this when the part of scenario will be done
				self.openQuestionForm();
			}, WAITINGTIME);
			
		},

		//il manque des étapes ici

		openQuestionForm: function(firstQuestions) {
			if(!firstQuestions) firstQuestions = YEM.Webservice.server('getInitialQuestion', {'user_id': self.customer.id}, YEM.Main.checkNewQuestion);
			else YEM.Main.checkNewQuestion(firstQuestions);
		},

		checkNewQuestion: function(servQuestion) {
			//save it
			var question = {'name': servQuestion.question_name, 'id': servQuestion.question_id, 'answers': servQuestion.answers};
			self.customer.questionsAnswered.push(question);

			//render it
			alert(JSON.stringify(servQuestion));
			YEM.Interface.ShowTemplate({'id': question.id, 'question': question.name, 'name': self.customer.name}, 'question');
		}	

	};

// alias
var self = YEM.Main;

YEM.Main.launch();




// 	// étape 2
// 	Interface.playStreaming();

// 	// on dit à l'interface de lire le flux vidéo de la kinect
// 	currentUser.humeur = Webservice.kinect('launchAcquisition');

// 	// on récupère ce que pond l'algo de la kinect comme humeur
// 	// simplifié hein (obligatoirement synchrone si on fait ça)

// 	var reactionServerToUser = [];

// 	var i = 0;

// 	reactionServerToUser[0] = Webservice.server('saveHumeur', {'humeur': currentUser.humeur});

// 	Interface.stopStreaming();

// 	//étape 3 : un boucle qui s'execute au moins une fois

// 	Do {

// 	var servResp = reactionServerToUser[i];

// 	//styliser l'écran avec reactionServerToHumeur.style ?

// 	Interface.template('titre', servResp.title);

// 	Interface.template('question', servResp.question);

// 	{...}

// 	// normalement un bon moteur de template on devrait pouvoir

// 	// faire “Interface.template(servResp);”

// 	//get reponse text with speak I/O

// 	currentUser.reponse[i] = Cyril.listen();

// 	//on envoie la réponse du user et on stocke la réponse du

// 	//serv dans la prochaine reactionServerToUser

// 	var nextRéponseServ = Webservice.server('saveQuestion', {'réponse': currentUser.reponse[i], 'noRéponse': i});

// 	reactionServerToUser[i+1] = nextRéponseServ.status;

// 	i++;

// 	} while (nextRéponseServ.status == 'newQuestion')

// 	//étape 4

// 	var lastReactionServer = reactionServerToUser[i];

// 	Interface.showVideo(lastReactionServer.video);

// 	Interface.showMeats(lastReactionServer.meats);

// 	Interface.meat.onClick(function() {

// 		Webservice.server('confirmMeat', {meat: this.id});

// 		Interface.showScreen('merci');

// 	});

// }