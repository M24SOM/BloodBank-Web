let uri="http://localhost:8080/dashboard"
$( document ).ready(function() {
    console.log( "ready!" );
    GetDashboard();
    // $(".btn-cl").on('click', function(){
    //     $("#update-user").modal('hide');
    //     $("#add-user").modal('hide');
    // })
    // $("#edit-state-button").on('click', function(){
    //   editState()
    // })
    
    //  $("#btn-addone").on('click', function(){
    //      $("#add-user").modal('show');
    // })

    // $("#add-state").on('click', function(){

    //     addState()

    // })
});


function GetDashboard(){
  //  $("#Add-modal-Product").modal("hide");

    var $list = $("#cc").val();
    
      $.ajax({  
        url: uri,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            $('#cc').html(data.CC);
            $('#donor').html(data.Donor);
            $('#hospital').html(data.Hospital);
            $('#recipiant').html(data.Receipts);


        },  
        error: function (request , msg , error) { 
            console.log('Error in Operation');  
        }  
    });
  };

