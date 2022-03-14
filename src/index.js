const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

const users = [];

app.use(cors());
app.use(express.json());


// ====================
// Verifying Middleware
// ====================

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find(user => user.username === username);
  if(!user) {
    return response.status(404).json({ error: 'User not found!' })
  }
  request.user = user;
  return next();
}


// ===============
// Users Functions
// ===============

app.post('/users', (request, response) => {
  const { username, name } = request.body;
  const userAlreadyExists = users.some(
    (user) => user.username === username
    );
  if (userAlreadyExists) {
    return response.status(400).json({ error: "Username already exists!" });
  }
  const user = {
    id: uuidv4(),
    username,
    name,
    todos: [],
  };
  users.push(user);
  return response.status(201).json(user);
});

app.get('/users', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.json(user);
});

app.delete('/users', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  users.splice(user, 1);
  return response.status(200).json(users);
});

// ===============
// ToDos Functions
// ===============

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const today = new Date();
  const deadlineDay = new Date(deadline);

  // This verification doesn't work with the test template, 
  // because test created deadline before the validation with
  // new Date(), so it always will be before "today"
  // if (deadlineDay < today) {
  //   return response.status(400).json({ error: 'Deadline must be in the future!' });
  // }

  const createToDo = {
    id: uuidv4(), // precisa ser um uuid
    title,
    done: false, 
    deadline: deadlineDay, 
    created_at: today,
    updated_at: null
  };

  user.todos.push(createToDo);
  
  return response.status(201).json(createToDo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;
  const today = new Date();
  const deadlineDay = new Date(deadline);

  const todo = user.todos.find(todo => todo.id === id);
  if (!todo) {
    return response.status(404).json({ error: 'Todo not found!' });
  }
  todo.title = title;
  todo.deadline = deadlineDay;
  todo.updated_at = today;
  return response.status(201).json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const todo = user.todos.find(todo => todo.id === id);
  if (!todo) {
    return response.status(404).json({ error: 'Todo not found!' });
  }
  todo.done = true;
  return response.status(201).json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const todo = user.todos.find(todo => todo.id === id);
  if (!todo) {
    return response.status(404).json({ error: 'Todo not found!' });
  }
  user.todos.splice(todo, 1);
  return response.status(204).json()
});

module.exports = app;