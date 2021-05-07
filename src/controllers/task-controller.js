const repository = require('../repositories/task-repository');

exports.post = async (req, res) => {
    try {
        // Postman sempre envia string, para isso transformamos em boolean
        if (typeof req.body.check === 'string') {
            req.body.check = (req.body.check == 'true');
        }

        // Passa pelo parâmetro o id do usuário e os dados da task
        var task = await repository.post(req.userId, {
            date: req.body.date,
            description: req.body.description,
            check: req.body.check
        });
        res.status(201).send({
            message: "Tarefa inserida com sucesso",
            task: task
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar inserir tarefa",
            error: err
        });
    }
}

exports.get = async (req, res) => { 
    try {
        var taskListData = await repository.get(req.userId);
        res.status(200).send({
            message: "Lista de Tarefa encontrada com sucesso",
            taskList: taskListData
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao encontrar lista de tarefa no usuario",
            error: err
        });
    }
}

exports.getById = async (req, res) => {
    try {
        const { taskId } = req.params;
        var data = await repository.getById(taskId);
        if (data == null)
            res.status(500).send({message: "Tarefa não encontrada"});
        else
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
        const { taskId } = req.params;
        var data = await repository.put(taskId, req.body);
        res.status(200).send({
            message: "Tarefa atualizada com sucesso",
            dados: data
        });
    } catch (err) {
        res.status(400).send({
            message: "Erro ao tentar atualizar tarefa",
            error: err
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { taskId } = req.params;
        await repository.delete(taskId);
        res.status(201).send({
            message: "Tarefa deletada com sucesso"
        });
    } catch (err) {
        res.status(500).send({
            message: "Erro ao tentar deletar tarefa",
            error: err
        });
    }
}