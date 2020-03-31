var mongoose = require('mongoose')
var MicroSkillsSchema = new mongoose.Schema({
    nom : {type : String , trim : true , required : true},
    description : {type:String , required : true},
    macroskills : [{
        nom: {type: String, required: true},
        description: {type: String, required: true},
        note:{type:Number,default:null}
    }
    ]
})



module.exports = mongoose.model('MicroSkills',MicroSkillsSchema)
