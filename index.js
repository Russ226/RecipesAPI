var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());



app.use(express.static(path.join(__dirname, 'public')));
app.use(require("./views/recipeRoutes.js"));



app.listen(3000,function(){
  console.log("Started on PORT 3000");
});
