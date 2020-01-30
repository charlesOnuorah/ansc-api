import { teacherCreationSchema } from "../model"

export const loginUser = (username='') => {
    return `SELECT * FROM base_users u LEFT JOIN user_roles r on u.roleid = r.roleid  where username=${username} `
}

export const createAgentUser = (firstname, lastname, email, contactLine, roleid, username) => {
    return `INSERT INTO base_users(firstname, lastname, email, contactLine, roleid, username) values('${firstname}', '${lastname}', '${email}', '${contactLine}', ${roleid}, '${username}');`
}

export const mapAgentToLGA = (mappedTo='', mappedLGAs=[], createdBy='') => {
    let headerSql = `INSERT INTO base_user_lga_access(mappedTo, lgaid, createdBy) values `
    let bodySql = ''
    for(let i = 0; i < mappedLGAs.length; i++){
        bodySql = bodySql + `('${mappedTo}', ${mappedLGAs[i]},'${createdBy}'),`
    }
    const preparedSql = bodySql.substr(0, bodySql.length - 1)
    return `${headerSql} ${preparedSql};`
}


export const adminCreateSchool = (schoolName,schoolNumber,address,lgaid,stateid,
educationDistrict,dateEstablishment= null,schoolType,schoolCategory,
principal,telephoneNumber,mailingAddress,owner,latitude = null,longitude = null) => {
    if(longitude === null && latitude === null){
        return `insert into base_school (schoolName,schoolNumber,address, lgaid, stateid, educationDistrict, schoolType, schoolCategory, principal,dateEstablishment,telephoneNumber,mailingAddress, owner)values ('${schoolName}', '${schoolNumber}', '${address}',${parseInt(lgaid)}, ${parseInt(stateid)},'${educationDistrict}', ${schoolType},${schoolCategory},'${principal}',${dateEstablishment ? `STR_TO_DATE("${dateEstablishment}","%M %e %Y")`: null}, '${telephoneNumber}', '${mailingAddress}',${owner});`
    }
    return `insert into base_school (schoolName,schoolNumber,address, lgaid, stateid, educationDistrict, schoolType, schoolCategory, principal,dateEstablishment,telephoneNumber,mailingAddress, owner, latitude, longitude)values ('${schoolName}', '${schoolNumber}', '${address}',${parseInt(lgaid)}, ${parseInt(stateid)},'${educationDistrict}', ${schoolType},${schoolCategory},'${principal}', ${dateEstablishment ? `STR_TO_DATE("${dateEstablishment}","%M %e %Y")`: null}, '${telephoneNumber}', '${mailingAddress}',${owner}, '${latitude}', '${longitude}');`
}

export const getAgentSchool = (username='') => {
    return `select * from base_school where lgaid in (select distinct lgaid from base_user_lga_access where mappedTo ='${username}');`
}

export const getAgentLGAs = (username="") => {
    return `select * from base_territory where lgaid in (select distinct lgaid from base_user_lga_access where mappedTo ='${username}');`
}

export const addStaff = (schoolNumber,oracleNumber,registrationNumber,surname,
    firstname,otherNames,sex,maidenName,gradeLevel,stateid,dateOfBirth,
    dateOfFirstAppointment,dateOfInterStateTransfer,dateOfConfirmation,
    dateOfLastPromotion,homeAddress,telephoneNumber,pfa,
    pfaNumber,stateResidentRegNumber,email,
    exitDate,remark) => {
        return `insert into teachers(schoolNumber,oracleNumber,registrationNumber,surname,firstname,otherNames,sex,maidenName,gradeLevel,stateid,dateOfBirth,dateOfFirstAppointment,dateOfInterStateTransfer,dateOfConfirmation,dateOfLastPromotion,homeAddress,telephoneNumber,pfa,pfaNumber,stateResidentRegNumber,email,exitDate,remark)
         values ('${schoolNumber}','${oracleNumber}','${registrationNumber}','${surname}',
            '${firstname}','${otherNames}','${sex}','${maidenName}','${gradeLevel}',${parseInt(stateid)},STR_TO_DATE("${dateOfBirth}","%M %e %Y"),
            STR_TO_DATE("${dateOfFirstAppointment}","%M %e %Y"),STR_TO_DATE("${dateOfInterStateTransfer}","%M %e %Y"),STR_TO_DATE("${dateOfConfirmation}","%M %e %Y"),
            STR_TO_DATE("${dateOfLastPromotion}","%M %e %Y"),'${homeAddress}','${telephoneNumber}','${pfa}',
            '${pfaNumber}',${stateResidentRegNumber},'${email}',
            STR_TO_DATE("${exitDate}","%M %e %Y"),'${remark}');`

    }

    export const saveQaulification = (teacherId, qualification) => {
        let headerSql = `INSERT INTO teacher_qualification(qualification, dateAcquired, teacherId) values `
        let bodySql = ''
        for(let i = 0; i < qualification.length; i++){
            bodySql = bodySql + `('${qualification[i].qualification}', STR_TO_DATE("${qualification[i].date}","%M %e %Y"), ${parseInt(teacherId)}),`
        }
        const preparedSql = bodySql.substr(0, bodySql.length - 1)
        return `${headerSql} ${preparedSql};`
    }

    export const saveSubjects = (teacherId, subjects) => {
        let headerSql = `INSERT INTO teacher_subjects(subjectName, teacherId) values `
        let bodySql = ''
        for(let i = 0; i < subjects.length; i++){
            bodySql = bodySql + `('${subjects[i]}', ${parseInt(teacherId)}),`
        }
        const preparedSql = bodySql.substr(0, bodySql.length - 1)
        return `${headerSql} ${preparedSql};`
    }

    export const saveStudents = (sPin,otherName,surname,firstname,dateOfBirth,placeOfBirth,sex,
                    schoolNumber,stateid,lgaid,town,religion,studentClass,age,dateOfAdmission,
                    admissionNo,studentAddress,fatherFullName,fatherAddress,motherAddress,fatherContact,fatherOccupation,motherOccupation,
                    guardianContact,guardianName,guardianAddress,signatureOfGuardian,
                    signatureOfStudent,medicalCondition,passportOfStudent,passportOfGuardian) => {
                return `insert into students (sPin,otherName,surname,firstname,dateOfBirth,placeOfBirth,sex,
                    schoolNumber,stateid,lgaid,town,religion,class,age,dateOfAdmission,
                    admissionNo,studentAddress,fatherFullName,fatherAddress,motherAddress,fatherContact,fatherOccupation,motherOccupation,
                    guardianContact,guardianName,guardianAddress,signatureOfGuardian,
                    signatureOfStudent,medicalCondition,passportOfStudent,passportOfGuardian)
                    values ('${sPin}','${otherName}','${surname}','${firstname}',STR_TO_DATE('${dateOfBirth}',"%M %e %Y"),'${placeOfBirth}','${sex}',
                        '${schoolNumber}',${parseInt(stateid)},${parseInt(lgaid)},'${town}','${religion}','${studentClass}','${age}',STR_TO_DATE('${dateOfAdmission}',"%M %e %Y"),
                        '${admissionNo}','${studentAddress}','${fatherFullName}','${fatherAddress}','${motherAddress}','${fatherContact}','${fatherOccupation}','${motherOccupation}',
                        '${guardianContact}','${guardianName}','${guardianAddress}','${signatureOfGuardian}',
                        '${signatureOfStudent}','${medicalCondition}','${passportOfStudent}','${passportOfGuardian}')
                    `
            }

    export const saveStudentHobby = (studentId, hobby) => {
        let headerSql = `INSERT INTO student_hobby(hobby,studentId) values `
        let bodySql = ''
        for(let i = 0; i < hobby.length; i++){
            bodySql = bodySql + `('${hobby[i]}', ${parseInt(studentId)}),`
        }
        const preparedSql = bodySql.substr(0, bodySql.length - 1)
        return `${headerSql} ${preparedSql};`
    }
