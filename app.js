const express = require('express');
const cookieParser = require('cookie-parser');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config();
const gitignore = require('gitignore');
const connectMongo = require('connect-mongo')
const cors = require('cors');

const routes = require('./route');


//firing up express
const app = express();

//firing up cors
app.use(cors({
  origin : ['https://www.bbc.co.uk/weather', 'http://www.cnn.com/' ,'https://www.googleadservices.com/', 'https://www.googleadservices.com/'],
  credentials : false ,
  methods : ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus : 200
}));



//connecting to database
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connecting to database");
});

//to get json data
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())
//app.set('trust proxy', 1) // trust first proxy
app.use(session(
    //properties
    
    {
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge : 1000 * 3600 * 24 * 7},
  store: connectMongo.create({mongoUrl : process.env.DBURL, collectionName : 'sessionStore'})

}
))




//creating route
app.use('/', routes);



//making a server
const PORT = process.env.PORT || 3000 ;
app.listen(PORT,()=>{
console.log("running at port " + PORT);
});
