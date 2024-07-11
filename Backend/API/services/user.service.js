import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
//import { getUserIdFromToken } from "../config/jwtProvider.js";



export const findUserById = async (userId) => {
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            throw new Error("user not found with id", userId)
        }
        return user

    } catch (error) {
        throw new Error(error.message)


    }

}

export const getAllUsers=async()=>{
    try {
        const user=await userModel.find()
        return user
        
    } catch (error) {
        throw new Error(error.message)
        
    }

}
