<?php

/*
	webservice.php
	Contains every webservices callable by client.
	Mostly call to BDD

	No Active Record available :( :( #verysad
	Not securised ! TODO securise it
*/

require("conf_sql.php");
define('NB_FEELINGS_REQUIRED',6);

$data = $_REQUEST;
unset($data['service']); // GTFO webservice name !
 
//echo 'action_'.$_REQUEST['service'].'(array('.implode(', ', $data).')';
if(!function_exists('action_'.$_REQUEST['service']))  {
	header("HTTP/1.0 404 Not Found");
	echo '<h1>Error 404</h1><p>Webservice '.$_REQUEST['service'].' not found.</p>';
}
else {
	$render = call_user_func('action_'.$_REQUEST['service'], $data);
	if(is_array($render)) echo json_encode($render);
	else if($render !== false) echo $render;
	else { //error !
		header("HTTP/1.0 500");
		echo '<h1>Error 500</h1><p>Webservice '.$_REQUEST['service'].' responded with an error.</p>';	
	}
}


// webservices functions :

function action_createUser($array) {
	//verify if every needed args are present :
	if(!isset($array['name'])) return false;

	openSQLBase();

	// Creates a user in data
	mysql_query('INSERT INTO yem_user (name) VALUES ("'.utf8_decode($array['name']).'")');

	// Returns the user ID
	$id = mysql_insert_id();

	mysql_close();

	if($id === 0) return false;
	else return $id;
}

function action_getInitialQuestion($request) {
	//verify if every needed args are present :
	if(!isset($request['user_id'])) return false;

	openSQLBase();

	$qAndR = getNewQuestion(array(), $request['user_id'], array());
	$result= array('status'=> 'newQuestion',
				'question_content'=> $qAndR['question_content'],
				'question_id'=> $qAndR['question_id'],
				'answers'=>$qAndR['answers'],
			);

	return $result;
}

function action_sendAnswer($request) {
	//verify if every needed args are present :
	if(!isset($request['user_id']) || !isset($request['question_id']) || !isset($request['answer_id']) || !isset($request['questionsAlreadyAsked'])) return false;

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

	// Check if the user has not enough feelings
	if(count($currentCalculatedFeelings) < NB_FEELINGS_REQUIRED) {
		// If true, returns a status:newQuestion, new Question to ask, feelings, animations associated.
		$qAndR = getNewQuestion($currentStates, $request['user_id'], $request['questionsAlreadyAsked']);
		if($qAndR != false) {
			$result= array('status'=> 'newQuestion',
						'question_content'=> $qAndR['question_content'],
						'question_id'=> $qAndR['question_id'],
						'answers'=>$qAndR['answers'],
						'feelings'=>$currentCalculatedFeelings
					);
			return $result;
		}
	}

	// if enough feelings or getNewQuestion failed, returns a status:end, feelings, animations associated and meats to show
	$result= array('status'=> 'end',
					'meats'=> getMeats($currentCalculatedFeelings),
					'feelings'=>$currentCalculatedFeelings
				);

	return $result;
}

function action_orderMeats($request) {
	// Save in user_order_plate the meats
	// save stats for questions/feelings/plate : for one meat we will be able to know how user answered and feeld
}

//internal :

function calculateFeelings($userId) {

	$feelings = array();

	$sqlData = mysql_query('SELECT F.id, F.name, A.characteristics AS animation FROM yem_feeling F, yem_animation A, yem_user_has_state US, yem_state_needs_feeling SF WHERE US.idUser='.$userId.' AND US.idState=SF.idState AND F.id=SF.idFeeling AND F.idAnimation=A.id');
	while($r = mysql_fetch_assoc($sqlData)) {
		array_push($feelings, array(
			'id'=>			$r['id'],
			'name'=> 		mb_convert_encoding($r['name'], "UTF-8", "ASCII"),
			'animation'=>	json_decode($r['animation'])));
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

	// we have to get all meats

	$sqlData = mysql_query('SELECT M.id, M.name, M.description, M.picture, M.price, MT.name AS type FROM yem_meat M, yem_meat_type MT WHERE M.idType=MT.id');
	while($r = mysql_fetch_assoc($sqlData)) {
		$meats[$r['id']] = array(
					'id'=> $r['id'],
					'name'=> mb_convert_encoding($r['name'], "UTF-8", "ASCII"), 
					'description'=> mb_convert_encoding($r['description'], "UTF-8", "ASCII"), 
					'picture'=> mb_convert_encoding($r['picture'], "UTF-8", "ASCII"),
					'price'=> mb_convert_encoding($r['price'], "UTF-8", "ASCII"),
					'type'=> mb_convert_encoding($r['type'], "UTF-8", "ASCII")
			);
		$meats[$r['id']]['points'] = 0;
	}

	// and organise them by relevance
	foreach ($feelings as $feeling) {
		$sqlData = mysql_query('SELECT M.id FROM yem_meat M, yem_meat_gives_feeling MF WHERE M.id=MF.idMeat AND MF.idFeeling='.$feeling['id']);

		while($r = mysql_fetch_assoc($sqlData)) {
			$meats[$r['id']]['points'] ++;
		}
		/*
		$meats = [
			{
				"id": x,
				"name": "truc",
				"price": "x€",
				"description": "lorem ipsum",
				"picture": "kikou.jpeg",
				"points": x
			}
		]
		*/
	}

	// Obtain a list of columns
	foreach ($meats as $key => $row) {
		$points[$key]  	= $row['points'];
		$id[$key] 		= $key;
	}

	// Sort the data with volume descending, edition ascending
	// Add $data as the last parameter, to sort by the common key
	array_multisort($points, SORT_DESC, $id, SORT_ASC, $meats);

	return $meats;
}

function getNewQuestion($states, $userId, $questionsAlreadyAsked) {

	$result = array();

	if($states == array()) $result = getRandQuestion($questionsAlreadyAsked);
	else {
		error_log(json_encode($states));

		//getting all possible questions
		$questions = array();
		foreach ($states as $state) {
			$sqlData = mysql_query('SELECT Q.content, Q.id FROM yem_state_leads_to_question SQ, yem_question Q WHERE Q.id = SQ.idQuestion AND SQ.idState='.$state);

			while($r = mysql_fetch_assoc($sqlData)) {
				$questions[$r['id']] = mb_convert_encoding($r['content'], "UTF-8", "ASCII");
			}
		}

		//we count the number of iterations for each questions
		$countOfQuestions = array();
		foreach ($questions as $id=>$possibleQuestion) {
			//don't insert questions already asked !
			if(in_array($id, $questionsAlreadyAsked)) continue;

			if(!isset($countOfQuestions[$id])) $countOfQuestions[$id] = 1;
			else $countOfQuestions[$id]++;
		}

		if($countOfQuestions == array()) $result = getRandQuestion($questionsAlreadyAsked);
		else {

			//sorting by number of iterations
			error_log(json_encode($countOfQuestions));
			asort($countOfQuestions); // asort keep the associations with indexes (very important because we will get the question ID with this)
			error_log(json_encode($countOfQuestions));

			//get the object for the popular question
			reset($countOfQuestions);
			$goodId=key($countOfQuestions);
			$result = array('question_id'=>$goodId, 'question_content'=>$questions[$goodId]);
		}
	}

	//if we have a question !
	if(!isset($result['question_id'])) return false;

	//now getting responses associated with the selected question
	$answers = array();
	$sqlData = mysql_query('SELECT id, content FROM yem_answer WHERE idQuestion='.$result['question_id']);
	while($r = mysql_fetch_assoc($sqlData)) {
		$answers[] = array('id'=>$r['id'], 'content'=>mb_convert_encoding($r['content'], "UTF-8", "ASCII"));
	}
	$result['answers'] = $answers;

	//saving that we'll ask this question in the serv session, to not ask it another time !
	return $result;
}

function getRandQuestion($questionsAlreadyAsked) {
	$result = array();
	//get first question in BDD not asked :

	//translate questions already asked for WHERE SQL statement
	$WHERE = '';

	if(count($questionsAlreadyAsked)>0) $WHERE .= 'WHERE ';
	foreach ($questionsAlreadyAsked as $i => $id) {
		$WHERE .= 'id != '.$id;
		if($i+1<count($questionsAlreadyAsked)) $WHERE .= ' AND ';
	}

	$sqlData = mysql_query('SELECT Q.content, Q.id FROM yem_question Q '.$WHERE.' ORDER BY Q.id ASC LIMIT 1');
	while($r = mysql_fetch_assoc($sqlData)) {
		$result['question_id'] = $r['id'];
		$result['question_content'] = mb_convert_encoding($r['content'], "UTF-8", "ASCII");
	}
	return $result;
}


?>