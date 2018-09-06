$(document).ready(function() {
	var bearerToken ;
	var endUrl = window.location.href;
	var endpoint = endUrl.substr(0,endUrl.indexOf("NurvvAPI"));
	
	$("#welcome").click(function(){
	    $.ajax({
	    	type: 'GET',
	        url: endpoint+"NurvvAPI/api/v1.0/welcome"
	    }).then(function(data) {
	       $('.welcome-content').append(JSON.stringify(data));
	    });
    });
	
	$("#cas-login").click(function(){
		var username = $("#cas-name").val();
		var password = $("#cas-password").val();
		var basicAuth = "Basic "+btoa(username+":"+password);
		
		console.log("username is:-"+ username);
		console.log("passsword is:-"+ password);
		console.log("base64 string "+ basicAuth );
		
	    $.ajax({
	    	type: 'POST',
	    	contentType: "application/json; charset=utf-8",
	    	dataType: "json",
	        url: endpoint+"NurvvAPI/api/v1.0/swagger/signIn",
	        data: '{"authToken":"'+username+'","passCode": "'+password+'"}',
	    }).then(function(response, status, xhr) {
	    	console.log(xhr.status);
	    	console.log(xhr.getAllResponseHeaders());
	    	console.log(JSON.stringify(response));
	    	bearerToken = response.id;
	    	if(response.status){
	    		$('.cas-login-table-span').text(" Successful.");
	    	}else{
	    		$('.cas-login-table-span').text(" not Successful.");
	    	}
	    }).fail(function(response, textStatus, xhr) {
            console.log("error", response.status);
            $('.cas-login-table-span').text(" not Successful.");
       });
    });
	
	$("#get-members").click(function(){
		$.ajax({
			//headers: {authorization: bearerToken },
	        url: endpoint+"NurvvAPI/api/v1.0/athletes"
	    }).then(function(response, status, xhr) {
	    	var $th1 = $('<tr>').append(getDynamicHeader(response[0]));
            $('#members-table').html($th1);
	    	$.each(response, function(i, item) {
	            var $tr = $('<tr>').append(getDynamicRow(item));
	            $('#members-table').append($tr);
	        });
	    });
    });
	
	$("#get-sessions").click(function(){
		
		var athId = $("#ath-id").val();
		var fromDate = $("#ses-fromdate").val();
		var toDate = $("#ses-todate").val();
		console.log("athId is:-"+ athId);
		console.log("fromDate is:-"+ fromDate);
		console.log("toDate is:-"+ toDate );
		$('.get-sessions-table-span').text(" loading ....");
		var queryParams = getParams(athId, fromDate, toDate);
		console.log("whole query params is:-"+ queryParams );
		
		$.ajax({
			headers: {authorization: "Bearer "+bearerToken },
	        url: endpoint+"NurvvAPI/api/v1.0/session"+queryParams
	    }).then(function(response, status, xhr) {
	    	console.log(xhr.status);
	    	console.log(xhr.getAllResponseHeaders());

	    	$('.get-sessions-table-span').text("");
	    	var $th1 = $('<tr>').append(getDynamicHeader(response.content[0]));
	    	var $th2 = $('<tr>').append(getSeesionDetailsHeader(response.content[0]));
            $('#sessions-table').html($th1);
            $('#sessions-table-hide').html($th2);
	    	$.each(response.content, function(i, item) {
	            var $tr1 = $('<tr>').append(getDynamicRow(item));
	            var $tr2 = $('<tr>').append(getSesionDetailsRow(item));
	            $('#sessions-table').append($tr1);
	            $('#sessions-table-hide').append($tr2);
	        });
	    }).fail(function(response, textStatus, xhr) {
	    	$('.get-sessions-table-span').text(" not loading and api returned error response ");
            //This shows status message eg. Forbidden
	    	console.log("error", response.status);
       });
    });
	
	
	function  getParams(athId, fromDate, toDate){
		var xx = '?detail=yes';
		if(athId != null && athId != ""){
			xx+="&athleteId="+athId;
			if(fromDate != null && fromDate != ""){
				xx+="&"
			}
		}
		if(fromDate != null && fromDate != ""){
			xx+="fromDate="+fromDate;
			if(toDate != null && toDate != ""){
				xx+="&"
			}
		}
		
		if(toDate != null && toDate != ""){
			xx+="toDate="+toDate;
		}
		
		return xx;
	}
	function getSeesionDetailsHeader(item){
		var xx = '';
		for ( var key in item) {
			if(key === "sessionId"){
				xx += '<td>' + key + '</td>';
			}
			if(key === "athleteID"){
				xx += '<td>' + key + '</td>';
			}
			if(key === "sessionDetails"){
				xx += '<td>' + "sessionDetails" + '</td>';
				//xx += '<td>' + getSubRows(key) + '</td>';
			}
		}
		return xx; 
	}
	
	function getSesionDetailsRow(item){
		var xx = '';
		for ( var key in item) {
				var value = item[key];
				if(key === "sessionId"){
					xx += '<td>' + value + '</td>';
				}
				else if(key === "athleteID"){
					xx += '<td>' + value + '</td>';
				}else if(key === "sessionDetails"){
					var reordered = reorderingSessionDetails(value);
					//xx +='<td>' + JSON.stringify(reordered) + '</td>';
					xx +='<td>' + getSubRows(reordered) + '</td>';
				}
		}
		return xx;
	}
	
	function getSubHeaders(reordered){
		var xx="";
		$.each(reordered, function(i, item) {
			for ( var key in item) {
				xx += '<td>' + key + '</td>';
			}
		});
		return xx;
	}
	
	function getSubRows(reordered){
		var xx="";
		$.each(reordered, function(i, item) {
			for ( var key in item) {
				xx += '<td>' + JSON.stringify(item[key]) + '</td>';
			}
		});
		return xx;
	}
	
	function getDynamicRow(item) {
		var xx = '';
		for ( var key in item) {
			if(! isExistInList(key)){
				var value = item[key];
				if(key === "sessionSummary"){
					var reordered = reorderingSessionSummary(value);
					xx +='<td>' + JSON.stringify(reordered) + '</td>';
				}/*else if(key === "sessionDetails"){
					var reordered = reorderingSessionDetails(value);
					xx +='<td>' + JSON.stringify(reordered) + '</td>';
				}*/
				else{
					xx += '<td>' + JSON.stringify(value) + '</td>';
				}
				
			}
		}
		return xx; 
	}
	
	function getDynamicHeader(item) {
		var xx = '';
		for ( var key in item) {
			if(! isExistInList(key)){
				console.log("checking "+(key !== "authentication"))
				xx += '<td>' + key + '</td>';
			}
		}
		return xx; 
	}
	
	function isExistInList(key){
		var toBeExcludedList = ["authentication", "feedBackProfiles","sessionDetails"];
		var isExist = toBeExcludedList.includes(key);
		return isExist;
	}
	
	function reorderingSessionSummary(oldOrdered ){
		var ordered = [];
		$.each(oldOrdered, function(i, item) {
			var jsonData = [];
			for ( var key in item) {
				jsonData.push(item[key])
			}
			ordered.push(jsonData);
        });
		return ordered;
	}
	function reorderingSessionDetails(oldOrdered) {
		var topOrderedList = [];
		$.each(oldOrdered, function(i, item) {
			for ( var key in item) {
				var topOrderedJson = {};
				if (key === "timeMillisec") {
					topOrderedJson.timeMillisec = item[key]
				} else if (key === "sessionDetail") {
					var ordered = [];
					$.each(item[key], function(j, item2) {
						var jsonData2 = [];
						for ( var key2 in item2) {
							jsonData2.push(item2[key2])
						}
						ordered.push(jsonData2);
					});
					topOrderedJson.sessionDetail = ordered;
				}

				topOrderedList.push(topOrderedJson);
			}
		});
		return topOrderedList;
	}
	
	
});