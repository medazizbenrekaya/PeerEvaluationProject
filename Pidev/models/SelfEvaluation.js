var mongoose = require('mongoose')
var SelfevaluationSchema = new mongoose.Schema({
    voteur : {type : String,required : true},
    note: {type:Number,required: true}

})








module.exports = mongoose.model('SelfEvaluation',SelfevaluationSchema)
