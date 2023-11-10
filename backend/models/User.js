const mongoose = require("mongoose");
// How to create a model
// Step 1. require "mongoose"
// Step 2. create a mongoose scehma [structure of a user]
// Step 3. create a model

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String,//Change to array later
        default: "",
    },
    likedPlaylists: {
        type: String,//Change to array later
        default: "",
    },
    subscribedArtists: {
        type: String,//Change to array later
        default: "",
    },
    
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;//If we require mongoose from another file then we'll have this Model Ready