const express =require('express');
const router=express.Router();
const  bcrypt =  require('bcryptjs');
const validateEmailAndPassword = require('../_config/validate-email-and-password')
const  jwt= require('jsonwebtoken');

// User Model
const User = require('../_models/_userModel');

const  JWT_SECRET  = process.env.JWT_SECRET
const date_exp = process.env.JWT_EXP


/**
 * @route   POST api/user/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login',async (req, res) => {
  const { email, password } = req.body;
  
  console.log(email,password);

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
 
  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');
    // console.log('u pass', user.password);
    let isMatch = await bcrypt.compare(password, user.password);
    console.log('match', isMatch);
    if (!isMatch) res.send({msg:'Invalid credentials'});

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: date_exp });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      msg :"the user added successefully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
      
    });
  } catch (e) {
    throw Error(e.message)
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register',async(req, res) => {
  const { username, email, password } = req.body;
   console.log(username,email, password )

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      username,
      email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: date_exp
    });

    res.status(200).json({
      token,
      msg :"the user added successefully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/getuser', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/test',(req,res) => {
  console.log("from client")
})
module.exports=router;