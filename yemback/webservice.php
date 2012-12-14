<?php

/*
	webservice.php
	Contains every webservices callable by client.
	Mostly call to BDD

	No Active Record available :( :( #verysad
	Not securised ! TODO securise it
*/

require("conf_sql.php");
define(NB_STATES_REQUIRED, 6);

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

	//return request('status'=> 'end');

	// Calculate feelings user must meet
	$currentCalcullatedFeelings = calculateFeelings($request['user_id']);


	// Check if the user has enough entry
	// If true, returns a status:end, feelings, animations associated and meats to show
	// Else, returns a status:newQuestion, new Question to ask, feelings, animations associated.
	
}

function action_orderMeats($request) {
	// Save in user_order_plate the meats
	// save stats for questions/feelings/plate : for one meat we will be able to know how user answered and feeld
}


//internal :

function calculateFeelings($userId) {

	$sqlData = mysql_query('SELECT S.id FROM yem_state S, yem_answer A, yem_answer_informs_about_state I WHERE S.id=I.idState AND A.id=I.idAnswer AND A.id='.$request['answer_id']);

}





?>