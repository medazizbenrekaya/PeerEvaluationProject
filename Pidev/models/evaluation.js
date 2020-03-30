var mongoose = require('mongoose')
var evaluationSchema = new mongoose.Schema({
    voteur : {type : String,required : true},
    note: {type:Number,required: true}

})








module.exports = mongoose.model('Evaluation',evaluationSchema)
