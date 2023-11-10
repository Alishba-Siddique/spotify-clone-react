const mongoose = require("mongoose");
// How to create a model
// Step 1. require "mongoose"
// Step 2. create a mongoose scehma [structure of a Song]
// Step 3. create a model

const Song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,//Change to audio later
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;//If we require mongoose from another file then we'll have this Model Ready