<?php
	
	/*
	TODOLIST
	Webservices à développer :
	
	Depuis kitchen-side

	1) "createUser"
		Creates a user in data
		Returns the user ID.
	2) "sendAnswer" -- params = [INT user_id, INT question_id, INT answer_id]
		Create a user_has_state entry corresponding to answer
		Calculate feelings user must meet
		Check if the user has enough entry
		If true, returns a status:end, feelings, animations associated and meats to show
		Else, returns a status:newQuestion, new Question to ask, feelings, animations associated.

	3) "orderMeats" -- params = [INT user_id, ARRAY meats, ARRAY user_answers, ARRAY user_feelings]
		Save in user_order_plate the meats
		save stats for questions/feelings/plate : for one meat we will be able to know how user answered and feeld

	4) "nextTemplate" --


	Note : we don't keep answers from the user, just feelings associated with them

	*/

?>