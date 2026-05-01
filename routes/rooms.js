const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const RoomMessage = require('../models/RoomMessage');

// Get last 50 messages for a room
router.get('/:roomId/messages', protect, async (req, res) => {
  try {
    const messages = await RoomMessage.find({ room: req.params.roomId })
      .sort({ createdAt: 1 })
      .limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
