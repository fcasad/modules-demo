var todos = [
  { id: 1, name: 'Do dishes', completed: true },
  { id: 2, name: 'Call mom', completed: false },
];

module.exports = {
  getTodos: function(cb) {
    setTimeout(function() {
      cb(todos);
    }, 1000);
  },

  addTodo: function(todo, cb) {
    setTimeout(function() {
      todo.id = todos.length + 1;
      todos.push(todo);
      cb(todo);
    }, 1000);
  },

  updateTodo: function(id, updates, cb) {
    setTimeout(function() {
      var todo = todos.find(function(todo) {
        return todo.id === id;
      });
      if (todo) {
        for (var key in updates) {
          todo[key] = updates[key];
        }
        cb(todo);
      } else {
        cb(false);
      }
    }, 1000);
  },

  deleteTodo: function(id, cb) {
    setTimeout(function() {
      var index = todos.findIndex(function(todo) {
        return todo.id === id;
      });
      if (index !== -1) {
        todos.splice(index, 1);
        cb(true);
      } else {
        cb(false);
      }
    }, 1000);
  },
};
