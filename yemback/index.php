<?php
	
	/*
	TODOLIST
	Webservices à développer :
	
	Depuis kitchen-side
	Pour contacter un webservice s'adresser à yemback/webservice.php
	avec un premier paramètre "type" qui contient le nom du webervice
	Si le retour est un objet/tableau il est sérialisé en json
	Ci dessous la liste des sebservices :

	1) "createUser"
		Params 	: [ STRING name]
		Returns	: INT userId

	2) "getInitialQuestion" 
		Params	: [INT user_id]
		Returns : {
					STRING status = "newQuestion",
					STRING question_content,
					INT question_id,
					ARRAY answers = [{INT id, STRING content}, {...}, ...],
				  }

	2) "sendAnswer"
		Params	: [
					INT user_id,
					INT question_id,
					INT answer_id,
					ARRAY questions_already_asked = [ id, id, ... ]
				  ]
		Return1	: { 
					STRING status = "newQuestion",
					STRING question_content,
					INT question_id,
					ARRAY answers = [{INT id, STRING content}, {...}, ...],
					ARRAY feelings = [{ INT id, STRING name, OBJECT animation}, {...}, ...] 
				  }
		Return2	: { 
					STRING status = "end",
					ARRAY meats = [{INT id, STRING name, STRING description, STRING price, STRING picture}, {...}, ...],
					ARRAY feelings = [{ INT id, STRING name, OBJECT animation}, {...}, ...] 
				  }

	3) "orderMeats"
		Params 	: [INT user_id, INT meat_id]
		Returns : BOOL sucess
		

	*/

?>