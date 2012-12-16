if(typeof YEM == 'undefined') YEM = {};

YEM.Webservice = new Object();

YEM.Webservice.get= function(url, params){

		$.ajax({ 
		   url: url,
		   data: params,
		   success: function(data){
		   	result = data;
		   }
		});
		return result; 
	};

YEM.Webservice.kinect = function(serviceName){

	return YEM.Webservice.get("localhost:4123", {});
};

YEM.Webservice.server = function(serviceName, params) {
	var tmp = params; tmp.service = serviceName
	return YEM.Webservice.get("../../yemback/webservice.php", tmp);
}
