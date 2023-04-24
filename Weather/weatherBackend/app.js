const express = require('express')
var cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const ConnectToDB = require('./_config/config')


const app = express()
ConnectToDB();


const morgan = require('morgan');
// const serviceAccount = require('./service-account-key.json');
app.use(express.json({extended:false}));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
// app.use(csrfMiddleware);
const corsOptions ={
  origin:"*", 
  credentials:true,    
  accessControlAllowCredentials:true,
  accessControlAllowOrigin: "*",
  accessControlAllowMethods:"GET,PUT,POST,DELETE,PATCH,OPTIONS",
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(passport.initialize())
// app.use(morgan('dev'));
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valError = [];
      Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
      res.status(422).send(valError);
  }
});




const userRoute = require('./_routers/_userrouters')
app.use('/api/user', userRoute)

app.listen(3900 || 3200 ,() => console.log("the server is running"))