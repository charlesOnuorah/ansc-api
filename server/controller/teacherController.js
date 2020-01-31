import { executeQuery } from "../helper";
import { addStaff, saveQaulification, saveSubjects } from "../scripts";


export const createTeacher = async (req, res) => {
    const {schoolNumber,oracleNumber,registrationNumber,surname,
        firstname,otherNames,sex,maidenName,gradeLevel,stateid,dateOfBirth,
        dateOfFirstAppointment,dateOfInterStateTransfer,dateOfConfirmation,
        dateOfLastPromotion,homeAddress,telephoneNumber,pfa,
        pfaNumber,stateResidentRegNumber,email,
        exitDate,remark,subjects,qualification} = req.body;
    try{
        const result1 = await executeQuery(`select * from teachers where registrationNumber=${registrationNumber}`)
        if(result1.length > 0){
            return  res.status(406).send({
                message: 'Teacher Already exists',
            })
        }
        const result2 = await executeQuery(addStaff(schoolNumber,oracleNumber,registrationNumber,surname,
                                            firstname,otherNames,sex,maidenName,gradeLevel,stateid,dateOfBirth,
                                            dateOfFirstAppointment,dateOfInterStateTransfer,dateOfConfirmation,
                                            dateOfLastPromotion,homeAddress,telephoneNumber,pfa,
                                            pfaNumber,stateResidentRegNumber,email,
                                            exitDate,remark))
        const result3 = await executeQuery(`select * from teachers where registrationNumber=${registrationNumber}`)
        const result4 = qualification ? await executeQuery(saveQaulification(result3[0].id, qualification)) : null
        const result5 = subjects ?  await executeQuery(saveSubjects(result3[0].id, subjects)) : null
        const savedSubjects = await executeQuery(`select * from teacher_subjects where teacherId=${result3[0].id}`)
        const savedQualification = await executeQuery(`select * from teacher_qualification where teacherId=${result3[0].id}`)
        return res.status(201).send({
            message: 'Teacher created successfully',
            data: result3[0],
            teacherSubjects: savedSubjects,
            teacherQualifications: savedQualification
        })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered'})}
}

export const getAllTeacherBySchool = async (req, res) => {
    try{
        const result = await executeQuery(`select * from teachers where schoolNumber =${req.params.id}`)
        return res.status(200).send({
            message: 'Teacher fetched successfully',
            data: result
        })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered',error})}
}

export const getTeacherById = async (req, res) => {
    try{
        const result = await executeQuery(`select * from teachers where id =${req.params.id}`)
        const savedSubjects = await executeQuery(`select * from teacher_subjects where teacherId=${result[0].id}`)
        const savedQualification = await executeQuery(`select * from teacher_qualification where teacherId=${result[0].id}`)
        
        return res.status(200).send({
            message: 'Teacher fetched successfully',
            data: result[0],
            subject: savedSubjects,
            qualification: savedQualification
        })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered',error})}
}