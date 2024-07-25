import exress from 'express'
import { addProject, deleteProject, getAllProjects, updateProject } from '../controller/ProjectController.js'

const ProjectRouter=exress.Router()
ProjectRouter.post('/addProject',addProject)
ProjectRouter.delete('/deleteProject/:id',deleteProject)
ProjectRouter.put('/updateProject/:id',updateProject)
ProjectRouter.get('/getAllProject',getAllProjects)


export default ProjectRouter