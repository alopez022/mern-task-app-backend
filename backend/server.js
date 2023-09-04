const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/modelTask");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-task-app-scop.onrender.com" ]
}));
app.options('*', cors())
app.use("/api/tasks", taskRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Homa Page');
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then( () => {
        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}`);
        });
    })
    .catch( (error) => console.log(error));

/*const startServer = async() => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}`);
        });
    } catch(error) {
        console.log(error);
    }
}

startServer();*/