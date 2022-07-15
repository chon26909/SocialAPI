import { Request, Response} from 'express';
import User from "../models/User.model"

export const getProfile = async (req: Request, res: Response) => { 
    const uid = req.session.uid;
    try {
        const user = await User.findById(uid);
        res.status(200).json({message: 'success', data: user});
    } catch (error) {
        console.log(error);
    }
    
}