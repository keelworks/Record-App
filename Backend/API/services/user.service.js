import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
//import { getUserIdFromToken } from "../config/jwtProvider.js";



// const comparePasswords = (plainPassword, hashedPassword) => {
//     // Implement secure password comparison using bcrypt
//     return plainPassword === hashedPassword; // Placeholder, replace with bcrypt logic
//   };
  
  const userService = {
    async login(email, password) {
      const user = await User.findByEmail(email);
      if (!user || !comparePasswords(password, user.password)) {
        throw new Error('Invalid email or password');
      }
      return user; // Return user object (excluding password)
    }
  };
  
  module.exports = userService;


