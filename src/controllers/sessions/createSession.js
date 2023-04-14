//[M1S10] Ex 03 - Criando uma rota de sessão e JWT
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createSession(req, res) {
    try {
        const userInDb = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userInDb) {
            return res
            .status(409)
            .json({message: 'Usuário ou senha incorreto'})
        };

        const passwordIsValid = await bcrypt.compare(req.body.password, userInDb.password);

        if (!passwordIsValid) {
            return res
            .status(404)
            .json({message: 'Cpf ou senha incorretos'})
        };

        const token = jwt.sign(
            {
                id: userInDb.id
            },
            process.env.CHAVE_DO_TOKEN,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({name: userInDb.name, token: token});
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
};

module.exports = createSession;