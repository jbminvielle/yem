<?php

require("conf_sql.php");

//not securised ! TODO securise it

$data = $_GET;
unset($data['service']); // GTFO webservice name !
 
//echo 'action_'.$_GET['service'].'(array('.implode(', ', $data).')';
if(!function_exists('action_'.$_GET['service']))  {
	header("HTTP/1.0 404 Not Found");
	echo '<h1>Error 404</h1><p>Webservice '.$_GET['service'].' not found.</p>';
}
else {
	$return = call_user_func('action_'.$_GET['service'], $data); 
	echo $return;
}


// webservices functions :

function action_createUser($array) {
	// Creates a user in data
	// Returns the user ID
}

function action_sendAnswer($array) {
	// Create a user_has_state entry corresponding to answer
	// Calculate feelings user must have
	// Check if the user has enough entry
	// If true, returns a status:end, feelings, animations associated and meats to show
	// Else, returns a status:newQuestion, new Question to ask, feelings, animations associated.
	
}

function action_orderMeats($array) {
	// Save in user_order_plate the meats
	// save stats for questions/feelings/plate : for one meat we will be able to know how user answered and feeld
}


?>