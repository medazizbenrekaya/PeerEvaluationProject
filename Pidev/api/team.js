var express = require('express')
var router = express.Router()
var Team = require('../models/team');
var user = require('../models/user')
var micro = require('../models/microskills')




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
router.get("/Afficher",(req,res,next)=>{
    Team.find((err,team)=>{
        if(err) res.json(err)
        else res.json(team)
    })
})
router.post("/accepter2/:id", (req, res) => {
    var x = true

    project.findOne({_id: req.body.id}, (err, u) => {
        Team.findOne({_id: req.params.id}, (err, c) => {

            c.projects.forEach(function (ee) {
                if(ee.id==u.id){
                    x=false;

                }

            })


            if(x==false)
                res.status(401).json({info :"tu est deja dans le projet"})

            else{
                u.team = c._id
                u.save()
                c.projects.push(u)
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

router.post("/affecter", (req, res) => {
    tab=req.body.teams
   // console.log(tab)
    tab.forEach(function (e) {
        Team.findOne({name: e.name}, (err, t) => {
            t.members.forEach(function (a) {
                user.findOne({email: a.email}, (err, tes) => {
                    var x  = false
                    micro = req.body.micro
                    tes.microskills.forEach(function (aaa) {
                        if(aaa.nom == micro.nom)

                            x = true
                    })
                 if(x===false) {
                tes.microskills.push(micro)

                    tes.save() }

                })
                micro = req.body.micro
                a.microskills.push(micro)
                a.save()

                //console.log(a)

            })
            t.save()
              // console.log(t)
        })
        //console.log(e)

    })
    res.status(200).json(tab)
})

module.exports = router;
