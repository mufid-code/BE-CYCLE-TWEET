import { Role } from "@prisma/client";
import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });
  
  export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('USER', 'ADMIN').default('USER'),
    isEmailVerified: Joi.boolean().default(false),
  });