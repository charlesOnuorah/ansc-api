import { studentCreationSchema } from "../model";


export const validateStudentForm = (req, res, next) => {
    const {error, value} = studentCreationSchema.validate(req.body);
    if(error){
        return res.status(400).send({
            message: 'Some fields are missing',
            validationMessage: error
        })
    }
    next()
}