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
      ...data,
      password: await hashPassword(data.password),
      
    }
  });
};

export const findUserByEmail = async (email:string) => {
  return await prisma.user.findUnique({
    where: {email}
  });
};