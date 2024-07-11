const express = require('express');
const pool = require('./db');
const User = require('./models/User');

const app = express();

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    throw err; // Exit on error
  }
  console.log(`Connected to MySQL as ${connection.config.user}@${connection.config.host}`);
});

// Get all users (consider pagination for large datasets)
app.get('/users', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific user by ID
app.get('/:id', async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/:id', async (req, res) => {
    try {
      const user = await User.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));