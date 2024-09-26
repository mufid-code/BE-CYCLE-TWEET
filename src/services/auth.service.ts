import prisma from '../prisma/prisma';
import { comparePassword, hashPassword } from '../utils/encryption';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import { User } from '@prisma/client';
import { customError, CustomErrorCode } from '../types/custom-error';
import userService from './user.service';

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
  ): Promise<{ user: Omit<User, "password">; tokens:any }> {
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

    // const secretKey = process.env.JWT_SECRET as string;

    // const token = jwt.sign(userToSign, secretKey);
    const tokens = await userService.generateTokens(userToSign.id);
    return {
      user: userToSign,
      tokens,
    };
    }
}

export default new AuthService()
  