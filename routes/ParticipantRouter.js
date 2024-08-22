import exress from 'express'
import { addParticipant, deleteParticipant, getAllParticipants, updateParticipant } from '../controller/ParticipantController.js'
import { authenticateToken } from '../middleware/middleware.js'

const ParticipantRouter=exress.Router()
ParticipantRouter.post('/addParticipant',addParticipant)
ParticipantRouter.delete('/deleteParticipant/:id',authenticateToken,deleteParticipant)
ParticipantRouter.put('/updateParticipant/:id',authenticateToken,updateParticipant)
ParticipantRouter.get('/getAllParticipant',authenticateToken,getAllParticipants)


export default ParticipantRouter