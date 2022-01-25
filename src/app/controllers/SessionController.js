import User from "../models/User";
import jwt from "jsonwebtoken";
import auth from "../../config/auth";
import * as Yup from 'yup';
const {sign} = jwt

class SessionController {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation Error'});
        }
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});

        if(!user) {
            return res.status(401).json( { error: 'User not found'});
        }

        if( !(await user.checkPassword(password))){
            return res.status(401).json( { error: 'Password does not match'});
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({id}, auth.secret, {
                expiresIn : auth.expiresIn
            })
        })
    }
}


export default new SessionController();
