const yup = require('yup');

const validation = yup.object().shape({
    name: yup
    .string('O nome deve ser uma string')
    .required('Nome é obrigatório'),
    email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
    username: yup
    .string()
    .required('Usuário obrigatório'),
    password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('A senha é obrigatória')
});

function validateNewUser(req, res, next) {
    try {
        validation.validateSync(req.body)
    } catch (error) {
       return res.status(400).json({message: error.message})
    }

    next()
};

module.exports = validateNewUser;