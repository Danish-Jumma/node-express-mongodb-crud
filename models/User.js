const mongoose = require("mongoose");

// creating user schema
const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type: String,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, { timestamps: true });

// user model
module.exports = mongoose.model("User", userSchema);

