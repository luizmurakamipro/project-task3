const repository = require('../repositories/register-repository'); 

exports.register = async (req, res) => {    
    try {
        var user = await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        if (user)
        {
            user.password = undefined;
            res.status(201).send({
                message: "Usuário registrado com sucesso",
                user: user
            });
        }
    } catch (err) {        
        res.status(500).send({
            message: "Erro ao tentar registrar usuário",
            error: err
        });
    }
}