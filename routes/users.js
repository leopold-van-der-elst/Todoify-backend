const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

router.post('/signup', (req, res) => {
  //Destructuring body request from frontend
  const {username, password} = req.body
  //Generate token
  const token = uid2(32);
  //Hashing password
  const hash = bcrypt.hashSync(password, 10);
  //Verify if input is not empty
  if(username === "" || password === "") {
    res.json({error: "Missing or empty field"})
  }
  else{
    User.findOne({username: username})
    .then(data => {
      //Make sure new user doesnt allready exist in db
      if(data === null){
          const newUser = new User({
          username: username,
          password: hash,
          token: token,
        })
        newUser.save().then(user => {
          res.json({result: true, user})
        })
      }
      else{
        res.json({result: false, error: "User already exists"})
      }
    })
  }
})

router.post('/signin', (req, res) => {
  //Destructuring body request from frontend
  const {username, password} = req.body
   //Verify if input is not empty
  if(username === "" || password === "") {
    res.json({error: "Missing or empty field"})
  }
  else{
    User.findOne({username: username})
    .then(user => {
      if(user === null){
        res.json({result: false, error: "Incorrect username or password"})
      }
      else if(bcrypt.compareSync(password, user.password)){
        res.json({result: true, user})
      }
      else{
        res.json({result: false, error: "Incorect username or password"})
      }
    })
  }
})



module.exports = router;
