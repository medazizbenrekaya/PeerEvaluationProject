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



























module.exports = router;
