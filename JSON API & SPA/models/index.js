const mongoose = require('mongoose');
let username = process.env.username;
let password = process.env.password;
const uri = "mongodb+srv://" + username + ":" + password + "@todos-api-data-b3akl.gcp.mongodb.net/test?retryWrites=true&w=majority;"
mongoose.set('debug', true);
mongoose.connect(uri);
mongoose.Promise = Promise;

module.exports.Todo = require('./Todo');