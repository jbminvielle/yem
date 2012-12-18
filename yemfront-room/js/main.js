//var i=2;
const WAITINGTIME = 3*1000;
const FULLWAITINGTIME = 10*1000;

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



			//dev
			// self.customer = new YEM.User();
			// self.customer.name = 'jbé';
			// self.customer.id =  10;
			// self.openQuestionForm(null);
		},

		// slide 1 : démarrage

		showNameScreen: function() {

			$('#start').click(function() { //ou autre évènement qui lance le process
				var templcallback = function(){


					self.customer = new YEM.User();
					
					YEM.Cyril.listenTo('surname', self.saveNameAndGoFurther);
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

			// for each possible answers
			for(i in self.customer.questionsAnswered[self.customer.activeQuestion].answers) {
				var r = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];

				// Test 1 : if *equal* to answer
				if(audioAnswer == r.content) {
					answerAnswered = r;
					break;
				}
				// Test 2 : test distance :
				distances[r.id] = YEM.Cyril.damerauLevenshteinDistance(audioAnswer,r.content)

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
			//to understand if it failed :
			console.log(distances);
			if(distances != [] && answerAnswered === null) {
				var sortable = [];
				for (var distance in distances) sortable.push([distance, distances[distance]])
				sortable.sort(function(a, b) {return a[1] - b[1]});

				console.log(sortable)
				//look for this answer :
				for (i in self.customer.questionsAnswered[self.customer.activeQuestion].answers)
					if(sortable[0][0] == self.customer.questionsAnswered[self.customer.activeQuestion].answers[i].id) {
						answerAnswered = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];
						break;
					}
			}
			//what we keeped :
			console.log(answerAnswered);

			//send this response
			YEM.Webservice.server('sendAnswer', {'user_id': self.customer.id,
												'question_id': self.customer.activeQuestion,
												'answer_id':  answerAnswered.id,
												'questionsAlreadyAsked': self.customer.questionsAnsweredIds}, YEM.Main.analyseResponseFromSendAnswser);
		},

		analyseResponseFromSendAnswser: function(data){
			if(data.status=="newQuestion") self.checkNewQuestion(data);
			else //data = end
				console.log(data.meats);
		},


		// slide 6 : Résultat
		showResults: function(meats) {
			YEM.Interface.ShowTemplate(null, 'resultat');

			$('#slider_plat img').click(function() {
				self.saveMeat($(this).attr('data-id'));
			});
		},

		saveMeat: function () {
			YEM.Webservice.server('sendAnswer', {'user_id': self.customer.id}, YEM.Main.showRecap);
		}

		// slide 7 : Menu


	};

// alias
var self = YEM.Main;

YEM.Main.launch();
