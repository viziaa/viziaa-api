import Joi from "joi";

export const registerScema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

export const loginScema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})