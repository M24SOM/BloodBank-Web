
// get users
let uri="http://localhost:8080/bloodType"
$( document ).ready(function() {
    console.log( "ready!" );
    GetBloodType();
    $(".btn-cl").on('click', function(){
        $("#update-user").modal('hide');
        $("#add-user").modal('hide');
    })
    $("#edit-bloodtype").on('click', function(){
      editoneuser()
    })
    
     $("#btn-addone").on('click', function(){
         $("#add-user").modal('show');
    })

    $("#add-bloodType").on('click', function(){

        addonebloodtype()

    })
});

 function GetBloodType(){
    $("#t-bloodtype").empty();
  //  $("#Add-modal-Product").modal("hide");

    var $list = $("#t-bloodtype");
    
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
                <button type="button" class="btn btn-warning mr-3 pl-3" onclick="edituser(${item.id})" >Edit</button>
             

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

  function edituser(id){

    $("#edit_bloodtype").modal('show');
    $.ajax({  
        url: `http://localhost:8080/bloodType/`+`${id}`,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            console.log(data);
           $("#upbloodid").val(data.id)
           $("#upbloodname").val(data.name)
          


        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }
  
  function editoneuser(){
    let oneuser ={
        id: $("#upbloodid").val(),
        name:$("#upbloodname").val(),
     
    }
    $.ajax({  
        url: uri,  
        type: 'POST',
        contentType :'application/json',
        data: JSON.stringify(oneuser),  
     
        success: function (data ) {
          console.log("Suuceccfully added");
          // console.log(data);
          $("#edit_bloodtype").modal('hide');
          GetBloodType(); 
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetBloodType(); 
        }  
    });
     

 

  }


  // add user

  function addonebloodtype(){
       let name=$("#bloodname").val()
    if (name !== "") {
       
        let oneuser ={
          name:$("#bloodname").val(),

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
              GetBloodType(); 
              
                  
            },  
            error: function (request , msg , error) {  
                console.log('Can not post');
                GetBloodType(); 
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
          GetBloodType(); 
          
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetBloodType(); 
        }  
    }); 


  }
 