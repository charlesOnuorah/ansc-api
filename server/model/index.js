import Joi from "@hapi/joi";

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const agentCreationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    contactLine: Joi.string().required(),
    roleid: Joi.number().required(),
    username: Joi.string().required(),
    mappedLGAs: Joi.array().min(1).required()
})

