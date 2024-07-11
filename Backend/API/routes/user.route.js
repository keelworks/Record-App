import express from 'express'
import { deletesUserById, getAlluser, getUserProfile } from '../controller/user.Controller.js'
const userRouter=express.Router()

userRouter.get("/profile",getUserProfile)
userRouter.get("/",getAlluser)
userRouter.delete("/:id",deletesUserById)

export default userRouter