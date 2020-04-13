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
var Project = require('../models/project');
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

router.post("/TeamName", async(req, res) => {
    var str = String
   await User.findOne({email: req.body.email}, async (err, u) => {
        console.log(u.team)
        Team.findOne({_id:u.team}, (err, c) => {

            res.json(c.name)
            // res.status(200).json(c)
        });
    });
});

router.post("/projects",async (req, res) => {

   await User.findOne({email: req.body.email}, async(err, u) => {
         var projects=[]
       await u.projet.forEach( async pr => {
           console.log(pr)
           projects.push(pr)
           projects.save
       });

         var names=[]
       for(i=0;i<projects.length;i++){
           var l = projects.length
           console.log(l)


           await Project.findOne({_id:projects[i]}).then(px=>{names.push(px.nom);names.save;console.log(names)
                   if( i === projects.length - 1) {
                       res.json(names)
                   }
           }

           )

       }



    })


});

router.post("/note",  (req, res) => {
    Project.findOneAndUpdate({nom:req.body.project} ,(err,proj) => {
        proj.team.members.forEach( async arr => {
         if(arr.email == req.body.email) {
             await  arr.microskills.forEach(n => {
                 if (n.nom == req.body.M) {
                     n.macroskills.forEach(async m => {
                         if (m.nom == req.body.nom) {
                             evaluation = {
                                 voteur: req.body.voteur,
                                 note: req.body.note
                             };
                             m.notes.push(evaluation)
                             console.log(m.notes)
                             arr.microskills.macroskills = m
                             arr.microskills = n
                           await  proj.save()
                             res.status(200).json('done')
                         }
                     })
                 }
             });
         }
     })
 })
    ;
})

router.post('/update', function(req, res) {
    User.findOneAndUpdate({_id : req.body._id} , req.body , { res: true} , function (err,u) {
        if (err) res.json(err)
        else res.json(u)
    });

});

router.post("/stats",  (req, res) => {
    var tab = []
    User.findOne({email: req.body.email},  (err, u) => {
        u.microskills.forEach(n => {
                var microskill = n.nom
                var note = new Number(0)
            var t = 0
            var s = 0

                    n.macroskills.forEach(m => {

                        var total = new Number(0)
                        if (m.notes.length !== 0) {
                        m.notes.forEach(e => {

                            t = t + 1
                            s = s + e.note
                        })
                            total = total + (s / t)
                            console.log(s,t)
                            console.log(total)
                            note =  total + note
                            s=0
                            t=0
                            console.log(note)
                        }



    })
            var x = {
                micro : microskill,
                note: note
            };

                tab.push(x)
            tab.save});
        res.status(200).json(tab)
    });
})



module.exports = router;
