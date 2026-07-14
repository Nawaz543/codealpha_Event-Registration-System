const Registration = require("../models/RegistrationModel");
const Event = require("../models/EventModel");

const registerEvent = async (req, res) => {
    try {

        const { eventId } = req.params;
        const userId = req.user.id;

        // Check Event Exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        // Check Existing Registration
        const registration = await Registration.findOne({
            userId,
            eventId
        });

        // Already Registered
        if (registration && registration.status === "registered") {
            return res.status(409).json({
                success: false,
                message: "Already registered."
            });
        }

        // Re-register
        if (registration && registration.status === "cancelled") {

            registration.status = "registered";
            await registration.save();

            event.registrationCount++;
            await event.save();

            return res.status(200).json({
                success: true,
                message: "Registration successful."
            });
        }

        // First Time Registration
        await Registration.create({
            userId,
            eventId
        });

        event.registrationCount++;
        await event.save();

        return res.status(201).json({
            success: true,
            message: "Registration successful."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const cancelRegistration = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        // Check Registration
        const registration = await Registration.findOne({
            userId,
            eventId
        });

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found."
            });
        }

        // Already Cancelled
        if (registration.status === "cancelled") {
            return res.status(409).json({
                success: false,
                message: "Registration already cancelled."
            });
        }

        // Check Event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        // Update Registration
        registration.status = "cancelled";
        await registration.save();

        // Update Registration Count
        if (event.registrationCount > 0) {
            event.registrationCount--;
            await event.save();
        }

        return res.status(200).json({
            success: true,
            message: "Registration cancelled successfully."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyRegisteredEvents = async (req, res) => {
    try {

        const userId = req.user.id;

        const registrations = await Registration.find({
            userId,
            status: "registered"
        }).populate("eventId");

        return res.status(200).json({
            success: true,
            registrations
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyCancelledEvents = async (req, res) => {
    try {

        const userId = req.user.id;

        const registrations = await Registration.find({
            userId,
            status: "cancelled"
        }).populate("eventId");

        return res.status(200).json({
            success: true,
            registrations
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerEvent,
    cancelRegistration,
    getMyRegisteredEvents,
    getMyCancelledEvents
};