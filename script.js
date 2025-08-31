const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middleware to parse json
app.use(express.json());

// Connect with mongodb database
mongoose.connect("mongodb://localhost:27017/myapp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Mongodb connected"))
.catch(err => console.log(`Error ========> ${err}`))

// Creating a user model
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model("User", userSchema);

// creating user
app.post("/users", async(req,res)=>{
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

// Get all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// Get user by ID
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});



// update user
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
});


// Delete user
app.delete("/users/:id", async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    } catch (error) {
        res.json({message: "Invalid ID"});
    }
})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
