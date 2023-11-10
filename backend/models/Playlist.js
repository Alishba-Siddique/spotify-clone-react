const mongoose = require("mongoose");
// How to create a model
// Step 1. require "mongoose"
// Step 2. create a mongoose scehma [structure of a Playlist]
// Step 3. create a model

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    // 1. Which Songs are in Playlsit 
    // 2. Playlsit Collaborators
    songs: [
        {
            type: mongoose.Types.ObjectId,//Change to audio later
            ref: 'song',
        },
    ],
    collaborators: [
        { 
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
    ],
    
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;//If we require mongoose from another file then we'll have this Model Ready