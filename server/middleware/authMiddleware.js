import { loginSchema } from "../model";
import jwt from "jsonwebtoken";

export const validateUsernamePassword = (req, res, next) => {
    
    const {error, value} = loginSchema.validate(req.body)
    if(error){
        return res.status(400).send({
            message: `Username and Password is required`,
            validationMessage: error
        })
    }
    next()
}

export const verifyToken = (req, res, next) => {

}