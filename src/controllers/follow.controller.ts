import { Request, Response } from 'express';
import followService from '../services/follow.service';

class FollowerController {
  async follow(req: Request, res: Response) {
    try {
      const followerId = (req as any).user.userId;
      const followingId = Number(req.params.userId);
      const follower = await followService.followUser(followerId, followingId);
      res.json(follower);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const followerId = (req as any).user.userId;
      const followingId = Number(req.params.userId);
      await followService.unfollowUser(followerId, followingId);
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const followers = await followService.getFollowers(userId);
      res.json(followers);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const following = await followService.getFollowing(userId);
      res.json(following);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new FollowerController();
