import { executeQuery } from "../helper";
import { adminCreateSchool } from "../scripts";

export const createSchool = async (req, res) => {
    const {schoolName,schoolNumber,address,lgaid,stateid,
        educationDistrict,dateEstablishment,schoolType,schoolCategory,
        principal,telephoneNumber,mailingAddress,owner,latitude,longitude} = req.body
    try{
        const result1 = await executeQuery(`Select * from base_school where schoolNumber=${schoolNumber}`)
        if(result1.length > 0){
            return res.status(406).send({
                message: 'School Already exists',
                
            })
        }
        const result2 = await executeQuery(adminCreateSchool(schoolName, schoolNumber, address, lgaid, stateid,
                educationDistrict, dateEstablishment, schoolType, schoolCategory, principal,
                    telephoneNumber, mailingAddress, owner, latitude, longitude))
        const result3 = await executeQuery(`Select * from base_school where schoolNumber=${schoolNumber}`)
        return res.status(201).send({
            message: 'School created sucessfully',
            data: result3[0]
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}