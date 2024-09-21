import { createUserDTO } from '../dto/user.dto';
import prisma from '../prisma/prisma';
import { comparePassword, hashPassword } from '../utils/encryption';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import { User } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError, CustomErrorCode } from '../types/custom-error';

class AuthService {
  async register(data: RegisterDTO): Promise<Omit<User, "password"> | null> {
      return await prisma.user.create({
        data: {
          ...data,
          password: await hashPassword(data.password),
        }
      });
    };
   async LoginUser(
    data: LoginDTO
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    const user =  await prisma.user.findUnique({
        where: {
          email: data.email,
        }
      });
      if (!user) {
        throw {
          code: CustomErrorCode.USER_NOT_EXISTS,
          message: "Email / password is wrong!",
          status: 404,
        } as customError;
      }
  
      const isValidPassword = await comparePassword(
        data.password,
        user.password as string
      );
  
      if (!isValidPassword) {
        throw {
          code: CustomErrorCode.USER_NOT_EXISTS,
          message: "Email / password is wrong!",
          status: 404,
        } as customError;
      }
      const { password, ...userToSign } = user;

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(userToSign, secretKey);

    return {
      user: userToSign,
      token: token,
    };
    }
}

export default new AuthService()
  