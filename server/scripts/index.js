
export const loginUser = (username='') => {
    return `SELECT * FROM base_users u LEFT JOIN user_roles r on u.roleid = r.roleid  where username=${username} `
}