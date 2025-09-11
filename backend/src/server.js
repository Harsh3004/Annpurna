require('dotenv').config();
const express = require("express");
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    // limits: { fileSize: 100 * 1024 * 1024 } //Since cloudinary allow upto 100mb for free tier
}));

const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect();

const connectDB = require('./config/db');
connectDB();

app.get('/',(req,res) => {
    return res.json({
        success: true,
        message: `Your server is running...`
    })
})


// Routes
app.use('/auth', authRoutes);
app.use('/donations', donationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server start successfully at PORT: ${PORT}`);
})