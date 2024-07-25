import exress from 'express'
import { addParticipant, deleteParticipant, getAllParticipants, updateParticipant } from '../controller/ParticipantController.js'

const ParticipantRouter=exress.Router()
ParticipantRouter.post('/addParticipant',addParticipant)
ParticipantRouter.delete('/deleteParticipant/:id',deleteParticipant)
ParticipantRouter.put('/updateParticipant/:id',updateParticipant)
ParticipantRouter.get('/getAllParticipant',getAllParticipants)


export default ParticipantRouter