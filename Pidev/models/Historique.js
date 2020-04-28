var mongoose = require('mongoose')
var HistoriqueSchema = new mongoose.Schema({
    emailUser : {type : String,required : true},
    roleUser: {type:String,required: true},
    Text: {type:String,required: true},
    type : {type:String,required:true}

})








module.exports = mongoose.model('Historique',HistoriqueSchema)
