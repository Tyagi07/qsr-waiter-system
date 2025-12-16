import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

declare global {
  namespace Express {
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
  try {
   
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization header provided",
        statusCode: 401
      });
    }


    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header format. Use: Bearer <token>",
        statusCode: 401
      });
    }

    
    const token = authHeader.substring(7); 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
        statusCode: 401
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JWTPayload;

  
    req.user = decoded;
    
    next();
  } catch (error: any) {
    console.error("Auth error:", error.message);
    
    return res.status(401).json({
      success: false,
      message: error.message === "jwt malformed" 
        ? "Invalid token format" 
        : error.message === "jwt expired"
        ? "Token has expired"
        : "Invalid or expired token",
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
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || "Validation error",
        statusCode: 400
      });
    }
  };
};