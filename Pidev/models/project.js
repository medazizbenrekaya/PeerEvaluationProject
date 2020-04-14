var mongoose = require('mongoose')
var Team = require('./team');
var projectSchema = new mongoose.Schema({
    name : {type : String , trim : true,required : true},
    description : {type : String},

})
module.exports = mongoose.model('Project',projectSchema)
