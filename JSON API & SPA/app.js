const express = require('express');
let app = express();

require('dotenv').config();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

let todoRoutes = require('./routes/todos');

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("APP IS RUNNING");
});

