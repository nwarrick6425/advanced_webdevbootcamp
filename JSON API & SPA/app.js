const express = require('express'),
    app = express();

require('dotenv').config();

const todoRoutes = require('./routes/todos');

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.use('/api/todos', todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("APP IS RUNNING");
});

