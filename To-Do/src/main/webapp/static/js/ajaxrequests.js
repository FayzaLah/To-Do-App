/**
 * 
 */
$(document).ready(
			function() {
				$(".alert").hide();
				ajaxGet();
				
				 $("#addTask").click(function(){
					    $('#saveTask').val("create-task");
				        $('#id_task').val('');
				        $('form').trigger("reset");
				        $('#modelHeading').html("Create New Product");
				        $('#ajaxModel').modal('show');
				    }); 
				
				$("#saveTask").click(function(event) {
					event.preventDefault();
					var indexed_array = {};
					var x = $('form').serializeArray();
					$.map(x, function(n, i){
					        indexed_array[n['name']] = n['value'];
					    });
					  $('#ajaxModel').modal('hide');
						ajaxPost(indexed_array);
					
				
				});
				

			    $('body').on('click', '.editbtn', function () {
			      var task_id = $(this).data('id');
			      
			      $.get("http://localhost:8080/tasks/" + task_id , function (data) {
			    	  console.log(data);
			          $('#modelHeading').html("Edit Task");
			          $('#saveTask').val("edit-task");
			          $('#ajaxModel').modal('show');
			          
			          $('#id_task').val(data.id);
			          $('#name').val(data.name);
			          $('#dueDate').val(data.dueDate);
			          $('#description').val(data.description);
			          $('#creationDate').val(data.creationDate);
			      })
			      
			   });

			    /*
				 $("#example").on("click", ".editbtn", function(){
					 var id = $(this).parents("tr").find("td:eq(0)").html();
			    		var name = $(this).parents("tr").find("td:eq(1)").html();
			    		var creationDate = $(this).parents("tr").find("td:eq(2)").html();
			    		var dueDate = $(this).parents("tr").find("td:eq(3)").html();
			    		var description = $(this).parents("tr").find("td:eq(4)").html();
			    		
			    		$("#idTask").val(id);
			    		 $("#updateTask").val(name);
			    		 $("#creationDate").val(creationDate);
			    		 $("#updateDueDate").val(dueDate);
			    		 $("#updateNotes").val(description);
			    		 
				    	 $('#updateModal').modal('show');
					});
				
				 $("#editTask").click(function(event) {
		    		 event.preventDefault();
					 ajaxPut();
					});
				 */
				 $("#example").on("click", ".deletebtn", function(){
					 var task_id = $(this).data('id');
					 ajaxDelete(task_id);
					});
				
	});

//DELETE
function ajaxDelete(id){
	$.ajax({
			type : "DELETE",
			url : "http://localhost:8080/tasks/" + id,
			dataType : '',
			success : function() {
				ajaxGet();
				},
				error : function (e) {
			    alert("errore");
			    console.log(e);
				}
			});
}

//PUT
function ajaxPut(){
	/*
	 var task= {
			     id : $("#task_id").val(),
	    		 name : $("#nameTask").val(),
	    		 dueDate : $("#dueDate").val(),
	    		 description : $("#notes").val()
			}
	 */

	 $.ajax({
			type : "PUT",
			contentType : "application/json",
			url : "http://localhost:8080/tasks",
			data : JSON.stringify(indexed_array),
			dataType : 'json',
			success : function(data) {
				ajaxGet();
				},
				error : function (e) {
			    alert("errore");
			    console.log(e);
				}
			});
}

	//DO GET
	function ajaxGet() {
		    table = $('#example').DataTable();
		    table.destroy();
	
		$.ajax({
			type : "GET",
			url : "http://localhost:8080/tasks",
			dataType : 'json',
			success : function(data) {
				$('#example').DataTable({
						"aaData" : data,
						"columns" : [ {
							"data" : "id"
						}, {
							"data" : "name"
						}, {
							"data" : "creationDate"
						},{
							"data": "dueDate"
						},{
							"data" : "description"
						},{
							  data: null,
							  render: function ( data, type, row ) {
							    return '<button data-id="' +row.id+'" class="btn btn-warning btn-sm editbtn"> Edit </button>' + " " + 
							                  '<button  data-id="' +row.id+'"  class="btn btn-danger btn-sm deletebtn"> Delete </button>' ;
							  }
							}
					]
				});
			},
			
			error : function(e) {
				alert(e);
				console.log("ERROR: ", e);
			}
		});
	}

	//DO POST
	function ajaxPost(task) {
		/*
		var task = {
			name : $("#name").val(),
			dueDate : $("#dueDate").val(),
			description : $("#description").val()
		}
		*/
		var indexed_array = {};
		var x = $('form').serializeArray();
		$.map(x, function(n, i){
		        indexed_array[n['name']] = n['value'];
		    });
		$.ajax({
			type : "POST",
		contentType : "application/json",
		url : "http://localhost:8080/tasks",
		data : JSON.stringify(task),
		dataType : 'json',
		success : function(data) {
			$("#exampleModalCenter").modal("hide");
			var msg = data.message;
			$('.alert').html("<div class='alert alert-success'>"+ msg +"</div>");
			myAlert();
			ajaxGet();
			},
			error : function (e) {
				console.log(e);
		       // alert(e.responseText);
				$("#exampleModalCenter").modal("hide");
				//alert(e.status);
				var json = e.responseJSON;
				var msg = json.message;
			
				$('.alert').html("<div class='alert alert-danger'>"+ msg +"</div>");
				myAlert();
				       
			}
		});
	}
	
	function myAlert(){
		$('.alert').fadeTo(2000, 500).slideUp(500, function(){
		    $('.alert').slideUp(500);
		});
	}