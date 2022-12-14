
// get users
let uri="http://localhost:8080/donor"
$( document ).ready(function() {
    console.log( "ready!" );
    dropdown();
    GetDrivers();
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

    $("#add-bloodtype").on('click', function(){

        addonebloodtype()

    })
});

 function GetDrivers(){
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
                $tr.append("<td>"+item.dateBirth+"</td>");
                $tr.append("<td>"+item.weight+"</td>"); 
                $tr.append("<td>"+item.mobileNo+"</td>");     
                $tr.append("<td>"+item.bloodType.name+"</td>");
                $tr.append("<td>"+item.state.name+"</td>");
                $tr.append("<td>"+item.isHealthy+"</td>");

         


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
        url: `http://localhost:8080/donor/`+`${id}`,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            console.log(data);
           $("#upbloodid").val(data.id)
           $("#ername").val(data.name)
           $("#erbirthday").val(data.dateBirth)
           $("#erweight").val(data.weight)

           $("#erphone").val(data.mobileNo)
        
    
           $("#erbloodtypeid").val(data.bloodType.id)

        
           $("#erbloodt").html(data.bloodType.name)
           
        
           $("#erstateid").val(data.state.name)
           $("#erstateid").val(data.state.id)
           $("#edishealth").val(data.isHealthy)
         
           


          


        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }
  
  function editoneuser(){
    let oneuser ={
        id: $("#upbloodid").val(),
        name:$("#ername").val(),
        dateBirth:$("#erbirthday").val(),
        weight:$("#erweight").val(),
        mobileNo:$("#erphone").val(),
       
        bloodType: {
            id:$("#erbloodtypeid").val(),
           
        },
        state: {
           
           id:$("#erstateid").val(),
        },
  
        isHealthy:$("#edishealth").val(),
     
     
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
          GetDrivers(); 
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetDrivers(); 
        }  
    });
     

 

  }


  // add user

  function addonebloodtype(){
       let name=$("#rname").val()
    if (name !== "") {
       
        let oneuser ={
            name:$("#rname").val(),
            dateBirth:$("#rbirthday").val(),
            weight:$("#rweight").val(),
            mobileNo:$("#rphone").val(),

           
        
            bloodType: {
                id:$("#rbloodtypeid").val(),
               
            },
            state: {
               
               id:$("#rstateid").val(),
            },
            isHealthy:$("#dishealth").val(),
      
         


        }
  
        $.ajax({  
            url: "http://localhost:8080/donor/add" ,  
            type: 'POST',
            contentType :'application/json',
            data: JSON.stringify(oneuser),  
         
            success: function (data ) {
              console.log("Suuceccfully added");
              // console.log(data);
              window.location.reload()
              GetDrivers(); 
              
                  
            },  
            error: function (request , msg , error) {  
                console.log('Can not post');
                GetDrivers(); 
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

  function dropdown(){
    $.ajax({  
        url: 'http://localhost:8080/bloodType',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            //console.log(data);
            $("#rbloodtypeid").empty()
            $("#rbloodtypeid").append(`<option> Select BloodType </option>`)
            $("#erbloodtypeid").empty()
            $("#erbloodtypeid").append(`<option> Select BloodType </option>`)
           
            

            $.each(data, function(idx , item){
                console.log(item);
          
            $("#rbloodtypeid").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            
            $("#erbloodtypeid").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
                
            
            
        

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
    $.ajax({  
        url: 'http://localhost:8080/state',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            //console.log(data);
            $("#rstateid").empty()
            $("#rstateid").append(`<option> Select State </option>`)
            $("#erstateid").empty()
            $("#erstateid").append(`<option> Select State </option>`)

            $.each(data, function(idx , item){
                console.log(item);
          
            $("#rstateid").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            $("#erstateid").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            
            
        

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }

  function deletethisuser(id){

    $.ajax({  
        url: uri+`${id}`,  
        type: 'DELETE',
     
        success: function (data ) {
            
          console.log("Suuceccfully deleted");
          // console.log(data);
          //window.location.reload()
          GetDrivers(); 
          
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetDrivers(); 
        }  
    }); 


  }

 