import User from './../models/User';
import * as Yup from 'yup';

class UserController {
    async store(req, res) {
        //criando validacao
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        //fazendo a validacao
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation Error'});
        }

        //pegando um usuario pelo email
        const userExists = await User.findOne({ where : { email: req.body.email}})

        //retornando erro caso nao exista
        if(userExists) {
            return res.status(400).json({ error: 'User already exists.'})
        }

        //pegando dados apos criacao
        const {id, name, email, provider} = await User.create(req.body);

        return res.json({id, name, email, provider});
    }

    async update(req, res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => {
                return oldPassword ? field.required() : field
            }),
            confirmPassword: Yup.string().when('password', (password, field) => {
                return password ? field.required().oneOf([Yup.ref('password')]) : field;
            })
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation Error'});
        }

        const { email, oldPassword} = req.body;
        const user = await User.findByPk(req.userId);

        if(email !== user.email){
            const userExists = await User.findOne({ where : { email: email}})

            if(userExists) {
                return res.status(400).json({ error: 'User already exists.'})
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json( {error: 'Password doest not match'})
        }

        const {id, name, provider} = await user.update(req.body);

        return res.json({
           id,
           name,
            email,
           provider
        });


    }
}

export default new UserController;
