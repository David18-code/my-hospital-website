 module.exports = auth = async(req,res,next)=>{
    if(typeof req.session.user != 'undefined'){
      next()
    } else if(typeof req.session.user == 'undefined'){
        res.status(401).json("you are unauthorized");
    }
 }