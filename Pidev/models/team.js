var mongoose = require('mongoose')
var User = require('./user').schema;
var teamSchema = new mongoose.Schema({
    name : {type : String , trim : true,required : true},
    bio : {type : String},
    members: [User]

})
 //var u1 = mongoose.model('Team',teamSchema);
// u1.create({ name:'Liquid',bio:'Liquid Team ',members:["5e5bf0b9302bcc1f70cb877f"]}, function (err, small) {
 // if (err) return handleError(err);

// });
module.exports = mongoose.model('Team',teamSchema)
