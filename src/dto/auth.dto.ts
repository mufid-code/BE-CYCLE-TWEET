import { hashPassword } from '../utils/encryption';
import { Role } from '@prisma/client';
export type RegisterDTO = {
    name: string;
    email: string;
    password: string;
}