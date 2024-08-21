import exress from 'express'
import { addParticipant, deleteParticipant, getAllParticipants, updateKeys, updateParticipant } from '../controller/ParticipantController.js'
import { authenticateToken } from '../middleware/middleware.js'

const ParticipantRouter=exress.Router()
ParticipantRouter.post('/addParticipant',addParticipant)
ParticipantRouter.delete('/deleteParticipant/:id',authenticateToken,deleteParticipant)
ParticipantRouter.put('/updateParticipant/:id',authenticateToken,updateParticipant)
ParticipantRouter.put('/updateKeys',authenticateToken,updateKeys)
ParticipantRouter.get('/getAllParticipant',authenticateToken,getAllParticipants)


export default ParticipantRouter