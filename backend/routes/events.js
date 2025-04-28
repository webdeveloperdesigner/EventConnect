const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create Event
router.post('/', async (req, res) => {
  const { title, description, date, userId } = req.body;

  try {
    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: 'Event date must be in the future' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      createdBy: userId,
      registeredUsers: []
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Register for an Event
router.post('/:eventId/register', async (req, res) => {
  const { userId } = req.body;
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (event.registeredUsers.includes(userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    event.registeredUsers.push(userId);
    await event.save();

    res.status(200).json({ message: 'Registered successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Events for User
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.find({ registeredUsers: userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Cancel Registration
router.delete('/:eventId/cancel/:userId', async (req, res) => {
  const { eventId, userId } = req.params;

  try {
    const event = await Event.findById(eventId);

    event.registeredUsers = event.registeredUsers.filter(id => id.toString() !== userId);
    await event.save();

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
