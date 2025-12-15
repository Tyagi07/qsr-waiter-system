import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

declare global {
    namespace Express{ 
        interface Request {
            user?: JWTPayload;
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provider",
                statusCode: 401
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
        ) as JWTPayload;

        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            statusCode: 401
        });
    }
};

export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.errors[0].message,
                statusCode: 400
            });
        }
    };
};