
// get users
let uri="http://localhost:8080/user/login"
$( document ).ready(function() {
    console.log( "ready!" );
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

    $("#login").on('click', function(){

        login()

    })
});
 

  
  // add State

  function login(){
    let name=$("#username").val()
 if (name !== "") {
    
     let oneuser ={
        username:$("#username").val(),
       password:$("#password").val(),

     }
     $.ajax({  
         url: uri,  
         type: 'POST',
         contentType :'application/json',
         data: JSON.stringify(oneuser),  
      
         success: function (data ) {
           localStorage.setItem("username",oneuser.username);
           window.location.href = "index.html";
        //    window.location.reload()

               
         },  
         error: function (request , msg , error) {  
            alert('Can not post');
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
 