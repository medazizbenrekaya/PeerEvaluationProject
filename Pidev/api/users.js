var express = require('express')
var router = express.Router()
var jwt = require("jsonwebtoken");
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var User = require('../models/user.js');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

router.post("/",(req,res)=>{
  var user = new User(req.body)
  user.save((err,user)=>{
    if(err) res.json(err);
    else res.json(user);
  })
})

router.get("/",(req,res,next)=>{
  User.find((err,users)=>{
    if(err) res.json(err)
    else res.json(users)
  })
})

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      var user = new User({
        nom : req.body.nom,
        prenom : req.body.prenom,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        role : req.body.role
      });
      user.save((err, user) => {
        if (err) res.json(err);
        else res.json(user);
      });
    }else {
      res.json({error : " User already exist"})
    }
  });
});

router.post('/login',(req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if(err) res.json(err)
    if(!user) res.json({error : "verifier vos paramétres"});
    else {
      if(bcrypt.compareSync(req.body.password,user.password)){
        var token = jwt.sign({user},'secret',{expiresIn:3600})
        res.json(token)
      }else{
        res.status(401).json("Mot de passe incorrecte")
      }
    }
  })
})

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          res.status(401).json("email n'existe pas")
        }
        user.resetPasswordToken = token;

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'adembenzarb@gmail.com',
          pass: 'Adem50502450'
        }
      });
      //https://myaccount.google.com/lesssecureapps
      var mailOptions = {
        to: user.email,
        from: 'azizbenrekaya@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n'
            + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.status(200).json("An e-mail has been sent to " + user.email + "with further instructions.")
        console.log('mail sent');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

/*router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});*/

router.post('/reset/', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({resetPasswordToken: req.body.token}, function(err, user) {
        if (!user) {
         res.status(401).json("email n'existe pas")
        }
        user.password= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        user.save((err, user) => {
          if (err) res.json(err);
          else res.json(user);
        });
        res.status(200).json("c bon")
        // user.setPassword(req.body.password, function(err) {
        //     user.resetPasswordToken = undefined;
        //     user.save(function(err) {
        //       req.logIn(user, function(err) {
        //         done(err, user);
        //       });
        //     });
        //   })


      });
    },
    // function(user, done) {
    //   var smtpTransport = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: user.email,
    //       pass: user.password
    //     }
    //   });
    //   var mailOptions = {
    //     to: user.email,
    //     from: 'adembenzarb@gmail.com',
    //     subject: 'Your password has been changed',
    //     text: 'Hello,\n\n' +
    //         'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    //   };
    //   smtpTransport.sendMail(mailOptions, function(err) {
    //
    //     res.status(200).json("Success! Your password has been changed.")
    //   });
    // }
  ], function(err) {
  });
});


module.exports = router;
