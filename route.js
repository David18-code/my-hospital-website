const express = require('express');
let router = express.Router(); 
let homeController = require('./controllers/indexController'); 
let regController = require('./controllers/userController');
let loginController = require('./controllers/userController');
let aboutController = require('./controllers/userController');
let medicalProfileController = require('./controllers/medicalProfileController');
let fileController = require('./controllers/fileController');
let auth = require('./utils/auth');





router.get('/home', home);

router.post('/register', register);

router.post('/login',login);

router.get('/logout', auth , logout);

router.post('/about', about );

router.post('/test', test );

//-----------------------------------------------------

router.post('/create', auth, createProfile);

router.put('/edit', auth, editProfile);

router.delete('/delete/:id',auth, deleteProfile);

router.get('/a-profile/:id',auth, aProfile)

router.get('/all-profile',auth, allProfile )


//------------------------------------------------------------


router.get('/get-files',auth, getAllFiles);

router.get('/get-aFile' ,auth,  aFile),


router.delete('/delete-file' ,auth, deleteFile)


router.post('/create-file' , auth , upload.single('file') , postFile);




    module.exports = router ;