const express = require('express')
const mongoose = require('mongoose')
const roteador = require('./routes')

mongoose.connect('mongodb+srv://PETshop:saladadefruta@petshop-7bazx.mongodb.net/test?retryWrites=true&w=majority')

const servidor = express()

servidor.use(express.json())

servidor.use(roteador)

servidor.listen(1234)