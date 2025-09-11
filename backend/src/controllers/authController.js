const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log(`Verifying status`);
  
  const { firstName, lastName, email, password, role } = req.body;
  console.log(firstName,lastName,email,password,role);
  
  console.log('fetched details');

  // Basic validation
  if (!firstName || !lastName || !email || !password || !role) {
    console.log(`Enter all details carefully.`);
    return res.status(400).json({
        success: false,
        message: 'Missing Information'
    })
  }
  
  const existingUser = await User.findOne({ email : email, role: role});
  if(existingUser){
      console.log(`Existing User`);
      return res.status(400).json({
          success: false,
          message: 'User already exists'
      })
  }
  
  console.log("checked for existing");  
  
  let hashPassword;        
  try{
      hashPassword = await bcrypt.hash(password,10);
  }catch(err){
      console.log(`Error in Hashing`);
      return res.status(500).json({
          success: false,
          message: `error in hashing`
      })
  }

  let userDetails = undefined;
  try{
    userDetails = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      user_type: role,
      passwordHash: hashPassword,
    })
  }catch(error){
      console.error(error.message);
      return res.status(500).send('Server Error');
  }

  return res.status(200).json({
    success: true,
    message: `SignUp successfully`
  })
};

exports.login = async (req, res) => {
  try{
    console.log(`Logging`);

    const { email, password } = req.body;

    console.log(email,password);
    
    if(!email || !password){
      return res.status(400).json({
          success: false,
          message: `Missing Information - Enter details carefully`
      })
    }

    const user = await User.findOne({ email });
    console.log(user);

    if(!user){
      return res.status(401).json({
        success: false,
        message: `User not exist`
      })
    }

    if(!await bcrypt.compare(password, user.passwordHash)){
      return res.status(401).json({
        success: false,
        message: `Invalid Password`
      })
    }

    console.log(`Password Matched`);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`token Created`);

    user.token = token;
    user.passwordHash = undefined;  

    req.user = user;
    
    const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly: true
    }

    res.cookie('token',token,options).status(200).json({
        success: true,
        message: `Login Successfully`,
        user
    })
  }catch(err){
    res.status(500).json({
        success: false,
        message: `While login: ${err.message}`
    })
  }
};
