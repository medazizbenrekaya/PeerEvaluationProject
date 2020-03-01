var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Pidev',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },()=>{
console.log('db connect')
});
