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

			alert(audioAnswer);

			// for each possible answers
			for(i in self.customer.questionsAnswered[self.customer.activeQuestion].answers) {
				var r = self.customer.questionsAnswered[self.customer.activeQuestion].answers[i];

				// Test 1 : if *equal* to answer
				if(audioAnswer == r.content) {
					answerAnswered = r;
					alert('match '+r.content);
					break;
				}
				// Test 2 : test distance :
				var dist = damerauLevenshteinDistance(audioAnswer,r.content)


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


	};

// alias
var self = YEM.Main;

YEM.Main.launch();


function damerauLevenshteinDistance(source, target) {
  if (!source || source.length === 0)
    if (!target || target.length === 0)
      return 0;
    else
      return target.length;
  else if (!target)
    return source.length;
      
  var sourceLength = source.length;
  var targetLength = target.length;
  var score = [];

  var INF = sourceLength + targetLength;
  score[0] = [INF];
  for (var i=0 ; i <= sourceLength ; i++) { score[i + 1] = []; score[i + 1][1] = i; score[i + 1][0] = INF; }
  for (var i=0 ; i <= targetLength ; i++) { score[1][i + 1] = i; score[0][i + 1] = INF; }

  var sd = {};
  var combinedStrings = source + target;
  var combinedStringsLength = combinedStrings.length;
  for(var i=0 ; i < combinedStringsLength ; i++) {
    var letter = combinedStrings[i];
    if (!sd.hasOwnProperty(letter))
      sd[letter] = 0;
  }

  for (var i=1 ; i <= sourceLength ; i++) {
    var DB = 0;
    for (var j=1 ; j <= targetLength ; j++) {
      var i1 = sd[target[j - 1]];
      var j1 = DB;

      if (source[i - 1] == target[j - 1]) {
        score[i + 1][j + 1] = score[i][j];
        DB = j;
      }
      else 
        score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;
        
      score[i + 1][j + 1] = Math.min(score[i + 1][j + 1], score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1));
    }
    sd[source[i - 1]] = i;
  }
  return score[sourceLength + 1][targetLength + 1];
}


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