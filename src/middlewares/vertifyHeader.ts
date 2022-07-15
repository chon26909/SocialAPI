import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const vertifyToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send({message: "Unauthorized Token"});
    }
    try {
        const token = authHeader.split("Bearer ")[1];
        const decoded: any = jwt.verify(token, process.env.SECRET_JWT!);
        req.session.uid = String(decoded.uid);
    }
    catch (error) {
        return res.status(401).send({message: "Invalid token"});
    }
    return next();
}