var express = require('express')
var router = express.Router()
var Team = require('../models/team');
var user = require('../models/user');
var project= require('../models/project')
var project2= require('../models/project')
var micro = require('../models/microskills')




router.get("/",(req,res,next)=>{
   project.find({},{nom:1,_id:0},(err,users)=>{
        if(err) res.json(err)
        else res.json(users)
    })
})
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
                t.team.members.forEach( (a,i) => {
                    i = i + 1
                    micro.findOne({nom:req.body.mic},(err,m) => {
                        a.microskills.push(m)
                            a.microskills.save
                            a.save
                            if(i == t.team.members.length  ){
                                project2.findOneAndUpdate({ nom : req.body.name}, t, { new : true,useFindAndModify: false},(err,t) => {res.json('done')})
                            }
                    })
                })
            })


})

router.post("/Best", (req, res) => {

    var Tab = []
    project.findOne({nom: req.body.name}, (err, t) => {
            var index = 0
        t.team.members.forEach( async arr => {
            index = index  + 1
                arr.microskills.forEach(n => {
                    if (n.nom === req.body.mic){
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
                            console.log(s, t)
                            console.log(total)
                            note = total + note
                            s = 0
                            t = 0
                            console.log(note)
                        }


                    })
                    var x = {
                        user: arr.nom + ' ' + arr.prenom,
                        note: note
                    };

                    Tab.push(x)
                    Tab.save
                }
                });
              if( index === t.team.members.length )
              {
                  Tab.sort(function (a,b) {
                      return b.note - a.note

                  })
                  res.json(Tab)}

        })


        // Tab.sort(function (a,b) {
        //     return a.microskills[req.body.mic] - b.microskills[req.body.mic]
        //
        // })
        // res.json(Tab)


    })




})

































module.exports = router;
