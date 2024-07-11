import ParticipantModel from "../models/Participant.model.js";
import bcrypt from 'bcrypt'
//import { getUserIdFromToken } from "../config/jwtProvider.js";



export const findParticipantById = async (ParticipantId) => {
    try {
        const Participant = await userModel.findParticipantById(ParticipantId)
        if (!ParticipantId) {
            throw new Error("Participant not found with id", ParticipantId)
        }
        return Participant

    } catch (error) {
        throw new Error(error.message)


    }

}

export const getParticipantExperienceById = async(ParticipantId)=>{

    try{
        const Participant = await userModel.getParticipantExperienceById(ParticipantId)
        if (!ParticipantId) {
            throw new Error("Participant not found with id", ParticipantId)
        }

    }catch(error) {
        throw new Error(error.message)
    }
}

export const getParticipantEducationById=async(ParticipantId)=>{
try{
    const Participant = await userModel.getParticipantEducationById(ParticipantId)
        if (!ParticipantId) {
            throw new Error("Participant not found with id", ParticipantId)
        }
}catch(error){
    throw new Error(error.message)
}
}

export const getParticipantProjectsById= async ( ParticipantId) =>{

    try{

        const Participant = await userModel.getParticipantProjectsById(ParticipantId)
        if (!ParticipantId) {
            throw new Error("Participant not found with id", ParticipantId)
        }
    }catch(error){
        throw new Error(error.message)
    }
 }