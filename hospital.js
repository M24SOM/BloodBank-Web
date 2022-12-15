
// get Hospitals
let uri="http://localhost:8080/hospital"
$( document ).ready(function() {
    console.log( "ready!" );
    dropdown();
    GetHospitals();
    $(".btn-cl").on('click', function(){
        $("#update-user").modal('hide');
        $("#add-user").modal('hide');
    })
    $("#edit-Hospital-button").on('click', function(){
      editHospital()
    })
    
     $("#btn-addone").on('click', function(){
         $("#add-user").modal('show');
    })

    $("#add-Hospital").on('click', function(){

      addHospital()

    })
});

 function GetHospitals(){
    $("#table-hospital").empty();
    var $list = $("#table-hospital");
    
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
                $tr.append("<td>"+item.state.name+"</td>");

                $tr.append(` <td>
                <button type="button" class="btn btn-warning mr-3 pl-3" onclick="getHospitalData(${item.id})" >Edit</button>
            </td>`);
                $list.append($tr);

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  };

  function getHospitalData(id){

    $("#edit-Hospital").modal('show');
    $.ajax({  
        url: `http://localhost:8080/hospital/`+`${id}`,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            console.log(data);
           $("#hospital-id-update").val(data.id)
           $("#hospital-name-update").val(data.name)
           $("#state-location-update").val(data.state.name)

          


        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }
  
  function editHospital(){
    let oneuser ={
        id: $("#hospital-id-update").val(),
        name:$("#hospital-name-update").val(),
        state: {
          id:$("#state-location-update").val(),
       },

     
    }
    $.ajax({  
        url: uri,  
        type: 'POST',
        contentType :'application/json',
        data: JSON.stringify(oneuser),  
     
        success: function (data ) {
          console.log("Suuceccfully added");
          console.log(data);
          $("#edit-Hospital").modal('hide');
          GetHospitals(); 
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetHospitals(); 
        }  
    });
     

 

  }


  // add Hospital

  function addHospital(){
       let name=$("#hname").val()
    if (name !== "") {
       
        let oneuser ={
           name:$("#hname").val(),
            state: {
               
              id:$("#state-location").val(),
           },

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
              GetHospitals(); 
              
                  
            },  
            error: function (request , msg , error) {  
                console.log('Can not post');
                GetHospitals(); 
            }  
        }); 
    }else{
        
        alert("no value given")
    }
  
     

 

  }
  function dropdown(){
   
    $.ajax({  
        url: 'http://localhost:8080/state',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            //console.log(data);
            $("#state-location-update").empty()
            $("#state-location-update").append(`<option> Select State </option>`)
            $("#state-location").empty()
            $("#state-location").append(`<option> Select State </option>`)

            $.each(data, function(idx , item){
                console.log(item);
          
            $("#state-location").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            $("#state-location-update").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            
            
        

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
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
          GetHospitals(); 
          
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetHospitals(); 
        }  
    }); 


  }
 