const Event = require("../models/EventModel");

const createEvent = async (req, res) => {
    try {
        const { title, description, eventDate, location, maxParticipants } = req.body;

        if (!title || !eventDate || !location || !maxParticipants) {
            return res.status(400).json({
                success: false,
                message: "All * marked fields are required."
            });
        }

        const createdBy = req.user.id;
    

        const event = await Event.create({
            title,
            description,
            eventDate,
            location,
            maxParticipants,
            createdBy
        });

         res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });


    }
    catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message
    });
}
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            events
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getEventById = async (req, res) => {
    try {

        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found."
            });
        }

        return res.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById
};