const express = require('express')
const UsuarioController = require('./controllers/UsuarioController')
const AgendamentoController = require('./controllers/AgendamentoController')

const roteador = express.Router()

roteador.post('/cadastrar', UsuarioController.store)
roteador.get('/login', UsuarioController.index)

roteador.post('/agendar', AgendamentoController.store)
roteador.put('/reagendar', AgendamentoController.edit)
roteador.get('/listar', AgendamentoController.list)
roteador.delete('/cancelar', AgendamentoController.delete)

module.exports = roteador