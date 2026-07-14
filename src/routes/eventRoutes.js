const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents, getEventById } = require("../controllers/EventController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.get("/",  getAllEvents);
router.get("/:id", getEventById);
module.exports = router;
