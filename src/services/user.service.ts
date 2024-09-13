import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (data: createUserDTO) => {
  return await prisma.user.create({
    data,
  });
};
