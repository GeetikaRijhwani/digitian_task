const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const verifyToken = require('./verify-token');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

//Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    mobileno: String,
    country: String
})


//model for Users
const userModel = new mongoose.model('users',userSchema);


let dummyRes = { "message": "Test Successful!" };

//Salt for Password Encryption
let salt = "Secret-Key";
let tokenKey = "Token-Key";

mongoose.connect("mongodb://127.0.0.1:27017/digi_auth", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database");
})

app.post('/register', (req, res) => {
    let user = req.body;
    user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, "sha512").toString("hex");

    let userObj = new userModel(user);
    userObj.save().then(() => {
        res.send({"message":"User Registered"});
    })
    
})

app.post('/login', async (req, res) => {
    let userCredentials = req.body;
    userCredentials.password = crypto.pbkdf2Sync(userCredentials.password, salt, 1000, 64, "sha512").toString("hex");
    let userCount = await userModel.find(userCredentials).countDocuments();
    if (userCount == 1) {
        let userinfo = await userModel.findOne(userCredentials);
        jwt.sign(userCredentials, tokenKey, (err, token) => {
            if (err !== null) {
                res.send({ message: "Some Problem! Try after some time", code:0 })
            }
            else {
                res.send({ token:token, user: userinfo, code:1 });
            }
       }) 
    }
    else
    {
        res.send({message:"Wrong Username or Password", code:0})
    }
    
    // console.log(userCount);
    // res.send(userCredentials);
})


app.get('/me', verifyToken, async (req, res) => {

    let me = await userModel.find({ username: req.user.username });
    
     res.send(me);
})

// app.get('/logout', (req, res) => {
//     res.send(dummyRes);
// })







// Start the server 
app.listen(8000);

