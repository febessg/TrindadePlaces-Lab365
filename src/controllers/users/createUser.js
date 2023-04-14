//[M1S10] Ex 02 - Criando rota POST para User
const User = require('../../models/user');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    try {
        const emailInDb = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        const usernameInDb = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (emailInDb || usernameInDb) {
            return res
            .status(409)
            .json({message: "Credenciais incorretas"})
        }

        const hash = await bcrypt.hash(req.body.password, 10)

        const user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash
        }

        const newUser = await User.create(user);

        const {password, ...rest} = newUser.toJSON();

        res.status(201).json(rest)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }   
};

module.exports = createUser;