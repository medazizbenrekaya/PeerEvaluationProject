var express = require('express')
var router = express.Router()
var workshop = require('../models/workshop');
var user = require('../models/user');
var nodemailer = require("nodemailer");
//var moment=require('moment')

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

// router.post("/reserver", (req, res) => {
//     workshop.findOne({_id: req.body.idws}).then( ws => {
//         user.findOne({_id:req.body.ide}).then(t=> {
//             ws.etudiants.forEach(e => {
//                 if (e == req.body.ide) {
//                     res.json("alrady exist")
//                 } else if (ws.nbplace === 0) {
//                     res.json("il n'y a pas des places")
//                 } else if (Date.parse(ws.datefin.toString())<Date.now()) {
//                     res.json("terminer")
//                 } else {
//                     ws.etudiants.push(t)
//                     ws.nbplace--
//                     ws.save()
//
//                     var smtpTransport = nodemailer.createTransport({
//                         service: 'Gmail',
//                         auth: {
//                             user: 'benzarb34@gmail.com',
//                             pass: '50502450'
//                         }
//                     });
//                     var mailOptions = {
//                         to: t.email,
//                         from: 'peer@gmail.com',
//                         subject: 'reservation made',
//                         text: '\n' +
//                             'your reservation has been accepted for' + ws.nom + '\n\n' +
//                             'will begin in :' + ws.datedebut + '\n\n' +
//                             'will finish in :' + ws.datefin + '\n\n'
//                     };
//                     smtpTransport.sendMail(mailOptions, function (err) {
//                         console.log('mail sent');
//
//                     });
//
//                     res.json("réservation effectuer")
//                 }
//             })
//         })
//         })
// });
router.post("/reserver", (req, res) => {
    var x = new Boolean(true)
    workshop.findOne({_id: req.body.idws}).then( ws => {
        user.findOne({_id:req.body.ide}).then(t=> {
            ws.etudiants.forEach(e => {
                if (e.equals(t._id)) {

                    x = false
              }
            })
            console.log(ws.etudiants.length)
            if(ws.nbplace == 0)
                res.json("il n'ya plus de place")
            if(x == false && ws.nbplace != 0)
                res.json('USER EXIST')
            if(x == true && ws.nbplace != 0 ){
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
                            subject: 'reservation made',
                            text: '\n' +
                                'your reservation has been accepted for' + ws.nom + '\n\n' +
                                'will begin in :' + ws.datedebut + '\n\n' +
                                'will finish in :' + ws.datefin + '\n\n'
                        };
                        smtpTransport.sendMail(mailOptions, function (err) {
                            console.log('mail sent');

                        });
                        res.json("réservation effectuer")


                }
})})});
router.post('/delete/:id', function(req, res, next) {
    workshop.remove({ _id : req.params.id } , function (err, obj) {
        if (err) throw err;
    });

});
router.post("/nom", (req, res) => {
   workshop.find({nom: new RegExp(req.body.nom, 'i')}, (err, c) => {
        if (err)
            res.json(err)
        else
            res.json(c)
    })
})
router.get("/allworkshop", (req, res) => {
    workshop.find((err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)

            })

})

router.get("/MyWS/:id", (req, res) => {
    workshop.find({etudiants : req.params.id},(err, c) => {

        if(err)
            res.json(err)
        else
            res.json(c)

    })

})



module.exports = router;
