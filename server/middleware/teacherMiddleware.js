import { teacherCreationSchema } from "../model";


export const validateTeacherForm = (req, res, next) => {
    const {error, value} = teacherCreationSchema.validate(req.body);
    if(error){
        return res.status(400).send({
            message: 'Some fields are missing',
            validationMessage: error
        })
    }
    next()
}