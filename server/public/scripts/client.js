$(document).ready(function() {
console.log('js is sourced');

  // load existing list on page load


  getList();

// add a click handler to addTaskBtn
  $( '#addTaskBtn' ).on( 'click', function(){
    console.log( 'in addTaskBtn on click');

    // get user input and put in an object
    var taskObject = {};
        taskObject.task = $('#newTaskIn').val();
    // call newTaskFunc with the new obejct
    console.log('OTS is: ', taskObject);
    newTaskFunc( taskObject );
  }); //end addTaskBtn on click

  $('#theList').on('click', '.completeTaskBtn', function(){
    console.log('put working');
  var colorChange = $(this);
var listid = $(this).data('listid');
console.log(listid);
    $.ajax({
      url: '/todo/' + listid,
      type: 'PUT',
      success: function (response){
        getList();

      }
    });
  }); // end of complete button


  $('#theList').on('click', '.deleteTaskBtn', function(){
var listid = $(this).data('listid');
    $.ajax({
      url: '/todo/' + listid,
      type: 'DELETE',
      success: function (response){
        getList();

      }
    });
  }); // end of delete button
}); ////// end doc ready  ////////


function getList(){
  console.log( 'in getList' );
  // ajax call to server to get tasks
  $.ajax({
    url: '/todo',
    type: 'GET',
    success: function( response ){
      console.log('got some tasks: ', response );
        appendToDom(response.to_do_list);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getList

//
//
function newTaskFunc( taskObject ){
  console.log( 'in newTaksFunc', taskObject );
  // ajax call to server to get tasks
  $.ajax({
    url: '/todo',
    type: 'POST',
    data: taskObject,
    success: function (){
      getList();
    }
  });//end ajax
}

function appendToDom(item) {
  // Remove tasks that are done
  $('#theList').empty();
  console.log('append is running:', item);
  for(var i = 0; i < item.length; i ++) {
    var list = item[i];

    $tr = $('<tr></tr>');
    $tr.data('list', list);
    $tr.append('<td>' + list.task + '</td>');
    $tr.append('<td></td>');
    if (!list.complete) {
    $tr.append('<td><button class="completeTaskBtn" data-listid= "' + list.id + '">Complete</button></td>');
  } else {
      $tr.append('<td><button class="completed" data-listid= "' + list.id + '">Complete</button></td>');
  }
    $tr.append('<td><button class="deleteTaskBtn" data-listid= "' + list.id + '">Delete</button></td>');
    $('#theList').append($tr);
  }
} // end of appendToDom
