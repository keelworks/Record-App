import exress from 'express'
import { addEducation, deleteEducation, getAllEducation, updateEducation } from '../controller/EducationController.js'

const EducationRouter=exress.Router()
EducationRouter.post('/addEducation',addEducation)
EducationRouter.delete('/deleteEducation/:id',deleteEducation)
EducationRouter.put('/updateEducation/:id',updateEducation)
EducationRouter.get('/getAllEducation',getAllEducation)


export default EducationRouter