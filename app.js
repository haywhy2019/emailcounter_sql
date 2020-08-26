var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')); 

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "stutern2020",
  database: "join_us",
  insecureAuth: true,
});

app.get("/", (req, res) => {
  var q = "select count(*) as count from users";
  connection.query(q, (error, results) => {
    if (error) throw error;
    var count = results[0].count;
    res.render("home", { count: count });
  });
});

app.post("/register", (req, res) => {
  var person = {
    email: req.body.email
  };

  var q = "insert into users set?";
  connection.query(q, person, (error, results) => {
    if (error) throw error;
   res.redirect("/");
  });
});

app.get("/joke", (req, res) => {
  var joke = '<strong>"requestinng joke" </strong>';
  res.send(joke);
});

var port = 8080 || env.port
app.listen(port, () => console.log(`connected ${port}`));
