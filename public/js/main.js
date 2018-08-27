(function(app) {
  ReactDOM.render(
    React.createElement(app.TodoList),
    document.getElementById('root')
  );
})(window.app || (window.app = {}));
