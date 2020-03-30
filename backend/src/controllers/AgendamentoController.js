const Agendamento = require('../models/Agendamento')

module.exports = {
    async store(req, res){
        const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = req.body

        const agendamento = await Agendamento.create ({ dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone })
        
        return res.json (agendamento)
    },

    async list(req, res){
        let agendamento
        const { dia, mes, ano } = req.body

        if(!dia && !mes){
             agendamento = await Agendamento.find({ ano })
        }
        if(mes && !dia){
             agendamento = await Agendamento.find({mes, ano})
        }
        if(mes && dia){
             agendamento = await Agendamento.find({dia, mes, ano})
        }
        return res.json(agendamento)
    }
}
