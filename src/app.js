const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registerationRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);


// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Server is running successfully!"
    });
});

module.exports = app;
