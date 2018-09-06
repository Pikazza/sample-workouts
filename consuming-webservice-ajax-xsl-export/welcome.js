$(document).ready(function() {
	var bearerToken ;
	$("#welcome").click(function(){
	    $.ajax({
	    	type: 'GET',
	        url: "http://192.168.3.83:8080/OvjAPI/api/v1.0/welcome"
	    }).then(function(data) {
	       $('.welcome-content').append(JSON.stringify(data));
	    });
    });
	
	$("#login").click(function(){
	    $.ajax({
	    	type: 'POST',
	    	contentType: "application/json; charset=utf-8",
	    	dataType: "json",
	        url: "http://192.168.3.83:8080/OvjAPI/api/v1.0/members/signin",
	        headers: {
	        	'Authorization': 'Basic NzM3MzQ3ODM0NjpQYXNzd29yZDE=',
	        	'Accept': 'application/json',
	        	'Content-Type': 'application/json'
	        		},
	        data: '{"deviceId": "598d94c1d601800001a9d778598d94c1d601800001a9d778","deviceType": "ANDROID","deviceToken": "E730CDAD-4A53-4FCF-8FD1-E498AC92A2A11"}',
	    }).then(function(data) {
	    	console.log(JSON.stringify(data));
	    	bearerToken = data.bearerToken;
	       $('.login-content').append(data.status);
	    });
    });
	
	$("#get-members").click(function(){
		$.ajax({
			headers: {
				authorization: bearerToken,
				accept: "application/json"
				},
	        url: "http://192.168.3.83:8080/OvjAPI/api/v1.0/members?page=0&size=20&ascending=true&sortBy=name&filterByOutstandingBal=false"
	    }).then(function(response) {
	    	/*var $th = $('<tr>').append(
	                $('<td>').text("memberId"),
	                $('<td>').text("name"),
	                $('<td>').text("emailId")
	            );
	    	$('#records_table').append($th);
	    	*/
	    	var $th1 = $('<tr>').append(getDynamicHeader(response.members[0]));
            $('#members_table').append($th1);
            
	    	$.each(response.members, function(i, item) {
	            var $tr = $('<tr>').append(getDynamicRow(item));
	            $('#members_table').append($tr);
	        });
	    	
	    	
	    	/*$.each(response.members, function(i, item) {
	            var $tr = $('<tr>').append(
	                $('<td>').text(item.memberId),
	                $('<td>').text(item.name),
	                $('<td>').text(item.emailId)
	            );
	            //console.log($tr.wrap('<p>').html());
	            $('#records_table').append($tr);
	        });*/
	    });
    });
	

	function getDynamicRow(item) {
		var xx = '';
		for ( var key in item) {
			var value = item[key];
			xx += '<td>' + JSON.stringify(value) + '</td>';
		}
		return xx; 
	}
	function getDynamicHeader(item) {
		var xx = '';
		for ( var key in item) {
			xx += '<td>' + key + '</td>';
		}
		return xx; 
	}
	
});