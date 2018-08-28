define(['react', 'react-dom', './components/TodoList'], function(
  React,
  ReactDOM,
  TodoList
) {
  ReactDOM.render(
    React.createElement(TodoList),
    document.getElementById('root')
  );
});
