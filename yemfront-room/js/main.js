//var i=2;
const WAITINGTIME = 3*1000;
const ACQUISITIONTIME = 6*1000;

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

		// slide 0 : écran de veille

		launch: function() {
			YEM.Interface.ShowTemplate(null, 'veille');
			self.showNameScreen();

			//dev
			// self.customer = new YEM.User();
			// self.customer.name = 'jbé';
			// self.customer.id =  10;
			// self.openQuestionForm(null);

		},

		// slide 1 : démarrage

		showNameScreen: function() {

			$('#start').click(function() { //ou autre évènement qui lance le process

				YEM.Interface.ShowTemplate(null, 'demarrage');

				//on crée un utilisateur pour stocker ses infos
				self.customer = new YEM.User();
				
				YEM.Cyril.listenTo('surname', self.saveNameAndGoFurther);
			});
		},

		saveNameAndGoFurther: function(name) {
			$('#phrasePrenom>span').hide();
			$('#phrasePrenom>input').show();
			self.customer.name = name;
			YEM.Webservice.server('createUser', {'name': name}, YEM.User.prototype.setId.bind(YEM.Main.customer));
			//prototype.x.bind : see http://joshuakehn.com/2011/10/20/Understanding-JavaScript-Context.html
			//for little explaination
			setTimeout(function() {
				//todo change this when the part of scenario will be done
				self.openQuestionForm();
			}, WAITINGTIME);
			
		},

		// slide 2 : acquisition

		launchKinectAcquisition: function() {
			YEM.Interface.ShowTemplate({name: self.customer.name}, 'acquisition');

			//launch kinect webservice
			YEM.Webservice.kinect('getState', YEM.Main.analyseKinectAnswer);
		},

		analyseKinectAnswer: function(data) {
			//send to serv !
			YEM.Webservice.server('sendAnswer', {'user_id': self.customer.id}, function(data) {
				setTimeout(function() {
					//todo change this when the part of scenario will be done
					self.openIntepretation(data);
				}, WAITINGTIME);
			});
		},
		//slide 3 : Interpretation

		openIntepretation: function(data) {
			YEM.Interface.ShowTemplate({'name': self.customer.name}, 'interpretation');
			setTimeout(function() {
					//todo change this when the part of scenario will be done
					self.openIntepretation();
				}, WAITINGTIME);
		},

		//slide 4 : Introduction
		//slide 5 : Questionnaire

		openQuestionForm: function(firstQuestions) {
			if(!firstQuestions) firstQuestions = YEM.Webservice.server('getInitialQuestion', {'user_id': self.customer.id}, YEM.Main.checkNewQuestion);
			else YEM.Main.openIntepretation(firstQuestions);
		},


		checkNewQuestion: function(servQuestion) {
			//save it into user !
			var question = {'name': servQuestion.question_content, 'id': servQuestion.question_id, 'answers': servQuestion.answers};
			self.customer.questionsAnswered[question.id] = question;
			self.customer.activeQuestion = question.id;

			//render it
			YEM.Interface.ShowTemplate({'id': question.id, 'question': question.name, 'name': self.customer.name, 'answers': question.answers}, 'question');

			//listen to answer :
			YEM.Cyril.listenTo(null, self.analyseAudioAnswer);
		},
		analyseAudioAnswer: function(audioAnswer) {
			var answerAnswered;
			var distances; // the smaller the better;

			// for each possible answers
			for(i in self.customer.questionsAnswered[self.customer.activeQuestion].answers) {
				var r = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];

				// Test 1 : if *equal* to answer
				if(audioAnswer == r.content) {
					answerAnswered = r;
					break;
				}
				// Test 2 : test distance :
				var dist = YEM.Cyril.damerauLevenshteinDistance(audioAnswer,r.content)


				//var wordsAudio = audioAnswer.split(' ');


				//for each word in Audio 
				// for (i in wordsAudio) {
				// 	//if in anwser waited :
				// 	if (r.content.indexOf(wordsAudio[i])) {
				// 		answerAnswered = r;
				// 		alert('mach in '+audioAnswer);
				// 		break;
				// 	}
				// }
				// if(answerAnswered != null) break;

			}

			if(answerAnswered != null) alert(JSON.stringify(answerAnswered));
		}


		//slide 6 : Résultat
		//slide 7 : Menu


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