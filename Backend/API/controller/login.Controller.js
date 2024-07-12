//const userService = require('../services/userService');
import userService from '../services/user.service' ;

const loginController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.login(email, password);
      res.json({ message: 'Login successful!', user }); // Return user data (without password)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
};

module.exports = loginController;
