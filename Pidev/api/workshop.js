var express = require('express')
var router = express.Router()
var workshop = require('../models/workshop');
var user = require('../models/user');
var nodemailer = require("nodemailer");

router.post("/ajouter", (req, res) => {
    workshop.findOne({nom: req.body.nom}).then(work => {
        if(!work){
    var p = new workshop(req.body);
    p.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    })
        } else {
            res.json("workshop already exist")
        }
    })
})

router.post("/reserver", (req, res) => {
    workshop.findOne({_id: req.body.idws}).then(ws => {
             user.findOne({_id: req.body.id}).then(t => {
                 // ws.etudiants.forEach(e=>{
                 //     if(e._id===t._id){
                 //         res.json("déjà inscrit")
                 //     }
                 //     else
                        if(ws.nbplace===0){
                         res.json("il n'y a pas des places")
                     }
                     else if(ws.datefin<Date.now()){
                         res.json("terminer")
                     }
                     else  {
                         ws.etudiants.push(t)
                         ws.nbplace--
                         ws.save()

                                    var smtpTransport = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: 'benzarb34@gmail.com',
                                            pass: '50502450'
                                        }
                                    });
                                    var mailOptions = {
                                        to: t.email,
                                        from: 'peer@gmail.com',
                                        subject:'reservation made',
                                        text: '\n' +
                                            'your reservation has been accepted for'+ws.nom+'\n\n'+
                                            'will begin in :'+ws.datedebut+'\n\n'+
                                            'will finish in :'+ws.datefin+'\n\n'
                                    };
                                    smtpTransport.sendMail(mailOptions, function(err) {
                                        console.log('mail sent');

                                    });

                         res.json("réservation effectuer")
                     }
                 // })

                })
    })
});

router.post('/delete', function(req, res, next) {
    workshop.findOne({_id: req.body.id} , function (err,u) {

        u.remove(u);
        res.status(200).json("votre demande refuser")
    });

});

router.get("/allworkshop", (req, res) => {
    workshop.find((err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)

            })

})
module.exports = router;
