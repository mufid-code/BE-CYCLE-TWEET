import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import { comparePassword, hashPassword } from '../utils/encryption';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';

export const registerUser = async (data: RegisterDTO) => {
 
    return await prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      }
    });
  };
export const LoginUser = async (data: LoginDTO) => {
 
  return  await prisma.user.findUnique({
      where: {
        email: data.email,
      }
    });

  };

  
  