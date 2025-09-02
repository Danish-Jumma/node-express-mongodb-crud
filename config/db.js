const mongoose = require("mongoose");

// connecting mongodb database 
const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/myapp",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB");
        process.exit(1)
    }
} 

module.exports = connectDB;