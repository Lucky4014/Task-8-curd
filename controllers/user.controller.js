const User = require('../models/user.model');

// PUT - Full Update (replaces all fields)
const updateUserPUT = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Validate required fields for PUT (full replace)
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required for full update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true, overwrite: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User fully updated', user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH - Partial Update (only updates given fields)
const updateUserPATCH = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },         // Only update provided fields
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User partially updated', user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      // Handle failed deletion - user not found
      return res.status(404).json({ message: 'User not found, deletion failed' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });

  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateUserPUT, updateUserPATCH, deleteUser };
