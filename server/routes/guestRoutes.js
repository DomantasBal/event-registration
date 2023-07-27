const express = require('express');
const router = express.Router();
const Guest = require('../models/guestModel');

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, birthDate } = req.body;
    const newGuest = new Guest({ name, email, birthDate });
    await newGuest.save();
    res
      .status(201)
      .json({ message: 'Guest created successfully', guest: newGuest });
  } catch (error) {
    console.error('Error creating guest:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, birthDate } = req.body;
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      { name, email, birthDate },
      { new: true }
    );
    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json({ message: 'Guest updated successfully', guest: updatedGuest });
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
