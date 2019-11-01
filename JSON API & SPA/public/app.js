$(document).ready(function() {
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(err => {

  });
});

function addTodos(todos) {
  todos.forEach(todo => {
    let newTodo = $('<li class="task">' + todo.name + '</li>');
    if(todo.completed) {
      newTodo.addClass("done");
    }
    $('.list').append(newTodo);
  })
};