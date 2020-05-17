var mongoose = require('mongoose')
var etudiant = require('./user').schema
var workshopSchema = new mongoose.Schema({
    nom : {type : String , trim : true},
    description : {type : String},
    datedebut:{type : Date},
    datefin:{type : Date},
    nbplace:{type : Number},
    nbrplacefinal: {type : Number},
    etudiants :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'etudiant', default: null
    }],


})
module.exports = mongoose.model('workshop',workshopSchema)
