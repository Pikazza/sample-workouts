/*$(document).ready(function() {
	
	$(document).ready(function() {
	    $('#members_table').DataTable( {
	        dom: 'Bfrtip',
	        buttons: [
	            'copyHtml5',
	            'excelHtml5',
	            'csvHtml5',
	            'pdfHtml5'
	        ]
	    } );
	} );

} );


$(document).ready(function() {
    $('#members_table').DataTable( {
    	"sDom": 'R<"H"fr>t<"F"ip>',            
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "buttons": [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
	$('#members_table').DataTable();
} );

$('#members_table').DataTable( {
	dom: 'Bfrtip',
    buttons: [
        {
            extend: 'excel',
            text: 'Save current page',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }
    ]
} );

$('#members_table').dataTable({
	"bJQueryUI": true,
	"sPaginationType": "full_numbers",
	"oTableTools": {
	"aButtons": [
	{
	'sExtends':'csvHtml5',
	"sFileName": "subscribers_"+GetTodayDate()+".csv",
	'mColumns':[0,1]
	},
	{
	'sExtends':'pdfHtml5',
	"sFileName": "subscribers_"+GetTodayDate()+".pdf",
	'mColumns':[0,1] 
	},
	]
	},
	"sDom": '<"H"Tlfr>tip<"F">',
	"aoColumns":
	[
	{ "bSearchable": false },
	null,
	{ "bSortable": false, "bSearchable": false },
	]
	});
*/