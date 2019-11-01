$(document).ready(function() {
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(err => {
    console.log(err.message);
  });

  $('#todoInput').keypress(event => {
    if(event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'span', function() {
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  todos.forEach(todo => {
    addTodo(todo);
  });
};

function addTodo(todo) {
  let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo() {
  let userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput})
  .then(newTodo => {
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(err => {
    console.log(err.message);
  })
};

function removeTodo(todo) {
  let clickedId = todo.data('id');
  let deleteURL = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteURL
  })
  .then(data => {
    todo.remove();
  })
  .catch(err => {
    console.log(err.message);
  })
}