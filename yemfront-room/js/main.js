//var i=2;
const WAITINGTIME = 3*1000;
const FULLWAITINGTIME = 10*1000;

const friendly = {
	'Starter': 'Entrée',
	'Main': 'Plat principal',
	'Dessert': 'Dessert'
}

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
				


			YEM.Interface.ShowTemplate(null, 'veille', self.showNameScreen);
			YEM.Feelanimations.init();
		},

		// slide 1 : démarrage

		showNameScreen: function() {

			$('#start').click(function() { //ou autre évènement qui lance le process
				var templcallback = function(){
					YEM.Feelanimations.resetAnim();

					self.customer = new YEM.User();


					YEM.Cyril.listenTo('surname', self.saveNameAndGoFurther);
					window.setTimeout(function(){
						$('#instruction').toggleClass("fadein");
						window.setTimeout(function(){
							$('#instructionPrenom').toggleClass("fadein");
						}, 1000)
					}, 500)
				};


				YEM.Interface.ShowTemplate(null, 'demarrage',templcallback);

				//on crée un utilisateur pour stocker ses infos

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
			//launch kinect webservice
			YEM.Interface.ShowTemplate({name: self.customer.name}, 'acquisition', YEM.Webservice.kinect('getState', YEM.Main.analyseKinectAnswer) );

			
			;
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

			YEM.Interface.ShowTemplate({'name': self.customer.name}, 'interpretation', setTimeout(function() {
					//todo change this when the part of scenario will be done
					self.openIntroduction();
				}, FULLWAITINGTIME)
			);
			
		},

		//slide 4 : Introduction
		openIntroduction: function(data) {
			YEM.Interface.ShowTemplate(data, 'transition_introduction');
		},

		//slide 5 : Questionnaire

		openQuestionForm: function(firstQuestions) {
			if(!firstQuestions) firstQuestions = YEM.Webservice.server('getInitialQuestion', {'user_id': self.customer.id}, YEM.Main.checkNewQuestion);
			else YEM.Main.openIntepretation(firstQuestions);
		},


		checkNewQuestion: function(servQuestion) {
			//save it into user !
			var question = {'name': servQuestion.question_content, 'id': servQuestion.question_id, 'answers': servQuestion.answers};
			self.customer.questionsAnswered[question.id] = question;
			self.customer.questionsAnsweredIds.push(question.id);
			self.customer.activeQuestion = question.id;

			//render it

			YEM.Interface.ShowTemplate({'id': question.id, 'question': question.name, 'name': self.customer.name, 'answers': question.answers}, 'questionnaire', YEM.Cyril.listenTo(null, self.analyseAudioAnswer) );

			//listen to answer :
			
		},
		analyseAudioAnswer: function(audioAnswer) {
			var answerAnswered = null;
			var distances = {}; // the smaller the better;

			//log what we heard, for the lulz :
			console.log(audioAnswer);

			var double_metaphone_audio = double_metaphone(audioAnswer);
			if(double_metaphone_audio.secondary == null) double_metaphone_audio.secondary =  double_metaphone_audio.primary;
			console.log(double_metaphone_audio);

			// for each possible answers
			for(i in self.customer.questionsAnswered[self.customer.activeQuestion].answers) {
				var r = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];
				console.log(double_metaphone( r.content));
				// Test 1 : if *equal* to answer
				if(audioAnswer == r.content) {
					answerAnswered = r;
					break;
				}
				// Test 2 : tests distance :
				//normal
				var d1 = YEM.Cyril.damerauLevenshteinDistance(audioAnswer,r.content)
				//double_metaphone
				var metaphone_r = double_metaphone(r.content);
				if(metaphone_r.secondary == null) metaphone_r.secondary = metaphone_r.primary;
				var d2 = YEM.Cyril.damerauLevenshteinDistance(double_metaphone_audio.primary,double_metaphone(r.content).primary)
				//double_metaphone_second
				var d3 = YEM.Cyril.damerauLevenshteinDistance(double_metaphone_audio.secondary,double_metaphone(r.content).secondary)
				//moyenne 
				distances[r.id] = (d1+d2+d3)/3;
			}
			//to understand if it failed :
			console.log(distances);
			if(distances != [] && answerAnswered === null) {
				var sortable = [];
				for (var distance in distances) sortable.push([distance, distances[distance]])
				sortable.sort(function(a, b) {return a[1] - b[1]});

				//look for this answer :
				for (i in self.customer.questionsAnswered[self.customer.activeQuestion].answers)
					if(sortable[0][0] == self.customer.questionsAnswered[self.customer.activeQuestion].answers[i].id) {
						answerAnswered = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];

						break;
					}
			}
			//what we keeped :
			console.log(answerAnswered);
			
			//show visually the answer which have been chosen
			$('.encadrementQuestion:not([data-id='+answerAnswered.id+'])').animate({'opacity': .3}, 400);

			//send this response
			YEM.Webservice.server('sendAnswer', {'user_id': self.customer.id,
												'question_id': self.customer.activeQuestion,
												'answer_id':  answerAnswered.id,
												'questionsAlreadyAsked': self.customer.questionsAnsweredIds}, function(data) {
													setTimeout(function() {
														self.analyseResponseFromSendAnswser(data);
													}, WAITINGTIME);
												});
		},

		analyseResponseFromSendAnswser: function(data){
			if(data.status=="newQuestion") self.checkNewQuestion(data);
			else //data = end
				self.showResults(data.meats);
			if(data.animation!=[]) self.renderAnimations(data);
		},

		renderAnimations: function(data) {
			var animations = [];
			for(i in data.feelings) {
				animations.push(data.feelings[i].animation);
			}
			//not ready
			//YEM.Feelanimations.render(animations);
		},


		// slide 6 : Résultat
		showResults: function(meats) {
			self.customer.proposedMeats = meats;
			self.customer.currentMeat = -1;
			self.customer.validatedMeats = [];
			self.customer.currentType = 'Starter';

			self.whileShowResults();
		},

		whileShowResults: function() {
			//we keep the 
			do {
				self.customer.currentMeat++;
			}
			while (self.customer.proposedMeats[self.customer.currentMeat].type != self.customer.currentType);

			self.customer.proposedMeats[self.customer.currentMeat].friendlyType = window.friendly[self.customer.currentType];
			
			YEM.Interface.ShowTemplate(self.customer.proposedMeats[self.customer.currentMeat] , 'resultat');
			YEM.Cyril.listenTo(null, self.analyseMeatAnswer);
		},

		analyseMeatAnswer: function(audioAnswer) {
				var yes = YEM.Cyril.damerauLevenshteinDistance(audioAnswer, 'oui');
				var no 	= YEM.Cyril.damerauLevenshteinDistance(audioAnswer, 'non');

				if(no>yes) {
					self.customer.validatedMeats[self.customer.currentType] = self.customer.proposedMeats[self.customer.currentMeat];
					self.saveMeat();
				}
				else self.whileShowResults();

			},

		saveMeat: function () {
			YEM.Webservice.server('orderMeats', {'user_id': self.customer.id, 'meat_id': self.customer.validatedMeats[self.customer.currentType].id}, YEM.Main.goNextMeatResult);
		},

		goNextMeatResult: function() {
			//we have 
			if(self.customer.currentType == 'Starter') self.customer.currentType = 'Main';
			else if (self.customer.currentType == 'Main')  self.customer.currentType = 'Dessert';
			else if(self.customer.currentType == 'Dessert') {
				return self.showRecap();
			}

			//if it was not dessert, reset counter and relaunch screens
			self.customer.currentMeat = -1;
			self.whileShowResults();
		},

		// slide 7 : Menu
		showRecap: function () {
			YEM.Interface.ShowTemplate({starter: self.customer.validatedMeats.Starter.name,
										main: self.customer.validatedMeats.Main.name,
										dessert: self.customer.validatedMeats.Dessert.name}, 'fin');
		}

	};

// alias
var self = YEM.Main;

YEM.Main.launch();
