import React from 'react';

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

export default AddTodo;
