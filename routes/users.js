var express = require('express');
var router = express.Router();

const User = require('../models/users')
const { checkBody } = require('../modules/checkBody');

router.post('/signup', (req, res) => {

  const {username, password} = req.body

  if(username != ''){

    User.findOne({username: username})
  .then(data => {
    if(data === null){
      const newUser = new User({
        username: username,
        password: password,
        token: "",
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
  else{
    res.json({error: "empty field"})
  }

})

module.exports = router;
