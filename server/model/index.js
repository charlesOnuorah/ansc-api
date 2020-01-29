import Joi from "@hapi/joi";
import { JsonWebTokenError } from "jsonwebtoken";

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


export const schoolCreationSchema = Joi.object({
    schoolName: Joi.string().required(),
    schoolNumber: Joi.string().required(),
    address: Joi.string().required(),
    lgaid: Joi.number().required(),
    stateid: Joi.number().required(),
    educationDistrict: Joi.string().required(),
    dateEstablishment: Joi.date(),
    schoolType: Joi.number().required(),
    schoolCategory: Joi.number().required(),
    principal: Joi.string().required(),
    telephoneNumber: Joi.string().required(),
    mailingAddress: Joi.string().required(),
    owner: Joi.number().required(),
    latitude: Joi.string(),
    longitude: Joi.string()
})
