var express = require ('express');
var app = express();
var users = require ("./routes/users.js");
var index = require ("./routes/index.js");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);
app.use("/users", users);

app.listen(3000);