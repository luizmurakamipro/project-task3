const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        console.log("Usuário inexistente");
        throw ({
            status: 404,
            code: "Usuário não encontrado",
            message: "Usuário inexistente"
        });
    }
    if (user.email !== email) {
        console.log("Email incorreto");
        throw ({
            status: 404,
            code: "Usuário não encontrado",
            message: "Email incorreto"
        });
    }
    if (!user.validPassword(password)) {
        console.log("Senha incorreta");
        throw ({
            status: 404,
            code: "Usuário não encontrado",
            message: "Senha incorreta"
        });
    }
    const id = user._id;
    const secretKey = 'seguro';

    let token = jwt.sign({ id }, secretKey, { expiresIn: 86400 });
    let obj = { token: token, userName: user.name }
    
    return obj;
}