const User = require('../models/User');

exports.signup = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const exists = await User.findOne({ userId });
    if (exists) return res.status(400).json({ error: 'UserID already exists' });

    const user = new User({ userId, password });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, password });
    if (!user) return res.status(400).json({ error: 'Invalid UserID or Password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
