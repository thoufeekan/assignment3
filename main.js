// Callback function for login
function login(callback) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      if (username === 'admin' && password === '12345') {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
  
  // Main function
  function main() {
    // Login functionality
    login(function(success) {
      if (success) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        loadTodoList();
      } else {
        alert('Invalid username or password');
      }
    });
  
    // Logout functionality
    document.getElementById('logoutLink').addEventListener('click', function(event) {
      event.preventDefault();
      document.getElementById('mainPage').style.display = 'none';
      document.getElementById('loginPage').style.display = 'block';
    });
  
    // Todo list selection
    document.getElementById('todoList').addEventListener('click', function(event) {
      if (event.target.type === 'checkbox') {
        event.target.parentNode.classList.toggle('completed');
        checkCompletion();
      }
    });
  }
  
  // Load todo list from API
  function loadTodoList() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        var completedTasks = data.filter(todo => todo.completed);
        document.getElementById('todoList').innerHTML = '';
        data.forEach(todo => {
          var li = document.createElement('li');
          li.className = 'list-group-item';
          var checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = todo.completed;
          li.appendChild(checkbox);
          var label = document.createElement('label');
          label.textContent = todo.title;
          li.appendChild(label);
          document.getElementById('todoList').appendChild(li);
        });
        checkCompletion();
        document.getElementById('todoListPage').style.display = 'block';
      })
      .catch(error => console.error('Error loading todo list:', error));
  }
  
  // Check if 5 tasks have been completed
  function checkCompletion() {
    var completedTasks = document.querySelectorAll('#todoList .completed').length;
    if (completedTasks === 5) {
      alert('Congrats. 5 Tasks have been Successfully Completed');
    }
  }
  
  // Call the main function when the DOM is loaded
  document.addEventListener('DOMContentLoaded', main);
  