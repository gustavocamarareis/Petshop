const express = require('express')
const UsuarioController = require('./controllers/UsuarioController')

const roteador = express.Router()

roteador.post('/cadastrar', UsuarioController.store)

// get post put delete
roteador.get('/login', UsuarioController.index)

module.exports = roteador