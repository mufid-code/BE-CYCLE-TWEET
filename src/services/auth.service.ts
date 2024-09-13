import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import { hashPassword } from '../utils/encryption';
import { RegisterDTO } from '../dto/auth.dto';

export const registerUser = async (data: RegisterDTO) => {
 
    return await prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      }
    });
  };
  