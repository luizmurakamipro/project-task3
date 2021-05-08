const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Persistência
mongoose.connect(
	'mongodb+srv://dotask:dotask@totask2.edfjj.mongodb.net/dotask?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Configurar a aplicação para usar o Body-Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Porta da aplicação
const PORT = 3000;

// Rotas
var regRoute = require('./src/routes/register-route');
var authRoute = require('./src/routes/authenticate-route');
var taskRoute = require('./src/routes/task-route');
var userRoute = require('./src/routes/user-route');

// Rota para Registro
app.use('/api/register', regRoute);

// Rota para Autenticação
app.use('/api/authenticate', authRoute);

// Rota para Propriedade
app.use('/api/task', taskRoute);

// Rota para Usuários
app.use('/api/user', userRoute)

app.listen(PORT, () => console.log('API Running in Port: ' + PORT));
