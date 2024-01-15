const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

// Genel olarak herhangi bir veritabanına bağlı değil veriler bellekte duruyor.
// Burada todos içerisinde hazır kayıtlı veriler mevcut.
// Yani aslında veritabanımız burası ama veriler belleğe kayıt ediliyor.
let todos = [
  {
    id: nanoid(),
    title: 'todo 1',
    completed: true,
  },
  {
    id: nanoid(),
    title: 'todo 2',
    completed: false,
  },
  {
    id: nanoid(),
    title: 'todo 3',
    completed: false,
  },
  {
    id: nanoid(),
    title: 'todo 4',
    completed: false,
  },
  {
    id: nanoid(),
    title: 'todo 5',
    completed: false,
  },
];


// Buradaki endpointte aslında todos içerisindeki dataları dönderiyor.
app.get('/todos', (req, res) => res.send(todos));

// Buradaki endpointte post ile Todos veritabanına veri ekleniyor.
app.post('/todos', (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

// Buradaki endpointte patch ile Todos içerisinde kayıtlı olan veriler id'sine göre completed yapısını değiştirebiliyoruz.
// Yani buradaki patch(put gibi) ile veri güncelleme işlemi yapıyoruz.
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

// Burdaki endpointte ise delete ile Todos içerisinde verileri id'sine göre silebiliyoruz.
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

app.patch('todos', (req, res) => {
  const completed = Boolean(req.body.completed);
  todos = todos.map((todo) => {
    todo.completed = completed;
    return todo;
  });
  return res.send(todos);
})

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));