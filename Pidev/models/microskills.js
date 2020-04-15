var mongoose = require('mongoose')
var eval = require('./evaluation').schema
var MicroSkillsSchema = new mongoose.Schema({
    nom : {type : String , trim : true , required : true},
    description : {type:String , required : true},
    type : {type:String , required : true},
    macroskills : [{
        nom: {type: String, required: true},
        description: {type: String, required: true},
        notes:[eval]
    }
    ]
})



module.exports = mongoose.model('MicroSkills',MicroSkillsSchema)
