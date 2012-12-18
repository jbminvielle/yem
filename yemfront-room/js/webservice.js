//Namespace YEM
if(typeof YEM == 'undefined') YEM = {};

/* --------------------

Webservice is the Interface between webapp and both servs
These two servers ar representated by two public functions
calling the same internal function (kinect() & server() => get())


----------------------- */

YEM.Webservice = new Object();

YEM.Webservice.get = function(url, params, callback){
	$.ajax({ 
		url: url,
		data: params,
		success: function(data){
			try {
				result = JSON.parse(data);
			}
			catch(err) {
				result = data;
			}
			callback(result);
		}
	});
};

YEM.Webservice.kinect = function(serviceName, callback){

	return YEM.Webservice.get("localhost:4123", {}, callback);
};

YEM.Webservice.server = function(serviceName, params, callback) {
	var tmp = params; tmp.service = serviceName
	return YEM.Webservice.get("../yemback/webservice.php", tmp, callback);
}
