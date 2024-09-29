import Joi from "joi";

export const ThreadSchema = Joi.object({
    content: Joi.string().required(),
    imageUrl: Joi.any().optional(),
})

export const likeSchema = Joi.object({
    threadId: Joi.number().required(),
  });