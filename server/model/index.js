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
    lgaid: Joi.string().required(),
    stateid: Joi.string().required(),
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

export const teacherCreationSchema = Joi.object({
    schoolNumber: Joi.string().required(),
    oracleNumber: Joi.string().required(),
    registrationNumber: Joi.string().required(),
    surname: Joi.string().required(),
    firstname: Joi.string().required(),
    otherNames: Joi.string(),
    sex: Joi.string().required(),
    maidenName: Joi.string(),
    gradeLevel: Joi.string().required(),
    stateid: Joi.string().required(),
    dateOfBirth: Joi.date(),
    dateOfFirstAppointment: Joi.date(),
    dateOfInterStateTransfer: Joi.date(),
    dateOfConfirmation: Joi.date(),
    dateOfLastPromotion: Joi.date(),
    homeAddress: Joi.string().required(),
    telephoneNumber: Joi.string().required(),
    pfa: Joi.string(),
    pfaNumber: Joi.string(),
    stateResidentRegNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    exitDate: Joi.date(),
    remark: Joi.string(),
    subjects: Joi.array().min(1),
    qualification: Joi.array().min(1)
})

export const studentCreationSchema = Joi.object({
    sPin: Joi.string() ,
    otherName: Joi.string(),
    surname: Joi.string().required() ,
    firstname: Joi.string().required() ,
    dateOfBirth: Joi.date().required() ,
    placeOfBirth: Joi.string(),
    sex: Joi.string().required() ,
    schoolNumber: Joi.string().required() ,
    stateid: Joi.string().required() ,
    lgaid: Joi.string().required() ,
    town: Joi.string().required() ,
    religion: Joi.string().required() ,
    studentClass: Joi.string().required(),
    age: Joi.string().required()  ,
    hobby: Joi.array().min(1),
    dateOfAdmission: Joi.date().required() ,
    admissionNo: Joi.string().required()  ,
    studentAddress: Joi.string().required()  ,
    fatherFullName : Joi.string().required(),
    fatherAddress: Joi.string().required() ,
    motherAddress: Joi.string().required() ,
    fatherContact: Joi.string().required()  ,
    fatherOccupation: Joi.string().required() ,
    motherOccupation: Joi.string().required() ,
    guardianContact: Joi.string().required()  ,
    guardianName: Joi.string().required()  ,
    guardianAddress: Joi.string().required() ,
    signatureOfGuardian: Joi.string() ,
    signatureOfStudent: Joi.string() ,
    medicalCondition: Joi.string() ,
    passportOfStudent: Joi.string() ,
    passportOfGuardian: Joi.string() ,
})
/*

    "signatureOfStudent":"",
    "medicalCondition":"",
    "passportOfStudent":"",
    "passportOfGuardian":""
*/
