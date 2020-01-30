import { executeQuery, isPasswordEqualHashPassword, assignToken } from "../helper";
import { loginUser, createAgentUser, mapAgentToLGA,getAgentLGAs, getAgentSchool } from "../scripts";

export const loginUserWithUsernamePassword =  async (req, res) => {
    try{
        const {username, password} = req.body
        const result = await executeQuery(loginUser(username))
        if(result.length > 0){
            if(isPasswordEqualHashPassword(result[0].password, password )){
                const {username, roleid, email,rolename, firstname, lastname, status,contactLine} = result[0]
                const token = await assignToken({username,rolename, roleid, email, firstname, lastname, status, contactLine }) 
                const getUserSchool = await executeQuery(getAgentSchool(username))
                const getUserLGA = await executeQuery(getAgentLGAs(username))
                return  res.status(200).send({
                    message: 'Login Successful',
                    user: result[0],    
                    lga: getUserLGA,
                    schools: getUserSchool,
                    token
                })
                
            }
            return res.status(404).send({
                message: 'Invalid username or password'
            })
        }
        return res.status(404).send({
            message: 'Invalid username or password'
        })
    }catch(error) {res.status(404).send({message: 'Invalid username or password'})}
}

export const createAgent = async (req, res) => {
    const { firstname, lastname, email, contactLine, username, mappedLGAs, roleid } = req.body;
    try{
      const result = await  executeQuery(`select * from base_users where username=${username}`)
      if(result.length > 0){
          return res.status(406).send({
              message: 'Username already exists'
          })
      }
      const result2 = await executeQuery(createAgentUser(firstname, lastname, email, contactLine, roleid, username))
      const result3 = await executeQuery(mapAgentToLGA(username, mappedLGAs,req.user.username))
      return res.status(201).send({
          message: 'User created successfully'
      })
    }catch(error) {res.status(500).send({message: 'Some errors were encountered'})}

}

