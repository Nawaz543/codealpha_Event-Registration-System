const express = require("express");
const router = express.Router();

const { registerEvent, cancelRegistration, getMyRegisteredEvents, getMyCancelledEvents } = require("../controllers/RegistrationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:eventId/register", authMiddleware, registerEvent);
router.delete("/:eventId/register", authMiddleware, cancelRegistration);

router.get("/my-events", authMiddleware, getMyRegisteredEvents);
router.get("/my-cancelled-events", authMiddleware, getMyCancelledEvents);

module.exports = router;