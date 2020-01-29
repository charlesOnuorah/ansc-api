import { loginSchema, agentCreationSchema } from "../model";
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
    const bearerHeader = req.body.token || req.headers['x-access-token'];
        if (!bearerHeader){
            return res.status(401).send({
                message: 'Unauthorized user'
            });
        } else if(typeof bearerHeader !== undefined){
            jwt.verify(bearerHeader, process.env.SECRET_KEY,(err, authData) => {
                if(err) {
                    return res.status(403).send({
                        message: "Forbidden access"
                    });
                }
              req.user = authData;
              next();
            })
            
        }
}

export const verifyIsAdminOrSuperAdmin = (req, res, next) => {
    if(req.user.rolename === 'admin' || req.user.rolename === 'super admin'){
        return next();
    }
    return res.status(403).send({
        message:'Unauthorized access, please contact admin'
    })
}

export const verifyAgentCreationModel = (req, res, next) => {
    const {error, value} = agentCreationSchema.validate(req.body)
    if(error){
        return res.status(400).send({
            message:'Some fields are missing',
            validationMessage: error
        })
    }
    next()
}

export const verifyIsAdminOrSuperAdminorEnumeratorAdmin = (req, res, next) => {
    if(req.user.rolename === 'admin' || req.user.rolename === 'super admin' 
    || req.user.rolename === 'enumerator_admin'){
        return next();
    }
    return res.status(403).send({
        message:'Unauthorized access, please contact admin'
    })
}