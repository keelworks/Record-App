import express from 'express'
const router=express.Router()

import userRoutes from '../routes/userRouter.js'
import educationRoutes from '../routes/EducationRouter.js'
import experienceRoutes from '../routes/ExperinceRouter.js'
import participantRoutes from '../routes/ParticipantRouter.js'
import projectRoutes from '../routes/ProjectRouter.js'

router.use("/user",userRoutes)
router.use("/education",educationRoutes)
router.use("/experience",experienceRoutes)
router.use("/participant",participantRoutes)
router.use("/project",projectRoutes)

export default router