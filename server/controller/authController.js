import { executeQuery, isPasswordEqualHashPassword, assignToken } from "../helper";
import { loginUser } from "../scripts";

export const loginUserWithUsernamePassword =  async (req, res) => {
    try{
        const {username, password} = req.body
        const result = await executeQuery(loginUser(username))
        if(result.length > 0){
            if(isPasswordEqualHashPassword(result[0].password, password )){
                const {username, roleid, email, firstname, lastname, status,contactLine} = result[0]
                const token = await assignToken({username, roleid, email, firstname, lastname, status, contactLine }) 
                
                    
                return  res.status(200).send({
                    message: 'Login Successful',
                    user: result[0],
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
    }catch(error){
        res.status(404).send({message: 'Invalid username or password'})
    }
}