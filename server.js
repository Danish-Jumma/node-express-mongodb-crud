const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express();

// connect database
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use("/users", userRoutes);

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));