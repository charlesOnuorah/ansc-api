
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

//`STR_TO_DATE('${dateEstablishment}','%m-%d-%y')`