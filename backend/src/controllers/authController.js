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

  const userDetails = undefined;
  try{
    userDetails = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      user_type: role,
      passwordHash: hashPassword,
    })
  }catch(error){
      console.error(err.message);
      return res.status(500).send('Server Error');
  }

  return res.status(200).json({
    success: true,
    message: `SignUp successfully`
  })
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
