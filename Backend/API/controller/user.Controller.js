import {  findUserById, getAllUsers } from "../services/user.service.js"

export const getUserProfile=async(req,res)=>{
    const jwt=req.headers.authorization?.split(" ")[1]
    try {
        if(!jwt){
            return res.status(404).send({error:"token not found"})
        }
        const user=await getUserProfileByToken(jwt)
        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
export const getAlluser=async(req,res)=>{
    try {
        const user=await getAllUsers()
        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).send({error:error.message})

        
    }
}
export const deletesUserById=async(req,res)=>{
    const userId=req.params.id
    try {
        
        const User=await deleteUserId(userId)
        return res.status(200).send(User);

    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}