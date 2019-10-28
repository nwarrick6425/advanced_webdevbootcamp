const mongoose = require('mongoose');
const user = process.env.USER;
const pass = process.env.PASS;
const uri = "mongodb+srv://" + user + ":" + pass + "@todos-api-data-b3akl.gcp.mongodb.net/test?retryWrites=true&w=majority;"
mongoose.connect(uri, {useNewUrlParser: true});
mongoose.Promise = Promise;

module.exports.Todo = require('./Todo');