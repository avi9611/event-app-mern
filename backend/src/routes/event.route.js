import express from 'express';
import Event from '../models/event.model.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import mongoose from "mongoose";
const router = express.Router();

router.post('/', protectRoute, async (req, res) => {
  try {
    const event = new Event({ ...req.body, owner: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', protectRoute, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { $or: [{ owner: req.user._id }, { visibility: 'public' }] };
    const events = await Event.find(query).populate('owner', 'fullName');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', protectRoute, async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }

    const event = await Event.findById(eventId).populate('owner', 'fullName');
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/:id', protectRoute, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (event.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not the owner of this event.' });
    }

    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event.', error: err.message });
  }
});

router.post('/:id/join', protectRoute, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'You have already joined this event.' });
    }

    event.attendees.push(userId);
    await event.save();

    if (req.io) {
      req.io.emit('attendeeUpdate', {
        eventId: event._id,
        attendees: event.attendees,
      });
    }

    res.status(200).json({ message: 'You have joined the event.' });
  } catch (err) {
    console.error("Error joining event:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/:id/attendees', protectRoute, async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }

    const event = await Event.findById(eventId).populate('attendees', 'fullName profilePic');
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json(event.attendees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;