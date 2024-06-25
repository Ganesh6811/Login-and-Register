import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"world",
  password:"Ganesh@6811",
  port:5432
});

db.connect();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email=req.body.email;
  const password=req.body.password;
  let chackans= await db.query("select * from users where email = $1",[email]);
  if(chackans.rows.length > 0){
    res.send("Already registered with this ID Please try again");
  }
  else{
     db.query("Insert into users (email,password) values ($1,$2)",[email,password]);
  }
  res.render("secrets.ejs");
});

app.post("/login", async (req, res) => {
  const email=req.body.email;
  const password=req.body.password;
  let checkans= await db.query("select * from users where email = $1 AND password = $2",[email,password]);
  if(checkans.rows.length > 0){
    res.render("secrets.ejs");
  }
  else{
    res.render("login.ejs")
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
