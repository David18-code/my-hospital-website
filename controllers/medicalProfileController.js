let profileModel = require('../model/medicalProfileSchema');


// creating the patients profile
module.exports = createProfile = (req, res)=>{
    let {gender , age , height , weight , bloodType, comment , report ,
         recommendation ,nextAppointmentDate , allergies , chronicCondition , treatment , presentMedication , precautions } = req.body;

    let createProfile = new profileModel ({ gender: gender ,age : age , height: height , weight :weight , bloodType : bloodType,
         comment : comment , report : report , recommendation : recommendation ,nextAppointmentDate : nextAppointmentDate , 
         allergies : allergies , chronicCondition : chronicCondition , treatment : treatment , presentMedication : presentMedication , 
         precautions : precautions,   aUser : req.session.user._id});

         //saving profile to the database
         if(Object.keys(req.body).length<1){
          res.send("cannot submit empty field");
         } else{
            createProfile.save().then((data)=>{
                res.send("profile sucessfully created");
                }).catch((err)=>{
                 res.send(err);
                });
         }
     
   // res.send(req.session.user._id);
}

//editing a patients profile
module.exports = editProfile = async(req,res)=>{
    let { weight ,age , comment , report ,
        recommendation ,nextAppointmentDate , allergies ,
         chronicCondition , treatment , presentMedication , precautions , ID} = req.body;

        try {
            let editProfile = await profileModel.findByIdAndUpdate ( ID ,{weight , 
                age,
                 comment , 
                 report ,
                recommendation ,
                nextAppointmentDate ,
                allergies , 
                chronicCondition ,
                 treatment ,
                 presentMedication , 
                 precautions ,
                 })

                editProfile ?  res.send("profile was edited sucessfully") : res.send("profile not edited");
                
            } catch (error) {
                console.log(error)
            }
        }
//deleting a patient profile
        module.exports = deleteProfile = async(  req,res) =>{
            let ID = req.params.ID;
            try{
                await userModel.findByIdAndDelete(ID);
                res.send(" profile sucessfully deleted");
            } catch (error) {
                console.log(error);
            }
        }

        //gettina 1 patient profile
        module.exports = aProfile = async(req,res)=>{
            let ID = req.params.Id 
           // Select * from users
          try {
            let aProfile = await profileModel.findById(ID).exec();
           // res.send(aProfile);
            if(aProfile){
                res.send(aProfile)
            }else{
                res.send("cannot get profile");
            }
          } catch (error) {
            console.log(error);
          }
          }

          //getting all profiles

          module.exports = allProfile = async(req,res)=>{
            
           // Select * from users
          try {
            let allProfile = await profileModel.find({}).populate('aUser').exec();
            if(allProfile){
                res.send(allProfile)
            }else{
                res.send("cannot get profile");
            }
            
          } catch (error) {
            console.log(error);
          }
          }

     