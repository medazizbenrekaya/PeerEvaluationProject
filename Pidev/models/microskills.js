var mongoose = require('mongoose')
var eval = require('./evaluation').schema
var MicroSkillsSchema = new mongoose.Schema({
    nom : {type : String , trim : true , required : true},
    description : {type:String },
    type : {type:String , required : true},
    etat: {type: Boolean , default: false},
    selfNote : {type: Number , default: null},
    macroskills : [{
        nom: {type: String, required: true},
        description: {type: String},
        notes:[eval]
    }
    ]
})



module.exports = mongoose.model('MicroSkills',MicroSkillsSchema)
