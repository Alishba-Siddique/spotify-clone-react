const express = require("express");//storing all the functionality to the variable to use it
const router = express.Router();//only routes are needed so express.Router() is called
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// This POST route will help to register a user
router.post("/register", async (req, res) => {
    // This code is run when the'/register' api is called as a POST request

    // My req.body will be of the format { firstName, password, lastName, username, email}
    const {email, password, firstName, lastName, username} = req.body;

    //Step 2 : Does a user with this email already exist? If yes, we throw an error.
    const user = await User.findOne( { email: email } );//wohi email search kr k lo ki ki email already user wli email ha
    if (user) {
        //status code by default 200 (Good to go Accepted )
        //status code 400s for error by convention
        return res
            .status(403)
            .json({error: "A user with this email already exists"});
    }
    // This is valid a request
    // Step 3 : Create a new user in the DB
    // Step 3.1 : We do not store passwords in plain text
    // We convery the plain text password to a hash(one way function convert into a specied length)
    const hashedPassword = bcrypt.hash(password, 10);
    //user is creating in data
    const newUserData = {
        email, 
        hashedPassword, 
        firstName, 
        lastName, 
        username
    };
    const newUser = await User.create(newUserData);

    // Step 4 : We wnat to create the token to return to the user
    const token = await getToken(email, newUser);

    // Step 5 : Return the result to the user
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post("/login", async (req, res) => {
    // Step 1 : Get email amd password sent by the user from req.body
    const { email, password } = req.body;
    // Step 2 : Check if the given email exists, if not, the credentials are invalid
    const user = await User.findOne({ email : email });
    if (!user) {
        return res.status(403).json({err: "Invalid credentails"});
    }
    // Step 3 : If the user exists, check if the password is correct, if not, the credentials are invalid
    // This is a tricky one Why because Password is in hashed format, which we can't use to get back the password
    // I can't do : If(password === user.password) 
    //password(plain text) but user.password is hashed
    //If two password hash is same then they are same
    //bcrypt.compare has enabled us to compase 1 password in plain text(password from req.body) to a hashed password(the one in our db) securely.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //this will return true or false
    if(!isPasswordValid){
        return res.status(403).json({err: "Invalid credentails"});
    }
    // Step 4 : if the credentials are correct, return a token to the user
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router; 