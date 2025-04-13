const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    name : String,
    email: String,
    password:String,
    status : String ,
    createdAt : {type: Date, default: Date.now}
});



let userModel = mongoose.model('User', userSchema);
module.exports = userModel ;
