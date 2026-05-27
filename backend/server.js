const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require("dotenv").config()
const path = require("path")


const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminroutes");
const postRoutes = require("./routes/postroutes");

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use( "/uploads/profile", express.static(path.join(__dirname, "uploads/profile")));



mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected")).catch(err => console.log(err))
app.get('/', function (req, res) {
    res.send('Hello World')
})





app.listen(5000, () => { console.log("Server running on port 5000") })