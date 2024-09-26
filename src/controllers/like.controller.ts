import { Request, Response } from 'express';
import likeService from '../services/like.service';

class LikeController {
  async addLike(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const threadId = Number(req.params.threadId);
      const like = await likeService.addLike(userId, threadId);
      res.json(like);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async removeLike(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const threadId = Number(req.params.threadId);
      await likeService.removeLike(userId, threadId);
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getLikesByThread(req: Request, res: Response) {
    try {
      const threadId = Number(req.params.threadId);
      const likes = await likeService.getLikesByThread(threadId);
      res.json(likes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new LikeController();
