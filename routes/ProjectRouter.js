import exress from 'express'
import { addProject, deleteProject, getAllProjects, updateProject } from '../controller/ProjectController.js'
import { authenticateToken } from '../middleware/middleware.js'

const ProjectRouter=exress.Router()
ProjectRouter.post('/addProject',authenticateToken,addProject)
ProjectRouter.delete('/deleteProject/:id',authenticateToken,deleteProject)
ProjectRouter.put('/updateProject/:id',authenticateToken,updateProject)
ProjectRouter.get('/getAllProject',authenticateToken,getAllProjects)


export default ProjectRouter