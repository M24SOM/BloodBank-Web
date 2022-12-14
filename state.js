
// get users
let uri="http://localhost:8080/state"
$( document ).ready(function() {
    console.log( "ready!" );
    GetStates();
    $(".btn-cl").on('click', function(){
        $("#update-user").modal('hide');
        $("#add-user").modal('hide');
    })
    $("#edit-state-button").on('click', function(){
      editState()
    })
    
     $("#btn-addone").on('click', function(){
         $("#add-user").modal('show');
    })

    $("#add-state").on('click', function(){

        addState()

    })
});

 function GetStates(){
    $("#t-state").empty();
  //  $("#Add-modal-Product").modal("hide");

    var $list = $("#t-state");
    
      $.ajax({  
        url: uri,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            //console.log(data);
            $.each(data, function(idx , item){
                console.log(item);
                var $tr = $("<tr></tr>");
                $tr.append("<td>"+item.id +"</td>");
                $tr.append("<td>"+item.name+"</td>");
                $tr.append(` <td>
                <button type="button" class="btn btn-warning mr-3 pl-3" onclick="editStateData(${item.id})" >Edit</button>
             

            </td>`);
            // <button type="button" class="btn btn-danger mr-3" onclick="deleteuser(${item.id})">Delete</button>
            

                $list.append($tr);

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  };

  function editStateData(id){

    $("#edit_state").modal('show');
    $.ajax({  
        url: `http://localhost:8080/state/`+`${id}`,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            console.log(data);
           $("#state-id").val(data.id)
           $("#state-name-update").val(data.name)
          


        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }
  
  // function editState(){
  //   let oneuser ={
  //       id: $("#state-id").val(),
  //       name:$("#state-name").val(),
     
  //   }
  //   $.ajax({  
  //       url: uri,  
  //       type: 'POST',
  //       contentType :'application/json',
  //       data: JSON.stringify(oneuser),  
     
  //       success: function (data ) {
  //         console.log("Suuceccfully added");
  //         console.log(data);
  //         $("#edit_state").modal('hide');
  //         GetStates(); 
              
  //       },  
  //       error: function (request , msg , error) {  
  //           console.log('Can not post');
  //           GetStates(); 
  //       }  
  //   });
     

 

  // }

  function editState(){
    let oneuser ={
        id: $("#state-id").val(),
        name:$("#state-name-update").val(),
     
    }
    $.ajax({  
        url: uri,  
        type: 'POST',
        contentType :'application/json',
        data: JSON.stringify(oneuser),  
     
        success: function (data ) {
          console.log("Suuceccfully added");
          // console.log(data);
          $("#edit_state").modal('hide');
          GetStates(); 
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not Put');
            GetStates(); 
        }  
    });  

  }


  // add State

  function addState(){
       let name=$("#state-name").val()
    if (name !== "") {
       
        let oneuser ={
          name:$("#state-name").val(),

        }
        $.ajax({  
            url: uri,  
            type: 'POST',
            contentType :'application/json',
            data: JSON.stringify(oneuser),  
         
            success: function (data ) {
              console.log("Suuceccfully added");
              // console.log(data);
              window.location.reload()
              GetStates(); 
              
                  
            },  
            error: function (request , msg , error) {  
                console.log('Can not post');
                GetStates(); 
            }  
        }); 
    }else{
        
        alert("no value given")
    }
  
     

 

  }

  function deleteuser(id){

  
    if (confirm("are you sure you want to delete this user") == true) {
        deletethisuser(id)
    
    } else {
      
    }      
  }

  function deletethisuser(id){

    $.ajax({  
        url: uri+`${id}`,  
        type: 'DELETE',
     
        success: function (data ) {
            
          console.log("Suuceccfully deleted");
          // console.log(data);
          //window.location.reload()
          GetStates(); 
          
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetStates(); 
        }  
    }); 


  }
 