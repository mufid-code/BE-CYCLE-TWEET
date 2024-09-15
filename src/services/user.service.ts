import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/encryption';
import jwt from 'jsonwebtoken';

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

export const generateTokens = async (userId: number) => {
  const accessToken = jwt.sign({ userId }, 'ACCESS_TOKEN', { expiresIn: '15m' });
  return await prisma.token.create({
    data: {
      token: accessToken,
      type: 'ACCESS_TOKEN',
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 menit
      userId
    }
  })
}
 