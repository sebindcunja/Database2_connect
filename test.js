const { name } = require("ejs");
const express = require("express");
const mysql = require("mysql");

var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("styles"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "course",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

 
  app.post("/sign", (req, res) => {
    nam = req.body.nam;
    email = req.body.email;
    password = req.body.password;
    qual = req.body.qual;
    age = req.body.age;
    place = req.body.place;
  
  
    sql = "insert into list values(?,?,?,?,?,?,?)";
  
    con.query(sql, [0, nam,email,password,qual,age,place], (err, result) => {
      if (err) throw err;
  
      res.render("login");
    });
  });
  
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.post("/logact", (req, res) => {
    email = req.body.email;
    password = req.body.password;
    sql = "SELECT * FROM list WHERE email=? AND password=?";
  
    con.query(sql, [email, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.render("web");
      } else {
        res.send("login not successfull");
      }
    });
  });




app.listen(8086, () =>{
    console.log("http://localhost:8086/");
})