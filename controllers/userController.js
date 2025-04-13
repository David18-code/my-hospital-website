// register controller , login controller , logout controller
let bcrypt = require('bcrypt');

let userModel = require('../model/userSchema');




module.exports = register = async(req , res)=>{
   let {name,email,password,confirmPassword,status} = req.body;

   //validate
   let errors = {} ;
   if(!email)errors.email = "email must not be empty";
   if(email.toString().length < 1)errors.email = "email must not be empty";
   if(email.toString().includes('@') == false && email.toString().includes('.') == false)errors.email ="invalid email";


   if(email == password)errors.password= "password must not be the same with your email";
   if(password.toString().length < 8) errors.password = "password must be more than 7 characters";

   //if(confirmPassword.toString() != password)errors.confirmPassword = "password does not match confirmpassword";

let regex = /^[a-zA-Z]{2,60}$/
if(!regex.test(name) ) errors.name = " name field must contain only alphabets and must be more than 1 character";

try{
    let data = await userModel.findOne({email}).exec();
    if(data)errors.exist = "user already exist";
}catch (error){
    console.log(error);
}

  if(Object.keys(errors).length < 1)  {

    //to hash a passwordc
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    let aUser = new userModel({
        name ,
        email,
        password,
        status 
       }); 
       

   aUser.save().
   then(()=> res.send("registered sucessful"));

}else{
res.status(200).json(errors);
}

    }



  module.exports = login =  async(req , res)=>{
    let{email, password} = req.body ;
    let loginErrors = [];

// if not json

 if(Object.keys(req.body).length < 1){
    res.status(400).json({msg : "Bad request"})
}else{
    try{
        let data = await userModel.findOne({email}).exec();

        if(!data){
            //user does not exist
            loginErrors.push("invalid email");
            res.status(200).json("invalid email");
        }else{
            //if user exist
           
            if( bcrypt.compareSync(password, data.password)){
                req.session.user = data ;
                req.session.login = true ;
                res.status(200).json(req.session.user);
            }else{
                res.status(200).json("incorrect password");
            }
        }


    }catch (error) {
        console.log(error);
    }
   
   
 } 

}


    
        


         

    module.exports = logout = (req , res)=>{
        //destroy session
        req.session.destroy(()=>{
           // res.cookie({maxAge : 0});
          //  req.session.login = false ;
           res.send('sucessfully logged out')
        })
           
            }

            module.exports = home = (req,res)=>{
                res.send(req.session.login);
            }


            module.exports = about = (req , res)=>{
                res.send('about the hospital') 
            }


            module.exports = test = (req , res)=>{
                res.send(req.session.user); 
            }
