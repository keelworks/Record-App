import exress from 'express'
import {signUpvalidation,loginvalidation, forgetvalidation, passwordvalidation} from '../helper/validation.js'
import {register,login,getUser,forgetPassword, getCurrentUser, ResetPassword} from '../controller/userController.js'
import { authenticateToken } from '../middleware/middleware.js'

const router=exress.Router()
// router.post('/register',signUpvalidation,register)
router.post('/login',loginvalidation,login)
// router.get("/getalluser",authenticateToken,getUser)
// router.get("/get-user",authenticateToken,getCurrentUser)
router.post("/forget-password",forgetvalidation,forgetPassword)
router.post("/reset-password/:id/:token",passwordvalidation,ResetPassword)

export default router