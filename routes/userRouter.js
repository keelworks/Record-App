import exress from 'express'
import {signUpvalidation,loginvalidation, forgetvalidation, passwordvalidation} from '../helper/validation.js'
import {register,login,getUser,forgetPassword, getCurrentUser, ResetPassword} from '../controller/userController.js'

const router=exress.Router()
router.post('/register',signUpvalidation,register)
router.post('/login',loginvalidation,login)
router.get("/get-user",getUser)
router.get("/user",getCurrentUser)
router.post("/forget-password",forgetvalidation,forgetPassword)
router.post("/reset-password/:id/:token",passwordvalidation,ResetPassword)

export default router