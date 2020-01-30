import { executeQuery } from "../helper";
import { saveStudents, saveStudentHobby } from "../scripts";

export const createStudent = async (req, res) => {
    const {
            sPin,otherName,surname,firstname,dateOfBirth,placeOfBirth,sex,
            schoolNumber,stateid,lgaid,town,religion,studentClass,age,dateOfAdmission,
            admissionNo,studentAddress,fatherFullName,fatherAddress,motherAddress,fatherContact,fatherOccupation,motherOccupation,
            guardianContact,guardianName,guardianAddress,signatureOfGuardian,hobby,
            signatureOfStudent,medicalCondition,passportOfStudent,passportOfGuardian
            } = req.body
    try{
        const result1 = await executeQuery(`select * from students where admissionNo = ${admissionNo}`)

        if(result1.length > 0){
            return  res.status(406).send({
                message: 'Student Already exists',
            })
        }
        const result2 = await executeQuery(saveStudents(sPin,otherName,surname,firstname,dateOfBirth,placeOfBirth,sex,
            schoolNumber,stateid,lgaid,town,religion,studentClass,age,dateOfAdmission,
            admissionNo,studentAddress,fatherFullName,fatherAddress,motherAddress,fatherContact,fatherOccupation,motherOccupation,
            guardianContact,guardianName,guardianAddress,signatureOfGuardian,
            signatureOfStudent,medicalCondition,passportOfStudent,passportOfGuardian))

        const result3 = await executeQuery(`select * from students where admissionNo = ${admissionNo}`)

        const result4 = await executeQuery(saveStudentHobby(result3[0].id, hobby))

        const studentHobby = await executeQuery(`select * from student_hobby where studentId = ${result3[0].id}`)
        
        return res.status(201).send({
            message: 'Student created successfully',
            data: result3[0],
            studentHobby
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}