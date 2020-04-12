var express = require('express')
var router = express.Router()
var user = require('../models/user')
var ms = require('../models/microskills')







router.post("/ajouterMS", (req, res) => {
    var micro = new ms(req.body);
    micro.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});

router.post("/accepter/:id", (req, res) => {
    var x = true

    user.findOne({email: req.body.email}, (err, u) => {
        ms.findOne({_id: req.params.id}, (err, c) => {

            u.microskills.forEach(function (ee) {
                if(ee.id==c.id){
                    x=false;

                }

            })


            if(x==false)
                res.status(401).json({info :"Vous l'avez déja"})

            else{
                u.microskills.push(c)
                u.save()
                console.log(c)
                u.save(function (err) {
                    if (err)
                        console.log('error')
                    else
                        res.json('success')
                });
            }});
    });
})

router.post("/type", (req, res) => {

    ms.find({type : req.body.type},(err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)
    });

})
router.post("/nom", (req, res) => {

    ms.find({nom : req.body.nom},(err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)
    });

})

router.get("/Afficher",(req,res,next)=>{
    ms.find((err,microSkills)=>{
        if(err) res.json(err)
        else res.json(microSkills)
    })
})
router.get("/details/:id", (req, res) => {
    var x = true


    ms.findOne({_id: req.params.id}, (err, c) => {

        if(c)
            res.json(c.macroskills)
        else
            res.status(401).json(' Introuvable')
    });

})

router.post("/find", (req, res) => {
    var x = true


    ms.findOne({nom: req.body.nom}, (err, c) => {

        if(c)
            res.json(c.macroskills)
        else
            res.status(401).json(' Introuvable')
    });

})

router.post("/find/:nom", (req, res) => {
    var x = true


    ms.findOne({nom: req.params.nom}, (err, c) => {

        if(c)
            res.json(c.macroskills)
        else
            res.status(401).json(' Introuvable')
    });

})




router.get("/details/:id", (req, res) => {
    var x = true


    ms.findOne({_id: req.params.id}, (err, c) => {

        if(c)
            res.json(c.macroskills)
        else
            res.status(401).json(' Introuvable')
    });

})

router.post('/update', function(req, res) {
    ms.findOneAndUpdate({_id : req.body._id } , req.body , { res: true} , function (err,microSkills) {
        if (err) res.json(err)
        else res.json(microSkills)
    });

});


























module.exports = router;
