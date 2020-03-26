var express = require('express')
var router = express.Router()
var Team = require('../models/team');
var user = require('../models/user')




router.post("/ajouter", (req, res) => {
    var team = new Team(req.body);
    team.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});



router.post("/accepter/:id", (req, res) => {
    var x = true

    user.findOne({email: req.body.email}, (err, u) => {
        Team.findOne({_id: req.params.id}, (err, c) => {

            c.members.forEach(function (ee) {
                if(ee.id==u.id){
                    x=false;

                }

            })


            if(x==false)
                res.status(401).json({info :"tu est deja dans la team"})

            else{
                u.team = c._id
                u.save()
                c.members.push(u)
                console.log(c)
                c.save(function (err) {
                    if (err)
                        console.log('error')
                    else
                        res.json('success')
                });
            }});
    });
})
router.get("/getmembers/:id", (req, res) => {
    var x = true


        Team.findOne({_id: req.params.id}, (err, c) => {

          if(c)
              res.json(c.members)
            else
                res.status(401).json('Team Introuvable')
        });

})

router.post("/noter", (req, res) => {
    var x = true

    user.findOne({email: req.body.email}, (err, u) => {
        Team.findOne({_id: req.params.id}, (err, c) => {

            c.members.forEach(function (ee) {
                if(ee.id==u.id){
                    x=false;

                }

            })


            if(x==false)
                res.status(401).json({info :"tu est deja dans la team"})

            else{
                u.team = c._id
                u.save()
                c.members.push(u)
                console.log(c)
                c.save(function (err) {
                    if (err)
                        console.log('error')
                    else
                        res.json('success')
                });
            }});
    });
})


module.exports = router;
