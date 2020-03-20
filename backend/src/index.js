const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://PETshop:saladadefruta@petshop-7bazx.mongodb.net/test?retryWrites=true&w=majority')

const servidor = express()

servidor.listen(1234)