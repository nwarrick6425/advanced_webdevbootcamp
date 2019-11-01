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

  $('.list').on('click', 'span', function(event) {
    event.stopPropagation();
    removeTodo($(this).parent());
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
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
  newTodo.data('completed', todo.completed);
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
};

function updateTodo(todo) {
  let updateUrl = '/api/todos/' + todo.data('id');
  let isDone = !todo.data('completed');
  let updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(updatedTodo => {
    todo.toggleClass("done");
    todo.data('completed', isDone);
  });
};