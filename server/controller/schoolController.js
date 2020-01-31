import { executeQuery } from "../helper";
import { adminCreateSchool, getAgentSchool, getAgentSchoolById } from "../scripts";

export const createSchool = async (req, res) => {
    const {schoolName,schoolNumber,address,lgaid:lga,stateid:state,
        educationDistrict,dateEstablishment,schoolType,schoolCategory,
        principal,telephoneNumber,mailingAddress,owner,latitude,longitude} = req.body
    try{
        const result1 = await executeQuery(`Select * from base_school where schoolNumber=${schoolNumber}`)
        if(result1.length > 0){
            return res.status(406).send({
                message: 'School Already exists',
                
            })
        }
        const resultLGA = await executeQuery(`select * from base_territory where lga = '${lga.toLowerCase()}'`)
        
        const lgaid = resultLGA[0].lgaid;
        const resultState = await executeQuery(`select * from base_states where state = '${state.toLowerCase()}'`)
        const stateid = resultState[0].id;
        const result2 = await executeQuery(adminCreateSchool(schoolName, schoolNumber, address, lgaid, stateid,
                educationDistrict, dateEstablishment, schoolType, schoolCategory, principal,
                    telephoneNumber, mailingAddress, owner, latitude, longitude))
        const result3 = await executeQuery(`Select * from base_school where schoolNumber=${schoolNumber}`)
        return res.status(201).send({
            message: 'School created sucessfully',
            data: result3[0]
        })
    }catch(error) {console.log(error);res.status(500).send({message: 'Some errors were encountered'})}
}

export const getAllSchool = async (req, res) => {
    try{
        const result = await executeQuery(getAgentSchool(req.user.username))
        return res.status(200).send({
            message: 'School fetched sucessfully',
            school: result
        })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered'})}
}

export const getSchoolById = async (req,res) => {
    try{
        const result = await executeQuery(getAgentSchoolById(req.user.username, req.params.id))
        return res.status(200).send({
            message: 'School fetched sucessfully',
            school: result
        })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered'})}
}