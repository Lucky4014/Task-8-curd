const express = require('express');
const router = express.Router();
const { updateUserPUT, updateUserPATCH, deleteUser } = require('../controllers/user.controller');

// POST - User banana (naya)
router.post('/', async (req, res) => {
  try {
    const User = require('../models/user.model');
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', updateUserPUT);
router.patch('/:id', updateUserPATCH);
router.delete('/:id', deleteUser);

module.exports = router;
