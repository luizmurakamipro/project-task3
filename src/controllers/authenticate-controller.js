const repository = require('../repositories/authenticate-repository');

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        var rt = await repository.authenticate(email, password);
        res.status(200).send({ auth: true, user: rt });
    } catch (err) {
        if (!err.status)
            res.status(500).json({ error: { code: 'UNKNOW_ERROR', message: 'An unknown error occurred.' } });
        else
            res.status(err.status).json({ error: { code: err.code, message: err.message } });
    }
}