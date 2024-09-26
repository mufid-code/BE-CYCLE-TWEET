import Joi from "joi";

export const ThreadSchema = Joi.object({
    content: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
})

export const likeSchema = Joi.object({
    threadId: Joi.number().required(),
  });