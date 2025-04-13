let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId ,
   fileName : String ,
   src : String ,

    aUser : {
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    }

});

const fileModel =  mongoose.model('File', fileSchema);
module.exports = fileModel;