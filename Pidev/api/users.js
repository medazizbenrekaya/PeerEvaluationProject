var express = require('express')
var router = express.Router()
var jwt = require("jsonwebtoken");
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var User = require('../models/user.js');
var User2 = require('../models/user.js');
var async = require("async");
var ms = require('../models/microskills')
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var Team = require('../models/team');
var evaluation = require('../models/evaluation');
const { spawn } = require('child_process')

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
            'Please click on the following link http://localhost:3001/reset, and paste this code in the token placeholder that is in your browser to complete the process:\n\n'
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

router.post('/reset/', (req, res) =>{

      User.findOne({resetPasswordToken: req.body.token} ,(err,user)=> {
        if (!user) {
          res.status(401).json("email n'existe pas")
        }
        user.password= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        user.save();
        res.status(200).json("c bon")

      });
    }
  );




router.post("/getmembers", (req, res) => {


    User.findOne({email: req.body.email}, (err, u) => {
        console.log(u.team)
        Team.findOne({_id:u.team}, (err, c) => {
            res.status(200).json(c.members)
           });
    });
});
router.post("/TeamMembers2", async (req, res) => {
    var membres = []
    var str = String
   await User.findOne({email: req.body.email}, async (err, u) => {
        await Team.findOne({_id:u.team}, async (err, c) => {
            await c.members.forEach(async m => {
                if(m.email != req.body.email )
                {
                     await User2.find({email:m.email},async(err,u2) => {

                      await membres.push(u2)

                       console.log(membres)
                    })
                }
            })
        });
       res.status(200).json(membres)
    })
    ;
});
router.post("/TeamMembers", async (req, res) => {
    var membres = []
    var str = String
    await User.findOne({email: req.body.email}, async (err, u) => {
        await Team.findOne({_id:u.team}, async (err, c) => {
            await c.members.forEach(async m => {
                if(m.email != req.body.email )
                {
                 membres.push(m)
                }
            })
        });
        res.status(200).json(membres)
    })
    ;
});

router.post("/TeamName", (req, res) => {
    var str = String
    User.findOne({email: req.body.email}, (err, u) => {
        console.log(u.team)
        Team.findOne({_id:u.team}, (err, c) => {

            res.json(c.name)
            // res.status(200).json(c)
        });
    });
});



// router.post("/note/:id", (req, res) => {
//
//
//   User.findOne({email: req.body.email}, (err, u) => {
//
//
//     u.microskills.findOne({_id:req.params.id},(err,m) =>{
//       m.macroskills.forEach(function (r) {
//         if(r.nom == req.body.nom){
//           r.note = req.body.note
//           r.save()
//           m.save()
//           u.save()
//           res.json(200)
//         }
//         else
//           res.json(401)
//
//
//       })
//     })
//
//   });
//
// }
//
// )
router.post("/note",  (req, res) => {


    User.findOne({email: req.body.email},  (err, u) => {
        u.microskills.forEach(n => {
            if(n.nom == req.body.M){
                n.macroskills.forEach(m => {
                    if(m.nom == req.body.nom) {
                        evaluation = {
                            voteur: req.body.voteur,
                            note: req.body.note
                        };
                        m.notes.push(evaluation)
                        m.save()
                        n.save()
                        u.save()
                        res.status(200).json('done')
                    }

                })

            }

        });



       });
})

router.post('/update', function(req, res) {
    User.findOneAndUpdate({_id : req.body._id} , req.body , { res: true} , function (err,u) {
        if (err) res.json(err)
        else res.json(u)
    });

});


module.exports = router;
