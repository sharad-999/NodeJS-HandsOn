const Customer = require('../models/User')
const bcrypt = require('bcrypt')

function authController() {
  return {
    home(req,res){
      res.render('home')
    },
    login(req, res) {
      res.render('login')
    },
    register(req, res) {
      res.render('signup')
    },
    async custregister(req, res) {
      const { name, email, password, confirmpassword } = req.body
      //validate request
      if (!name || !email || !password || !confirmpassword) {
        req.flash('error', 'All fields are required')
        return res.redirect('/signup')
      }
      if (await Customer.findOne({ email: email })) {
        req.flash('error', 'Email is already in use')
        return res.redirect('/signup')
      }
      if (password.length < 8) {
        req.flash('error', 'Password is too small')
        return res.redirect('/signup')
      }
      // if (password != confirmpassword) {
      //   req.flash('error', 'password is not matching')
      //   return res.redirect('/signup')
      // }
      const hashpassword = await bcrypt.hash(password, 10)
      const user = new Customer({
        name: name,
        email: email,
        password: hashpassword
      })
      user.save().then((user) => {
        //login
        console.log(user);
        return res.redirect('/login')
      }).catch(err => {
        console.log(err);
        req.flash('error', 'something went wrong')
        return res.redirect('/signup')
      })
    },
    logout(req, res) {
      req.logout()
      req.session.destroy((err) => res.redirect('/'));
    },
  }
}
module.exports = authController