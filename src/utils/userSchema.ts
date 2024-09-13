// Skema validasi menggunakan Joi

import Joi from "joi";

// doc: https://joi.dev/api/?v=17.13.3
export const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  
  });