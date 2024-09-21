import { createThreadDTO, updateThreadDTO } from '../dto/thread.dto';
import prisma from '../prisma/prisma';
import { Thread } from '@prisma/client';
import { customError, CustomErrorCode } from '../types/custom-error';

class ThreadService {

  // Membuat thread baru
  async createThread(data: createThreadDTO, userId: number): Promise<Thread | null> {
    return await prisma.thread.create({
      data: {
       ...data,
        userId : userId
      },
    });
  }

  // Mengambil semua thread
  async getAllThreads(): Promise<Thread[]>  {
    return await prisma.thread.findMany({
      include: {
        replies: true,
        likes: true,
      },
    });
  }

  // Mengambil thread berdasarkan ID
  async getThreadById(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
      where: { id : id},
      include: {
        replies: true,
        likes: true,
      }     
    });
    if (!thread) {
        throw {
          status: 404,
          message: "Thread not found!",
          code: CustomErrorCode.USER_NOT_EXISTS,
        } as customError;
      }
      return thread;
  }

  // Memperbarui thread (hanya pemilik atau admin)
  async updateThread(id: number, data: createThreadDTO) {
    return await prisma.thread.update({
      where: { id: id },
      data: { ...data },
    });
  }

  // Menghapus thread (hanya pemilik atau admin)
  async deleteThread(id: number): Promise<Thread | null> {
    const thread = await prisma.thread.findUnique({
        where: { id },
      });
  
      if (!thread) {
        throw {
          status: 404,
          message: "Thread not found!",
          code: CustomErrorCode.USER_NOT_EXISTS,
        } as customError;
      }
    
    return await prisma.thread.delete({
      where: { id: id },
    });
  }

  // Membalas thread (reply)
  async replyToThread(threadId: number, content: string, userid: number) {
    return await prisma.thread.create({
      data: {
        content: content,
        repliesById: threadId,
        userId: userid,
      },
    });
  }
}

export default new ThreadService();
