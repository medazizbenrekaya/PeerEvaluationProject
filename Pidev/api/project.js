var express = require('express')
var router = express.Router()
var Team = require('../models/team');
var user = require('../models/user');
var project= require('../models/project')
var project2= require('../models/project')
var micro = require('../models/microskills')




router.post("/ajouter", (req, res) => {
    var p = new project(req.body);
    p.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});
router.post("/nom", (req, res) => {

    project.find({$or: [ {'team.name':  new RegExp(req.body.nom , 'i')} , {nom : new RegExp(req.body.nom , 'i')} ] },(err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)
    });

})

router.post("/addteam", (req, res) => {
// ajout de l'id project dans chaque user de la team spécifiée
    Team.findOne({name:req.body.name}).then(t => {
        t.members.forEach(m => {
           user.findOne({_id:m._id}).then(u=>{
               u.projet.push(req.body.idprojet)
               u.save()
           })
        })
    })
// ajout de la team dans le projet
    project.findOne({_id:req.body.idprojet}).then(pro =>{
        Team.findOne({name:req.body.name}).then(t => {
            pro.team = t
            pro.save()
            res.json(pro)
        })
        // pro.team = Team
        // pro.save()
        // res.json(pro)
    })


});
router.post("/get", (req, res) => {

    project.findOne({nom:req.body.nom}).then(pro =>{
     res.json(pro)
        // pro.team = Team
        // pro.save()
        // res.json(pro)
    })


});

router.get("/allProject", (req, res) => {

    project.find((err, c) => {
            res.json(c)
    });

})

router.post("/verifvoteur",  (req, res) => {
    project.findOne({nom:req.body.project} ,(err,proj) => {
        var verif = true
        console.log(proj)
        proj.team.members.forEach( async arr => {
            if(arr.email === req.body.email) {
                await  arr.microskills.forEach(n => {

                        n.macroskills.forEach(async m => {
                            m.notes.forEach(notes => {
                                if(notes.voteur === req.body.voteur)
                                    verif = false


                            })
                        })

                });
            }
        })

        res.json(verif)


    })



})

router.post("/affecter", (req, res) => {


    project.findOne({nom: req.body.name}, (err, t) => {

            t.team.members.forEach( a => {
                     micro.findOne({nom:req.body.mic},(err,m) => {
                      a.microskills.push(m)

                console.log(a.microskills)

                })
                a.microskills.save
                a.save
           })
        t.save()

        project2.findOneAndUpdate({ nom : req.body.name}, t, { new : true},(err,proj) => {res.json('done')})
                })




})

































module.exports = router;
