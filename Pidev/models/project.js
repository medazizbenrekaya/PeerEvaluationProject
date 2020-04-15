var mongoose = require('mongoose')
var t = require('../models/team')
var projectSchema = new mongoose.Schema({
    nom : {type : String , trim : true},
    description : {type : String},
    team: t
})
// var u1 = mongoose.model('User', userSchema);
// u1.create({ nom:'aziz',prenom:'aziz',password:'aziz',email:'aziz'}, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });
module.exports = mongoose.model('Project',projectSchema)
