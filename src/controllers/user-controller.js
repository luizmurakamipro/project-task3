const repository = require('../repositories/user-respository'); 

exports.get = async (req, res) => {
    try {
       var data = await repository.get(req.userId);
       data.password = undefined;
       res.status(200).send(data);
   } catch (err) {
       res.status(500).send({
           message: "Falha na requisição",
           error: err
       });
   }
}

exports.put = async (req, res) => {
    try {
        const { userId } = req.params;;
        var data = await repository.put(userId, req.body);
        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            dados: data
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar atualizar usuário",
            error: err
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { userId } = req.params;
        await repository.delete(userId);  
        res.status(200).send({
            message: "Usuário deletado com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar deletar usuário",
            error: err
        });
    }
}