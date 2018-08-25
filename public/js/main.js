// API
var todos = [
  { id: 1, name: 'Do dishes', completed: true },
  { id: 2, name: 'Call mom', completed: false },
];

function getTodos(cb) {
  setTimeout(function() {
    cb(todos);
  }, 1000);
}

function addTodo(todo, cb) {
  setTimeout(function() {
    todo.id = todos.length + 1;
    todos.push(todo);
    cb(todo);
  }, 1000);
}

function updateTodo(id, updates, cb) {
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
}

function deleteTodo(id, cb) {
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
}

// Components
var Todo = React.createClass({
  getDefaultProps: function() {
    return {
      todo: {},
      onToggle: function() {},
      onDelete: function() {},
    };
  },
  onToggle: function(ev) {
    this.props.onToggle(this.props.todo.id, ev.target.checked);
  },
  onDelete: function(ev) {
    this.props.onDelete(this.props.todo.id);
  },
  render: function() {
    return React.createElement(
      'li',
      { className: this.props.todo.completed ? 'todo-completed' : 'todo' },
      React.createElement('input', {
        type: 'checkbox',
        checked: this.props.todo.completed,
        onChange: this.onToggle,
      }),
      React.createElement('span', null, this.props.todo.name.toUpperCase()),
      React.createElement('button', { onClick: this.onDelete }, 'X')
    );
  },
});

var AddTodo = React.createClass({
  getDefaultProps: function() {
    return { onAdd: function() {} };
  },
  getInitialState: function() {
    return { value: '' };
  },
  updateValue: function(ev) {
    this.setState({ value: ev.target.value });
  },
  submitValue: function(ev) {
    var todo = { name: this.state.value, completed: false };
    this.setState({ value: '' });
    this.props.onAdd(todo);
  },
  render: function() {
    return React.createElement(
      'div',
      { className: 'add-todo' },
      React.createElement('input', {
        value: this.state.value,
        onChange: this.updateValue,
      }),
      React.createElement('button', { onClick: this.submitValue }, 'Submit')
    );
  },
});

var TodoList = React.createClass({
  getInitialState: function() {
    return { todos: [], didFetch: false };
  },
  componentDidMount: function() {
    this.pullTodos();
  },
  pullTodos: function() {
    var setState = this.setState.bind(this);
    getTodos(function(todos) {
      setState({ todos: todos, didFetch: true });
    });
  },
  toggleTodo: function(id, completed) {
    var setState = this.setState.bind(this);
    setState({ didFetch: false });
    var ctx = this;
    updateTodo(id, { completed: completed }, function(updatedTodo) {
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
    deleteTodo(id, function() {
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
    addTodo(todo, function(todo) {
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

// Init
ReactDOM.render(React.createElement(TodoList), document.getElementById('root'));
