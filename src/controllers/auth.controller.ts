import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateSalt = async () => {
    return await bcrypt.genSalt();
}

const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

const validatePassword = async (enterPassword: string, savedPassword: string, salt: string) => {
    return await generatePassword(enterPassword, salt) === savedPassword;
}

export const registerWithEmail = async (req: Request, res: Response) => {

    try {

        const { email, password, firstname, lastname } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email has already exist' })
        }

        const salt = await generateSalt();
        const userPassword = await generatePassword(password, salt);

        const role = 'member';
        const user = await User.create({ email, password: userPassword, salt, role, firstname, lastname });

        const token = jwt.sign({uid: user.id}, process.env.SECRET_JWT!);

        res.status(201).json({ message: 'created', token });
    } catch (error) {
        console.log(error);
    }   

}

export const loginWithEmail = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            const validation = await validatePassword(password, user.password, user.salt);

            if (validation) {
                const token = jwt.sign({uid: user.id}, process.env.SECRET_JWT!);
                return res.status(201).json({ message: 'Login Success', token });
            }
            else {
                return res.status(400).json({ message: 'Password is not correct' })
            }
        }
        else {
            return res.status(400).json({ message: 'Email not found' })
        }

    } catch (error) {
        console.log(error);
    }
}