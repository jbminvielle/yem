<?php

/*
	webservice.php
	Contains every webservices callable by client.
	Mostly call to BDD

	No Active Record available :( :( #verysad
	Not securised ! TODO securise it
*/

require("conf_sql.php");
define('NB_FEELINGS_REQUIRED', 6);
session_start();

$data = $_GET;
unset($data['service']); // GTFO webservice name !
 
//echo 'action_'.$_GET['service'].'(array('.implode(', ', $data).')';
if(!function_exists('action_'.$_GET['service']))  {
	header("HTTP/1.0 404 Not Found");
	echo '<h1>Error 404</h1><p>Webservice '.$_GET['service'].' not found.</p>';
}
else {
	$render = call_user_func('action_'.$_GET['service'], $data);
	if(is_array($render)) echo json_encode($render);
	else if($render !== false) echo $render;
	else { //error !
		header("HTTP/1.0 500");
		echo '<h1>Error 500</h1><p>Webservice '.$_GET['service'].' responded with an error.</p>';	
	}
}


// webservices functions :

function action_createUser($array) {
	//verify if every needed args are present :
	if(!isset($array['name'])) return false;

	openSQLBase();

	// Creates a user in data
	mysql_query('INSERT INTO yem_user (name) VALUES ("'.$array['name'].'")');

	// Returns the user ID
	$id = mysql_insert_id();

	mysql_close();

	if($id === 0) return false;
	else return $id;
}

function action_sendAnswer($request) {
	//verify if every needed args are present :
	if(!isset($request['user_id']) || !isset($request['question_id']) || !isset($request['answer_id'])) return false;

	openSQLBase();

	// Get states for this answer
	$sqlData = mysql_query('SELECT S.id FROM yem_state S, yem_answer A, yem_answer_informs_about_state I WHERE S.id=I.idState AND A.id=I.idAnswer AND A.id='.$request['answer_id']);
	$VALUES = '';
	$i = 1;
	while($r = mysql_fetch_assoc($sqlData)) {
		$VALUES .= '(';
		$VALUES .= $r['id'].','.$request['user_id'];

		$VALUES .= ')'; if($i < mysql_num_rows($sqlData)) $VALUES .= ',';
		$i++;
	}

	// Set user_has_state entry/ies for this state
	//note: (this INSERT INTO will not duplicate because the couple idState, idUser is a primary key)
	mysql_query('INSERT INTO yem_user_has_state (idState, idUser) VALUES '. $VALUES);
	//increment "importance" for this combinaison
	mysql_query('UPDATE yem_user_has_state SET importance = importance + 1');

	//get updated yem_user_has_state :
	$currentStates = array();
	$sqlData = mysql_query('SELECT idState FROM yem_user_has_state WHERE idUser='.$request['user_id']);
	while($r = mysql_fetch_assoc($sqlData)) {
		$currentStates[] = $r['idState'];
	}

	// Calculate feelings user must meet
	$currentCalculatedFeelings = calculateFeelings($request['user_id']);

	// Check if the user has enough feelings
	if(count($currentCalculatedFeelings)>=NB_FEELINGS_REQUIRED) {
		// If true, returns a status:end, feelings, animations associated and meats to show
		$result= array('status'=> 'end',
						'meats'=> getMeats($currentCalculatedFeelings),
						'feelings'=>$currentCalculatedFeelings
					);
	}

	else {
		// Else, returns a status:newQuestion, new Question to ask, feelings, animations associated.
		$qAndR = getNewQuestion($currentStates, $request['user_id']);
		$result= array('status'=> 'newQuestion',
						'question_content'=> $qAndR['question_content'],
						'question_id'=> $qAndR['question_id'],
						'answers'=>$qAndR['answers'],
						'feelings'=>$currentCalculatedFeelings
					);
	}

	return $result;
}

function action_orderMeats($request) {
	// Save in user_order_plate the meats
	// save stats for questions/feelings/plate : for one meat we will be able to know how user answered and feeld
}


//internal :

function calculateFeelings($userId) {

	$feelings = array();

	$sqlData = mysql_query('SELECT F.id, F.name, A.characteristics FROM yem_feeling F, yem_animation A, yem_user_has_state US, yem_state_needs_feeling SF WHERE US.idUser='.$userId.' AND US.idState=SF.idState AND F.id=SF.idFeeling AND F.idAnimation=A.id');
	while($r = mysql_fetch_assoc($sqlData)) {
		array_push($feelings, array(
			'id'=>$r['id'],
			'name'=>$r['name'],
			'animation'=>json_decode($r['characteristics'])));
	}
	return $feelings;

	/*
	$feelings = [
		{
			"id": x,
			"name": truc,
			"animation": { ordres d'animation }
		}
	]
	*/
}


function getMeats($feelings) {

	$meats = array();

	foreach ($feelings as $feeling) {
		$sqlData = mysql_query('SELECT M.id, M.name, M.description, M.picture, M.price FROM yem_meat M, yem_meat_gives_feeling MF WHERE M.id=MF.idMeat AND MF.idFeeling='.$feeling['id']);

		while($r = mysql_fetch_assoc($sqlData)) {
			array_push($meats, $r);
		}
		/*
		$meats = [
			{
				"id": x,
				"name": "truc",
				"price": "x€",
				"description": "lorem ipsum",
				"picture": "kikou.jpeg",
			}
		]
		*/
	}
	return $meats;
}

function getNewQuestion($states, $userId) {

	if(!isset($_SESSION['questionsAlreadyAsked'])) $_SESSION['questionsAlreadyAsked'] = array();
	if(!isset($_SESSION['questionsAlreadyAsked'][$userId])) $_SESSION['questionsAlreadyAsked'][$userId] = array();

	$result = array();

	if($states == array()) {
		
		//get first question in BDD
		$sqlData = mysql_query('SELECT Q.content, Q.id FROM yem_question Q LIMIT 1');
		while($r = mysql_fetch_assoc($sqlData)) {
			$result['question_id'] = $r['id'];
			$result['question_content'] = $r['content'];
		}
	}

	else {
		error_log(json_encode($states));

		//getting all possible questions
		$questions = array();
		foreach ($states as $state) {
			$sqlData = mysql_query('SELECT Q.content, Q.id FROM yem_state_leads_to_question SQ, yem_question Q WHERE Q.id = SQ.idQuestion AND SQ.idState='.$state);

			while($r = mysql_fetch_assoc($sqlData)) {
				error_log($r['id']);
				error_log('donne');
				error_log($r['content']);
				$questions[$r['id']] = $r['content'];
			}
		}
		error_log(json_encode($questions));

		//we count the number of iterations for each questions
		$countOfQuestions = array();
		foreach ($questions as $id=>$possibleQuestion) {
			if(!isset($countOfQuestions[$id])) $countOfQuestions[$id] = 1;
			else $countOfQuestions[$id]++;
		}

		//sorting by number of iterations
		error_log(json_encode($countOfQuestions));
		asort($countOfQuestions); // asort keep the associations with indexes (very important because we will get the question ID with this)
		error_log(json_encode($countOfQuestions));

		//get the object for the popular question
		reset($countOfQuestions);
		$goodId=key($countOfQuestions);
		$result = array('question_id'=>$goodId, 'question_content'=>$questions[$goodId]);
	}

	//now getting responses associated with the selected question
	$answers = array();
	$sqlData = mysql_query('SELECT id, content FROM yem_answer WHERE idQuestion='.$result['question_id']) or die(mysql_error());
	while($r = mysql_fetch_assoc($sqlData)) {
		$answers[] = array('id'=>$r['id'], 'content'=>$r['content']);
	}
	$result['answers'] = $answers;

	//saving that we'll ask this question in the serv session, to not ask it another time !
	array_push($_SESSION['questionsAlreadyAsked'][$userId], $result['question_id']);
	return $result;
}

?>