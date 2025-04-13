
let mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId ,
    gender : String ,
        age : Number,
        height : Number ,
        weight : Number ,
        bloodType : String ,
        comment : String ,
        report : String ,
        recommendation : String ,
        nextAppointmentDate : String ,
        allergies : String,
        chronicCondition : String,
        treatment : String ,
        presentMedication : String ,
        precautions : String ,

    aUser : {
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    }

});

const profileModel =  mongoose.model('Profile', profileSchema);
module.exports = profileModel;