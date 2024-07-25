import exress from 'express'
import { addExperience, deleteExperience, getAllExperience, updateExperience } from '../controller/ExperienceController.js'

const ExperienceRouter=exress.Router()
ExperienceRouter.post('/addExperience',addExperience)
ExperienceRouter.delete('/deleteExperience/:id',deleteExperience)
ExperienceRouter.put('/updateExperience/:id',updateExperience)
ExperienceRouter.get('/getAllExperience',getAllExperience)


export default ExperienceRouter