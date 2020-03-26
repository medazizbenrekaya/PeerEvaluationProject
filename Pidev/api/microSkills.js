var express = require('express');
var router = express.Router();
var microSkills = require('../models/microSkills.js');

router.post("/Ajout", (req, res) => {
    microSkills.findOne({ nom: req.body.nom }).then(microskills => {
        if (!microskills) {
            var microskills = new microSkills({
                nom : req.body.nom,
                description : req.body.description,
                macroSkills: req.body.macroSkills,

            });

            microskills.save((err, microskills) => {
                if (err) res.json(err);
                else res.json(microskills);
            });
        }else {
            res.json({error : "micro skills already used"})
        }
    });
});


router.get("/Afficher",(req,res,next)=>{
    microSkills.find((err,microSkills)=>{
        if(err) res.json(err)
        else res.json(microSkills)
    })
})

router.post('/update', function(req, res) {
    microSkills.findOneAndUpdate({_id : req.body._id } , req.body , { res: true} , function (err,microSkills) {
        if (err) res.json(err)
        else res.json(microSkills)
    });

});

module.exports = router;
