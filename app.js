const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path =require('path')

const user=require('./models/User')

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// view engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

// database connection
require("./db/connection");


app.get('/', (req, res) => res.render('home'));
app.get('/login',(req,res)=>{
  res.render('login') 
})

app.get('/signup',(req,res)=>{
  res.render('signup') 
})

app.post("/signup", async (req, res) => {
  try {
    const Email = req.body.email;
    // console.log(Email);/
    if (!user.findOne({ Email })) {
      res.send("user already exist,try with new email");
    }
    else {
      const { name, email, password, cpassword } = req.body;
      if (password === cpassword) {
        const registerUser =  await new user({
          name,
          email,
          password
        });
        const registered = await registerUser.save();
        res.status(201).render("home");
      } else {
        console.log('Password not matching');
        res.render("signup");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
);
// app.use(authRoutes);
app.listen(3000,(req,res)=>{
  console.log('server is listening');
})