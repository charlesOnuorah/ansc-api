
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