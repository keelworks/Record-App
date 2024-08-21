import exress from 'express'
import { addExperience, deleteExperience, getAllExperience, updateExperience } from '../controller/ExperienceController.js'
import { authenticateToken } from '../middleware/middleware.js'

const ExperienceRouter=exress.Router()
ExperienceRouter.post('/addExperience',authenticateToken,addExperience)
ExperienceRouter.delete('/deleteExperience/:id',authenticateToken,deleteExperience)
ExperienceRouter.put('/updateExperience/:id',authenticateToken,updateExperience)
ExperienceRouter.get('/getAllExperience',authenticateToken,getAllExperience)


export default ExperienceRouter