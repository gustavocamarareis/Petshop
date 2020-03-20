const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    usuario: String,
    senha: String,
})

const usuario = mongoose.model('Usuario', UserSchema)
