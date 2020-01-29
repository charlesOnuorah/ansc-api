import { schoolCreationSchema } from "../model";

export const validateSchoolForm =  (req, res, next) => {
    const {error, value} = schoolCreationSchema.validate(req.body)
    if(error){
        return res.status(400).send({
            message: 'Some fields are missing',
            validationMessage: error
        })
    }
    next()
}