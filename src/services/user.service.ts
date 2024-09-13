import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/encryption';
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (data: createUserDTO) => {
 
  return await prisma.user.create({
    data: {
      name : data.name,
      email : data.email,
      password: await hashPassword(data.password),
      role: data.role
    }
  });
};
