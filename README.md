

<h2 align="center">🚀 First Challenge by Rocketseat</h2>
<h5 align="center">Ignite - <a href="https://rocketseat.com.br/" >Rocketseat</a> - Node js</h5>


## 💻 Description

Development of ToDo application with Express. 

## 🛠️ Features

- create new `user` with `name` and `username`
- create new `todo`
- Get all `todos`;
- Update `title` and `deadline`of an existent `todo`;
- Mark `todo` as done;
- Delete `todo`;

## ✅ Requirements

- [x] It should be possible to create a `user`
- [x] It should be possibleto get `user`
- [x] It should be possible to create a `todo`
- [x] It should be possible to update a `todo`
- [x] It should be possible to check `todo` as DONE
- [x] It should be possible to delete a `user`
- [x] It should be possible to delete a `todo`

## 📋 Business Rules

- [x] It shouldn't be possible to create `user` with the same username
- [x] It shouldn't be possible to create a `todo` with previously date
- [x] It shouldn't be possible to update a non existent `todo`
- [x] It shouldn't be possible to check a non existent `todo` as DONE
- [x] It shouldn't be possible to delete a non existent `user`
- [x] It shouldn't be possible to delete a non existent `todo`
## 🔗 Routes

- POST `/users` → create new `user`.
- GET `/users/:id` → get `user` by id.
- PATCH `/users/:id/pro` → update `user's` plan to PRO.
- GET `/todos` → get all `user's` `todos`.
- POST `/todos` → create new `todo`.
- PUT `/todos/:id` → update `todo`.
- PATCH `/todos/:id/done` → update `todo` as `done`.
- DELETE `/todos/:id` → delete `todo` by `id`

### 📝 Clone

To clone the repository execute `git clone https://github.com/fermlisboa/todo-challenge-ignite.git`.

### 🕮 Installation

Execute `yarn` to install all dependencies.

#### Get Start

With all dependencies installed, execute `yarn dev` to execute your application. Run`yarn test` to execute tests.