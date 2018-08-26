var Todo = React.createClass({
  getDefaultProps: function() {
    return { 
      todo: {},
      onToggle: function() {},
      onDelete: function() {}
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
        onChange: this.onToggle 
      }),
      React.createElement('span', null, this.props.todo.name.toUpperCase()),
      React.createElement('button', { onClick: this.onDelete }, 'X')
    );
  }
});