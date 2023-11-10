// npm init : package.json -- This is a node project
// npm i express : expressJS package installed -- Project know that we are using ExpressJs
// We use Express now

const express = require("express");//storing all the functionality to the variable to use it
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
require('dotenv').config(); 
const app = express();//Express is export as a function so we can use it by calling the function and store the function call to other variable to use the functionalities
const PORT = process.env.PORT //8000;

app.use(express.json());

// //connect mongodb to node app
// //mongoose.connect() takes 2 arguments :
// //    1. Which db to connect to (db url)
// //    2. Connection options()
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((x) => {
    console.log("Connected to MongoDB Successfully!");
})
.catch((err) => {
    console.log("Error while Connecting to MongoDB");
});

//Passport JWT Setup
let opts = {}; 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_PASSPORT_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        //done(error, doesTheUSerExist)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// API : GET TYPE : / : return text "Hello World!"
app.get("/", (req, res) => {
    // "/" is the route for get
    //req contains all data for the request
    //res contains all data for the response
    res.send("Hello World!")

});

app.use("/auth", authRoutes); 

//Now we tell express our server will run on localhost:8000
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
