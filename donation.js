
// get users
let uri="http://localhost:8080/donation"
$( document ).ready(function() {
    console.log( "ready!" );
    dropdown();
    GetDonation();
    $(".btn-cl").on('click', function(){
        $("#update-user").modal('hide');
        $("#add-user").modal('hide');
    })
    $("#edit-donation-button").on('click', function(){
      editoneuser()
    })
    
     $("#btn-addone").on('click', function(){
         $("#add-user").modal('show');
    })

    $("#add-donation").on('click', function(){

        addDonation()

    })
});

 function GetDonation(){
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
                $tr.append("<td>"+item.donor.name+"</td>");
                $tr.append("<td>"+item.cc+"</td>");
                $tr.append("<td>"+item.donor.bloodType.name+"</td>");
                $tr.append("<td>"+item.donor.mobileNo+"</td>");     
                $tr.append("<td>"+item.date+"</td>");

         


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
        url: `http://localhost:8080/donation/`+`${id}`,  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            console.log(data);
           $("#donation-id-update").val(data.id)
           $("#updateDonor").val(data.donor.name)
           $("#updateCc").val(data.cc)
           $("#updateDate").val(data.date)
           $("#update-bloodtype").val(data.bloodType.name)


        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
  }
  
  function editoneuser(){
    let oneuser ={
        id: $("#donation-id-update").val(),
        cc:parseInt($("#updateCc").val()),
        date:$("#updateDate").val(),
        type: "Donation",
        bloodType: {
            id:$("#update-bloodtype").val(),
           
        },
        donor: {
            id:$("#updateDonor").val(),
           
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
          $("#edit_bloodtype").modal('hide');
          GetDonation(); 
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            console.table(oneuser)
            GetDonation(); 
        }  
    });
     

 

  }


  // add user

  function addDonation(){
        let oneuser ={
            cc:$("#addCc").val(),
            date:$("#addDate").val(),
        	type: "Donation",
            bloodType: {
                id:$("#add-bloodtype").val(),
               
            },
            donor: {
                id:$("#addDonor").val(),
               
            },

        }
        $.ajax({  
            url: `http://localhost:8080/donation/add`,  
            type: 'POST',
            contentType :'application/json',
            data: JSON.stringify(oneuser),  
         
            success: function (data ) {
              console.log("Suuceccfully added");
              console.log(data);
              window.location.reload()
              GetDonation(); 
              
                  
            },  
            error: function (request , msg , error) {  
                console.log('Can not post');
                console.log(error);

                GetDonation(); 
            }  
        }); 
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
            $("#add-bloodtype").empty()
            $("#add-bloodtype").append(`<option> Select BloodType </option>`)
            $("#update-bloodtype").empty()
            $("#update-bloodtype").append(`<option> Select BloodType </option>`)
           
            

            $.each(data, function(idx , item){
                console.log(item);
          
            $("#add-bloodtype").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            
            $("#update-bloodtype").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
                
            
            
        

            })  
        },  
        error: function (request , msg , error) {  
            console.log('Error in Operation');  
        }  
    });
    $.ajax({  
        url: 'http://localhost:8080/donor',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data ) {  
            //console.log(data);
            $("#addDonor").empty()
            $("#addDonor").append(`<option> Select Donor </option>`)
            $("#updateDonor").empty()
            $("#updateDonor").append(`<option> Select State </option>`)

            $.each(data, function(idx , item){
                console.log(item);
          
            $("#addDonor").append(`
            <option value="${item.id}"> ${item.name} </option>`

            )
            $("#updateDonor").append(`
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
          GetDonation(); 
          
              
        },  
        error: function (request , msg , error) {  
            console.log('Can not post');
            GetDonation(); 
        }  
    }); 


  }

 