const express = require('express')
const mongoose = require('mongoose')
const roteador = require('./routes')
const cors = require('cors')

const servidor = express()

mongoose.connect('mongodb+srv://PETshop:saladadefruta@petshop-7bazx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

servidor.use(cors())
servidor.use(express.json())
servidor.use(roteador)
servidor.listen(1234)