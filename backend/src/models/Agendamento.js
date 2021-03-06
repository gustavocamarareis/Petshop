const mongoose = require('mongoose')

const AgendamentoSchema = new mongoose.Schema({
    dia: Number,
    mes: Number,
    ano: Number,
    hora: Number,
    minuto: Number,
    nomeCliente: String,
    nomeCachorro: String,
    obs: String,
    telefone: String,
    cor: String,
    fixo: Boolean,
})

module.exports = mongoose.model('Agendamento', AgendamentoSchema)
