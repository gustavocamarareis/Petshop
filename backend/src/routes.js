const express = require('express')
const UsuarioController = require('./controllers/UsuarioController')

const roteador = express.Router()

roteador.post('/cadastrar', UsuarioController.store)

module.exports = roteador