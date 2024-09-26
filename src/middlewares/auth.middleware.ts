import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "./errorHandler";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  const token = authorizationHeader.split(' ')[1]; // Memperbaiki split(' ') untuk memisahkan Bearer dari token

  if (!token) {
    return res.status(401).json({
      message: "Authorization token not found!",
    });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'ACCESS_TOKEN';
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Menyimpan user di request
    next();
  } catch (error) {
    handleError(res, { status: 400, message: 'Invalid token.' });
  }
}


export function authorize(roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
  
      if (!roles.includes(user.role))
        return res.status(403).json({
          message: "FORBIDDEN ",
        });
  
      next();
    };
  }
  