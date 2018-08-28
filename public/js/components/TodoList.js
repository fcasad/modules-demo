define(['react', '../api', './Todo', './AddTodo'], function(
  React,
  api,
  Todo,
  AddTodo
) {
  var TodoList = React.createClass({
    getInitialState: function() {
      return { todos: [], didFetch: false };
    },
    componentDidMount: function() {
      this.pullTodos();
    },
    pullTodos: function() {
      var setState = this.setState.bind(this);
      api.getTodos(function(todos) {
        setState({ todos: todos, didFetch: true });
      });
    },
    toggleTodo: function(id, completed) {
      var setState = this.setState.bind(this);
      setState({ didFetch: false });
      var ctx = this;
      api.updateTodo(id, { completed: completed }, function(updatedTodo) {
        var newTodos = ctx.state.todos.map(function(todo) {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
        setState({ todos: newTodos, didFetch: true });
      });
    },
    deleteTodo: function(id) {
      var setState = this.setState.bind(this);
      setState({ didFetch: false });
      var ctx = this;
      api.deleteTodo(id, function() {
        var newTodos = ctx.state.todos.filter(function(todo) {
          return todo.id !== id;
        });
        setState({ todos: newTodos, didFetch: true });
      });
    },
    addTodo: function(todo) {
      var setState = this.setState.bind(this);
      setState({ didFetch: false });
      var ctx = this;
      api.addTodo(todo, function(todo) {
        var newTodos = ctx.state.todos.concat(todo);
        setState({ todos: newTodos, didFetch: true });
      });
    },
    render: function() {
      var toggleTodo = this.toggleTodo;
      var deleteTodo = this.deleteTodo;
      var addTodo = this.addTodo;
      return React.createElement(
        'ul',
        { className: 'todo-list' },
        this.state.didFetch
          ? this.state.todos.map(function(todo) {
              return React.createElement(Todo, {
                key: 'todo' + todo.id,
                todo: todo,
                onToggle: toggleTodo,
                onDelete: deleteTodo,
              });
            })
          : 'Loading...',
        React.createElement(AddTodo, { onAdd: addTodo })
      );
    },
  });

  return TodoList;
});
