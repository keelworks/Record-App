import exress from 'express'
import {signUpvalidation,loginvalidation, forgetvalidation} from '../helper/validation.js'
import {register,login,getUser,forgetPassword, getCurrentUser} from '../controller/userController.js'

const router=exress.Router()
router.post('/register',signUpvalidation,register)
router.post('/login',loginvalidation,login)
router.get("/get-user",getUser)
router.get("/user",getCurrentUser)
router.post("/forget-password",forgetvalidation,forgetPassword)

export default router