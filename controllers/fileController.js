let fileModel = require('../model/fileschema');
const multer  = require('multer');
const fs = require('fs');


//for posting files
module.exports = upload = multer({ dest: 'uploads/' });

module.exports = postFile = (req, res) =>{
    console.log(req.file);
    const{filename} = req.file;

   let postFile = new fileModel ({fileName  :filename  , src : `uploads/${filename}` , aUser : req.session.user._id});
   postFile.save().then((data)=>{
    res.send("file upload sucessful")
   }).catch((error)=>{
     console.log(error);
   })
   
} 

 

 //for getting all files

    module.exports = getAllFiles = async(req,res)=>{
        let getAllFiles = await fileModel.find({}).populate('aUser').exec();
        try {
          res.status(200).send({getAllFiles});
          //console.log(getAllFiles);
        } catch (error) {
          res.status(200).send("error")
        }
    }





 //for getting a file

module.exports = aFile = async(req, res) =>{

  //read a file 
  let aFile = await fileModel.find({fileName : req.body.id}).populate('aUser').exec();
 
  try {
    aFile ? res.send(aFile) : res.send("Failed to get record") ;
    //console.log(aFile);
  } catch (error) {
    res.status(200).send("error");
  }

}




  //deleting a patient file
  module.exports = deleteFile = async(  req,res) =>{
    let ID = req.body.id;
    try{
        await fileModel.findOneAndDelete({fileName:ID});

        //this is to remove the file from the folder
        fs.unlinkSync('./uploads/' + ID );
        res.send(" file sucessfully deleted");
    } catch (error) {
        console.log(error);
    }
}

    //  //editing a file

    //  module.exports = editFile =  async(req,res)=>{
    //     //res.send(req.params.id);
        
    //     let {fileName, ID}= req.body;
        
    //     try {
    //       let editFile = await fileModel.findByIdAndUpdate( ID , {
    //       fileName
            
    //         })
        
    //         res.send("file was edited sucessfully")
        
    //     } catch (error) {
    //       console.log(error)
    //     }
     //   }