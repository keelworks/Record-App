import exress from 'express'
import { addEducation, deleteEducation, getAllEducation, updateEducation } from '../controller/EducationController.js'
import { authenticateToken } from '../middleware/middleware.js'

const EducationRouter=exress.Router()
EducationRouter.post('/addEducation',authenticateToken,addEducation)
EducationRouter.delete('/deleteEducation/:id',authenticateToken,deleteEducation)
EducationRouter.put('/updateEducation/:id',authenticateToken,updateEducation)
EducationRouter.get('/getAllEducation',authenticateToken,getAllEducation)


export default EducationRouter