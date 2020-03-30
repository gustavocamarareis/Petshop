const express = require('express')
const UsuarioController = require('./controllers/UsuarioController')
const AgendamentoController = require('./controllers/AgendamentoController')

const roteador = express.Router()

roteador.post('/cadastrar', UsuarioController.store)
roteador.get('/login', UsuarioController.index)

roteador.post('/agendar', AgendamentoController.store)
roteador.get('/listar', AgendamentoController.list)

module.exports = roteador